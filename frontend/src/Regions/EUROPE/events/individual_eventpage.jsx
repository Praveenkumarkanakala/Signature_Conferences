import { useParams, useNavigate } from "react-router-dom";
import { getConferenceByRegionAndId } from "../../globaldata/eventsglobaldata.js";
import { Navbar } from "../Landingpage/eurohome.jsx";
import "./individual_eventpage.css";
import Footer from "../../../Components/Footer/footer";

const REGION = "europe";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const conf = getConferenceByRegionAndId(REGION, id);

  if (!conf) {
    return (
      <div className="europe-page">
        <Navbar />
        <div className="europe-event-notfound">
          <h2>Conference not found.</h2>
          <button className="europe-event-back-btn" onClick={() => navigate("/europe-events")}>
            ← Back to Events
          </button>
        </div>
        <Footer theme="europe" />
      </div>
    );
  }

  const paragraphs = conf.description
    ? conf.description.split("\n\n").filter(Boolean)
    : [];

  return (
    <div className="europe-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="europe-event-hero">
        <div className="europe-event-hero__img-wrap">
          <img src={conf.image} alt={conf.title} className="europe-event-hero__img" />
          <div className="europe-event-hero__overlay" />
        </div>
        <div className="europe-event-hero__content">
          <button className="europe-event-back-btn" onClick={() => navigate("/europe-events")}>
            ← All Conferences
          </button>

          <div className="europe-event-hero__top-row">
            <div className="europe-event-hero__title-block">
              <h1 className="europe-event-hero__title">{conf.title}</h1>
              <div className="europe-event-hero__meta">
                <div className="europe-event-hero__meta-item">
                  <span className="europe-event-hero__meta-label">Date</span>
                  <span className="europe-event-hero__meta-value">{conf.date}</span>
                </div>
                <div className="europe-event-hero__meta-div" />
                <div className="europe-event-hero__meta-item">
                  <span className="europe-event-hero__meta-label">Location</span>
                  <span className="europe-event-hero__meta-value">{conf.location}</span>
                </div>
              </div>
            </div>

            <div className="europe-event-cta-card">
              <p className="europe-event-cta-card__label">Secure your spot</p>
              <h3 className="europe-event-cta-card__title">{conf.title}</h3>
              <div className="europe-event-cta-card__details">
                <div className="europe-event-cta-card__row">
                  <span className="europe-event-cta-card__row-label">📅 Date</span>
                  <span className="europe-event-cta-card__row-val">{conf.date}</span>
                </div>
                <div className="europe-event-cta-card__row">
                  <span className="europe-event-cta-card__row-label">📍 Venue</span>
                  <span className="europe-event-cta-card__row-val">{conf.location}</span>
                </div>
              </div>
              <button
                className="europe-event-cta-card__btn"
                onClick={() => navigate("/europe-register")}
              >
                Register Now
              </button>
              <button
                className="europe-event-cta-card__btn europe-event-cta-card__btn--outline"
                onClick={() => navigate("/europe-events")}
              >
                ← Browse All Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="europe-event-body">
        <div className="europe-event-body__inner">
          <section className="europe-event-section">
            <h2 className="europe-event-section__heading">About This Conference</h2>
            <div className="europe-event-section__paragraphs">
              {paragraphs.map((para, i) => (
                <p className="europe-event-section__text" key={i}>
                  {para}
                </p>
              ))}
            </div>
            {conf.fullDescription && (
              <div className="europe-event-theme-line">
                <span className="europe-event-theme-line__label">Theme</span>
                <p className="europe-event-theme-line__text">{conf.fullDescription}</p>
              </div>
            )}
          </section>

          {conf.themes && conf.themes.length > 0 && (
            <section className="europe-event-section">
              <h2 className="europe-event-section__heading">Conference Themes</h2>
              <p className="europe-event-section__sub">
                {conf.themes.length} topics covered across 2 days
              </p>
              <div className="europe-event-themes-grid">
                {conf.themes.map((theme, i) => (
                  <div className="europe-event-theme-chip" key={i}>
                    <span className="europe-event-theme-chip__num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="europe-event-theme-chip__text">{theme}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer theme="europe" />
    </div>
  );
}