import {
  speakers,
} from "./speakerdata.jsx";
import { Navbar } from "../Home/asia.jsx";
import "./Speakers.css";
import "../Home/asia.css";
import Footer from "../../../Components/Footer/footer";

function SpeakersHero() {
  return (
    <section className="as-sp-hero">
      <div className="as-sp-hero__glow" />
      <div className="as-sp-hero__inner">
        <p className="as-sp-hero__kicker">
          <span className="as-sp-hero__line" />
          Signature Global Conferences — Speakers
          <span className="as-sp-hero__line" />
        </p>
        <h1 className="as-sp-hero__title">
          Voices That
          <br />
          Move The World
        </h1>
      </div>
    </section>
  );
}

function SpeakerCard({ speaker }) {
  return (
    <article className="as-sp-card">
      <div className="as-sp-card__imageWrap">
        <img src={speaker.image} alt={speaker.name} className="as-sp-card__img" />
      </div>
    </article>
  );
}

function SpeakersGrid() {
  const featured = speakers.slice(0, 10);

  return (
    <section className="as-sp-grid-section">
      <div className="as-sp-grid-section__inner">
        <div className="as-sp-grid">
          {featured.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AsiaSpeakers() {
  return (
    <div className="as-page">
      <Navbar />
      <SpeakersHero />
      <SpeakersGrid />
      <Footer theme="asia" />
    </div>
  );
}