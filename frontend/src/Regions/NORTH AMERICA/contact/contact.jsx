import { useState, useRef, useEffect } from "react";
import { NaNavbar } from "../NAHome/Nahome";
import { allCountries } from "country-telephone-data";
import { submitToSheets } from "../utils/formSubmit.js";
import Footer from "../../../Components/Footer/footer";
import "./contact.css";

/* ── Country data — deduplicated by dialCode+name, default India first ── */
const COUNTRY_LIST = (() => {
  const seen = new Set();
  const mapped = allCountries.map((c) => ({
    name: c.name,
    code: `+${c.dialCode}`,
    dialCode: c.dialCode,
    iso: c.iso2,
  }));
  const india = mapped.find((c) => c.iso === "in");
  const rest = mapped.filter((c) => {
    const key = `${c.name}-${c.dialCode}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return c.iso !== "in";
  });
  return india ? [india, ...rest] : rest;
})();

const DEFAULT_COUNTRY = COUNTRY_LIST[0];

const INFO_CARDS = [
  {
    title: "Customer Support",
    body: "Our support team is available around the clock to address any concerns or queries you may have.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 9a3 3 0 016 0v1a3 3 0 01-6 0V9z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4.5 14.5C5.5 12.5 7.5 11 10 11s4.5 1.5 5.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Feedback and Suggestions",
    body: "We value your feedback and are continuously working to improve the experience. Your input shapes our future.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M17 10c0 3.866-3.134 7-7 7H4l-2 2V7c0-3.866 3.134-7 7-7s7 3.134 7 7h1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Media Inquiries",
    body: "For media-related questions or press inquiries, please contact us at canada@signaturetalks.org.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="2" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 8h16M6 2v3M14 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const MAX_MSG = 120;

/* ─── Custom Country Dropdown ─────────────────── */
function CountryDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const selected = COUNTRY_LIST.find((c) => c.code === value) || DEFAULT_COUNTRY;
  const filtered = query.trim()
    ? COUNTRY_LIST.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.code.includes(query),
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

  const handleSelect = (country) => {
    onChange(country.code);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="na-contact-country-dropdown" ref={wrapRef}>
      <div
        className={`na-contact-country-trigger${open ? " na-contact-country-trigger--open" : ""}`}
        onClick={() => {
          setOpen((o) => !o);
          if (!open) setTimeout(() => inputRef.current?.focus(), 50);
        }}
      >
        {open ? (
          <input
            ref={inputRef}
            className="na-contact-country-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="na-contact-country-selected">
            <span className="na-contact-country-code">{selected.code}</span>
            <span className="na-contact-country-name">{selected.name}</span>
          </span>
        )}
        <svg
          className={`na-contact-country-chevron${open ? " na-contact-country-chevron--up" : ""}`}
          viewBox="0 0 10 6"
          fill="none"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {open && (
        <div className="na-contact-country-list">
          {filtered.length === 0 ? (
            <div className="na-contact-country-empty">No countries found</div>
          ) : (
            filtered.map((country) => (
              <div
                key={`${country.iso}-${country.dialCode}`}
                className={`na-contact-country-option${country.code === value ? " na-contact-country-option--active" : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(country);
                }}
              >
                <span className="na-contact-country-option__code">{country.code}</span>
                <span className="na-contact-country-option__name">{country.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main Contact Page ────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: DEFAULT_COUNTRY.code,
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Required";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    try {
      await submitToSheets({
        formType: "contact",
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        countryCode: form.countryCode,
        phone: form.phone,
        message: form.message,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="na-page">
      <NaNavbar />
      <main className="na-contact-page">

        {/* ── Hero band (dark) ── */}
        <section className="na-contact-hero">
          <div className="na-contact-hero-inner">
            <span className="na-contact-tag">Get in Touch</span>
            <h1 className="na-contact-heading">
              Contact <span>Us</span>
            </h1>
            <p className="na-contact-hero-desc">
              Email, call, or complete the form to learn how Signature Global
              Conferences can help you reach a world-class audience.
            </p>

            <div className="na-contact-quicklinks">
              <a href="mailto:canada@signaturetalks.org" className="na-contact-quicklink">
                <span className="na-contact-quicklink-icon">
                  <svg viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </span>
                canada@signaturetalks.org
              </a>

              <div className="na-contact-ql-divider" />

              <a href="tel:+12025715721" className="na-contact-quicklink">
                <span className="na-contact-quicklink-icon">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M3 4a1 1 0 011-1h2.5a1 1 0 011 .75l.75 3a1 1 0 01-.27.96l-1.1 1.1a11 11 0 005.32 5.32l1.1-1.1a1 1 0 01.96-.27l3 .75a1 1 0 01.75 1V16a1 1 0 01-1 1C8.16 17 3 11.84 3 5V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </span>
                +1-202-571-5721
              </a>

              <div className="na-contact-ql-divider" />

              <a href="#" className="na-contact-quicklink">
                <span className="na-contact-quicklink-icon">
                  <svg viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                Customer Support
              </a>
            </div>
          </div>
        </section>

        {/* ── Body section (beige) ── */}
        <div className="na-contact-body">

          {/* Left column */}
          <div className="na-contact-left">

            <div>
              <p className="na-contact-section-label">How we can help</p>
              <div className="na-contact-info-cards">
                {INFO_CARDS.map((c) => (
                  <div key={c.title} className="na-contact-info-card">
                    <div className="na-contact-info-card__icon">{c.icon}</div>
                    <div className="na-contact-info-card__content">
                      <div className="na-contact-info-card__title">{c.title}</div>
                      <p className="na-contact-info-card__body">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="na-contact-section-label">Follow us</p>
              <div className="na-contact-social-row">
                {/* LinkedIn */}
                <a href="#" className="na-contact-social-btn" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                {/* Twitter/X */}
                <a href="#" className="na-contact-social-btn" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="na-contact-social-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" className="na-contact-social-btn" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Right column — form card */}
          <div className="na-contact-right">
            <div className="na-contact-card">
              <div className="na-contact-card__bar" />

              {submitted ? (
                <div className="na-contact-card__success">
                  <div className="na-contact-card__success-icon">✓</div>
                  <h2 className="na-contact-card__success-title">Message Sent!</h2>
                  <p className="na-contact-card__success-sub">
                    Thank you for reaching out. Our team will be in touch with you shortly.
                  </p>
                  <button
                    className="na-contact-submit-btn"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        firstName: "",
                        lastName: "",
                        email: "",
                        countryCode: DEFAULT_COUNTRY.code,
                        phone: "",
                        message: "",
                      });
                    }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <div className="na-contact-card__header">
                    <h2 className="na-contact-card__title">Get in Touch</h2>
                    <p className="na-contact-card__sub">You can reach us anytime</p>
                  </div>

                  <div className="na-contact-form">
                    {/* Name row */}
                    <div className="na-contact-row">
                      <div className="na-contact-field">
                        <input
                          value={form.firstName}
                          onChange={set("firstName")}
                          className={`na-contact-input${errors.firstName ? " na-contact-input--error" : ""}`}
                          placeholder="First name"
                        />
                        {errors.firstName && <span className="na-contact-error">{errors.firstName}</span>}
                      </div>
                      <div className="na-contact-field">
                        <input
                          value={form.lastName}
                          onChange={set("lastName")}
                          className={`na-contact-input${errors.lastName ? " na-contact-input--error" : ""}`}
                          placeholder="Last name"
                        />
                        {errors.lastName && <span className="na-contact-error">{errors.lastName}</span>}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="na-contact-field">
                      <div className="na-contact-input-icon-wrap">
                        <svg className="na-contact-input-icon" viewBox="0 0 20 20" fill="none">
                          <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        <input
                          value={form.email}
                          onChange={set("email")}
                          type="email"
                          className={`na-contact-input na-contact-input--icon${errors.email ? " na-contact-input--error" : ""}`}
                          placeholder="Your email"
                        />
                      </div>
                      {errors.email && <span className="na-contact-error">{errors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div className="na-contact-field">
                      <div className="na-contact-phone-wrap">
                        <CountryDropdown
                          value={form.countryCode}
                          onChange={(code) => setForm((prev) => ({ ...prev, countryCode: code }))}
                        />
                        <input
                          value={form.phone}
                          onChange={set("phone")}
                          className="na-contact-input na-contact-input--phone"
                          placeholder="Phone number"
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="na-contact-field">
                      <div className="na-contact-textarea-wrap">
                        <textarea
                          value={form.message}
                          onChange={(e) => {
                            if (e.target.value.length <= MAX_MSG) set("message")(e);
                          }}
                          className={`na-contact-textarea${errors.message ? " na-contact-input--error" : ""}`}
                          placeholder="How can we help?"
                        />
                        <span className="na-contact-char-count">{form.message.length}/{MAX_MSG}</span>
                      </div>
                      {errors.message && <span className="na-contact-error">{errors.message}</span>}
                    </div>

                    <button
                      className="na-contact-submit-btn"
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? "Sending…" : "Submit"}
                    </button>

                    <p className="na-contact-terms">
                      By contacting us, you agree to our{" "}
                      <a href="/terms&conditions" className="na-contact-terms__link">Terms of service</a>{" "}
                      and{" "}
                      <a href="/policy" className="na-contact-terms__link">Privacy Policy</a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer theme="northamerica" />
    </div>
  );
}