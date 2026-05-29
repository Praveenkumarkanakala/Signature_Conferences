import { useState } from "react";
import { NaNavbar } from "../NAHome/Nahome";
import "./Speakers.css";
import Footer from "../../../Components/Footer/footer";
import speakerImg from "./image.png";

export const speakerCategories = [
  { id: "all", label: "All Speakers" },
  { id: "women-leadership", label: "Women & Leadership" },
  { id: "ai-stem", label: "AI & STEM" },
  { id: "business", label: "Business" },
  { id: "wellness", label: "Wellness" },
];

function SpeakersHero() {
  return (
    <section className="na-speakers-hero">
      <div className="na-speakers-hero__content">
        <span className="na-speakers-hero__tag">
          North America Signature Global Conferences – Speakers
        </span>
        <h1 className="na-speakers-hero__title">
          Our Speakers Are <em>Coming Soon</em>
        </h1>
      </div>
    </section>
  );
}

function FilterBar({ active, onChange }) {
  return (
    <div className="na-speakers-filters">
      <div className="na-speakers-filters__inner">
        {speakerCategories.map((f) => (
          <button
            key={f.id}
            className={`na-speakers-filters__pill${
              active === f.id ? " na-speakers-filters__pill--active" : ""
            }`}
            onClick={() => onChange(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ComingSoonSection() {
  return (
    <section className="na-speakers-split">
      <div className="na-speakers-split__img-wrap">
        <img
          src={speakerImg}
          alt="Speaker presenting to audience"
          className="na-speakers-split__img"
        />
        <div className="na-speakers-split__img-overlay" />

        {/* Quote overlay on image for mobile */}
        <div className="na-speakers-split__mobile-quote">
          <span className="na-speakers-split__quote-mark">"</span>
          <p className="na-speakers-split__journey-text">
            Every great journey starts with a first step.
          </p>
          <p className="na-speakers-split__quote-text">
            We are curating a powerful lineup of global speakers, industry
            leaders, and changemakers. Stay tuned as we unveil inspiring voices
            for our upcoming conferences.
          </p>
          <div className="na-speakers-split__quote-line" />
        </div>
      </div>

      {/* Desktop quote panel */}
      <div className="na-speakers-split__quote">
        <div className="na-speakers-split__quote-inner">
          <span className="na-speakers-split__quote-mark">"</span>
          <h2 className="na-speakers-split__journey-heading">
            Every great journey<br />starts with a<br />
            <em>first step.</em>
          </h2>
          <p className="na-speakers-split__quote-text">
            We are curating a powerful lineup of global speakers, industry
            leaders, and changemakers. Stay tuned as we unveil inspiring voices
            for our upcoming conferences.
          </p>
          <div className="na-speakers-split__quote-line" />
        </div>
      </div>
    </section>
  );
}

export default function Speakers() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="na-page">
      <NaNavbar />
      <SpeakersHero />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <ComingSoonSection />
      <Footer theme="northamerica" />
    </div>
  );
}