import { useState, useMemo, useRef, useEffect } from "react";
import { Navbar } from "../Home/asia.jsx";
import { allCountries } from "country-telephone-data";
import Footer from "../../../Components/Footer/footer.jsx";
import "./asiaregister.css";

import {  REGIONS,  PACKAGES,  PHYSICAL_PACKAGES,  VIRTUAL_PACKAGES,  COMPANION_PRICE,
  INITIAL_FORM,  STEP_META,  getConferencesForRegion,  validateStep1,
  validateStep2,  calculateTotal,  submitRegistration,  applyCoupon,} from "./registerdata.js";

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
  // Default to Singapore for Asia region
  const defaultCountry = mapped.find((c) => c.iso === "sg");
  const rest = mapped.filter((c) => {
    const key = `${c.name}-${c.dialCode}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return c.iso !== "sg";
  });
  return defaultCountry ? [defaultCountry, ...rest] : rest;
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
    <div className="as-rg-country-dropdown" ref={wrapRef}>
      <div
        className={`as-rg-country-trigger${open ? " as-rg-country-trigger--open" : ""}`}
        onClick={handleOpen}
      >
        {open ? (
          <input
            ref={inputRef}
            className="as-rg-country-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country…"
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="as-rg-country-selected">
            <span className="as-rg-country-code">{selected.code}</span>
            <span className="as-rg-country-name">{selected.name}</span>
          </span>
        )}
        <svg
          className={`as-rg-country-chevron${open ? " as-rg-country-chevron--up" : ""}`}
          viewBox="0 0 10 6"
          fill="none"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {open && (
        <div className="as-rg-country-list">
          {filtered.length === 0 ? (
            <div className="as-rg-country-empty">No countries found</div>
          ) : (
            filtered.map((country) => (
              <div
                key={`${country.iso}-${country.dialCode}`}
                className={`as-rg-country-option${country.code === value ? " as-rg-country-option--active" : ""}`}
                onMouseDown={(e) => { e.preventDefault(); handleSelect(country); }}
              >
                <span className="as-rg-country-option__code">{country.code}</span>
                <span className="as-rg-country-option__name">{country.name}</span>
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
          <span className={`as-rg-step-indicator__label ${currentStep === s.num ? "active" : ""}`}>
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
        <span className="as-rg-hero__tag">Speaker Registration 2026 / 2027</span>
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
    () => (fields.regionId ? getConferencesForRegion(fields.regionId) : []),
    [fields.regionId]
  );

  function handleRegionChange(e) {
    setField("regionId", e.target.value);
    setField("conferenceId", "");
  }

  return (
    <div className="as-rg-form-body">
      <div className="as-rg-row">
        <Field label="First Name" required error={errors.firstName}>
          <input
            value={fields.firstName}
            onChange={set("firstName")}
            className={`as-rg-input${errors.firstName ? " as-rg-input--error" : ""}`}
            placeholder="Jane"
            autoComplete="given-name"
          />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input
            value={fields.lastName}
            onChange={set("lastName")}
            className={`as-rg-input${errors.lastName ? " as-rg-input--error" : ""}`}
            placeholder="Smith"
            autoComplete="family-name"
          />
        </Field>
      </div>

      <div className="as-rg-row">
        <Field label="Email Address" required error={errors.email}>
          <input
            value={fields.email}
            onChange={set("email")}
            type="email"
            className={`as-rg-input${errors.email ? " as-rg-input--error" : ""}`}
            placeholder="jane@example.com"
            autoComplete="email"
          />
        </Field>

        <Field label="Phone Number" required error={errors.phone}>
          <div className="as-rg-phone-wrap">
            <CountryDropdown
              value={fields.countryCode}
              onChange={(code) => setField("countryCode", code)}
            />
            <input
              value={fields.phone}
              onChange={set("phone")}
              className={`as-rg-input as-rg-input--phone${errors.phone ? " as-rg-input--error" : ""}`}
              placeholder="Phone number"
              autoComplete="tel-national"
              type="tel"
            />
          </div>
        </Field>
      </div>

      <div className="as-rg-row">
        <Field label="Country" required error={errors.country}>
          <input
            value={fields.country}
            onChange={set("country")}
            className={`as-rg-input${errors.country ? " as-rg-input--error" : ""}`}
            placeholder="Singapore"
            autoComplete="country-name"
          />
        </Field>
        <Field label="Organization">
          <input
            value={fields.organization}
            onChange={set("organization")}
            className="as-rg-input"
            placeholder="Company / Brand"
            autoComplete="organization"
          />
        </Field>
      </div>

      <div className="as-rg-row">
        <Field label="Job Title / Role">
          <input
            value={fields.jobTitle}
            onChange={set("jobTitle")}
            className="as-rg-input"
            placeholder="CEO, Coach, Author…"
            autoComplete="organization-title"
          />
        </Field>
      </div>

      <div className="as-rg-divider">Conference Selection</div>

      <div className="as-rg-row">
        <Field label="Region" required error={errors.regionId}>
          <div className="as-rg-select-wrap">
            <select
              value={fields.regionId}
              onChange={handleRegionChange}
              className={`as-rg-select${errors.regionId ? " as-rg-select--error" : ""}`}
            >
              <option value="">— Select a region —</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.flag}  {r.label}
                </option>
              ))}
            </select>
          </div>
        </Field>

        <Field label="Conference" required error={errors.conferenceId}>
          <div className="as-rg-select-wrap">
            <select
              value={fields.conferenceId}
              onChange={set("conferenceId")}
              className={`as-rg-select${errors.conferenceId ? " as-rg-select--error" : ""}${!fields.regionId ? " as-rg-select--disabled" : ""}`}
              disabled={!fields.regionId}
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
    <div className="as-rg-form-body">
      <div>
        <label className="as-rg-label" style={{ marginBottom: 12, display: "block" }}>
          Participation Type <span style={{ color: "var(--as-rg-accent)" }}>*</span>
        </label>
        {errors.speakerType && (
          <span className="as-rg-error-msg" style={{ marginBottom: 10, display: "block" }}>
            {errors.speakerType}
          </span>
        )}
        <div className="as-rg-type-toggle">
          <button
            type="button"
            className={`as-rg-type-btn${fields.speakerType === "physical" ? " as-rg-type-btn--active" : ""}`}
            onClick={() => handleTypeSwitch("physical")}
          >
            <span className="as-rg-type-btn__icon">🎤</span>
            <span className="as-rg-type-btn__label">Physical Speaker</span>
            <span className="as-rg-type-btn__sub">In-person at venue</span>
          </button>
          <button
            type="button"
            className={`as-rg-type-btn${fields.speakerType === "virtual" ? " as-rg-type-btn--active as-rg-type-btn--virtual" : ""}`}
            onClick={() => handleTypeSwitch("virtual")}
          >
            <span className="as-rg-type-btn__icon">💻</span>
            <span className="as-rg-type-btn__label">Virtual Speaker</span>
            <span className="as-rg-type-btn__sub">Present via Zoom / Airmeet</span>
          </button>
        </div>
      </div>

      {fields.speakerType && (
        <div>
          <label className="as-rg-label" style={{ marginBottom: 14, display: "block" }}>
            Choose Package <span style={{ color: "var(--as-rg-accent)" }}>*</span>
          </label>
          {errors.packageId && (
            <span className="as-rg-error-msg" style={{ marginBottom: 10, display: "block" }}>
              {errors.packageId}
            </span>
          )}
          <div className={`as-rg-pkg-grid${isVirtual ? " as-rg-pkg-grid--virtual" : ""}`}>
            {activePkgs.map((pkg) => (
              <div
                key={pkg.id}
                className={`as-rg-pkg-card${fields.packageId === pkg.id ? " as-rg-pkg-card--active" : ""}`}
                onClick={() => setField("packageId", pkg.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && setField("packageId", pkg.id)
                }
              >
                <div className="as-rg-pkg-card__radio">✓</div>
                {pkg.badge && <div className="as-rg-pkg-card__badge">{pkg.badge}</div>}
                <div className="as-rg-pkg-card__header">
                  <div className="as-rg-pkg-card__icon">{pkg.icon}</div>
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
      )}

      {fields.speakerType === "physical" && (
        <>
          <div className="as-rg-divider">Additional Attendees</div>
          <div className="as-rg-companion-box">
            <div className="as-rg-companion-box__info">
              <div className="as-rg-companion-box__title">Accompanying Person(s)</div>
              <div className="as-rg-companion-box__sub">
                Each additional attendee is ${COMPANION_PRICE} · Currently:{" "}
                <strong style={{ color: "var(--as-rg-accent)" }}>{fields.companions}</strong>
              </div>
            </div>
            <div className="as-rg-companion-counter">
              <button
                className="as-rg-counter-btn"
                disabled={fields.companions === 0}
                onClick={() => setField("companions", Math.max(0, fields.companions - 1))}
                type="button"
              >−</button>
              <span className="as-rg-counter-val">{fields.companions}</span>
              <button
                className="as-rg-counter-btn"
                onClick={() => setField("companions", fields.companions + 1)}
                type="button"
              >+</button>
            </div>
          </div>
        </>
      )}

      <div className="as-rg-total-bar">
        <div className="as-rg-total-bar__left">
          <div className="as-rg-total-bar__label">Estimated Total</div>
          <div className="as-rg-total-bar__breakdown">
            {selectedPkg
              ? `${selectedPkg.name} $${selectedPkg.price.toLocaleString()}${
                  fields.companions > 0 && !isVirtual
                    ? ` + ${fields.companions} companion${fields.companions > 1 ? "s" : ""} $${fields.companions * COMPANION_PRICE}`
                    : ""
                }`
              : "Select a package to see pricing"}
          </div>
        </div>
        <div className="as-rg-total-bar__amount">${total.toLocaleString()}</div>
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
    <div className="as-rg-coupon-box">
      <div className="as-rg-coupon-box__label">Have a Coupon Code?</div>
      {status === "applied" ? (
        <div className="as-rg-coupon-applied">
          <span className="as-rg-coupon-applied__tag">
            🎉 <strong>{couponCode}</strong> — ${discount} off applied
          </span>
          <button type="button" className="as-rg-coupon-remove" onClick={handleRemove}>
            Remove
          </button>
        </div>
      ) : (
        <div className={`as-rg-coupon-row${shake ? " as-rg-coupon-row--shake" : ""}`}>
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value.toUpperCase()); setStatus("idle"); }}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            className={`as-rg-input as-rg-coupon-input${status === "error" ? " as-rg-input--error" : ""}`}
            placeholder="Enter code"
            maxLength={20}
          />
          <button
            type="button"
            className="as-rg-coupon-btn"
            onClick={handleApply}
            disabled={!input.trim()}
          >
            Apply
          </button>
        </div>
      )}
      {status === "error" && (
        <span className="as-rg-error-msg" style={{ marginTop: 6, display: "block" }}>
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
    <div className="as-rg-form-body">
      <div className="as-rg-review-section">
        <div className="as-rg-review-section__head">
          <span className="as-rg-review-section__title">Personal Details</span>
          <button className="as-rg-edit-btn" onClick={() => onEditStep(1)}>Edit</button>
        </div>
        <div className="as-rg-review-grid">
          {[
            ["Full Name",     `${fields.firstName} ${fields.lastName}`],
            ["Email",         fields.email],
            ["Phone",         `${fields.countryCode} ${fields.phone}`],
            ["Country",       fields.country],
            ...(fields.organization ? [["Organization", fields.organization]] : []),
            ...(fields.jobTitle     ? [["Job Title",    fields.jobTitle]]     : []),
          ].map(([label, value]) => (
            <div key={label} className="as-rg-review-row">
              <span className="as-rg-review-label">{label}</span>
              <span className="as-rg-review-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

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

      <div className="as-rg-review-section">
        <div className="as-rg-review-section__head">
          <span className="as-rg-review-section__title">Package &amp; Companions</span>
          <button className="as-rg-edit-btn" onClick={() => onEditStep(2)}>Edit</button>
        </div>
        <div className="as-rg-review-grid" style={{ marginBottom: 14 }}>
          <div className="as-rg-review-row">
            <span className="as-rg-review-label">Participation Type</span>
            <span className="as-rg-review-value" style={{ textTransform: "capitalize" }}>
              {fields.speakerType || "—"}
            </span>
          </div>
        </div>
        {pkg && (
          <div className="as-rg-review-pkg" style={{ marginBottom: 14 }}>
            <div className="as-rg-review-pkg__dot" style={{ background: pkg.color }} />
            <span className="as-rg-review-pkg__icon">{pkg.icon}</span>
            <span className="as-rg-review-pkg__name">{pkg.name}</span>
            <span className="as-rg-review-pkg__price">${pkg.price.toLocaleString()}</span>
          </div>
        )}
        <div className="as-rg-review-grid">
          <div className="as-rg-review-row">
            <span className="as-rg-review-label">Companions</span>
            <span className="as-rg-review-value">
              {isVirtual
                ? "N/A (virtual)"
                : fields.companions === 0
                ? "None"
                : `${fields.companions} person${fields.companions > 1 ? "s" : ""} (+$${fields.companions * COMPANION_PRICE})`}
            </span>
          </div>
        </div>
      </div>

      <CouponWidget
        couponCode={fields.couponCode}
        discount={fields.discount}
        onApply={(code, discount) => { setField("couponCode", code); setField("discount", discount); }}
        onRemove={() => { setField("couponCode", ""); setField("discount", 0); }}
      />

      <div className="as-rg-total-bar">
        <div className="as-rg-total-bar__left">
          <div className="as-rg-total-bar__label">Total Amount Due</div>
          <div className="as-rg-total-bar__breakdown">
            {fields.discount > 0
              ? `Coupon ${fields.couponCode} saves you $${fields.discount}`
              : "Our team will contact you to confirm payment details"}
          </div>
        </div>
        <div className="as-rg-total-bar__amount">
          {fields.discount > 0 && pkg && (
            <span className="as-rg-total-bar__original">
              ${calculateTotal(fields.packageId, fields.companions, 0).toLocaleString()}
            </span>
          )}
          ${total.toLocaleString()}
        </div>
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
    <section className="as-rg-result as-rg-result--success">
      <div className="as-rg-result__card">
        <div className="as-rg-result__icon">✓</div>
        <h2 className="as-rg-result__title">You're <em>Registered!</em></h2>
        <p className="as-rg-result__sub">
          Welcome to Signature Global Conferences. Your application has been received.
          Our team will shortly contact you to confirm details.
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
          <button className="as-rg-btn-ghost" onClick={() => window.location.href = "/asiaevents"}>
            View Conferences
          </button>
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
        <h2 className="as-rg-result__title">Submission <em>Failed</em></h2>
        <p className="as-rg-result__sub">
          Something went wrong. Your details have been saved — please try again.
          If the issue persists, contact us directly.
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
    <div className="as-rg-form-card">
      <div className="as-rg-form-card__header">
        <StepIndicator currentStep={step} />
        <div className="as-rg-form-card__step">{meta.step}</div>
        <div className="as-rg-form-card__title">{meta.title}</div>
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

      <div className="as-rg-form-footer">
        <div className="as-rg-form-footer__actions">
          {step > 1 && (
            <button className="as-rg-back-btn" onClick={goBack}>← Back</button>
          )}
          {step < 3 ? (
            <button className="as-rg-submit-btn" onClick={goNext}>Continue →</button>
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
   ROOT — scoped under .as-page .as-register-page
   ═══════════════════════════════════════════════════════════ */
export default function AsiaRegister() {
  const [status,        setStatus] = useState("form");
  const [submittedData, setData]   = useState(null);
  const allConferences              = useMemo(() => getConferencesForRegion("all"), []);

  const handleSuccess = (data) => { setData(data);  setStatus("success"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleFail    = ()     => {                  setStatus("fail");    window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleReset   = ()     => { setData(null);   setStatus("form");   };
  const handleRetry   = ()     => {                  setStatus("form");   };

  return (
    <div className="as-page as-register-page">
      <Navbar />

      {status === "success" && (
        <SuccessScreen fields={submittedData} allConferences={allConferences} onReset={handleReset} />
      )}
      {status === "fail" && <FailScreen onRetry={handleRetry} />}
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