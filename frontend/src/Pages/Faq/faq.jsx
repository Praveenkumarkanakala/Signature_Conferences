import { useState, useMemo } from "react";
import speakerAvatar from "./faq.jpeg";

const FAQ_STYLES = `
  @import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap");

  :root {
    --faq-bg:           #f8f8f6;
    --faq-surface:      #ffffff;
    --faq-border:       #e8e8e4;
    --faq-accent:       #4a4af0;
    --faq-accent-soft:  rgba(74,74,240,0.08);
    --faq-text:         #111110;
    --faq-text-sub:     #6b6b68;
    --faq-text-muted:   #9d9d99;
    --faq-cat-active-bg:#111110;
    --faq-cat-active-fg:#ffffff;
    --faq-radius:       14px;
    --faq-radius-sm:    10px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .faq-page {
    background: var(--faq-bg);
    min-height: 100vh;
    font-family: "DM Sans", sans-serif;
    color: var(--faq-text);
  }

  /* ── HERO ── */
  .faq-hero {
    padding: 80px 40px 56px;
    text-align: center;
    background: var(--faq-surface);
    border-bottom: 1px solid var(--faq-border);
  }

  .faq-hero__pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--faq-accent);
    background: var(--faq-accent-soft);
    border: 1px solid rgba(74,74,240,0.18);
    border-radius: 100px;
    padding: 5px 14px;
    margin-bottom: 22px;
  }

  .faq-hero__title {
    font-family: "Instrument Serif", serif;
    font-size: clamp(2.4rem, 5vw, 3.6rem);
    font-weight: 400;
    color: var(--faq-text);
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 14px;
  }

  .faq-hero__sub {
    font-size: 0.97rem;
    line-height: 1.7;
    color: var(--faq-text-sub);
    max-width: 440px;
    margin: 0 auto;
  }

  /* ── BODY ── */
  .faq-body {
    max-width: 1080px;
    margin: 0 auto;
    padding: 56px 40px 100px;
    display: flex;
    gap: 32px;
    align-items: flex-start;
  }

  /* ── SIDEBAR ── */
  .faq-sidebar {
    width: 240px;
    flex-shrink: 0;
    position: sticky;
    top: 28px;
  }

  .faq-sidebar__label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--faq-text-muted);
    margin-bottom: 10px;
    padding: 0 2px;
  }

  .faq-cat-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .faq-cat-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: var(--faq-radius-sm);
    border: none;
    background: transparent;
    cursor: pointer;
    width: 100%;
    text-align: left;
    font-family: "DM Sans", sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--faq-text-sub);
    transition: background 0.15s, color 0.15s;
  }
  .faq-cat-btn:hover {
    background: var(--faq-border);
    color: var(--faq-text);
  }
  .faq-cat-btn--active {
    background: var(--faq-cat-active-bg) !important;
    color: var(--faq-cat-active-fg) !important;
  }

  .faq-cat-icon {
    font-size: 1rem;
    width: 22px;
    text-align: center;
    flex-shrink: 0;
  }

  .faq-cat-count {
    margin-left: auto;
    font-size: 0.75rem;
    font-weight: 400;
    opacity: 0.55;
  }
  .faq-cat-btn--active .faq-cat-count {
    opacity: 0.7;
  }

  /* ── SEARCH in sidebar ── */
  .faq-search-wrap {
    position: relative;
    margin-bottom: 24px;
  }
  .faq-search {
    width: 100%;
    padding: 10px 36px 10px 14px;
    background: var(--faq-surface);
    border: 1px solid var(--faq-border);
    border-radius: var(--faq-radius-sm);
    font-family: "DM Sans", sans-serif;
    font-size: 0.88rem;
    color: var(--faq-text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .faq-search::placeholder { color: var(--faq-text-muted); }
  .faq-search:focus {
    border-color: var(--faq-accent);
    box-shadow: 0 0 0 3px rgba(74,74,240,0.1);
  }
  .faq-search-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.85rem;
    pointer-events: none;
    color: var(--faq-text-muted);
  }

  /* ── MAIN CONTENT ── */
  .faq-main {
    flex: 1;
    min-width: 0;
  }

  .faq-section-header {
    display: flex;
    align-items: flex-start;
    gap: 0;
    margin-bottom: 20px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--faq-border);
  }

  .faq-section-icon {
    font-size: 1.3rem;
    margin-right: 12px;
    margin-top: 2px;
  }

  .faq-section-title {
    font-family: "Instrument Serif", serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--faq-text);
    letter-spacing: -0.01em;
  }

  .faq-section-desc {
    font-size: 0.84rem;
    color: var(--faq-text-muted);
    line-height: 1.6;
    margin-top: 3px;
  }

  /* ── CARD ── */
  .faq-card {
    background: var(--faq-surface);
    border: 1px solid var(--faq-border);
    border-radius: var(--faq-radius);
    overflow: hidden;
    margin-bottom: 24px;
  }

  /* ── ACCORDION ITEM ── */
  .faq-item {
    border-bottom: 1px solid var(--faq-border);
  }
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
    font-family: "DM Sans", sans-serif;
    font-size: 0.93rem;
    font-weight: 500;
    color: var(--faq-text);
    text-align: left;
    transition: background 0.15s;
    line-height: 1.5;
  }
  .faq-item__trigger:hover { background: #fafaf8; }
  .faq-item__trigger--open { background: #fafaf8; color: var(--faq-accent); }

  .faq-item__chevron {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1.5px solid var(--faq-border);
    background: var(--faq-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s, border-color 0.2s, transform 0.25s;
    color: var(--faq-text-muted);
    font-size: 0.75rem;
    font-weight: 300;
  }
  .faq-item__trigger--open .faq-item__chevron {
    background: var(--faq-accent);
    border-color: var(--faq-accent);
    color: #fff;
    transform: rotate(180deg);
  }

  .faq-item__body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
    opacity: 0;
  }
  .faq-item__body--open {
    max-height: 500px;
    opacity: 1;
  }

  .faq-item__answer {
    padding: 0 22px 20px 22px;
    font-size: 0.9rem;
    line-height: 1.8;
    color: var(--faq-text-sub);
    border-top: 1px solid var(--faq-border);
    padding-top: 16px;
  }

  /* ── EMPTY ── */
  .faq-empty {
    text-align: center;
    padding: 60px 20px;
    color: var(--faq-text-muted);
  }
  .faq-empty__icon  { font-size: 2.5rem; margin-bottom: 12px; }
  .faq-empty__title {
    font-family: "Instrument Serif", serif;
    font-size: 1.3rem;
    color: var(--faq-text-sub);
    margin-bottom: 8px;
  }
  .faq-empty__sub { font-size: 0.88rem; }

  /* ── COUNT BAR ── */
  .faq-result-bar {
    font-size: 0.82rem;
    color: var(--faq-text-muted);
    margin-bottom: 24px;
  }
  .faq-result-bar strong { color: var(--faq-text); font-weight: 600; }

  /* ── RESPONSIVE ── */
  @media (max-width: 820px) {
    .faq-body {
      flex-direction: column;
      padding: 36px 20px 80px;
      gap: 24px;
    }
    .faq-sidebar {
      width: 100%;
      position: static;
    }
    .faq-cat-list {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 6px;
    }
    .faq-cat-btn {
      width: auto;
      padding: 8px 14px;
    }
    .faq-cat-count { display: none; }
  }
  @media (max-width: 480px) {
    .faq-hero { padding: 56px 20px 40px; }
    .faq-hero__title { font-size: 2rem; }
  }
`;

