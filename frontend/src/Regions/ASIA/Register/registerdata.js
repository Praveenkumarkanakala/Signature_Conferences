// ═══════════════════════════════════════════════════════════
//  registerdata.js
//  All static data, validation, and submission logic.
//  To swap to real backend: only edit submitRegistration()
// ═══════════════════════════════════════════════════════════

// import { getConferencesByRegion, getAllConferences } from "../Globaldata/eventdata.js";
// import { getConferencesByRegion, getAllConferences } from "../Globaldata/eventdata";
import { getConferencesByRegion, conferences } from "../Globaldata/eventdata.js";


const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxrHYfalltdqw5mtY_E2stSrDAX-FPp5ObLe0YjTOl_zODHB2FbzU8x56EgWKU-mkRynQ/exec";

/* ─── REGIONS ─────────────────────────────────────────────── */
export const REGIONS = [
  { id: "all",        label: "All Regions", flag: "🌐" },
  { id: "asia",       label: "Asia",        flag: "🌏" },
  { id: "europe",     label: "Europe",      flag: "🌍" },
  { id: "americas",   label: "Americas",    flag: "🌎" },
  { id: "middleeast", label: "Middle East", flag: "🕌" },
  { id: "africa",     label: "Africa",      flag: "🌍" },
];

export function getConferencesForRegion(regionId) {
  if (!regionId || regionId === "all") return getAllConferences();
  return getConferencesByRegion(regionId);
}

/* ─── PACKAGES ────────────────────────────────────────────── */
export const PACKAGES = [
  {
    id: "platinum",
    name: "Platinum Speaker",
    price: 2999,
    badge: "Most Popular",
    color: "#e2c97e",
    benefits: [
      "45-min keynote on main stage",
      "Front-page feature on event website",
      "VIP lounge access all 3 days",
      "Professional photography & video",
      "5 complimentary delegate passes",
      "Post-event recording & distribution",
      "1-on-1 media interview opportunity",
      "Premium speaker gift pack",
    ],
  },
  {
    id: "gold",
    name: "Gold Speaker",
    price: 1999,
    badge: "Great Value",
    color: "#f0a040",
    benefits: [
      "30-min keynote on main stage",
      "Speaker bio & headshot on event site",
      "VIP lounge access",
      "Professional photography",
      "3 complimentary delegate passes",
      "Post-event recording",
      "Speaker gift pack",
    ],
  },
  {
    id: "silver",
    name: "Silver Speaker",
    price: 999,
    badge: "",
    color: "#b0bec5",
    benefits: [
      "20-minute spotlight talk",
      "Speaker profile on event website",
      "Networking lounge access",
      "1 complimentary delegate pass",
      "Post-event recording",
    ],
  },
  {
    id: "delegate",
    name: "Delegate Pass",
    price: 499,
    badge: "",
    color: "#80cbc4",
    benefits: [
      "Full 3-day conference access",
      "All keynote & panel sessions",
      "Networking events & roundtables",
      "Event materials & resources",
      "Lunch & refreshments included",
    ],
  },
];

export const COMPANION_PRICE = 199;

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
  packageId:    "",
  companions:   0,
};

/* ─── STEP META ───────────────────────────────────────────── */
export const STEP_META = {
  1: { step: "Step 1 of 3", title: "Personal Details & Conference Selection" },
  2: { step: "Step 2 of 3", title: "Choose Your Package"                     },
  3: { step: "Step 3 of 3", title: "Review & Confirm"                        },
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
  if (!f.packageId) e.packageId = "Please choose a package to continue";
  return e;
}

/* ─── PRICE ───────────────────────────────────────────────── */
export function calculateTotal(packageId, companions) {
  const pkg = PACKAGES.find((p) => p.id === packageId);
  if (!pkg) return 0;
  return pkg.price + companions * COMPANION_PRICE;
}

/* ─── SUBMIT ──────────────────────────────────────────────── */
/*
 * BACKEND MIGRATION — swap this fetch for your API:
 *
 *   const res = await fetch('/api/registrations', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) throw new Error(await res.text());
 *   return await res.json();
 */
export async function submitRegistration(fields, allConferences) {
  const conf  = allConferences.find((c) => String(c.id) === fields.conferenceId);
  const pkg   = PACKAGES.find((p) => p.id === fields.packageId);
  const total = calculateTotal(fields.packageId, fields.companions);

  const payload = {
    formType:           "register",
    submittedAt:        new Date().toISOString(),
    firstName:          fields.firstName    || "NO_DATA",
    lastName:           fields.lastName     || "NO_DATA",
    email:              fields.email        || "NO_DATA",
    phone:              fields.phone        || "NO_DATA",
    country:            fields.country      || "NO_DATA",
    organization:       fields.organization || "NO_DATA",
    jobTitle:           fields.jobTitle     || "NO_DATA",
    region:             fields.regionId     || "NO_DATA",
    conferenceTitle:    conf?.title         || "NO_DATA",
    conferenceLocation: conf?.location      || "NO_DATA",
    conferenceDate:     conf?.date          || "NO_DATA",
    packageName:        pkg?.name           || "NO_DATA",
    packagePrice:       pkg ? `$${pkg.price}` : "NO_DATA",
    companions:         String(fields.companions),
    companionCost:      `$${fields.companions * COMPANION_PRICE}`,
    totalAmount:        `$${total}`,
  };

  await fetch(APPS_SCRIPT_URL, {
    method:  "POST",
    mode:    "no-cors",
    headers: { "Content-Type": "text/plain" },
    body:    JSON.stringify(payload),
  });

  return payload;
}

export const getAllConferences = () => conferences;