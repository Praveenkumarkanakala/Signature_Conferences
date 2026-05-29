import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Landingpage/eurohome.jsx";
import { supabase } from "../../../lib/supabase.jsx";
import "./events.css";
import Footer from "../../../Components/Footer/footer";
import "../Landingpage/eurohome.css";
import SEO from "../../../Components/SEO.jsx";

const REGION = "europe";

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

/* ─── CONFERENCE CARD ────────────────────── */
function ConferenceCard({ conf }) {
  const navigate = useNavigate();

  return (
    <div className="europe-events-card">
      <div className="europe-events-card__img">
        <img src={conf.image} alt={conf.title} />
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
            onClick={() => navigate(`/europe-events/${conf.slug}`)}
          >
            Learn More
          </button>
          <button
            className="europe-events-card__btn europe-events-card__btn--primary"
            onClick={() => navigate("/europe-register", { state: { conferenceId: String(conf.id) } })}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── GRID ──────────────────────────────── */
function ConferencesGrid({ conferences }) {
  return (
    <section className="europe-events-grid-section">
      <div className="europe-events-grid-section__inner">
        <div className="europe-events-grid">
          {conferences.map((conf) => (
            <ConferenceCard key={conf.id} conf={conf} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────── */
export default function Events() {
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
    <div className="europe-page">
      <SEO title="Europe Conferences & Events" description="Explore upcoming Signature Global Conferences in Europe." />
      <Navbar />
      <EventsHero conferences={conferences} />
      <ConferencesGrid conferences={conferences} />
      <Footer theme="europe" />
    </div>
  );
}