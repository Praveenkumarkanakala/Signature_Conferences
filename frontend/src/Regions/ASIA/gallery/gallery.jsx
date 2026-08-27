import React, { useEffect, useCallback, useState } from "react";
import { Navbar } from "../Home/asia.jsx";
import Footer from "../../../Components/Footer/footer";
import { arcPhotos } from "./gallerydata.jsx";
import "./gallery.css";
import "../Home/asia.css";

import asiagallery from "../../USA/Images/usagallery.jpeg";
import asiagallery0 from "../../USA/Images/usagallery8.jpeg";
import asiagallery1 from "../../USA/Images/usagallery2.jpeg";
import asiagallery2 from "../../USA/Images/usagallery3.jpeg";
import asiagallery3 from "../../USA/Images/usagallery12.jpeg";
import asiagallery4 from "../../USA/Images/usagallery5.jpeg";
import asiagallery5 from "../../USA/Images/usagallery6.jpeg";
import asiagallery6 from "../../USA/Images/usagallery7.jpeg";
import asiagallery7 from "../../USA/Images/usagallery1.jpeg";
import asiagallery8 from "../../USA/Images/usagallery9.jpeg";
import asiagallery9 from "../../USA/Images/usagallery10.jpeg";


import newimgasia from "../../USA/Images/galleryusa.jpeg";
import newimgasia1 from "../../USA/Images/galleryusa1.jpeg";
import newimgasia2 from "../../USA/Images/galleryusa2.jpeg";
import newimgasia3 from "../../USA/Images/galleryusa3.jpeg";
import newimgasia4 from "../../USA/Images/galleryusa4.jpeg";
import newimgasia5 from "../../USA/Images/galleryusa5.jpeg";



const HERO_STATS = [
  { value: "6", label: "Editions" },
  { value: "40+", label: "Countries" },
  { value: "12k", label: "Delegates" },
];

