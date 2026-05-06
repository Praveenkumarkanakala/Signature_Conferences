import { useState, useEffect, useRef } from "react";
import "./contact.css";
import {
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
  FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaWhatsapp
} from "react-icons/fa";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbwHHHV5aDHgbyYGBe1Hq2dSUm3E40jaUGaJoDxc9Kg-YgqK24PA5bNIVXGiCZehffda/exec";

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
  { icon: <FaPhone />,    label: "Phone",        value: "+1-202-571-5721",          color: "orange" },
  { icon: <FaClock />,    label: "Working Hours", value: "Everyday 09 am – 07 pm",    color: "purple" },
  { icon: <FaEnvelope />, label: "Email",         value: "global@signaturetalks.org", color: "teal"   },
];

const SOCIALS = [
  { icon: <FaFacebookF />, href: "#", cls: "fb", label: "Facebook"  },
  { icon: <FaTwitter />,   href: "#", cls: "tw", label: "Twitter"   },
  { icon: <FaLinkedinIn />,href: "#", cls: "li", label: "LinkedIn"  },
  { icon: <FaYoutube />,   href: "#", cls: "yt", label: "YouTube"   },
  { icon: <FaWhatsapp />,  href: "#", cls: "wa", label: "WhatsApp"  },
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

export default function ContactPage() {
  const [form, setForm]       = useState({ fullName: "", email: "", subject: "", message: "" });
  const [privacy, setPrivacy] = useState(false);
  const [status, setStatus]   = useState("idle");
  const [focused, setFocused] = useState(null);

  const [mainRef, mainOn] = useReveal();
  const [mapRef,  mapOn]  = useReveal();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!privacy || !form.fullName || !form.email || !form.message) return;
    setStatus("loading");
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      });
      setStatus("sent");
      setForm({ fullName: "", email: "", subject: "", message: "" });
      setPrivacy(false);
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 3500);
  };

  const openMap = (q) =>
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");

  return (
    <div className="cp">

      {/* ── COMPACT PAGE HEADER ── */}
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

              <form onSubmit={handleSubmit} noValidate>

                {/* Name + Email row */}
                <div className="cp-row">
                  <div className={`cp-field${focused === "fullName" ? " active" : ""}`}>
                    <label className="cp-field-label">Full Name</label>
                    <input
                      name="fullName" type="text" value={form.fullName}
                      placeholder="John Doe" onChange={set("fullName")}
                      onFocus={() => setFocused("fullName")} onBlur={() => setFocused(null)}
                      required autoComplete="name"
                    />
                  </div>
                  <div className={`cp-field${focused === "email" ? " active" : ""}`}>
                    <label className="cp-field-label">Email Address</label>
                    <input
                      name="email" type="email" value={form.email}
                      placeholder="hello@example.com" onChange={set("email")}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      required autoComplete="email"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className={`cp-field${focused === "subject" ? " active" : ""}`}>
                  <label className="cp-field-label">
                    Subject <span className="cp-field-opt">(optional)</span>
                  </label>
                  <input
                    name="subject" value={form.subject}
                    placeholder="What's this about?"
                    onChange={set("subject")}
                    onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Message */}
                <div className={`cp-field${focused === "message" ? " active" : ""}`}>
                  <label className="cp-field-label">Message</label>
                  <textarea
                    name="message" value={form.message}
                    placeholder="Tell us how we can help you…"
                    rows={5} onChange={set("message")}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    required
                  />
                  <p className="cp-field-hint">
                    {form.message.length > 0 ? `${form.message.length} characters` : "Minimum 20 characters"}
                  </p>
                </div>

                <div className="cp-form-foot">
                  <label className="cp-check">
                    <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
                    <span className="cp-check-box" />
                    <span className="cp-check-text">I agree to the <a href="/policy">privacy policy</a></span>
                  </label>
                  <button
                    type="submit"
                    className={`cp-submit${status === "sent" ? " sent" : status === "error" ? " err" : ""}`}
                    disabled={status === "loading" || !privacy}
                  >
                    <span>
                      {status === "loading" ? "Sending…"
                        : status === "sent"  ? "Message Sent ✓"
                        : status === "error" ? "Failed — Retry"
                        : "Send Message"}
                    </span>
                    <span className="cp-submit-arrow">→</span>
                    <span className="cp-submit-shimmer" />
                  </button>
                </div>
              </form>
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