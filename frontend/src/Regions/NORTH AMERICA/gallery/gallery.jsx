import React, { useEffect, useCallback, useState } from "react";
import { NaNavbar } from "../NAHome/Nahome";
import Footer from "../../../Components/Footer/footer";
import { arcPhotos } from "./gallerydata.jsx";
import "./gallery.css";

// Replace these with your North America gallery images
import nagallery from "../Images/usagallery.jpeg";
import nagallery0 from "../Images/usagallery8.jpeg";
import nagallery1 from "../Images/usagallery2.jpeg";
import nagallery2 from "../Images/usagallery3.jpeg";
import nagallery3 from "../Images/usagallery12.jpeg";
import nagallery4 from "../Images/usagallery5.jpeg";
import nagallery5 from "../Images/usagallery6.jpeg";
import nagallery6 from "../Images/usagallery7.jpeg";
import nagallery7 from "../Images/usagallery1.jpeg";
import nagallery8 from "../Images/usagallery9.jpeg";
import nagallery9 from "../Images/usagallery10.jpeg";

import newimgna from "../Images/galleryusa.jpeg";
import newimgna1 from "../Images/galleryusa1.jpeg";
import newimgna2 from "../Images/galleryusa2.jpeg";
import newimgna3 from "../Images/galleryusa3.jpeg";
import newimgna4 from "../Images/galleryusa4.jpeg";
import newimgna5 from "../Images/galleryusa5.jpeg";

const HERO_STATS = [
  { value: "6", label: "Editions" },
  { value: "40+", label: "Countries" },
  { value: "12k", label: "Delegates" },
];

