import { useState } from "react";

// ══ HOMEPAGE COLOR THEME ══
const GOLD = "#FCA311";
const GOLD_DIM = "rgba(252,163,17,0.15)";
const GOLD_GLOW = "rgba(252,163,17,0.32)";
const NAVY = "#14213D";
const NAVY_D = "#0d1728";
const NAVY_L = "#1c2d52";
const WHITE = "#FFFFFF";
const MUTE = "rgba(255,255,255,0.48)";
const INK = "rgba(255,255,255,0.75)";

const s = {
  body: {
    fontFamily: "'Roboto', sans-serif",
    background: NAVY_D,
    color: WHITE,
    lineHeight: 1.75,
    fontSize: 15,
    fontWeight: 300,
    minHeight: "100vh",
  },
  header: {
    background: `linear-gradient(130deg, ${NAVY_D} 0%, ${NAVY} 30%, ${NAVY_L} 58%, #2a3a6e 78%, #3a4a7e 100%)`,
    padding: "60px 40px 50px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    inset: 0,
    background: `radial-gradient(ellipse 70% 60% at 50% 120%, ${GOLD_DIM}, transparent 70%)`,
    pointerEvents: "none",
  },
  line: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 120,
    height: 3,
    background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
    boxShadow: `0 0 10px ${GOLD_GLOW}`,
  },
  logoRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
    marginTop: 50,
    position: "relative",
    zIndex: 1,
  },
  logoBar: (r) => ({
    width: 36,
    height: 1,
    background: r ? `linear-gradient(90deg, ${GOLD}, transparent)` : `linear-gradient(90deg, transparent, ${GOLD})`,
  }),
  logoTxt: {
    fontSize: 11,
    letterSpacing: "3.5px",
    textTransform: "uppercase",
    color: GOLD,
    fontWeight: 600,
  },
  h1: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "clamp(2rem, 5vw, 3.2rem)",
    fontWeight: 900,
    color: WHITE,
    position: "relative",
    zIndex: 1,
    marginTop: 28,
    textTransform: "uppercase",
    letterSpacing: "-1px",
  },
  sub: {
    marginTop: 14,
    fontSize: 12,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: MUTE,
    position: "relative",
    zIndex: 1,
  },
  band: {
    background: NAVY,
    padding: "28px 40px",
    textAlign: "center",
    borderBottom: `1px solid rgba(252,163,17,0.1)`,
    borderTop: `1px solid rgba(252,163,17,0.1)`,
  },
  bandTxt: {
    maxWidth: 820,
    margin: "0 auto",
    color: MUTE,
    fontSize: 13.5,
    lineHeight: 1.85,
  },
  main: { maxWidth: 960, margin: "0 auto", padding: "60px 32px 80px" },
  hr: {
    height: 1,
    background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
    border: "none",
    margin: "0 0 48px",
    boxShadow: `0 0 8px ${GOLD_GLOW}`,
  },
  card: {
    marginBottom: 28,
    padding: "36px 40px",
    background: NAVY_L,
    border: `1px solid rgba(252,163,17,0.12)`,
    borderRadius: 20,
    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottom: `1px solid rgba(252,163,17,0.2)`,
  },
  icon: {
    width: 48,
    height: 48,
    background: `rgba(252,163,17,0.1)`,
    border: `1px solid rgba(252,163,17,0.2)`,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
    transition: "background 0.3s, border-color 0.3s",
  },
  cardTitle: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1.2rem",
    fontWeight: 700,
    margin: 0,
    color: WHITE,
    textTransform: "uppercase",
  },
  p: {
    color: MUTE,
    fontSize: 14.5,
    lineHeight: 1.85,
    marginBottom: 10,
  },
  box: {
    background: GOLD_DIM,
    border: `1px solid rgba(252,163,17,0.25)`,
    borderLeft: `3px solid ${GOLD}`,
    borderRadius: "0 10px 10px 0",
    padding: "16px 20px",
    marginTop: 14,
    display: "flex",
    gap: 12,
  },
  boxTxt: { margin: 0, fontSize: 13.5, color: "rgba(255,255,255,0.85)" },
  th: {
    background: NAVY,
    color: GOLD,
    fontSize: 11,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    padding: "12px 18px",
    textAlign: "left",
    fontWeight: 600,
  },
  td: (i) => ({
    padding: "13px 18px",
    borderBottom: "1px solid rgba(252,163,17,0.1)",
    color: MUTE,
    background: i % 2 === 0 ? NAVY_L : "rgba(252,163,17,0.03)",
  }),
  badge: (ok) => ({
    display: "inline-block",
    padding: "3px 12px",
    borderRadius: 20,
    fontSize: 11.5,
    fontWeight: 600,
    background: ok ? "rgba(252,163,17,0.2)" : "rgba(255,100,100,0.2)",
    color: ok ? GOLD : "#ff6b6b",
    border: `1px solid ${ok ? GOLD : "rgba(255,100,100,0.3)"}`,
  }),
  note: {
    background: GOLD_DIM,
    color: "rgba(255,255,255,0.85)",
    borderRadius: "0 10px 10px 0",
    borderLeft: `3px solid ${GOLD}`,
    padding: "14px 20px",
    marginTop: 18,
    fontSize: 13,
    display: "flex",
    gap: 10,
  },
  contact: {
    background: `linear-gradient(130deg, ${NAVY_D} 0%, ${NAVY} 60%, ${NAVY_L} 100%)`,
    padding: "56px 40px 50px",
    position: "relative",
    overflow: "hidden",
    borderRadius: 24,
    border: `1px solid rgba(252,163,17,0.15)`,
    margin: "0 32px",
  },
  contactGlow: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${GOLD_DIM}, transparent 70%)`,
    pointerEvents: "none",
  },
  inner: { maxWidth: 960, margin: "0 auto", position: "relative" },
  h3: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1.8rem",
    color: WHITE,
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: 900,
    letterSpacing: "-0.5px",
  },
  csub: {
    fontSize: 11,
    letterSpacing: "3.5px",
    textTransform: "uppercase",
    color: GOLD,
    marginBottom: 36,
    display: "block",
    fontWeight: 600,
  },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  lbl: {
    display: "block",
    fontSize: 10.5,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    color: GOLD,
    fontWeight: 600,
    marginBottom: 6,
  },
  inp: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: `1px solid rgba(252,163,17,0.2)`,
    borderRadius: 6,
    padding: "12px 16px",
    fontFamily: "'Roboto', sans-serif",
    fontSize: 14,
    fontWeight: 300,
    color: WHITE,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
  },
  btn: (h) => ({
    marginTop: 24,
    padding: "14px 32px",
    background: GOLD,
    color: "#000000",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
    borderRadius: 6,
    transform: h ? "translateY(-3px)" : "none",
    boxShadow: h ? `0 12px 30px ${GOLD_GLOW}` : `0 4px 20px ${GOLD_GLOW}`,
    transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  }),
  footer: {
    background: "#0a0f1a",
    textAlign: "center",
    padding: "22px 20px",
    fontSize: 11.5,
    color: "rgba(255,255,255,0.28)",
    letterSpacing: "0.1em",
    marginTop: 40,
  },
  success: {
    background: GOLD_DIM,
    border: `1px solid ${GOLD}`,
    borderRadius: 6,
    padding: "12px 20px",
    marginBottom: 20,
    color: WHITE,
    fontSize: 13.5,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
};

const Card = ({ icon, title, children }) => (
  <div style={s.card}>
    <div style={s.cardHead}>
      <div style={s.icon}>{icon}</div>
      <h2 style={s.cardTitle}>{title}</h2>
    </div>
    {children}
  </div>
);

const Box = ({ icon = "ℹ️", children }) => (
  <div style={s.box}>
    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{icon}</span>
    <p style={s.boxTxt}>{children}</p>
  </div>
);

const Field = ({ label, full, textarea, ...props }) => (
  <div style={full ? { gridColumn: "1/-1" } : {}}>
    <label style={s.lbl}>{label}</label>
    {textarea ? (
      <textarea
        style={{ ...s.inp, resize: "vertical", minHeight: 120 }}
        {...props}
      />
    ) : (
      <input style={s.inp} {...props} />
    )}
  </div>
);

export default function TermsAndConditions() {
  const [form, setForm] = useState({
    firstName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [ok, setOk] = useState(false);
  const [hover, setHover] = useState(false);

  const set = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = () => {
    setOk(true);
    setTimeout(() => setOk(false), 3000);
    setForm({ firstName: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={s.body}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
        @media (max-width: 768px) {
          .tc-grid { grid-template-columns: 1fr !important; }
          .tc-contact { margin: 0 20px !important; padding: 44px 24px 40px !important; }
          .tc-card { padding: 28px 24px !important; }
          .tc-header { padding: 48px 24px 40px !important; }
          .tc-h1 { font-size: clamp(1.8rem, 6vw, 2.6rem) !important; }
        }
        @media (max-width: 480px) {
          .tc-h1 { font-size: 1.9rem !important; }
          .tc-band { padding: 20px 16px !important; }
          .tc-main { padding: 40px 16px 60px !important; }
        }
      `}</style>

      <header style={s.header} className="tc-header">
        <div style={s.glow} />
        <div style={s.line} />
        <div style={s.logoRow}>
          <span style={s.logoBar(false)} />
          <span style={s.logoTxt}>Signature Global Conference</span>
          <span style={s.logoBar(true)} />
        </div>
        <h1 style={s.h1} className="tc-h1">
          Terms &amp; <span style={{ color: GOLD }}>Conditions</span>
        </h1>
        <p style={s.sub}>Please read carefully before registering</p>
      </header>

      <div style={s.band} className="tc-band">
        <p style={s.bandTxt}>
          Signature Global Conference speaker policies prioritise the privacy and security of all our delegates. This document outlines the information collected and governed by Signature Global Conference LLC. These policies apply exclusively to our online activities and are valid for visitors to our website. They do not apply to information collected offline or via other channels.
        </p>
      </div>

      <main style={s.main} className="tc-main">
        <hr style={s.hr} />

        <Card icon="🏛️" title="Roles & Responsibility">
          <p style={s.p}>
            Delegates are personally responsible for their belongings at the venue. The organizers will not be held responsible for any stolen or missing items belonging to delegates, speakers, or attendees, due to any reason whatsoever.
          </p>
        </Card>

        <Card icon="📄" title="Documents">
          <p style={s.p}>
            For security purposes, the Invitation Letter will be sent only to those individuals who have registered for the conference.
          </p>
        </Card>

        <Card icon="🛂" title="Visa Information">
          <p style={s.p}>
            Keeping in view the increased security measures, we request all participants to apply for a Visa as soon as possible. Signature Global Conference LLC will not directly contact embassies on behalf of visa applicants. All delegates should apply for a business visa only.
          </p>
          <p style={{ ...s.p, marginBottom: 0 }}>
            Visa issues cannot come under the cancellation policy of Signature Global Conference, including the inability to obtain a Visa.
          </p>
          <Box>
            If a visa is not awarded in time, the full registration fee will be reimbursed. The{" "}
            <strong style={{ color: GOLD }}>visa rejection letter is required</strong> for reimbursement to be processed.
          </Box>
        </Card>

        <Card icon="🛡️" title="Insurance">
          <p style={s.p}>
            Please note that any (or all) transportation and parking is the responsibility of{" "}
            <strong>THE REGISTRANT</strong>.
          </p>
        </Card>

        <Card icon="❌" title="Cancellation Policy">
          <p style={s.p}>
            If Signature Global Conference cancels this event, you will receive a credit for 100% of the registration fee paid, usable for another event within <strong>ONE YEAR</strong> from the date of cancellation.
          </p>
          <p style={{ ...s.p, marginBottom: 0 }}>
            All cancellations must be made in writing to{" "}
            <strong style={{ color: GOLD }}>global@signaturetalks.org</strong>
          </p>
          <Box icon="📅">
            This cancellation policy was last updated on{" "}
            <strong style={{ color: WHITE }}>28 November 2022</strong>.
          </Box>
        </Card>

        <Card icon="💳" title="Refund Policy">
          <p style={s.p}>
            To cancel your registration, email{" "}
            <strong style={{ color: GOLD }}>global@signaturetalks.org</strong>{" "}
            notifying the team of your decision.
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 18, fontSize: 14 }}>
            <thead>
              <tr>
                <th style={s.th}>Timeframe Before Conference</th>
                <th style={s.th}>Refund Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Within 30–60 days", true],
                ["Before 60 days", false],
              ].map(([label, eligible], i) => (
                <tr key={i}>
                  <td style={s.td(i)}>
                    <strong>{label}</strong>
                  </td>
                  <td style={s.td(i)}>
                    <span style={s.badge(eligible)}>
                      {eligible ? "Eligible for 50% Payment Refund" : "Not Eligible for Refund"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={s.note}>
            <span>📌</span>
            <div>
              <strong style={{ color: GOLD }}>NOTE:</strong> Refunds will be processed after the conference concludes and credited to the original payment method.
            </div>
          </div>
        </Card>
      </main>

      <div style={s.contact} className="tc-contact">
        <div style={s.contactGlow} />
        <div style={s.inner}>
          <h3 style={s.h3}>Get in Touch</h3>
          <span style={s.csub}>Have questions? We're here to help.</span>
          {ok && (
            <div style={s.success}>
              <span>✅</span> Your message has been sent. We'll get back to you shortly!
            </div>
          )}
          <div style={s.grid} className="tc-grid">
            <Field label="First Name" name="firstName" value={form.firstName} onChange={set} placeholder="Your first name" />
            <Field label="Phone" name="phone" value={form.phone} onChange={set} placeholder="+1 (000) 000-0000" />
            <Field label="Email Address" name="email" type="email" value={form.email} onChange={set} placeholder="you@example.com" />
            <Field label="Subject" name="subject" value={form.subject} onChange={set} placeholder="What's this regarding?" />
            <Field label="Message" name="message" value={form.message} onChange={set} placeholder="Write your message here…" textarea full />
          </div>
          <button
            style={s.btn(hover)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={submit}
          >
            Send Message
          </button>
        </div>
      </div>

      <footer style={s.footer}>
        © {new Date().getFullYear()} Signature Global Conferences. All rights reserved.
      </footer>
    </div>
  );
}