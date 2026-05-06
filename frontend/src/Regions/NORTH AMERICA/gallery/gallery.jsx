import { useState } from "react";
import { NaNavbar } from "../NAHome/Nahome";
import "./gallery.css";
import Footer from "../../../Components/Footer/footer";
import galleryImg from "./galleyimg.png"; // replace with your image

/* ─── GALLERY CATEGORIES ─────────────────────── */
const galleryCategories = [
  { id: "all", label: "All" },
  { id: "keynotes", label: "Keynotes" },
  { id: "panels", label: "Panels" },
  { id: "networking", label: "Networking" },
  { id: "workshops", label: "Workshops" },
];

/* ─── HERO ──────────────────────────────────── */
function GalleryHero() {
  return (
    <section className="na-gallery-hero">
      <div className="na-gallery-hero__content">
        <span className="na-gallery-hero__tag">
          North America Signature Global Conferences – Gallery
        </span>
        <h1 className="na-gallery-hero__title">
          A collection of unforgettable<br />
          experiences—<em>coming soon.</em>
        </h1>
      </div>
    </section>
  );
}

/* ─── FILTER BAR ─────────────────────────────── */
function FilterBar({ active, onChange }) {
  return (
    <div className="na-gallery-filters">
      <div className="na-gallery-filters__inner">
        {galleryCategories.map((f) => (
          <button
            key={f.id}
            className={`na-gallery-filters__pill${
              active === f.id ? " na-gallery-filters__pill--active" : ""
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

/* ─── COMING SOON SPLIT SECTION ─────────────── */
function ComingSoonSection() {
  return (
    <section className="na-gallery-split">
      <div className="na-gallery-split__img-wrap">
        <img
          src={galleryImg}
          alt="Conference gallery coming soon"
          className="na-gallery-split__img"
        />
        <div className="na-gallery-split__img-overlay" />
      </div>

      <div className="na-gallery-split__quote">
        <div className="na-gallery-split__quote-inner">
          <span className="na-gallery-split__quote-mark">"</span>
          <h2 className="na-gallery-split__journey-heading">
            Experience the moments<br />
            that define our<br />
            <em>events.</em>
          </h2>
          <p className="na-gallery-split__quote-text">
            Our journey is just beginning. Soon, this space will showcase
            highlights, experiences, and memorable moments from our global
            conferences.
          </p>
          <div className="na-gallery-split__quote-line" />
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────────── */
export default function NAGallery() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="na-page">
      <NaNavbar />
      <GalleryHero />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <ComingSoonSection />
      <Footer theme="northamerica" />
    </div>
  );
}