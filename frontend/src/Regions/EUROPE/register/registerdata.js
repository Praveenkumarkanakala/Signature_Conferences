import { getConferencesByRegion, conferences } from "../../globaldata/eventsglobaldata.js";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzkJsD4yRz2VRCGzJ1TAmkL9IiOfUB_FaybX2ieioTyq1twWx0IDJrqDtE-RiNOWc7cEQ/exec";

const ADMIN_EMAIL = "europesignatureconferences@gmail.com";

// ──────────────── REGIONS ───────────────────────
export const REGIONS = [
  // { id: "asia",          label: "Asia",          flag: "🌏" },
  { id: "europe",        label: "Europe",        flag: "🌍" },
  // { id: "north-america", label: "North America", flag: "🌎" },
  // { id: "usa",           label: "USA",           flag: "🌎" },
];

export const getConferencesForRegion = (regionId) =>
  !regionId || regionId === "all" ? conferences : getConferencesByRegion(regionId);

// ───────────────────── PACKAGES ──────────────────────────
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
      "Includes a dedicated presentation slot at the conference",
      "Full access to all speaker and poster sessions",
      "Official conference proceedings and kit",
      "Certificate of presentation",
      "Along with coffee breaks and lunch during the event",
      "Without accommodation",
    ],
  },
  {
    id: "Deal A",
    name: "Deal A - Speaker Pass + 2 Nights",
    price: 999,
    badge: "Popular",
    color: "#f0a040",
    type: "physical",
    icon: "🏨",
    benefits: [
      "Includes all Standard Speaker benefits",
      "Along with 2 nights of accommodation in a deluxe single room at the conference venue",
      "Also includes complimentary breakfast, coffee breaks, lunch, and high-speed Wi-Fi access.",
    ],
  },
  {
    id: "Deal B",
    name: "Deal B - Speaker Pass + 3 Nights",
    price: 1099,
    badge: "Best Value",
    color: "#4ade80",
    type: "physical",
    icon: "🌟",
    benefits: [
      "A comprehensive package offering all speaker benefits",
      "Plus 3 nights of deluxe accommodation at the venue",
      "Enjoy complimentary breakfast, coffee breaks, lunch, Wi-Fi access, conference materials, and certification.",
    ],
  },
  {
    id: "DELEGATE PASS",
    name: "DELEGATE PASS - Conference Access",
    price: 199,
    badge: "New",
    color: "#6366f1",
    type: "physical",
    icon: "🎟️",
    benefits: [
      "Full Access to All Sessions",
      "Networking Opportunities",
      "Participation Certificate",
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
      "25-minute speaking slot with Q&A",
      "Open/close session opportunity",
      "Full-page feature in conference booklet",
      "Logo promotion across platforms",
      "Speaker certification",
      "Best Speaker Award eligibility",
      "Breakout networking access",
      "QR audience engagement integration",
      "Pre-event technical dry run",
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
      "Keynote recognition and branding",
      "Expert panel participation",
      "Ambassador/judge opportunities",
      "Speaker award eligibility",
      "Full-page booklet feature",
      "Logo promotion on all platforms",
      "Exclusive keynote certification",
      "Lead breakout networking sessions",
      "Hosted on Airmeet with Zoom suite",
    ],
  },
];

export const PACKAGES          = [...PHYSICAL_PACKAGES, ...VIRTUAL_PACKAGES];
export const COMPANION_PRICE   = 199;
export const EXTRA_NIGHT_PRICE = 149;

// ─────────── COUPON CODES ─────────────────
export const COUPON_CODES = { GET100: 100, GET200: 200, GET300: 300 };

export const applyCoupon = (code) => {
  const upper    = (code || "").trim().toUpperCase();
  const discount = COUPON_CODES[upper];
  return discount
    ? { valid: true, discount, code: upper }
    : { valid: false, discount: 0, code: upper };
};

// ─────────────── INITIAL FORM STATE ───────────────────────
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

// ───────────────────── STEP META ────────────────────────
export const STEP_META = {
  1: { step: "Step 1 of 3", title: "Personal Details & Conference Selection" },
  2: { step: "Step 2 of 3", title: "Choose Your Package"                     },
  3: { step: "Step 3 of 3", title: "Review & Confirm"                        },
};

// ────────────────── VALIDATION ───────────────────────────
export const validateStep1 = (f) => {
  const e = {};
  if (!f.firstName.trim())                 e.firstName    = "First name is required";
  if (!f.lastName.trim())                  e.lastName     = "Last name is required";
  if (!f.email.trim())                     e.email        = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email        = "Enter a valid email";
  if (!f.phone.trim())                     e.phone        = "Phone number is required";
  if (!f.country.trim())                   e.country      = "Country is required";
  if (!f.regionId)                         e.regionId     = "Please select a region";
  if (!f.conferenceId)                     e.conferenceId = "Please select a conference";
  return e;
};

export const validateStep2 = (f) => {
  const e = {};
  if (!f.speakerType) e.speakerType = "Please choose Physical or Virtual";
  if (!f.packageId)   e.packageId   = "Please choose a package to continue";
  return e;
};

