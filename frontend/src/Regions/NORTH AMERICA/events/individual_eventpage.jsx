import { useParams, useNavigate } from "react-router-dom";
import { getConferenceByRegionAndId } from "../../globaldata/eventsglobaldata.js";
import { NaNavbar } from "../NAHome/Nahome";
import "./individual_eventpage.css";
import Footer from "../../../Components/Footer/footer";

const REGION = "north-america";
const categoryLabels = { "women-leadership": "Women Leadership", wellness: "Wellness", "ai-stem": "AI & STEM", business: "Business" };

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const conf = getConferenceByRegionAndId(REGION, id);

  if (!conf) return (
    <div className="na-page">
      <NaNavbar />
      <div className="na-ed-notfound">
        <h2>Conference not found.</h2>
        <button className="na-ed-back-btn" onClick={() => navigate("/na-events")}>← Back to Events</button>
      </div>
      <Footer theme="northamerica" />
    </div>
  );

  const paragraphs = conf.description ? conf.description.split("\n\n").filter(Boolean) : [];

  return (
    <div className="na-page">
      <NaNavbar />

      <section className="na-ed-hero">
        <div className="na-ed-hero__img-wrap">
          <img src={conf.image} alt={conf.title} className="na-ed-hero__img" />
          <div className="na-ed-hero__overlay" />
        </div>
        <div className="na-ed-hero__content">
          <div className="na-ed-hero__top-row">

            <div className="na-ed-hero__title-block">
              <span className="na-ed-hero__cat">{categoryLabels[conf.category]}</span>
              <h1 className="na-ed-hero__title">{conf.title}</h1>
              <div className="na-ed-hero__meta">
                <div className="na-ed-hero__meta-item">
                  <span className="na-ed-hero__meta-label">Date</span>
                  <span className="na-ed-hero__meta-value">{conf.date}</span>
                </div>
                <div className="na-ed-hero__meta-div" />
                <div className="na-ed-hero__meta-item">
                  <span className="na-ed-hero__meta-label">Location</span>
                  <span className="na-ed-hero__meta-value">{conf.location}</span>
                </div>
                <div className="na-ed-hero__meta-div" />
                <div className="na-ed-hero__meta-item">
                  <span className="na-ed-hero__meta-label">Category</span>
                  <span className="na-ed-hero__meta-value">{categoryLabels[conf.category]}</span>
                </div>
              </div>
            </div>

            <div className="na-ed-cta-card">
              <p className="na-ed-cta-card__label">Secure your spot</p>
              <h3 className="na-ed-cta-card__title">{conf.title}</h3>
              <div className="na-ed-cta-card__details">
                <div className="na-ed-cta-card__row">
                  <span className="na-ed-cta-card__row-label">📅 Date</span>
                  <span className="na-ed-cta-card__row-val">{conf.date}</span>
                </div>
                <div className="na-ed-cta-card__row">
                  <span className="na-ed-cta-card__row-label">📍 Venue</span>
                  <span className="na-ed-cta-card__row-val">{conf.location}</span>
                </div>
                <div className="na-ed-cta-card__row">
                  <span className="na-ed-cta-card__row-label">🏷️ Category</span>
                  <span className="na-ed-cta-card__row-val">{categoryLabels[conf.category]}</span>
                </div>
              </div>
              <button className="na-ed-cta-card__btn" onClick={() => navigate("/na-register")}>Register Now</button>
              <button className="na-ed-cta-card__btn na-ed-cta-card__btn--outline" onClick={() => navigate("/na-events")}>← Browse All Events</button>
            </div>

          </div>
        </div>
      </section>

      <div className="na-ed-body">
        <div className="na-ed-body__inner">
          <section className="na-ed-section">
            <h2 className="na-ed-section__heading">About This Conference</h2>
            <div className="na-ed-section__paragraphs">
              {paragraphs.map((para, i) => <p className="na-ed-section__text" key={i}>{para}</p>)}
            </div>
            {conf.fullDescription && (
              <div className="na-ed-theme-line">
                <span className="na-ed-theme-line__label">Theme</span>
                <p className="na-ed-theme-line__text">{conf.fullDescription}</p>
              </div>
            )}
          </section>

          {conf.themes && conf.themes.length > 0 && (
            <section className="na-ed-section">
              <h2 className="na-ed-section__heading">Conference Themes</h2>
              <p className="na-ed-section__sub">{conf.themes.length} topics covered across 2 days</p>
              <div className="na-ed-themes-grid">
                {conf.themes.map((theme, i) => (
                  <div className="na-ed-theme-chip" key={i}>
                    <span className="na-ed-theme-chip__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="na-ed-theme-chip__text">{theme}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer theme="northamerica" />
    </div>
  );
}