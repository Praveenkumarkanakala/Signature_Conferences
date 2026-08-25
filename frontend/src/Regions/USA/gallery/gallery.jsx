import React, { useEffect, useCallback, useState } from "react";
import { Navbar} from "../Landingpage/homepage.jsx";
import Footer from "../../../Components/Footer/footer";
import { arcPhotos } from "./gallerydata.jsx";
import "./gallery.css";
import "../Landingpage/homepage.css";


import usagallery from "../Images/usagallery.jpeg";
import usagallery0 from "../Images/usagallery8.jpeg";
import usagallery1 from "../Images/usagallery2.jpeg";
import usagallery2 from "../Images/usagallery3.jpeg";
import usagallery3 from "../Images/usagallery12.jpeg";
import usagallery4 from "../Images/usagallery5.jpeg";
import usagallery5 from "../Images/usagallery6.jpeg";
import usagallery6 from "../Images/usagallery7.jpeg";
import usagallery7 from "../Images/usagallery1.jpeg";
import usagallery8 from "../Images/usagallery9.jpeg";
import usagallery9 from "../Images/usagallery10.jpeg";
// import usagallery10 from "../Images/usagallery11.jpeg";

import newimgusa from "../Images/galleryusa.jpeg";
import newimgusa1 from "../Images/galleryusa1.jpeg";
import newimgusa2 from "../Images/galleryusa2.jpeg";
import newimgusa3 from "../Images/galleryusa3.jpeg";
import newimgusa4 from "../Images/galleryusa4.jpeg";
import newimgusa5 from "../Images/galleryusa5.jpeg";



const HERO_STATS = [
  { value: "6", label: "Editions" },
  { value: "40+", label: "Countries" },
  { value: "12k", label: "Delegates" },
];

