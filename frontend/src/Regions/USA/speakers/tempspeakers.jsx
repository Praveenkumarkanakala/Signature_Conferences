import { useEffect, useState } from "react";
import speakerImg from "./image.png"; // adjust path if needed

/* ─────────────────────────────────────────────────────────────
   Inject styles once — no separate .css file needed
   ───────────────────────────────────────────────────────────── */
const css = `
  @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap");

  /* ─── HERO ─────────────────────────────────── */
  .usa-sp-hero {
    background: var(--color-bg);
    padding: 72px 60px 52px;
    text-align: center;
  }
  .usa-sp-hero__content {
    max-width: 860px;
    margin: 0 auto;
  }
  .usa-sp-hero__tag {
    font-family: var(--font-body);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--color-dark);
    display: inline-flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 22px;
  }
  .usa-sp-hero__tag::before,
  .usa-sp-hero__tag::after {
    content: "";
    display: block;
    width: 32px;
    height: 1px;
    background: var(--color-accent);
    flex-shrink: 0;
  }
  .usa-sp-hero__title {
    font-family: var(--font-heading);
    font-size: clamp(2.4rem, 6vw, 4.8rem);
    font-weight: 400;
    color: var(--color-dark);
    line-height: 1.0;
    letter-spacing: 0.02em;
  }
  .usa-sp-hero__title em {
    color: var(--color-accent);
    font-style: normal;
  }

  /* ─── FILTER BAR ───────────────────────────── */
  .usa-sp-filters {
    padding: 18px 60px;
    background: var(--color-dark);
    border-bottom: 1px solid rgba(240, 165, 0, 0.12);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .usa-sp-filters__inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .usa-sp-filters__pill {
    font-family: var(--font-body);
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(240, 165, 0, 0.7);
    background: transparent;
    border: 1px solid rgba(240, 165, 0, 0.18);
    border-radius: 50px;
    padding: 8px 22px;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  .usa-sp-filters__pill:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
  .usa-sp-filters__pill--active {
    background: rgba(240, 165, 0, 0.12);
    border-color: var(--color-accent);
    color: var(--color-accent);
    font-weight: 600;
  }

  /* ─── SPLIT SECTION ─────────────────────────── */
  .usa-sp-split {
    display: flex;
    align-items: stretch;
    min-height: 520px;
    background: var(--color-bg);
  }
  .usa-sp-split__img-wrap {
    flex: 1;
    position: relative;
    overflow: hidden;
    min-height: 460px;
  }
  .usa-sp-split__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
  .usa-sp-split__img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, transparent 55%, var(--color-bg) 100%);
  }
  .usa-sp-split__quote {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 64px 56px 64px 40px;
  }
  .usa-sp-split__quote-inner { max-width: 420px; }
  .usa-sp-split__quote-mark {
    font-family: var(--font-heading);
    font-size: 120px;
    color: var(--color-accent);
    line-height: 0.6;
    margin-bottom: 28px;
    display: block;
    letter-spacing: -0.02em;
  }
  .usa-sp-split__heading {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    font-weight: 400;
    color: var(--color-dark);
    line-height: 1.1;
    margin-bottom: 24px;
    letter-spacing: 0.02em;
  }
  .usa-sp-split__heading em {
    color: var(--color-accent);
    font-style: normal;
  }
  .usa-sp-split__text {
    font-family: var(--font-body);
    font-size: 0.97rem;
    font-weight: 400;
    color: var(--color-text-muted);
    line-height: 1.9;
  }
  .usa-sp-split__line {
    width: 52px;
    height: 2px;
    background: var(--color-accent);
    border-radius: 2px;
    margin-top: 28px;
  }

  /* ─── RESPONSIVE ───────────────────────────── */
  @media (max-width: 1024px) {
    .usa-sp-hero { padding: 64px 40px 44px; }
    .usa-sp-filters { padding: 16px 40px; }
    .usa-sp-split__quote { padding: 52px 40px 52px 32px; }
    .usa-sp-split__quote-inner { max-width: 360px; }
  }
  @media (max-width: 768px) {
    .usa-sp-hero { padding: 56px 28px 40px; }
    .usa-sp-hero__tag { font-size: 0.6rem; letter-spacing: 3px; gap: 10px; flex-wrap: wrap; justify-content: center; }
    .usa-sp-filters { padding: 14px 28px; }
    .usa-sp-filters__pill { font-size: 0.72rem; padding: 7px 16px; }
    .usa-sp-split { flex-direction: column; min-height: unset; }
    .usa-sp-split__img-wrap { min-height: 320px; max-height: 420px; }
    .usa-sp-split__img-overlay { background: linear-gradient(to bottom, transparent 50%, var(--color-bg) 100%); }
    .usa-sp-split__quote { padding: 44px 32px 52px; justify-content: flex-start; }
    .usa-sp-split__quote-inner { max-width: 100%; }
    .usa-sp-split__heading { font-size: clamp(1.8rem, 5vw, 2.6rem); }
  }
  @media (max-width: 480px) {
    .usa-sp-hero { padding: 48px 18px 36px; }
    .usa-sp-hero__tag { font-size: 0.55rem; letter-spacing: 2.5px; gap: 8px; }
    .usa-sp-hero__tag::before, .usa-sp-hero__tag::after { width: 20px; }
    .usa-sp-filters { padding: 12px 16px; }
    .usa-sp-filters__inner { gap: 8px; }
    .usa-sp-filters__pill { font-size: 0.68rem; padding: 6px 13px; }
    .usa-sp-split__img-wrap { min-height: 260px; max-height: 340px; }
    .usa-sp-split__quote { padding: 36px 20px 48px; }
    .usa-sp-split__quote-mark { font-size: 80px; margin-bottom: 16px; }
    .usa-sp-split__heading { font-size: clamp(1.6rem, 7vw, 2rem); margin-bottom: 18px; }
    .usa-sp-split__text { font-size: 0.9rem; line-height: 1.8; }
    .usa-sp-split__line { width: 40px; margin-top: 22px; }
  }
  @media (max-width: 360px) {
    .usa-sp-hero__tag { font-size: 0.5rem; letter-spacing: 2px; }
    .usa-sp-filters__pill { font-size: 0.64rem; padding: 5px 11px; }
    .usa-sp-split__heading { font-size: 1.5rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────────── */
const speakerCategories = [
  { id: "all",              label: "All Speakers"      },
  { id: "women-leadership", label: "Women & Leadership" },
  { id: "ai-stem",          label: "AI & STEM"          },
  { id: "business",         label: "Business"           },
  { id: "wellness",         label: "Wellness"           },
];

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS (internal — not exported)
   ───────────────────────────────────────────────────────────── */
function USASpeakersHero() {
  return (
    <section className="usa-sp-hero">
      <div className="usa-sp-hero__content">
        <span className="usa-sp-hero__tag">
          USA Signature Global Conferences – Speakers
        </span>
        <h1 className="usa-sp-hero__title">
          Our Speakers Are <em>Coming Soon</em>
        </h1>
      </div>
    </section>
  );
}

function USAFilterBar({ active, onChange }) {
  return (
    <div className="usa-sp-filters">
      <div className="usa-sp-filters__inner">
        {speakerCategories.map((f) => (
          <button
            key={f.id}
            className={`usa-sp-filters__pill${
              active === f.id ? " usa-sp-filters__pill--active" : ""
            }`}
            onClick={() => onChange(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function USAComingSoon() {
  return (
    <section className="usa-sp-split">
      {/* Image side */}
      <div className="usa-sp-split__img-wrap">
        <img
          src={speakerImg}
          alt="Speaker presenting to audience"
          className="usa-sp-split__img"
        />
        <div className="usa-sp-split__img-overlay" />
      </div>

      {/* Quote side */}
      <div className="usa-sp-split__quote">
        <div className="usa-sp-split__quote-inner">
          <span className="usa-sp-split__quote-mark">"</span>
          <h2 className="usa-sp-split__heading">
            Every great journey<br />starts with a<br />
            <em>First Step.</em>
          </h2>
          <p className="usa-sp-split__text">
            We are curating a powerful lineup of global speakers, industry
            leaders, and changemakers. Stay tuned as we unveil inspiring voices
            for our upcoming conferences.
          </p>
          <div className="usa-sp-split__line" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   Import this in your USA Speakers page and place it
   between <Navbar /> and <Footer />
   ───────────────────────────────────────────────────────────── */
export default function USASpeakersSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Inject CSS once on mount, clean up on unmount
  useEffect(() => {
    if (!document.getElementById("usa-sp-styles")) {
      const tag = document.createElement("style");
      tag.id = "usa-sp-styles";
      tag.textContent = css;
      document.head.appendChild(tag);
    }
    return () => {
      const tag = document.getElementById("usa-sp-styles");
      if (tag) tag.remove();
    };
  }, []);

  return (
    <>
      <USASpeakersHero />
      <USAFilterBar active={activeFilter} onChange={setActiveFilter} />
      <USAComingSoon />
    </>
  );
}