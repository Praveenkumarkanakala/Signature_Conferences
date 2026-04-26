import { useState, useEffect } from "react";
import { Navbar } from "../Landingpage/homepage.jsx";
import { getConferencesByRegion } from "../globaldata/eventsglobaldata.js";
import { speakerPackages, delegatePass } from "../Landingpage/homedata.js";
import { earlyBirdOffer } from "../Landingpage/homedata.js";
import { submitToSheets } from "../utils/formSubmit.js";
import Footer from "../../../Components/Footer/footer";
import "./register.css";
import "../Landingpage/homepage.css";

const REGION = "asia";
const conferences = getConferencesByRegion(REGION);

/* ─── HELPERS ────────────────────────────────── */
const allPackages = [
  ...speakerPackages,
  {
    id: 4,
    name: delegatePass.name,
    badge: "",
    earlyBirdPrice: delegatePass.earlyBirdPrice,
    regularPrice: delegatePass.regularPrice,
    includes: delegatePass.includes,
    note: "",
  },
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  organization: "",
  jobTitle: "",
  conferenceId: "",
  packageId: "",
  bio: "",
  topics: "",
};

function validateStep1(fields) {
  const errors = {};
  if (!fields.firstName.trim()) errors.firstName = "First name is required";
  if (!fields.lastName.trim()) errors.lastName = "Last name is required";
  if (!fields.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(fields.email))
    errors.email = "Enter a valid email";
  if (!fields.phone.trim()) errors.phone = "Phone number is required";
  if (!fields.country.trim()) errors.country = "Country is required";
  return errors;
}

function validateStep2(fields) {
  const errors = {};
  if (!fields.conferenceId) errors.conferenceId = "Please select a conference";
  return errors;
}

function validateStep3(fields) {
  const errors = {};
  if (!fields.packageId) errors.packageId = "Please select a package";
  return errors;
}