/* ─── HERO ─────────────────────────────────────────────────────────── */
function GalleryHero() {
  const featured = arcPhotos.slice(0, 3);

  return (
    <section className="na-gl-hero">
      <div className="na-gl-hero__inner">
        <div className="na-gl-hero__content">
          <span className="na-gl-hero__badge">Gallery 2026</span>
          <h1 className="na-gl-hero__title">
            Moments That <br />
            <span className="na-gl-hero__title-em">Move The World</span>
          </h1>
          <p className="na-gl-hero__sub">
            An intimate look at world-class conferences, inspiring panels, and the
            connections that spark lasting change.
          </p>

          <div className="na-gl-hero__actions">
            <button className="na-gl-hero__cta">
              <span>Explore Gallery</span>
              <svg
                className="na-gl-hero__cta-arrow"
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

            <div className="na-gl-hero__stats">
              {HERO_STATS.map((stat) => (
                <div className="na-gl-hero__stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="na-gl-hero__collage" aria-hidden="true">
          {featured.map((photo, i) => (
            <div className={`na-gl-hero__frame na-gl-hero__frame--${i + 1}`} key={photo.url}>
              <img src={photo.url} alt={photo.alt} loading={i === 0 ? "eager" : "lazy"} />
            </div>
          ))}
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
    src: newimgna,
    eyebrow: "Keynote Session",
    heading: ["Voices That Shaped,", "Our Stage"],
    description: "Meet the remarkable leaders, visionaries, and changemakers who have shared their ideas, experiences, and perspectives with our global community.",
    anim: "zoom",
    accent: "#b8952a",
  },
  {
    id: 2,
    src: newimgna1,
    eyebrow: "Opening Address",
    heading: ["Where Great Minds ", "Take the Stage"],
    description: "A collection of inspiring voices from diverse industries and backgrounds, bringing fresh perspectives, meaningful conversations, and ideas that create impact.",
    anim: "slide-left",
    accent: "#34d399",
  },
  {
    id: 3,
    src: newimgna2,
    eyebrow: "Networking & Dining",
    heading: ["The Faces Behind", "the Inspiration"],
    meta: "Each Evening  ·  Sky Lounge, Level 12",
    description: "Celebrating the exceptional speakers who have contributed their knowledge, stories, and expertise to our conferences and inspired audiences across borders.",
    anim: "slide-right",
    accent: "#10b981",
  },
  {
    id: 4,
    src: newimgna3,
    eyebrow: "The Venue",
    heading: ["Ideas That Echo", "Beyond the Stage"],
    meta: "Toronto Convention Centre  ·  Hall 7",
    description: "Explore the voices of leaders, innovators, entrepreneurs, and changemakers who have sparked conversations and encouraged new ways of thinking.",
    anim: "slide-top",
    accent: "#b8952a",
  },
  {
    id: 5,
    src: newimgna4,
    eyebrow: "Panel Discussion",
    heading: ["A Legacy of", "Inspiring Voices"],
    meta: "March 15, 2025  ·  Panel Room B  ·  14:00 PM",
    description: "From visionary leaders to influential changemakers, our past speakers have helped build a community driven by knowledge, connection, empowerment, and meaningful impact.",
    anim: "slide-bottom",
    accent: "#34d399",
  },
  {
    id: 6,
    src: newimgna5,
    eyebrow: "Live Audience",
    heading: ["5,000 Minds.", "One Movement."],
    meta: "March 14–16, 2025  ·  All Sessions",
    description: "Join a sold-out crowd of executives, founders, and policymakers united by a shared hunger to shape the future of our world.",
    anim: "rotate-fade",
    accent: "#10b981",
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
    <section className="na-hs">
      <div className="na-hs__grain" aria-hidden="true" />
      <div className="na-hs__inner">
        <div className="na-hs__text" key={`text-${animKey}`}>
          <span className="na-hs__eyebrow">{slide.eyebrow}</span>

          <h1 className="na-hs__heading" aria-label={slide.heading.join(" ")}>
            {slide.heading.map((line, i) => (
              <span
                key={i}
                className="na-hs__heading-line"
                style={{ "--line-delay": `${i * 80}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="na-hs__meta">{slide.meta}</p>
          <p className="na-hs__desc">{slide.description}</p>

          <div className="na-hs__nav">
            <div className="na-hs__dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`na-hs__dot ${i === current ? "na-hs__dot--active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                >
                  {i === current && (
                    <span
                      className="na-hs__dot-fill"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>

            <span className="na-hs__slide-num">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="na-hs__card-area">
          <div className="na-hs__glow" aria-hidden="true" />

          <div
            className={`na-hs__entrance na-hs__entrance--${slide.anim}`}
            key={`entrance-${animKey}`}
          >
            <div className="na-hs__float">
              <div className="na-hs__card">
                <div className="na-hs__card-img">
                  <img src={slide.src} alt={slide.eyebrow} loading="eager" draggable="false" />
                </div>

                <div className="na-hs__sheen" aria-hidden="true" />

                <div className="na-hs__badge">
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
  { id: 1, src: nagallery, alt: "Conference main stage with large audience", span: "wide" },
  { id: 2, src: nagallery0, alt: "Speaker presenting on stage", span: "tall" },
  { id: 3, src: nagallery1, alt: "Panel discussion on stage", span: "normal" },
  { id: 4, src: nagallery2, alt: "Networking event crowd", span: "normal" },
  { id: 5, src: nagallery3, alt: "Round table business meeting", span: "wide" },
  { id: 6, src: nagallery4, alt: "Speaker addressing packed hall", span: "normal" },
  { id: 7, src: nagallery5, alt: "Award ceremony on stage", span: "tall" },
  { id: 8, src: nagallery6, alt: "Conference registration and entry", span: "normal" },
  { id: 9, src: nagallery7, alt: "Keynote speaker full hall", span: "wide" },
  { id: 10, src: nagallery8, alt: "Workshop session delegates", span: "normal" },
  { id: 11, src: nagallery9, alt: "Panel discussion with audience", span: "normal" },
];

function RegularGallery() {
  return (
    <section className="na-rg-section">
      <div className="na-rg-header">
        <div className="na-rg-header__left">
          <span className="na-rg-eyebrow">Visual Stories</span>
          <h2 className="na-rg-title">
            Moments That <br /> <em>Move the World</em>
          </h2>
        </div>
        <div className="na-rg-header__right">
          <p className="na-rg-desc">
            Every frame captures a conversation that shaped an industry, a
            handshake that built a partnership, and a stage where the future was
            written.
          </p>
        </div>
      </div>

      <div className="na-rg-grid">
        {IMAGES.map((img) => (
          <div key={img.id} className={`na-rg-item na-rg-item--${img.span}`}>
            <div className="na-rg-item__inner">
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="na-rg-item__overlay" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── ROOT ──────────────────────────────────────────────────────────── */
export default function NAGallery() {
  return (
    <div className="na-page">
      <NaNavbar />
      <GalleryHero />
      <HeroSection />
      <RegularGallery />
      <Footer theme="northamerica" />
    </div>
  );
}