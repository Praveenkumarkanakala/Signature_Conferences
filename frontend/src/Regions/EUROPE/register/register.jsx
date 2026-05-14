import { useState, useMemo, useRef, useEffect } from "react";
import { Navbar } from "../Landingpage/eurohome.jsx";
import { allCountries } from "country-telephone-data";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Components/Footer/footer.jsx";
import "./register.css";
import "../Landingpage/eurohome.css";

import {
  REGIONS, PACKAGES, PHYSICAL_PACKAGES, VIRTUAL_PACKAGES,
  COMPANION_PRICE, EXTRA_NIGHT_PRICE, INITIAL_FORM, STEP_META,
  getConferencesForRegion, validateStep1, validateStep2,
  calculateTotal, submitRegistration, applyCoupon,
} from "./registerdata.js";

/* ═══════════════════════════════════════════════════════════
   COUNTRY DATA
   ═══════════════════════════════════════════════════════════ */
const COUNTRY_LIST = (() => {
  const seen   = new Set();
  const mapped = allCountries.map((c) => ({
    name: c.name, code: `+${c.dialCode}`, dialCode: c.dialCode, iso: c.iso2,
  }));
  const first = mapped.find((c) => c.iso === "us");
  const rest  = mapped.filter((c) => {
    const key = `${c.name}-${c.dialCode}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return c.iso !== "us";
  });
  return first ? [first, ...rest] : rest;
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
    ? COUNTRY_LIST.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) || c.code.includes(query)
      )
    : COUNTRY_LIST;

  useEffect(() => {
    const h = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false); setQuery("");
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleOpen   = () => { setOpen((o) => !o); if (!open) setTimeout(() => inputRef.current?.focus(), 50); };
  const handleSelect = (c) => { onChange(c.code); setOpen(false); setQuery(""); };

  return (
    <div className="europe-rg-country-dropdown" ref={wrapRef}>
      <div
        className={`europe-rg-country-trigger${open ? " europe-rg-country-trigger--open" : ""}`}
        onClick={handleOpen} role="button" tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
        aria-expanded={open} aria-label="Select country code"
      >
        {open ? (
          <input
            ref={inputRef}
            className="europe-rg-country-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country…"
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="europe-rg-country-selected">
            <span className="europe-rg-country-code">{selected.code}</span>
            <span className="europe-rg-country-name">{selected.name}</span>
          </span>
        )}
        <svg
          className={`europe-rg-country-chevron${open ? " europe-rg-country-chevron--up" : ""}`}
          viewBox="0 0 10 6" fill="none" aria-hidden="true"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {open && (
        <div className="europe-rg-country-list" role="listbox">
          {filtered.length === 0 ? (
            <div className="europe-rg-country-empty">No countries found</div>
          ) : (
            filtered.map((c) => (
              <div
                key={`${c.iso}-${c.dialCode}`}
                className={`europe-rg-country-option${c.code === value ? " europe-rg-country-option--active" : ""}`}
                onMouseDown={(e) => { e.preventDefault(); handleSelect(c); }}
                role="option" aria-selected={c.code === value}
              >
                <span className="europe-rg-country-option__code">{c.code}</span>
                <span className="europe-rg-country-option__name">{c.name}</span>
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
const Field = ({ label, required, error, full, children }) => (
  <div className={`europe-rg-field${full ? " europe-rg-field--full" : ""}`}>
    <label className="europe-rg-label">
      {label}{required && <span className="europe-rg-required" aria-hidden="true"> *</span>}
    </label>
    {children}
    {error && <span className="europe-rg-error-msg" role="alert">{error}</span>}
  </div>
);

const ChevronSVG = () => (
  <svg viewBox="0 0 10 6" fill="none" width="10" height="6" aria-hidden="true">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: "Personal & Conference" },
    { num: 2, label: "Package"               },
    { num: 3, label: "Confirm"               },
  ];
  return (
    <div className="europe-rg-step-indicator" role="navigation" aria-label="Registration steps">
      {steps.map((s, i) => (
        <div key={s.num} className="europe-rg-step-indicator__item">
          <div
            className={`europe-rg-step-indicator__circle ${
              currentStep > s.num ? "done" : currentStep === s.num ? "active" : ""
            }`}
            aria-current={currentStep === s.num ? "step" : undefined}
          >
            {currentStep > s.num ? (
              <svg viewBox="0 0 12 10" fill="none" width="12" height="10">
                <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : s.num}
          </div>
          <span className={`europe-rg-step-indicator__label${currentStep === s.num ? " active" : ""}`}>
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`europe-rg-step-indicator__line${currentStep > s.num ? " done" : ""}`}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO — UPDATED WITH STATS + BADGES + ACCENT BAR
   ═══════════════════════════════════════════════════════════ */
function RegisterHero() {
  return (
    <section className="europe-rg-hero" aria-label="Registration hero">
      <div className="europe-rg-hero__content">

        <span className="europe-rg-hero__tag">
          Speaker Registration 2026 / 2027
        </span>

        <h1 className="europe-rg-hero__title">
          Claim Your <em>Global Stage</em>
        </h1>

        <p className="europe-rg-hero__sub">
          Register now to secure your speaking slot at one of our world-class
          conferences. Limited seats available — act fast.
        </p>

      </div>

      {/* ── Right Accent Panel ── */}
      <div className="europe-rg-hero__accent-panel" aria-hidden="true">
        <div className="europe-rg-hero__accent-bar" />
        <div className="europe-rg-hero__accent-dots">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="europe-rg-hero__accent-dot" />
          ))}
        </div>
        <div className="europe-rg-hero__accent-label">SGC 2027/ 2028</div>
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

  const handleRegionChange = (e) => {
    setField("regionId", e.target.value);
    setField("conferenceId", "");
  };

  return (
    <div className="europe-rg-form-body">
      {/* ── Personal Information ── */}
      <div className="europe-rg-section-label">
        <span className="europe-rg-section-label__icon" aria-hidden="true">01</span>
        <span>Personal Information</span>
      </div>

      <div className="europe-rg-row">
        <Field label="First Name" required error={errors.firstName}>
          <input
            value={fields.firstName} onChange={set("firstName")}
            className={`europe-rg-input${errors.firstName ? " europe-rg-input--error" : ""}`}
            placeholder="Jane" autoComplete="given-name"
            aria-required="true" aria-invalid={!!errors.firstName}
          />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input
            value={fields.lastName} onChange={set("lastName")}
            className={`europe-rg-input${errors.lastName ? " europe-rg-input--error" : ""}`}
            placeholder="Smith" autoComplete="family-name"
            aria-required="true" aria-invalid={!!errors.lastName}
          />
        </Field>
      </div>

      <div className="europe-rg-row">
        <Field label="Email Address" required error={errors.email}>
          <input
            value={fields.email} onChange={set("email")} type="email"
            className={`europe-rg-input${errors.email ? " europe-rg-input--error" : ""}`}
            placeholder="jane@example.com" autoComplete="email"
            aria-required="true" aria-invalid={!!errors.email}
          />
        </Field>
        <Field label="Phone Number" required error={errors.phone}>
          <div className="europe-rg-phone-wrap">
            <CountryDropdown
              value={fields.countryCode}
              onChange={(code) => setField("countryCode", code)}
            />
            <input
              value={fields.phone} onChange={set("phone")}
              className={`europe-rg-input europe-rg-input--phone${errors.phone ? " europe-rg-input--error" : ""}`}
              placeholder="Phone number" autoComplete="tel-national" type="tel"
              aria-required="true" aria-invalid={!!errors.phone}
            />
          </div>
        </Field>
      </div>

      <div className="europe-rg-row">
        <Field label="Country of Residence" required error={errors.country}>
          <input
            value={fields.country} onChange={set("country")}
            className={`europe-rg-input${errors.country ? " europe-rg-input--error" : ""}`}
            placeholder="e.g. Germany" autoComplete="country-name"
            aria-required="true" aria-invalid={!!errors.country}
          />
        </Field>
        <Field label="Organization / Company">
          <input
            value={fields.organization} onChange={set("organization")}
            className="europe-rg-input" placeholder="Company / Brand"
            autoComplete="organization"
          />
        </Field>
      </div>

      <div className="europe-rg-row europe-rg-row--single">
        <Field label="Job Title / Role">
          <input
            value={fields.jobTitle} onChange={set("jobTitle")}
            className="europe-rg-input" placeholder="CEO, Coach, Author…"
            autoComplete="organization-title"
          />
        </Field>
      </div>

      {/* ── Conference Selection ── */}
      <div className="europe-rg-section-label europe-rg-section-label--spaced">
        <span className="europe-rg-section-label__icon" aria-hidden="true">02</span>
        <span>Conference Selection</span>
      </div>

      <div className="europe-rg-row">
        <Field label="Region" required error={errors.regionId}>
          <div className="europe-rg-select-wrap">
            <select
              value={fields.regionId} onChange={handleRegionChange}
              className={`europe-rg-select${errors.regionId ? " europe-rg-select--error" : ""}`}
              aria-required="true" aria-invalid={!!errors.regionId}
            >
              <option value="">— Select a region —</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.flag}  {r.label}</option>
              ))}
            </select>
            <span className="europe-rg-select-icon" aria-hidden="true"><ChevronSVG /></span>
          </div>
        </Field>

        <Field label="Conference" required error={errors.conferenceId}>
          <div className="europe-rg-select-wrap">
            <select
              value={fields.conferenceId} onChange={set("conferenceId")}
              className={`europe-rg-select${errors.conferenceId ? " europe-rg-select--error" : ""}${!fields.regionId ? " europe-rg-select--disabled" : ""}`}
              disabled={!fields.regionId}
              aria-required="true" aria-invalid={!!errors.conferenceId}
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
            <span className="europe-rg-select-icon" aria-hidden="true"><ChevronSVG /></span>
          </div>
        </Field>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 2 — Speaker Type + Package + Companions + Extra Nights
   ═══════════════════════════════════════════════════════════ */
function Step2({ fields, errors, setField }) {
  const activePkgs  = fields.speakerType === "virtual" ? VIRTUAL_PACKAGES : PHYSICAL_PACKAGES;
  const selectedPkg = PACKAGES.find((p) => p.id === fields.packageId);
  const total       = calculateTotal(
    fields.packageId, fields.companions, fields.discount || 0, fields.extraNights || 0
  );
  const isVirtual   = fields.speakerType === "virtual";

  const CheckSVG = () => (
    <svg viewBox="0 0 12 10" fill="none" width="10" height="8" aria-hidden="true">
      <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const handleTypeSwitch = (type) => {
    setField("speakerType", type);
    setField("packageId", "");
    setField("extraNights", 0);
  };

  return (
    <div className="europe-rg-form-body">
      {/* ── Participation Type ── */}
      <div>
        <div className="europe-rg-section-label">
          <span className="europe-rg-section-label__icon" aria-hidden="true">01</span>
          <span>Participation Type</span>
        </div>
        {errors.speakerType && (
          <span className="europe-rg-error-msg" role="alert" style={{ marginTop: 8, display: "block" }}>
            {errors.speakerType}
          </span>
        )}
        <div className="europe-rg-type-toggle" role="radiogroup" aria-label="Participation type">
          {[
            { type: "physical", icon: "🎤", label: "Physical Speaker", sub: "In-person at venue",          virtual: false },
            { type: "virtual",  icon: "💻", label: "Virtual Speaker",  sub: "Present via Zoom / Airmeet", virtual: true  },
          ].map(({ type, icon, label, sub, virtual }) => (
            <button
              key={type} type="button"
              className={`europe-rg-type-btn${
                fields.speakerType === type
                  ? ` europe-rg-type-btn--active${virtual ? " europe-rg-type-btn--virtual" : ""}`
                  : ""
              }`}
              onClick={() => handleTypeSwitch(type)}
              role="radio" aria-checked={fields.speakerType === type}
            >
              <span className="europe-rg-type-btn__icon" aria-hidden="true">{icon}</span>
              <span className="europe-rg-type-btn__label">{label}</span>
              <span className="europe-rg-type-btn__sub">{sub}</span>
              {fields.speakerType === type && (
                <span className="europe-rg-type-btn__check" aria-hidden="true"><CheckSVG /></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Package Selection ── */}
      {fields.speakerType && (
        <div>
          <div className="europe-rg-section-label europe-rg-section-label--spaced">
            <span className="europe-rg-section-label__icon" aria-hidden="true">02</span>
            <span>Choose Your Package</span>
          </div>
          {errors.packageId && (
            <span className="europe-rg-error-msg" role="alert" style={{ marginBottom: 12, display: "block" }}>
              {errors.packageId}
            </span>
          )}
          <div
            className={`europe-rg-pkg-grid${isVirtual ? " europe-rg-pkg-grid--virtual" : ""}`}
            role="radiogroup" aria-label="Package options"
          >
            {activePkgs.map((pkg) => (
              <div
                key={pkg.id}
                className={`europe-rg-pkg-card${fields.packageId === pkg.id ? " europe-rg-pkg-card--active" : ""}`}
                onClick={() => setField("packageId", pkg.id)}
                role="radio" aria-checked={fields.packageId === pkg.id}
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setField("packageId", pkg.id)}
              >
                {pkg.badge && <div className="europe-rg-pkg-card__badge">{pkg.badge}</div>}
                <div className="europe-rg-pkg-card__header">
                  <div className="europe-rg-pkg-card__icon" aria-hidden="true">{pkg.icon}</div>
                  <div className="europe-rg-pkg-card__name">{pkg.name}</div>
                  <div className="europe-rg-pkg-card__price" aria-label={`Price: $${pkg.price.toLocaleString()}`}>
                    ${pkg.price.toLocaleString()}
                  </div>
                </div>
                <ul className="europe-rg-pkg-card__benefits" aria-label={`${pkg.name} benefits`}>
                  {pkg.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <div className="europe-rg-pkg-card__radio" aria-hidden="true">
                  {fields.packageId === pkg.id && (
                    <svg viewBox="0 0 12 10" fill="none" width="10" height="8">
                      <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Companions + Extra Nights (Physical only) ── */}
      {fields.speakerType === "physical" && (
        <>
          <div className="europe-rg-section-label europe-rg-section-label--spaced">
            <span className="europe-rg-section-label__icon" aria-hidden="true">03</span>
            <span>Additional Attendees &amp; Nights</span>
          </div>

          {[
            {
              icon:  "👥",
              title: "Accompanying Person(s)",
              sub:   `Each additional attendee — $${COMPANION_PRICE}`,
              key:   "companions",
            },
            {
              icon:  "🌙",
              title: "Extra Night(s)",
              sub:   `Each additional night — $${EXTRA_NIGHT_PRICE}`,
              key:   "extraNights",
            },
          ].map(({ icon, title, sub, key }) => (
            <div key={key} className="europe-rg-companion-box">
              <div className="europe-rg-companion-box__info">
                <div className="europe-rg-companion-box__title">
                  <span className="europe-rg-companion-box__title-icon" aria-hidden="true">{icon}</span>
                  {title}
                </div>
                <div
                  className="europe-rg-companion-box__sub"
                  dangerouslySetInnerHTML={{
                    __html: sub.replace(/\$\d+/, (m) => `<strong>${m}</strong>`),
                  }}
                />
              </div>
              <div className="europe-rg-companion-counter" role="group" aria-label={`Number of ${key}`}>
                <button
                  className="europe-rg-counter-btn"
                  disabled={(fields[key] || 0) === 0}
                  onClick={() => setField(key, Math.max(0, (fields[key] || 0) - 1))}
                  type="button" aria-label={`Decrease ${key}`}
                >−</button>
                <span className="europe-rg-counter-val" aria-live="polite">{fields[key] || 0}</span>
                <button
                  className="europe-rg-counter-btn"
                  onClick={() => setField(key, (fields[key] || 0) + 1)}
                  type="button" aria-label={`Increase ${key}`}
                >+</button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* ── Price Summary Bar ── */}
      <PriceSummaryBar
        selectedPkg={selectedPkg}
        companions={fields.companions}
        extraNights={fields.extraNights || 0}
        isVirtual={isVirtual}
        total={total}
        discount={fields.discount}
        label="Estimated Total"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRICE SUMMARY BAR
   ═══════════════════════════════════════════════════════════ */
function PriceSummaryBar({ selectedPkg, companions, extraNights = 0, isVirtual, total, discount, label, couponCode }) {
  const parts = [
    selectedPkg ? `${selectedPkg.name} $${selectedPkg.price.toLocaleString()}` : "Select a package to see pricing",
    companions > 0 && !isVirtual ? ` + ${companions} companion${companions > 1 ? "s" : ""} $${companions * COMPANION_PRICE}` : "",
    extraNights > 0 && !isVirtual ? ` + ${extraNights} extra night${extraNights > 1 ? "s" : ""} $${extraNights * EXTRA_NIGHT_PRICE}` : "",
    discount > 0 && couponCode ? ` · Coupon ${couponCode} −$${discount}` : "",
  ].join("");

  return (
    <div className="europe-rg-total-bar" aria-label="Price summary">
      <div className="europe-rg-total-bar__left">
        <div className="europe-rg-total-bar__label">{label}</div>
        <div className="europe-rg-total-bar__breakdown">{parts}</div>
      </div>
      <div className="europe-rg-total-bar__amount">
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

  const handleApply = () => {
    const result = applyCoupon(input);
    if (result.valid) { onApply(result.code, result.discount); setStatus("applied"); }
    else { setStatus("error"); setShake(true); setTimeout(() => setShake(false), 500); }
  };

  const handleRemove = () => { setInput(""); setStatus("idle"); onRemove(); };

  return (
    <div className="europe-rg-coupon-box" role="region" aria-label="Coupon code">
      <div className="europe-rg-coupon-box__header">
        <span className="europe-rg-coupon-box__icon" aria-hidden="true">🏷</span>
        <span className="europe-rg-coupon-box__label">Have a Coupon Code?</span>
      </div>

      {status === "applied" ? (
        <div className="europe-rg-coupon-applied" role="status" aria-live="polite">
          <span className="europe-rg-coupon-applied__tag">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <strong>{couponCode}</strong> — ${discount} off applied!
          </span>
          <button type="button" className="europe-rg-coupon-remove" onClick={handleRemove} aria-label="Remove coupon">
            Remove
          </button>
        </div>
      ) : (
        <div className={`europe-rg-coupon-row${shake ? " europe-rg-coupon-row--shake" : ""}`}>
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value.toUpperCase()); setStatus("idle"); }}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            className={`europe-rg-input europe-rg-coupon-input${status === "error" ? " europe-rg-input--error" : ""}`}
            placeholder="ENTER CODE" maxLength={20}
            aria-label="Coupon code" aria-invalid={status === "error"}
          />
          <button
            type="button" className="europe-rg-coupon-btn"
            onClick={handleApply} disabled={!input.trim()}
            aria-label="Apply coupon code"
          >
            Apply
          </button>
        </div>
      )}
      {status === "error" && (
        <span className="europe-rg-error-msg" role="alert" style={{ marginTop: 6, display: "block" }}>
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
  const total       = calculateTotal(fields.packageId, fields.companions, fields.discount || 0, fields.extraNights || 0);
  const regionLabel = REGIONS.find((r) => r.id === fields.regionId)?.label || "—";
  const isVirtual   = fields.speakerType === "virtual";

  return (
    <div className="europe-rg-form-body">
      <ReviewSection title="Personal Details" onEdit={() => onEditStep(1)}>
        <div className="europe-rg-review-grid">
          {[
            ["Full Name",     `${fields.firstName} ${fields.lastName}`],
            ["Email",         fields.email],
            ["Phone",         `${fields.countryCode} ${fields.phone}`],
            ["Country",       fields.country],
            ...(fields.organization ? [["Organization", fields.organization]] : []),
            ...(fields.jobTitle     ? [["Job Title",    fields.jobTitle]]     : []),
          ].map(([label, value]) => <ReviewRow key={label} label={label} value={value} />)}
        </div>
      </ReviewSection>

      <ReviewSection title="Conference" onEdit={() => onEditStep(1)}>
        <div className="europe-rg-review-grid">
          <ReviewRow label="Region" value={regionLabel} />
          <ReviewRow
            label="Conference"
            value={conf ? `${conf.title} · ${conf.location} · ${conf.date}` : "—"}
            full
          />
        </div>
      </ReviewSection>

      <ReviewSection title="Package, Companions &amp; Nights" onEdit={() => onEditStep(2)}>
        <div className="europe-rg-review-grid" style={{ marginBottom: 14 }}>
          <ReviewRow
            label="Participation"
            value={<span style={{ textTransform: "capitalize" }}>{fields.speakerType || "—"}</span>}
          />
        </div>
        {pkg && (
          <div className="europe-rg-review-pkg">
            <span className="europe-rg-review-pkg__dot" style={{ background: pkg.color }} aria-hidden="true" />
            <span className="europe-rg-review-pkg__icon" aria-hidden="true">{pkg.icon}</span>
            <span className="europe-rg-review-pkg__name">{pkg.name}</span>
            <span className="europe-rg-review-pkg__price">${pkg.price.toLocaleString()}</span>
          </div>
        )}
        {!isVirtual && (
          <div className="europe-rg-review-grid" style={{ marginTop: 14 }}>
            <ReviewRow
              label="Companions"
              value={
                fields.companions === 0
                  ? "None"
                  : `${fields.companions} person${fields.companions > 1 ? "s" : ""} (+$${fields.companions * COMPANION_PRICE})`
              }
            />
            <ReviewRow
              label="Extra Nights"
              value={
                (fields.extraNights || 0) === 0
                  ? "None"
                  : `${fields.extraNights} night${fields.extraNights > 1 ? "s" : ""} (+$${fields.extraNights * EXTRA_NIGHT_PRICE})`
              }
            />
          </div>
        )}
      </ReviewSection>

      <CouponWidget
        couponCode={fields.couponCode}
        discount={fields.discount}
        onApply={(code, disc) => { setField("couponCode", code); setField("discount", disc); }}
        onRemove={() => { setField("couponCode", ""); setField("discount", 0); }}
      />

      <div className="europe-rg-total-bar europe-rg-total-bar--final" aria-label="Final amount">
        <div className="europe-rg-total-bar__left">
          <div className="europe-rg-total-bar__label">Total Amount Due</div>
          <div className="europe-rg-total-bar__breakdown">
            {fields.discount > 0
              ? `Coupon "${fields.couponCode}" saves you $${fields.discount}`
              : "Our team will contact you to confirm payment details"}
          </div>
        </div>
        <div className="europe-rg-total-bar__amount">
          {fields.discount > 0 && pkg && (
            <span className="europe-rg-total-bar__original">
              ${calculateTotal(fields.packageId, fields.companions, 0, fields.extraNights || 0).toLocaleString()}
            </span>
          )}
          <span>${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

const ReviewSection = ({ title, onEdit, children }) => (
  <div className="europe-rg-review-section">
    <div className="europe-rg-review-section__head">
      <span className="europe-rg-review-section__title">{title}</span>
      <button className="europe-rg-edit-btn" onClick={onEdit} type="button" aria-label={`Edit ${title}`}>
        <svg viewBox="0 0 14 14" fill="none" width="11" height="11" aria-hidden="true">
          <path d="M9.5 1.5l3 3L4 13H1v-3L9.5 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Edit
      </button>
    </div>
    {children}
  </div>
);

const ReviewRow = ({ label, value, full }) => (
  <div className={`europe-rg-review-row${full ? " europe-rg-review-row--full" : ""}`}>
    <span className="europe-rg-review-label">{label}</span>
    <span className="europe-rg-review-value">{value}</span>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   SUCCESS SCREEN
   ═══════════════════════════════════════════════════════════ */
function SuccessScreen({ fields, allConferences, onReset }) {
  const conf      = allConferences.find((c) => String(c.id) === fields.conferenceId);
  const pkg       = PACKAGES.find((p) => p.id === fields.packageId);
  const total     = calculateTotal(fields.packageId, fields.companions, fields.discount || 0, fields.extraNights || 0);
  const isVirtual = fields.speakerType === "virtual";

  const rows = [
    ["Name",         `${fields.firstName} ${fields.lastName}`],
    ["Email",        fields.email],
    ["Phone",        `${fields.countryCode} ${fields.phone}`],
    ["Conference",   conf ? `${conf.title} · ${conf.location}` : "—"],
    ["Date",         conf?.date || "—"],
    ["Type",         fields.speakerType ? fields.speakerType.charAt(0).toUpperCase() + fields.speakerType.slice(1) : "—"],
    ["Package",      pkg ? `${pkg.name} — $${pkg.price.toLocaleString()}` : "—"],
    ["Companions",   isVirtual ? "N/A" : fields.companions > 0 ? `${fields.companions} person(s) (+$${fields.companions * COMPANION_PRICE})` : "None"],
    ["Extra Nights", isVirtual ? "N/A" : (fields.extraNights || 0) > 0 ? `${fields.extraNights} night(s) (+$${fields.extraNights * EXTRA_NIGHT_PRICE})` : "None"],
    ...(fields.discount > 0 ? [["Discount", `-$${fields.discount} (${fields.couponCode})`]] : []),
    ["Total",        `$${total.toLocaleString()}`],
  ];
  const navigate = useNavigate();

  return (
    <section className="europe-rg-result europe-rg-result--success" role="main" aria-label="Registration successful">
      <div className="europe-rg-result__confetti" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="europe-rg-result__confetti-piece" style={{ "--i": i }} />
        ))}
      </div>
      <div className="europe-rg-result__card">
        <div className="europe-rg-result__icon europe-rg-result__icon--success" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
            <path d="M4 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="europe-rg-result__title">You're <em>Registered!</em></h2>
        <p className="europe-rg-result__sub">
          Welcome to Signature Global Conferences. Your application has been received.
          Our team will shortly contact you to confirm details.
        </p>

        <div className="europe-rg-email-notice" aria-label="Email confirmation">
          <span className="europe-rg-email-notice__icon" aria-hidden="true">📧</span>
          <div>
            <div className="europe-rg-email-notice__title">Confirmation Email Sent</div>
            <div className="europe-rg-email-notice__sub">
              A detailed confirmation has been sent to{" "}
              <strong>{fields.email}</strong>. Please check your inbox (and spam folder).
            </div>
          </div>
        </div>

        <div className="europe-rg-result__summary" role="list" aria-label="Registration summary">
          {rows.map(([label, value]) => (
            <div key={label} className="europe-rg-result__row" role="listitem">
              <span className="europe-rg-result__row-label">{label}</span>
              <span className="europe-rg-result__row-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="europe-rg-result__actions">
          <button className="europe-rg-btn-primary" onClick={onReset}>Register Another</button>
          <button className="europe-rg-btn-ghost" onClick={() => navigate("/europe-events")}>View Conferences</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAIL SCREEN
   ═══════════════════════════════════════════════════════════ */
const FailScreen = ({ onRetry }) => (
  <section className="europe-rg-result europe-rg-result--fail" role="main" aria-label="Registration failed">
    <div className="europe-rg-result__card">
      <div className="europe-rg-result__icon europe-rg-result__icon--fail" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
          <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className="europe-rg-result__title">Submission <em>Failed</em></h2>
      <p className="europe-rg-result__sub">
        Something went wrong. Your details have been saved — please try again.
        If the issue persists, contact us directly.
      </p>
      <div className="europe-rg-result__actions">
        <button className="europe-rg-btn-primary" onClick={onRetry}>Try Again</button>
        <button className="europe-rg-btn-ghost">Contact Support</button>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   MAIN FORM CONTAINER
   ═══════════════════════════════════════════════════════════ */
function RegistrationForm({ onSuccess, onFail }) {
  const [fields,     setFields]     = useState({ ...INITIAL_FORM, countryCode: DEFAULT_COUNTRY.code });
  const [errors,     setErrors]     = useState({});
  const [step,       setStep]       = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const allConferences = useMemo(() => getConferencesForRegion("all"), []);

  const set      = (key) => (e) => setFields((prev) => ({ ...prev, [key]: e.target.value }));
  const setField = (key, val) => setFields((prev) => ({ ...prev, [key]: val }));
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goNext = () => {
    const errs = step === 1 ? validateStep1(fields) : validateStep2(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setStep((s) => s + 1); scrollTop();
  };
  const goBack   = () => { setErrors({}); setStep((s) => s - 1); scrollTop(); };
  const goToStep = (n) => { setErrors({}); setStep(n); scrollTop(); };

  const handleSubmit = async () => {
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
  };

  const meta = STEP_META[step];

  return (
    <div className="europe-rg-form-card" role="main">
      <div className="europe-rg-form-card__header">
        <StepIndicator currentStep={step} />
        <div className="europe-rg-form-card__step">{meta.step}</div>
        <div className="europe-rg-form-card__title">{meta.title}</div>
      </div>

      {step === 1 && <Step1 fields={fields} errors={errors} set={set} setField={setField} />}
      {step === 2 && <Step2 fields={fields} errors={errors} setField={setField} />}
      {step === 3 && (
        <Step3 fields={fields} allConferences={allConferences} onEditStep={goToStep} setField={setField} />
      )}

      <div className="europe-rg-form-footer">
        <div className="europe-rg-form-footer__actions">
          {step > 1 && (
            <button className="europe-rg-back-btn" onClick={goBack} type="button" aria-label="Go back">
              <svg viewBox="0 0 16 10" fill="none" width="14" height="10" aria-hidden="true">
                <path d="M5 1L1 5l4 4M1 5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
          )}
          {step < 3 ? (
            <button className="europe-rg-submit-btn" onClick={goNext} type="button">
              Continue
              <svg viewBox="0 0 16 10" fill="none" width="14" height="10" aria-hidden="true">
                <path d="M11 1l4 4-4 4M15 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <button
              className="europe-rg-submit-btn" onClick={handleSubmit}
              disabled={submitting} type="button" aria-busy={submitting}
            >
              {submitting ? (
                <><span className="europe-rg-spinner" aria-hidden="true" />Submitting…</>
              ) : (
                <>
                  Complete Registration
                  <svg viewBox="0 0 16 10" fill="none" width="14" height="10" aria-hidden="true">
                    <path d="M11 1l4 4-4 4M15 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
        <p className="europe-rg-form-note">
          By registering you agree to our{" "}
          <a href="#" className="europe-rg-form-note__link">Terms &amp; Conditions</a>.
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
  const handleReset   = ()     => { setData(null);   setStatus("form"); };

  return (
    <div className="europe-page europe-register-page">
      <Navbar />
      {status === "success" && (
        <SuccessScreen fields={submittedData} allConferences={allConferences} onReset={handleReset} />
      )}
      {status === "fail"    && <FailScreen onRetry={() => setStatus("form")} />}
      {status === "form"    && (
        <>
          <RegisterHero />
          <section className="europe-rg-section" aria-label="Registration form">
            <div className="europe-rg-section__inner">
              <RegistrationForm onSuccess={handleSuccess} onFail={handleFail} />
            </div>
          </section>
          <Footer theme="europe" />
        </>
      )}
    </div>
  );
}