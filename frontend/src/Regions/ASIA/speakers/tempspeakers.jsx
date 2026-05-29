import { useState } from "react";
import "./tempspeakers.css";
import speakerImg from "./image.png";

/* ─────────────────────────────────────────────────────────────────────
   TEMP SPEAKERS  –  drop-in placeholder for Speakers.jsx
   
   Usage in Speakers.jsx:
   import { TempSpeakersHero, TempSpeakersFilter, TempSpeakersComingSoon } from "./TempSpeakers";

   export default function Speakers() {
     return (
       <div className="as-page">
         <Navbar />
         <TempSpeakersHero />
         <TempSpeakersFilter />
         <TempSpeakersComingSoon />
         {/* <SpeakersGrid /> */

export const speakerCategories = [
  { id: "all", label: "All Speakers" },
  { id: "women-leadership", label: "Women & Leadership" },
  { id: "ai-stem", label: "AI & STEM" },
  { id: "business", label: "Business" },
  { id: "wellness", label: "Wellness" },
];

/* ── Hero ─────────────────────────────────────────────────────────── */
export function TempSpeakersHero() {
  return (
    <section className="as-speakers-hero">
      <div className="as-speakers-hero__content">
        <span className="as-speakers-hero__tag">
          as Signature Global Conferences – Speakers
        </span>
        <h1 className="as-speakers-hero__title">
          Our Speakers Are <em>Coming Soon</em>
        </h1>
      </div>
    </section>
  );
}

/* ── Filter bar ───────────────────────────────────────────────────── */
export function TempSpeakersFilter({ active, onChange }) {
  return (
    <div className="as-speakers-filters">
      <div className="as-speakers-filters__inner">
        {speakerCategories.map((f) => (
          <button
            key={f.id}
            className={`as-speakers-filters__pill${
              active === f.id ? " as-speakers-filters__pill--active" : ""
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

/* ── Coming-soon split section ────────────────────────────────────── */
export function TempSpeakersComingSoon() {
  return (
    <section className="as-speakers-split">
      {/* Image side */}
      <div className="as-speakers-split__img-wrap">
        <img
          src={speakerImg}
          alt="Speaker presenting to audience"
          className="as-speakers-split__img"
        />
        <div className="as-speakers-split__img-overlay" />

        {/* Quote overlay — visible only on mobile */}
        <div className="as-speakers-split__mobile-quote">
          <span className="as-speakers-split__quote-mark">"</span>
          <p className="as-speakers-split__journey-text">
            Every great journey starts with a first step.
          </p>
          <p className="as-speakers-split__quote-text">
            We are curating a powerful lineup of global speakers, industry
            leaders, and changemakers. Stay tuned as we unveil inspiring voices
            for our upcoming conferences.
          </p>
          <div className="as-speakers-split__quote-line" />
        </div>
      </div>

      {/* Desktop quote panel */}
      <div className="as-speakers-split__quote">
        <div className="as-speakers-split__quote-inner">
          <span className="as-speakers-split__quote-mark">"</span>
          <h2 className="as-speakers-split__journey-heading">
            Every great journey
            <br />
            starts with a
            <br />
            <em>first step.</em>
          </h2>
          <p className="as-speakers-split__quote-text">
            We are curating a powerful lineup of global speakers, industry
            leaders, and changemakers. Stay tuned as we unveil inspiring voices
            for our upcoming conferences.
          </p>
          <div className="as-speakers-split__quote-line" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SELF-CONTAINED WRAPPER
   Only needed if you want to render TempSpeakers standalone
   (e.g. during dev without the full Speakers.jsx shell).
   Not required when using the three named exports above.
─────────────────────────────────────────────────────────────────────── */
export function TempSpeakers() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
      <TempSpeakersHero />
      <TempSpeakersFilter active={activeFilter} onChange={setActiveFilter} />
      <TempSpeakersComingSoon />
    </>
  );
}