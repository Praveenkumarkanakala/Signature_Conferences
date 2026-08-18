import { supabase } from "../../../lib/supabase.jsx";

/* ─── REGIONS ─────────────────────────────────────────────── */
export const REGIONS = [
  { id: "usa", label: "USA", flag: "🌎" },
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
  // Call the Supabase Edge Function to securely calculate total and create Stripe session
  const { data, error } = await supabase.functions.invoke("create-checkout-session", {
    body: { fields, fromRegion },
  });

  if (error || !data?.url) {
    console.error("Failed to create checkout session:", error || data);
    throw new Error("Failed to initialize secure checkout. Please try again.");
  }

  // Redirect the user to the Stripe Checkout page securely
  window.location.href = data.url;
  
  // Return a promise that never resolves so the UI stays in loading state while redirecting
  return new Promise(() => {});
}