/* ══════════════════════════════════════════
   FAQ DATA
   ══════════════════════════════════════════ */
const faqCategories = [
  { id: "general",      label: "General",                icon: "🌐", desc: "Overview of our conferences and mission." },
  { id: "registration", label: "Registration & Tickets", icon: "🎟️", desc: "How to register, ticket types, and transfers." },
  { id: "speaking",     label: "Speaking & Presenting",  icon: "🎤", desc: "Apply to speak and what to expect on stage." },
  { id: "experience",   label: "Event Experience",       icon: "✨", desc: "What happens at the event, day by day." },
  { id: "refunds",      label: "Refunds & Policies",     icon: "📄", desc: "Our cancellation and refund guidelines." },
  { id: "networking",   label: "Networking & Community", icon: "🤝", desc: "Connecting with speakers and attendees." },
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
   ACCORDION ITEM
   ══════════════════════════════════════════ */
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
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      <div className={`faq-item__body${open ? " faq-item__body--open" : ""}`}>
        <div className="faq-item__answer">{item.answer}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PANEL
   ══════════════════════════════════════════ */
function FaqPanel({ activeCat, allItems, search }) {
  const isSearching = search.trim().length > 0;

  if (isSearching) {
    return (
      <>
        <p className="faq-result-bar">
          Showing <strong>{allItems.length}</strong> result{allItems.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
        </p>
        {allItems.length === 0 ? (
          <div className="faq-empty">
            <div className="faq-empty__icon">🔍</div>
            <h3 className="faq-empty__title">No results found</h3>
            <p className="faq-empty__sub">Try a different search term or browse a category.</p>
          </div>
        ) : (
          <div className="faq-card">
            {allItems.map(item => <FaqItem key={item.id} item={item} />)}
          </div>
        )}
      </>
    );
  }

  const cat = faqCategories.find(c => c.id === activeCat);
  const items = allItems.filter(f => f.category === activeCat);

  return (
    <>
      {cat && (
        <div className="faq-section-header">
          <span className="faq-section-icon">{cat.icon}</span>
          <div>
            <div className="faq-section-title">{cat.label}</div>
            <div className="faq-section-desc">{cat.desc}</div>
          </div>
        </div>
      )}
      {items.length === 0 ? (
        <div className="faq-empty">
          <div className="faq-empty__icon">📭</div>
          <h3 className="faq-empty__title">Nothing here yet</h3>
          <p className="faq-empty__sub">Check back soon for updates.</p>
        </div>
      ) : (
        <div className="faq-card">
          {items.map(item => <FaqItem key={item.id} item={item} />)}
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════
   ROOT
   ══════════════════════════════════════════ */
export default function FAQ() {
  const [activeCat, setActiveCat] = useState("general");
  const [search, setSearch]       = useState("");

  const catCounts = useMemo(() => {
    const map = {};
    faqCategories.forEach(c => {
      map[c.id] = faqs.filter(f => f.category === c.id).length;
    });
    return map;
  }, []);

  const filteredAll = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return faqs;
    return faqs.filter(f =>
      f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <>
      <style>{FAQ_STYLES}</style>
      <div className="faq-page">

        {/* HERO */}
        <section className="faq-hero">
          <div className="faq-hero__pill">FAQ</div>
          <h1 className="faq-hero__title">Frequently asked questions</h1>
          <p className="faq-hero__sub">
            Trusted by leaders in more than 100 countries. Find answers about our conferences below.
          </p>
        </section>

        {/* BODY */}
        <div className="faq-body">

          {/* SIDEBAR */}
          <aside className="faq-sidebar">
            <div className="faq-search-wrap">
              <input
                className="faq-search"
                type="text"
                placeholder="Search questions…"
                value={search}
                onChange={e => { setSearch(e.target.value); }}
              />
              <span className="faq-search-icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </span>
            </div>

            <p className="faq-sidebar__label">Categories</p>
            <div className="faq-cat-list">
              {faqCategories.map(cat => (
                <button
                  key={cat.id}
                  className={`faq-cat-btn${activeCat === cat.id && !search ? " faq-cat-btn--active" : ""}`}
                  onClick={() => { setActiveCat(cat.id); setSearch(""); }}
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
            <FaqPanel
              activeCat={activeCat}
              allItems={filteredAll}
              search={search}
            />
          </main>

        </div>
      </div>
    </>
  );
}