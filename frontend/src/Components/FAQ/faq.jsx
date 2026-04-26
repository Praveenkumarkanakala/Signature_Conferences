import { useState, useMemo } from "react";
import speakerAvatar from "./faq.jpeg";

const FAQ_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  :root {
    --gold: #FCA311;
    --gold-dim: rgba(252, 163, 17, 0.15);
    --gold-glow: rgba(252, 163, 17, 0.32);
    --navy: #14213D;
    --navy-d: #0d1728;
    --navy-l: #1c2d52;
    --white: #FFFFFF;
    --mute: rgba(255, 255, 255, 0.48);
    --ease: cubic-bezier(.2, .8, .2, 1);
  }

  /* ── PAGE ── */
  .faq-page {
    background: var(--navy-d);
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
  }

  /* ── HERO ── */
  .faq-hero {
    position: relative;
    overflow: hidden;
    padding: 110px 40px 90px;
    text-align: center;
    background: linear-gradient(
      160deg,
      var(--navy-d) 0%,
      var(--navy) 40%,
      var(--navy-l) 70%,
      #2a3a6e 100%
    );
  }

  .faq-hero__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    animation: faqOrbFloat ease-in-out infinite alternate;
  }
  .faq-hero__orb--1 {
    width: 500px;
    height: 500px;
    top: -180px;
    left: -100px;
    background: radial-gradient(circle, var(--gold-dim) 0%, transparent 70%);
    animation-duration: 7s;
  }
  .faq-hero__orb--2 {
    width: 400px;
    height: 400px;
    bottom: -120px;
    right: -80px;
    background: radial-gradient(circle, rgba(252, 163, 17, 0.18) 0%, transparent 70%);
    animation-duration: 9s;
    animation-delay: -3s;
  }
  .faq-hero__orb--3 {
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, var(--gold-dim) 0%, transparent 70%);
    animation-duration: 11s;
    animation-delay: -5s;
  }

  @keyframes faqOrbFloat {
    0% { transform: scale(1) translate(0, 0); }
    100% { transform: scale(1.15) translate(20px, -20px); }
  }

  .faq-hero__shapes {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .faq-geo {
    position: absolute;
    opacity: 0;
    animation: faqGeoIn 0.8s forwards, faqGeoDrift linear infinite;
  }
  .faq-geo:nth-child(1) {
    width: 70px;
    height: 70px;
    top: 15%;
    left: 8%;
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    background: var(--gold-dim);
    animation-delay: 0.2s, 0.2s;
    animation-duration: 0.8s, 20s;
  }
  .faq-geo:nth-child(2) {
    width: 45px;
    height: 45px;
    top: 60%;
    left: 5%;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    background: rgba(252, 163, 17, 0.1);
    animation-delay: 0.4s, 0.4s;
    animation-duration: 0.8s, 16s;
  }
  .faq-geo:nth-child(3) {
    width: 90px;
    height: 90px;
    top: 10%;
    right: 10%;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    background: var(--gold-dim);
    animation-delay: 0.3s, 0.3s;
    animation-duration: 0.8s, 24s;
  }
  .faq-geo:nth-child(4) {
    width: 55px;
    height: 55px;
    top: 70%;
    right: 8%;
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    background: rgba(252, 163, 17, 0.12);
    animation-delay: 0.5s, 0.5s;
    animation-duration: 0.8s, 18s;
  }
  .faq-geo:nth-child(5) {
    width: 35px;
    height: 35px;
    top: 40%;
    left: 50%;
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    background: var(--gold-dim);
    animation-delay: 0.6s, 0.6s;
    animation-duration: 0.8s, 14s;
  }

  @keyframes faqGeoIn {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes faqGeoDrift {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-18px) rotate(180deg); }
  }

  .faq-hero::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), var(--gold), var(--gold), transparent);
    box-shadow: 0 0 10px var(--gold-glow);
  }

  .faq-hero__inner {
    position: relative;
    z-index: 2;
    max-width: 760px;
    margin: 0 auto;
    animation: faqFadeUp 0.9s ease both;
  }

  @keyframes faqFadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .faq-hero__eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
    padding: 6px 18px;
    border: 1px solid rgba(252, 163, 17, 0.3);
    border-radius: 100px;
    background: var(--gold-dim);
  }

  .faq-hero__title {
    font-family: 'Roboto', sans-serif;
    font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 900;
    color: var(--white);
    line-height: 1.05;
    margin-bottom: 20px;
    letter-spacing: -1px;
    text-transform: uppercase;
  }
  .faq-hero__title em {
    font-style: italic;
    color: var(--gold);
    display: block;
  }

  .faq-hero__sub {
    font-size: 1rem;
    line-height: 1.75;
    color: var(--mute);
    max-width: 520px;
    margin: 0 auto;
  }

  /* ── BODY ── */
  .faq-body {
    background: var(--navy);
    padding-bottom: 80px;
  }

  .faq-body__inner {
    max-width: 860px;
    margin: 0 auto;
    padding: 60px 40px 0;
  }

  /* ── SEARCH ── */
  .faq-search-wrap {
    position: relative;
    max-width: 520px;
    margin-bottom: 32px;
  }

  .faq-search {
    width: 100%;
    padding: 14px 48px 14px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(252, 163, 17, 0.2);
    border-radius: 100px;
    font-family: 'Roboto', sans-serif;
    font-size: 0.95rem;
    color: var(--white);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
  }
  .faq-search:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px var(--gold-dim);
    background: rgba(252, 163, 17, 0.08);
  }
  .faq-search-icon {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    pointer-events: none;
    color: var(--gold);
  }

  /* ── COUNT ── */
  .faq-count {
    font-size: 0.8rem;
    color: var(--mute);
    margin-bottom: 32px;
    letter-spacing: 0.05em;
  }
  .faq-count span {
    color: var(--gold);
    font-weight: 600;
  }

  /* ── GROUP LABEL ── */
  .faq-group {
    margin-bottom: 16px;
  }

  .faq-group__label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(252, 163, 17, 0.2);
  }

  .faq-group__icon-wrap {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: rgba(252, 163, 17, 0.1);
    border: 1px solid rgba(252, 163, 17, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .faq-group__title {
    font-family: 'Roboto', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--white);
    letter-spacing: 0.01em;
    text-transform: uppercase;
  }

  .faq-group__line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(252, 163, 17, 0.3), transparent);
  }

  /* ── CHAT ITEMS ── */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 40px;
  }

  .faq-chat-row {
    padding: 10px 0;
  }

  .faq-chat-question {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 0;
  }
  .faq-chat-question--right { justify-content: flex-end; }
  .faq-chat-question--left { justify-content: flex-start; }

  .faq-chat-toggle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid rgba(252, 163, 17, 0.2);
    background: rgba(252, 163, 17, 0.1);
    color: var(--gold);
    font-size: 1.2rem;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.2s, border-color 0.2s;
    line-height: 1;
  }
  .faq-chat-toggle:hover {
    background: rgba(252, 163, 17, 0.2);
    transform: scale(1.05);
    border-color: var(--gold);
  }
  .faq-chat-toggle--open {
    background: rgba(252, 163, 17, 0.25);
    border-color: var(--gold);
  }

  .faq-chat-bubble-q {
    background: var(--navy-l);
    color: var(--white);
    padding: 14px 22px;
    font-family: 'Roboto', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    line-height: 1.5;
    max-width: 540px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    border: 1px solid rgba(252, 163, 17, 0.1);
    user-select: none;
  }
  .faq-chat-bubble-q:hover {
    background: rgba(252, 163, 17, 0.08);
    border-color: rgba(252, 163, 17, 0.3);
  }
  .faq-chat-bubble-q--right { border-radius: 24px 24px 4px 24px; }
  .faq-chat-bubble-q--left { border-radius: 24px 24px 24px 4px; }

  .faq-chat-answer-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    margin-top: 0;
    transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.3s ease,
                margin-top 0.3s ease;
  }
  .faq-chat-answer-row--open {
    max-height: 600px;
    opacity: 1;
    margin-top: 10px;
  }
  .faq-chat-answer-row--left { justify-content: flex-start; }
  .faq-chat-answer-row--right { justify-content: flex-end; }

  .faq-chat-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 2px solid rgba(252, 163, 17, 0.3);
    background: var(--navy);
  }
  .faq-chat-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .faq-chat-bubble-a {
    background: var(--navy-l);
    border: 1px solid rgba(252, 163, 17, 0.2);
    color: var(--mute);
    padding: 16px 22px;
    border-radius: 4px 24px 24px 24px;
    font-family: 'Roboto', sans-serif;
    font-size: 0.93rem;
    line-height: 1.8;
    max-width: 540px;
  }
  .faq-chat-answer-row--right .faq-chat-bubble-a {
    border-radius: 24px 4px 24px 24px;
  }

  /* ── EMPTY STATE ── */
  .faq-empty {
    text-align: center;
    padding: 80px 20px;
    color: var(--mute);
  }
  .faq-empty__icon {
    font-size: 3.5rem;
    margin-bottom: 16px;
  }
  .faq-empty__title {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    color: var(--white);
    margin-bottom: 10px;
    font-weight: 700;
  }
  .faq-empty__sub {
    font-size: 0.9rem;
    line-height: 1.7;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .faq-hero { padding: 80px 24px 60px; }
    .faq-body__inner { padding: 40px 20px 0; }
    .faq-chat-bubble-q,
    .faq-chat-bubble-a { max-width: 80vw; }
    .faq-hero__title { font-size: 2.6rem; }
  }
  @media (max-width: 480px) {
    .faq-hero__title { font-size: 2.1rem; }
    .faq-chat-bubble-q,
    .faq-chat-bubble-a { font-size: 0.88rem; }
  }
