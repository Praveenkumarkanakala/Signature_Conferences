import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";


const FAQ_STYLES = `
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");

  :root {
    --gold:       #FCA311;
    --gold-dim:   rgba(252,163,17,.14);
    --gold-glow:  rgba(252,163,17,.32);
    --gold-border:rgba(252,163,17,.22);
    --navy:       #14213D;
    --navy-d:     #0d1728;
    --navy-l:     #1c2d52;
    --navy-card:  rgba(255,255,255,.04);
    --navy-hover: rgba(255,255,255,.07);
    --white:      #ffffff;
    --mute:       rgba(255,255,255,.45);
    --mute-dim:   rgba(255,255,255,.22);
    --border:     rgba(255,255,255,.08);
    --ease:       cubic-bezier(.2,.8,.2,1);
    --spring:     cubic-bezier(.34,1.56,.64,1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .faq-page {
    background: var(--navy-d);
    min-height: 100vh;
    font-family: "Roboto", sans-serif;
    color: var(--white);
    overflow-x: hidden;
  }

  /* ══ HERO ══ */
  .faq-hero {
    position: relative;
    padding: clamp(5rem,10vw,9rem) clamp(1.2rem,5vw,3rem) clamp(3rem,6vw,5rem);
    text-align: center;
    overflow: hidden;
    background: linear-gradient(160deg, #0a1220 0%, #0d1728 55%, #111e38 100%);
    border-bottom: 1px solid var(--border);
  }
  .faq-hero::before {
    content: '';
    position: absolute;
    top: -40%;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(252,163,17,.09) 0%, transparent 65%);
    pointer-events: none;
  }
  .faq-hero__grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(252,163,17,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(252,163,17,.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%);
  }

  .faq-hero__pill {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    border-radius: 100px;
    padding: 7px 18px;
    margin-bottom: 24px;
  }
  .faq-hero__pill-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 8px var(--gold-glow);
    animation: pillPulse 2s ease-in-out infinite;
  }
  @keyframes pillPulse {
    0%,100%{opacity:1;transform:scale(1)}
    50%{opacity:.4;transform:scale(.7)}
  }

  .faq-hero__title {
    position: relative;
    font: 900 clamp(2.4rem, 5.5vw, 5rem)/1.0 "Roboto", sans-serif;
    text-transform: uppercase;
    letter-spacing: -1.5px;
    color: var(--white);
    margin-bottom: 18px;
  }
  .faq-hero__title span {
    color: transparent;
    -webkit-text-stroke: 2px var(--gold);
  }
  .faq-hero__sub {
    position: relative;
    font: 300 clamp(0.9rem,1.5vw,1.05rem)/1.8 "Roboto", sans-serif;
    color: var(--mute);
    max-width: 480px;
    margin: 0 auto 2rem;
  }

  /* ── SEARCH BAR in hero ── */
  .faq-hero__search-wrap {
    position: relative;
    max-width: 480px;
    margin: 0 auto;
  }
  .faq-hero__search {
    width: 100%;
    padding: 14px 50px 14px 20px;
    background: rgba(255,255,255,.06);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-family: "Roboto", sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--white);
    outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
    backdrop-filter: blur(8px);
  }
  .faq-hero__search::placeholder { color: var(--mute); }
  .faq-hero__search:focus {
    border-color: var(--gold-border);
    background: rgba(255,255,255,.09);
    box-shadow: 0 0 0 3px var(--gold-dim);
  }
  .faq-hero__search-icon {
    position: absolute; right: 18px; top: 50%;
    transform: translateY(-50%);
    color: var(--mute); pointer-events: none;
    transition: color 0.2s;
  }
  .faq-hero__search-wrap:focus-within .faq-hero__search-icon { color: var(--gold); }

  /* ══ STATS ROW ══ */
  .faq-stats {
    display: flex;
    justify-content: center;
    gap: clamp(1.5rem,4vw,4rem);
    padding: clamp(1.2rem,3vw,2rem) clamp(1rem,4vw,3rem);
    background: rgba(255,255,255,.025);
    border-bottom: 1px solid var(--border);
    flex-wrap: wrap;
  }
  .faq-stat {
    display: flex; align-items: center; gap: 10px;
    font: 400 0.82rem/1 "Roboto", sans-serif;
    color: var(--mute);
  }
  .faq-stat__num {
    font: 700 1.1rem/1 "Roboto", sans-serif;
    color: var(--gold);
  }

  /* ══ BODY ══ */
  .faq-body {
    max-width: 1200px;
    margin: 0 auto;
    padding: clamp(2rem,5vw,4rem) clamp(1rem,4vw,3rem) clamp(4rem,8vw,7rem);
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: clamp(1.5rem,3vw,3rem);
    align-items: flex-start;
  }

  /* ══ SIDEBAR ══ */
  .faq-sidebar {
    position: sticky;
    top: 90px;
  }
  .faq-sidebar__label {
    font: 700 0.65rem/1 "Roboto", sans-serif;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--mute-dim);
    margin-bottom: 10px;
    padding: 0 4px;
  }
  .faq-cat-list {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .faq-cat-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 14px;
    border-radius: 10px;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    width: 100%;
    text-align: left;
    font-family: "Roboto", sans-serif;
    font-size: 0.86rem;
    font-weight: 500;
    color: var(--mute);
    transition: background 0.18s, color 0.18s, border-color 0.18s;
    position: relative;
  }
  .faq-cat-btn:hover {
    background: var(--navy-hover);
    color: var(--white);
    border-color: var(--border);
  }
  .faq-cat-btn--active {
    background: var(--gold-dim) !important;
    color: var(--gold) !important;
    border-color: var(--gold-border) !important;
    font-weight: 700;
  }
  .faq-cat-icon { font-size: 1rem; width: 20px; text-align: center; flex-shrink: 0; }
  .faq-cat-count {
    margin-left: auto;
    font-size: 0.72rem;
    font-weight: 600;
    background: var(--border);
    color: var(--mute);
    border-radius: 100px;
    padding: 2px 8px;
    min-width: 24px;
    text-align: center;
    transition: background 0.2s, color 0.2s;
  }
  .faq-cat-btn--active .faq-cat-count {
    background: var(--gold-dim);
    color: var(--gold);
  }

  /* ══ MAIN ══ */
  .faq-main { min-width: 0; }

  /* ── Section header ── */
  .faq-section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--border);
  }
  .faq-section-icon-wrap {
    width: 44px; height: 44px;
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; flex-shrink: 0;
  }
  .faq-section-title {
    font: 700 1.3rem/1.2 "Roboto", sans-serif;
    color: var(--white);
    letter-spacing: -0.3px;
  }
  .faq-section-desc {
    font: 300 0.82rem/1.6 "Roboto", sans-serif;
    color: var(--mute);
    margin-top: 3px;
  }

  /* ── Gold bar accent ── */
  .faq-gold-bar {
    width: 40px; height: 3px;
    background: var(--gold);
    border-radius: 2px;
    margin-bottom: 20px;
    box-shadow: 0 0 10px var(--gold-glow);
  }

  /* ── Accordion card ── */
  .faq-card {
    background: var(--navy-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }

  .faq-item { border-bottom: 1px solid var(--border); }
  .faq-item:last-child { border-bottom: none; }

  .faq-item__trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 22px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-size: 0.92rem;
    font-weight: 500;
    color: rgba(255,255,255,.82);
    text-align: left;
    transition: background 0.18s, color 0.18s;
    line-height: 1.55;
  }
  .faq-item__trigger:hover {
    background: var(--navy-hover);
    color: var(--white);
  }
  .faq-item__trigger--open {
    background: var(--gold-dim);
    color: var(--gold);
  }

  .faq-item__chevron {
    width: 30px; height: 30px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    background: rgba(255,255,255,.04);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background 0.25s, border-color 0.25s, transform 0.3s var(--ease);
    color: var(--mute);
  }
  .faq-item__trigger--open .faq-item__chevron {
    background: var(--gold);
    border-color: var(--gold);
    color: #000;
    transform: rotate(180deg);
  }

  .faq-item__body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s var(--ease), opacity 0.3s ease;
    opacity: 0;
  }
  .faq-item__body--open { max-height: 600px; opacity: 1; }

  .faq-item__answer {
    padding: 16px 22px 20px;
    font: 300 0.9rem/1.85 "Roboto", sans-serif;
    color: var(--mute);
    border-top: 1px solid var(--border);
  }

  /* ── Result bar ── */
  .faq-result-bar {
    font: 400 0.82rem/1 "Roboto", sans-serif;
    color: var(--mute);
    margin-bottom: 20px;
    padding: 10px 16px;
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    border-radius: 8px;
  }
  .faq-result-bar strong { color: var(--gold); font-weight: 700; }

  /* ── Empty state ── */
  .faq-empty {
    text-align: center;
    padding: 60px 20px;
    color: var(--mute);
  }
  .faq-empty__icon { font-size: 2.8rem; margin-bottom: 14px; }
  .faq-empty__title {
    font: 700 1.2rem/1.3 "Roboto", sans-serif;
    color: rgba(255,255,255,.6);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .faq-empty__sub { font: 300 0.88rem/1.6 "Roboto", sans-serif; }

  /* ── Contact CTA ── */
  .faq-cta {
    margin-top: clamp(2rem,4vw,3rem);
    padding: clamp(1.8rem,3vw,2.5rem) clamp(1.5rem,3vw,2.5rem);
    background: linear-gradient(120deg, rgba(252,163,17,.07) 0%, rgba(252,163,17,.03) 100%);
    border: 1px solid var(--gold-border);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .faq-cta__text h3 {
    font: 700 1rem/1.3 "Roboto", sans-serif;
    color: var(--white);
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .faq-cta__text p {
    font: 300 0.85rem/1.6 "Roboto", sans-serif;
    color: var(--mute);
  }
  .faq-cta__btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px;
    background: var(--gold); color: #000;
    font: 700 0.8rem/1 "Roboto", sans-serif;
    letter-spacing: 1px; text-transform: uppercase;
    border: none; border-radius: 8px; cursor: pointer;
    box-shadow: 0 4px 18px var(--gold-glow);
    transition: transform 0.25s var(--spring), box-shadow 0.25s;
    white-space: nowrap; flex-shrink: 0;
  }
  .faq-cta__btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px var(--gold-glow);
  }

  /* ══ MOBILE TABS (replaces sidebar on mobile) ══ */
  .faq-mobile-tabs {
    display: none;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    gap: 8px;
    padding: 0 0 4px;
    margin-bottom: 20px;
  }
  .faq-mobile-tabs::-webkit-scrollbar { display: none; }
  .faq-mobile-tab {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 16px;
    background: var(--navy-card);
    border: 1px solid var(--border);
    border-radius: 100px;
    font: 500 0.8rem/1 "Roboto", sans-serif;
    color: var(--mute);
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.18s, color 0.18s, border-color 0.18s;
    flex-shrink: 0;
  }
  .faq-mobile-tab:hover { background: var(--navy-hover); color: var(--white); }
  .faq-mobile-tab--active {
    background: var(--gold-dim) !important;
    color: var(--gold) !important;
    border-color: var(--gold-border) !important;
    font-weight: 700;
  }

  /* ══ RESPONSIVE ══ */
  @media (max-width: 900px) {
    .faq-body {
      grid-template-columns: 1fr;
      gap: 0;
    }
    .faq-sidebar { display: none; }
    .faq-mobile-tabs { display: flex; }
    .faq-stats { gap: 1.5rem; }
  }

  @media (max-width: 600px) {
    .faq-hero { padding: 4rem 1.2rem 2.5rem; }
    .faq-hero__title { letter-spacing: -0.5px; }
    .faq-body { padding: 1.5rem 1rem 4rem; }
    .faq-item__trigger { padding: 15px 16px; font-size: 0.87rem; }
    .faq-item__answer  { padding: 14px 16px 18px; }
    .faq-section-header { gap: 10px; }
    .faq-section-icon-wrap { width: 38px; height: 38px; font-size: 1rem; }
    .faq-cta { flex-direction: column; align-items: flex-start; }
    .faq-cta__btn { width: 100%; justify-content: center; }
    .faq-stats { gap: 1rem; padding: 1rem; }
    .faq-stat__num { font-size: 0.95rem; }
  }

  @media (max-width: 400px) {
    .faq-hero__title { letter-spacing: 0; }
    .faq-mobile-tab { padding: 8px 12px; font-size: 0.75rem; }
  }
`;

