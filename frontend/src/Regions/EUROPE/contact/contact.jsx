import { useState, useRef, useEffect } from "react";
import { Navbar } from "../Landingpage/eurohome.jsx";
import { allCountries } from "country-telephone-data";
import Footer from "../../../Components/Footer/footer";
import { supabase } from "../../../lib/supabase.jsx";  // ← added


import "./contact.css";
import "../Landingpage/eurohome.css";

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
  },
  {
    title: "Feedback and Suggestions",
    body: "We value your feedback and are continuously working to improve the experience. Your input shapes our future.",
  },
  {
    title: "Media Inquiries",
    body: "For media-related questions or press inquiries, please contact us at europe@signaturetalks.org.",
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

  const handleFocus = () => {
    setOpen(true);
    setQuery("");
  };

  return (
    <div className="europe-country-dropdown" ref={wrapRef}>
      <div
        className={`europe-country-trigger${open ? " europe-country-trigger--open" : ""}`}
        onClick={() => {
          setOpen((o) => !o);
          if (!open) setTimeout(() => inputRef.current?.focus(), 50);
        }}
      >
        {open ? (
          <input
            ref={inputRef}
            className="europe-country-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            placeholder="Search country…"
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="europe-country-selected">
            <span className="europe-country-code">{selected.code}</span>
            <span className="europe-country-name">{selected.name}</span>
          </span>
        )}
        <svg
          className={`europe-country-chevron${open ? " europe-country-chevron--up" : ""}`}
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

      {open && (
        <div className="europe-country-list" ref={wrapRef}>
          {filtered.length === 0 ? (
            <div className="europe-country-empty">No countries found</div>
          ) : (
            filtered.map((country) => (
              <div
                key={`${country.iso}-${country.dialCode}`}
                className={`europe-country-option${country.code === value ? " europe-country-option--active" : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(country);
                }}
              >
                <span className="europe-country-option__code">{country.code}</span>
                <span className="europe-country-option__name">{country.name}</span>
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
      // 1. Save to Supabase
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert({
          first_name:   form.firstName,
          last_name:    form.lastName,
          email:        form.email,
          country_code: form.countryCode,
          phone:        form.phone || null,
          message:      form.message,
        });

      if (dbError) throw new Error(dbError.message);

      // 2. Trigger admin notification email (fire and forget)
      fetch(
        "https://tohlagjzvjoqrutolcwf.supabase.co/functions/v1/contact-notify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaGxhZ2p6dmpvcXJ1dG9sY3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMzM3MTUsImV4cCI6MjA5MzcwOTcxNX0.Xi1QPhzVjYYFfXNS8Z7mBdQHnEb42nsYXneTbo1lKzY",
          },
          body: JSON.stringify({
            first_name:   form.firstName,
            last_name:    form.lastName,
            email:        form.email,
            country_code: form.countryCode,
            phone:        form.phone || "",
            message:      form.message,
          }),
        }
      ).catch((err) => console.error("Email trigger error:", err));

      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="europe-page">
      <Navbar />
      <main className="europe-contact-page">
        <div className="europe-blob europe-blob--1" />
        <div className="europe-blob europe-blob--2" />

        <div className="europe-contact-inner">
          <div className="europe-contact-left">
            <span className="europe-contact-tag">Get in Touch</span>
            <h1 className="europe-contact-heading">Contact Us</h1>
            <p className="europe-contact-desc">
              Email, call, or complete the form to learn how Signature Global
              Conferences can help you reach a world-class audience.
            </p>

            <div className="europe-contact-links">
              <a href="mailto:europe@signaturetalks.org" className="europe-contact-link">
                europe@signaturetalks.org
              </a>
              <a href="tel:+1234567890" className="europe-contact-link">
                +1-202-571-5721
              </a>
              <a href="#" className="europe-contact-link europe-contact-link--underline">
                Customer Support
              </a>
            </div>

            <div className="europe-info-cards">
              {INFO_CARDS.map((c) => (
                <div key={c.title} className="europe-info-card">
                  <div className="europe-info-card__title">{c.title}</div>
                  <p className="europe-info-card__body">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="europe-contact-right">
            <div className="europe-contact-card">
              <div className="europe-contact-card__bar" />
              {submitted ? (
                <div className="europe-contact-card__success">
                  <div className="europe-contact-card__success-icon">✓</div>
                  <h2 className="europe-contact-card__success-title">Message Sent!</h2>
                  <p className="europe-contact-card__success-sub">
                    Thank you for reaching out. Our team will be in touch with
                    you shortly.
                  </p>
                  <button
                    className="europe-contact-submit-btn"
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
                  <div className="europe-contact-card__header">
                    <h2 className="europe-contact-card__title">Get in Touch</h2>
                    <p className="europe-contact-card__sub">You can reach us anytime</p>
                  </div>

                  <div className="europe-contact-form">
                    <div className="europe-contact-row">
                      <div className="europe-contact-field">
                        <input
                          value={form.firstName}
                          onChange={set("firstName")}
                          className={`europe-contact-input${errors.firstName ? " europe-contact-input--error" : ""}`}
                          placeholder="First name"
                        />
                        {errors.firstName && (
                          <span className="europe-contact-error">{errors.firstName}</span>
                        )}
                      </div>
                      <div className="europe-contact-field">
                        <input
                          value={form.lastName}
                          onChange={set("lastName")}
                          className={`europe-contact-input${errors.lastName ? " europe-contact-input--error" : ""}`}
                          placeholder="Last name"
                        />
                        {errors.lastName && (
                          <span className="europe-contact-error">{errors.lastName}</span>
                        )}
                      </div>
                    </div>

                    <div className="europe-contact-field">
                      <div className="europe-contact-input-icon-wrap">
                        <svg className="europe-contact-input-icon" viewBox="0 0 20 20" fill="none">
                          <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <input
                          value={form.email}
                          onChange={set("email")}
                          type="email"
                          className={`europe-contact-input europe-contact-input--icon${errors.email ? " europe-contact-input--error" : ""}`}
                          placeholder="Your email"
                        />
                      </div>
                      {errors.email && <span className="europe-contact-error">{errors.email}</span>}
                    </div>

                    <div className="europe-contact-field">
                      <div className="europe-contact-phone-wrap">
                        <CountryDropdown
                          value={form.countryCode}
                          onChange={(code) => setForm((prev) => ({ ...prev, countryCode: code }))}
                        />
                        <input
                          value={form.phone}
                          onChange={set("phone")}
                          className="europe-contact-input europe-contact-input--phone"
                          placeholder="Phone number"
                        />
                      </div>
                    </div>

                    <div className="europe-contact-field">
                      <div className="europe-contact-textarea-wrap">
                        <textarea
                          value={form.message}
                          onChange={(e) => {
                            if (e.target.value.length <= MAX_MSG) set("message")(e);
                          }}
                          className={`europe-contact-textarea${errors.message ? " europe-contact-input--error" : ""}`}
                          placeholder="How can we help?"
                        />
                        <span className="europe-contact-char-count">
                          {form.message.length}/{MAX_MSG}
                        </span>
                      </div>
                      {errors.message && <span className="europe-contact-error">{errors.message}</span>}
                    </div>

                    <button
                      className="europe-contact-submit-btn"
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? "Sending…" : "Submit"}
                    </button>

                    <p className="europe-contact-terms">
                      By contacting us, you agree to our{" "}
                      <a href="/terms&conditions" className="europe-contact-terms__link">Terms of service</a>{" "}
                      and{" "}
                      <a href="/policy" className="europe-contact-terms__link">Privacy Policy</a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer theme="europe" />
    </div>
  );
}