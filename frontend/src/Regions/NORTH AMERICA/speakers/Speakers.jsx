import { useState } from "react";
import { NaNavbar } from "../NAHome/Nahome";
import "./Speakers.css";
import Footer from "../../../Components/Footer/footer";

// Speaker photos — replace these imports with your own images.
// Drop files into the same folder as this component and update the paths below.
import speaker1 from "../../USA/Landingpage/images/galleryimgus.jpeg";
import speaker2 from "../../USA/Landingpage/images/galleryimgus1.jpeg";
import speaker3 from "../../USA/Landingpage/images/galleryimgus2.jpeg";
import speaker4 from "../../USA/Landingpage/images/galleryimgus3.jpeg";
import speaker5 from "../../USA/Landingpage/images/galleryimgus4.jpeg";
import speaker6 from "../../USA/Landingpage/images/galleryimgus5.jpeg";
import speaker7 from "../../USA/Landingpage/images/usagallery7.jpeg";
import speaker8 from "../../USA/Landingpage/images/usagallery13.jpeg";
import speaker9 from "../../USA/Landingpage/images/usagallery5.jpeg";
import speaker10 from "../../USA/Landingpage/images/usagallery9.jpeg";
import speaker11 from "../../USA/Landingpage/images/Marcia Hamilton.jpeg";
import speaker12 from "../../USA/Landingpage/images/Cara Tyrrell.jpeg";
import speaker13 from "../../USA/Landingpage/images/JanetHamilton.jpeg";




export const speakerCategories = [
  { id: "all", label: "All Speakers" },
  { id: "women-leadership", label: "Women & Leadership" },
  { id: "ai-stem", label: "AI & STEM" },
  { id: "business", label: "Business" },
  { id: "wellness", label: "Wellness" },
];

// Edit this array to add or update speakers.
// "label" shows only on hover — set it to "" to skip a label for that speaker.
// IMPORTANT: give each speaker their own unique image import above —
// right now they all point at the same placeholder file.
const speakers = [
  { id: 1, img: speaker1, label: "Speaker" },
  { id: 2, img: speaker2, label: "Speaker" },
  { id: 3, img: speaker3, label: "Keynote Speaker" },
  { id: 4, img: speaker4, label: "Speaker" },
  { id: 5, img: speaker5, label: "Keynote Speaker" },
  { id: 6, img: speaker6, label: "Speaker" },
  { id: 7, img: speaker7, label: "Speaker" },
  { id: 8, img: speaker8, label: "Keynote Speaker" },
  { id: 9, img: speaker9, label: "Speaker" },
  { id: 10, img: speaker10, label: "Speaker" },
  { id: 11, img: speaker11, label: "Keynote Speaker" },
  { id: 12, img: speaker12, label: "Speaker" }, 
  { id: 13, img: speaker13, label: "Keynote Speaker" },
];

function SpeakersHero() {
  return (
    <section className="na-speakers-hero">
      <div className="na-speakers-hero__content">
        <span className="na-speakers-hero__tag">
          Signature Global Conferences — Speakers
        </span>
        <h1 className="na-speakers-hero__title">
          VOICES THAT
          <br />
          MOVE <em>THE WORLD</em>
        </h1>
      </div>
    </section>
  );
}

function SpeakerCard({ speaker }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="na-speaker-card">
      <div className="na-speaker-card__frame">
        {!imgError ? (
          <img
            src={speaker.img}
            alt="Speaker"
            className="na-speaker-card__img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="na-speaker-card__img-fallback" />
        )}

        {speaker.label && (
          <>
            <div className="na-speaker-card__scrim" />
            <span className="na-speaker-card__label">{speaker.label}</span>
          </>
        )}
      </div>
    </article>
  );
}

function SpeakersGrid() {
  return (
    <section className="na-speakers-grid-section">
      <div className="na-speakers-grid-section__inner">
        <div className="na-speakers-grid">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Speakers() {
  return (
    <div className="na-page">
      <NaNavbar />
      <SpeakersHero />
      <SpeakersGrid />
      <Footer theme="northamerica" />
    </div>
  );
}