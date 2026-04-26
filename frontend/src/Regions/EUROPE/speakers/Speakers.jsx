import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Landingpage/eurohome.jsx";
import { speakerCategories, getSpeakersByCategory, speakers, allConferences } from "./speakerdata.js";
import "./Speakers.css";
import "../Landingpage/eurohome.css";
import Footer from "../../../Components/Footer/footer";

const categoryLabels = { "women-leadership": "Women & Leadership", "ai-stem": "AI & STEM", business: "Business", wellness: "Wellness" };

/* ─── HERO ──────────────────────────────────── */
function SpeakersHero() {
  return (
    <section className="europe-speakers-hero">
      <div className="europe-speakers-hero__glow" />
      <div className="europe-speakers-hero__content">
        <span className="europe-speakers-hero__tag">Europe Signature Global Conferences - Speakers</span>
        <h1 className="europe-speakers-hero__title">
          Voices That <br />
          Move the World
        </h1>
      </div>
    </section>
  );
}

/* ─── FILTER BAR ─────────────────────────────── */
function FilterBar({ active, onChange }) {
  return (
    <div className="europe-speakers-filters">
      <div className="europe-speakers-filters__inner">
        {speakerCategories.map((f) => (
          <button
            key={f.id}
            className={`europe-speakers-filters__pill${active === f.id ? " europe-speakers-filters__pill--active" : ""}`}
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
    <div className="europe-speakers-card">
      <div className="europe-speakers-card__imageWrap">
        <img src={speaker.image} alt={speaker.name} className="europe-speakers-card__img" />
      </div>
    </div>
  );
}

/* ─── GRID ───────────────────────────────────── */
function SpeakersGrid({ filter }) {
  const filtered = getSpeakersByCategory(filter);

  return (
    <section className="europe-speakers-grid-section">
      <div className="europe-speakers-grid-section__inner">
        <div className="europe-speakers-grid">
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
    <div className="europe-page">
      <Navbar />
      <SpeakersHero />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <SpeakersGrid filter={activeFilter} />
      <Footer theme="europe" />
    </div>
  );
}