/* ─── HERO ─────────────────────────────────────────────────────────── */
function GalleryHero() {
  const featured = arcPhotos.slice(0, 3);

  return (
    <section className="usa-gl-hero">
      <div className="usa-gl-hero__inner">
        <div className="usa-gl-hero__content">
          <span className="usa-gl-hero__badge">Gallery 2026</span>
          <h1 className="usa-gl-hero__title">
            Moments That <br />
            <span className="usa-gl-hero__title-em">Move The World</span>
          </h1>
          <p className="usa-gl-hero__sub">
            An intimate look at world-class conferences, inspiring panels, and the
            connections that spark lasting change.
          </p>

          <div className="usa-gl-hero__actions">
            <button className="usa-gl-hero__cta">
              <span>Explore Gallery</span>
              <svg
                className="usa-gl-hero__cta-arrow"
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

            <div className="usa-gl-hero__stats">
              {HERO_STATS.map((stat) => (
                <div className="usa-gl-hero__stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="usa-gl-hero__collage" aria-hidden="true">
          {featured.map((photo, i) => (
            <div className={`usa-gl-hero__frame usa-gl-hero__frame--${i + 1}`} key={photo.url}>
              <img src={photo.url} alt={photo.alt} loading={i === 0 ? "eager" : "lazy"} />
            </div>
          ))}
          {/* <span className="usa-gl-hero__tag">Dubai · 2025</span> */}
        </div>
      </div>
    </section>
  );
}

/*===============================================================================
                                    GALLERY SLIDING CARXS
===================================================================================*/
const slides = [
  {
    id: 1,
    src: newimgusa,
    eyebrow: "Keynote Session",
    heading: ["Voices That Shaped,", "Our Stage"],
    // meta: "March 14–16, 2025  ·  Dubai World Trade Centre",
    description: "Meet the remarkable leaders, visionaries, and changemakers who have shared their ideas, experiences, and perspectives with our global community.",
    anim: "zoom",
    accent: "#d4a55a",
  },
  {
    id: 2,
    src: newimgusa1,
    eyebrow: "Opening Address",
    heading: ["Where Great Minds ", "Take the Stage"],
    description: "A collection of inspiring voices from diverse industries and backgrounds, bringing fresh perspectives, meaningful conversations, and ideas that create impact.",
    anim: "slide-left",
    accent: "#b8845a",
  },
  {
    id: 3,
    src: newimgusa2,
    eyebrow: "Networking & Dining",
    heading: ["The Faces Behind", "the Inspiration"],
    meta: "Each Evening  ·  Sky Lounge, Level 12",
    description: "Celebrating the exceptional speakers who have contributed their knowledge, stories, and expertise to our conferences and inspired audiences across borders.",
    anim: "slide-right",
    accent: "#c0724a",
  },
  {
    id: 4,
    src: newimgusa3,
    eyebrow: "The Venue",
    heading: ["Ideas That Echo", "Beyond the Stage"],
    meta: "Dubai World Trade Centre  ·  Hall 7",
    description: "Explore the voices of leaders, innovators, entrepreneurs, and changemakers who have sparked conversations and encouraged new ways of thinking.",
    anim: "slide-top",
    accent: "#d4a55a",
  },
  {
    id: 5,
    src: newimgusa4,
    eyebrow: "Panel Discussion",
    heading: ["A Legacy of", "Inspiring Voices"],
    meta: "March 15, 2025  ·  Panel Room B  ·  14:00 PM",
    description: "From visionary leaders to influential changemakers, our past speakers have helped build a community driven by knowledge, connection, empowerment, and meaningful impact.",
    anim: "slide-bottom",
    accent: "#b8845a",
  },
  {
    id: 6,
    src: newimgusa5,
    eyebrow: "Live Audience",
    heading: ["5,000 Minds.", "One Movement."],
    meta: "March 14–16, 2025  ·  All Sessions",
    description: "Join a sold-out crowd of executives, founders, and policymakers united by a shared hunger to shape the future of our world.",
    anim: "rotate-fade",
    accent: "#c0724a",
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
    <section className="usa-hs">
      <div className="usa-hs__grain" aria-hidden="true" />
      <div className="usa-hs__inner">
        <div className="usa-hs__text" key={`text-${animKey}`}>
          <span className="usa-hs__eyebrow">{slide.eyebrow}</span>

          <h1 className="usa-hs__heading" aria-label={slide.heading.join(" ")}>
            {slide.heading.map((line, i) => (
              <span
                key={i}
                className="usa-hs__heading-line"
                style={{ "--line-delay": `${i * 80}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="usa-hs__meta">{slide.meta}</p>
          <p className="usa-hs__desc">{slide.description}</p>

          <div className="usa-hs__nav">
            <div className="usa-hs__dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`usa-hs__dot ${i === current ? "usa-hs__dot--active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                >
                  {i === current && (
                    <span
                      className="usa-hs__dot-fill"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>

            <span className="usa-hs__slide-num">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="usa-hs__card-area">
          <div className="usa-hs__glow" aria-hidden="true" />

          <div
            className={`usa-hs__entrance usa-hs__entrance--${slide.anim}`}
            key={`entrance-${animKey}`}
          >
            <div className="usa-hs__float">
              <div className="usa-hs__card">
                <div className="usa-hs__card-img">
                  <img src={slide.src} alt={slide.eyebrow}  loading="eager" draggable="false"  />
                </div>

                <div className="usa-hs__sheen" aria-hidden="true" />

                <div className="usa-hs__badge">
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
  { id: 1, src: usagallery, alt: "Conference main stage with large audience", span: "wide", },
  { id: 2,  src: usagallery0,  alt: "Speaker presenting on stage", span: "tall",},
  { id: 3, src: usagallery1, alt: "Panel discussion on stage", span: "normal",},
  { id: 4, src: usagallery2, alt: "Networking event crowd", span: "normal", },
  { id: 5, src: usagallery3, alt: "Round table business meeting", span: "wide", },
  { id: 6, src: usagallery4, alt: "Speaker addressing packed hall", span: "normal", },
  { id: 7, src: usagallery5, alt: "Award ceremony on stage", span: "tall", },
  { id: 8, src: usagallery6, alt: "Conference registration and entry", span: "normal", },
  { id: 9, src: usagallery7, alt: "Keynote speaker full hall", span: "wide", },
  { id: 10, src: usagallery8, alt: "Workshop session delegates", span: "normal", },
  { id: 11, src: usagallery9, alt: "Panel discussion with audience", span: "normal", },
  // { id: 12, src: usagallery10, alt: "Networking event with drinks", span: "tall", },
];

function RegularGallery() {
  return (
    <section className="usa-rg-section">
      <div className="usa-rg-header">
        <div className="usa-rg-header__left">
          <span className="usa-rg-eyebrow">Visual Stories</span>
          <h2 className="usa-rg-title">  Moments That <br />  <em>Move the World</em> </h2>
        </div>
        <div className="usa-rg-header__right">
          <p className="usa-rg-desc">
            Every frame captures a conversation that shaped an industry, a
            handshake that built a partnership, and a stage where the future was
            written.
          </p>
        </div>
      </div>

      <div className="usa-rg-grid">
        {IMAGES.map((img) => (
          <div key={img.id} className={`usa-rg-item usa-rg-item--${img.span}`}>
            <div className="usa-rg-item__inner">
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="usa-rg-item__overlay" />
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
      <div className="usa-page">
        <Navbar />
        <GalleryHero />
        <HeroSection />
        <RegularGallery />
        <Footer theme="usa"/>
      </div>
    </>
  );
}