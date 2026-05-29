import { useState, useMemo, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { Navbar } from "../Landingpage/homepage.jsx";
import { allCountries } from "country-telephone-data";
// import Footer from "../../Components/Footer/footer.jsx";
import "./register.css";
import "../Home/homepage.css";

import {
  REGIONS,
  INITIAL_FORM,
  STEP_META,
  validateStep1,
  validateStep2,
  calculateTotal,
  submitRegistration,
  applyCoupon,
  fetchAllConferences,
  fetchAllPackages,
  fetchCompanionPrice,
  fetchExtraNightPrice,
  filterConferencesByRegion,
} from "./registerdata.jsx";

/* ── Country Data ── */
const COUNTRY_LIST = (() => {
  const seen = new Set();
  const mapped = allCountries.map((c) => ({ name: c.name, code: `+${c.dialCode}`, dialCode: c.dialCode, iso: c.iso2 }));
  const us = mapped.find((c) => c.iso === "us");
  const rest = mapped.filter((c) => { const k = `${c.name}-${c.dialCode}`; if (seen.has(k)) return false; seen.add(k); return c.iso !== "us"; });
  return us ? [us, ...rest] : rest;
})();
const DEFAULT_COUNTRY = COUNTRY_LIST[0];

/* ── Country Dropdown ── */
function CountryDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const selected = COUNTRY_LIST.find((c) => c.code === value) || DEFAULT_COUNTRY;
  const filtered = query.trim()
    ? COUNTRY_LIST.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.code.includes(query))
    : COUNTRY_LIST;

  useEffect(() => {
    const h = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) { setOpen(false); setQuery(""); } };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const toggle = () => { setOpen((o) => !o); if (!open) setTimeout(() => inputRef.current?.focus(), 50); };
  const pick   = (c) => { onChange(c.code); setOpen(false); setQuery(""); };

  return (
    <div className="rh-cd" ref={wrapRef}>
      <div className={`rh-cd__trigger${open ? " open" : ""}`} onClick={toggle}
        role="button" tabIndex={0} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle()} aria-expanded={open}>
        {open
          ? <input ref={inputRef} className="rh-cd__search" value={query}
              onChange={(e) => setQuery(e.target.value)} placeholder="Search…"
              autoComplete="off" onClick={(e) => e.stopPropagation()} />
          : <span className="rh-cd__selected">
              <span className="rh-cd__code">{selected.code}</span>
              <span className="rh-cd__name">{selected.name}</span>
            </span>
        }
        <svg className={`rh-cd__chevron${open ? " up" : ""}`} viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {open && (
        <div className="rh-cd__list" role="listbox">
          {filtered.length === 0
            ? <div className="rh-cd__empty">No results</div>
            : filtered.map((c) => (
                <div key={`${c.iso}-${c.dialCode}`}
                  className={`rh-cd__option${c.code === value ? " active" : ""}`}
                  onMouseDown={(e) => { e.preventDefault(); pick(c); }}
                  role="option" aria-selected={c.code === value}>
                  <span className="rh-cd__option-code">{c.code}</span>
                  <span className="rh-cd__option-name">{c.name}</span>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}

/* ── Field ── */
function Field({ label, required, error, full, children }) {
  return (
    <div className={`rh-field${full ? " full" : ""}`}>
      <label className="rh-label">{label}{required && <span aria-hidden="true"> *</span>}</label>
      {children}
      {error && <span className="rh-err" role="alert">{error}</span>}
    </div>
  );
}

/* ── Step Indicator ── */
function StepIndicator({ currentStep }) {
  return (
    <div className="rh-steps" role="navigation">
      {[{ n: 1, l: "Personal" }, { n: 2, l: "Package" }, { n: 3, l: "Confirm" }].map((s, i) => (
        <div key={s.n} className="rh-steps__item">
          <div className={`rh-steps__dot${currentStep > s.n ? " done" : currentStep === s.n ? " active" : ""}`}>
            {currentStep > s.n
              ? <svg viewBox="0 0 12 10" fill="none" width="12" height="10"><path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              : s.n}
          </div>
          <span className={`rh-steps__lbl${currentStep === s.n ? " active" : ""}`}>{s.l}</span>
          {i < 2 && <div className={`rh-steps__line${currentStep > s.n ? " done" : ""}`} aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="rh-hero">
      <div className="rh-hero__glow" aria-hidden="true" />
      <div className="rh-hero__dots"  aria-hidden="true" />
      <div className="rh-hero__content">
        <span className="rh-hero__tag">Speaker Registration 2026 / 2027</span>
        <h1 className="rh-hero__title">Claim Your <em>Global Stage</em></h1>

        <p className="rh-hero__sub">Register now to secure your speaking slot at one of our world-class conferences. Limited seats available.</p>
              <p className="rh-hero__sub">sponsered by NAVA KUMAR BHAI ltd Limited seats available.</p>

      </div>
    </section>
  );
}

/* ── Price Bar ── */
function PriceBar({ pkg, companions, extraNights = 0, isVirtual, total, discount, couponCode, label, companionPrice, extraNightPrice }) {
  const parts = [
    pkg ? `${pkg.name}  $${pkg.price.toLocaleString()}` : "Select a package to see pricing",
    companions > 0 && !isVirtual  ? ` + ${companions} companion${companions > 1 ? "s" : ""}  $${companions * companionPrice}` : "",
    extraNights > 0 && !isVirtual ? ` + ${extraNights} extra night${extraNights > 1 ? "s" : ""}  $${extraNights * extraNightPrice}` : "",
    discount > 0 && couponCode    ? `  ·  Coupon ${couponCode} −$${discount}` : "",
  ].join("");

  return (
    <div className="rh-pricebar">
      <div>
        <div className="rh-pricebar__label">{label}</div>
        <div className="rh-pricebar__breakdown">{parts}</div>
      </div>
      <div className="rh-pricebar__amount">${total.toLocaleString()}</div>
    </div>
  );
}

/* ── Step 1 — Personal + Region + Conference ── */
function Step1({ fields, errors, set, setField, allConferences }) {
  const conferences = useMemo(
    () => filterConferencesByRegion(allConferences, fields.regionId),
    [allConferences, fields.regionId]
  );

  const handleRegionChange = (e) => {
    setField("regionId",     e.target.value);
    setField("conferenceId", "");
  };

  return (
    <div className="rh-body">
      <div className="rh-divider">Personal Information</div>

      <div className="rh-row">
        <Field label="First Name" required error={errors.firstName}>
          <input value={fields.firstName} onChange={set("firstName")}
            className={`rh-input${errors.firstName ? " err" : ""}`} placeholder="Jane" autoComplete="given-name" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input value={fields.lastName} onChange={set("lastName")}
            className={`rh-input${errors.lastName ? " err" : ""}`} placeholder="Smith" autoComplete="family-name" />
        </Field>
      </div>

      <div className="rh-row">
        <Field label="Email Address" required error={errors.email}>
          <input value={fields.email} onChange={set("email")} type="email"
            className={`rh-input${errors.email ? " err" : ""}`} placeholder="jane@example.com" autoComplete="email" />
        </Field>
        <Field label="Phone Number" required error={errors.phone}>
          <div className="rh-phone">
            <CountryDropdown value={fields.countryCode} onChange={(code) => setField("countryCode", code)} />
            <input value={fields.phone} onChange={set("phone")} type="tel"
              className={`rh-input${errors.phone ? " err" : ""}`} placeholder="Phone number" autoComplete="tel-national" />
          </div>
        </Field>
      </div>

      <div className="rh-row">
        <Field label="Country" required error={errors.country}>
          <input value={fields.country} onChange={set("country")}
            className={`rh-input${errors.country ? " err" : ""}`} placeholder="United States" autoComplete="country-name" />
        </Field>
        <Field label="Organization">
          <input value={fields.organization} onChange={set("organization")}
            className="rh-input" placeholder="Company / Brand" autoComplete="organization" />
        </Field>
      </div>

      <div className="rh-row">
        <Field label="Job Title / Role">
          <input value={fields.jobTitle} onChange={set("jobTitle")}
            className="rh-input" placeholder="CEO, Coach, Author…" autoComplete="organization-title" />
        </Field>
      </div>

      <div className="rh-divider">Conference Selection</div>

      <div className="rh-row">
        <Field label="Region" required error={errors.regionId}>
          <div className="rh-select-wrap">
            <select value={fields.regionId} onChange={handleRegionChange}
              className={`rh-select${errors.regionId ? " err" : ""}`} aria-required="true">
              <option value="">— Select a region —</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.flag}  {r.label}</option>
              ))}
            </select>
          </div>
        </Field>

        <Field label="Conference" required error={errors.conferenceId}>
          <div className="rh-select-wrap">
            <select value={fields.conferenceId} onChange={set("conferenceId")}
              className={`rh-select${errors.conferenceId ? " err" : ""}${!fields.regionId ? " disabled" : ""}`}
              disabled={!fields.regionId} aria-required="true">
              <option value="">
                {fields.regionId ? "— Choose a conference —" : "— Select region first —"}
              </option>
              {conferences.map((c) => (
                <option key={c.id} value={String(c.id)}>{c.title} · {c.location} · {c.date}</option>
              ))}
            </select>
          </div>
        </Field>
      </div>
    </div>
  );
}

/* ── Step 2 — Speaker Type + Package + Extras ── */
function Step2({ fields, errors, setField, allPackages, companionPrice, extraNightPrice }) {
  const isVirtual   = fields.speakerType === "virtual";
  const activePkgs  = allPackages.filter((p) => p.type === (isVirtual ? "virtual" : "physical"));
  const selectedPkg = allPackages.find((p) => p.id === fields.packageId);
  const total       = calculateTotal(fields.packageId, fields.companions, fields.discount || 0, fields.extraNights || 0, allPackages, companionPrice, extraNightPrice);

  const switchType = (type) => { setField("speakerType", type); setField("packageId", ""); setField("extraNights", 0); };

  return (
    <div className="rh-body">
      <div className="rh-divider">Participation Type</div>
      {errors.speakerType && <span className="rh-err rh-err--block" role="alert">{errors.speakerType}</span>}

      <div className="rh-type-grid" role="radiogroup" aria-label="Participation type">
        {[{ type: "physical", icon: "🎤", label: "Physical Speaker", sub: "In-person at venue" },
          { type: "virtual",  icon: "💻", label: "Virtual Speaker",  sub: "Present via Zoom / Airmeet" }
        ].map(({ type, icon, label, sub }) => (
          <button key={type} type="button"
            className={`rh-type-btn${fields.speakerType === type ? ` active${type === "virtual" ? " virtual" : ""}` : ""}`}
            onClick={() => switchType(type)} role="radio" aria-checked={fields.speakerType === type}>
            <span className="rh-type-btn__icon" aria-hidden="true">{icon}</span>
            <span className="rh-type-btn__label">{label}</span>
            <span className="rh-type-btn__sub">{sub}</span>
          </button>
        ))}
      </div>

      {fields.speakerType && (
        <>
          <div className="rh-divider">Choose Your Package</div>
          {errors.packageId && <span className="rh-err rh-err--block" role="alert">{errors.packageId}</span>}
          <div className="rh-pkg-grid" role="radiogroup" aria-label="Package options">
            {activePkgs.map((pkg) => (
              <div key={pkg.id}
                className={`rh-pkg${fields.packageId === pkg.id ? " active" : ""}`}
                onClick={() => setField("packageId", pkg.id)}
                role="radio" aria-checked={fields.packageId === pkg.id}
                tabIndex={0} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setField("packageId", pkg.id)}>
                <div className="rh-pkg__radio" aria-hidden="true">{fields.packageId === pkg.id && "✓"}</div>
                {pkg.badge && <div className="rh-pkg__badge">{pkg.badge}</div>}
                <div className="rh-pkg__head">
                  <div className="rh-pkg__icon" aria-hidden="true">{pkg.icon}</div>
                  <div className="rh-pkg__name">{pkg.name}</div>
                  <div className="rh-pkg__price">${pkg.price.toLocaleString()}</div>
                </div>
                <ul className="rh-pkg__list" aria-label={`${pkg.name} benefits`}>
                  {(pkg.benefits || []).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}

      {fields.speakerType === "physical" && (
        <>
          <div className="rh-divider">Extras</div>
          {[{ icon: "👥", title: "Accompanying Person(s)", sub: `$${companionPrice} each`, key: "companions" },
            { icon: "🌙", title: "Extra Night(s)",          sub: `$${extraNightPrice} each`, key: "extraNights" }
          ].map(({ icon, title, sub, key }) => (
            <div key={key} className="rh-extra">
              <div className="rh-extra__info">
                <div className="rh-extra__title"><span aria-hidden="true">{icon}</span> {title}</div>
                <div className="rh-extra__sub">{sub}</div>
              </div>
              <div className="rh-counter" role="group" aria-label={`Number of ${key}`}>
                <button className="rh-counter__btn" type="button" aria-label={`Decrease ${key}`}
                  disabled={(fields[key] || 0) === 0}
                  onClick={() => setField(key, Math.max(0, (fields[key] || 0) - 1))}>−</button>
                <span className="rh-counter__val" aria-live="polite">{fields[key] || 0}</span>
                <button className="rh-counter__btn" type="button" aria-label={`Increase ${key}`}
                  onClick={() => setField(key, (fields[key] || 0) + 1)}>+</button>
              </div>
            </div>
          ))}
        </>
      )}

      <PriceBar pkg={selectedPkg} companions={fields.companions} extraNights={fields.extraNights || 0}
        isVirtual={isVirtual} total={total} discount={fields.discount} couponCode={fields.couponCode}
        label="Estimated Total" companionPrice={companionPrice} extraNightPrice={extraNightPrice} />
    </div>
  );
}

/* ── Coupon Widget ── */
function CouponWidget({ couponCode, discount, onApply, onRemove }) {
  const [input,  setInput]  = useState(couponCode || "");
  const [status, setStatus] = useState(discount > 0 ? "applied" : "idle");
  const [shake,  setShake]  = useState(false);
  const [loading, setLoad]  = useState(false);

  const handleApply = async () => {
    if (!input.trim()) return;
    setLoad(true);
    try {
      const r = await applyCoupon(input);
      if (r.valid) { onApply(r.code, r.discount); setStatus("applied"); }
      else { setStatus("error"); setShake(true); setTimeout(() => setShake(false), 500); }
    } finally { setLoad(false); }
  };

  return (
    <div className="rh-coupon">
      <div className="rh-coupon__label">🏷 Have a Coupon Code?</div>
      {status === "applied" ? (
        <div className="rh-coupon__applied" role="status" aria-live="polite">
          <span>🎉 <strong>{couponCode}</strong> — ${discount} off applied</span>
          <button type="button" className="rh-coupon__remove"
            onClick={() => { setInput(""); setStatus("idle"); onRemove(); }}>Remove</button>
        </div>
      ) : (
        <div className={`rh-coupon__row${shake ? " shake" : ""}`}>
          <input value={input} onChange={(e) => { setInput(e.target.value.toUpperCase()); setStatus("idle"); }}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            className={`rh-input rh-coupon__input${status === "error" ? " err" : ""}`}
            placeholder="ENTER CODE" maxLength={20} aria-label="Coupon code" />
          <button type="button" className="rh-coupon__btn" onClick={handleApply} disabled={!input.trim() || loading}>
            {loading ? "…" : "Apply"}
          </button>
        </div>
      )}
      {status === "error" && <span className="rh-err" role="alert" style={{ marginTop: 6, display: "block" }}>Invalid coupon code. Please try again.</span>}

    </div>
  );
}

/* ── Step 3 — Review & Confirm ── */
function Step3({ fields, allConferences, allPackages, companionPrice, extraNightPrice, onEdit, setField }) {
  const conf        = allConferences.find((c) => String(c.id) === fields.conferenceId);
  const pkg         = allPackages.find((p) => p.id === fields.packageId);
  const isVirtual   = fields.speakerType === "virtual";
  const regionLabel = REGIONS.find((r) => r.id === fields.regionId)?.label || "—";
  const total       = calculateTotal(fields.packageId, fields.companions, fields.discount || 0, fields.extraNights || 0, allPackages, companionPrice, extraNightPrice);
  const origTotal   = calculateTotal(fields.packageId, fields.companions, 0, fields.extraNights || 0, allPackages, companionPrice, extraNightPrice);

  const Sec = ({ title, step, children }) => (
    <div className="rh-rev-sec">
      <div className="rh-rev-sec__head">
        <span className="rh-rev-sec__title">{title}</span>
        <button className="rh-edit-btn" onClick={() => onEdit(step)} type="button" aria-label={`Edit ${title}`}>Edit</button>
      </div>
      {children}
    </div>
  );

  const Row = ({ label, value, full }) => (
    <div className={`rh-rev-row${full ? " full" : ""}`}>
      <span className="rh-rev-label">{label}</span>
      <span className="rh-rev-value">{value}</span>
    </div>
  );

  return (
    <div className="rh-body">
      <Sec title="Personal Details" step={1}>
        <div className="rh-rev-grid">
          {[
            ["Full Name",    `${fields.firstName} ${fields.lastName}`],
            ["Email",        fields.email],
            ["Phone",        `${fields.countryCode} ${fields.phone}`],
            ["Country",      fields.country],
            ...(fields.organization ? [["Organization", fields.organization]] : []),
            ...(fields.jobTitle     ? [["Job Title",    fields.jobTitle]]     : []),
          ].map(([l, v]) => <Row key={l} label={l} value={v} />)}
        </div>
      </Sec>

      <Sec title="Conference" step={1}>
        <div className="rh-rev-grid">
          <Row label="Region"     value={regionLabel} />
          <Row label="Conference" value={conf ? `${conf.title} · ${conf.location} · ${conf.date}` : "—"} full />
        </div>
      </Sec>

      <Sec title="Package & Extras" step={2}>
        <div className="rh-rev-grid" style={{ marginBottom: 12 }}>
          <Row label="Participation" value={<span style={{ textTransform: "capitalize" }}>{fields.speakerType || "—"}</span>} />
        </div>
        {pkg && (
          <div className="rh-rev-pkg">
            <span className="rh-rev-pkg__icon" aria-hidden="true">{pkg.icon}</span>
            <span className="rh-rev-pkg__name">{pkg.name}</span>
            <span className="rh-rev-pkg__price">${pkg.price.toLocaleString()}</span>
          </div>
        )}
        {!isVirtual && (
          <div className="rh-rev-grid" style={{ marginTop: 12 }}>
            <Row label="Companions"
              value={fields.companions === 0 ? "None" : `${fields.companions} person${fields.companions > 1 ? "s" : ""} (+$${fields.companions * companionPrice})`} />
            <Row label="Extra Nights"
              value={(fields.extraNights || 0) === 0 ? "None" : `${fields.extraNights} night${fields.extraNights > 1 ? "s" : ""} (+$${fields.extraNights * extraNightPrice})`} />
          </div>
        )}
      </Sec>

      <CouponWidget
        couponCode={fields.couponCode} discount={fields.discount}
        onApply={(code, disc) => { setField("couponCode", code); setField("discount", disc); }}
        onRemove={() => { setField("couponCode", ""); setField("discount", 0); }} />

      <div className="rh-pricebar">
        <div>
          <div className="rh-pricebar__label">Total Amount Due</div>
          <div className="rh-pricebar__breakdown">
            {fields.discount > 0
              ? `Coupon "${fields.couponCode}" saves you $${fields.discount}`
              : "Our team will contact you to confirm payment details"}
          </div>
        </div>
        <div className="rh-pricebar__amount">
          {fields.discount > 0 && <span className="rh-pricebar__orig">${origTotal.toLocaleString()}</span>}
          <span>${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Success Screen ── */
function SuccessScreen({ fields, allConferences, allPackages, companionPrice, extraNightPrice, onReset }) {
  const conf      = allConferences.find((c) => String(c.id) === fields.conferenceId);
  const pkg       = allPackages.find((p) => p.id === fields.packageId);
  const isVirtual = fields.speakerType === "virtual";
  const total     = calculateTotal(fields.packageId, fields.companions, fields.discount || 0, fields.extraNights || 0, allPackages, companionPrice, extraNightPrice);

  const rows = [
    ["Name",         `${fields.firstName} ${fields.lastName}`],
    ["Email",        fields.email],
    ["Phone",        `${fields.countryCode} ${fields.phone}`],
    ["Region",       REGIONS.find((r) => r.id === fields.regionId)?.label || "—"],
    ["Conference",   conf ? `${conf.title} · ${conf.location}` : "—"],
    ["Date",         conf?.date || "—"],
    ["Type",         fields.speakerType ? fields.speakerType.charAt(0).toUpperCase() + fields.speakerType.slice(1) : "—"],
    ["Package",      pkg ? `${pkg.name} — $${pkg.price.toLocaleString()}` : "—"],
    ["Companions",   isVirtual ? "N/A" : fields.companions > 0 ? `${fields.companions} person(s) (+$${fields.companions * companionPrice})` : "None"],
    ["Extra Nights", isVirtual ? "N/A" : (fields.extraNights || 0) > 0 ? `${fields.extraNights} night(s) (+$${fields.extraNights * extraNightPrice})` : "None"],
    ...(fields.discount > 0 ? [["Discount", `-$${fields.discount} (${fields.couponCode})`]] : []),
    ["Total",        `$${total.toLocaleString()}`],
  ];

  return (
    <section className="rh-result rh-result--success" role="main" aria-label="Registration successful">
      <div className="rh-result__card">
        <div className="rh-result__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
            <path d="M4 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="rh-result__title">You're <em>Registered!</em></h2>
        <p className="rh-result__sub">Welcome to Signature Global Conferences. Our team will shortly contact you to confirm details.</p>
        <div className="rh-email-notice" aria-label="Email confirmation">
          <span aria-hidden="true">📧</span>
          <div>
            <strong>Confirmation Email Sent</strong><br />
            A confirmation has been sent to <strong>{fields.email}</strong>. Check your inbox and spam folder.
          </div>
        </div>
        <div className="rh-result__summary" role="list" aria-label="Registration summary">
          {rows.map(([l, v]) => (
            <div key={l} className="rh-result__row" role="listitem">
              <span className="rh-result__row-label">{l}</span>
              <span className="rh-result__row-value">{v}</span>
            </div>
          ))}
        </div>
        <div className="rh-result__actions">
          <button className="rh-btn-primary" onClick={onReset}>Register Another</button>
          <button className="rh-btn-ghost">View Conferences</button>
        </div>
      </div>
    </section>
  );
}

/* ── Fail Screen ── */
function FailScreen({ onRetry }) {
  return (
    <section className="rh-result rh-result--fail" role="main" aria-label="Registration failed">
      <div className="rh-result__card">
        <div className="rh-result__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="rh-result__title">Submission <em>Failed</em></h2>
        <p className="rh-result__sub">Something went wrong. Please try again or contact us directly.</p>
        <div className="rh-result__actions">
          <button className="rh-btn-primary" onClick={onRetry}>Try Again</button>
          <button className="rh-btn-ghost">Contact Support</button>
        </div>
      </div>
    </section>
  );
}

/* ── Main Form ── */
function RegistrationForm({ onSuccess, onFail, allConferences, allPackages, companionPrice, extraNightPrice, preselectedConferenceId }) {
  const [fields, setFields] = useState({ ...INITIAL_FORM, countryCode: DEFAULT_COUNTRY.code });

  // Pre-fill region + conference when navigated from an event page
  useEffect(() => {
    if (preselectedConferenceId && allConferences.length > 0) {
      const selectedConf = allConferences.find((c) => String(c.id) === String(preselectedConferenceId));
      if (selectedConf) {
        setFields((prev) => ({
          ...prev,
          regionId:     selectedConf.region,
          conferenceId: String(preselectedConferenceId),
        }));
      }
    }
  }, [preselectedConferenceId, allConferences]);
  const [errors, setErrors] = useState({});
  const [step,   setStep]   = useState(1);
  const [submitting, setSub] = useState(false);

  const set      = (key) => (e) => setFields((p) => ({ ...p, [key]: e.target.value }));
  const setField = (key, val) => setFields((p) => ({ ...p, [key]: val }));
  const top      = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goNext = () => {
    const errs = step === 1 ? validateStep1(fields) : validateStep2(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setStep((s) => s + 1); top();
  };
  const goBack   = () => { setErrors({}); setStep((s) => s - 1); top(); };
  const goToStep = (n) => { setErrors({}); setStep(n); top(); };

  const handleSubmit = async () => {
    setSub(true);
    try {
      await submitRegistration(fields, allConferences, allPackages, companionPrice, extraNightPrice, "home");
      onSuccess(fields);
    } catch { onFail(); }
    finally { setSub(false); }
  };

  const meta = STEP_META[step];

  return (
    <div className="rh-card">
      <div className="rh-card__header">
        <StepIndicator currentStep={step} />
        <div className="rh-card__step">{meta.step}</div>
        <div className="rh-card__title">{meta.title}</div>
      </div>

      {step === 1 && <Step1 fields={fields} errors={errors} set={set} setField={setField} allConferences={allConferences} />}
      {step === 2 && <Step2 fields={fields} errors={errors} setField={setField} allPackages={allPackages} companionPrice={companionPrice} extraNightPrice={extraNightPrice} />}
      {step === 3 && <Step3 fields={fields} allConferences={allConferences} allPackages={allPackages} companionPrice={companionPrice} extraNightPrice={extraNightPrice} onEdit={goToStep} setField={setField} />}

      <div className="rh-card__footer">
        <div className="rh-card__actions">
          {step > 1 && <button className="rh-back-btn" onClick={goBack} type="button" aria-label="Go back">← Back</button>}
          {step < 3
            ? <button className="rh-submit-btn" onClick={goNext} type="button">Continue →</button>
            : <button className="rh-submit-btn" onClick={handleSubmit} disabled={submitting} type="button" aria-busy={submitting}>
                {submitting ? <><span className="rh-spinner" aria-hidden="true" /> Submitting…</> : "Complete Registration →"}
              </button>}
        </div>
        <p className="rh-note">
          By registering you agree to our <a href="#" className="rh-note__link">Terms &amp; Conditions</a>. Your data will only be used for conference coordination.
        </p>
      </div>
    </div>
  );
}

/* ── Root Page ── */
export default function RegisterHome() {
  const location = useLocation();
  const preselectedConferenceId = location.state?.conferenceId || null;
  const [status,  setStatus]           = useState("form");
  const [submitted, setData]           = useState(null);
  const [allConferences, setConfs]     = useState([]);
  const [allPackages,    setPkgs]      = useState([]);
  const [companionPrice, setCompPrice] = useState(199);
  const [extraNightPrice, setNightP]   = useState(149);
  const [loading, setLoading]          = useState(true);

  useEffect(() => {
    Promise.all([fetchAllConferences(), fetchAllPackages(), fetchCompanionPrice(), fetchExtraNightPrice()])
      .then(([c, p, cp, enp]) => { setConfs(c); setPkgs(p); setCompPrice(cp); setNightP(enp); })
      .catch((e) => console.error("Failed to load data:", e))
      .finally(() => setLoading(false));
  }, []);

  const handleSuccess = (data) => { setData(data); setStatus("success"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleFail    = ()     => { setStatus("fail"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleReset   = ()     => { setData(null); setStatus("form"); };

  return (
    <div className="main-page rh-page">
      {status === "success" && (
        <SuccessScreen fields={submitted} allConferences={allConferences} allPackages={allPackages}
          companionPrice={companionPrice} extraNightPrice={extraNightPrice} onReset={handleReset} />
      )}
      {status === "fail" && <FailScreen onRetry={() => setStatus("form")} />}
      {status === "form" && (
        <>
          <Hero />
          <section className="rh-section">
            <div className="rh-section__inner">
              {loading ? (
                <div className="rh-loading">
                  <span className="rh-spinner" aria-hidden="true" />
                  <span>Loading registration details…</span>
                </div>
              ) : (
                <RegistrationForm onSuccess={handleSuccess} onFail={handleFail}
                  allConferences={allConferences} allPackages={allPackages}
                  companionPrice={companionPrice} extraNightPrice={extraNightPrice}
                  preselectedConferenceId={preselectedConferenceId} />
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}