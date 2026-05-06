import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./homepage.css";
import Footer from "../../../Components/Footer/footer";
import statue from "./statue.png";
import whyJoinUs from "./whyjoinus4.png";
import sgcLogo from "../../globaldata/sgc_logo.jpeg";
import Futureevent from "../../globaldata/images/usaevents1.jpeg";
import Futureevent1 from "../../globaldata/images/usaevents4.jpeg";
import Futureevent2 from "../../globaldata/images/usaevents3.jpeg";
import Futureevent3 from "../../globaldata/images/usaevents.jpeg";
import { TempHomeGallery, TempHomeSpeakers } from "./TempHGS";



import Speakerimg from "./images/galleryimg.jpeg";
import Speakerimg1 from "./images/galleryimg1.jpeg";
import Speakerimg2 from "./images/galleryimg2.jpeg";
import Speakerimg3 from "./images/galleryimg3.jpeg";
import Speakerimg4 from "./images/galleryimg4.jpeg";
import Speakerimg5 from "./images/galleryimg5.jpeg";


const NAV_LINKS = [
  { label: "Home", to: "/usa" },
  { label: "About", to: "/usa-about" },
  { label: "Events", to: "/usa-events" },
  { label: "Speakers", to: "/usa-speakers" },
  { label: "Gallery", to: "/usa-gallery" },
  { label: "Contact", to: "/usa-contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // ✅ ONLY lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [menuOpen]);

  return (
    <>
      {menuOpen && <div className="usa-navbar__overlay" onClick={closeMenu} />}
      <nav className="usa-navbar">
        <Link to="/" className="usa-navbar__logo" onClick={closeMenu}>
          <img src={sgcLogo} alt="SGC Logo" className="usa-navbar__logo-img" />
          <span className="usa-navbar__logo-text">
            <span className="usa-navbar__logo-usa">USA</span>
            <span className="usa-navbar__logo-name">SIGNATURE GLOBAL CONFERENCES</span>
          </span>
        </Link>

        <ul className={`usa-navbar__links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={location.pathname === to ? "active" : ""}
                onClick={closeMenu}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="usa-navbar__cta-mobile">
            <Link to="/usa-register" onClick={closeMenu}>
              Register Now
            </Link>
          </li>
        </ul>

        <div className="usa-navbar__cta-wrapper">
          <Link to="/usa-register" className="usa-navbar__cta">
            Register Now
          </Link>
        </div>

        <button
          className={`usa-navbar__hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
}

const Hero = () => {
  const outer = "SIGNATURE GLOBAL CONFERENCES • USA • CONNECT • INSPIRE • LEAD • ";
  const middle = "GLOBAL EVENTS & EXPERIENCES • WOMEN LEADERSHIP • INNOVATION • ";
  const inner = "SHAPE THE FUTURE • PARIS • NEW YORK • LONDON • DUBAI • ";

  const makeCircle = (text, radius, fontSize) => {
    const chars = text.split("");
    const total = chars.length;
    return chars.map((char, i) => {
      const angle = (360 / total) * i - 90;
      return (
        <span
          key={i}
          className="usa-circular-char"
          style={{
            transform: `rotate(${angle}deg) translate(0, -${radius}px)`,
            fontSize: `${fontSize}px`,
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section className="usa-hero">
      <div className="usa-hero-container">
        <div className="usa-hero-text">
          <div className="usa-hero-tag-line">
            <span className="usa-hero-tag-dash" />
            <h5 className="usa-hero-tag">GLOBAL EVENTS & EXPERIENCES</h5>
          </div>

          <h1 className="usa-hero-heading">
            <span className="usa-hero-heading__outline">USA</span>
            <span className="usa-hero-heading__solid">SIGNATURE</span>
            <span className="usa-hero-heading__outline">GLOBAL</span>
            <span className="usa-hero-heading__solid">CONFERENCES</span>
          </h1>

          <p className="usa-hero-sub">Where Leaders Rise and Impact Begins.</p>

          <div className="usa-hero-buttons">
            <button className="usa-primary-btn">Become a Speaker</button>
            <button className="usa-secondary-btn">Register Now</button>
          </div>
        </div>

        <div className="usa-hero-image">
          <div className="usa-hero-circular-wrap">
            <div className="usa-circular-ring usa-circular-ring--outer">
              {makeCircle(outer, 210, 13)}
            </div>
            <div className="usa-circular-ring usa-circular-ring--middle">
              {makeCircle(middle, 148, 11.5)}
            </div>
            <div className="usa-circular-ring usa-circular-ring--inner">
              {makeCircle(inner, 90, 10)}
            </div>
          </div>
          <img src={statue} alt="Statue of Liberty" className="usa-hero-statue" />
        </div>
      </div>
    </section>
  );
};

const EVENTS = [
  { id: 1, title: "US Global Women SHINE Congress", date: "March 08-09, 2027", location: "New York, USA", image: Futureevent3 },
  { id: 2, title: "US Global MINDS EXCEL Congress", date: "March 08-09, 2027", location: "New York, USA", image: Futureevent1 },
  { id: 3, title: "US Global SHE LEADS Forum", date: "July 22-23, 2027", location: "Los Angeles, USA", image: Futureevent },
  { id: 4, title: "US Global PowHER Congress", date: "November 08-09, 2027", location: "San Francisco, USA", image: Futureevent2 },
];

function FutureEvents() {
  const trackRef = React.useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const cards = trackRef.current?.querySelectorAll(".usa-event-card");
    if (!cards) return;

    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card) => {
      scrollObserver.observe(card);
      const wrap = card.querySelector(".usa-event-card__image-wrap");
      card.addEventListener("mouseenter", () => {
        wrap.classList.remove("playing");
        void wrap.offsetWidth;
        wrap.classList.add("playing");
      });
    });

    return () => scrollObserver.disconnect();
  }, []);

  return (
    <section className="usa-events-section">
      <div className="usa-events-track__backdrop">
        <div className="usa-events-section__header">
          <span className="usa-events-section__label">What's Coming</span>
          <h2 className="usa-events-section__title">FUTURE EVENTS</h2>
        </div>
        <div className="usa-events-section__track" ref={trackRef}>
          {EVENTS.map((event, index) => (
            <React.Fragment key={event.id}>
              <div className="usa-event-card">
                <div className="usa-event-card__body">
                  {/* <span className="usa-event-card__category">{event.category}</span> */}
                  <h3 className="usa-event-card__title">{event.title}</h3>
                  <div className="usa-event-card__meta">
                    <div className="usa-event-card__meta-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {event.date}
                    </div>
                    <div className="usa-event-card__meta-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                </div>
                <div className="usa-event-card__image-outer">
                  <div className="usa-event-card__image-wrap">
                    <img src={event.image} alt={event.title} loading="lazy" />
                  </div>
                </div>
              </div>
              {index < EVENTS.length - 1 && <div className="usa-event-card-divider" />}
            </React.Fragment>
          ))}
        </div>
        <div className="usa-events-section__cta-wrap">
          <button className="usa-events-section__cta-btn" onClick={() => navigate("/usa-events")}>
            <span>View All Events</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Card data ──────────────────────────────────────────────── */
const cards = [
  {
    id: "expertise",
    number: "01",
    badge: "SKILL UP",
    title: "Elevate Your Expertise",
    description:
      "Gain cutting-edge insights from industry leaders and interactive sessions designed to sharpen your skills.",
    animType: "graph",
    gradient: "linear-gradient(135deg,#B22234 0%,#3C3B6E 100%)",
    badgeGrad: "linear-gradient(135deg,#e8394a,#B22234)",
    iconBg: "radial-gradient(circle at 30% 30%,rgba(178,34,52,0.35),rgba(60,59,110,0.18))",
  },
  {
    id: "networking",
    number: "02",
    badge: "CONNECT",
    title: "Global Networking",
    description:
      "Build meaningful connections with professionals, leaders, and innovators from around the world.",
    animType: "handshake",
    gradient: "linear-gradient(135deg,#3C3B6E 0%,#1a1c5e 60%,#B22234 100%)",
    badgeGrad: "linear-gradient(135deg,#4e4daa,#3C3B6E)",
    iconBg: "radial-gradient(circle at 30% 30%,rgba(60,59,110,0.40),rgba(178,34,52,0.15))",
  },
  {
    id: "opportunities",
    number: "03",
    badge: "UNLOCK",
    title: "Unlock Opportunities",
    description:
      "Explore new perspectives, step beyond your comfort zone, and uncover opportunities for growth.",
    animType: "lock",
    gradient: "linear-gradient(135deg,#3C3B6E 0%,#B22234 50%,#f0a500 100%)",
    badgeGrad: "linear-gradient(135deg,#B22234,#8b1a28)",
    iconBg: "radial-gradient(circle at 30% 30%,rgba(60,59,110,0.38),rgba(240,165,0,0.18))",
  },
  {
    id: "speakers",
    number: "04",
    badge: "INSPIRE",
    title: "Learn from Great Speakers",
    description:
      "Engage with thought leaders who share practical insights and real-world strategies.",
    animType: "mic",
    gradient: "linear-gradient(135deg,#B22234 0%,#f0a500 100%)",
    badgeGrad: "linear-gradient(135deg,#f0a500,#cf7500)",
    iconBg: "radial-gradient(circle at 30% 30%,rgba(178,34,52,0.30),rgba(240,165,0,0.25))",
  },
  {
    id: "collaborate",
    number: "05",
    badge: "IMPACT",
    title: "Collaborate & Create Impact",
    description:
      "Work with like-minded individuals to develop innovative solutions and drive meaningful change.",
    animType: "plant",
    gradient: "linear-gradient(135deg,#1a1c5e 0%,#3C3B6E 50%,#2d6a2d 100%)",
    badgeGrad: "linear-gradient(135deg,#3a8a3a,#2d6a2d)",
    iconBg: "radial-gradient(circle at 30% 30%,rgba(26,28,94,0.35),rgba(45,106,45,0.22))",
  },
  {
    id: "growth",
    number: "06",
    badge: "ACCELERATE",
    title: "Accelerate Your Growth",
    description:
      "Enhance your career, leadership journey, and professional potential through immersive experiences.",
    animType: "bolt",
    gradient: "linear-gradient(135deg,#f0a500 0%,#cf7500 40%,#B22234 100%)",
    badgeGrad: "linear-gradient(135deg,#f0a500,#cf7500)",
    iconBg: "radial-gradient(circle at 30% 30%,rgba(240,165,0,0.40),rgba(178,34,52,0.22))",
  },
];

/* ═══════════════════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════════════════ */
function GraphSVG() {
  return (
    <svg viewBox="0 0 80 80" className="patriot-icon" aria-hidden="true">
      <line x1="10" y1="65" x2="70" y2="65" className="gi-grid" strokeWidth="1" />
      <line x1="10" y1="50" x2="70" y2="50" className="gi-grid" strokeWidth="1" />
      <line x1="10" y1="35" x2="70" y2="35" className="gi-grid" strokeWidth="1" />
      <line x1="10" y1="20" x2="70" y2="20" className="gi-grid" strokeWidth="1" />
      <line x1="10" y1="12" x2="10" y2="68" className="gi-axis" strokeWidth="2" />
      <line x1="8"  y1="66" x2="72" y2="66" className="gi-axis" strokeWidth="2" />
      <polygon className="gi-area" points="14,62 24,52 34,54 46,36 58,24 66,14 66,66 14,66" />
      <polyline className="gi-line" points="14,62 24,52 34,54 46,36 58,24 66,14"
        fill="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="gi-dot gi-dot-d1" cx="14" cy="62" r="3" />
      <circle className="gi-dot gi-dot-d2" cx="24" cy="52" r="3" />
      <circle className="gi-dot gi-dot-d3" cx="34" cy="54" r="3" />
      <circle className="gi-dot gi-dot-d4" cx="46" cy="36" r="3" />
      <circle className="gi-dot gi-dot-d5" cx="58" cy="24" r="3" />
      <circle className="gi-dot gi-dot-d6" cx="66" cy="14" r="4.5" />
      <polygon className="gi-arrow" points="62,10 70,14 66,18" />
    </svg>
  );
}

function HandshakeSVG() {
  return (
    <svg viewBox="0 0 80 80" className="patriot-icon" aria-hidden="true">
      <ellipse className="hs-globe"   cx="40" cy="64" rx="22" ry="5" strokeWidth="1.5" fill="none" />
      <ellipse className="hs-globe-v" cx="40" cy="64" rx="10" ry="5" strokeWidth="1.5" fill="none" />
      <g className="hs-left-arm">
        <path d="M8 45 C10 38 16 34 22 34 L36 34" fill="none" strokeWidth="3" strokeLinecap="round" />
        <rect x="6" y="42" width="10" height="6" rx="3" className="hs-sleeve" />
      </g>
      <g className="hs-right-arm">
        <path d="M72 45 C70 38 64 34 58 34 L44 34" fill="none" strokeWidth="3" strokeLinecap="round" />
        <rect x="64" y="42" width="10" height="6" rx="3" className="hs-sleeve" />
      </g>
      <g className="hs-hands">
        <path d="M30 34 C30 30 34 28 38 28 L42 28 C46 28 50 30 50 34 L50 40 C50 44 46 46 42 46 L38 46 C34 46 30 44 30 40 Z"
          className="hs-clasp" strokeWidth="2" fill="none" />
        <line x1="38" y1="34" x2="38" y2="44" className="hs-finger" strokeWidth="1.5" />
        <line x1="42" y1="34" x2="42" y2="44" className="hs-finger" strokeWidth="1.5" />
        <circle className="hs-ring hs-ring-1" cx="40" cy="37" r="6"  fill="none" strokeWidth="1.5" />
        <circle className="hs-ring hs-ring-2" cx="40" cy="37" r="10" fill="none" strokeWidth="1" />
        <circle className="hs-ring hs-ring-3" cx="40" cy="37" r="14" fill="none" strokeWidth="0.5" />
      </g>
      <text className="hs-star hs-star-a" x="18" y="22" fontSize="8">✦</text>
      <text className="hs-star hs-star-b" x="56" y="22" fontSize="6">✦</text>
      <text className="hs-star hs-star-c" x="38" y="16" fontSize="5">✦</text>
    </svg>
  );
}

function RocketSVG() {
  return (
    <svg viewBox="0 0 80 80" className="patriot-icon" aria-hidden="true">
      <g className="rkt-smoke-group">
        <ellipse cx="32" cy="68" rx="5" ry="3" className="rkt-smoke rkt-s1" fill="none" strokeWidth="1.5" />
        <ellipse cx="40" cy="72" rx="7" ry="4" className="rkt-smoke rkt-s2" fill="none" strokeWidth="1.5" />
        <ellipse cx="48" cy="68" rx="5" ry="3" className="rkt-smoke rkt-s3" fill="none" strokeWidth="1.5" />
      </g>
      <g className="rkt-flame-group">
        <ellipse className="rkt-flame-outer" cx="40" cy="60" rx="6"   ry="9"   fill="none" strokeWidth="2" />
        <ellipse className="rkt-flame-inner" cx="40" cy="58" rx="3.5" ry="6"   fill="none" strokeWidth="2" />
        <ellipse className="rkt-flame-core"  cx="40" cy="56" rx="1.8" ry="3.5" fill="none" strokeWidth="1.5" />
      </g>
      <g className="rkt-body-group">
        <path d="M40 8 C40 8 52 18 52 38 L40 52 L28 38 C28 18 40 8 40 8Z"
          className="rkt-hull" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 10 C42 14 44 18 44 22" fill="none" strokeWidth="1.5" className="rkt-shine" strokeLinecap="round" />
        <circle cx="40" cy="30" r="5.5" className="rkt-port"       fill="none" strokeWidth="2" />
        <circle cx="40" cy="30" r="2.5" className="rkt-port-inner" />
        <path d="M28 40 L20 52 L28 48Z" className="rkt-fin" fill="none" strokeWidth="2" strokeLinejoin="round" />
        <path d="M52 40 L60 52 L52 48Z" className="rkt-fin" fill="none" strokeWidth="2" strokeLinejoin="round" />
        <line x1="30" y1="36" x2="26" y2="42" className="rkt-stripe" strokeWidth="1.2" />
        <line x1="50" y1="36" x2="54" y2="42" className="rkt-stripe" strokeWidth="1.2" />
      </g>
      <circle className="rkt-star rkt-star-a" cx="18" cy="20" r="1.5" />
      <circle className="rkt-star rkt-star-b" cx="62" cy="15" r="1" />
      <circle className="rkt-star rkt-star-c" cx="12" cy="38" r="1.2" />
      <circle className="rkt-star rkt-star-d" cx="66" cy="32" r="0.9" />
    </svg>
  );
}

function LockSVG() {
  return (
    <svg viewBox="0 0 80 80" className="patriot-icon" aria-hidden="true">
      <circle className="lk-glow-ring" cx="40" cy="50" r="22" fill="none" strokeWidth="1" />
      <rect   className="lk-body"      x="16" y="38" width="48" height="34" rx="8" fill="none" strokeWidth="2.8" />
      <path   className="lk-shine"     d="M20 44 C22 41 28 40 32 41" fill="none" strokeWidth="1.5" strokeLinecap="round" />
      <g className="lk-shackle-group">
        <path d="M26 38 L26 26 C26 16 54 16 54 26 L54 38"
          fill="none" strokeWidth="3.5" strokeLinecap="round" className="lk-shackle" />
      </g>
      <circle cx="40" cy="52" r="5.5" className="lk-hole" fill="none" strokeWidth="2.5" />
      <path d="M40 57 L40 64" className="lk-slot" strokeWidth="3" strokeLinecap="round" />
      <g className="lk-sparks">
        <line className="lk-spark lk-sp1" x1="56" y1="38" x2="62" y2="34" strokeWidth="1.8" strokeLinecap="round" />
        <line className="lk-spark lk-sp2" x1="58" y1="44" x2="65" y2="44" strokeWidth="1.8" strokeLinecap="round" />
        <line className="lk-spark lk-sp3" x1="24" y1="38" x2="18" y2="34" strokeWidth="1.8" strokeLinecap="round" />
        <line className="lk-spark lk-sp4" x1="22" y1="44" x2="15" y2="44" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function MicSVG() {
  return (
    <svg viewBox="0 0 80 80" className="patriot-icon" aria-hidden="true">
      <ellipse className="mc-spotlight" cx="40" cy="74" rx="18" ry="4" fill="none" strokeWidth="1" />
      <line x1="40" y1="60" x2="40" y2="70" className="mc-stand" strokeWidth="3" strokeLinecap="round" />
      <line x1="28" y1="70" x2="52" y2="70" className="mc-base"  strokeWidth="3" strokeLinecap="round" />
      <g className="mc-body-group">
        <rect x="30" y="12" width="20" height="34" rx="10" className="mc-body" fill="none" strokeWidth="2.8" />
        <line x1="30" y1="26" x2="50" y2="26" className="mc-grille" strokeWidth="1.2" />
        <line x1="30" y1="32" x2="50" y2="32" className="mc-grille" strokeWidth="1.2" />
        <line x1="30" y1="38" x2="50" y2="38" className="mc-grille" strokeWidth="1.2" />
      </g>
      <path d="M22 40 C22 56 58 56 58 40" fill="none" strokeWidth="2.8" strokeLinecap="round" className="mc-neck" />
      <g className="mc-waves-right">
        <path className="mc-wave mc-w1r" d="M62 30 C68 33 68 43 62 46" fill="none" strokeWidth="2"   strokeLinecap="round" />
        <path className="mc-wave mc-w2r" d="M66 24 C76 29 76 47 66 52" fill="none" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g className="mc-waves-left">
        <path className="mc-wave mc-w1l" d="M18 30 C12 33 12 43 18 46" fill="none" strokeWidth="2"   strokeLinecap="round" />
        <path className="mc-wave mc-w2l" d="M14 24 C4  29  4 47 14 52" fill="none" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function PlantSVG() {
  return (
    <svg viewBox="0 0 80 80" className="patriot-icon" aria-hidden="true">
      <ellipse cx="40" cy="72" rx="18" ry="4" className="pl-soil" fill="none" strokeWidth="1.5" />
      <path d="M28 72 C28 68 30 66 32 66 L48 66 C50 66 52 68 52 72Z" className="pl-pot" fill="none" strokeWidth="2" />
      <path className="pl-stem" d="M40 66 C40 52 40 42 40 30" fill="none" strokeWidth="3" strokeLinecap="round" />
      <g className="pl-branch-left">
        <path d="M40 50 C34 46 26 46 22 42" fill="none" strokeWidth="2.2" strokeLinecap="round" className="pl-branch" />
        <g className="pl-leaf-left">
          <path d="M22 42 C14 34 16 24 24 26 C28 32 26 40 22 42Z" fill="none" strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 42 C20 36 20 30 24 26" fill="none" strokeWidth="1.2" strokeLinecap="round" className="pl-vein" />
        </g>
      </g>
      <g className="pl-branch-right">
        <path d="M40 40 C46 36 54 36 58 32" fill="none" strokeWidth="2.2" strokeLinecap="round" className="pl-branch" />
        <g className="pl-leaf-right">
          <path d="M58 32 C66 24 64 14 56 16 C52 22 54 30 58 32Z" fill="none" strokeWidth="2" strokeLinejoin="round" />
          <path d="M58 32 C60 26 60 20 56 16" fill="none" strokeWidth="1.2" strokeLinecap="round" className="pl-vein" />
        </g>
      </g>
      <g className="pl-bud">
        <path d="M40 30 C36 24 34 16 40 12 C46 16 44 24 40 30Z" fill="none" strokeWidth="2" strokeLinejoin="round" />
        <path d="M40 30 C38 24 38 18 40 12" fill="none" strokeWidth="1.2" strokeLinecap="round" className="pl-vein" />
        <circle className="pl-dewdrop" cx="37" cy="18" r="2" />
      </g>
      <circle className="pl-pollen pl-p1" cx="24" cy="36" r="1.5" />
      <circle className="pl-pollen pl-p2" cx="56" cy="28" r="1.2" />
      <circle className="pl-pollen pl-p3" cx="48" cy="20" r="1" />
    </svg>
  );
}

function BoltSVG() {
  return (
    <svg viewBox="0 0 80 80" className="patriot-icon" aria-hidden="true">
      <circle className="bt-ring bt-ring-1" cx="40" cy="40" r="32" fill="none" strokeWidth="1" />
      <circle className="bt-ring bt-ring-2" cx="40" cy="40" r="24" fill="none" strokeWidth="1" />
      <g className="bt-rays">
        <line className="bt-ray" x1="40" y1="4"  x2="40" y2="12"  strokeWidth="2" strokeLinecap="round" />
        <line className="bt-ray" x1="40" y1="68" x2="40" y2="76"  strokeWidth="2" strokeLinecap="round" />
        <line className="bt-ray" x1="4"  y1="40" x2="12" y2="40"  strokeWidth="2" strokeLinecap="round" />
        <line className="bt-ray" x1="68" y1="40" x2="76" y2="40"  strokeWidth="2" strokeLinecap="round" />
        <line className="bt-ray" x1="12" y1="12" x2="18" y2="18"  strokeWidth="2" strokeLinecap="round" />
        <line className="bt-ray" x1="62" y1="62" x2="68" y2="68"  strokeWidth="2" strokeLinecap="round" />
        <line className="bt-ray" x1="62" y1="18" x2="68" y2="12"  strokeWidth="2" strokeLinecap="round" />
        <line className="bt-ray" x1="12" y1="62" x2="18" y2="68"  strokeWidth="2" strokeLinecap="round" />
      </g>
      <polygon className="bt-bolt-fill" points="46,8 26,42 38,42 34,72 54,38 42,38" />
      <polygon className="bt-bolt"      points="46,8 26,42 38,42 34,72 54,38 42,38"
        fill="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

const animMap = {
  graph: GraphSVG, handshake: HandshakeSVG, rocket: RocketSVG,
  lock: LockSVG,  mic: MicSVG,             plant: PlantSVG,   bolt: BoltSVG,
};

/* ── Feature card ───────────────────────────────────────────── */
function FeatureCard({ card, index }) {
  const Anim  = animMap[card.animType];
  const ref   = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el  = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
   <article
  ref={ref}
  className={`frontier-card frontier-card--${card.animType} ${visible ? "frontier-card--visible" : ""}`}
  style={{ "--delay": `${index * 90}ms` }}
>
  {/* gradient number */}
  <span
    className="frontier-card__number"
    style={{ background: card.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
  >
    {card.number}
  </span>

  {/* gradient splash */}
  <div className="frontier-card__splash" style={{ background: card.gradient }} aria-hidden="true" />
  {/* noise overlay */}
  <div className="frontier-card__noise" aria-hidden="true" />

  {/* badge */}
  <span className="frontier-badge" style={{ background: card.badgeGrad }}>{card.badge}</span>

  {/* icon */}
  <div className="frontier-card__icon-wrap" style={{ background: card.iconBg }}>
    <div className="frontier-icon-ring" />
    <Anim />
  </div>

  {/* content */}
  <h3 className="frontier-card__title">{card.title}</h3>
  <p  className="frontier-card__desc">{card.description}</p>

  {/* footer — bar only, no line/arrow */}
  <div className="frontier-card__footer">
    <div className="frontier-card__bar" style={{ background: card.gradient }} />
  </div>
</article>
  );
}

/* ── Section ────────────────────────────────────────────────── */
 function WhyJoinUs() {
  return (
    <section className="why-join-section" aria-labelledby="capitol-heading">

      {/* ── Background canvas card ─────────────────────────── */}
      <div className="capitol-canvas">

        {/* scattered decorative stars */}
        <div className="union-stars" aria-hidden="true">
          {[...Array(22)].map((_, i) => (
            <span key={i} className="union-star" style={{
              "--sx": `${(i * 4.1 + 6) % 100}%`,
              "--sy": `${(i * 7.7 + 4) % 100}%`,
              "--ss": `${0.8 + (i % 3) * 0.7}px`,
              "--sd": `${(i * 0.45) % 5}s`,
            }} />
          ))}
        </div>

        {/* top-right corner: faded number + gradient blob */}
        <div className="capitol-canvas__corner" aria-hidden="true">
          {/* <span className="capitol-canvas__number">01</span> */}
          <div className="capitol-canvas__blob" />
        </div>

        {/* heading — inside the background card */}
        <header className="liberty-header">
          <span className="liberty-header__note">USA Signature Global Conferences</span>
          <h2 id="capitol-heading" className="liberty-header__title">Why Join Us</h2>
        </header>

        {/* feature cards */}
        <div className="states-grid">
          {cards.map((c, i) => <FeatureCard key={c.id} card={c} index={i} />)}
        </div>

      </div>

    </section>
  );
}

const SPEAKERS = [
  { id: 1, image: Speakerimg },
  { id: 2, image: Speakerimg1 },
  { id: 3, image: Speakerimg2 },
  { id: 4, image: Speakerimg3 },
  { id: 5, image: Speakerimg4 },
  { id: 6, image: Speakerimg5 },
];

const EsteeemedSpeakers = () => {
  const navigate = useNavigate();
  return (
    <section className="usa-speakers-section">
      <div className="usa-speakers-track-wrap">
        <div className="usa-speakers-header">
          <span className="usa-speakers-label">Meet The Voices</span>
          <h2 className="usa-speakers-title">ESTEEMED SPEAKERS</h2>
        </div>
        <div className="usa-speakers-marquee">
          <div className="usa-speakers-marquee__inner">
            {[...SPEAKERS, ...SPEAKERS].map((speaker, i) => (
              <div className="usa-speaker-card" key={i}>
                <div className="usa-speaker-card__image-wrap">
                  <img src={speaker.image} alt={speaker.name} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="usa-speakers-section__cta-wrap">
          <button className="usa-speakers-section__cta-btn" onClick={() => navigate("/usa-speakers")}>
            <span>Meet All Speakers</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

const GALLERY_IMAGES = [
  { id: 1, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=80", title: "Global Leaders Summit", date: "August 08, 2026", location: "Paris, France", description: "An electrifying gathering of world leaders sharing vision, strategy, and purpose on the global stage." },
  { id: 2, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=80", title: "Women in Power", date: "August 09, 2026", location: "Paris, France", description: "Celebrating the voices of trailblazing women redefining leadership across industries worldwide." },
  { id: 3, image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&auto=format&fit=crop&q=80", title: "Innovation Panel", date: "September 15, 2026", location: "New York, USA", description: "Thought leaders debate the future of technology, disruption, and human-centered design." },
  { id: 4, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=80", title: "Executive Forum", date: "October 10, 2026", location: "London, UK", description: "A curated forum where top executives align on strategy, growth, and global opportunity." },
  { id: 5, image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&auto=format&fit=crop&q=80", title: "Keynote Moments", date: "October 11, 2026", location: "London, UK", description: "Thousands gathered to witness landmark keynotes that shaped conversations for years to come." },
  { id: 6, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&auto=format&fit=crop&q=80", title: "Resilience & Growth", date: "November 20, 2026", location: "Dubai, UAE", description: "Powerful stories of resilience and transformation delivered by an unforgettable lineup of speakers." },
];

const ANIMATIONS = ["usa-anim-rise", "usa-anim-swivel", "usa-anim-drop", "usa-anim-slide", "usa-anim-zoom", "usa-anim-flip"];

const GallerySection = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animClass, setAnimClass] = React.useState(ANIMATIONS[0]);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        const nextIndex = (activeIndex + 1) % GALLERY_IMAGES.length;
        const nextAnim = ANIMATIONS[nextIndex % ANIMATIONS.length];
        setActiveIndex(nextIndex);
        setAnimClass(nextAnim);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const active = GALLERY_IMAGES[activeIndex];
  return (
    <section className="usa-gallery-section">
      <div className="usa-gallery-header">
        <span className="usa-gallery-label">Moments & Memories</span>
        <h2 className="usa-gallery-title">OUR GALLERY</h2>
      </div>
      <div className="usa-gallery-showcase">
        <div className={`usa-gallery-text ${visible ? "usa-gallery-text--in" : "usa-gallery-text--out"}`}>
          <span className="usa-gallery-text__location">{active.location} — {active.date}</span>
          <h3 className="usa-gallery-text__title">{active.title}</h3>
          <p className="usa-gallery-text__desc">{active.description}</p>
          <div className="usa-gallery-text__counter">
            {GALLERY_IMAGES.map((_, i) => (
              <span
                key={i}
                className={`usa-gallery-dot ${i === activeIndex ? "usa-gallery-dot--active" : ""}`}
                onClick={() => {
                  setVisible(false);
                  setTimeout(() => {
                    setActiveIndex(i);
                    setAnimClass(ANIMATIONS[i % ANIMATIONS.length]);
                    setVisible(true);
                  }, 300);
                }}
              />
            ))}
          </div>
        </div>
        <div className="usa-gallery-card-wrap">
          <div className="usa-gallery-stack usa-gallery-stack--tl2" />
          <div className="usa-gallery-stack usa-gallery-stack--tl1" />
          <div className="usa-gallery-stack usa-gallery-stack--br1" />
          <div className="usa-gallery-stack usa-gallery-stack--br2" />
          {visible && (
            <div className={`usa-gallery-card ${animClass}`} key={active.id}>
              <img src={active.image} alt={active.title} />
              <div className="usa-gallery-card__overlay">
                <span className="usa-gallery-card__overlay-title">{active.title}</span>
                <span className="usa-gallery-card__overlay-location">{active.location}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="usa-gallery-section__cta-wrap">
        <button className="usa-gallery-section__cta-btn" onClick={() => navigate("/usa-gallery")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Explore Full Gallery</span>
        </button>
      </div>
    </section>
  );
};

export { Navbar };

export default function HomePage() {
  // ✅ REMOVED: This effect was conflicting with Navbar's scroll-lock
  // The page should use native document scrolling, not nested containers
  
  return (
    <div className="usa-page">
      <Navbar />
      <Hero />
      <FutureEvents />
      <WhyJoinUs />
      {/* <EsteeemedSpeakers /> */}
             <TempHomeSpeakers/>

      {/* <GallerySection /> */}

       <TempHomeGallery/>

      <Footer theme="usa" />
    </div>
  );
}