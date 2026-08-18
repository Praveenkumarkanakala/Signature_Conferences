import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@^14.14.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { fields, fromRegion } = await req.json();

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1. Fetch Package
    const { data: pkg, error: pkgError } = await supabase
      .from("packages")
      .select("*")
      .eq("id", fields.packageId)
      .single();
    if (pkgError || !pkg) {
      console.error("Failed to fetch package:", pkgError || "No package found");
      throw new Error("Invalid package");
    }

    // 2. Fetch Conference
    const { data: conf, error: confError } = await supabase
      .from("conferences")
      .select("*")
      .eq("id", fields.conferenceId)
      .single();
    if (confError || !conf) {
      console.error("Failed to fetch conference:", confError || "No conference found");
      throw new Error("Invalid conference");
    }

    // 3. Fetch Settings (Prices)
    const { data: companionData } = await supabase.from("settings").select("value").eq("key", "companion_price").single();
    const { data: extraNightData } = await supabase.from("settings").select("value").eq("key", "extra_night_price").single();
    
    const companionPrice = companionData ? parseInt(companionData.value, 10) : 199;
    const extraNightPrice = extraNightData ? parseInt(extraNightData.value, 10) : 149;

    // 4. Fetch Coupon (if any)
    let discountAmount = 0;
    if (fields.couponCode && fields.couponCode.trim() !== "") {
      const { data: couponData } = await supabase
        .from("coupons")
        .select("code, discount")
        .eq("code", fields.couponCode.trim().toUpperCase())
        .eq("is_active", true)
        .single();
      
      if (couponData) {
        discountAmount = couponData.discount;
      }
    }

    const isVirtual = fields.speakerType === "virtual";
    const companionsCount = isVirtual ? 0 : parseInt(fields.companions || 0, 10);
    const extraNightsCount = isVirtual ? 0 : parseInt(fields.extraNights || 0, 10);

    // 5. Build Stripe Line Items
    const lineItems = [];

    // Package Line Item
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${pkg.name} Package - ${conf.title}`,
          description: fields.speakerType.toUpperCase() + " Speaker",
        },
        unit_amount: pkg.price * 100, // Stripe expects cents
      },
      quantity: 1,
    });

    // Companions Line Item
    if (companionsCount > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Accompanying Person(s)" },
          unit_amount: companionPrice * 100,
        },
        quantity: companionsCount,
      });
    }

    // Extra Nights Line Item
    if (extraNightsCount > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Extra Night(s)" },
          unit_amount: extraNightPrice * 100,
        },
        quantity: extraNightsCount,
      });
    }

    // Prepare Coupon for Stripe (Using Stripe API to create temporary coupon, or calculate total)
    // Actually, Stripe allows `discounts: [{ coupon: '...' }]` if coupon is in Stripe. 
    // If our coupons are in Supabase, we can pass it as a negative line item? No, Stripe doesn't allow negative line items.
    // The safest way is to use Stripe's `discounts` feature, BUT that requires creating the coupon in Stripe first.
    // Alternative: We can apply the discount to the main package line item price manually.
    
    if (discountAmount > 0) {
      // Calculate total without discount
      let subtotal = (pkg.price * 100) + (companionsCount * companionPrice * 100) + (extraNightsCount * extraNightPrice * 100);
      let newTotal = Math.max(0, subtotal - (discountAmount * 100));

      // We need to apply the discount via a Stripe Coupon to show the discount properly.
      // Let's create an ephemeral Stripe coupon.
      try {
        const stripeCoupon = await stripe.coupons.create({
          amount_off: discountAmount * 100,
          currency: "usd",
          duration: "once",
          name: `Discount (${fields.couponCode})`
        });
        
        var discounts = [{ coupon: stripeCoupon.id }];
      } catch (err) {
        console.error("Failed to create Stripe coupon:", err);
      }
    }

    // Build the payload that would have been inserted to `registrations`
    const regionLabels = {
      "usa": "USA",
      "north-america": "North America",
      "europe": "Europe",
      "asia": "Asia"
    };
    const regionLabel = regionLabels[fields.regionId] || fields.regionId;

    const payload = {
      first_name:       fields.firstName    || "NO_DATA",
      last_name:        fields.lastName     || "NO_DATA",
      email:            fields.email        || "NO_DATA",
      phone:            `${fields.countryCode} ${fields.phone}`.trim() || "NO_DATA",
      country:          fields.country      || "NO_DATA",
      organization:     fields.organization || "NO_DATA",
      job_title:        fields.jobTitle     || "NO_DATA",
      region:           regionLabel,
      conference_id:    fields.conferenceId || "NO_DATA",
      conference_info:  `${conf.title} · ${conf.location} · ${conf.date_text}`,
      speaker_type:     fields.speakerType  || "NO_DATA",
      package_name:     pkg.name            || "NO_DATA",
      package_price:    `$${pkg.price}`,
      companions:       String(companionsCount),
      companion_cost:   `$${companionsCount * companionPrice}`,
      extra_nights:     String(extraNightsCount),
      extra_night_cost: `$${extraNightsCount * extraNightPrice}`,
      coupon_code:      discountAmount > 0 ? fields.couponCode : "NONE",
      discount:         discountAmount > 0 ? `-$${discountAmount}` : "$0",
      total_amount:     `$${Math.max(0, pkg.price + (companionsCount * companionPrice) + (extraNightsCount * extraNightPrice) - discountAmount)}`,
      from_region:      fromRegion,
      payment_status:   "pending"
    };

    // Insert as pending
    const { data: registration, error: regError } = await supabase
      .from("registrations")
      .insert([payload])
      .select("id")
      .single();

    if (regError) {
      console.error("Failed to insert registration into Supabase:", regError);
      throw regError;
    }

    // Create Checkout Session
    // We assume the frontend app is running on the origin of the request
    const origin = req.headers.get("origin") || "http://localhost:5173";
    
    const sessionConfig: any = {
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      customer_email: fields.email,
      success_url: `${origin}/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/register/cancel`,
      metadata: {
        registration_id: registration.id,
      },
    };

    if (discountAmount > 0 && typeof discounts !== "undefined") {
      sessionConfig.discounts = discounts;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Update registration with session id
    await supabase
      .from("registrations")
      .update({ stripe_session_id: session.id })
      .eq("id", registration.id);

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Stripe session creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
