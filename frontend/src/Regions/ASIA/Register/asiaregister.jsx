import { useState, useMemo } from "react";
import { Navbar } from "../Home/asia.jsx";
import Footer from "../../../Components/Footer/footer";
import "./asiaregister.css";
import { REGIONS, PACKAGES, COMPANION_PRICE, INITIAL_FORM, STEP_META,  getConferencesForRegion, validateStep1, validateStep2, calculateTotal,  submitRegistration,} from "./registerdata.js";

/* ═══════════════════════════════════════════════════════════
   SHARED HELPERS
   ═══════════════════════════════════════════════════════════ */
function Field({ label, required, error, full, children }) {
  return (
    <div className={`as-rg-field${full ? " as-rg-field--full" : ""}`}>
      <label className="as-rg-label">
        {label} {required && <span>*</span>}
      </label>
      {children}
      {error && <span className="as-rg-error-msg">{error}</span>}
    </div>
  );
}

function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: "Personal & Conference" },
    { num: 2, label: "Package"               },
    { num: 3, label: "Confirm"               },
  ];
  return (
    <div className="as-rg-step-indicator">
      {steps.map((s, i) => (
        <div key={s.num} className="as-rg-step-indicator__item">
          <div
            className={`as-rg-step-indicator__circle ${
              currentStep > s.num ? "done" : currentStep === s.num ? "active" : ""
            }`}
          >
            {currentStep > s.num ? "✓" : s.num}
          </div>
          <span
            className={`as-rg-step-indicator__label ${currentStep === s.num ? "active" : ""}`}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div className={`as-rg-step-indicator__line ${currentStep > s.num ? "done" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
function RegisterHero() {
  return (
    <section className="as-rg-hero">
      <div className="as-rg-hero__glow" />
      <div className="as-rg-hero__content">
        <span className="as-rg-hero__tag">Speaker Registration 2027</span>
        <h1 className="as-rg-hero__title">
          Claim Your <em>Global Stage</em>
        </h1>
        <p className="as-rg-hero__sub">
          Register now to secure your speaking slot at one of our world-class conferences.
          Limited seats available.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 1 — Personal Details + Region + Conference
   ═══════════════════════════════════════════════════════════ */
function Step1({ fields, errors, set, setField }) {
  const conferences = useMemo(
    () => getConferencesForRegion(fields.regionId),
    [fields.regionId]
  );

  function handleRegionClick(id) {
    setField("regionId", id);
    setField("conferenceId", "");
  }

  return (
    <div className="as-rg-form-body">
      {/* Personal Info */}
      <div className="as-rg-row">
        <Field label="First Name" required error={errors.firstName}>
          <input
            value={fields.firstName} onChange={set("firstName")}
            className={`as-rg-input${errors.firstName ? " as-rg-input--error" : ""}`}
            placeholder="Jane"
          />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input
            value={fields.lastName} onChange={set("lastName")}
            className={`as-rg-input${errors.lastName ? " as-rg-input--error" : ""}`}
            placeholder="Smith"
          />
        </Field>
      </div>

      <div className="as-rg-row">
        <Field label="Email Address" required error={errors.email}>
          <input
            value={fields.email} onChange={set("email")} type="email"
            className={`as-rg-input${errors.email ? " as-rg-input--error" : ""}`}
            placeholder="jane@example.com"
          />
        </Field>
        <Field label="Phone Number" required error={errors.phone}>
          <input
            value={fields.phone} onChange={set("phone")}
            className={`as-rg-input${errors.phone ? " as-rg-input--error" : ""}`}
            placeholder="+1 234 567 8900"
          />
        </Field>
      </div>

      <div className="as-rg-row">
        <Field label="Country" required error={errors.country}>
          <input
            value={fields.country} onChange={set("country")}
            className={`as-rg-input${errors.country ? " as-rg-input--error" : ""}`}
            placeholder="United States"
          />
        </Field>
        <Field label="Organization">
          <input
            value={fields.organization} onChange={set("organization")}
            className="as-rg-input" placeholder="Company / Brand"
          />
        </Field>
      </div>

      <div className="as-rg-row">
        <Field label="Job Title / Role">
          <input
            value={fields.jobTitle} onChange={set("jobTitle")}
            className="as-rg-input" placeholder="CEO, Coach, Author…"
          />
        </Field>
      </div>

      {/* Region */}
      <div className="as-rg-divider">Select Region</div>

      <Field label="Region" required error={errors.regionId} full>
        <div className="as-rg-region-grid">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`as-rg-region-btn${fields.regionId === r.id ? " as-rg-region-btn--active" : ""}`}
              onClick={() => handleRegionClick(r.id)}
            >
              <span className="as-rg-region-btn__flag">{r.flag}</span>
              <span className="as-rg-region-btn__label">{r.label}</span>
            </button>
          ))}
        </div>
      </Field>

      {/* Conference dropdown */}
      {fields.regionId && (
        <Field label="Select Conference" required error={errors.conferenceId} full>
          <div className="as-rg-select-wrap">
            <select
              value={fields.conferenceId}
              onChange={set("conferenceId")}
              className={`as-rg-select${errors.conferenceId ? " as-rg-select--error" : ""}`}
            >
              <option value="">— Choose a conference —</option>
              {conferences.length === 0 && (
                <option disabled>No conferences available for this region yet</option>
              )}
              {conferences.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.title} · {c.location} · {c.date}
                </option>
              ))}
            </select>
          </div>
        </Field>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 2 — Package Selection + Companions
   ═══════════════════════════════════════════════════════════ */
function Step2({ fields, errors, setField }) {
  const selectedPkg = PACKAGES.find((p) => p.id === fields.packageId);
  const total       = calculateTotal(fields.packageId, fields.companions);

  return (
    <div className="as-rg-form-body">
      {/* Package grid */}
      <div>
        <label className="as-rg-label" style={{ marginBottom: 14, display: "block" }}>
          Choose Package <span>*</span>
        </label>
        {errors.packageId && (
          <span className="as-rg-error-msg" style={{ marginBottom: 10, display: "block" }}>
            {errors.packageId}
          </span>
        )}
        <div className="as-rg-pkg-grid">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`as-rg-pkg-card${fields.packageId === pkg.id ? " as-rg-pkg-card--active" : ""}`}
              onClick={() => setField("packageId", pkg.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setField("packageId", pkg.id)}
            >
              <div className="as-rg-pkg-card__radio">✓</div>
              {pkg.badge && <div className="as-rg-pkg-card__badge">{pkg.badge}</div>}
              <div className="as-rg-pkg-card__header">
                <div className="as-rg-pkg-card__name">{pkg.name}</div>
                <div className="as-rg-pkg-card__price">${pkg.price.toLocaleString()}</div>
              </div>
              <ul className="as-rg-pkg-card__benefits">
                {pkg.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Companions */}
      <div className="as-rg-divider">Additional Attendees</div>

      <div className="as-rg-companion-box">
        <div className="as-rg-companion-box__info">
          <div className="as-rg-companion-box__title">Accompanying Person(s)</div>
          <div className="as-rg-companion-box__sub">
            Each additional attendee is ${COMPANION_PRICE} · Currently:{" "}
            <strong style={{ color: "var(--as-rg-gold)" }}>{fields.companions}</strong>
          </div>
        </div>
        <div className="as-rg-companion-counter">
          <button
            className="as-rg-counter-btn"
            disabled={fields.companions === 0}
            onClick={() => setField("companions", Math.max(0, fields.companions - 1))}
            type="button"
          >
            −
          </button>
          <span className="as-rg-counter-val">{fields.companions}</span>
          <button
            className="as-rg-counter-btn"
            onClick={() => setField("companions", fields.companions + 1)}
            type="button"
          >
            +
          </button>
        </div>
      </div>

      {/* Total */}
      {selectedPkg && (
        <div className="as-rg-total-bar">
          <div className="as-rg-total-bar__left">
            <div className="as-rg-total-bar__label">Estimated Total</div>
            <div className="as-rg-total-bar__breakdown">
              {selectedPkg.name} ${selectedPkg.price.toLocaleString()}
              {fields.companions > 0 &&
                ` + ${fields.companions} companion${fields.companions > 1 ? "s" : ""} $${fields.companions * COMPANION_PRICE}`}
            </div>
          </div>
          <div className="as-rg-total-bar__amount">${total.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 3 — Review & Confirm
   ═══════════════════════════════════════════════════════════ */
function Step3({ fields, allConferences, onEditStep }) {
  const conf       = allConferences.find((c) => String(c.id) === fields.conferenceId);
  const pkg        = PACKAGES.find((p) => p.id === fields.packageId);
  const total      = calculateTotal(fields.packageId, fields.companions);
  const regionLabel = REGIONS.find((r) => r.id === fields.regionId)?.label || "—";

  return (
    <div className="as-rg-form-body">
      {/* Personal Details */}
      <div className="as-rg-review-section">
        <div className="as-rg-review-section__head">
          <span className="as-rg-review-section__title">Personal Details</span>
          <button className="as-rg-edit-btn" onClick={() => onEditStep(1)}>Edit</button>
        </div>
        <div className="as-rg-review-grid">
          <div className="as-rg-review-row">
            <span className="as-rg-review-label">Full Name</span>
            <span className="as-rg-review-value">{fields.firstName} {fields.lastName}</span>
          </div>
          <div className="as-rg-review-row">
            <span className="as-rg-review-label">Email</span>
            <span className="as-rg-review-value">{fields.email}</span>
          </div>
          <div className="as-rg-review-row">
            <span className="as-rg-review-label">Phone</span>
            <span className="as-rg-review-value">{fields.phone}</span>
          </div>
          <div className="as-rg-review-row">
            <span className="as-rg-review-label">Country</span>
            <span className="as-rg-review-value">{fields.country}</span>
          </div>
          {fields.organization && (
            <div className="as-rg-review-row">
              <span className="as-rg-review-label">Organization</span>
              <span className="as-rg-review-value">{fields.organization}</span>
            </div>
          )}
          {fields.jobTitle && (
            <div className="as-rg-review-row">
              <span className="as-rg-review-label">Job Title</span>
              <span className="as-rg-review-value">{fields.jobTitle}</span>
            </div>
          )}
        </div>
      </div>

      {/* Conference */}
      <div className="as-rg-review-section">
        <div className="as-rg-review-section__head">
          <span className="as-rg-review-section__title">Conference</span>
          <button className="as-rg-edit-btn" onClick={() => onEditStep(1)}>Edit</button>
        </div>
        <div className="as-rg-review-grid">
          <div className="as-rg-review-row">
            <span className="as-rg-review-label">Region</span>
            <span className="as-rg-review-value">{regionLabel}</span>
          </div>
          <div className="as-rg-review-row as-rg-review-row--full">
            <span className="as-rg-review-label">Conference</span>
            <span className="as-rg-review-value">
              {conf ? `${conf.title} · ${conf.location} · ${conf.date}` : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Package & Companions */}
      <div className="as-rg-review-section">
        <div className="as-rg-review-section__head">
          <span className="as-rg-review-section__title">Package & Companions</span>
          <button className="as-rg-edit-btn" onClick={() => onEditStep(2)}>Edit</button>
        </div>

        {pkg && (
          <div className="as-rg-review-pkg" style={{ marginBottom: 14 }}>
            <div
              className="as-rg-review-pkg__dot"
              style={{ background: pkg.color }}
            />
            <span className="as-rg-review-pkg__name">{pkg.name}</span>
            <span className="as-rg-review-pkg__price">${pkg.price.toLocaleString()}</span>
          </div>
        )}

        <div className="as-rg-review-grid">
          <div className="as-rg-review-row">
            <span className="as-rg-review-label">Companions</span>
            <span className="as-rg-review-value">
              {fields.companions === 0
                ? "None"
                : `${fields.companions} person${fields.companions > 1 ? "s" : ""} (+$${fields.companions * COMPANION_PRICE})`}
            </span>
          </div>
        </div>
      </div>

      {/* Final total */}
      <div className="as-rg-total-bar">
        <div className="as-rg-total-bar__left">
          <div className="as-rg-total-bar__label">Total Amount Due</div>
          <div className="as-rg-total-bar__breakdown">
            Our team will contact you to confirm payment details
          </div>
        </div>
        <div className="as-rg-total-bar__amount">${total.toLocaleString()}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   RESULT SCREENS
   ═══════════════════════════════════════════════════════════ */
function SuccessScreen({ fields, allConferences, onReset }) {
  const conf  = allConferences.find((c) => String(c.id) === fields.conferenceId);
  const pkg   = PACKAGES.find((p) => p.id === fields.packageId);
  const total = calculateTotal(fields.packageId, fields.companions);

  const rows = [
    ["Name",        `${fields.firstName} ${fields.lastName}`],
    ["Email",       fields.email],
    ["Conference",  conf ? `${conf.title} · ${conf.location}` : "—"],
    ["Date",        conf?.date || "—"],
    ["Package",     pkg ? `${pkg.name} — $${pkg.price.toLocaleString()}` : "—"],
    ["Companions",  fields.companions > 0 ? `${fields.companions} person(s)` : "None"],
    ["Total",       `$${total.toLocaleString()}`],
  ];

  return (
    <section className="as-rg-result as-rg-result--success">
      <div className="as-rg-result__card">
        <div className="as-rg-result__icon">✓</div>
        <h2 className="as-rg-result__title">
          You're <em>Registered!</em>
        </h2>
        <p className="as-rg-result__sub">
          Welcome to Signature Global Conferences. Your application has been received.
          Our team will shortly contact you to confirm details and clarify any doubts.
        </p>
        <div className="as-rg-result__summary">
          {rows.map(([label, value]) => (
            <div key={label} className="as-rg-result__row">
              <span className="as-rg-result__row-label">{label}</span>
              <span className="as-rg-result__row-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="as-rg-result__actions">
          <button className="as-rg-btn-primary" onClick={onReset}>Register Another</button>
          <button className="as-rg-btn-ghost">View Conferences</button>
        </div>
      </div>
    </section>
  );
}

function FailScreen({ onRetry }) {
  return (
    <section className="as-rg-result as-rg-result--fail">
      <div className="as-rg-result__card">
        <div className="as-rg-result__icon">✕</div>
        <h2 className="as-rg-result__title">
          Submission <em>Failed</em>
        </h2>
        <p className="as-rg-result__sub">
          Something went wrong while submitting your registration. Your details have been
          saved — please try again. If the issue persists, contact us directly.
        </p>
        <div className="as-rg-result__actions">
          <button className="as-rg-btn-primary" onClick={onRetry}>Try Again</button>
          <button className="as-rg-btn-ghost">Contact Support</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN FORM
   ═══════════════════════════════════════════════════════════ */
function RegistrationForm({ onSuccess, onFail }) {
  const [fields,     setFields]     = useState(INITIAL_FORM);
  const [errors,     setErrors]     = useState({});
  const [step,       setStep]       = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const allConferences = useMemo(() => getConferencesForRegion("all"), []);

  const set      = (key) => (e) => setFields((prev) => ({ ...prev, [key]: e.target.value }));
  const setField = (key, val) => setFields((prev) => ({ ...prev, [key]: val }));

  function goNext() {
    const errs = step === 1 ? validateStep1(fields) : validateStep2(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToStep(n) {
    setErrors({});
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await submitRegistration(fields, allConferences);
      onSuccess(fields);
    } catch (err) {
      console.error("Submission failed:", err);
      onFail();
    } finally {
      setSubmitting(false);
    }
  }

  const meta = STEP_META[step];

  return (
    <div className="as-rg-form-card">
      {/* Header */}
      <div className="as-rg-form-card__header">
        <StepIndicator currentStep={step} />
        <div className="as-rg-form-card__step">{meta.step}</div>
        <div className="as-rg-form-card__title">{meta.title}</div>
      </div>

      {/* Steps */}
      {step === 1 && (
        <Step1
          fields={fields} errors={errors}
          set={set} setField={setField}
        />
      )}
      {step === 2 && (
        <Step2
          fields={fields} errors={errors}
          setField={setField}
        />
      )}
      {step === 3 && (
        <Step3
          fields={fields}
          allConferences={allConferences}
          onEditStep={goToStep}
        />
      )}

      {/* Footer Nav */}
      <div className="as-rg-form-footer">
        <div className="as-rg-form-footer__actions">
          {step > 1 && (
            <button className="as-rg-back-btn" onClick={goBack}>← Back</button>
          )}
          {step < 3 ? (
            <button className="as-rg-submit-btn" onClick={goNext}>
              Continue →
            </button>
          ) : (
            <button
              className="as-rg-submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Complete Registration →"}
            </button>
          )}
        </div>
        <p className="as-rg-form-note">
          By registering you agree to our Terms &amp; Conditions. Your data will only be
          used for conference coordination purposes.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════ */
export default function Register() {
  const [status, setStatus]         = useState("form");
  const [submittedData, setData]    = useState(null);
  const allConferences              = useMemo(() => getConferencesForRegion("all"), []);

  const handleSuccess = (data) => {
    setData(data);
    setStatus("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleFail   = ()     => { setStatus("fail"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleReset  = ()     => { setData(null); setStatus("form"); };
  const handleRetry  = ()     => { setStatus("form"); };

  return (
    // ✅ Root wrapper to prevent CSS leakage
    <div className="as-page">
      <Navbar />

      {status === "success" && (
        <SuccessScreen
          fields={submittedData}
          allConferences={allConferences}
          onReset={handleReset}
        />
      )}

      {status === "fail" && (
        <FailScreen onRetry={handleRetry} />
      )}

      {status === "form" && (
        <>
          <RegisterHero />
          <section className="as-rg-section">
            <div className="as-rg-section__inner">
              <RegistrationForm onSuccess={handleSuccess} onFail={handleFail} />
            </div>
          </section>
          <Footer theme="asia" />
        </>
      )}
    </div>
  );
}