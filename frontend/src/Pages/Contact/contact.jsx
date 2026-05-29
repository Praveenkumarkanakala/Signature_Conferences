import { useState, useEffect, useRef } from "react";
import "./contact.css";
import { allCountries } from "country-telephone-data";
import { supabase } from "../../lib/supabase.jsx";
import {
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
  FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaWhatsapp
} from "react-icons/fa";

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

const MAX_MSG = 120;

const OFFICES = [
  {
    label: "Head Office", city: "Dover, USA",
    title: "Signature United Global Conferences",
    address: "8TH Green, Dover DE, United States 19901",
    mapQuery: "8TH+Green+Dover+DE+United+States+19901",
  },
  {
    label: "Regional Office", city: "Dubai, UAE",
    title: "BITS Pilani, Dubai Campus",
    address: "Dubai International Academic City, P.O. Box 345055, Dubai, UAE",
    mapQuery: "BITS+Pilani+Dubai+Campus",
  },
];

const CONTACT_ITEMS = [
  { icon: <FaPhone />,    label: "Phone",         value: "+1-202-571-5721",           color: "orange" },
  { icon: <FaClock />,    label: "Working Hours",  value: "Everyday 09 am – 07 pm",    color: "purple" },
  { icon: <FaEnvelope />, label: "Email",          value: "global@signaturetalks.org", color: "teal"   },
];

const SOCIALS = [
  { icon: <FaFacebookF />,  href: "#", cls: "fb", label: "Facebook"  },
  { icon: <FaTwitter />,    href: "#", cls: "tw", label: "Twitter"   },
  { icon: <FaLinkedinIn />, href: "#", cls: "li", label: "LinkedIn"  },
  { icon: <FaYoutube />,    href: "#", cls: "yt", label: "YouTube"   },
  { icon: <FaWhatsapp />,   href: "#", cls: "wa", label: "WhatsApp"  },
];

function useReveal() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, on];
}

