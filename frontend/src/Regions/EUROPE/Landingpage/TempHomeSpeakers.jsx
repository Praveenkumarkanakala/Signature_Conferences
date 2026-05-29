import React, { useState } from "react";
import "./TempHomeSpeakers.css";



const PLACEHOLDER_CARDS = Array.from({ length: 4 }, (_, i) => ({ id: i + 1 }));

/* ── Placeholder person icon ── */
function PersonIcon() {
  return (
    <svg
      className="thg-speaker-card__icon"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* dashed circle border */}
      <circle
        cx="32" cy="32" r="28"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      {/* head */}
      <circle cx="32" cy="24" r="9" stroke="currentColor" strokeWidth="1.4" />
      {/* shoulders */}
      <path
        d="M12 54c0-10 9-18 20-18s20 8 20 18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Star icon ── */
function StarIcon() {
  return (
    <svg
      className="thg-speaker-card__star"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 1.5l2.06 4.18 4.61.67-3.34 3.25.79 4.6L9 11.77l-4.12 2.23.79-4.6L2.33 6.35l4.61-.67L9 1.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Single speaker placeholder card ── */
function SpeakerPlaceholderCard({ index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`thg-speaker-card${hovered ? " thg-speaker-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ "--stagger": `${index * 0.06}s` }}
    >
      <div className="thg-speaker-card__avatar">
        <PersonIcon />
      </div>
      <StarIcon />
      {/* shimmer lines for name / role */}
      <div className="thg-speaker-card__lines">
        <span className="thg-speaker-card__line thg-speaker-card__line--name" />
        <span className="thg-speaker-card__line thg-speaker-card__line--role" />
      </div>
    </div>
  );
}

/* ── Megaphone SVG for the announcement card ── */
function MegaphoneIcon() {
  return (
    <svg
      className="thg-announce__megaphone"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="36" fill="var(--color-accent)" fillOpacity="0.1" />
      {/* megaphone body */}
      <path
        d="M22 34h8l18-10v32L30 46H22a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4z"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* sound waves */}
      <path d="M52 30c3 2.5 5 6 5 10s-2 7.5-5 10" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M56 26c5 4 8 9.5 8 14s-3 10-8 14" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5" />
      {/* handle */}
      <path d="M30 46l3 10" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Paper-plane + scatter decoration for the bottom CTA ── */
function PaperPlaneIcon() {
  return (
    <svg
      className="thg-cta__plane"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 28L50 8 36 50 26 32 6 28z"
        stroke="var(--color-accent)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M26 32l10-24" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" />
      {/* scatter dots */}
      <circle cx="14" cy="44" r="2" fill="var(--color-accent)" fillOpacity="0.4" />
      <circle cx="44" cy="46" r="1.5" fill="var(--color-accent)" fillOpacity="0.3" />
      <circle cx="8"  cy="18" r="1.5" fill="var(--color-accent)" fillOpacity="0.3" />
    </svg>
  );
}

/* ── Bell icon for notify badge ── */
function BellIcon() {
  return (
    <svg
      className="thg-notify__bell"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="14" fill="var(--color-accent)" fillOpacity="0.15" />
      <path
        d="M16 8a6 6 0 0 1 6 6v3l2 2v1H8v-1l2-2v-3a6 6 0 0 1 6-6z"
        stroke="var(--color-accent)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M14 20a2 2 0 0 0 4 0" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ─── EXPORTED COMPONENT ──────────────────────────────────────────── */
export function TempHomeSpeakers() {
  const [notified, setNotified] = useState(false);

  return (
    <section className="thg-root">

      {/* ── Section header ── */}
      <div className="thg-header">
        <div className="thg-header__eyebrow-row">
          <span className="thg-header__line" aria-hidden="true" />
          <span className="thg-header__eyebrow">Speakers</span>
          <span className="thg-header__line" aria-hidden="true" />
        </div>
        <h2 className="thg-header__title">
          Great Ideas.{" "}
          <em className="thg-header__title-em">Real People.</em>{" "}
          Big Impact.
        </h2>
        <p className="thg-header__subtitle">
          Every extraordinary event starts with a vision and the right voices.
          <br />
          We're curating an exceptional lineup of speakers for you.
        </p>
      </div>

      {/* ── Announcement card ── */}
      <div className="thg-announce">
        <div className="thg-announce__icon-wrap">
          <MegaphoneIcon />
        </div>
        <div className="thg-announce__body">
          <h3 className="thg-announce__heading">We're Just Getting Started!</h3>
          <p className="thg-announce__text">
            Our speaker lineup is currently in the works, and we can't wait to
            share it with you. Expect visionaries, innovators, and changemakers
            who will inspire, challenge, and empower.
          </p>
          <span className="thg-announce__coming">
            Big announcements coming soon!
          </span>
        </div>
      </div>

      {/* ── Sneak peek label ── */}
      {/* <div className="thg-peek-label" aria-hidden="true">
        <span className="thg-peek-label__line" />
        <span className="thg-peek-label__text">A Sneak Peek of What's Coming</span>
        <span className="thg-peek-label__line" />
      </div> */}

      {/* ── Placeholder speaker cards ── */}
      <div className="thg-grid">
        {PLACEHOLDER_CARDS.map((card, i) => (
          <SpeakerPlaceholderCard key={card.id} index={i} />
        ))}
      </div>

      {/* ── Bottom CTA banner ── */}

    </section>
  );
}