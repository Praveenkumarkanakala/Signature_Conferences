import { useParams, useNavigate } from "react-router-dom";
import { getConferenceByRegionAndId } from "../../globaldata/eventsglobaldata";
import { Navbar } from "../Home/asia.jsx";

import "./individual_eventpage.css";
import Footer from "../../../Components/Footer/footer";

const REGION = "asia";
const CATEGORY_LABELS = { "women-leadership": "Women Leadership", wellness: "Wellness", "ai-stem": "AI & STEM", business: "Business" };

export default function AsiaEventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const conf = getConferenceByRegionAndId(REGION, id);

  if (!conf) {
    return (
      // ✅ Root wrapper to prevent CSS leakage
      <div className="as-page">
        <Navbar />
        <div className="as-ed-notfound">
          <h2>Conference not found.</h2>
          <button className="as-ed-back-btn" onClick={() => navigate("/asiaevents")}>Back to Events</button>
        </div>
        <Footer theme="asia" />
      </div>
    );
  }

  const paragraphs = conf.description ? conf.description.split("\n\n").filter(Boolean) : [];
  const category = CATEGORY_LABELS[conf.category];

  const MetaItem = ({ label, value }) => (
    <>
      <div className="as-ed-hero__meta-item">
        <span className="as-ed-hero__meta-label">{label}</span>
        <span className="as-ed-hero__meta-value">{value}</span>
      </div>
      <div className="as-ed-hero__meta-div" />
    </>
  );

  const CtaRow = ({ label, value }) => (
    <div className="as-ed-cta-card__row">
      <span className="as-ed-cta-card__row-label">{label}</span>
      <span className="as-ed-cta-card__row-val">{value}</span>
    </div>
  );

  return (
    // ✅ Root wrapper to prevent CSS leakage
    <div className="as-page">
      <Navbar />
      <section className="as-ed-hero">
        <div className="as-ed-hero__img-wrap">
          <img src={conf.image} alt={conf.title} className="as-ed-hero__img" />
          <div className="as-ed-hero__overlay" />
        </div>
        <div className="as-ed-hero__content">
          <button className="as-ed-back-btn" onClick={() => navigate("/asiaevents")}>All Conferences</button>
          <div className="as-ed-hero__top-row">
            <div className="as-ed-hero__title-block">
              <span className="as-ed-hero__cat">{category}</span>
              <h1 className="as-ed-hero__title">{conf.title}</h1>
              <div className="as-ed-hero__meta">
                <MetaItem label="Date" value={conf.date} />
                <MetaItem label="Location" value={conf.location} />
                <div className="as-ed-hero__meta-item">
                  <span className="as-ed-hero__meta-label">Category</span>
                  <span className="as-ed-hero__meta-value">{category}</span>
                </div>
              </div>
            </div>
            <div className="as-ed-cta-card">
              <p className="as-ed-cta-card__label">Secure your spot</p>
              <h3 className="as-ed-cta-card__title">{conf.title}</h3>
              <div className="as-ed-cta-card__details">
                <CtaRow label="Date" value={conf.date} />
                <CtaRow label="Venue" value={conf.location} />
                <CtaRow label="Category" value={category} />
              </div>
              <button className="as-ed-cta-card__btn" onClick={() => navigate("/asiaregister")}>Register Now</button>
              <button className="as-ed-cta-card__btn as-ed-cta-card__btn--outline" onClick={() => navigate("/asiaevents")}>Browse All Events</button>
            </div>
          </div>
        </div>
      </section>

      <div className="as-ed-body">
        <div className="as-ed-body__inner">
          <section className="as-ed-section">
            <h2 className="as-ed-section__heading">About This Conference</h2>
            <div className="as-ed-section__paragraphs">
              {paragraphs.map((para, i) => <p className="as-ed-section__text" key={i}>{para}</p>)}
            </div>
            {conf.fullDescription && (
              <div className="as-ed-theme-line">
                <span className="as-ed-theme-line__label">Theme</span>
                <p className="as-ed-theme-line__text">{conf.fullDescription}</p>
              </div>
            )}
          </section>

          {conf.themes?.length > 0 && (
            <section className="as-ed-section">
              <h2 className="as-ed-section__heading">Conference Themes</h2>
              <p className="as-ed-section__sub">{conf.themes.length} topics covered across 2 days</p>
              <div className="as-ed-themes-grid">
                {conf.themes.map((theme, i) => (
                  <div className="as-ed-theme-chip" key={i}>
                    <span className="as-ed-theme-chip__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="as-ed-theme-chip__text">{theme}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer theme="asia"/>
    </div>
  );
}