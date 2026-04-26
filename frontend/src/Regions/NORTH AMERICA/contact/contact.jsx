import { useState, useRef, useEffect } from "react";
import { Navbar } from "../NAHome/Nahome";
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
  // Put India first
  const india = mapped.find((c) => c.iso === "in");
  const rest = mapped.filter((c) => {
    const key = `${c.name}-${c.dialCode}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return c.iso !== "in";
  });
  return india ? [india, ...rest] : rest;
})();

const DEFAULT_COUNTRY = COUNTRY_LIST[0]; // India

const INFO_CARDS = [
  {
    title: "Customer Support",
    body: "Our support team is available around the clock to address any concerns or queries you may have.",
  },
  {
    title: "Feedback and Suggestions",
    body: "We value your feedback and are continuously working to improve the experience. Your input shapes our future.",
  },
  {
    title: "Media Inquiries",
    body: "For media-related questions or press inquiries, please contact us at media@signatureglobal.com.",
  },
];

const MAX_MSG = 120;

/* ─── Custom Country Dropdown ─────────────────── */
function CountryDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Selected country object
  const selected =
    COUNTRY_LIST.find((c) => c.code === value) || DEFAULT_COUNTRY;

  // Filtered list
  const filtered = query.trim()
    ? COUNTRY_LIST.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.code.includes(query),
      )
    : COUNTRY_LIST;

  // Close on outside click
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

  const handleFocus = () => {
    setOpen(true);
    setQuery("");
  };

  return (
    <div className="na-contact-country-dropdown" ref={wrapRef}>
      {/* Trigger input */}
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
            onFocus={handleFocus}
            placeholder="Search country…"
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
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Dropdown list */}
      {open && (
        <div className="na-contact-country-list" ref={listRef}>
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
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
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
      <Navbar />
      <main className="na-contact-page">
        {/* ── Glow blobs ── */}
        <div className="na-contact-blob na-contact-blob--1" />
        <div className="na-contact-blob na-contact-blob--2" />

        <div className="na-contact-inner">
          {/* ── Left column ── */}
          <div className="na-contact-left">
            <span className="na-contact-tag">Get in Touch</span>
            <h1 className="na-contact-heading">Contact Us</h1>
            <p className="na-contact-desc">
              Email, call, or complete the form to learn how Signature Global
              Conferences can help you reach a world-class audience.
            </p>

            <div className="na-contact-links">
              <a href="mailto:info@signatureglobal.com" className="na-contact-link">
                info@signatureglobal.com
              </a>
              <a href="tel:+1234567890" className="na-contact-link">
                +1 234 567 890
              </a>
              <a href="#" className="na-contact-link na-contact-link--underline">
                Customer Support
              </a>
            </div>

            <div className="na-contact-info-cards">
              {INFO_CARDS.map((c) => (
                <div key={c.title} className="na-contact-info-card">
                  <div className="na-contact-info-card__title">{c.title}</div>
                  <p className="na-contact-info-card__body">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — form card ── */}
          <div className="na-contact-right">
            <div className="na-contact-card">
              <div className="na-contact-card__bar" />
              {submitted ? (
                <div className="na-contact-card__success">
                  <div className="na-contact-card__success-icon">✓</div>
                  <h2 className="na-contact-card__success-title">Message Sent!</h2>
                  <p className="na-contact-card__success-sub">
                    Thank you for reaching out. Our team will be in touch with
                    you shortly.
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
                        {errors.firstName && (
                          <span className="na-contact-error">{errors.firstName}</span>
                        )}
                      </div>
                      <div className="na-contact-field">
                        <input
                          value={form.lastName}
                          onChange={set("lastName")}
                          className={`na-contact-input${errors.lastName ? " na-contact-input--error" : ""}`}
                          placeholder="Last name"
                        />
                        {errors.lastName && (
                          <span className="na-contact-error">{errors.lastName}</span>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="na-contact-field">
                      <div className="na-contact-input-icon-wrap">
                        <svg
                          className="na-contact-input-icon"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <rect
                            x="2"
                            y="4"
                            width="16"
                            height="12"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M2 7l8 5 8-5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <input
                          value={form.email}
                          onChange={set("email")}
                          type="email"
                          className={`na-contact-input na-contact-input--icon${errors.email ? " na-contact-input--error" : ""}`}
                          placeholder="Your email"
                        />
                      </div>
                      {errors.email && (
                        <span className="na-contact-error">{errors.email}</span>
                      )}
                    </div>

                    {/* Phone — custom country dropdown */}
                    <div className="na-contact-field">
                      <div className="na-contact-phone-wrap">
                        <CountryDropdown
                          value={form.countryCode}
                          onChange={(code) =>
                            setForm((prev) => ({ ...prev, countryCode: code }))
                          }
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
                            if (e.target.value.length <= MAX_MSG)
                              set("message")(e);
                          }}
                          className={`na-contact-textarea${errors.message ? " na-contact-input--error" : ""}`}
                          placeholder="How can we help?"
                        />
                        <span className="na-contact-char-count">
                          {form.message.length}/{MAX_MSG}
                        </span>
                      </div>
                      {errors.message && (
                        <span className="na-contact-error">{errors.message}</span>
                      )}
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
                      <a href="/terms&conditions" className="na-contact-terms__link">  Terms of service </a>{" "}  and{" "}
                      <a href="/policy" className="na-contact-terms__link"> Privacy Policy  </a>
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