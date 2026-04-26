import { useNavigate } from "react-router-dom";
import { Navbar} from "../Landingpage/homepage.jsx";
import Footer from "../../../Components/Footer/footer";
import {stats, pillars, values, timeline, testimonial, missionText,} from "./aboutusdata.js";
import "./aboutus.css";
import "../Landingpage/homepage.css";

/* ─── HERO ──────────────────────────────── */
function AboutHero() {
  return (
    <section className="usa-ab-hero">
      <div className="usa-ab-hero__lines" />
      <div className="usa-ab-hero__orb" />
      <div className="usa-ab-hero__orb2" />
      <div className="usa-ab-hero__inner">
        <div>
          <span className="usa-ab-hero__eyebrow">About Us</span>
          <h1 className="usa-ab-hero__title"> More Than a  <br />  Conference. <br /> <em>A Movement.</em> </h1>
          <p className="usa-ab-hero__sub">
            A premier international platform dedicated to inspiring voices,
            empowering leaders, and creating meaningful global impact — one
            stage, one story, one life at a time.
          </p>
          <div className="usa-ab-hero__actions">
            <button className="usa-hp-btn usa-hp-btn--primary"> Explore Conferences </button>
            <button className="usa-hp-btn usa-hp-btn--ghost">Our Story ↓</button>
          </div>
        </div>
        <div>
          <div className="usa-ab-hero__manifesto">
            <p className="usa-ab-manifesto__quote"> "Leadership is not a title. It is the courage to{" "}  <span>inspire others."</span> </p>
            <div className="usa-ab-manifesto__items">
              <div className="usa-ab-manifesto__item">
                <div className="usa-ab-manifesto__dot" /> Voices are heard </div>
              <div className="usa-ab-manifesto__item">
                <div className="usa-ab-manifesto__dot" /> Stories inspire change </div>
              <div className="usa-ab-manifesto__item">
                <div className="usa-ab-manifesto__dot" /> Leaders rise with confidence </div>
              <div className="usa-ab-manifesto__item">
                <div className="usa-ab-manifesto__dot" /> Global impact begins here </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STATS BAR ──────────────────────────── */
function StatsBar() {
  return (
    <section className="usa-ab-stats">
      <div className="usa-ab-stats__inner">
        {stats.map((s) => (
          <div key={s.label} className="usa-ab-stat">
            <div className="usa-ab-stat__num">{s.value}</div>
            <div className="usa-ab-stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── MISSION ────────────────────────────── */
function Mission() {
  return (
    <section className="usa-ab-mission">
      <div className="usa-ab-mission__bg" />
      <div className="usa-ab-mission__inner">
        <div className="usa-ab-mission__grid">
          <div>
            <span className="usa-ab-section__eyebrow">Our Mission</span>
            <h2 className="usa-ab-section__title"> Creating Spaces Where Voices Matter </h2>
            <div className="usa-ab-mission__text">
              {missionText.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          <div className="usa-ab-pillars">
            {pillars.map((p) => (
              <div key={p.id} className="usa-ab-pillar">
                <span className="usa-ab-pillar__icon">{p.icon}</span>
                <div className="usa-ab-pillar__title">{p.title}</div>
                <p className="usa-ab-pillar__desc">{p.desc}</p>
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
    <section className="usa-ab-values">
      <div className="usa-ab-values__inner">
        <div className="usa-ab-values__header">
          <span className="usa-ab-section__eyebrow usa-ab-section__eyebrow--center"> Our Values </span>
          <h2 className="usa-ab-section__title usa-ab-section__title--center"> What We Stand For </h2>
        </div>
        <div className="usa-ab-values__grid">
          {values.map((v) => (
            <div key={v.id} className="usa-ab-value-card">
              <div className="usa-ab-value-card__num">{v.num}</div>
              <div className="usa-ab-value-card__title">{v.title}</div>
              <div className="usa-ab-value-card__rule" />
              <p className="usa-ab-value-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STORY / TIMELINE ───────────────────── */
function Story() {
  return (
    <section className="usa-ab-story">
      <div className="usa-ab-story__inner">
        <div>
          <span className="usa-ab-section__eyebrow">Our Story</span>
          <h2 className="usa-ab-section__title">How the Movement Began</h2>
          <div className="usa-ab-timeline">
            {timeline.map((item) => (
              <div key={item.id} className="usa-ab-timeline__item">
                <div className="usa-ab-timeline__dot">{item.step}</div>
                <div>
                  <div className="usa-ab-timeline__year">{item.year}</div>
                  <div className="usa-ab-timeline__title">{item.title}</div>
                  <p className="usa-ab-timeline__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="usa-ab-story__quote">
          <div className="usa-ab-quote-card">
            <span className="usa-ab-quote__mark">"</span>
            <p className="usa-ab-quote__text">{testimonial.quote}</p>
            <div className="usa-ab-quote__author">
              <div className="usa-ab-quote__avatar">{testimonial.initials}</div>
              <div>
                <div className="usa-ab-quote__name">{testimonial.author}</div>
                <div className="usa-ab-quote__role">{testimonial.role}</div>
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
    <section className="usa-ab-cta">
      <div className="usa-ab-cta__inner">
        <h2 className="usa-ab-cta__title"> Ready to Step Into <br /> <em>Your Global Stage?</em> </h2>
        <p className="usa-ab-cta__sub">
          Join thousands of leaders, speakers, and changemakers who have already
          stepped into their purpose at Signature Global Conferences.
        </p>
        <div className="usa-ab-cta__btns">
          <button className="usa-hp-btn usa-hp-btn--primary" onClick={() => navigate("/events")} >  View Conferences  </button>
          <button className="usa-hp-btn usa-hp-btn--ghost" onClick={() => navigate("/register")} > Speak at an Event </button>
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────── */
export default function AboutUs() {
  return (
    <div className="usa-page">
      <Navbar />
      <AboutHero />
      <StatsBar />
      <Mission />
      <Values />
      <Story />
      <AboutCTA />
      <Footer theme="usa"/>
    </div>
  );
}