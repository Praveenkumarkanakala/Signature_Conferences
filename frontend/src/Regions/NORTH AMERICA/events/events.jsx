import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NaNavbar } from "../NAHome/Nahome";
import { categoryFilters, getConferencesByRegion } from "../../globaldata/eventsglobaldata.js";
import "./events.css";
import Footer from "../../../Components/Footer/footer";

const REGION = "north-america";
const conferences = getConferencesByRegion(REGION);
const cities = [...new Set(conferences.map((conference) => conference.city))];

const LOCATION_TO_CITY = {
  toronto: "Toronto",
  ontario: "Ontario",
  miami: "Miami",
};

/* ─── HERO ──────────────────────────────── */
function EventsHero() {
  return (
    <section className="na-ev-hero">
      <div className="na-ev-hero__glow" />
      <div className="na-ev-hero__content">
        <span className="na-ev-hero__tag">Global Conferences 2026</span>
        <h1 className="na-ev-hero__title">
          Where Leaders <br />
          Shape The Future
        </h1>
        <p className="na-ev-hero__sub">
          {conferences.length} world-class conferences across{" "}
          {cities.join(", ")}.
        </p>
        <div className="na-ev-hero__stats">
          <div className="na-ev-hero__stat">
            <span>{conferences.length}</span>Conferences
          </div>
          <div className="na-ev-hero__stat-div" />
          <div className="na-ev-hero__stat">
            <span>{cities.length}</span>Cities
          </div>
          <div className="na-ev-hero__stat-div" />
          <div className="na-ev-hero__stat">
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
    <div className="na-ev-filters">
      <div className="na-ev-filters__inner">
        {categoryFilters.map((f) => (
          <button
            key={f.id}
            className={`na-ev-filters__pill${active === f.id ? " na-ev-filters__pill--active" : ""}`}
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

  const categoryLabels = {
    "women-leadership": "Women Leadership",
    wellness: "Wellness",
    "ai-stem": "AI & STEM",
    business: "Business",
  };

  return (
    <div className="na-ev-card">
      <div className="na-ev-card__img">
        <img src={conf.image} alt={conf.title} />
        <span className="na-ev-card__cat">{categoryLabels[conf.category]}</span>
      </div>
      <div className="na-ev-card__body">
        <h3 className="na-ev-card__title">{conf.title}</h3>
        <div className="na-ev-card__meta">
          <span>
            <span className="na-ev-card__icon">Date:</span> {conf.date}
          </span>
          <span>
            <span className="na-ev-card__icon">Place:</span> {conf.location}
          </span>
        </div>
        <div className="na-ev-card__actions">
          <button
            className="na-ev-card__btn na-ev-card__btn--outline"
            onClick={() => navigate(`/na-events/${conf.id}`)}
          >
            Learn More
          </button>
          <button
            className="na-ev-card__btn na-ev-card__btn--primary"
            onClick={() => navigate("/na-register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── GRID ───────────────────────────────── */
function ConferencesGrid({ filter, cityFilter }) {
  let filtered =
    filter === "all"
      ? conferences
      : conferences.filter((c) => c.category === filter);

  if (cityFilter) {
    filtered = filtered.filter(
      (c) =>
        c.city?.toLowerCase().includes(cityFilter.toLowerCase()) ||
        c.location?.toLowerCase().includes(cityFilter.toLowerCase())
    );
  }

  return (
    <section className="na-ev-grid-section">
      <div className="na-ev-grid-section__inner">
        {cityFilter && (
          <p className="na-ev-grid-section__count">
            Showing events in <strong>{cityFilter}</strong>
          </p>
        )}
        {/* <p className="na-ev-grid-section__count">
          Showing <strong>{filtered.length}</strong> conference
          {filtered.length !== 1 ? "s" : ""}
        </p> */}
        <div className="na-ev-grid">
          {filtered.map((conf) => (
            <ConferenceCard key={conf.id} conf={conf} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────── */
export default function NAevents() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState(null);
  const routerLocation = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(routerLocation.search);
    const loc = params.get("location");
    if (loc && LOCATION_TO_CITY[loc]) {
      setCityFilter(LOCATION_TO_CITY[loc]);
    } else {
      setCityFilter(null);
    }
  }, [routerLocation.search]);

  return (
    <div className="na-page">
      <NaNavbar />
      <EventsHero />
      <FilterBar
        active={activeFilter}
        onChange={(f) => {
          setActiveFilter(f);
          setCityFilter(null);
        }}
      />
      <ConferencesGrid filter={activeFilter} cityFilter={cityFilter} />
      <Footer theme="northamerica" />
    </div>
  );
}