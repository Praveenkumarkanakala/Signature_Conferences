import { useState } from "react";
import { Navbar } from "../Home/asia.jsx";
import {
  speakerCategories,
  getSpeakersByCategory,
} from "./speakerdata.js";
import "./Speakers.css";
import "../Home/asia.css";
import Footer from "../../../Components/Footer/footer";
import { TempSpeakersHero, TempSpeakersFilter, TempSpeakersComingSoon } from "./tempspeakers";

function FilterBar({ active, onChange }) {
  return (
    <div className="as-sp-filters">
      <div className="as-sp-filters__inner">
        {speakerCategories.map((category) => (
          <button
            key={category.id}
            className={`as-sp-filters__pill${active === category.id ? " as-sp-filters__pill--active" : ""}`}
            onClick={() => onChange(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SpeakerCard({ speaker }) {
  return (
    <article className="as-sp-card">
      <div className="as-sp-card__imageWrap">
        <img src={speaker.image} alt={speaker.name} className="as-sp-card__img" />
      </div>
    </article>
  );
}

function SpeakersGrid({ filter }) {
  const filtered = getSpeakersByCategory(filter);

  return (
    <section className="as-sp-grid-section">
      <div className="as-sp-grid-section__inner">
        <p className="as-sp-grid-section__count">
          Showing <strong>{filtered.length}</strong> speaker{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="as-sp-grid">
          {filtered.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AsiaSpeakers() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    // ✅ Root wrapper to prevent CSS leakage
    <div className="as-page">
      <Navbar />

<TempSpeakersHero />
      <TempSpeakersFilter active={activeFilter} onChange={setActiveFilter} />
      <TempSpeakersComingSoon />


      {/* <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <SpeakersGrid filter={activeFilter} /> */}
      <Footer theme="asia" />
    </div>
  );
}