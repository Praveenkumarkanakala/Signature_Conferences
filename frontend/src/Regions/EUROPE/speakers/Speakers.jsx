import { useState } from "react";
import { Navbar } from "../Landingpage/eurohome.jsx";
import "./Speakers.css";
import "../Landingpage/eurohome.css";
import Footer from "../../../Components/Footer/footer";


import spimg from "../../USA/Landingpage/images/galleryimgus.jpeg";
import spimg1 from "../../USA/Landingpage/images/galleryimgus1.jpeg";
import spimg2 from "../../USA/Landingpage/images/galleryimgus2.jpeg";
import spimg3 from "../../USA/Landingpage/images/galleryimgus3.jpeg";
import spimg4 from "../../USA/Landingpage/images/galleryimgus4.jpeg";
import spimg5 from "../../USA/Landingpage/images/galleryimgus5.jpeg";
import spimg6 from "../../USA/Landingpage/images/usagallery5.jpeg";
import spimg7 from "../../USA/Landingpage/images/usagallery7.jpeg";
import spimg8 from "../../USA/Landingpage/images/usagallery9.jpeg";
import spimg9 from "../../USA/Landingpage/images/usagallery13.jpeg";


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
      <SpeakersHero /> 
       <SpeakersGrid />
      <Footer theme="europe" />
    </div>
  );
}