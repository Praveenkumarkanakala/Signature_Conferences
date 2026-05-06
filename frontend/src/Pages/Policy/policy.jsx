import { useState } from "react";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

:root {
  /* ══ HOMEPAGE COLOR THEME ══ */
  --gold:      #FCA311;
  --gold-dim:  rgba(252,163,17,.15);
  --gold-glow: rgba(252,163,17,.32);
  --navy:      #14213D;
  --navy-d:    #0d1728;
  --navy-l:    #1c2d52;
  --black:     #000000;
  --white:     #FFFFFF;
  --grey:      #E5E5E5;
  --mute:      rgba(255,255,255,.48);
  --ease:      cubic-bezier(.2,.8,.2,1);
  --spring:    cubic-bezier(.34,1.56,.64,1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Roboto', sans-serif;
  background: var(--navy-d);
  color: var(--white);
  overflow-x: hidden;
  -webkit-text-size-adjust: 100%;
}

/* ── BANNER ─────────────────────────────── */
.pp-banner {
  width: 100%; height: 220px; position: relative; overflow: hidden;
  background: linear-gradient(130deg, var(--navy-d) 0%, var(--navy) 30%, var(--navy-l) 58%, #2a3a6e 78%, #3a4a7e 100%);
}
.pp-banner__overlay {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 18% 55%, var(--gold-dim) 0%, transparent 55%),
              radial-gradient(ellipse at 82% 25%, rgba(252,163,17,.18) 0%, transparent 50%);
}
.pp-banner__shapes { position: absolute; inset: 0; }
.pp-shape { position: absolute; animation: ppDrift linear infinite; opacity: 0.6; }
.pp-shape:nth-child(1) { width:88px;height:88px;top:-22px;left:7%;clip-path:polygon(50% 0%,100% 100%,0% 100%);background:var(--gold-dim);animation-duration:18s; }
.pp-shape:nth-child(2) { width:55px;height:55px;top:35%;left:20%;clip-path:polygon(50% 0%,100% 100%,0% 100%);background:rgba(252,163,17,.12);animation-duration:23s;animation-delay:-6s; }
.pp-shape:nth-child(3) { width:115px;height:115px;top:-28px;right:28%;clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);background:var(--gold-dim);animation-duration:26s;animation-delay:-9s; }
.pp-shape:nth-child(4) { width:48px;height:48px;bottom:12px;left:43%;clip-path:polygon(50% 0%,100% 100%,0% 100%);background:rgba(252,163,17,.14);animation-duration:20s;animation-delay:-3s; }
.pp-shape:nth-child(5) { width:78px;height:78px;top:18%;right:13%;clip-path:polygon(50% 0%,100% 100%,0% 100%);background:var(--gold-dim);animation-duration:17s;animation-delay:-12s; }
.pp-shape:nth-child(6) { width:96px;height:96px;top:-8px;right:4%;clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);background:rgba(252,163,17,.10);animation-duration:29s;animation-delay:-7s; }
.pp-shape:nth-child(7) { width:38px;height:38px;bottom:22px;left:14%;clip-path:polygon(50% 0%,100% 100%,0% 100%);background:var(--gold-dim);animation-duration:15s;animation-delay:-10s; }

@keyframes ppDrift {
  0%   { transform: translateY(0) rotate(0deg); opacity: 0.4; }
  50%  { transform: translateY(-14px) rotate(180deg); opacity: 0.8; }
  100% { transform: translateY(0) rotate(360deg); opacity: 0.4; }
}

.pp-banner__bottom-line {
  position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--gold), var(--gold), var(--gold), transparent);
  box-shadow: 0 0 10px var(--gold-glow);
}
.pp-banner__content {
  position: relative; z-index: 2; margin-top: 25px; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
}
.pp-banner__eyebrow {
  font-family: 'Roboto', sans-serif; font-size: 0.75rem; font-weight: 600;
  letter-spacing: 3.5px; text-transform: uppercase; color: var(--gold);
  display: block; text-align: center;
}
.pp-banner__title {
  font-family: 'Roboto', sans-serif; font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 900; color: var(--white); text-align: center; line-height: 1.1;
  text-transform: uppercase; letter-spacing: -1px;
}
.pp-banner__title em { font-style: italic; color: var(--gold); }