/* ─── Country Dropdown ─── */
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
    <div className="cp-country-dropdown" ref={wrapRef}>
      <div
        className={`cp-country-trigger${open ? " cp-country-trigger--open" : ""}`}
        onClick={() => {
          setOpen((o) => !o);
          if (!open) setTimeout(() => inputRef.current?.focus(), 50);
        }}
      >
        {open ? (
          <input
            ref={inputRef}
            className="cp-country-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Search country…"
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="cp-country-selected">
            <span className="cp-country-code">{selected.code}</span>
            <span className="cp-country-name">{selected.name}</span>
          </span>
        )}
        <svg
          className={`cp-country-chevron${open ? " cp-country-chevron--up" : ""}`}
          viewBox="0 0 10 6" fill="none"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {open && (
        <div className="cp-country-list">
          {filtered.length === 0 ? (
            <div className="cp-country-empty">No countries found</div>
          ) : (
            filtered.map((country) => (
              <div
                key={`${country.iso}-${country.dialCode}`}
                className={`cp-country-option${country.code === value ? " cp-country-option--active" : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(country);
                }}
              >
                <span className="cp-country-option__code">{country.code}</span>
                <span className="cp-country-option__name">{country.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main Contact Page ─── */
export default function ContactPage() {
  const [form, setForm] = useState({
    firstName:   "",
    lastName:    "",
    email:       "",
    countryCode: DEFAULT_COUNTRY.code,
    phone:       "",
    message:     "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [mainRef, mainOn] = useReveal();
  const [mapRef,  mapOn]  = useReveal();

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim())  errs.lastName  = "Required";
    if (!form.email.trim())     errs.email     = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim())   errs.message   = "Required";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
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

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      firstName:   "",
      lastName:    "",
      email:       "",
      countryCode: DEFAULT_COUNTRY.code,
      phone:       "",
      message:     "",
    });
  };

  const openMap = (q) =>
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");

  return (
    <div className="cp">

      {/* ── PAGE HEADER ── */}
      <div className="cp-header">
        <div className="cp-header-glow" />
        <span className="cp-eyebrow"><span className="cp-eyebrow-bar" />Get In Touch</span>
        <h1 className="cp-page-title">
          Let's Start a <em>Conversation</em>
        </h1>
        <p className="cp-page-sub">
          Ready to collaborate, speak, or attend? We'd love to hear from you.
        </p>
      </div>

      {/* ── MAIN GRID: form + info ── */}
      <section className="cp-main" ref={mainRef}>
        <div className="cp-wrap">

          {/* — FORM — */}
          <div className={`cp-form-col reveal-left${mainOn ? " on" : ""}`}>
            <div className="cp-card">
              <p className="cp-card-label">Send a Message</p>
              <h2 className="cp-card-title">We'd love to hear from you</h2>
              <p className="cp-card-desc">Fill in the form and our team will respond within 24 hours.</p>
              <div className="cp-form-divider" />

              {submitted ? (
                <div className="cp-success">
                  <div className="cp-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="cp-success-title">Message Sent!</h3>
                  <p className="cp-success-sub">
                    Thank you for reaching out. Our team will be in touch shortly.
                  </p>
                  <button className="cp-submit" onClick={resetForm}>
                    <span>Send Another Message</span>
                    <span className="cp-submit-arrow">→</span>
                    <span className="cp-submit-shimmer" />
                  </button>
                </div>
              ) : (
                <div className="cp-form">

                  {/* First + Last name */}
                  <div className="cp-row">
                    <div className="cp-field">
                      <label className="cp-field-label">First Name</label>
                      <input
                        value={form.firstName}
                        onChange={set("firstName")}
                        className={`cp-input${errors.firstName ? " cp-input--error" : ""}`}
                        placeholder="John"
                      />
                      {errors.firstName && <span className="cp-error">{errors.firstName}</span>}
                    </div>
                    <div className="cp-field">
                      <label className="cp-field-label">Last Name</label>
                      <input
                        value={form.lastName}
                        onChange={set("lastName")}
                        className={`cp-input${errors.lastName ? " cp-input--error" : ""}`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <span className="cp-error">{errors.lastName}</span>}
                    </div>
                  </div>

                  {/* Email */}
                  {/* Email */}
<div className="cp-field">
  <label className="cp-field-label">Email Address</label>
  <input
    value={form.email}
    onChange={set("email")}
    type="email"
    className={`cp-input${errors.email ? " cp-input--error" : ""}`}
    placeholder="john@example.com"
  />
  {errors.email && <span className="cp-error">{errors.email}</span>}
</div>

                  {/* Phone */}
                  <div className="cp-field">
                    <label className="cp-field-label">
                      Phone Number <span className="cp-field-opt">(optional)</span>
                    </label>
                    <div className="cp-phone-wrap">
                      <CountryDropdown
                        value={form.countryCode}
                        onChange={(code) => setForm((prev) => ({ ...prev, countryCode: code }))}
                      />
                      <input
                        value={form.phone}
                        onChange={set("phone")}
                        className="cp-input cp-input--phone"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="cp-field">
                    <label className="cp-field-label">Message</label>
                    <div className="cp-textarea-wrap">
                      <textarea
                        value={form.message}
                        onChange={(e) => {
                          if (e.target.value.length <= MAX_MSG) set("message")(e);
                        }}
                        className={`cp-textarea${errors.message ? " cp-input--error" : ""}`}
                        placeholder="How can we help you?"
                        rows={5}
                      />
                      <span className={`cp-char-count${form.message.length >= MAX_MSG ? " cp-char-count--max" : ""}`}>
                        {form.message.length}/{MAX_MSG}
                      </span>
                    </div>
                    {errors.message && <span className="cp-error">{errors.message}</span>}
                  </div>

                  <button
                    className="cp-submit"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="cp-spinner" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span className="cp-submit-arrow">→</span>
                        <span className="cp-submit-shimmer" />
                      </>
                    )}
                  </button>

                  <p className="cp-terms">
                    By contacting us, you agree to our{" "}
                    <a href="/terms&conditions" className="cp-terms__link">Terms of service</a>{" "}
                    and{" "}
                    <a href="/policy" className="cp-terms__link">Privacy Policy</a>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* — INFO — */}
          <div className={`cp-info-col reveal-right${mainOn ? " on" : ""}`}>

            {/* Offices */}
            <div className="cp-offices">
              {OFFICES.map((o, i) => (
                <div
                  key={i} className="cp-office" onClick={() => openMap(o.mapQuery)}
                  style={{ "--oi": i }} title="Open in Google Maps"
                >
                  <div className="cp-office-pin"><FaMapMarkerAlt /></div>
                  <div>
                    <div className="cp-office-meta">
                      <span className="cp-office-label">{o.label}</span>
                      <span className="cp-office-city">{o.city}</span>
                    </div>
                    <h3 className="cp-office-title">{o.title}</h3>
                    <p className="cp-office-addr">{o.address}</p>
                    <span className="cp-office-link">View on map →</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact items */}
            <div className="cp-contact-items">
              {CONTACT_ITEMS.map(({ icon, label, value, color }) => (
                <div key={label} className={`cp-ci cp-ci--${color}`}>
                  <div className="cp-ci-icon">{icon}</div>
                  <div>
                    <p className="cp-ci-label">{label}</p>
                    <p className="cp-ci-value">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="cp-social">
              <span className="cp-social-label">Follow us</span>
              <div className="cp-social-icons">
                {SOCIALS.map(({ icon, href, cls, label: lbl }) => (
                  <a key={cls} href={href} className={`cp-soc cp-soc--${cls}`} aria-label={lbl}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE A CALL ── */}
      <section className={`cp-cal-section${mainOn ? " on" : ""}`}>
        <div className="cp-cal-header">
          <span className="cp-eyebrow"><span className="cp-eyebrow-bar" />Book a Meeting</span>
          <h2 className="cp-cal-title">Prefer to Talk <em>Live?</em></h2>
          <p className="cp-cal-desc">
            Pick a time that works for you — we're available for 15-minute discovery calls
            to discuss speaking opportunities, partnerships, or conference participation.
          </p>
        </div>
        <iframe
          src="https://calendly.com/d/cys7-bv4-fhq?hide_gdpr_banner=1&primary_color=f59e0b&background_color=07091e&text_color=ffffff"
          width="100%"
          height="750"
          frameBorder="0"
          title="Book a call"
          loading="eager"
          style={{ display: "block", border: "none", background: "#07091e" }}
        />
      </section>

      {/* ── EMBEDDED MAP ── */}
      <section className={`cp-map-section${mapOn ? " on" : ""}`} ref={mapRef}>
        <div className="cp-map-label-row">
          <span className="cp-eyebrow"><span className="cp-eyebrow-bar" />Our Location</span>
          <h2 className="cp-map-title">Find Us on the Map</h2>
        </div>
        <div className="cp-map-wrap">
          <iframe
            title="Signature Global Conferences — Head Office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24838.14!2d-75.55!3d39.158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c77ab5bb456f35%3A0xa2d36a0a2c0e0e14!2sDover%2C%20DE%2019901%2C%20USA!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%" height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="cp-map-float">
            <div className="cp-map-float-icon"><FaMapMarkerAlt /></div>
            <div className="cp-map-float-body">
              <p className="cp-map-float-name">Head Office</p>
              <p className="cp-map-float-addr">8TH Green, Dover DE,<br />United States 19901</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=8TH+Green+Dover+DE+United+States+19901"
              target="_blank" rel="noreferrer"
              className="cp-map-float-btn"
            >
              Open Maps →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}