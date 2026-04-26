import { useNavigate } from "react-router-dom";
import { Navbar } from "../Landingpage/eurohome.jsx";
import Footer from "../../../Components/Footer/footer";
import { stats, pillars, values, timeline, testimonial, missionText } from "./aboutusdata.js";
import "./aboutus.css";
import "../Landingpage/eurohome.css";

/* ─── HERO ──────────────────────────────── */
function AboutHero() {
  return (
    <section className="europe-hero">
      <div className="europe-hero__lines" />
      <div className="europe-hero__orb" />
      <div className="europe-hero__orb2" />
      <div className="europe-hero__inner">
        <div>
          <span className="europe-hero__eyebrow">About Us</span>
          <h1 className="europe-hero__title">
            More Than a <br /> Conference. <br /> <em>A Movement.</em>
          </h1>
          <p className="europe-hero__sub">
            A premier international platform dedicated to inspiring voices,
            empowering leaders, and creating meaningful global impact — one
            stage, one story, one life at a time.
          </p>
          <div className="europe-hero__actions">
            <button className="europe-btn europe-btn--primary">
              Explore Conferences
            </button>
            <button className="europe-btn europe-btn--ghost">
              Our Story ↓
            </button>
          </div>
        </div>
        <div>
          <div className="europe-hero__manifesto">
            <p className="europe-manifesto__quote">
              "Leadership is not a title. It is the courage to{" "}
              <span>inspire others."</span>
            </p>
            <div className="europe-manifesto__items">
              <div className="europe-manifesto__item">
                <div className="europe-manifesto__dot" />
                Voices are heard
              </div>
              <div className="europe-manifesto__item">
                <div className="europe-manifesto__dot" />
                Stories inspire change
              </div>
              <div className="europe-manifesto__item">
                <div className="europe-manifesto__dot" />
                Leaders rise with confidence
              </div>
              <div className="europe-manifesto__item">
                <div className="europe-manifesto__dot" />
                Global impact begins here
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STATS BAR ─────────────────────────── */
function StatsBar() {
  return (
    <section className="europe-stats">
      <div className="europe-stats__inner">
        {stats.map((s) => (
          <div key={s.label} className="europe-stat">
            <div className="europe-stat__num">{s.value}</div>
            <div className="europe-stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── MISSION ────────────────────────────── */
function Mission() {
  return (
    <section className="europe-mission">
      <div className="europe-mission__bg" />
      <div className="europe-mission__inner">
        <div className="europe-mission__grid">
          <div>
            <span className="europe-section__eyebrow">Our Mission</span>
            <h2 className="europe-section__title">
              Creating Spaces Where Voices Matter
            </h2>
            <div className="europe-mission__text">
              {missionText.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          <div className="europe-pillars">
            {pillars.map((p) => (
              <div key={p.id} className="europe-pillar">
                <span className="europe-pillar__icon">{p.icon}</span>
                <div className="europe-pillar__title">{p.title}</div>
                <p className="europe-pillar__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── VALUES ─────────────────────────────── */
function Values() {
  return (
    <section className="europe-values">
      <div className="europe-values__inner">
        <div className="europe-values__header">
          <span className="europe-section__eyebrow europe-section__eyebrow--center">
            Our Values
          </span>
          <h2 className="europe-section__title europe-section__title--center">
            What We Stand For
          </h2>
        </div>
        <div className="europe-values__grid">
          {values.map((v) => (
            <div key={v.id} className="europe-value-card">
              <div className="europe-value-card__num">{v.num}</div>
              <div className="europe-value-card__title">{v.title}</div>
              <div className="europe-value-card__rule" />
              <p className="europe-value-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STORY / TIMELINE ──────────────────── */
function Story() {
  return (
    <section className="europe-story">
      <div className="europe-story__inner">
        <div>
          <span className="europe-section__eyebrow">Our Story</span>
          <h2 className="europe-section__title">How the Movement Began</h2>
          <div className="europe-timeline">
            {timeline.map((item) => (
              <div key={item.id} className="europe-timeline__item">
                <div className="europe-timeline__dot">{item.step}</div>
                <div>
                  <div className="europe-timeline__year">{item.year}</div>
                  <div className="europe-timeline__title">{item.title}</div>
                  <p className="europe-timeline__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="europe-story__quote">
          <div className="europe-quote-card">
            <span className="europe-quote__mark">"</span>
            <p className="europe-quote__text">{testimonial.quote}</p>
            <div className="europe-quote__author">
              <div className="europe-quote__avatar">{testimonial.initials}</div>
              <div>
                <div className="europe-quote__name">{testimonial.author}</div>
                <div className="europe-quote__role">{testimonial.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────── */
function AboutCTA() {
  const navigate = useNavigate();
  return (
    <section className="europe-cta">
      <div className="europe-cta__inner">
        <h2 className="europe-cta__title">
          Ready to Step Into
          <br />
          <em>Your Global Stage?</em>
        </h2>
        <p className="europe-cta__sub">
          Join thousands of leaders, speakers, and changemakers who have already
          stepped into their purpose at Signature Global Conferences.
        </p>
        <div className="europe-cta__btns">
          <button
            className="europe-btn europe-btn--primary"
            onClick={() => navigate("/europe-events")}
          >
            View Conferences
          </button>
          <button
            className="europe-btn europe-btn--ghost"
            onClick={() => navigate("/europe-register")}
          >
            Speak at an Event
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────── */
export default function AboutUs() {
  return (
    <div className="europe-page">
      <Navbar />
      <AboutHero />
      <StatsBar />
      <Mission />
      <Values />
      <Story />
      <AboutCTA />
      <Footer theme="europe" />
    </div>
  );
}