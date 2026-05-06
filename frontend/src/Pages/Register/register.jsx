import { useState, useMemo, useRef, useEffect } from "react";
import { allCountries } from "country-telephone-data";
import Footer from "../../Components/Footer/footer.jsx";
import "./register.css";

import {
  REGIONS, PACKAGES, PHYSICAL_PACKAGES, VIRTUAL_PACKAGES,
  COMPANION_PRICE,  INITIAL_FORM,
  STEP_META,
  getConferencesForRegion,
  validateStep1,
  validateStep2,
  calculateTotal,
  submitRegistration,
  applyCoupon,
} from "./registerdata.js";

/* ═══════════════════════════════════════════════════════════
   COUNTRY DATA
   ═══════════════════════════════════════════════════════════ */
const COUNTRY_LIST = (() => {
  const seen   = new Set();
  const mapped = allCountries.map((c) => ({
    name:     c.name,
    code:     `+${c.dialCode}`,
    dialCode: c.dialCode,
    iso:      c.iso2,
  }));
  const na   = mapped.find((c) => c.iso === "us");
  const rest = mapped.filter((c) => {
    const key = `${c.name}-${c.dialCode}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return c.iso !== "us";
  });
  return na ? [na, ...rest] : rest;
})();

const DEFAULT_COUNTRY = COUNTRY_LIST[0];

/* ═══════════════════════════════════════════════════════════
   COUNTRY DROPDOWN
   ═══════════════════════════════════════════════════════════ */
function CountryDropdown({ value, onChange }) {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef  = useRef(null);
  const inputRef = useRef(null);

  const selected = COUNTRY_LIST.find((c) => c.code === value) || DEFAULT_COUNTRY;
  const filtered = query.trim()
    ? COUNTRY_LIST.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.code.includes(query)
      )
    : COUNTRY_LIST;

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    setOpen((o) => !o);
    if (!open) setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSelect = (country) => {
    onChange(country.code);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="sgc-rg-country-dropdown" ref={wrapRef}>
      <div
        className={`sgc-rg-country-trigger${open ? " sgc-rg-country-trigger--open" : ""}`}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
        aria-expanded={open}
        aria-label="Select country code"
      >
        {open ? (
          <input
            ref={inputRef}
            className="sgc-rg-country-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country…"
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="sgc-rg-country-selected">
            <span className="sgc-rg-country-code">{selected.code}</span>
            <span className="sgc-rg-country-name">{selected.name}</span>
          </span>
        )}
        <svg
          className={`sgc-rg-country-chevron${open ? " sgc-rg-country-chevron--up" : ""}`}
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {open && (
        <div className="sgc-rg-country-list" role="listbox">
          {filtered.length === 0 ? (
            <div className="sgc-rg-country-empty">No countries found</div>
          ) : (
            filtered.map((country) => (
              <div
                key={`${country.iso}-${country.dialCode}`}
                className={`sgc-rg-country-option${country.code === value ? " sgc-rg-country-option--active" : ""}`}
                onMouseDown={(e) => { e.preventDefault(); handleSelect(country); }}
                role="option"
                aria-selected={country.code === value}
              >
                <span className="sgc-rg-country-option__code">{country.code}</span>
                <span className="sgc-rg-country-option__name">{country.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SHARED HELPERS
   ═══════════════════════════════════════════════════════════ */
function Field({ label, required, error, full, children }) {
  return (
    <div className={`sgc-rg-field${full ? " sgc-rg-field--full" : ""}`}>
      <label className="sgc-rg-label">
        {label} {required && <span className="sgc-rg-required" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <span className="sgc-rg-error-msg" role="alert">{error}</span>}
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
    <div className="sgc-rg-step-indicator" role="navigation" aria-label="Registration steps">
      {steps.map((s, i) => (
        <div key={s.num} className="sgc-rg-step-indicator__item">
          <div
            className={`sgc-rg-step-indicator__circle ${
              currentStep > s.num ? "done" : currentStep === s.num ? "active" : ""
            }`}
            aria-current={currentStep === s.num ? "step" : undefined}
          >
            {currentStep > s.num ? (
              <svg viewBox="0 0 12 10" fill="none" width="12" height="10">
                <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : s.num}
          </div>
          <span className={`sgc-rg-step-indicator__label ${currentStep === s.num ? "active" : ""}`}>
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div className={`sgc-rg-step-indicator__line ${currentStep > s.num ? "done" : ""}`} aria-hidden="true" />
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
    <section className="sgc-rg-hero" aria-label="Registration hero">
      <div className="sgc-rg-hero__bg-pattern" aria-hidden="true" />
      <div className="sgc-rg-hero__glow" aria-hidden="true" />
      <div className="sgc-rg-hero__content">
        <span className="sgc-rg-hero__tag">
          <span className="sgc-rg-hero__tag-line" aria-hidden="true" />
          Speaker Registration 2026 / 2027
        </span>
        <h1 className="sgc-rg-hero__title">
          Claim Your <em>Global Stage</em>
        </h1>
        <p className="sgc-rg-hero__sub">
          Register now to secure your speaking slot at one of our world-class conferences.
          Limited seats available — act fast.
        </p>
        <div className="sgc-rg-hero__stats" aria-label="Conference statistics">
          {[
            { num: "40+", label: "Countries" },
            { num: "2K+", label: "Speakers" },
            { num: "12",  label: "Conferences" },
          ].map(({ num, label }) => (
            <div className="sgc-rg-hero__stat" key={label}>
              <span className="sgc-rg-hero__stat-num">{num}</span>
              <span className="sgc-rg-hero__stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 1 — Personal Details + Region + Conference
   ═══════════════════════════════════════════════════════════ */
function Step1({ fields, errors, set, setField }) {
  const conferences = useMemo(
    () => (fields.regionId ? getConferencesForRegion(fields.regionId) : []),
    [fields.regionId]
  );

  function handleRegionChange(e) {
    setField("regionId", e.target.value);
    setField("conferenceId", "");
  }

  return (
    <div className="sgc-rg-form-body">
      {/* Section: Personal Info */}
      <div className="sgc-rg-section-label">
        <span className="sgc-rg-section-label__icon" aria-hidden="true">01</span>
        <span>Personal Information</span>
      </div>

      <div className="sgc-rg-row">
        <Field label="First Name" required error={errors.firstName}>
          <input
            value={fields.firstName}
            onChange={set("firstName")}
            className={`sgc-rg-input${errors.firstName ? " sgc-rg-input--error" : ""}`}
            placeholder="Jane"
            autoComplete="given-name"
            aria-required="true"
            aria-invalid={!!errors.firstName}
          />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input
            value={fields.lastName}
            onChange={set("lastName")}
            className={`sgc-rg-input${errors.lastName ? " sgc-rg-input--error" : ""}`}
            placeholder="Smith"
            autoComplete="family-name"
            aria-required="true"
            aria-invalid={!!errors.lastName}
          />
        </Field>
      </div>

      <div className="sgc-rg-row">
        <Field label="Email Address" required error={errors.email}>
          <input
            value={fields.email}
            onChange={set("email")}
            type="email"
            className={`sgc-rg-input${errors.email ? " sgc-rg-input--error" : ""}`}
            placeholder="jane@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field label="Phone Number" required error={errors.phone}>
          <div className="sgc-rg-phone-wrap">
            <CountryDropdown
              value={fields.countryCode}
              onChange={(code) => setField("countryCode", code)}
            />
            <input
              value={fields.phone}
              onChange={set("phone")}
              className={`sgc-rg-input sgc-rg-input--phone${errors.phone ? " sgc-rg-input--error" : ""}`}
              placeholder="Phone number"
              autoComplete="tel-national"
              type="tel"
              aria-required="true"
              aria-invalid={!!errors.phone}
            />
          </div>
        </Field>
      </div>

      <div className="sgc-rg-row">
        <Field label="Country of Residence" required error={errors.country}>
          <input
            value={fields.country}
            onChange={set("country")}
            className={`sgc-rg-input${errors.country ? " sgc-rg-input--error" : ""}`}
            placeholder="e.g. United States"
            autoComplete="country-name"
            aria-required="true"
            aria-invalid={!!errors.country}
          />
        </Field>
        <Field label="Organization / Company">
          <input
            value={fields.organization}
            onChange={set("organization")}
            className="sgc-rg-input"
            placeholder="Company / Brand"
            autoComplete="organization"
          />
        </Field>
      </div>

      <div className="sgc-rg-row sgc-rg-row--single">
        <Field label="Job Title / Role">
          <input
            value={fields.jobTitle}
            onChange={set("jobTitle")}
            className="sgc-rg-input"
            placeholder="CEO, Coach, Author…"
            autoComplete="organization-title"
          />
        </Field>
      </div>

      {/* Section: Conference Selection */}
      <div className="sgc-rg-section-label sgc-rg-section-label--spaced">
        <span className="sgc-rg-section-label__icon" aria-hidden="true">02</span>
        <span>Conference Selection</span>
      </div>

      <div className="sgc-rg-row">
        <Field label="Region" required error={errors.regionId}>
          <div className="sgc-rg-select-wrap">
            <select
              value={fields.regionId}
              onChange={handleRegionChange}
              className={`sgc-rg-select${errors.regionId ? " sgc-rg-select--error" : ""}`}
              aria-required="true"
              aria-invalid={!!errors.regionId}
            >
              <option value="">— Select a region —</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.flag}  {r.label}
                </option>
              ))}
            </select>
            <span className="sgc-rg-select-icon" aria-hidden="true">
              <svg viewBox="0 0 10 6" fill="none" width="10" height="6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
        </Field>

        <Field label="Conference" required error={errors.conferenceId}>
          <div className="sgc-rg-select-wrap">
            <select
              value={fields.conferenceId}
              onChange={set("conferenceId")}
              className={`sgc-rg-select${errors.conferenceId ? " sgc-rg-select--error" : ""}${!fields.regionId ? " sgc-rg-select--disabled" : ""}`}
              disabled={!fields.regionId}
              aria-required="true"
              aria-invalid={!!errors.conferenceId}
              aria-disabled={!fields.regionId}
            >
              <option value="">
                {fields.regionId ? "— Choose a conference —" : "— Select region first —"}
              </option>
              {conferences.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.title} · {c.location} · {c.date}
                </option>
              ))}
            </select>
            <span className="sgc-rg-select-icon" aria-hidden="true">
              <svg viewBox="0 0 10 6" fill="none" width="10" height="6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
        </Field>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 2 — Speaker Type + Package + Companions
   ═══════════════════════════════════════════════════════════ */
function Step2({ fields, errors, setField }) {
  const activePkgs  = fields.speakerType === "virtual" ? VIRTUAL_PACKAGES : PHYSICAL_PACKAGES;
  const selectedPkg = PACKAGES.find((p) => p.id === fields.packageId);
  const total       = calculateTotal(fields.packageId, fields.companions, fields.discount || 0);
  const isVirtual   = fields.speakerType === "virtual";

  function handleTypeSwitch(type) {
    setField("speakerType", type);
    setField("packageId", "");
  }

  return (
    <div className="sgc-rg-form-body">
      {/* Participation Type */}
      <div>
        <div className="sgc-rg-section-label">
          <span className="sgc-rg-section-label__icon" aria-hidden="true">01</span>
          <span>Participation Type</span>
        </div>
        {errors.speakerType && (
          <span className="sgc-rg-error-msg" role="alert" style={{ marginTop: 8, display: "block" }}>
            {errors.speakerType}
          </span>
        )}
        <div className="sgc-rg-type-toggle" role="radiogroup" aria-label="Participation type">
          <button
            type="button"
            className={`sgc-rg-type-btn${fields.speakerType === "physical" ? " sgc-rg-type-btn--active" : ""}`}
            onClick={() => handleTypeSwitch("physical")}
            role="radio"
            aria-checked={fields.speakerType === "physical"}
          >
            <span className="sgc-rg-type-btn__icon" aria-hidden="true">🎤</span>
            <span className="sgc-rg-type-btn__label">Physical Speaker</span>
            <span className="sgc-rg-type-btn__sub">In-person at venue</span>
            {fields.speakerType === "physical" && (
              <span className="sgc-rg-type-btn__check" aria-hidden="true">
                <svg viewBox="0 0 12 10" fill="none" width="10" height="8">
                  <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
          </button>
          <button
            type="button"
            className={`sgc-rg-type-btn${fields.speakerType === "virtual" ? " sgc-rg-type-btn--active sgc-rg-type-btn--virtual" : ""}`}
            onClick={() => handleTypeSwitch("virtual")}
            role="radio"
            aria-checked={fields.speakerType === "virtual"}
          >
            <span className="sgc-rg-type-btn__icon" aria-hidden="true">💻</span>
            <span className="sgc-rg-type-btn__label">Virtual Speaker</span>
            <span className="sgc-rg-type-btn__sub">Present via Zoom / Airmeet</span>
            {fields.speakerType === "virtual" && (
              <span className="sgc-rg-type-btn__check" aria-hidden="true">
                <svg viewBox="0 0 12 10" fill="none" width="10" height="8">
                  <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Package Selection */}
      {fields.speakerType && (
        <div>
          <div className="sgc-rg-section-label sgc-rg-section-label--spaced">
            <span className="sgc-rg-section-label__icon" aria-hidden="true">02</span>
            <span>Choose Your Package</span>
          </div>
          {errors.packageId && (
            <span className="sgc-rg-error-msg" role="alert" style={{ marginBottom: 12, display: "block" }}>
              {errors.packageId}
            </span>
          )}
          <div
            className={`sgc-rg-pkg-grid${isVirtual ? " sgc-rg-pkg-grid--virtual" : ""}`}
            role="radiogroup"
            aria-label="Package options"
          >
            {activePkgs.map((pkg) => (
              <div
                key={pkg.id}
                className={`sgc-rg-pkg-card${fields.packageId === pkg.id ? " sgc-rg-pkg-card--active" : ""}`}
                onClick={() => setField("packageId", pkg.id)}
                role="radio"
                aria-checked={fields.packageId === pkg.id}
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && setField("packageId", pkg.id)
                }
              >
                {pkg.badge && <div className="sgc-rg-pkg-card__badge">{pkg.badge}</div>}
                <div className="sgc-rg-pkg-card__header">
                  <div className="sgc-rg-pkg-card__icon" aria-hidden="true">{pkg.icon}</div>
                  <div className="sgc-rg-pkg-card__name">{pkg.name}</div>
                  <div className="sgc-rg-pkg-card__price" aria-label={`Price: $${pkg.price.toLocaleString()}`}>
                    ${pkg.price.toLocaleString()}
                  </div>
                </div>
                <ul className="sgc-rg-pkg-card__benefits" aria-label={`${pkg.name} benefits`}>
                  {pkg.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="sgc-rg-pkg-card__radio" aria-hidden="true">
                  {fields.packageId === pkg.id && (
                    <svg viewBox="0 0 12 10" fill="none" width="10" height="8">
                      <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Companions (Physical only) */}
      {fields.speakerType === "physical" && (
        <>
          <div className="sgc-rg-section-label sgc-rg-section-label--spaced">
            <span className="sgc-rg-section-label__icon" aria-hidden="true">03</span>
            <span>Additional Attendees</span>
          </div>
          <div className="sgc-rg-companion-box">
            <div className="sgc-rg-companion-box__info">
              <div className="sgc-rg-companion-box__title">Accompanying Person(s)</div>
              <div className="sgc-rg-companion-box__sub">
                Each additional attendee — <strong>${COMPANION_PRICE}</strong>
              </div>
            </div>
            <div className="sgc-rg-companion-counter" role="group" aria-label="Number of companions">
              <button
                className="sgc-rg-counter-btn"
                disabled={fields.companions === 0}
                onClick={() => setField("companions", Math.max(0, fields.companions - 1))}
                type="button"
                aria-label="Decrease companions"
              >−</button>
              <span className="sgc-rg-counter-val" aria-live="polite">{fields.companions}</span>
              <button
                className="sgc-rg-counter-btn"
                onClick={() => setField("companions", fields.companions + 1)}
                type="button"
                aria-label="Increase companions"
              >+</button>
            </div>
          </div>
        </>
      )}

      {/* Total Preview */}
      <PriceSummaryBar
        selectedPkg={selectedPkg}
        companions={fields.companions}
        isVirtual={isVirtual}
        total={total}
        discount={fields.discount}
        label="Estimated Total"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRICE SUMMARY BAR (reusable)
   ═══════════════════════════════════════════════════════════ */
function PriceSummaryBar({ selectedPkg, companions, isVirtual, total, discount, label, couponCode }) {
  return (
    <div className="sgc-rg-total-bar" aria-label="Price summary">
      <div className="sgc-rg-total-bar__left">
        <div className="sgc-rg-total-bar__label">{label}</div>
        <div className="sgc-rg-total-bar__breakdown">
          {selectedPkg
            ? `${selectedPkg.name} $${selectedPkg.price.toLocaleString()}${
                companions > 0 && !isVirtual
                  ? ` + ${companions} companion${companions > 1 ? "s" : ""} $${companions * COMPANION_PRICE}`
                  : ""
              }${discount > 0 && couponCode ? ` · Coupon ${couponCode} −$${discount}` : ""}`
            : "Select a package to see pricing"}
        </div>
      </div>
      <div className="sgc-rg-total-bar__amount">
        <span aria-label={`Total: $${total.toLocaleString()}`}>${total.toLocaleString()}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COUPON WIDGET
   ═══════════════════════════════════════════════════════════ */
function CouponWidget({ couponCode, discount, onApply, onRemove }) {
  const [input,  setInput]  = useState(couponCode || "");
  const [status, setStatus] = useState(discount > 0 ? "applied" : "idle");
  const [shake,  setShake]  = useState(false);

  function handleApply() {
    const result = applyCoupon(input);
    if (result.valid) {
      onApply(result.code, result.discount);
      setStatus("applied");
    } else {
      setStatus("error");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  function handleRemove() {
    setInput("");
    setStatus("idle");
    onRemove();
  }

  return (
    <div className="sgc-rg-coupon-box" role="region" aria-label="Coupon code">
      <div className="sgc-rg-coupon-box__header">
        <span className="sgc-rg-coupon-box__icon" aria-hidden="true">🏷</span>
        <span className="sgc-rg-coupon-box__label">Have a Coupon Code?</span>
      </div>
      {status === "applied" ? (
        <div className="sgc-rg-coupon-applied" role="status" aria-live="polite">
          <span className="sgc-rg-coupon-applied__tag">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <strong>{couponCode}</strong> — ${discount} off applied!
          </span>
          <button type="button" className="sgc-rg-coupon-remove" onClick={handleRemove} aria-label="Remove coupon">
            Remove
          </button>
        </div>
      ) : (
        <div className={`sgc-rg-coupon-row${shake ? " sgc-rg-coupon-row--shake" : ""}`}>
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value.toUpperCase()); setStatus("idle"); }}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            className={`sgc-rg-input sgc-rg-coupon-input${status === "error" ? " sgc-rg-input--error" : ""}`}
            placeholder="ENTER CODE"
            maxLength={20}
            aria-label="Coupon code"
            aria-invalid={status === "error"}
          />
          <button
            type="button"
            className="sgc-rg-coupon-btn"
            onClick={handleApply}
            disabled={!input.trim()}
            aria-label="Apply coupon code"
          >
            Apply
          </button>
        </div>
      )}
      {status === "error" && (
        <span className="sgc-rg-error-msg" role="alert" style={{ marginTop: 6, display: "block" }}>
          Invalid coupon code. Please try again.
        </span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 3 — Review & Confirm
   ═══════════════════════════════════════════════════════════ */
function Step3({ fields, allConferences, onEditStep, setField }) {
  const conf        = allConferences.find((c) => String(c.id) === fields.conferenceId);
  const pkg         = PACKAGES.find((p) => p.id === fields.packageId);
  const total       = calculateTotal(fields.packageId, fields.companions, fields.discount || 0);
  const regionLabel = REGIONS.find((r) => r.id === fields.regionId)?.label || "—";
  const isVirtual   = fields.speakerType === "virtual";

  return (
    <div className="sgc-rg-form-body">
      {/* Personal Details Review */}
      <ReviewSection title="Personal Details" onEdit={() => onEditStep(1)}>
        <div className="sgc-rg-review-grid">
          {[
            ["Full Name",     `${fields.firstName} ${fields.lastName}`],
            ["Email",         fields.email],
            ["Phone",         `${fields.countryCode} ${fields.phone}`],
            ["Country",       fields.country],
            ...(fields.organization ? [["Organization", fields.organization]] : []),
            ...(fields.jobTitle     ? [["Job Title",    fields.jobTitle]]     : []),
          ].map(([label, value]) => (
            <ReviewRow key={label} label={label} value={value} />
          ))}
        </div>
      </ReviewSection>

      {/* Conference Review */}
      <ReviewSection title="Conference" onEdit={() => onEditStep(1)}>
        <div className="sgc-rg-review-grid">
          <ReviewRow label="Region" value={regionLabel} />
          <ReviewRow
            label="Conference"
            value={conf ? `${conf.title} · ${conf.location} · ${conf.date}` : "—"}
            full
          />
        </div>
      </ReviewSection>

      {/* Package Review */}
      <ReviewSection title="Package & Companions" onEdit={() => onEditStep(2)}>
        <div className="sgc-rg-review-grid" style={{ marginBottom: 14 }}>
          <ReviewRow
            label="Participation"
            value={<span style={{ textTransform: "capitalize" }}>{fields.speakerType || "—"}</span>}
          />
        </div>
        {pkg && (
          <div className="sgc-rg-review-pkg">
            <span className="sgc-rg-review-pkg__dot" style={{ background: pkg.color }} aria-hidden="true" />
            <span className="sgc-rg-review-pkg__icon" aria-hidden="true">{pkg.icon}</span>
            <span className="sgc-rg-review-pkg__name">{pkg.name}</span>
            <span className="sgc-rg-review-pkg__price" aria-label={`Package price: $${pkg.price.toLocaleString()}`}>
              ${pkg.price.toLocaleString()}
            </span>
          </div>
        )}
        {!isVirtual && (
          <div className="sgc-rg-review-grid" style={{ marginTop: 14 }}>
            <ReviewRow
              label="Companions"
              value={
                fields.companions === 0
                  ? "None"
                  : `${fields.companions} person${fields.companions > 1 ? "s" : ""} (+$${fields.companions * COMPANION_PRICE})`
              }
            />
          </div>
        )}
      </ReviewSection>

      {/* Coupon */}
      <CouponWidget
        couponCode={fields.couponCode}
        discount={fields.discount}
        onApply={(code, discount) => { setField("couponCode", code); setField("discount", discount); }}
        onRemove={() => { setField("couponCode", ""); setField("discount", 0); }}
      />

      {/* Final Total */}
      <div className="sgc-rg-total-bar sgc-rg-total-bar--final" aria-label="Final amount">
        <div className="sgc-rg-total-bar__left">
          <div className="sgc-rg-total-bar__label">Total Amount Due</div>
          <div className="sgc-rg-total-bar__breakdown">
            {fields.discount > 0
              ? `Coupon "${fields.couponCode}" saves you $${fields.discount}`
              : "Our team will contact you to confirm payment details"}
          </div>
        </div>
        <div className="sgc-rg-total-bar__amount">
          {fields.discount > 0 && pkg && (
            <span className="sgc-rg-total-bar__original" aria-label={`Original price: $${calculateTotal(fields.packageId, fields.companions, 0).toLocaleString()}`}>
              ${calculateTotal(fields.packageId, fields.companions, 0).toLocaleString()}
            </span>
          )}
          <span aria-label={`Total: $${total.toLocaleString()}`}>${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function ReviewSection({ title, onEdit, children }) {
  return (
    <div className="sgc-rg-review-section">
      <div className="sgc-rg-review-section__head">
        <span className="sgc-rg-review-section__title">{title}</span>
        <button className="sgc-rg-edit-btn" onClick={onEdit} type="button" aria-label={`Edit ${title}`}>
          <svg viewBox="0 0 14 14" fill="none" width="11" height="11" aria-hidden="true">
            <path d="M9.5 1.5l3 3L4 13H1v-3L9.5 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function ReviewRow({ label, value, full }) {
  return (
    <div className={`sgc-rg-review-row${full ? " sgc-rg-review-row--full" : ""}`}>
      <span className="sgc-rg-review-label">{label}</span>
      <span className="sgc-rg-review-value">{value}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   RESULT SCREENS
   ═══════════════════════════════════════════════════════════ */
function SuccessScreen({ fields, allConferences, onReset }) {
  const conf  = allConferences.find((c) => String(c.id) === fields.conferenceId);
  const pkg   = PACKAGES.find((p) => p.id === fields.packageId);
  const total = calculateTotal(fields.packageId, fields.companions, fields.discount || 0);

  const rows = [
    ["Name",       `${fields.firstName} ${fields.lastName}`],
    ["Email",      fields.email],
    ["Phone",      `${fields.countryCode} ${fields.phone}`],
    ["Conference", conf ? `${conf.title} · ${conf.location}` : "—"],
    ["Date",       conf?.date || "—"],
    ["Type",       fields.speakerType ? fields.speakerType.charAt(0).toUpperCase() + fields.speakerType.slice(1) : "—"],
    ["Package",    pkg ? `${pkg.name} — $${pkg.price.toLocaleString()}` : "—"],
    ["Companions", fields.speakerType === "virtual" ? "N/A" : fields.companions > 0 ? `${fields.companions} person(s)` : "None"],
    ...(fields.discount > 0 ? [["Discount", `-$${fields.discount} (${fields.couponCode})`]] : []),
    ["Total",      `$${total.toLocaleString()}`],
  ];

  return (
    <section className="sgc-rg-result sgc-rg-result--success" role="main" aria-label="Registration successful">
      <div className="sgc-rg-result__confetti" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="sgc-rg-result__confetti-piece" style={{ "--i": i }} />
        ))}
      </div>
      <div className="sgc-rg-result__card">
        <div className="sgc-rg-result__icon sgc-rg-result__icon--success" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
            <path d="M4 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="sgc-rg-result__title">You're <em>Registered!</em></h2>
        <p className="sgc-rg-result__sub">
          Welcome to Signature Global Conferences. Your application has been received.
          Our team will shortly contact you to confirm details.
        </p>
        <div className="sgc-rg-result__summary" role="list" aria-label="Registration summary">
          {rows.map(([label, value]) => (
            <div key={label} className="sgc-rg-result__row" role="listitem">
              <span className="sgc-rg-result__row-label">{label}</span>
              <span className="sgc-rg-result__row-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="sgc-rg-result__actions">
          <button className="sgc-rg-btn-primary" onClick={onReset}>Register Another</button>
          <button className="sgc-rg-btn-ghost">View Conferences</button>
        </div>
      </div>
    </section>
  );
}

function FailScreen({ onRetry }) {
  return (
    <section className="sgc-rg-result sgc-rg-result--fail" role="main" aria-label="Registration failed">
      <div className="sgc-rg-result__card">
        <div className="sgc-rg-result__icon sgc-rg-result__icon--fail" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="sgc-rg-result__title">Submission <em>Failed</em></h2>
        <p className="sgc-rg-result__sub">
          Something went wrong. Your details have been saved — please try again.
          If the issue persists, contact us directly.
        </p>
        <div className="sgc-rg-result__actions">
          <button className="sgc-rg-btn-primary" onClick={onRetry}>Try Again</button>
          <button className="sgc-rg-btn-ghost">Contact Support</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN FORM CONTAINER
   ═══════════════════════════════════════════════════════════ */
function RegistrationForm({ onSuccess, onFail }) {
  const [fields,     setFields]     = useState({
    ...INITIAL_FORM,
    countryCode: DEFAULT_COUNTRY.code,
  });
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
      console.error("Submission error:", err);
      onFail();
    } finally {
      setSubmitting(false);
    }
  }

  const meta = STEP_META[step];

  return (
    <div className="sgc-rg-form-card" role="main">
      <div className="sgc-rg-form-card__header">
        <StepIndicator currentStep={step} />
        <div className="sgc-rg-form-card__step">{meta.step}</div>
        <div className="sgc-rg-form-card__title">{meta.title}</div>
      </div>

      {step === 1 && <Step1 fields={fields} errors={errors} set={set} setField={setField} />}
      {step === 2 && <Step2 fields={fields} errors={errors} setField={setField} />}
      {step === 3 && (
        <Step3
          fields={fields}
          allConferences={allConferences}
          onEditStep={goToStep}
          setField={setField}
        />
      )}

      <div className="sgc-rg-form-footer">
        <div className="sgc-rg-form-footer__actions">
          {step > 1 && (
            <button className="sgc-rg-back-btn" onClick={goBack} type="button" aria-label="Go back to previous step">
              <svg viewBox="0 0 16 10" fill="none" width="14" height="10" aria-hidden="true">
                <path d="M5 1L1 5l4 4M1 5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
          )}
          {step < 3 ? (
            <button className="sgc-rg-submit-btn" onClick={goNext} type="button" aria-label="Continue to next step">
              Continue
              <svg viewBox="0 0 16 10" fill="none" width="14" height="10" aria-hidden="true">
                <path d="M11 1l4 4-4 4M15 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button
              className="sgc-rg-submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
              type="button"
              aria-label={submitting ? "Submitting registration" : "Complete registration"}
              aria-busy={submitting}
            >
              {submitting ? (
                <>
                  <span className="sgc-rg-spinner" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                <>
                  Complete Registration
                  <svg viewBox="0 0 16 10" fill="none" width="14" height="10" aria-hidden="true">
                    <path d="M11 1l4 4-4 4M15 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
        <p className="sgc-rg-form-note">
          By registering you agree to our{" "}
          <a href="#" className="sgc-rg-form-note__link">Terms &amp; Conditions</a>.
          Your data will only be used for conference coordination purposes.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Register() {
  const [status,        setStatus] = useState("form");
  const [submittedData, setData]   = useState(null);
  const allConferences              = useMemo(() => getConferencesForRegion("all"), []);

  const handleSuccess = (data) => { setData(data);  setStatus("success"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleFail    = ()     => {                  setStatus("fail");    window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleReset   = ()     => { setData(null);   setStatus("form");   };
  const handleRetry   = ()     => {                  setStatus("form");   };

  return (
    <div className="na-page sgc-register-page">

      {status === "success" && (
        <SuccessScreen fields={submittedData} allConferences={allConferences} onReset={handleReset} />
      )}
      {status === "fail" && <FailScreen onRetry={handleRetry} />}
      {status === "form" && (
        <>
          <RegisterHero />
          <section className="sgc-rg-section" aria-label="Registration form">
            <div className="sgc-rg-section__inner">
              <RegistrationForm onSuccess={handleSuccess} onFail={handleFail} />
            </div>
          </section>
          <Footer />
        </>
      )}
    </div>
  );
}