import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Landingpage/homepage.jsx";
import {
  speakerCategories,
  getSpeakersByCategory,
  speakers,
  allConferences,
} from "./speakerdata.js";
import "./Speakers.css";
import Footer from "../../../Components/Footer/footer";
import "../Landingpage/homepage.css";


function unlockScroll() {
  const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));

  const targets = [document.documentElement, document.body];
  targets.forEach((el) => {
    el.style.removeProperty("overflow");
    el.style.removeProperty("overflow-x");
    el.style.removeProperty("overflow-y");
    el.style.removeProperty("height");
    el.style.removeProperty("max-height");
    el.style.removeProperty("position");
    el.style.removeProperty("top");
    el.style.removeProperty("left");
    el.style.removeProperty("width");
    el.style.removeProperty("padding-right");
  });

  if (scrollY > 0) window.scrollTo(0, scrollY);
}

const categoryLabels = {
  "women-leadership": "Women & Leadership",
  "ai-stem": "AI & STEM",
  business: "Business",
  wellness: "Wellness",
};

/* ─── HERO ──────────────────────────────────── */
function SpeakersHero() {
  return (
    <section className="usa-sp-hero">
      <div className="usa-sp-hero__glow" />
      <div className="usa-sp-hero__content">
        <span className="usa-sp-hero__tag">Sgnature Global Conferenes - Speakers</span>
        <h1 className="usa-sp-hero__title">
          Voices That
          <br />
          Move the World
        </h1>
      </div>
    </section>
  );
}

/* ─── FILTER BAR ─────────────────────────────── */
function FilterBar({ active, onChange }) {
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

/* ─── SPEAKER CARD ───────────────────────────── */
function SpeakerCard({ speaker }) {
  return (
    <div className="usa-sp-card">
      <div className="usa-sp-card__image-wrap">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="usa-sp-card__img"
          loading="lazy"
        />
        <div className="usa-sp-card__overlay">
          <p className="usa-sp-card__overlay-role">{speaker.role}</p>
          <h3 className="usa-sp-card__overlay-name">{speaker.name}</h3>
        </div>
      </div>
    </div>
  );
}

/* ─── GRID ───────────────────────────────────── */
function SpeakersGrid({ filter }) {
  const filtered = getSpeakersByCategory(filter);

  return (
    <section className="usa-sp-grid-section">
      <div className="usa-sp-grid-section__inner">
        <div className="usa-sp-grid">
          {filtered.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────────── */
export default function Speakers() {
  const [activeFilter, setActiveFilter] = useState("all");

  /* ✅ SCROLL FIX — unlock on mount + after paint, no restore on unmount */
  useEffect(() => {
    unlockScroll();
    const raf = requestAnimationFrame(unlockScroll);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="usa-page">
      <Navbar />
      <SpeakersHero />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <SpeakersGrid filter={activeFilter} />
      <Footer theme="usa" />
    </div>
  );
}