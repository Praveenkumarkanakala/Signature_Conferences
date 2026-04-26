import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Landingpage/eurohome.jsx";
import { categoryFilters, getConferencesByRegion } from "../globaldata/eventsglobaldata.js";
import "./events.css";
import Footer from "../../../Components/Footer/footer";
import "../Landingpage/eurohome.css";

const REGION = "europe";
const conferences = getConferencesByRegion(REGION);
const cities = [...new Set(conferences.map((conference) => conference.city))];

const categoryLabels = {
  "women-leadership": "Women Leadership",
  wellness: "Wellness",
  "ai-stem": "AI & STEM",
  business: "Business",
};

/* ─── HERO ──────────────────────────────── */
function EventsHero() {
  return (
    <section className="europe-events-hero">
      <div className="europe-events-hero__glow" />
      <div className="europe-events-hero__content">
        <span className="europe-events-hero__tag">Global Conferences 2026</span>
        <h1 className="europe-events-hero__title">
          Where Leaders <br />
          Shape The Future
        </h1>
        <p className="europe-events-hero__sub">
          {conferences.length} world-class conferences across{" "}
          {cities.join(", ")}.
        </p>
        <div className="europe-events-hero__stats">
          <div className="europe-events-hero__stat">
            <span>{conferences.length}</span>Conferences
          </div>
          <div className="europe-events-hero__stat-div" />
          <div className="europe-events-hero__stat">
            <span>{cities.length}</span>Cities
          </div>
          <div className="europe-events-hero__stat-div" />
          <div className="europe-events-hero__stat">
            <span>2027</span>Season
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FILTER BAR ─────────────────────────── */
function FilterBar({ active, onChange }) {
  return (
    <div className="europe-events-filters">
      <div className="europe-events-filters__inner">
        {categoryFilters.map((f) => (
          <button
            key={f.id}
            className={`europe-events-filters__pill${
              active === f.id ? " europe-events-filters__pill--active" : ""
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

/* ─── CONFERENCE CARD ────────────────────── */
function ConferenceCard({ conf }) {
  const navigate = useNavigate();

  return (
    <div className="europe-events-card">
      <div className="europe-events-card__img">
        <img src={conf.image} alt={conf.title} />
        <span className="europe-events-card__cat">
          {categoryLabels[conf.category]}
        </span>
      </div>
      <div className="europe-events-card__body">
        <h3 className="europe-events-card__title">{conf.title}</h3>
        <div className="europe-events-card__meta">
          <span>
            <span className="europe-events-card__icon">Date:</span>{" "}
            {conf.date}
          </span>
          <span>
            <span className="europe-events-card__icon">Place:</span>{" "}
            {conf.location}
          </span>
        </div>
        <div className="europe-events-card__actions">
          <button
            className="europe-events-card__btn europe-events-card__btn--outline"
            onClick={() => navigate(`/europe-events/${conf.id}`)}
          >
            Learn More
          </button>
          <button
            className="europe-events-card__btn europe-events-card__btn--primary"
            onClick={() => navigate("/europe-register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── GRID ──────────────────────────────── */
function ConferencesGrid({ filter }) {
  const filtered =
    filter === "all"
      ? conferences
      : conferences.filter((c) => c.category === filter);

  return (
    <section className="europe-events-grid-section">
      <div className="europe-events-grid-section__inner">
        <p className="europe-events-grid-section__count">
          Showing <strong>{filtered.length}</strong> conference
          {filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="europe-events-grid">
          {filtered.map((conf) => (
            <ConferenceCard key={conf.id} conf={conf} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────── */
export default function Events() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="europe-page">
      <Navbar />
      <EventsHero />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <ConferencesGrid filter={activeFilter} />
      <Footer theme="europe" />
    </div>
  );
}