// ─────────────────────────────────────────────────────────────
//  PRICE CALCULATION
// ─────────────────────────────────────────────────────────────
export const calculateTotal = (packageId, companions, discount = 0, extraNights = 0) => {
  const pkg = PACKAGES.find((p) => p.id === packageId);
  if (!pkg) return 0;
  const extra =
    pkg.type === "virtual"
      ? 0
      : (companions || 0) * COMPANION_PRICE + (extraNights || 0) * EXTRA_NIGHT_PRICE;
  return Math.max(0, pkg.price + extra - discount);
};

// ─────────────────────────────────────────────────────────────
//  INTERNAL HELPER — single email dispatch via Apps Script
// ─────────────────────────────────────────────────────────────
const sendEmail = ({ to, subject, body, replyTo = "" }) =>
  fetch(APPS_SCRIPT_URL, {
    method:  "POST",
    mode:    "no-cors",
    headers: { "Content-Type": "text/plain" },
    body:    JSON.stringify({ to, subject, body, replyTo }),
  });

// ─────────────────────────────────────────────────────────────
//  EMAIL 1 — Confirmation to the registrant (Professional)
// ─────────────────────────────────────────────────────────────
const sendUserConfirmation = (p) => {
  const subject = `Registration Confirmed — ${p.PackageName} | Signature Global Conferences`;

  const divider   = "─".repeat(60);
  const thinLine  = "·".repeat(60);

  const body = [
    "",
    "  SIGNATURE GLOBAL CONFERENCES",
    "  Registration Confirmation",
    "",
    divider,
    "",
    `  Dear ${p.FirstName} ${p.LastName},`,
    "",
    "  Congratulations! Your speaker registration has been successfully",
    "  received. We are thrilled to welcome you to our global stage.",
    "",
    "  Our team will reach out within 24–48 hours to confirm your",
    "  payment and share your speaker kit.",
    "",
    divider,
    "  YOUR REGISTRATION DETAILS",
    divider,
    "",
    "  PERSONAL INFORMATION",
    thinLine,
    `  Name             :  ${p.FirstName} ${p.LastName}`,
    `  Email            :  ${p.Email}`,
    `  Phone            :  ${p.Phone}`,
    `  Country          :  ${p.Country}`,
    ...(p.Organization !== "NO_DATA" ? [`  Organization     :  ${p.Organization}`] : []),
    ...(p.JobTitle !== "NO_DATA"     ? [`  Job Title        :  ${p.JobTitle}`]     : []),
    "",
    "  CONFERENCE DETAILS",
    thinLine,
    `  Region           :  ${p.Region}`,
    `  Conference       :  ${p.Conference}`,
    `  Speaker Type     :  ${p.SpeakerType}`,
    "",
    "  PACKAGE & PRICING",
    thinLine,
    `  Package          :  ${p.PackageName}`,
    `  Base Price       :  ${p.PackagePrice}`,
    ...(Number(p.Companions) > 0   ? [`  Companions       :  ${p.Companions} person(s)  (+${p.CompanionCost})`]   : []),
    ...(Number(p.ExtraNights) > 0  ? [`  Extra Nights     :  ${p.ExtraNights} night(s)   (+${p.ExtraNightCost})`] : []),
    ...(p.Coupon !== "NONE"        ? [`  Coupon Applied   :  ${p.Coupon}  (${p.Discount} discount)`]              : []),
    "",
    divider,
    `  TOTAL AMOUNT DUE :  ${p.TotalAmount}`,
    divider,
    "",
    "  WHAT HAPPENS NEXT?",
    thinLine,
    "",
    "  1.  Our team will contact you within 24–48 hours",
    "  2.  You will receive a secure payment link via email",
    "  3.  Upon payment, your speaker kit & schedule will be sent",
    "  4.  You will receive your official Speaker Certificate post-event",
    "",
    divider,
    "",
    "  Need assistance? We are here to help.",
    `  Email  :  ${p.AdminEmail}`,
    "  Web    :  www.signaturetalks.org",
    "",
    divider,
    "",
    "  Thank you for choosing Signature Global Conferences.",
    "  We look forward to hosting you on our global stage.",
    "",
    "  Warm regards,",
    "  The Signature Global Conferences Team",
    "  www.signaturetalks.org",
    "",
    divider,
    "  This is an automated confirmation. Please do not reply to",
    "  this email. For queries, write to us at the address above.",
    divider,
    "",
  ].join("\n");

  return sendEmail({ to: p.Email, subject, body });
};