/* ── DATA ── */
const faqCategories = [
  { id: "general",      label: "General",       icon: "🌐", desc: "Overview of our conferences and mission." },
  { id: "registration", label: "Registration",  icon: "🎟️", desc: "How to register, ticket types, and transfers." },
  { id: "speaking",     label: "Speaking",       icon: "🎤", desc: "Apply to speak and what to expect on stage." },
  { id: "experience",   label: "Experience",     icon: "✨", desc: "What happens at the event, day by day." },
  { id: "refunds",      label: "Refunds",        icon: "📄", desc: "Our cancellation and refund guidelines." },
  { id: "networking",   label: "Networking",     icon: "🤝", desc: "Connecting with speakers and attendees." },
];

const faqs = [
  { id:"g1", category:"general", question:"What is Signature Global Conferences?", answer:"Signature Global Conferences is a premier international platform dedicated to inspiring voices, empowering leaders, and creating meaningful global impact. We bring together entrepreneurs, professionals, coaches, and changemakers from across the world for immersive conference experiences hosted in some of the most influential cities globally." },
  { id:"g2", category:"general", question:"Where are the conferences held?", answer:"Our conferences are hosted in influential cities around the world. Each event is carefully curated to reflect the global nature of our community. Specific venue details are announced for each conference — check our Events page for upcoming locations and dates." },
  { id:"g3", category:"general", question:"Who attends Signature Global Conferences?", answer:"Our attendees include entrepreneurs, business leaders, coaches, motivational speakers, corporate professionals, emerging leaders, and changemakers from diverse industries and countries. Whether you're just starting your journey or are an established authority in your field, our conferences are designed to elevate your impact." },
  { id:"g4", category:"general", question:"How often do you host conferences?", answer:"We host multiple conferences throughout the year across different regions. Each conference has its own theme, lineup of speakers, and unique experience. Subscribe to our newsletter or follow us on social media to stay informed about upcoming events." },
  { id:"r1", category:"registration", question:"How do I register for a conference?", answer:"Registration is simple — visit our Events page, select the conference you'd like to attend, choose your ticket type, and complete the secure checkout process. You'll receive a confirmation email with all event details immediately after registering." },
  { id:"r2", category:"registration", question:"What ticket types are available?", answer:"We offer several ticket tiers: General Admission (access to all keynote sessions and networking areas), VIP (priority seating, exclusive networking sessions, and a speaker meet-and-greet), and Premium/All-Access passes that include workshops, backstage access, and additional perks." },
  { id:"r3", category:"registration", question:"Can I register a group or team?", answer:"Absolutely! We encourage group registrations and offer group discounts for teams of 5 or more. Please contact us directly at events@signatureglobalconferences.com to arrange group bookings and discuss available pricing." },
  { id:"r4", category:"registration", question:"Will I receive a confirmation after registering?", answer:"Yes. Upon successful registration, you will receive an email confirmation with your ticket(s), event details, venue information, and a schedule overview. Please check your spam folder if you don't see it within a few minutes." },
  { id:"r5", category:"registration", question:"Is my registration transferable?", answer:"Yes, tickets can be transferred to another individual up to 7 days before the event. Please contact us with the new attendee's full name and email address to process the transfer. Some ticket types may have specific transfer restrictions." },
  { id:"s1", category:"speaking", question:"How can I apply to speak?", answer:"We welcome speaker applications from leaders, experts, coaches, and storytellers across all industries. You can submit your speaking application through the 'Speak at an Event' section on our website. Include your bio, area of expertise, proposed topic, and any previous speaking experience." },
  { id:"s2", category:"speaking", question:"What kind of speakers do you look for?", answer:"We look for authentic, purpose-driven individuals with a powerful story or expertise to share. You don't need to be a celebrity or have a massive following — what matters is your ability to inspire, educate, or create transformation in your audience. We celebrate emerging voices as much as established leaders." },
  { id:"s3", category:"speaking", question:"Are speakers compensated?", answer:"Speaker compensation varies depending on the event format, the speaker's level of experience, and the nature of the engagement. In many cases, speakers receive complimentary full-access passes, promotional exposure to our global community, and travel support. Specific arrangements are discussed during the application process." },
  { id:"s4", category:"speaking", question:"What is the format for speaking sessions?", answer:"Sessions typically range from 15-minute spotlight talks to 45-minute keynotes, with panel discussions and workshop formats also available. We work closely with each speaker to determine the best format for their message and audience." },
  { id:"e1", category:"experience", question:"What can I expect from the conference?", answer:"Expect an immersive, high-energy environment featuring world-class keynote sessions, curated panel discussions, hands-on workshops, and meaningful networking opportunities. Our conferences are designed to leave you with clarity, inspiration, new connections, and a renewed vision for your personal and professional journey." },
  { id:"e2", category:"experience", question:"Will sessions be recorded or available online?", answer:"Select sessions may be recorded and made available to registered attendees after the event. VIP and All-Access pass holders typically receive extended access to recordings. Details are announced on a per-event basis." },
  { id:"e3", category:"experience", question:"Is there a dress code?", answer:"We encourage smart-professional or business-casual attire. Our conferences attract leaders and changemakers from around the world. Some gala evenings may call for formal attire — this will be communicated in advance." },
  { id:"e4", category:"experience", question:"Are meals and refreshments provided?", answer:"Most conference packages include refreshments during breaks and networking sessions. Some ticket tiers include full catered lunches or gala dinners. Specific meal inclusions are listed under each ticket type on the event registration page." },
  { id:"ref1", category:"refunds", question:"What is your refund policy?", answer:"Refunds are available up to 30 days before the event date. Requests made 15–30 days before the event are eligible for a 50% refund. No refunds are issued within 14 days of the event; however, you may transfer your ticket to another attendee." },
  { id:"ref2", category:"refunds", question:"What if the conference is cancelled or postponed?", answer:"In the unlikely event of a cancellation, all registered attendees will receive a full refund or the option to transfer their registration to a rescheduled date. We will communicate any changes as early as possible via email and our official communication channels." },
  { id:"ref3", category:"refunds", question:"How long does a refund take to process?", answer:"Approved refunds are processed within 7–10 business days. The time it takes for the funds to appear in your account depends on your bank or payment provider. If you have not received your refund after 10 business days, please contact us." },
  { id:"n1", category:"networking", question:"Are there dedicated networking sessions?", answer:"Yes! Networking is a core pillar of every Signature Global Conference. We host structured networking sessions, roundtable discussions, and social events specifically designed to help attendees build meaningful, lasting connections with fellow leaders and changemakers from around the world." },
  { id:"n2", category:"networking", question:"Is there a community I can join after the conference?", answer:"All attendees gain access to our exclusive post-conference community where you can continue conversations, collaborate on projects, access shared resources, and stay connected with speakers and fellow attendees. Details are shared at the event." },
  { id:"n3", category:"networking", question:"Can I connect with speakers directly?", answer:"VIP and All-Access pass holders enjoy dedicated speaker meet-and-greet sessions. General attendees may also have opportunities to connect with speakers during open networking periods. We design our events intentionally to break down barriers between speakers and the audience." },
];