/* ─── HERO ─────────────────────────────────────────────────────────── */
function GalleryHero() {
  const featured = arcPhotos.slice(0, 3);

  return (
    <section className="as-gl-hero">
      <div className="as-gl-hero__bg-texture" aria-hidden="true" />
      <div className="as-gl-hero__glow" aria-hidden="true" />
      <div className="as-gl-hero__inner">
        <div className="as-gl-hero__content">
          <span className="as-gl-hero__badge">Gallery 2026</span>
          <h1 className="as-gl-hero__title">
            Moments That <br />
            <span className="as-gl-hero__title-em">Move The World</span>
          </h1>
          <p className="as-gl-hero__sub">
            An intimate look at world-class conferences, inspiring panels, and the
            connections that spark lasting change across Asia.
          </p>

          <div className="as-gl-hero__actions">
            <button className="as-gl-hero__cta">
              <span>Explore Gallery</span>
              <svg
                className="as-gl-hero__cta-arrow"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="as-gl-hero__stats">
              {HERO_STATS.map((stat) => (
                <div className="as-gl-hero__stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="as-gl-hero__collage" aria-hidden="true">
          {featured.map((photo, i) => (
            <div className={`as-gl-hero__frame as-gl-hero__frame--${i + 1}`} key={photo.url}>
              <img src={photo.url} alt={photo.alt} loading={i === 0 ? "eager" : "lazy"} />
            </div>
          ))}
          {/* <span className="as-gl-hero__tag">Singapore · 2025</span> */}
        </div>
      </div>
    </section>
  );
}

/*===============================================================================
                                    GALLERY SLIDING CARDS
===================================================================================*/
const slides = [
  {
    id: 1,
    src: newimgasia,
    eyebrow: "Keynote Session",
    heading: ["Voices That Shaped,", "Our Stage"],
    description: "Meet the remarkable leaders, visionaries, and changemakers who have shared their ideas, experiences, and perspectives with our global community.",
    anim: "zoom",
    accent: "#d53e0f",
  },
  {
    id: 2,
    src: newimgasia1,
    eyebrow: "Opening Address",
    heading: ["Where Great Minds ", "Take the Stage"],
    description: "A collection of inspiring voices from diverse industries and backgrounds, bringing fresh perspectives, meaningful conversations, and ideas that create impact.",
    anim: "slide-left",
    accent: "#d4af37",
  },
  {
    id: 3,
    src: newimgasia2,
    eyebrow: "Networking & Dining",
    heading: ["The Faces Behind", "the Inspiration"],
    meta: "Each Evening  ·  Sky Lounge",
    description: "Celebrating the exceptional speakers who have contributed their knowledge, stories, and expertise to our conferences and inspired audiences across borders.",
    anim: "slide-right",
    accent: "#9b0f06",
  },
  {
    id: 4,
    src: newimgasia3,
    eyebrow: "The Venue",
    heading: ["Ideas That Echo", "Beyond the Stage"],
    meta: "Main Convention Hall",
    description: "Explore the voices of leaders, innovators, entrepreneurs, and changemakers who have sparked conversations and encouraged new ways of thinking.",
    anim: "slide-top",
    accent: "#d53e0f",
  },
  {
    id: 5,
    src: newimgasia4,
    eyebrow: "Panel Discussion",
    heading: ["A Legacy of", "Inspiring Voices"],
    meta: "Panel Room B  ·  14:00",
    description: "From visionary leaders to influential changemakers, our past speakers have helped build a community driven by knowledge, connection, empowerment, and meaningful impact.",
    anim: "slide-bottom",
    accent: "#d4af37",
  },
  {
    id: 6,
    src: newimgasia5,
    eyebrow: "Live Audience",
    heading: ["5,000 Minds.", "One Movement."],
    meta: "All Sessions",
    description: "Join a sold-out crowd of executives, founders, and policymakers united by a shared hunger to shape the future of our world.",
    anim: "rotate-fade",
    accent: "#9b0f06",
  },
];

const INTERVAL = 5500;

function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [progress, setProgress] = useState(0);

  const advance = useCallback((index) => {
    setCurrent(index);
    setAnimKey((k) => k + 1);
    setProgress(0);
  }, []);

  /* ── Auto-play ── */
  useEffect(() => {
    const start = Date.now();
    let raf;

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (elapsed >= INTERVAL) {
        advance((current + 1) % slides.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current, advance]);

  const goTo = (i) => {
    if (i === current) return;
    advance(i);
  };

  const slide = slides[current];

  return (
    <section className="as-hs">
      <div className="as-hs__grain" aria-hidden="true" />
      <div className="as-hs__inner">
        <div className="as-hs__text" key={`text-${animKey}`}>
          <span className="as-hs__eyebrow">{slide.eyebrow}</span>

          <h1 className="as-hs__heading" aria-label={slide.heading.join(" ")}>
            {slide.heading.map((line, i) => (
              <span
                key={i}
                className="as-hs__heading-line"
                style={{ "--line-delay": `${i * 80}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="as-hs__meta">{slide.meta}</p>
          <p className="as-hs__desc">{slide.description}</p>

          <div className="as-hs__nav">
            <div className="as-hs__dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`as-hs__dot ${i === current ? "as-hs__dot--active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                >
                  {i === current && (
                    <span
                      className="as-hs__dot-fill"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>

            <span className="as-hs__slide-num">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="as-hs__card-area">
          <div className="as-hs__glow" aria-hidden="true" />

          <div
            className={`as-hs__entrance as-hs__entrance--${slide.anim}`}
            key={`entrance-${animKey}`}
          >
            <div className="as-hs__float">
              <div className="as-hs__card">
                <div className="as-hs__card-img">
                  <img src={slide.src} alt={slide.eyebrow}  loading="eager" draggable="false"  />
                </div>

                <div className="as-hs__sheen" aria-hidden="true" />

                <div className="as-hs__badge">
                  <span>{slide.eyebrow}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================= REGULAR GALLERY ========================================== */

const IMAGES = [
  { id: 1, src: asiagallery, alt: "Conference main stage with large audience", span: "wide", },
  { id: 2,  src: asiagallery0,  alt: "Speaker presenting on stage", span: "tall",},
  { id: 3, src: asiagallery1, alt: "Panel discussion on stage", span: "normal",},
  { id: 4, src: asiagallery2, alt: "Networking event crowd", span: "normal", },
  { id: 5, src: asiagallery3, alt: "Round table business meeting", span: "wide", },
  { id: 6, src: asiagallery4, alt: "Speaker addressing packed hall", span: "normal", },
  { id: 7, src: asiagallery5, alt: "Award ceremony on stage", span: "tall", },
  { id: 8, src: asiagallery6, alt: "Conference registration and entry", span: "normal", },
  { id: 9, src: asiagallery7, alt: "Keynote speaker full hall", span: "wide", },
  { id: 10, src: asiagallery8, alt: "Workshop session delegates", span: "normal", },
  { id: 11, src: asiagallery9, alt: "Panel discussion with audience", span: "normal", },
  // { id: 12, src: asiagallery10, alt: "Networking event with drinks", span: "tall", },
];

function RegularGallery() {
  return (
    <section className="as-rg-section">
      <div className="as-rg-header">
        <div className="as-rg-header__left">
          <span className="as-rg-eyebrow">Visual Stories</span>
          <h2 className="as-rg-title">  Moments That <br />  <em>Move the World</em> </h2>
        </div>
        <div className="as-rg-header__right">
          <p className="as-rg-desc">
            Every frame captures a conversation that shaped an industry, a
            handshake that built a partnership, and a stage where the future was
            written.
          </p>
        </div>
      </div>

      <div className="as-rg-grid">
        {IMAGES.map((img) => (
          <div key={img.id} className={`as-rg-item as-rg-item--${img.span}`}>
            <div className="as-rg-item__inner">
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="as-rg-item__overlay" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── ROOT ──────────────────────────────────────────────────────────── */
export default function Gallery() {

  return (
    <>
      <div className="as-page">
        <Navbar />
        <GalleryHero />
        <HeroSection />
        <RegularGallery />
        <Footer theme="asia"/>
      </div>
    </>
  );
}