/* ── META BAR ───────────────────────────── */
.pp-meta {
  background: var(--navy); padding: 14px 40px;
  display: flex; align-items: center; justify-content: center; gap: 40px; flex-wrap: wrap;
  border-top: 1px solid rgba(252,163,17,.1);
  border-bottom: 1px solid rgba(252,163,17,.1);
}
.pp-meta__item {
  display: flex; align-items: center; gap: 8px;
  font-family: 'Roboto', sans-serif; font-size: 0.8rem;
  color: var(--mute); letter-spacing: 0.05em;
}
.pp-meta__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0; box-shadow: 0 0 6px var(--gold-glow); }
.pp-meta__label { color: var(--gold); font-weight: 600; }

/* ── PAGE + LAYOUT ──────────────────────── */
.pp-page { background: var(--navy-d); min-height: 100vh; }
.pp-layout { max-width: 1100px; margin: 0 auto; padding: 60px 40px 100px; }
.pp-content { display: flex; flex-direction: column; gap: 28px; }

/* ── SECTION CARDS ──────────────────────── */
.pp-section {
  background: var(--navy-l); border-radius: 20px; padding: 40px 48px;
  border: 1px solid rgba(252,163,17,.12);
  box-shadow: 0 2px 16px rgba(0,0,0,0.3);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  scroll-margin-top: 100px;
}
.pp-section:hover {
  box-shadow: 0 6px 32px rgba(252,163,17,.15);
  border-color: rgba(252,163,17,.35);
}
.pp-section__header {
  display: flex; align-items: flex-start; gap: 16px;
  margin-bottom: 24px; padding-bottom: 20px;
  border-bottom: 1px solid rgba(252,163,17,.2);
}
.pp-section__icon-wrap {
  width: 48px; height: 48px; border-radius: 12px;
  background: rgba(252,163,17,.1); border: 1px solid rgba(252,163,17,.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; flex-shrink: 0;
  transition: background 0.3s, border-color 0.3s;
}
.pp-section:hover .pp-section__icon-wrap {
  background: rgba(252,163,17,.2); border-color: var(--gold);
}
.pp-section__titles { flex: 1; }
.pp-section__title {
  font-family: 'Roboto', sans-serif; font-size: 1.35rem; font-weight: 700;
  color: var(--white); line-height: 1.2; margin-bottom: 4px;
  text-transform: uppercase;
}
.pp-section__subtitle {
  font-family: 'Roboto', sans-serif; font-size: 0.78rem; font-weight: 600;
  color: var(--gold); letter-spacing: 2px; text-transform: uppercase;
}
.pp-section__body { display: flex; flex-direction: column; gap: 14px; }
.pp-section__para {
  font-family: 'Roboto', sans-serif; font-size: 0.95rem; line-height: 1.8;
  color: var(--mute);
}

/* ── LIST ───────────────────────────────── */
.pp-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-top: 6px; }
.pp-list__item {
  display: flex; align-items: flex-start; gap: 12px;
  font-family: 'Roboto', sans-serif; font-size: 0.92rem; line-height: 1.65;
  color: var(--mute);
}
.pp-list__bullet {
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--gold); display: flex; align-items: center;
  justify-content: center; flex-shrink: 0; margin-top: 2px;
  box-shadow: 0 0 8px var(--gold-glow);
}
.pp-list__bullet::after { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--navy-d); }

/* ── FOOTER NOTE ────────────────────────── */
.pp-section__footer-note {
  margin-top: 18px; padding: 14px 18px;
  background: var(--gold-dim); border-left: 3px solid var(--gold);
  border-radius: 0 10px 10px 0;
  font-family: 'Roboto', sans-serif; font-size: 0.88rem; line-height: 1.7;
  color: rgba(255,255,255,.85); font-weight: 500;
}

/* ── CONTACT BOX ────────────────────────── */
.pp-contact-box {
  margin-top: 20px;
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-l) 100%);
  border-radius: 14px; padding: 28px 32px;
  display: flex; flex-direction: column; gap: 14px;
  border: 1px solid rgba(252,163,17,.2);
}
.pp-contact-box__row {
  display: flex; align-items: center; gap: 12px;
  font-family: 'Roboto', sans-serif; font-size: 0.9rem;
  color: var(--mute);
}
.pp-contact-box__label { font-weight: 600; color: var(--gold); min-width: 80px; }
.pp-contact-box__val { color: var(--white); }

