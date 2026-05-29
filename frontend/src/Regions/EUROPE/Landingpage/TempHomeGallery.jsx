import React, { useState } from "react";
import "./TempHomeGallery.css";


const PLACEHOLDER_COUNT = 8;

/* ── Mountain/image placeholder icon inside each card ── */
function ImagePlaceholderIcon() {
  return (
    <svg
      className="thg-img-card__icon"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 36l10-14 8 10 6-8 12 12H6z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="16" r="3" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/* ── Large icon shown above the heading ── */
// function GalleryHeroIcon() {
//   return (
//     <div className="thg-hero-icon" aria-hidden="true">
//       <svg className="thg-hero-icon__sparkle thg-hero-icon__sparkle--tr" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M6 1v10M1 6h10" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
//       </svg>
//       <svg className="thg-hero-icon__sparkle thg-hero-icon__sparkle--bl" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M4 1v6M1 4h6" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
//       </svg>
//       <div className="thg-hero-icon__circle">
//         <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <rect x="8" y="12" width="40" height="32" rx="3" stroke="var(--color-accent)" strokeWidth="1.6" />
//           <path
//             d="M12 36l9-12 7 8 5-6 11 10H12z"
//             stroke="var(--color-accent)"
//             strokeWidth="1.4"
//             strokeLinejoin="round"
//           />
//           <circle cx="39" cy="20" r="3.5" stroke="var(--color-accent)" strokeWidth="1.4" />
//         </svg>
//       </div>
//     </div>
//   );
// }

/* ── Bell icon ── */
function BellIcon() {
  return (
    <svg className="thg-notify-bell" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="var(--color-accent)" fillOpacity="0.12" />
      <path
        d="M20 10a7 7 0 0 1 7 7v4l2.5 2.5v1h-19v-1L13 21v-4a7 7 0 0 1 7-7z"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M17.5 24.5a2.5 2.5 0 0 0 5 0" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Mail icon ── */
function MailIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 5l7 5.5L16 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Single image placeholder card ── */
function ImagePlaceholderCard({ index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`thg-img-card${hovered ? " thg-img-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ "--stagger": `${index * 0.06}s` }}
    >
      <div className="thg-img-card__inner">
        <ImagePlaceholderIcon />
      </div>
    </div>
  );
}

/* ─── EXPORTED COMPONENT ──────────────────────────────────────────── */
export function TempHomeGallery() {
  const [notified, setNotified] = useState(false);

  return (
    <section className="thg-root">

      {/* decorative dot grid — left */}
      <div className="thg-dot-grid" aria-hidden="true">
        {Array.from({ length: 25 }, (_, i) => (
          <span key={i} className="thg-dot-grid__dot" />
        ))}
      </div>

      {/* decorative warm blobs */}
      <div className="thg-blob thg-blob--right" aria-hidden="true" />
      <div className="thg-blob thg-blob--bottom" aria-hidden="true" />

      {/* ── Header block ── */}
      <div className="thg-header">
        {/* <GalleryHeroIcon /> */}

        <div className="thg-header__eyebrow-row">
          <span className="thg-header__line" />
          <span className="thg-header__eyebrow">Gallery</span>
          <span className="thg-header__line" />
        </div>

        <h2 className="thg-header__title">
          Memories in the Making.{" "}
          <em className="thg-header__title-em">Stay Tuned!</em>
        </h2>

        <p className="thg-header__subtitle">
          We're just getting started, and incredible moments are
          <br />
          already on the horizon. Our gallery will be here soon.
        </p>
      </div>

      {/* ── Placeholder grid inside rounded container ── */}
      <div className="thg-grid-wrap">
        <div className="thg-grid">
          {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
            <ImagePlaceholderCard key={i} index={i} />
          ))}
        </div>
      </div>

      {/* ── Notify CTA strip ── */}
      <div className="thg-cta">
        <div className="thg-cta__left">
          <BellIcon />
          <div className="thg-cta__text">
            <p className="thg-cta__heading">Be the first to see our moments!</p>
            <p className="thg-cta__sub">Subscribe to get notified when our gallery goes live.</p>
          </div>
        </div>

        <button
          className={`thg-cta__btn${notified ? " thg-cta__btn--done" : ""}`}
          onClick={() => setNotified(true)}
          aria-label="Subscribe to gallery notifications"
        >
          {notified ? (
            <>
              <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9l4.5 4.5 7.5-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Subscribed
            </>
          ) : (
            <>
              <MailIcon />
              Notify Me
            </>
          )}
        </button>
      </div>

    </section>
  );
}