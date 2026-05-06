
import {getConferencesByRegion, conferences} from "../../globaldata/eventsglobaldata.js"

const APPS_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyxEgJ2IZf7S5OIzg6L6nNdSkIWstY5YiQ1GKnrjjmbClt_dkEWCXvtYcxca0KBZB7nxQ/exec"
/* ─── REGIONS ─────────────────────────────────────────────── */
export const REGIONS = [
  { id: "asia",          label: "Asia",          flag: "🌏" },
  { id: "europe",        label: "Europe",        flag: "🌍" },
  { id: "north-america", label: "North America", flag: "🌎" },
  { id: "usa",           label: "USA",           flag: "🌎" },
];

export function getConferencesForRegion(regionId) {
  if (!regionId || regionId === "all") return conferences;
  return getConferencesByRegion(regionId);
}

/* ─── PACKAGES ────────────────────────────────────────────── */
export const PHYSICAL_PACKAGES = [
  {
    id: "standard",
    name: "Standard Speaker Pass",
    price: 699,
    badge: "",
    color: "#e8593c",
    type: "physical",
    icon: "🎤",
    benefits: [
      "Dedicated presentation slot at the conference",
      "Full access to all speaker and poster sessions",
      "Official conference proceedings and kit",
      "Certificate of presentation",
      "Coffee breaks and lunch during the event",
    ],
  },
  {
    id: "deal-a",
    name: "Deal A – Speaker + 2 Nights",
    price: 999,
    badge: "Popular",
    color: "#f0a040",
    type: "physical",
    icon: "🏨",
    benefits: [
      "All Standard Speaker Pass benefits",
      "2 nights accommodation — deluxe single room at venue",
      "Complimentary breakfast daily",
      "Coffee breaks and lunch included",
      "High-speed Wi-Fi access",
    ],
  },
  {
    id: "deal-b",
    name: "Deal B – Speaker + 3 Nights",
    price: 1099,
    badge: "Best Value",
    color: "#4ade80",
    type: "physical",
    icon: "🌟",
    benefits: [
      "All speaker benefits included",
      "3 nights deluxe accommodation at venue",
      "Complimentary breakfast, coffee breaks, and lunch",
      "High-speed Wi-Fi access",
      "Conference materials and full certification",
    ],
  },
];

export const VIRTUAL_PACKAGES = [
  {
    id: "virtual-speaker",
    name: "Virtual Speaker Pass",
    price: 299,
    badge: "",
    color: "#60a5fa",
    type: "virtual",
    icon: "💻",
    benefits: [
      "25-minute speaking slot with live Q&A (5 min)",
      "Streamed on YouTube, Facebook & Twitter",
      "Opportunity to open or close sessions",
      "Full-page feature in the conference booklet",
      "Logo promotion across event platforms",
      "Speaker certification",
      "Eligibility for Best Speaker Award",
      "Access to breakout networking sessions",
      "Interactive audience engagement via QR integration",
      "Pre-event technical dry run included",
    ],
  },
  {
    id: "virtual-keynote",
    name: "Virtual Keynote Pass",
    price: 399,
    badge: "High Impact",
    color: "#c084fc",
    type: "virtual",
    icon: "🎙️",
    benefits: [
      "Prime-slot keynote for maximum audience reach",
      "Keynote recognition and branding",
      "Participation in expert panels",
      "Ambassador or judge opportunities",
      "Eligibility for speaker awards",
      "Full-page feature in conference booklet",
      "Logo promotion across all platforms",
      "Exclusive keynote certification",
      "Lead breakout networking sessions",
      "Hosted on Airmeet with Zoom presentation suite",
    ],
  },
];

export const PACKAGES = [...PHYSICAL_PACKAGES, ...VIRTUAL_PACKAGES];

export const COMPANION_PRICE = 199;

/* ─── COUPON CODES ────────────────────────────────────────── */
export const COUPON_CODES = {
  GET100: 100,
  GET200: 200,
};

export function applyCoupon(code) {
  const upper = (code || "").trim().toUpperCase();
  const discount = COUPON_CODES[upper];
  if (discount) return { valid: true, discount, code: upper };
  return { valid: false, discount: 0, code: upper };
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
  speakerType:  "",   // "physical" | "virtual"
  packageId:    "",
  companions:   0,
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
export function calculateTotal(packageId, companions, discount = 0) {
  const pkg = PACKAGES.find((p) => p.id === packageId);
  if (!pkg) return 0;
  const companionCost = pkg.type === "virtual" ? 0 : companions * COMPANION_PRICE;
  const subtotal = pkg.price + companionCost;
  return Math.max(0, subtotal - discount);
}

/* ─── SUBMIT ──────────────────────────────────────────────── */
export async function submitRegistration(fields, allConferences) {
  const conf  = allConferences.find((c) => String(c.id) === fields.conferenceId);
  const pkg   = PACKAGES.find((p) => p.id === fields.packageId);
  const total = calculateTotal(fields.packageId, fields.companions, fields.discount || 0);
  const regionLabel = REGIONS.find((r) => r.id === fields.regionId)?.label || "NO_DATA";

  // ── Payload keys must match Google Sheet column headers exactly ──
  const payload = {
    formType:     "register",
    Timestamp:    new Date().toISOString(),
    FirstName:    fields.firstName    || "NO_DATA",
    LastName:     fields.lastName     || "NO_DATA",
    Email:        fields.email        || "NO_DATA",
    Phone:        fields.phone        || "NO_DATA",
    Country:      fields.country      || "NO_DATA",
    Organization: fields.organization || "NO_DATA",
    JobTitle:     fields.jobTitle     || "NO_DATA",
    Region:       regionLabel,
    Conference:   conf ? `${conf.title} · ${conf.location} · ${conf.date}` : "NO_DATA",
    SpeakerType:  fields.speakerType  || "NO_DATA",
    PackageName:  pkg?.name           || "NO_DATA",
    PackagePrice: pkg              ? `$${pkg.price}` : "NO_DATA",
    Companions:   String(fields.companions),
    CompanionCost:`$${fields.speakerType === "virtual" ? 0 : fields.companions * COMPANION_PRICE}`,
    Coupon:       fields.couponCode   || "NONE",
    Discount:     fields.discount > 0 ? `-$${fields.discount}` : "$0",
    TotalAmount:  `$${total}`,
  };

  // no-cors is required for Google Apps Script — fetch will not throw on success
  await fetch(APPS_SCRIPT_URL, {
    method:  "POST",
    mode:    "no-cors",
    headers: { "Content-Type": "text/plain" },
    body:    JSON.stringify(payload),
  });

  return payload;
}

export const getAllConferences = () => conferences;