/* ── CTA ────────────────────────────────── */
.pp-cta {
  background: linear-gradient(130deg, var(--navy-d) 0%, var(--navy) 60%, var(--navy-l) 100%);
  border-radius: 24px; padding: 60px 56px; position: relative; overflow: hidden;
  margin-top: 8px; border: 1px solid rgba(252,163,17,.15);
}
.pp-cta::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 20% 0%, var(--gold-dim) 0%, transparent 60%);
  pointer-events: none;
}
.pp-cta__inner {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;
}
.pp-cta__left { display: flex; flex-direction: column; gap: 20px; }
.pp-cta__eyebrow {
  font-family: 'Roboto', sans-serif; font-size: 0.75rem; font-weight: 600;
  letter-spacing: 3.5px; text-transform: uppercase; color: var(--gold);
  display: block;
}
.pp-cta__title {
  font-family: 'Roboto', sans-serif; font-size: clamp(1.6rem, 2.8vw, 2.4rem);
  font-weight: 900; color: var(--white); line-height: 1.2;
  text-transform: uppercase; letter-spacing: -0.5px;
}
.pp-cta__title em { font-style: italic; color: var(--gold); }
.pp-cta__sub {
  font-family: 'Roboto', sans-serif; font-size: 0.92rem;
  color: var(--mute); line-height: 1.75;
}
.pp-cta__info { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
.pp-cta__info-row {
  display: flex; align-items: center; gap: 10px;
  font-family: 'Roboto', sans-serif; font-size: 0.88rem; color: var(--mute);
}
.pp-cta__info-icon { font-size: 1rem; color: var(--gold); }

/* ── FORM ───────────────────────────────── */
.pp-form {
  background: rgba(252,163,17,.05);
  border: 1px solid rgba(252,163,17,.2);
  border-radius: 18px; padding: 36px 32px;
  display: flex; flex-direction: column; gap: 18px;
}
.pp-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.pp-form__field { display: flex; flex-direction: column; gap: 7px; }
.pp-form__label {
  font-family: 'Roboto', sans-serif; font-size: 0.78rem; font-weight: 600;
  letter-spacing: 1.2px; color: var(--gold); text-transform: uppercase;
}
.pp-form__input, .pp-form__textarea {
  font-family: 'Roboto', sans-serif; font-size: 0.9rem; color: var(--white);
  background: rgba(255,255,255,.05); border: 1px solid rgba(252,163,17,.2);
  border-radius: 6px; padding: 12px 16px; outline: none; resize: none;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}
.pp-form__input::placeholder, .pp-form__textarea::placeholder { color: var(--mute); }
.pp-form__input:focus, .pp-form__textarea:focus {
  border-color: var(--gold);
  background: rgba(252,163,17,.08);
  box-shadow: 0 0 0 3px var(--gold-dim);
}
.pp-form__submit {
  margin-top: 4px; padding: 14px 32px;
  background: var(--gold); color: var(--black);
  font-family: 'Roboto', sans-serif; font-size: 0.95rem; font-weight: 700;
  letter-spacing: 1.2px; text-transform: uppercase;
  border: none; border-radius: 6px; cursor: pointer;
  transition: transform 0.3s var(--spring), box-shadow 0.3s, background 0.2s;
  display: flex; align-items: center; justify-content: center; min-height: 50px;
  box-shadow: 0 4px 20px var(--gold-glow);
}
.pp-form__submit:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px var(--gold-glow);
}
.pp-form__submit:disabled { opacity: 0.6; cursor: not-allowed; }
.pp-form__spinner {
  width: 20px; height: 20px;
  border: 3px solid rgba(0,0,0,0.3); border-top-color: var(--black);
  border-radius: 50%; animation: ppSpin 0.7s linear infinite; display: inline-block;
}
@keyframes ppSpin { to { transform: rotate(360deg); } }

.pp-form__success {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 14px; padding: 60px 32px; text-align: center;
}
.pp-form__success-icon { font-size: 3rem; }
.pp-form__success-title {
  font-family: 'Roboto', sans-serif; font-size: 1.5rem; font-weight: 700;
  color: var(--white); text-transform: uppercase;
}
.pp-form__success-sub {
  font-family: 'Roboto', sans-serif; font-size: 0.9rem;
  color: var(--mute); line-height: 1.7; max-width: 320px;
}

