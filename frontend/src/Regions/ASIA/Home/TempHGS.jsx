import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TempHGS.css";

/* ================================================================
   SHARED ICONS
   ================================================================ */

/* ================================================================
   GALLERY SECTION — redesigned to match reference image
   Drop-in replacement for TempHomeGallery.jsx
   ================================================================ */


/* ── SVG Icons ─────────────────────────────────────────────────── */
function GalleryBadgeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );
}

function ImagePlaceholderIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="4" y="8" width="40" height="32" rx="3"/>
      <circle cx="16" cy="20" r="3.5"/>
      <path d="M4 34l10-10 8 8 6-6 12 8"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

/* ── Dot grid decoration ── */
function DotGrid({ rows = 4, cols = 5, className = "" }) {
  return (
    <div className={`as-thg2-dots ${className}`} aria-hidden="true"
      style={{ "--cols": cols }}>
      {Array.from({ length: rows * cols }, (_, i) => (
        <span key={i} className="as-thg2-dots__dot" />
      ))}
    </div>
  );
}

/* ── Individual placeholder card ── */
function GalleryCard({ variant = "light", size = "md", index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const iconSize = size === "lg" ? 52 : size === "sm" ? 34 : 44;

  return (
    <div
      className={`as-thg2-card as-thg2-card--${variant} as-thg2-card--${size}${hovered ? " as-thg2-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ "--stagger": `${index * 0.07}s` }}
    >
      {/* Decorative corner elements per variant */}
      {variant === "light" && size === "lg" && (
        <DotGrid rows={3} cols={5} className="as-thg2-card__dots as-thg2-card__dots--tr" />
      )}
      {variant === "dark" && (
        <DotGrid rows={3} cols={4} className="as-thg2-card__dots as-thg2-card__dots--bl" />
      )}
      {variant === "sage" && (
        <>
          <DotGrid rows={3} cols={4} className="as-thg2-card__dots as-thg2-card__dots--tl" />
          <div className="as-thg2-card__arc" aria-hidden="true" />
        </>
      )}
      {variant === "light" && size === "sm" && (
        <div className="as-thg2-card__waves" aria-hidden="true" />
      )}

      <div className="as-thg2-card__inner">
        {variant === "dark" && (
          <div className="as-thg2-card__circle" aria-hidden="true" />
        )}
        <div className="as-thg2-card__icon-wrap">
          <ImagePlaceholderIcon size={iconSize} />
        </div>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export function TempHomeGallery() {
   const navigate = useNavigate();
  return (
    <section className="as-thg2-root">
      <div className="as-thg2-split">

        {/* LEFT — text panel */}
        <div className="as-thg2-left">

          {/* Badge */}
          <div className="as-thg2-badge">
            <span className="as-thg2-badge__icon"><GalleryBadgeIcon /></span>
            <span className="as-thg2-badge__label">Gallery</span>
          </div>

          {/* Headline */}
          <h2 className="as-thg2-headline">
            <span className="as-thg2-headline__line as-thg2-headline__line--dark">Moments That</span>
            <span className="as-thg2-headline__line as-thg2-headline__line--dark">Inspire.</span>
            <span className="as-thg2-headline__line as-thg2-headline__line--gold">Impact That</span>
            <span className="as-thg2-headline__line as-thg2-headline__line--gold">Lasts.</span>
          </h2>

          {/* Divider */}
          <div className="as-thg2-divider">
            <span className="as-thg2-divider__line" />
            <span className="as-thg2-divider__diamond" aria-hidden="true">◆</span>
            <span className="as-thg2-divider__line" />
          </div>

          {/* Body */}
          <p className="as-thg2-body">
            From powerful conversations to meaningful connections, explore
            highlights from our past events and experiences.
          </p>

          {/* CTA button */}
          <button className="as-thg2-cta" type="button" onClick={() => navigate("/asiagallery")}>
            <span>More Moments Coming Soon</span>
            <ArrowRightIcon />
          </button>

          {/* Bottom dot grid decoration */}
          <DotGrid rows={3} cols={4} className="as-thg2-left__dots-bottom" />
        </div>

        {/* RIGHT — asymmetric card grid */}
        <div className="as-thg2-right">

          {/* Row 1: single wide card */}
          <div className="as-thg2-row as-thg2-row--1">
            <GalleryCard variant="light" size="lg" index={0} />
          </div>

          {/* Row 2: dark featured card + small light card */}
          <div className="as-thg2-row as-thg2-row--2">
            <GalleryCard variant="dark" size="md" index={1} />
            <GalleryCard variant="light" size="sm" index={2} />
          </div>

          {/* Row 3: single wide sage card */}
          <div className="as-thg2-row as-thg2-row--3">
            <GalleryCard variant="sage" size="lg" index={3} />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SPEAKERS SECTION  — redesigned to match reference image
   Drop-in replacement for TempHomeSpeakers.jsx
   ================================================================ */


/* ── Inline SVG icons ─────────────────────────────────────────── */
function IconSpeakers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function IconSeedling() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/>
      <path d="M5 12C5 8.13 8.13 5 12 5s7 3.13 7 7"/>
      <path d="M12 12C12 8.13 8.87 5 5 5S-2 8.13-2 12"/>
      <path d="M5 3C5 3 6 7 9 9"/>
    </svg>
  );
}

function IconGroup() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function IconMic() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3"/>
      <path d="M5 10a7 7 0 0 0 14 0"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
      <line x1="9" y1="21" x2="15" y2="21"/>
    </svg>
  );
}

/* ── Feature pill ─────────────────────────────────────────────── */
function FeaturePill({ icon, title, desc, delay }) {
  return (
    <div className="as-ths-pill" style={{ animationDelay: delay }}>
      <div className="as-ths-pill__icon">{icon}</div>
      <div className="as-ths-pill__body">
        <strong className="as-ths-pill__title">{title}</strong>
        <p className="as-ths-pill__desc">{desc}</p>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export function TempHomeSpeakers() {
  return (
    <section className="as-ths-root">
      <div className="as-ths-split">

        {/* LEFT — cream panel */}
        <div className="as-ths-left">

          {/* Eyebrow badge */}
          <div className="as-ths-left__badge">
            <span className="as-ths-left__badge-icon"><IconSpeakers /></span>
            <span className="as-ths-left__badge-label">Speakers</span>
          </div>

          {/* Hero headline */}
          <h2 className="as-ths-left__headline">
            <span className="as-ths-left__line as-ths-left__line--dark">A New Chapter.</span>
            <span className="as-ths-left__line as-ths-left__line--gold">New Voices.</span>
            <span className="as-ths-left__line as-ths-left__line--dark">New Impact.</span>
          </h2>

          {/* Divider */}
          <div className="as-ths-left__divider">
            <span className="as-ths-left__divider-line" />
            <span className="as-ths-left__divider-diamond" aria-hidden="true">◆</span>
          </div>

          {/* Body copy */}
          <p className="as-ths-left__body">
            We're starting fresh to bring you a more meaningful and diverse
            lineup of speakers who will inspire, educate, and drive change.
          </p>

          {/* Feature pills */}
          <div className="as-ths-left__features">
            <FeaturePill
              icon={<IconSeedling />}
              title="Fresh Start"
              desc="Building a better experience from the ground up."
              delay="0.05s"
            />
            <div className="as-ths-left__feat-sep" aria-hidden="true" />
            <FeaturePill
              icon={<IconGroup />}
              title="Diverse Voices"
              desc="Curating a lineup that reflects different ideas and perspectives."
              delay="0.12s"
            />
            <div className="as-ths-left__feat-sep" aria-hidden="true" />
            <FeaturePill
              icon={<IconStar />}
              title="Greater Impact"
              desc="Uniting voices that inspire action and create real change."
              delay="0.19s"
            />
          </div>
        </div>

        {/* RIGHT — deep green card */}
        <div className="as-ths-right">
          {/* Topographic texture overlay */}
          <div className="as-ths-right__topo" aria-hidden="true" />

          <div className="as-ths-right__inner">
            {/* Top diamond */}
            <span className="as-ths-right__diamond" aria-hidden="true">◆</span>

            {/* Heading */}
            <h3 className="as-ths-right__heading">
              A Brand New Lineup.<br />
              <span className="as-ths-right__heading-gold">Curated for Impact.</span>
            </h3>

            {/* Mic circle */}
            <div className="as-ths-right__mic-wrap">
              <div className="as-ths-right__mic-ring" />
              <div className="as-ths-right__mic-icon"><IconMic /></div>
              {/* Burst lines */}
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="as-ths-right__burst"
                  style={{ "--i": i }}
                  aria-hidden="true"
                />
              ))}
            </div>

            {/* Something coming */}
            <div className="as-ths-right__coming-wrap">
              <p className="as-ths-right__coming-label">Something Incredible</p>
              <p className="as-ths-right__coming-script">is coming.</p>
              <span className="as-ths-right__coming-underline" />
            </div>

            {/* Body */}
            <p className="as-ths-right__body">
              We're carefully curating a lineup of thought leaders, innovators,
              and changemakers who will spark ideas and create lasting impact.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}