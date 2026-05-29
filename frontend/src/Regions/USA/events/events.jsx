import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Landingpage/homepage.jsx";
import {
  categoryFilters,
  getConferencesByRegion,
} from "../../globaldata/eventsglobaldata.jsx";
import { supabase } from "../../../lib/supabase.jsx"; // adjust path if needed
import "./events.css";
import Footer from "../../../Components/Footer/footer";
import SEO from "../../../Components/SEO.jsx";

const REGION = "usa";

// ── Local data stays as the initial/fallback state ──────────────

// ── Normalize Supabase row → shape the component already expects ─
function normalizeRow(row) {
  return {
    ...row,
    image: row.image_path,         // component uses conf.image
    date: row.date_text,           // component uses conf.date
    fullDescription: row.full_description,
    slug: row.slug || row.id,
  };
}

/* ─── HERO ──────────────────────────────── */
function EventsHero({ conferences }) {
  const cities = [...new Set(conferences.map((c) => c.city))];

  return (
    <section className="ev-hero">
      <div className="ev-hero__glow" />
      <div className="ev-hero__content">
        <span className="ev-hero__tag">Global Conferences 2026</span>
        <h1 className="ev-hero__title">
          Where Leaders
          <br />
          Shape The Future
        </h1>
        <p className="ev-hero__sub">
          {conferences.length} world-class conferences across{" "}
          {cities.join(", ")}.
        </p>
        <div className="ev-hero__stats">
          <div className="ev-hero__stat">
            <span>{conferences.length}</span>Conferences
          </div>
          <div className="ev-hero__stat-div" />
          <div className="ev-hero__stat">
            <span>{cities.length}</span>Cities
          </div>
          <div className="ev-hero__stat-div" />
          <div className="ev-hero__stat">
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
    <div className="ev-filters">
      <div className="ev-filters__inner">
        {categoryFilters.map((f) => (
          <button
            key={f.id}
            className={`ev-filters__pill${active === f.id ? " ev-filters__pill--active" : ""}`}
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
    <div className="ev-card">
      <div className="ev-card__img">
        <img src={conf.image} alt={conf.title} />
      </div>
      <div className="ev-card__body">
        <h3 className="ev-card__title">{conf.title}</h3>
        <div className="ev-card__meta">
          <span>
            <span className="ev-card__icon">Date:</span>
            {conf.date}
          </span>
          <span>
            <span className="ev-card__icon">Place:</span>
            {conf.location}
          </span>
        </div>
        <div className="ev-card__actions">
          <button
            className="ev-card__btn ev-card__btn--outline"
            onClick={() => navigate(`/usa-events/${conf.slug}`)}
          >
            Learn More
          </button>
          <button
            className="ev-card__btn ev-card__btn--primary"
            onClick={() => navigate("/usa-register", { state: { conferenceId: String(conf.id) } })}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── GRID ───────────────────────────────── */
function ConferencesGrid({ conferences, filter }) {
  const filtered =
    filter === "all"
      ? conferences
      : conferences.filter((c) => c.category === filter);

  return (
    <section className="ev-grid-section">
      <div className="ev-grid-section__inner">
        <p className="ev-grid-section__count">
          Showing <strong>{filtered.length}</strong> conference
          {filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="ev-grid">
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
  const [conferences, setConferences] = useState([]);
  const [source, setSource] = useState("supabase"); // "local" | "supabase"

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
        return; // keep showing local data
      }

      if (data && data.length > 0) {
        setConferences(data.map(normalizeRow));
        setSource("supabase");
      }
    }

    fetchFromSupabase();
  }, []);

  return (
    <div className="usa-page">
      <SEO title="USA Conferences & Events" description="Explore upcoming Signature Global Conferences in the USA." />
      <Navbar />

      

      <EventsHero conferences={conferences} />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <ConferencesGrid conferences={conferences} filter={activeFilter} />
      <Footer theme="usa" />
    </div>
  );
}