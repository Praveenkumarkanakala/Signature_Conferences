import React, { useState } from "react";
import "./TempGallery.css";
import heroBg from "./temp_hero_bg.png";

/* ─────────────────────────────────────────────────────────────────────
   TEMP GALLERY
   Drop this between <GalleryHero /> and <HeroSection /> inside Gallery()
   Remove once real images are available.

   Usage in gallery.jsx:
   import { TempGallery } from "./TempGallery";

   export default function Gallery() {
     return (
       <div className="europe-page">
         <Navbar />
         <GalleryHero />
         <TempGallery />          ← insert here
         <HeroSection />
         <RegularGallery />
         <VideoSection />
         <GalleryCarousel />
         <Footer theme="europe" />
       </div>
     );
   }
───────────────────────────────────────────────────────────────────── */

const PLACEHOLDER_COUNT = 12;

const CATEGORIES = ["Keynotes", "Workshops", "Networking", "Panels"];

/* SVG placeholder icon — reused for all cards */
function PlaceholderIcon() {
  return (
    <svg
      className="tg-card__icon"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="6" y="10" width="36" height="28" rx="3"
        stroke="currentColor" strokeWidth="1.4"
      />
      <circle cx="18" cy="22" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6 32l10-8 8 6 6-5 12 9"
        stroke="currentColor" strokeWidth="1.4"
        strokeLinejoin="round" strokeLinecap="round"
      />
    </svg>
  );
}

/* Camera badge on each card */
function CameraBadge() {
  return (
    <div className="tg-card__badge" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M6 8h1.5l1-1.5h3L12.5 8H14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
          stroke="currentColor" strokeWidth="1"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* Single placeholder card */
function TempCard({ index }) {
  const [hovered, setHovered] = useState(false);
  const category = CATEGORIES[index % CATEGORIES.length];

  return (
    <div
      className={`tg-card${hovered ? " tg-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner brackets */}
      <span className="tg-card__corner tg-card__corner--tl" />
      <span className="tg-card__corner tg-card__corner--tr" />
      <span className="tg-card__corner tg-card__corner--bl" />
      <span className="tg-card__corner tg-card__corner--br" />

      <div className="tg-card__body">
        <PlaceholderIcon />
        <span className="tg-card__label">{category}</span>
      </div>

      <CameraBadge />
    </div>
  );
}

/* ─── EXPORTED COMPONENT ──────────────────────────────────────────── */
export function TempGallery() {
  return (
    <div className="tg-root">

      {/* ── Hero ── */}
      <section className="tg-hero">
        <div
          className="tg-hero__bg"
          style={{ backgroundImage: `url(${heroBg})` }}
          aria-hidden="true"
        />
        <div className="tg-hero__overlay" aria-hidden="true" />

        <div className="tg-hero__content">
          <p className="tg-hero__eyebrow">Capturing Moments,</p>
          <h1 className="tg-hero__title">Creating Memories</h1>

          <div className="tg-hero__divider" aria-hidden="true">
            <span className="tg-hero__divider-line" />
            <span className="tg-hero__divider-dot" />
            <span className="tg-hero__divider-line" />
          </div>

          <p className="tg-hero__subtitle">
            Every picture tells a powerful story.
            <br />
            Relive the energy, ideas, and connections
            <br />
            from our upcoming conference.
          </p>
        </div>
      </section>

      {/* ── Gallery Body ── */}
      <section className="tg-body">

        {/* Section heading */}
        <div className="tg-body__header">
          <div className="tg-body__title-row">
            <span className="tg-body__title-line" aria-hidden="true" />
            <div className="tg-body__title-block">
              <h2 className="tg-body__title">The Best Moments</h2>
              <p className="tg-body__title-accent">Are Yet to Come</p>
            </div>
            <span className="tg-body__title-line" aria-hidden="true" />
          </div>
          <p className="tg-body__desc">
            Amazing conversations, inspiring speakers, and unforgettable experiences
            <br />
            are waiting to be captured. Stay tuned!
          </p>
        </div>

        {/* Placeholder grid */}
        <div className="tg-grid">
          {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
            <TempCard key={i} index={i} />
          ))}
        </div>

        {/* CTA banner */}
        <div className="tg-cta-banner">
          <div className="tg-cta-banner__pulse" aria-hidden="true" />
          <div className="tg-cta-banner__left">
            <div className="tg-cta-banner__icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M16 10v6l4 2"
                  stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="tg-cta-banner__heading">Be Part of the Story</p>
              <p className="tg-cta-banner__sub">
                Join us live and help create moments worth remembering.
              </p>
            </div>
          </div>
          <a href="#register" className="tg-cta-banner__btn">
            Register Now
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

      </section>
    </div>
  );
}