/* ── ACCORDION ITEM ── */
function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className={`faq-item__trigger${open ? " faq-item__trigger--open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <span className="faq-item__chevron">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      <div className={`faq-item__body${open ? " faq-item__body--open" : ""}`}>
        <div className="faq-item__answer">{item.answer}</div>
      </div>
    </div>
  );
}

/* ── PANEL ── */
function FaqPanel({ activeCat, allItems, search }) {
  const navigate = useNavigate();
  const isSearching = search.trim().length > 0;
  const cat = faqCategories.find(c => c.id === activeCat);
  const items = isSearching ? allItems : allItems.filter(f => f.category === activeCat);

  return (
    <>
      {isSearching ? (
        <p className="faq-result-bar">
          Showing <strong>{items.length}</strong> result{items.length !== 1 ? "s" : ""} for "{search}"
        </p>
      ) : (
        cat && (
          <div className="faq-section-header">
            <div className="faq-section-icon-wrap">{cat.icon}</div>
            <div>
              <div className="faq-section-title">{cat.label}</div>
              <div className="faq-section-desc">{cat.desc}</div>
            </div>
          </div>
        )
      )}

      <div className="faq-gold-bar" />

      {items.length === 0 ? (
        <div className="faq-empty">
          <div className="faq-empty__icon">🔍</div>
          <h3 className="faq-empty__title">No results found</h3>
          <p className="faq-empty__sub">Try a different term or browse a category.</p>
        </div>
      ) : (
        <div className="faq-card">
          {items.map(item => <FaqItem key={item.id} item={item} />)}
        </div>
      )}

      <div className="faq-cta">
        <div className="faq-cta__text">
          <h3>Still have questions?</h3>
          <p>Can't find what you're looking for? Our team is happy to help.</p>
        </div>
        <button className="faq-cta__btn" onClick={() => navigate("/contact")}>
          Contact Us
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </button>
      </div>
    </>
  );
}

/* ── ROOT ── */
export default function FAQ() {
  const [activeCat, setActiveCat] = useState("general");
  const [search, setSearch] = useState("");

  const catCounts = useMemo(() => {
    const map = {};
    faqCategories.forEach(c => { map[c.id] = faqs.filter(f => f.category === c.id).length; });
    return map;
  }, []);

  const filteredAll = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return faqs;
    return faqs.filter(f =>
      f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [search]);

  const handleCat = (id) => { setActiveCat(id); setSearch(""); };

  return (
    <>
      <style>{FAQ_STYLES}</style>
      <div className="faq-page">

        {/* HERO */}
        <section className="faq-hero">
          <div className="faq-hero__grid" />
          <div className="faq-hero__pill">
            <span className="faq-hero__pill-dot" />
            Help Center
          </div>
          <h1 className="faq-hero__title">
            Frequently Asked<br /><span>Questions</span>
          </h1>
          <p className="faq-hero__sub">
            Trusted by leaders in 100+ countries. Find answers about our global conferences below.
          </p>
          <div className="faq-hero__search-wrap">
            <input
              className="faq-hero__search"
              type="text"
              placeholder="Search questions…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="faq-hero__search-icon">
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
        </section>

        {/* STATS */}
        <div className="faq-stats">
          {[["23", "Questions Answered"],["6", "Categories"],["100+", "Countries Served"],["24h", "Response Time"]].map(([n,l]) => (
            <div className="faq-stat" key={l}>
              <span className="faq-stat__num">{n}</span>
              <span>{l}</span>
            </div>
          ))}
        </div>

        {/* BODY */}
        <div className="faq-body">

          {/* DESKTOP SIDEBAR */}
          <aside className="faq-sidebar">
            <p className="faq-sidebar__label">Categories</p>
            <div className="faq-cat-list">
              {faqCategories.map(cat => (
                <button
                  key={cat.id}
                  className={`faq-cat-btn${activeCat === cat.id && !search ? " faq-cat-btn--active" : ""}`}
                  onClick={() => handleCat(cat.id)}
                >
                  <span className="faq-cat-icon">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className="faq-cat-count">{catCounts[cat.id]}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* MAIN */}
          <main className="faq-main">
            {/* MOBILE TABS */}
            <div className="faq-mobile-tabs">
              {faqCategories.map(cat => (
                <button
                  key={cat.id}
                  className={`faq-mobile-tab${activeCat === cat.id && !search ? " faq-mobile-tab--active" : ""}`}
                  onClick={() => handleCat(cat.id)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            <FaqPanel activeCat={activeCat} allItems={filteredAll} search={search} />
          </main>

        </div>
      </div>
    </>
  );
}