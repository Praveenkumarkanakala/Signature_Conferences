import { useState } from "react";
import { Navbar } from "../Landingpage/eurohome.jsx";
import "./Speakers.css";
import "../Landingpage/eurohome.css";
import Footer from "../../../Components/Footer/footer";
import { TempSpeakersHero, TempSpeakersFilter, TempSpeakersComingSoon } from "./tempspeakers";



import spimg from "./images/euroimg.jpeg";
import spimg1 from "./images/euroimg1.jpeg";
import spimg2 from "./images/euroimg2.jpeg";
import spimg3 from "./images/euroimg3.jpeg";
import spimg4 from "./images/euroimg4.jpeg";
import spimg5 from "./images/euroimg5.jpeg";
import spimg6 from "./images/euroimg6.jpeg";
import spimg7 from "./images/euroimg7.jpeg";
import spimg8 from "./images/euroimg8.jpeg";
import spimg9 from "./images/euroimg9.jpeg";
import spimg10 from "./images/euroimg10.jpeg";
import spimg11 from "./images/euroimg11.jpeg";
import spimg12 from "./images/euroimg12.jpeg";
import spimg13 from "./images/euroimg13.jpeg";

/* ─── HARDCODED SPEAKER IMAGES ───────────────── */
const speakers = [
  { id: 1,  image: spimg,  alt: "Speaker 1" },
  { id: 2,  image: spimg1,  alt: "Speaker 2" },
  { id: 3,  image: spimg2,  alt: "Speaker 3" },
  { id: 4,  image: spimg3,  alt: "Speaker 4" },
  { id: 5,  image: spimg4,  alt: "Speaker 5" },
  { id: 6,  image: spimg5,  alt: "Speaker 6" },
  { id: 7,  image: spimg6,  alt: "Speaker 7" },
  { id: 8,  image: spimg7,  alt: "Speaker 8" },
  { id: 9,  image: spimg8,  alt: "Speaker 9" },
  { id: 10, image:spimg9, alt: "Speaker 10" },
  { id: 11, image:spimg10, alt: "Speaker 11" },
  { id: 12, image:spimg11, alt: "Speaker 12" },
  { id: 13, image:spimg12, alt: "Speaker 13" },
  { id: 14, image: spimg13, alt: "Speaker 14" },
];

/* ─── HERO ───────────────────────────────────── */
function SpeakersHero() {
  return (
    <section className="europe-speakers-hero">
      <div className="europe-speakers-hero__content">
        <span className="europe-speakers-hero__tag">
          Signature Global Conferences · Speakers
        </span>
        <h1 className="europe-speakers-hero__title">
          Voices That <br /> Move the World
        </h1>
      </div>
    </section>
  );
}

/* ─── CARD ───────────────────────────────────── */
function SpeakerCard({ speaker }) {
  return (
    <div className="europe-speakers-card">
      <img
        src={speaker.image}
        alt={speaker.alt}
        className="europe-speakers-card__img"
      />
    </div>
  );
}

/* ─── GRID ───────────────────────────────────── */
function SpeakersGrid() {
  return (
    <section className="europe-speakers-grid-section">
      <div className="europe-speakers-grid">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────────── */
export default function Speakers() {
    const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="europe-page">
      <Navbar />

       <TempSpeakersHero />
      <TempSpeakersFilter active={activeFilter} onChange={setActiveFilter} />
      <TempSpeakersComingSoon />

      {/* <SpeakersHero /> 
       <SpeakersGrid /> */}
      <Footer theme="europe" />
    </div>
  );
}