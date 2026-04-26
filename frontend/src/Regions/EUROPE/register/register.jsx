import { useState } from "react";
import { Navbar } from "../Landingpage/eurohome.jsx";
import { getConferencesByRegion } from "../globaldata/eventsglobaldata.js";
import { speakerPackages, delegatePass } from "../Landingpage/eurohome.jsx";
import { earlyBirdOffer } from "../Landingpage/eurohome.jsx";
import { submitToSheets } from "../utils/formSubmit.js";
import "./register.css";
import "../Landingpage/eurohome.css";
import Footer from "../../../Components/Footer/footer";

const REGION = "europe";
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
    <div className="europe-step-indicator">
      {steps.map((s, i) => (
        <div key={s.num} className="europe-step-indicator__item">
          <div
            className={`europe-step-indicator__circle ${
              currentStep > s.num
                ? "europe-step-indicator__circle--done"
                : currentStep === s.num
                ? "europe-step-indicator__circle--active"
                : ""
            }`}
          >
            {currentStep > s.num ? "✓" : s.num}
          </div>
          <span
            className={`europe-step-indicator__label ${
              currentStep === s.num ? "europe-step-indicator__label--active" : ""
            }`}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`europe-step-indicator__line ${
                currentStep > s.num ? "europe-step-indicator__line--done" : ""
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
    <section className="europe-register-hero">
      <div className="europe-register-hero__glow" />
      <div className="europe-register-hero__content">
        <span className="europe-register-hero__tag">Speaker Registration 2027</span>
        <h1 className="europe-register-hero__title">
          Claim Your
          <br />
          <em>Global Stage</em>
        </h1>
        <p className="europe-register-hero__sub">
          Register now to secure your speaking slot at one of our world-class
          conferences across Europe. Limited seats available.
        </p>
      </div>
    </section>
  );
}

/* ─── EARLY BIRD BANNER ──────────────────────── */
function EarlyBirdBanner() {
  return (
    <div className="europe-early-bird">
      <div className="europe-early-bird__inner">
        <span className="europe-early-bird__badge">{earlyBirdOffer.title}</span>
        <p className="europe-early-bird__text">
          {earlyBirdOffer.description}{" "}
          <strong>{earlyBirdOffer.securedText}</strong>
        </p>
        <span className="europe-early-bird__slots">
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
    <div className="europe-field europe-field--full">
      <label className="europe-label">
        Speaker Package <span>*</span>
      </label>
      <div className="europe-packages">
        {allPackages.map((pkg) => {
          const isSelected = selected === String(pkg.id);
          const isExpanded = expandedId === pkg.id;
          return (
            <div
              key={pkg.id}
              className={`europe-package${isSelected ? " europe-package--selected" : ""}`}
              onClick={() => onSelect(String(pkg.id))}
            >
              <div className="europe-package__radio">
                <div className="europe-package__radio-dot" />
              </div>
              <div className="europe-package__info">
                <div className="europe-package__top">
                  <span className="europe-package__name">{pkg.name}</span>
                  {pkg.badge ? (
                    <span className="europe-package__badge">{pkg.badge}</span>
                  ) : null}
                </div>
                <div className="europe-package__prices">
                  <span className="europe-package__early">
                    {pkg.earlyBirdPrice} Early Bird
                  </span>
                  <span className="europe-package__regular">
                    {pkg.regularPrice}
                  </span>
                </div>
                <div className="europe-package__perks">
                  {pkg.includes.slice(0, 3).map((perk) => (
                    <span key={perk} className="europe-package__perk">
                      ✓ {perk}
                    </span>
                  ))}
                </div>
                {isExpanded && pkg.includes.length > 3 && (
                  <div className="europe-package__perks europe-package__perks--expanded">
                    {pkg.includes.slice(3).map((perk) => (
                      <span key={perk} className="europe-package__perk">
                        ✓ {perk}
                      </span>
                    ))}
                  </div>
                )}
                {pkg.includes.length > 3 && (
                  <button
                    className="europe-package__more-btn"
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
      {error && <span className="europe-error-msg">{error}</span>}
    </div>
  );
}

/* ─── SUCCESS SCREEN ─────────────────────────── */
function SuccessScreen({ data, onReset }) {
  const conf = conferences.find((c) => String(c.id) === data.conferenceId);
  const pkg = allPackages.find((p) => String(p.id) === data.packageId);

  return (
    <section className="europe-success">
      <div className="europe-success__card">
        <div className="europe-success__icon">✓</div>
        <h2 className="europe-success__title">
          You're <em>Registered!</em>
        </h2>
        <p className="europe-success__sub">
          Welcome to Signature Global Conferences. Your application has been
          received and our team will be in touch with you shortly.
        </p>
        <div className="europe-success__details">
          <div className="europe-success__detail-row">
            <span className="europe-success__detail-label">Name</span>
            <span className="europe-success__detail-value">
              {data.firstName} {data.lastName}
            </span>
          </div>
          <div className="europe-success__detail-row">
            <span className="europe-success__detail-label">Email</span>
            <span className="europe-success__detail-value">{data.email}</span>
          </div>
          <div className="europe-success__detail-row">
            <span className="europe-success__detail-label">Conference</span>
            <span className="europe-success__detail-value">
              {conf ? conf.title : "—"}
            </span>
          </div>
          <div className="europe-success__detail-row">
            <span className="europe-success__detail-label">Package</span>
            <span className="europe-success__detail-value">
              {pkg ? `${pkg.name} — ${pkg.earlyBirdPrice}` : "—"}
            </span>
          </div>
          <div className="europe-success__detail-row">
            <span className="europe-success__detail-label">Location</span>
            <span className="europe-success__detail-value">
              {conf ? conf.location : "—"}
            </span>
          </div>
          <div className="europe-success__detail-row">
            <span className="europe-success__detail-label">Date</span>
            <span className="europe-success__detail-value">
              {conf ? conf.date : "—"}
            </span>
          </div>
        </div>
        <div className="europe-success__actions">
          <button className="europe-btn europe-btn--primary" onClick={onReset}>
            Register Another
          </button>
          <button className="europe-btn europe-btn--ghost">View Conferences</button>
        </div>
      </div>
    </section>
  );
}

/* ─── STEP 1 — Personal Details ─────────────── */
function Step1({ fields, errors, set }) {
  return (
    <div className="europe-form-body">
      <div className="europe-row">
        <div className="europe-field">
          <label className="europe-label">
            First Name <span>*</span>
          </label>
          <input
            value={fields.firstName}
            onChange={set("firstName")}
            className={`europe-input${errors.firstName ? " europe-input--error" : ""}`}
            placeholder="Jane"
          />
          {errors.firstName && (
            <span className="europe-error-msg">{errors.firstName}</span>
          )}
        </div>
        <div className="europe-field">
          <label className="europe-label">
            Last Name <span>*</span>
          </label>
          <input
            value={fields.lastName}
            onChange={set("lastName")}
            className={`europe-input${errors.lastName ? " europe-input--error" : ""}`}
            placeholder="Smith"
          />
          {errors.lastName && (
            <span className="europe-error-msg">{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className="europe-row">
        <div className="europe-field">
          <label className="europe-label">
            Email Address <span>*</span>
          </label>
          <input
            value={fields.email}
            onChange={set("email")}
            type="email"
            className={`europe-input${errors.email ? " europe-input--error" : ""}`}
            placeholder="jane@example.com"
          />
          {errors.email && <span className="europe-error-msg">{errors.email}</span>}
        </div>
        <div className="europe-field">
          <label className="europe-label">
            Phone Number <span>*</span>
          </label>
          <input
            value={fields.phone}
            onChange={set("phone")}
            className={`europe-input${errors.phone ? " europe-input--error" : ""}`}
            placeholder="+1 234 567 8900"
          />
          {errors.phone && <span className="europe-error-msg">{errors.phone}</span>}
        </div>
      </div>

      <div className="europe-row">
        <div className="europe-field">
          <label className="europe-label">
            Country <span>*</span>
          </label>
          <input
            value={fields.country}
            onChange={set("country")}
            className={`europe-input${errors.country ? " europe-input--error" : ""}`}
            placeholder="United States"
          />
          {errors.country && (
            <span className="europe-error-msg">{errors.country}</span>
          )}
        </div>
        <div className="europe-field">
          <label className="europe-label">Organization</label>
          <input
            value={fields.organization}
            onChange={set("organization")}
            className="europe-input"
            placeholder="Company / Brand"
          />
        </div>
      </div>

      <div className="europe-row">
        <div className="europe-field europe-field--full">
          <label className="europe-label">Job Title / Role</label>
          <input
            value={fields.jobTitle}
            onChange={set("jobTitle")}
            className="europe-input"
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
    <div className="europe-form-body">
      <div className="europe-field europe-field--full">
        <label className="europe-label">
          Conference <span>*</span>
        </label>
        <div className="europe-select-wrap">
          <select
            value={fields.conferenceId}
            onChange={set("conferenceId")}
            className={`europe-select${errors.conferenceId ? " europe-select--error" : ""}`}
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
          <span className="europe-error-msg">{errors.conferenceId}</span>
        )}
      </div>
    </div>
  );
}

/* ─── STEP 3 — Package + Optional ───────────── */
function Step3({ fields, errors, set, setFields }) {
  return (
    <div className="europe-form-body">
      <PackagePicker
        selected={fields.packageId}
        onSelect={(val) => setFields((prev) => ({ ...prev, packageId: val }))}
        error={errors.packageId}
      />
      <div className="europe-divider">
        <div className="europe-divider__line" />
        <span className="europe-divider__label">Optional</span>
        <div className="europe-divider__line" />
      </div>
      <div className="europe-field europe-field--full">
        <label className="europe-label">Short Bio</label>
        <textarea
          value={fields.bio}
          onChange={set("bio")}
          className="europe-textarea"
          placeholder="Tell us a little about yourself and your expertise…"
        />
      </div>
      <div className="europe-field europe-field--full">
        <label className="europe-label">Speaking Topics</label>
        <textarea
          value={fields.topics}
          onChange={set("topics")}
          className="europe-textarea"
          style={{ minHeight: "70px" }}
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
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
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
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
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
        conference: conf
          ? `${conf.title} · ${conf.location} · ${conf.date}`
          : "NO_DATA",
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
    1: {
      step: "Step 1 of 3 — Personal Details",
      title: "Tell Us About Yourself",
    },
    2: {
      step: "Step 2 of 3 — Select Conference",
      title: "Where Do You Want to Speak?",
    },
    3: {
      step: "Step 3 of 3 — Choose Package",
      title: "Pick Your Speaker Package",
    },
  };

  return (
    <div className="europe-form-card">
      <div className="europe-form-card__header">
        <StepIndicator currentStep={step} />
        <div className="europe-form-card__step" style={{ marginTop: "20px" }}>
          {stepMeta[step].step}
        </div>
        <div className="europe-form-card__title">{stepMeta[step].title}</div>
      </div>

      {step === 1 && <Step1 fields={fields} errors={errors} set={set} />}
      {step === 2 && <Step2 fields={fields} errors={errors} set={set} />}
      {step === 3 && (
        <Step3
          fields={fields}
          errors={errors}
          set={set}
          setFields={setFields}
        />
      )}

      <div className="europe-form-footer">
        <div className="europe-form-footer__actions">
          {step > 1 && (
            <button className="europe-back-btn" onClick={handleBack}>
              ← Back
            </button>
          )}
          {step < 3 ? (
            <button className="europe-submit-btn" onClick={handleNext}>
              Continue →
            </button>
          ) : (
            <button
              className="europe-submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Complete Registration →"}
            </button>
          )}
        </div>
        <p className="europe-form-note">
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
    <div className="europe-page">
      <Navbar />
      {submitted ? (
        <SuccessScreen data={submittedData} onReset={handleReset} />
      ) : (
        <>
          <RegisterHero />
          <EarlyBirdBanner />
          <section className="europe-register-section">
            <div className="europe-register-section__inner europe-register-section__inner--centered">
              <RegistrationForm onSuccess={handleSuccess} />
            </div>
          </section>
        </>
      )}
      <Footer theme="europe" />
    </div>
  );
}