// ─────────────────────────────────────────────────────────────
//  EMAIL 2 — Notification to admin (Professional)
// ─────────────────────────────────────────────────────────────
const sendAdminNotification = (p) => {
  const submittedAt = new Date(p.Timestamp).toLocaleString("en-GB", {
    timeZone:  "Europe/London",
    dateStyle: "long",
    timeStyle: "short",
  });

  const subject = `[NEW REGISTRATION]  ${p.FirstName} ${p.LastName}  |  ${p.PackageName}  |  ${p.Region}`;

  const divider  = "═".repeat(60);
  const thinLine = "─".repeat(60);

  const body = [
    "",
    divider,
    "  SIGNATURE GLOBAL CONFERENCES",
    "  New Speaker Registration Alert",
    divider,
    "",
    `  Received on  :  ${submittedAt} (GMT)`,
    "",
    thinLine,
    "  APPLICANT DETAILS",
    thinLine,
    `  Full Name        :  ${p.FirstName} ${p.LastName}`,
    `  Email            :  ${p.Email}`,
    `  Phone            :  ${p.Phone}`,
    `  Country          :  ${p.Country}`,
    `  Organization     :  ${p.Organization !== "NO_DATA" ? p.Organization : "Not provided"}`,
    `  Job Title        :  ${p.JobTitle     !== "NO_DATA" ? p.JobTitle     : "Not provided"}`,
    "",
    thinLine,
    "  CONFERENCE SELECTION",
    thinLine,
    `  Region           :  ${p.Region}`,
    `  Conference       :  ${p.Conference}`,
    `  Speaker Type     :  ${(p.SpeakerType || "").toUpperCase()}`,
    "",
    thinLine,
    "  PACKAGE & PRICING BREAKDOWN",
    thinLine,
    `  Package          :  ${p.PackageName}`,
    `  Base Price       :  ${p.PackagePrice}`,
    `  Companions       :  ${p.Companions}${Number(p.Companions) > 0  ? `  (+${p.CompanionCost})`  : "  (None)"}`,
    `  Extra Nights     :  ${p.ExtraNights}${Number(p.ExtraNights) > 0 ? `  (+${p.ExtraNightCost})` : "  (None)"}`,
    `  Coupon Applied   :  ${p.Coupon !== "NONE" ? `${p.Coupon}  (${p.Discount})` : "None"}`,
    "",
    divider,
    `  TOTAL AMOUNT     :  ${p.TotalAmount}`,
    divider,
    "",
    thinLine,
    "  REQUIRED ACTIONS",
    thinLine,
    "",
    "  [ ]  Reply to applicant within 24–48 hours",
    "  [ ]  Send payment link / confirm payment method",
    "  [ ]  Dispatch speaker kit and conference schedule",
    "  [ ]  Add to speaker roster and internal tracker",
    "",
    thinLine,
    "  QUICK REPLY DETAILS",
    thinLine,
    `  Applicant Email  :  ${p.Email}`,
    `  Applicant Phone  :  ${p.Phone}`,
    "",
    "  Reply directly to this email to contact the applicant.",
    "",
    divider,
    "  Europe Signature Global Conferences — Registration System",
    `  Automated alert generated at ${submittedAt} (GMT)`,
    divider,
    "",
  ].join("\n");

  return sendEmail({ to: ADMIN_EMAIL, subject, body, replyTo: p.Email });
};

// ─────────────────────────────────────────────────────────────
//  SUBMIT REGISTRATION
// ─────────────────────────────────────────────────────────────
export const submitRegistration = async (fields, allConferences) => {
  const conf        = allConferences.find((c) => String(c.id) === fields.conferenceId);
  const pkg         = PACKAGES.find((p) => p.id === fields.packageId);
  const total       = calculateTotal(
    fields.packageId, fields.companions, fields.discount || 0, fields.extraNights || 0
  );
  const regionLabel = REGIONS.find((r) => r.id === fields.regionId)?.label || "NO_DATA";
  const isVirtual   = fields.speakerType === "virtual";

  const payload = {
    Timestamp:      new Date().toISOString(),
    FirstName:      fields.firstName    || "NO_DATA",
    LastName:       fields.lastName     || "NO_DATA",
    Email:          fields.email        || "NO_DATA",
    Phone:          `${fields.countryCode || ""} ${fields.phone || ""}`.trim() || "NO_DATA",
    Country:        fields.country      || "NO_DATA",
    Organization:   fields.organization || "NO_DATA",
    JobTitle:       fields.jobTitle     || "NO_DATA",
    Region:         regionLabel,
    Conference:     conf ? `${conf.title} · ${conf.location} · ${conf.date}` : "NO_DATA",
    SpeakerType:    fields.speakerType  || "NO_DATA",
    PackageName:    pkg?.name           || "NO_DATA",
    PackagePrice:   pkg                 ? `$${pkg.price}` : "NO_DATA",
    Companions:     String(fields.companions   || 0),
    CompanionCost:  `$${isVirtual ? 0 : (fields.companions  || 0) * COMPANION_PRICE}`,
    ExtraNights:    String(fields.extraNights  || 0),
    ExtraNightCost: `$${isVirtual ? 0 : (fields.extraNights || 0) * EXTRA_NIGHT_PRICE}`,
    Coupon:         fields.couponCode   || "NONE",
    Discount:       fields.discount > 0 ? `-$${fields.discount}` : "$0",
    TotalAmount:    `$${total}`,
    AdminEmail:     ADMIN_EMAIL,
  };

  await Promise.all([
    sendUserConfirmation(payload),
    sendAdminNotification(payload),
  ]);

  return payload;
};

export const getAllConferences = () => conferences;