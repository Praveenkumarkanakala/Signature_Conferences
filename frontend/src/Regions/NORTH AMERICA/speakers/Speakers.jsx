import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../NAHome/Nahome";
import { speakerCategories, getSpeakersByCategory, speakers, allConferences } from "./speakerdata.js";
import "./Speakers.css";
import Footer from "../../../Components/Footer/footer";

const categoryLabels = { "women-leadership": "Women & Leadership", "ai-stem": "AI & STEM", business: "Business", wellness: "Wellness" };

/* ─── HERO ──────────────────────────────────── */
function SpeakersHero() {
  return (
    <section className="na-speakers-hero">
      <div className="na-speakers-hero__glow" />
      <div className="na-speakers-hero__content">
        <span className="na-speakers-hero__tag">North America SIgnature Global Conferences - Speakers</span>
        <h1 className="na-speakers-hero__title">
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
    <div className="na-speakers-filters">
      <div className="na-speakers-filters__inner">
        {speakerCategories.map((f) => (
          <button
            key={f.id}
            className={`na-speakers-filters__pill${active === f.id ? " na-speakers-filters__pill--active" : ""}`}
            onClick={() => onChange(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SpeakerCard({ speaker }) {
  return (
    <div className="na-speakers-card">
      <div className="na-speakers-card__imageWrap">
        <img src={speaker.image} alt={speaker.name} className="na-speakers-card__img" />
      </div>
    </div>
  );
}

/* ─── GRID ───────────────────────────────────── */
function SpeakersGrid({ filter }) {
  const filtered = getSpeakersByCategory(filter);

  return (
    <section className="na-speakers-grid-section">
      <div className="na-speakers-grid-section__inner">
        <div className="na-speakers-grid">
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

  return (
    <div className="na-page">
      <Navbar />
      <SpeakersHero />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <SpeakersGrid filter={activeFilter} />
      <Footer theme="northamerica" />
    </div>
  );
}