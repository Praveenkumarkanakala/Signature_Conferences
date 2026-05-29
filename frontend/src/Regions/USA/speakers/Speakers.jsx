import { useEffect } from "react";
import { Navbar } from "../Landingpage/homepage.jsx";
import "./Speakers.css";
import Footer from "../../../Components/Footer/footer";
import "../Landingpage/homepage.css";
import USASpeakersSection from "./tempspeakers.jsx";

import speaker1 from "../Landingpage/images/galleryimg.jpeg";
import speaker2 from "../Landingpage/images/galleryimg1.jpeg";
import speaker3 from "../Landingpage/images/galleryimg2.jpeg";
import speaker4 from "../Landingpage/images/galleryimg3.jpeg";
import speaker5 from "../Landingpage/images/galleryimg4.jpeg";
import speaker6 from "../Landingpage/images/galleryimg5.jpeg";
import speaker7 from "../Landingpage/images/galleryimg6.jpeg";
import speaker8 from "../Landingpage/images/galleryimg7.jpeg";
import speaker9 from "../Landingpage/images/galleryimg8.jpeg";
import speaker10 from "../Landingpage/images/galleryimg9.jpeg";

function unlockScroll() {
  const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
  const targets = [document.documentElement, document.body];
  targets.forEach((el) => {
    el.style.removeProperty("overflow");
    el.style.removeProperty("overflow-x");
    el.style.removeProperty("overflow-y");
    el.style.removeProperty("height");
    el.style.removeProperty("max-height");
    el.style.removeProperty("position");
    el.style.removeProperty("top");
    el.style.removeProperty("left");
    el.style.removeProperty("width");
    el.style.removeProperty("padding-right");
  });
  if (scrollY > 0) window.scrollTo(0, scrollY);
}

const speakers = [
  { id: 1, name: "Speaker ",  image: speaker1 },
  { id: 2, name: "Keynote Speaker ",  image: speaker2 },
  { id: 3, name: "Keynote Speaker ",  image: speaker3 },
  { id: 4, name: "Speaker ",  image: speaker4 },
  { id: 5, name: "Keynote Speaker ",  image: speaker5 },
  { id: 6, name: "Keynote Speaker ", image: speaker6 },
  { id: 7, name: "Keynote Speaker ",  image: speaker7 },
  { id: 8, name: "Speaker ",  image: speaker8 },
  { id: 9, name: "Keynote Speaker ", image: speaker9 },
  { id: 10, name: "Speaker ", image: speaker10 },

];

/* ─── HERO ──────────────────────────────────── */
function SpeakersHero() {
  return (
    <section className="usa-sp-hero">
      <div className="usa-sp-hero__glow" />
      <div className="usa-sp-hero__content">
        <span className="usa-sp-hero__tag">Signature Global Conferences - Speakers</span>
        <h1 className="usa-sp-hero__title">
          Voices That
          <br />
          Move the World
        </h1>
      </div>
    </section>
  );
}

/* ─── SPEAKER CARD ───────────────────────────── */
function SpeakerCard({ speaker }) {
  return (
    <div className="usa-sp-card">
      <div className="usa-sp-card__image-wrap">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="usa-sp-card__img"
          loading="lazy"
        />
        <div className="usa-sp-card__overlay">
          <p className="usa-sp-card__overlay-role">{speaker.role}</p>
          <h3 className="usa-sp-card__overlay-name">{speaker.name}</h3>
        </div>
      </div>
    </div>
  );
}

/* ─── GRID ───────────────────────────────────── */
function SpeakersGrid() {
  return (
    <section className="usa-sp-grid-section">
      <div className="usa-sp-grid-section__inner">
        <div className="usa-sp-grid">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────────── */
export default function Speakers() {
  useEffect(() => {
    unlockScroll();
    const raf = requestAnimationFrame(unlockScroll);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="usa-page">
      <Navbar />
      {/* <SpeakersHero /> */}
      {/* <SpeakersGrid /> */}
      <USASpeakersSection/>
      <Footer theme="usa" />
    </div>
  );
}