/* ─── STEP INDICATOR ─────────────────────────── */
function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: "Personal Details" },
    { num: 2, label: "Select Conference" },
    { num: 3, label: "Choose Package" },
  ];
  return (
    <div className="usa-rg-step-indicator">
      {steps.map((s, i) => (
        <div key={s.num} className="usa-rg-step-indicator__item">
          <div
            className={`usa-rg-step-indicator__circle${
              currentStep > s.num
                ? " usa-rg-step-indicator__circle--done"
                : currentStep === s.num
                  ? " usa-rg-step-indicator__circle--active"
                  : ""
            }`}
          >
            {currentStep > s.num ? "✓" : s.num}
          </div>
          <span
            className={`usa-rg-step-indicator__label${
              currentStep === s.num
                ? " usa-rg-step-indicator__label--active"
                : ""
            }`}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`usa-rg-step-indicator__line${
                currentStep > s.num
                  ? " usa-rg-step-indicator__line--done"
                  : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── HERO ───────────────────────────────────── */
function RegisterHero() {
  return (
    <section className="usa-rg-hero">
      <div className="usa-rg-hero__glow" />
      <div className="usa-rg-hero__content">
        <span className="usa-rg-hero__tag">Speaker Registration 2027</span>
        <h1 className="usa-rg-hero__title">
          Claim Your <br />
          <em>Global Stage</em>
        </h1>
        <p className="usa-rg-hero__sub">
          Register now to secure your speaking slot at one of our world-class
          conferences across Asia. Limited seats available.
        </p>
      </div>
    </section>
  );
}

/* ─── EARLY BIRD BANNER ──────────────────────── */
function EarlyBirdBanner() {
  return (
    <div className="usa-rg-early-bird">
      <div className="usa-rg-early-bird__inner">
        <span className="usa-rg-early-bird__badge">{earlyBirdOffer.title}</span>
        <p className="usa-rg-early-bird__text">
          {earlyBirdOffer.description}{" "}
          <strong>{earlyBirdOffer.securedText}</strong>
        </p>
        <span className="usa-rg-early-bird__slots">
          ⚡ {earlyBirdOffer.reminder}
        </span>
      </div>
    </div>
  );
}

/* ─── PACKAGE PICKER ─────────────────────────── */
function PackagePicker({ selected, onSelect, error }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (e, pkgId) => {
    e.stopPropagation();
    setExpandedId((prev) => (prev === pkgId ? null : pkgId));
  };

  return (
    <div className="usa-rg-field usa-rg-field--full">
      <label className="usa-rg-label">
        Speaker Package <span>*</span>
      </label>
      <div className="usa-rg-packages">
        {allPackages.map((pkg) => {
          const isSelected = selected === String(pkg.id);
          const isExpanded = expandedId === pkg.id;
          return (
            <div
              key={pkg.id}
              className={`usa-rg-package${isSelected ? " usa-rg-package--selected" : ""}`}
              onClick={() => onSelect(String(pkg.id))}
            >
              <div className="usa-rg-package__radio">
                <div className="usa-rg-package__radio-dot" />
              </div>
              <div className="usa-rg-package__info">
                <div className="usa-rg-package__top">
                  <span className="usa-rg-package__name">{pkg.name}</span>
                  {pkg.badge ? (
                    <span className="usa-rg-package__badge">{pkg.badge}</span>
                  ) : null}
                </div>
                <div className="usa-rg-package__prices">
                  <span className="usa-rg-package__early">
                    {pkg.earlyBirdPrice} Early Bird
                  </span>
                  <span className="usa-rg-package__regular">
                    {pkg.regularPrice}
                  </span>
                </div>
                <div className="usa-rg-package__perks">
                  {pkg.includes.slice(0, 3).map((perk) => (
                    <span key={perk} className="usa-rg-package__perk">
                      ✓ {perk}
                    </span>
                  ))}
                </div>
                {isExpanded && pkg.includes.length > 3 && (
                  <div className="usa-rg-package__perks usa-rg-package__perks--expanded">
                    {pkg.includes.slice(3).map((perk) => (
                      <span key={perk} className="usa-rg-package__perk">
                        ✓ {perk}
                      </span>
                    ))}
                  </div>
                )}
                {pkg.includes.length > 3 && (
                  <button
                    className="usa-rg-package__more-btn"
                    onClick={(e) => toggleExpand(e, pkg.id)}
                  >
                    {isExpanded
                      ? "Show less ▲"
                      : `+${pkg.includes.length - 3} more features ▼`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {error && <span className="usa-rg-error-msg">{error}</span>}
    </div>
  );
}

/* ─── SUCCESS SCREEN ─────────────────────────── */
function SuccessScreen({ data, onReset }) {
  const conf = conferences.find((c) => String(c.id) === data.conferenceId);
  const pkg = allPackages.find((p) => String(p.id) === data.packageId);

  return (
    <section className="usa-rg-success">
      <div className="usa-rg-success__card">
        <div className="usa-rg-success__icon">✓</div>
        <h2 className="usa-rg-success__title">
          You're <em>Registered!</em>
        </h2>
        <p className="usa-rg-success__sub">
          Welcome to Signature Global Conferences. Your application has been
          received and our team will be in touch with you shortly.
        </p>
        <div className="usa-rg-success__details">
          {[
            { label: "Name", value: `${data.firstName} ${data.lastName}` },
            { label: "Email", value: data.email },
            { label: "Conference", value: conf ? conf.title : "—" },
            { label: "Package", value: pkg ? `${pkg.name} — ${pkg.earlyBirdPrice}` : "—" },
            { label: "Location", value: conf ? conf.location : "—" },
            { label: "Date", value: conf ? conf.date : "—" },
          ].map(({ label, value }) => (
            <div key={label} className="usa-rg-success__detail-row">
              <span className="usa-rg-success__detail-label">{label}</span>
              <span className="usa-rg-success__detail-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="usa-rg-success__actions">
          <button className="usa-rg-submit-btn" onClick={onReset}>
            Register Another
          </button>
          <button className="usa-rg-back-btn">View Conferences</button>
        </div>
      </div>
    </section>
  );
}

/* ─── STEP 1 — Personal Details ─────────────── */
function Step1({ fields, errors, set }) {
  return (
    <div className="usa-rg-form-body">
      <div className="usa-rg-row">
        <div className="usa-rg-field">
          <label className="usa-rg-label">First Name <span>*</span></label>
          <input
            value={fields.firstName}
            onChange={set("firstName")}
            className={`usa-rg-input${errors.firstName ? " usa-rg-input--error" : ""}`}
            placeholder="Jane"
          />
          {errors.firstName && <span className="usa-rg-error-msg">{errors.firstName}</span>}
        </div>
        <div className="usa-rg-field">
          <label className="usa-rg-label">Last Name <span>*</span></label>
          <input
            value={fields.lastName}
            onChange={set("lastName")}
            className={`usa-rg-input${errors.lastName ? " usa-rg-input--error" : ""}`}
            placeholder="Smith"
          />
          {errors.lastName && <span className="usa-rg-error-msg">{errors.lastName}</span>}
        </div>
      </div>

      <div className="usa-rg-row">
        <div className="usa-rg-field">
          <label className="usa-rg-label">Email Address <span>*</span></label>
          <input
            value={fields.email}
            onChange={set("email")}
            type="email"
            className={`usa-rg-input${errors.email ? " usa-rg-input--error" : ""}`}
            placeholder="jane@example.com"
          />
          {errors.email && <span className="usa-rg-error-msg">{errors.email}</span>}
        </div>
        <div className="usa-rg-field">
          <label className="usa-rg-label">Phone Number <span>*</span></label>
          <input
            value={fields.phone}
            onChange={set("phone")}
            className={`usa-rg-input${errors.phone ? " usa-rg-input--error" : ""}`}
            placeholder="+1 234 567 8900"
          />
          {errors.phone && <span className="usa-rg-error-msg">{errors.phone}</span>}
        </div>
      </div>

      <div className="usa-rg-row">
        <div className="usa-rg-field">
          <label className="usa-rg-label">Country <span>*</span></label>
          <input
            value={fields.country}
            onChange={set("country")}
            className={`usa-rg-input${errors.country ? " usa-rg-input--error" : ""}`}
            placeholder="United States"
          />
          {errors.country && <span className="usa-rg-error-msg">{errors.country}</span>}
        </div>
        <div className="usa-rg-field">
          <label className="usa-rg-label">Organization</label>
          <input
            value={fields.organization}
            onChange={set("organization")}
            className="usa-rg-input"
            placeholder="Company / Brand"
          />
        </div>
      </div>

      <div className="usa-rg-row">
        <div className="usa-rg-field usa-rg-field--full">
          <label className="usa-rg-label">Job Title / Role</label>
          <input
            value={fields.jobTitle}
            onChange={set("jobTitle")}
            className="usa-rg-input"
            placeholder="CEO, Coach, Author…"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── STEP 2 — Conference Selection ─────────── */
function Step2({ fields, errors, set }) {
  return (
    <div className="usa-rg-form-body">
      <div className="usa-rg-field usa-rg-field--full">
        <label className="usa-rg-label">Conference <span>*</span></label>
        <div className="usa-rg-select-wrap">
          <select
            value={fields.conferenceId}
            onChange={set("conferenceId")}
            className={`usa-rg-select${errors.conferenceId ? " usa-rg-select--error" : ""}`}
          >
            <option value="">— Choose a conference —</option>
            {conferences.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.title} · {c.location} · {c.date}
              </option>
            ))}
          </select>
        </div>
        {errors.conferenceId && (
          <span className="usa-rg-error-msg">{errors.conferenceId}</span>
        )}
      </div>
    </div>
  );
}

/* ─── STEP 3 — Package + Optional ───────────── */
function Step3({ fields, errors, set, setFields }) {
  return (
    <div className="usa-rg-form-body">
      <PackagePicker
        selected={fields.packageId}
        onSelect={(val) => setFields((prev) => ({ ...prev, packageId: val }))}
        error={errors.packageId}
      />
      <div className="usa-rg-divider">
        <div className="usa-rg-divider__line" />
        <span className="usa-rg-divider__label">Optional</span>
        <div className="usa-rg-divider__line" />
      </div>
      <div className="usa-rg-field usa-rg-field--full">
        <label className="usa-rg-label">Short Bio</label>
        <textarea
          value={fields.bio}
          onChange={set("bio")}
          className="usa-rg-textarea"
          placeholder="Tell us a little about yourself and your expertise…"
        />
      </div>
      <div className="usa-rg-field usa-rg-field--full">
        <label className="usa-rg-label">Speaking Topics</label>
        <textarea
          value={fields.topics}
          onChange={set("topics")}
          className="usa-rg-textarea usa-rg-textarea--short"
          placeholder="Leadership, AI, Wellness, Entrepreneurship…"
        />
      </div>
    </div>
  );
}

/* ─── MAIN FORM ──────────────────────────────── */
function RegistrationForm({ onSuccess }) {
  const [fields, setFields] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (e) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleNext = () => {
    let errs = {};
    if (step === 1) errs = validateStep1(fields);
    if (step === 2) errs = validateStep2(fields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const errs = validateStep3(fields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);

    const conf = conferences.find((c) => String(c.id) === fields.conferenceId);
    const pkg = allPackages.find((p) => String(p.id) === fields.packageId);

    try {
      await submitToSheets({
        formType: "register",
        firstName: fields.firstName || "NO_DATA",
        lastName: fields.lastName || "NO_DATA",
        email: fields.email || "NO_DATA",
        phone: fields.phone || "NO_DATA",
        country: fields.country || "NO_DATA",
        organization: fields.organization || "NO_DATA",
        jobTitle: fields.jobTitle || "NO_DATA",
        conference: conf ? `${conf.title} · ${conf.location} · ${conf.date}` : "NO_DATA",
        packageName: pkg ? pkg.name : "NO_DATA",
        packagePrice: pkg ? pkg.earlyBirdPrice : "NO_DATA",
        bio: fields.bio || "NO_DATA",
        topics: fields.topics || "NO_DATA",
      });
      onSuccess(fields);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const stepMeta = {
    1: { step: "Step 1 of 3 — Personal Details", title: "Tell Us About Yourself" },
    2: { step: "Step 2 of 3 — Select Conference", title: "Where Do You Want to Speak?" },
    3: { step: "Step 3 of 3 — Choose Package", title: "Pick Your Speaker Package" },
  };

  return (
    <div className="usa-rg-form-card">
      <div className="usa-rg-form-card__header">
        <StepIndicator currentStep={step} />
        <div className="usa-rg-form-card__step">{stepMeta[step].step}</div>
        <div className="usa-rg-form-card__title">{stepMeta[step].title}</div>
      </div>

      {step === 1 && <Step1 fields={fields} errors={errors} set={set} />}
      {step === 2 && <Step2 fields={fields} errors={errors} set={set} />}
      {step === 3 && (
        <Step3 fields={fields} errors={errors} set={set} setFields={setFields} />
      )}

      <div className="usa-rg-form-footer">
        <div className="usa-rg-form-footer__actions">
          {step > 1 && (
            <button className="usa-rg-back-btn" onClick={handleBack}>
              ← Back
            </button>
          )}
          {step < 3 ? (
            <button className="usa-rg-submit-btn" onClick={handleNext}>
              Continue →
            </button>
          ) : (
            <button
              className="usa-rg-submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Complete Registration →"}
            </button>
          )}
        </div>
        <p className="usa-rg-form-note">
          By registering you agree to our Terms &amp; Conditions. Your data will
          only be used for conference coordination purposes.
        </p>
      </div>
    </div>
  );
}

/* ─── ROOT ───────────────────────────────────── */
export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  /* ✅ SCROLL FIX: Removed conflicting useEffect */
  /* Scroll is now handled natively by <html>/<body> */
  /* Navbar manages its own scroll-lock when mobile menu opens */

  const handleSuccess = (data) => {
    setSubmittedData(data);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedData(null);
  };

  return (
    /* ✅ usa-page wrapper — activates all scoped CSS variables & navbar styles */
    <div className="usa-page">
      <Navbar />
      {submitted ? (
        <SuccessScreen data={submittedData} onReset={handleReset} />
      ) : (
        <>
          <RegisterHero />
          <EarlyBirdBanner />
          <section className="usa-rg-section">
            <div className="usa-rg-section__inner usa-rg-section__inner--centered">
              <RegistrationForm onSuccess={handleSuccess} />
            </div>
          </section>
        </>
      )}
      <Footer theme="usa" />
    </div>
  );
}