`;

/* ══════════════════════════════════════════
   FAQ DATA
   ══════════════════════════════════════════ */
const faqCategories = [
  { id: "general", label: "General", icon: "🌐" },
  { id: "registration", label: "Registration & Tickets", icon: "🎟️" },
  { id: "speaking", label: "Speaking & Presenting", icon: "🎤" },
  { id: "experience", label: "Event Experience", icon: "✨" },
  { id: "refunds", label: "Refunds & Policies", icon: "📄" },
  { id: "networking", label: "Networking & Community", icon: "🤝" },
];

const faqs = [
  { id: "g1", category: "general",
    question: "What is Signature Global Conferences?",
    answer: "Signature Global Conferences is a premier international platform dedicated to inspiring voices, empowering leaders, and creating meaningful global impact. We bring together entrepreneurs, professionals, coaches, and changemakers from across the world for immersive conference experiences hosted in some of the most influential cities globally." },
  { id: "g2", category: "general",
    question: "Where are the conferences held?",
    answer: "Our conferences are hosted in influential cities around the world. Each event is carefully curated to reflect the global nature of our community. Specific venue details are announced for each conference — check our Events page for upcoming locations and dates." },
  { id: "g3", category: "general",
    question: "Who attends Signature Global Conferences?",
    answer: "Our attendees include entrepreneurs, business leaders, coaches, motivational speakers, corporate professionals, emerging leaders, and changemakers from diverse industries and countries. Whether you're just starting your journey or are an established authority in your field, our conferences are designed to elevate your impact." },
  { id: "g4", category: "general",
    question: "How often do you host conferences?",
    answer: "We host multiple conferences throughout the year across different regions. Each conference has its own theme, lineup of speakers, and unique experience. Subscribe to our newsletter or follow us on social media to stay informed about upcoming events." },
  { id: "r1", category: "registration",
    question: "How do I register for a conference?",
    answer: "Registration is simple — visit our Events page, select the conference you'd like to attend, choose your ticket type, and complete the secure checkout process. You'll receive a confirmation email with all event details immediately after registering." },
  { id: "r2", category: "registration",
    question: "What ticket types are available?",
    answer: "We offer several ticket tiers to suit different needs: General Admission (access to all keynote sessions and networking areas), VIP (priority seating, exclusive networking sessions, and a speaker meet-and-greet), and Premium/All-Access passes that include workshops, backstage access, and additional perks. Specific tiers vary by event." },
  { id: "r3", category: "registration",
    question: "Can I register a group or team?",
    answer: "Absolutely! We encourage group registrations and offer group discounts for teams of 5 or more. Please contact us directly at events@signatureglobalconferences.com to arrange group bookings and discuss available pricing." },
  { id: "r4", category: "registration",
    question: "Will I receive a confirmation after registering?",
    answer: "Yes. Upon successful registration, you will receive an email confirmation with your ticket(s), event details, venue information, and a schedule overview. Please check your spam folder if you don't see it within a few minutes." },
  { id: "r5", category: "registration",
    question: "Is my registration transferable to another person?",
    answer: "Yes, tickets can be transferred to another individual up to 7 days before the event. Please contact us with the new attendee's full name and email address to process the transfer. Some ticket types may have specific transfer restrictions." },
  { id: "s1", category: "speaking",
    question: "How can I apply to speak at a Signature Global Conference?",
    answer: "We welcome speaker applications from leaders, experts, coaches, and storytellers across all industries. You can submit your speaking application through the 'Speak at an Event' section on our website. Include your bio, area of expertise, proposed topic, and any previous speaking experience." },
  { id: "s2", category: "speaking",
    question: "What kind of speakers do you look for?",
    answer: "We look for authentic, purpose-driven individuals with a powerful story or expertise to share. You don't need to be a celebrity or have a massive following — what matters is your ability to inspire, educate, or create transformation in your audience. We celebrate emerging voices as much as established leaders." },
  { id: "s3", category: "speaking",
    question: "Are speakers compensated?",
    answer: "Speaker compensation varies depending on the event format, the speaker's level of experience, and the nature of the engagement. In many cases, speakers receive complimentary full-access passes, promotional exposure to our global community, and travel support. Specific arrangements are discussed during the application process." },
  { id: "s4", category: "speaking",
    question: "What is the format for speaking sessions?",
    answer: "Sessions typically range from 15-minute spotlight talks to 45-minute keynotes, with panel discussions and workshop formats also available. We work closely with each speaker to determine the best format for their message and audience." },
  { id: "e1", category: "experience",
    question: "What can I expect from the conference experience?",
    answer: "Expect an immersive, high-energy environment featuring world-class keynote sessions, curated panel discussions, hands-on workshops, and meaningful networking opportunities. Our conferences are designed to leave you with clarity, inspiration, new connections, and a renewed vision for your personal and professional journey." },
  { id: "e2", category: "experience",
    question: "Will sessions be recorded or available online?",
    answer: "Select sessions may be recorded and made available to registered attendees after the event. VIP and All-Access pass holders typically receive extended access to recordings. Details are announced on a per-event basis, so check your event information page for specifics." },
  { id: "e3", category: "experience",
    question: "Is there a dress code for the conferences?",
    answer: "We encourage smart-professional or business-casual attire. Our conferences attract leaders and changemakers from around the world, and we want everyone to feel confident and powerful. Some gala evenings or special events within a conference may call for formal attire — this will be communicated in advance." },
  { id: "e4", category: "experience",
    question: "Are meals and refreshments provided?",
    answer: "Most conference packages include refreshments during breaks and networking sessions. Some ticket tiers include full catered lunches or gala dinners. Specific meal inclusions are listed under each ticket type on the event registration page." },
  { id: "ref1", category: "refunds",
    question: "What is your refund policy?",
    answer: "Refunds are available up to 30 days before the event date. Requests made 15–30 days before the event are eligible for a 50% refund. No refunds are issued within 14 days of the event; however, you may transfer your ticket to another attendee. Please contact us promptly if you need to make any changes." },
  { id: "ref2", category: "refunds",
    question: "What happens if the conference is cancelled or postponed?",
    answer: "In the unlikely event of a cancellation, all registered attendees will receive a full refund or the option to transfer their registration to a rescheduled date. We will communicate any changes as early as possible via email and our official communication channels." },
  { id: "ref3", category: "refunds",
    question: "How long does it take to process a refund?",
    answer: "Approved refunds are processed within 7–10 business days. The time it takes for the funds to appear in your account depends on your bank or payment provider. If you have not received your refund after 10 business days, please contact us." },
  { id: "n1", category: "networking",
    question: "Are there dedicated networking sessions?",
    answer: "Yes! Networking is a core pillar of every Signature Global Conference. We host structured networking sessions, roundtable discussions, and social events specifically designed to help attendees build meaningful, lasting connections with fellow leaders and changemakers from around the world." },
  { id: "n2", category: "networking",
    question: "Is there a community I can join after the conference?",
    answer: "Absolutely. All attendees gain access to our exclusive post-conference community where you can continue conversations, collaborate on projects, access shared resources, and stay connected with speakers and fellow attendees. Details are shared at the event." },
  { id: "n3", category: "networking",
    question: "Can I connect with speakers directly at the event?",
    answer: "VIP and All-Access pass holders enjoy dedicated speaker meet-and-greet sessions. General attendees may also have opportunities to connect with speakers during open networking periods. We design our events intentionally to break down barriers between speakers and the audience." },
];

/* ══════════════════════════════════════════
   HERO COMPONENT
   ══════════════════════════════════════════ */
function FaqHero() {
  return (
    <section className="faq-hero">
      <div className="faq-hero__orb faq-hero__orb--1" />
      <div className="faq-hero__orb faq-hero__orb--2" />
      <div className="faq-hero__orb faq-hero__orb--3" />
      <div className="faq-hero__shapes">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="faq-geo" />
        ))}
      </div>
      <div className="faq-hero__inner">
        <span className="faq-hero__eyebrow">Support &amp; Knowledge</span>
        <h1 className="faq-hero__title">
          Frequently Asked
          <em>Questions</em>
        </h1>
        <p className="faq-hero__sub">
          Everything you need to know about Signature Global Conferences —
          from registration to the stage.
        </p>
      </div>
    </section>
  );
}

/* ══════════════ SINGLE FAQ ITEM ════════════ */
function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const isRight = index % 2 !== 0;
  const toggle = () => setOpen((o) => !o);

  return (
    <div className="faq-chat-row">
      <div className={`faq-chat-question faq-chat-question--${isRight ? "right" : "left"}`}>
        {!isRight && (
          <button
            className={`faq-chat-toggle${open ? " faq-chat-toggle--open" : ""}`}
            onClick={toggle}
            aria-expanded={open}
          >
            {open ? "−" : "+"}
          </button>
        )}
        <div
          className={`faq-chat-bubble-q faq-chat-bubble-q--${isRight ? "right" : "left"}`}
          onClick={toggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle()}
        >
          {item.question}
        </div>
        {isRight && (
          <button
            className={`faq-chat-toggle${open ? " faq-chat-toggle--open" : ""}`}
            onClick={toggle}
            aria-expanded={open}
          >
            {open ? "−" : "+"}
          </button>
        )}
      </div>

      <div className={`faq-chat-answer-row${open ? " faq-chat-answer-row--open" : ""} faq-chat-answer-row--${isRight ? "right" : "left"}`}>
        {!isRight && (
          <div className="faq-chat-avatar">
            <img src={speakerAvatar} alt="SGC representative" />
          </div>
        )}
        <div className="faq-chat-bubble-a">{item.answer}</div>
        {isRight && (
          <div className="faq-chat-avatar">
            <img src={speakerAvatar} alt="SGC representative" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════ FAQ GROUP  ══════════════ */
function FaqGroup({ categoryId, items }) {
  const cat = faqCategories.find((c) => c.id === categoryId);
  if (!cat || items.length === 0) return null;

  return (
    <div className="faq-group">
      <div className="faq-group__label">
        <div className="faq-group__icon-wrap">{cat.icon}</div>
        <h2 className="faq-group__title">{cat.label}</h2>
        <div className="faq-group__line" />
      </div>
      <div className="faq-list">
        {items.map((item, idx) => (
          <FaqItem key={item.id} item={item} index={idx} />
        ))}
      </div>
    </div>
  );
}

/* ════════════ SEARCH BAR  ═══════════════════ */
function FaqSearch({ search, onSearch }) {
  return (
    <div className="faq-search-wrap">
      <input
        className="faq-search"
        type="text"
        placeholder="Search questions..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className="faq-search-icon">🔍</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   ROOT COMPONENT
   ══════════════════════════════════════════ */
export default function FAQ() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return faqs.filter(
      (item) =>
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    const map = {};
    faqCategories.forEach((cat) => {
      map[cat.id] = filtered.filter((f) => f.category === cat.id);
    });
    return map;
  }, [filtered]);

  return (
    <>
      <style>{FAQ_STYLES}</style>

      <div className="faq-page">
        <FaqHero />

        <div className="faq-body">
          <div className="faq-body__inner">
            <FaqSearch search={search} onSearch={setSearch} />

            <p className="faq-count">
              Showing <span>{filtered.length}</span> of <span>{faqs.length}</span> questions
            </p>

            {filtered.length === 0 && (
              <div className="faq-empty">
                <div className="faq-empty__icon">🔍</div>
                <h3 className="faq-empty__title">No results found</h3>
                <p className="faq-empty__sub">Try a different search term.</p>
              </div>
            )}

            {faqCategories.map((cat) => (
              <FaqGroup
                key={cat.id}
                categoryId={cat.id}
                items={grouped[cat.id] || []}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}