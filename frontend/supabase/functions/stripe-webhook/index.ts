import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import Stripe from "npm:stripe@^14.14.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
    apiVersion: "2023-10-16",
    httpClient: Stripe.createFetchHttpClient(),
  });

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400 });
  }

  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
  const body = await req.text();
  
  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    console.log("Received verified Stripe webhook event type:", event.type);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const registrationId = session.metadata?.registration_id;
      console.log("Processing checkout.session.completed for registration ID:", registrationId);
      
      if (!registrationId) {
        console.error("No registration ID found in session metadata:", session.metadata);
        throw new Error("No registration ID in session metadata");
      }

      // Update registration status
      const { data: registration, error: updateError } = await supabase
        .from("registrations")
        .update({ payment_status: "paid" })
        .eq("id", registrationId)
        .select()
        .single();

      console.log("Supabase update response:", { registrationId, data: registration, error: updateError });

      if (updateError) {
        console.error("Failed to update registration status:", updateError);
        throw updateError;
      }

      // Trigger email function
      console.log("Triggering send-registration-email function...");
      const emailRes = await fetch(
        `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-registration-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({ registration_id: registrationId }),
        }
      ).catch(emailErr => {
        console.error("Email trigger fetch error:", emailErr);
        return null;
      });

      if (emailRes) {
        const emailText = await emailRes.text();
        console.log(`Email function response status: ${emailRes.status}, body: ${emailText}`);
      } else {
        console.error("No response from email function trigger.");
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
