import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../Landingpage/eurohome.jsx";
import Footer from "../../../Components/Footer/footer";
import { stats, pillars, values, missionText } from "./aboutusdata.js";
import "./aboutus.css";
import "../Landingpage/eurohome.css";

/* ─── SCROLL ANIMATION HOOK ─────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── HERO ──────────────────────────────── */
function AboutHero() {
    const navigate = useNavigate();

  const scrollToMission = () => {
    document.querySelector(".europe-mission")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="europe-hero">
      <div className="europe-hero__lines" />
      <div className="europe-hero__orb" />
      <div className="europe-hero__orb2" />
      <div className="europe-hero__inner">
        <div data-animate="fade-up">
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
            <button className="europe-btn europe-btn--primary" onClick={() => navigate("/europe-events")} >Explore Conferences</button>
            <button className="europe-btn europe-btn--ghost"  onClick={scrollToMission}>Our Story ↓</button>
          </div>
        </div>
        <div data-animate="fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="europe-hero__manifesto">
            <p className="europe-manifesto__quote">
              "Leadership is not a title. It is the courage to{" "}
              <span>inspire others."</span>
            </p>
            <div className="europe-manifesto__items">
              {["Voices are heard", "Stories inspire change", "Leaders rise with confidence", "Global impact begins here"].map((item) => (
                <div key={item} className="europe-manifesto__item">
                  <div className="europe-manifesto__dot" />
                  {item}
                </div>
              ))}
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
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="europe-stat"
            data-animate="fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
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

        {/* ── Header centered ── */}
        <div className="europe-mission__header" data-animate="fade-up">
          <span className="europe-section__eyebrow europe-section__eyebrow--center">
            Our Mission
          </span>
          <h2 className="europe-section__title europe-section__title--center">
            Inspiring Voices. Empowering Leaders. Creating Global Impact.
          </h2>
        </div>

        {/* ── Full mission text ── */}
        <div className="europe-mission__text-block" data-animate="fade-up">
          {missionText.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* ── Pillars 2x2 grid ── */}
        <div className="europe-pillars">
          {pillars.map((p, i) => (
            <div
              key={p.id}
              className="europe-pillar"
              data-animate="fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="europe-pillar__num">0{i + 1}</div>
              <div className="europe-pillar__icon-wrap">
                <span className="europe-pillar__icon">{p.icon}</span>
              </div>
              <div className="europe-pillar__title">{p.title}</div>
              <p className="europe-pillar__desc">{p.desc}</p>
            </div>
          ))}
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
        <div className="europe-values__header" data-animate="fade-up">
          <span className="europe-section__eyebrow europe-section__eyebrow--center">
            Our Values
          </span>
          <h2 className="europe-section__title europe-section__title--center">
            What We Stand For
          </h2>
        </div>
        <div className="europe-values__grid">
          {values.map((v, i) => (
            <div
              key={v.id}
              className="europe-value-card"
              data-animate="fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
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

/* ─── CTA ────────────────────────────────── */
function AboutCTA() {
  const navigate = useNavigate();
  return (
    <section className="europe-cta">
      <div className="europe-cta__inner" data-animate="fade-up">
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
          <button className="europe-btn europe-btn--primary" onClick={() => navigate("/europe-events")}>
            View Conferences
          </button>
          <button className="europe-btn europe-btn--ghost" onClick={() => navigate("/europe-register")}>
            Speak at an Event
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────── */
export default function AboutUs() {
  useScrollReveal();
  return (
    <div className="europe-page">
      <Navbar />
      <AboutHero />
      <StatsBar />
      <Mission />
      <Values />
      <AboutCTA />
      <Footer theme="europe" />
    </div>
  );
}