import { useState } from "react";
import "./tempspeakers.css";
import speakerImg from "./image.png";

/* ─────────────────────────────────────────────────────────────────────
   TEMP SPEAKERS  –  drop-in placeholder for Speakers.jsx
   
   Usage in Speakers.jsx:
   import { TempSpeakersHero, TempSpeakersFilter, TempSpeakersComingSoon } from "./TempSpeakers";

   export default function Speakers() {
     return (
       <div className="europe-page">
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
    <section className="europe-speakers-hero">
      <div className="europe-speakers-hero__content">
        <span className="europe-speakers-hero__tag">
          Europe Signature Global Conferences – Speakers
        </span>
        <h1 className="europe-speakers-hero__title">
          Our Speakers Are <em>Coming Soon</em>
        </h1>
      </div>
    </section>
  );
}

/* ── Filter bar ───────────────────────────────────────────────────── */
export function TempSpeakersFilter({ active, onChange }) {
  return (
    <div className="europe-speakers-filters">
      <div className="europe-speakers-filters__inner">
        {speakerCategories.map((f) => (
          <button
            key={f.id}
            className={`europe-speakers-filters__pill${
              active === f.id ? " europe-speakers-filters__pill--active" : ""
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
    <section className="europe-speakers-split">
      {/* Image side */}
      <div className="europe-speakers-split__img-wrap">
        <img
          src={speakerImg}
          alt="Speaker presenting to audience"
          className="europe-speakers-split__img"
        />
        <div className="europe-speakers-split__img-overlay" />

        {/* Quote overlay — visible only on mobile */}
        <div className="europe-speakers-split__mobile-quote">
          <span className="europe-speakers-split__quote-mark">"</span>
          <p className="europe-speakers-split__journey-text">
            Every great journey starts with a first step.
          </p>
          <p className="europe-speakers-split__quote-text">
            We are curating a powerful lineup of global speakers, industry
            leaders, and changemakers. Stay tuned as we unveil inspiring voices
            for our upcoming conferences.
          </p>
          <div className="europe-speakers-split__quote-line" />
        </div>
      </div>

      {/* Desktop quote panel */}
      <div className="europe-speakers-split__quote">
        <div className="europe-speakers-split__quote-inner">
          <span className="europe-speakers-split__quote-mark">"</span>
          <h2 className="europe-speakers-split__journey-heading">
            Every great journey
            <br />
            starts with a
            <br />
            <em>first step.</em>
          </h2>
          <p className="europe-speakers-split__quote-text">
            We are curating a powerful lineup of global speakers, industry
            leaders, and changemakers. Stay tuned as we unveil inspiring voices
            for our upcoming conferences.
          </p>
          <div className="europe-speakers-split__quote-line" />
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