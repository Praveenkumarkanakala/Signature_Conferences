import { useParams, useNavigate } from "react-router-dom";
import { getConferenceByRegionAndId } from "../../globaldata/eventsglobaldata.js";
import { Navbar } from "../Landingpage/homepage.jsx";
import "./individual_eventpage.css";
import Footer from "../../../Components/Footer/footer";

const REGION = "usa";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const conf = getConferenceByRegionAndId(REGION, id);

  if (!conf) {
    return (
      <div className="usa-page">
        <Navbar />
        <div className="usa-eid-notfound">
          <h2>Conference not found.</h2>
          <button
            className="usa-eid-back-btn"
            onClick={() => navigate("/usa-events")}
          >
            ← Back to Events
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const paragraphs = conf.description
    ? conf.description.split("\n\n").filter(Boolean)
    : [];

  const MetaItem = ({ label, value }) => (
    <>
      <div className="usa-eid-hero__meta-item">
        <span className="usa-eid-hero__meta-label">{label}</span>
        <span className="usa-eid-hero__meta-value">{value}</span>
      </div>
      <div className="usa-eid-hero__meta-div" />
    </>
  );

  const CtaRow = ({ icon, label, value }) => (
    <div className="usa-eid-cta-card__row">
      <span className="usa-eid-cta-card__row-label">
        {icon} {label}
      </span>
      <span className="usa-eid-cta-card__row-val">{value}</span>
    </div>
  );

  return (
    <div className="usa-page">
      <Navbar />

      <section className="usa-eid-hero">
        <div className="usa-eid-hero__img-wrap">
          <img
            src={conf.image}
            alt={conf.title}
            className="usa-eid-hero__img"
          />
          <div className="usa-eid-hero__overlay" />
        </div>

        <div className="usa-eid-hero__content">
          <button
            className="usa-eid-back-btn"
            onClick={() => navigate("/usa-events")}
          >
            ← All Conferences
          </button>

          <div className="usa-eid-hero__top-row">
            <div className="usa-eid-hero__title-block">
              <h1 className="usa-eid-hero__title">{conf.title}</h1>
              <div className="usa-eid-hero__meta">
                <MetaItem label="Date" value={conf.date} />
                <MetaItem label="Location" value={conf.location} />
              </div>
            </div>

            <div className="usa-eid-cta-card">
              <p className="usa-eid-cta-card__label">Secure your spot</p>
              <h3 className="usa-eid-cta-card__title">{conf.title}</h3>
              <div className="usa-eid-cta-card__details">
                <CtaRow icon="📅" label="Date" value={conf.date} />
                <CtaRow icon="📍" label="Venue" value={conf.location} />
              </div>
              <button
                className="usa-eid-cta-card__btn"
                onClick={() => navigate("/usa-register")}
              >
                Register Now
              </button>
              <button  className="usa-eid-cta-card__btn usa-eid-cta-card__btn--outline"  onClick={() => navigate("/usa-events")}  >   ← Browse All Events  </button>
            </div>
          </div>
        </div>
      </section>

      <div className="usa-eid-body">
        <div className="usa-eid-body__inner">
          <section className="usa-eid-section">
            <h2 className="usa-eid-section__heading">About This Conference</h2>
            <div className="usa-eid-section__paragraphs">
              {paragraphs.map((para, i) => (
                <p className="usa-eid-section__text" key={i}>
                  {para}
                </p>
              ))}
            </div>
            {conf.fullDescription && (
              <div className="usa-eid-theme-line">
                <span className="usa-eid-theme-line__label">Theme</span>
                <p className="usa-eid-theme-line__text">{conf.fullDescription}</p>
              </div>
            )}
          </section>

          {conf.themes?.length > 0 && (
            <section className="usa-eid-section">
              <h2 className="usa-eid-section__heading">Conference Themes</h2>
              <p className="usa-eid-section__sub">
                {conf.themes.length} topics covered across 2 days
              </p>
              <div className="usa-eid-themes-grid">
                {conf.themes.map((theme, i) => (
                  <div className="usa-eid-theme-chip" key={i}>
                    <span className="usa-eid-theme-chip__num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="usa-eid-theme-chip__text">{theme}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer theme="usa" />
    </div>
  );
}