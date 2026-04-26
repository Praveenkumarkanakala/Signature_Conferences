import { useState, useRef, useEffect } from "react";
import { Navbar } from "../Home/asia.jsx";
import { allCountries } from "country-telephone-data";
import { submitToSheets } from "../utils/formSubmit.js";
import Footer from "../../../Components/Footer/footer";
import "./contact.css";
import "../Home/asia.css";

/* ── Country data ── */
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.21 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-.53a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    title: "Feedback & Suggestions",
    body: "We value your feedback and are continuously working to improve. Your input shapes our future.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: "Media Inquiries",
    body: "For media-related questions or press inquiries, please contact us at media@signatureglobal.com.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
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

  const handleSelect = (country) => {
    onChange(country.code);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="as-ct-country-dropdown" ref={wrapRef}>
      <div
        className={`as-ct-country-trigger${open ? " as-ct-country-trigger--open" : ""}`}
        onClick={() => {
          setOpen((o) => !o);
          if (!open) setTimeout(() => inputRef.current?.focus(), 50);
        }}
      >
        {open ? (
          <input
            ref={inputRef}
            className="as-ct-country-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Search country…"
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="as-ct-country-selected">
            <span className="as-ct-country-code">{selected.code}</span>
            <span className="as-ct-country-name">{selected.name}</span>
          </span>
        )}
        <svg
          className={`as-ct-country-chevron${open ? " as-ct-country-chevron--up" : ""}`}
          viewBox="0 0 10 6"
          fill="none"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {open && (
        <div className="as-ct-country-list">
          {filtered.length === 0 ? (
            <div className="as-ct-country-empty">No countries found</div>
          ) : (
            filtered.map((country) => (
              <div
                key={`${country.iso}-${country.dialCode}`}
                className={`as-ct-country-option${country.code === value ? " as-ct-country-option--active" : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(country);
                }}
              >
                <span className="as-ct-country-option__code">{country.code}</span>
                <span className="as-ct-country-option__name">{country.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main Contact Page ────────────────────────── */
export default function AsiaContact() {
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
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await submitToSheets({ formType: "contact", ...form });
      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: DEFAULT_COUNTRY.code,
      phone: "",
      message: "",
    });
  };

  return (
    <div className="as-page">
      <Navbar />

      <main className="as-ct-page">
        {/* Decorative blobs */}
        <div className="as-ct-blob as-ct-blob--1" />
        <div className="as-ct-blob as-ct-blob--2" />
        <div className="as-ct-blob as-ct-blob--3" />

        <div className="as-ct-inner">
          {/* ── LEFT COLUMN ── */}
          <div className="as-ct-left">
            <div className="as-ct-eyebrow">
              <span className="as-ct-eyebrow__dash" />
              <span className="as-ct-eyebrow__label">Get in Touch</span>
            </div>

            <h1 className="as-ct-heading">Contact Us</h1>

            <p className="as-ct-desc">
              Email, call, or complete the form to learn how Signature Global
              Conferences can help you reach a world-class audience.
            </p>

            <div className="as-ct-contact-links">
              <a href="mailto:info@signatureglobal.com" className="as-ct-link">
                <svg viewBox="0 0 20 20" fill="none" className="as-ct-link__icon">
                  <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                info@signatureglobal.com
              </a>
              <a href="tel:+1234567890" className="as-ct-link">
                <svg viewBox="0 0 24 24" fill="none" className="as-ct-link__icon">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.21 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-.53a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                +1 234 567 890
              </a>
              <a href="#" className="as-ct-link as-ct-link--underline">
                <svg viewBox="0 0 24 24" fill="none" className="as-ct-link__icon">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                24/7 Customer Support
              </a>
            </div>

            {/* Info cards */}
            <div className="as-ct-info-cards">
              {INFO_CARDS.map((c) => (
                <div key={c.title} className="as-ct-info-card">
                  <div className="as-ct-info-card__icon">{c.icon}</div>
                  <div className="as-ct-info-card__title">{c.title}</div>
                  <p className="as-ct-info-card__body">{c.body}</p>
                </div>
              ))}
            </div>

            {/* Social strip */}
            <div className="as-ct-social">
              <span className="as-ct-social__label">Follow us</span>
              <div className="as-ct-social__links">
                {[
                  { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                  { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                  { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" },
                ].map(({ label, path }) => (
                  <a key={label} href="#" className="as-ct-social__link" aria-label={label}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — FORM CARD ── */}
          <div className="as-ct-right">
            <div className="as-ct-card">
              <div className="as-ct-card__bar" />

              {submitted ? (
                <div className="as-ct-card__success">
                  <div className="as-ct-card__success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="as-ct-card__success-title">Message Sent!</h2>
                  <p className="as-ct-card__success-sub">
                    Thank you for reaching out. Our team will be in touch with
                    you shortly.
                  </p>
                  <button className="as-ct-submit-btn" onClick={resetForm}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="as-ct-card__header">
                    <h2 className="as-ct-card__title">Send a Message</h2>
                    <p className="as-ct-card__sub">We typically respond within 24 hours</p>
                  </div>

                  <div className="as-ct-form">
                    {/* Name row */}
                    <div className="as-ct-row">
                      {["firstName", "lastName"].map((key) => (
                        <div className="as-ct-field" key={key}>
                          <label className="as-ct-label">
                            {key === "firstName" ? "First Name" : "Last Name"}
                          </label>
                          <input
                            value={form[key]}
                            onChange={set(key)}
                            className={`as-ct-input${errors[key] ? " as-ct-input--error" : ""}`}
                            placeholder={key === "firstName" ? "John" : "Doe"}
                          />
                          {errors[key] && (
                            <span className="as-ct-error">{errors[key]}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Email */}
                    <div className="as-ct-field">
                      <label className="as-ct-label">Email Address</label>
                      <div className="as-ct-input-icon-wrap">
                        <svg className="as-ct-input-icon" viewBox="0 0 20 20" fill="none">
                          <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <input
                          value={form.email}
                          onChange={set("email")}
                          type="email"
                          className={`as-ct-input as-ct-input--icon${errors.email ? " as-ct-input--error" : ""}`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <span className="as-ct-error">{errors.email}</span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="as-ct-field">
                      <label className="as-ct-label">Phone Number <span className="as-ct-label--opt">(optional)</span></label>
                      <div className="as-ct-phone-wrap">
                        <CountryDropdown
                          value={form.countryCode}
                          onChange={(code) =>
                            setForm((prev) => ({ ...prev, countryCode: code }))
                          }
                        />
                        <input
                          value={form.phone}
                          onChange={set("phone")}
                          className="as-ct-input as-ct-input--phone"
                          placeholder="Phone number"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="as-ct-field">
                      <label className="as-ct-label">Message</label>
                      <div className="as-ct-textarea-wrap">
                        <textarea
                          value={form.message}
                          onChange={(e) => {
                            if (e.target.value.length <= MAX_MSG) set("message")(e);
                          }}
                          className={`as-ct-textarea${errors.message ? " as-ct-input--error" : ""}`}
                          placeholder="How can we help you?"
                        />
                        <span className={`as-ct-char-count${form.message.length >= MAX_MSG ? " as-ct-char-count--max" : ""}`}>
                          {form.message.length}/{MAX_MSG}
                        </span>
                      </div>
                      {errors.message && (
                        <span className="as-ct-error">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      className="as-ct-submit-btn"
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="as-ct-spinner" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="as-ct-submit-icon">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="as-ct-terms">
                      By contacting us, you agree to our{" "}
                      <a href="/terms&conditions" className="as-ct-terms__link">Terms of service</a>{" "}
                      and{" "}
                      <a href="/policy" className="as-ct-terms__link">Privacy Policy</a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer theme="asia" />
    </div>
  );
}