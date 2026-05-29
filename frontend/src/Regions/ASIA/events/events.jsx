import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Home/asia.jsx";
import { categoryFilters } from "../../globaldata/eventsglobaldata";
import { supabase } from "../../../lib/supabase.jsx";
import "./events.css";
import "../Home/asia.css";
import Footer from "../../../Components/Footer/footer";
import SEO from "../../../Components/SEO.jsx";

const REGION = "asia";

function normalizeRow(row) {
  return {
    ...row,
    image: row.image_path,
    date: row.date_text,
    fullDescription: row.full_description,
    slug: row.slug || row.id,
  };
}

/* ─── HERO ──────────────────────────────── */
function EventsHero({ conferences }) {
  const cities = [...new Set(conferences.map((c) => c.city))];

  return (
    <section className="as-ev-hero">
      <div className="as-ev-hero__glow" />
      <div className="as-ev-hero__content">
        <span className="as-ev-hero__tag">Global Conferences 2026</span>
        <h1 className="as-ev-hero__title">
          Where Leaders
          <br />
          Shape The Future
        </h1>
        <p className="as-ev-hero__sub">
          {conferences.length} world-class conferences across{" "}
          {cities.join(", ")}.
        </p>
        <div className="as-ev-hero__stats">
          <div className="as-ev-hero__stat">
            <span>{conferences.length}</span>Conferences
          </div>
          <div className="as-ev-hero__stat-div" />
          <div className="as-ev-hero__stat">
            <span>{cities.length}</span>Cities
          </div>
          <div className="as-ev-hero__stat-div" />
          <div className="as-ev-hero__stat">
            <span>2026</span>Season
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FILTER BAR ───────────────────────── */
function FilterBar({ active, onChange }) {
  return (
    <div className="as-ev-filters">
      <div className="as-ev-filters__inner">
        {categoryFilters.map((f) => (
          <button
            key={f.id}
            className={`as-ev-filters__pill${active === f.id ? " as-ev-filters__pill--active" : ""}`}
            onClick={() => onChange(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── CONFERENCE CARD ──────────────────── */
function ConferenceCard({ conf }) {
  const navigate = useNavigate();

  const categoryLabels = {
    "women-leadership": "Women Leadership",
    wellness: "Wellness",
    "ai-stem": "AI & STEM",
    business: "Business",
  };

  return (
    <div className="as-ev-card">
      <div className="as-ev-card__img">
        <img src={conf.image} alt={conf.title} />
        <span className="as-ev-card__cat">{categoryLabels[conf.category]}</span>
      </div>
      <div className="as-ev-card__body">
        <h3 className="as-ev-card__title">{conf.title}</h3>
        <div className="as-ev-card__meta">
          <span>
            <span className="as-ev-card__icon">Date:</span>
            {conf.date}
          </span>
          <span>
            <span className="as-ev-card__icon">Place:</span>
            {conf.location}
          </span>
        </div>
        <div className="as-ev-card__actions">
          <button
            className="as-ev-card__btn as-ev-card__btn--outline"
            onClick={() => navigate(`/asiaevents/${conf.slug}`)}
          >
            Learn More
          </button>
          <button
            className="as-ev-card__btn as-ev-card__btn--primary"
            onClick={() => navigate("/asiaregsiter", { state: { conferenceId: String(conf.id) } })}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── GRID ─────────────────────────────── */
function ConferencesGrid({ conferences, filter }) {
  const filtered =
    filter === "all"
      ? conferences
      : conferences.filter((c) => c.category === filter);

  return (
    <section className="as-ev-grid-section">
      <div className="as-ev-grid-section__inner">
        <p className="as-ev-grid-section__count">
          Showing <strong>{filtered.length}</strong> conference
          {filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="as-ev-grid">
          {filtered.map((conf) => (
            <ConferenceCard key={conf.id} conf={conf} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ─────────────────────────────── */
export default function AsiaEvents() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    async function fetchFromSupabase() {
      const { data, error } = await supabase
        .from("conferences")
        .select("*")
        .eq("region", REGION)
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Supabase fetch error:", error.message);
        return;
      }

      if (data && data.length > 0) {
        setConferences(data.map(normalizeRow));
      }
    }

    fetchFromSupabase();
  }, []);

  return (
    <div className="as-page">
      <SEO title="Asia Conferences & Events" description="Explore upcoming Signature Global Conferences in Asia." />
      <Navbar />
      <EventsHero conferences={conferences} />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <ConferencesGrid conferences={conferences} filter={activeFilter} />
      <Footer theme="asia" />
    </div>
  );
}