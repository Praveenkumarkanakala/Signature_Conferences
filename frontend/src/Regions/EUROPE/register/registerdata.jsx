import { supabase } from "../../../lib/supabase.jsx";

/* ─── REGIONS ─────────────────────────────────────────────── */
export const REGIONS = [
  { id: "europe", label: "Europe", flag: "🇪🇺" },
];

/* ─── CONFERENCES ─────────────────────────────────────────── */
function normalizeConference(row) {
  return {
    ...row,
    image:           row.image_path,
    date:            row.date_text,
    fullDescription: row.full_description,
  };
}

export async function fetchAllConferences() {
  const { data, error } = await supabase
    .from("conferences")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch conferences:", error.message);
    return [];
  }

  return (data || []).map(normalizeConference);
}

export function filterConferencesByRegion(allConferences, regionId) {
  if (!regionId || regionId === "all") return allConferences;
  return allConferences.filter((c) => c.region === regionId);
}

/* ─── PACKAGES ────────────────────────────────────────────── */
export async function fetchAllPackages() {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch packages:", error.message);
    return [];
  }

  return data || [];
}

/* ─── SETTINGS ────────────────────────────────────────────── */
export async function fetchCompanionPrice() {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "companion_price")
    .single();

  if (error) {
    console.error("Failed to fetch companion price:", error.message);
    return 199;
  }

  return parseInt(data.value, 10);
}

export async function fetchExtraNightPrice() {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "extra_night_price")
    .single();

  if (error) {
    console.error("Failed to fetch extra night price:", error.message);
    return 149;
  }

  return parseInt(data.value, 10);
}

/* ─── COUPONS ─────────────────────────────────────────────── */
export async function applyCoupon(code) {
  const upper = (code || "").trim().toUpperCase();

  const { data, error } = await supabase
    .from("coupons")
    .select("code, discount")
    .eq("code", upper)
    .eq("is_active", true)
    .single();

  if (error || !data) return { valid: false, discount: 0, code: upper };
  return { valid: true, discount: data.discount, code: data.code };
}

/* ─── INITIAL FORM STATE ──────────────────────────────────── */
export const INITIAL_FORM = {
  firstName:    "",
  lastName:     "",
  email:        "",
  phone:        "",
  country:      "",
  organization: "",
  jobTitle:     "",
  regionId:     "",
  conferenceId: "",
  speakerType:  "",
  packageId:    "",
  companions:   0,
  extraNights:  0,
  couponCode:   "",
  discount:     0,
};

/* ─── STEP META ───────────────────────────────────────────── */
export const STEP_META = {
  1: { step: "Step 1 of 3", title: "Personal Details & Conference Selection" },
  2: { step: "Step 2 of 3", title: "Choose Your Package" },
  3: { step: "Step 3 of 3", title: "Review & Confirm" },
};

/* ─── VALIDATION ──────────────────────────────────────────── */
export function validateStep1(f) {
  const e = {};
  if (!f.firstName.trim())  e.firstName    = "First name is required";
  if (!f.lastName.trim())   e.lastName     = "Last name is required";
  if (!f.email.trim())      e.email        = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = "Enter a valid email";
  if (!f.phone.trim())      e.phone        = "Phone number is required";
  if (!f.country.trim())    e.country      = "Country is required";
  if (!f.regionId)          e.regionId     = "Please select a region";
  if (!f.conferenceId)      e.conferenceId = "Please select a conference";
  return e;
}

export function validateStep2(f) {
  const e = {};
  if (!f.speakerType) e.speakerType = "Please choose Physical or Virtual";
  if (!f.packageId)   e.packageId   = "Please choose a package to continue";
  return e;
}

/* ─── PRICE ───────────────────────────────────────────────── */
export function calculateTotal(
  packageId,
  companions,
  discount        = 0,
  extraNights     = 0,
  allPackages     = [],
  companionPrice  = 199,
  extraNightPrice = 149,
) {
  const pkg = allPackages.find((p) => p.id === packageId);
  if (!pkg) return 0;
  const isVirtual     = pkg.type === "virtual";
  const companionCost = isVirtual ? 0 : companions  * companionPrice;
  const nightCost     = isVirtual ? 0 : extraNights * extraNightPrice;
  const subtotal      = pkg.price + companionCost + nightCost;
  return Math.max(0, subtotal - discount);
}

/* ─── SUBMIT → Supabase ───────────────────────────────────── */
export async function submitRegistration(
  fields,
  allConferences,
  allPackages,
  companionPrice,
  extraNightPrice,
  fromRegion = "unknown",
) {
  const conf        = allConferences.find((c) => String(c.id) === fields.conferenceId);
  const pkg         = allPackages.find((p) => p.id === fields.packageId);
  const total       = calculateTotal(
    fields.packageId,
    fields.companions,
    fields.discount    || 0,
    fields.extraNights || 0,
    allPackages,
    companionPrice,
    extraNightPrice,
  );
  const regionLabel = REGIONS.find((r) => r.id === fields.regionId)?.label || "NO_DATA";
  const isVirtual   = fields.speakerType === "virtual";

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
    conference_info:  conf
      ? `${conf.title} · ${conf.location} · ${conf.date}`
      : "NO_DATA",
    speaker_type:     fields.speakerType  || "NO_DATA",
    package_name:     pkg?.name           || "NO_DATA",
    package_price:    pkg ? `$${pkg.price}` : "NO_DATA",
    companions:       String(fields.companions   || 0),
    companion_cost:   `$${isVirtual ? 0 : (fields.companions   || 0) * companionPrice}`,
    extra_nights:     String(fields.extraNights  || 0),
    extra_night_cost: `$${isVirtual ? 0 : (fields.extraNights  || 0) * extraNightPrice}`,
    coupon_code:      fields.couponCode   || "NONE",
    discount:         fields.discount > 0 ? `-$${fields.discount}` : "$0",
    total_amount:     `$${total}`,
    from_region:      fromRegion,
  };

  // Insert registration into Supabase
  const { error } = await supabase.from("registrations").insert([payload]);

  if (error) {
    console.error("Registration insert error:", error.message);
    throw error;
  }

  // ✅ FIX: Fire email in background — don't await, so user isn't blocked
  fetch(
    "https://tohlagjzvjoqrutolcwf.supabase.co/functions/v1/send-registration-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaGxhZ2p6dmpvcXJ1dG9sY3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMzM3MTUsImV4cCI6MjA5MzcwOTcxNX0.Xi1QPhzVjYYFfXNS8Z7mBdQHnEb42nsYXneTbo1lKzY",
      },
      body: JSON.stringify({ registration_data: payload }),
    }
  ).catch(emailErr => console.error("Email trigger error:", emailErr));

  return payload;
}