/* ── RESPONSIVE ─────────────────────────── */
@media (max-width: 860px) {
  .pp-cta__inner { grid-template-columns: 1fr; gap: 36px; }
  .pp-cta { padding: 44px 32px; }
  .pp-section { padding: 28px 24px; }
  .pp-layout { padding: 40px 20px 80px; }
  .pp-meta { padding: 12px 20px; gap: 16px; }
}
@media (max-width: 540px) {
  .pp-form__row { grid-template-columns: 1fr; }
  .pp-banner__title { font-size: 1.7rem; }
  .pp-banner { height: 180px; }
}
`;

const lastUpdated = "April 25, 2026";

const policySections = [
  { id: "introduction", icon: "🌐", title: "Introduction", content: ["At Signature Global Conferences, accessible from signatureglobalconferences.com, one of our main priorities is the privacy of our visitors, attendees, speakers, and partners. This Privacy Policy document contains the types of information that is collected and recorded by Signature Global Conferences and how we use it.", "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Signature Global Conferences. This policy is not applicable to any information collected offline or via channels other than this website."] },
  { id: "consent", icon: "✅", title: "Consent", content: ["By using our website, registering for conferences, or engaging with our platform, you hereby consent to our Privacy Policy and agree to its terms. Your participation in Signature Global Conferences events implies acceptance of this policy in its entirety."] },
  { id: "information", icon: "📋", title: "Information We Collect", content: ["The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.", "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.", "When you register for a Conference or create an Account, we may ask for your contact information, including items such as name, company name, designation, address, email address, telephone number, and professional background. For speakers and partners, we may additionally collect biographical information, headshots, and presentation materials."] },
  { id: "how-we-use", icon: "⚙️", title: "How We Use Your Information", items: ["Provide, operate, and maintain our website and conference platforms", "Process event registrations, payments, and speaker applications", "Improve, personalize, and expand our conferences and digital experiences", "Understand and analyze how you use our website and engage with our events", "Develop new conferences, services, features, and networking opportunities", "Communicate with you directly or through partners, including for customer service, event updates, speaker coordination, and marketing", "Send you event confirmations, updates, newsletters, and promotional communications", "Facilitate networking among attendees, speakers, and global community members", "Find and prevent fraud, ensure security, and maintain platform integrity"] },
  { id: "log-files", icon: "🗂️", title: "Log Files", content: ["Signature Global Conferences follows a standard procedure of using log files. These files log visitors when they visit our website. All hosting companies do this as part of hosting services analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users movement on the website, and gathering demographic information."] },
  { id: "cookies", icon: "🍪", title: "Cookies & Web Beacons", content: ["Like any other website, Signature Global Conferences uses cookies. These cookies are used to store information including visitors preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users experience by customizing our web page content based on visitors browser type and/or other information.", "You can choose to disable cookies through your individual browser options. To find more detailed information about cookie management with specific web browsers, it can be found at the browsers respective websites."] },
  { id: "third-party", icon: "🤝", title: "Third Party Privacy Policies", content: ["Signature Global Conferences Privacy Policy does not apply to other advertisers, sponsors, or partner websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party services for more detailed information. It may include their practices and instructions about how to opt-out of certain options.", "Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons in their respective advertisements and links that appear on our platform, which are sent directly to users browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that users see."] },
  { id: "ccpa", icon: "🏛️", title: "CCPA Privacy Rights", subtitle: "Do Not Sell My Personal Information", content: ["Under the CCPA, among other rights, California consumers have the right to:"], items: ["Request that a business that collects a consumers personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.", "Request that a business delete any personal data about the consumer that a business has collected.", "Request that a business that sells a consumers personal data, not sell the consumers personal data."], footer: "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us." },
  { id: "gdpr", icon: "🇪🇺", title: "GDPR Data Protection Rights", content: ["We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:"], items: ["The right to access - You have the right to request copies of your personal data. We may charge a small fee for this service.", "The right to rectification - You have the right to request that we correct any information you believe is inaccurate, or complete information you believe is incomplete.", "The right to erasure - You have the right to request that we erase your personal data, under certain conditions.", "The right to restrict processing - You have the right to request that we restrict the processing of your personal data, under certain conditions.", "The right to object to processing - You have the right to object to our processing of your personal data, under certain conditions.", "The right to data portability - You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions."], footer: "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us." },
  { id: "children", icon: "👶", title: "Children's Information", content: ["Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.", "Signature Global Conferences does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records."] },
  { id: "contact", icon: "📬", title: "Contact Us", content: ["If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please do not hesitate to reach out to us. Our team is committed to addressing your privacy concerns promptly and transparently."], contact: { email: "global@signaturetalks.org", website: "www.signaturetalks.org" } },
];

function PolicySection({ section }) {
  return (
    <section className="pp-section" id={section.id}>
      <div className="pp-section__header">
        <div className="pp-section__icon-wrap">{section.icon}</div>
        <div className="pp-section__titles">
          <h2 className="pp-section__title">{section.title}</h2>
          {section.subtitle && <span className="pp-section__subtitle">{section.subtitle}</span>}
        </div>
      </div>
      <div className="pp-section__body">
        {section.content?.map((p, i) => <p key={i} className="pp-section__para">{p}</p>)}
        {section.items && (
          <ul className="pp-list">
            {section.items.map((item, i) => (
              <li key={i} className="pp-list__item"><span className="pp-list__bullet" />{item}</li>
            ))}
          </ul>
        )}
        {section.footer && <div className="pp-section__footer-note">{section.footer}</div>}
        {section.contact && (
          <div className="pp-contact-box">
            {[["Email", section.contact.email], ["Website", section.contact.website]].map(([label, val]) => (
              <div key={label} className="pp-contact-box__row">
                <span className="pp-contact-box__label">{label}</span>
                <span className="pp-contact-box__val">{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    if (Object.values(form).some(v => !v)) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  if (submitted) return (
    <div className="pp-form__success">
      <div className="pp-form__success-icon">✅</div>
      <h3 className="pp-form__success-title">Message Sent!</h3>
      <p className="pp-form__success-sub">Thank you for reaching out. Our privacy team will respond within one month.</p>
    </div>
  );

  const fields = [
    { row: true, fields: [{ name: "firstName", label: "First Name", placeholder: "John", type: "text" }, { name: "lastName", label: "Last Name", placeholder: "Doe", type: "text" }] },
    { name: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
    { name: "subject", label: "Subject", placeholder: "e.g. Data deletion request", type: "text" },
  ];

  return (
    <div className="pp-form">
      {fields.map((f, i) => f.row ? (
        <div key={i} className="pp-form__row">
          {f.fields.map(sf => (
            <div key={sf.name} className="pp-form__field">
              <label className="pp-form__label">{sf.label}</label>
              <input className="pp-form__input" type={sf.type} name={sf.name} placeholder={sf.placeholder} value={form[sf.name]} onChange={handleChange} />
            </div>
          ))}
        </div>
      ) : (
        <div key={f.name} className="pp-form__field">
          <label className="pp-form__label">{f.label}</label>
          <input className="pp-form__input" type={f.type} name={f.name} placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} />
        </div>
      ))}
      <div className="pp-form__field">
        <label className="pp-form__label">Message</label>
        <textarea className="pp-form__textarea" name="message" placeholder="Describe your privacy request or question..." rows={5} value={form.message} onChange={handleChange} />
      </div>
      <button className="pp-form__submit" type="button" disabled={loading} onClick={handleSubmit}>
        {loading ? <span className="pp-form__spinner" /> : "Submit Request"}
      </button>
    </div>
  );
}

function PPCta() {
  return (
    <div className="pp-cta">
      <div className="pp-cta__inner">
        <div className="pp-cta__left">
          <span className="pp-cta__eyebrow">Questions about your data?</span>
          <h2 className="pp-cta__title">Your Privacy Matters.<br /><em>Reach Out Anytime.</em></h2>
          <p className="pp-cta__sub">Our team is committed to transparency and will respond to any privacy-related request within one month. Fill out the form and we will get back to you promptly.</p>
          <div className="pp-cta__info">
            {[["📧", "global@signaturetalks.org"], ["⏱️", "Response within 30 days"]].map(([icon, text]) => (
              <div key={text} className="pp-cta__info-row"><span className="pp-cta__info-icon">{icon}</span>{text}</div>
            ))}
          </div>
        </div>
        <div className="pp-cta__right"><ContactForm /></div>
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <style>{styles}</style>
      <div className="pp-page">
        <div className="pp-banner">
          <div className="pp-banner__overlay" />
          <div className="pp-banner__shapes">{[...Array(7)].map((_, i) => <div key={i} className="pp-shape" />)}</div>
          <div className="pp-banner__content">
            <span className="pp-banner__eyebrow">Legal &amp; Compliance</span>
            <h1 className="pp-banner__title">Privacy <em>Policy</em></h1>
          </div>
          <div className="pp-banner__bottom-line" />
        </div>
        <div className="pp-meta">
          {[["Last Updated:", lastUpdated], ["Applies to:", "www.signaturetalks.org"], ["Governed by:", "GDPR & CCPA"]].map(([label, val]) => (
            <div key={label} className="pp-meta__item"><span className="pp-meta__dot" /><span className="pp-meta__label">{label}</span>&nbsp;{val}</div>
          ))}
        </div>
        <div className="pp-layout">
          <main className="pp-content">
            {policySections.map(sec => <PolicySection key={sec.id} section={sec} />)}
            <PPCta />
          </main>
        </div>
      </div>
    </>
  );
}