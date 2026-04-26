import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./eurohome.css";
import BgImage from "./imgs/texture_bg_2.jpg";
import FloatingImage from "./imgs/paris_2.png";
import RightImage from "./imgs/paris_3.png";
import sgcLogo from "../globaldata/sgc_logo.jpeg";
import Footer from "../../../Components/Footer/footer";

/*=================== DATA EXPORTS ============================== */
export const stats = [
  { id: 1, value: 12000, suffix: "+", label: "Attendees" },
  { id: 2, value: 85, suffix: "+", label: "Events Hosted" },
  { id: 3, value: 98, suffix: "%", label: "Satisfaction Rate" },
  { id: 4, value: 47, suffix: "+", label: "Countries" },
];

export const whyJoinFeatures = [
  { id: 1, icon: "01", title: "Network with Global Leaders", description: "Connect face-to-face with CEOs, ministers, and thought leaders shaping the future of business and governance.", },
  { id: 2, icon: "02", title: "Gain International Exposure", description: "Position yourself and your brand on an international stage, reaching audiences across 47+ countries.", },
  { id: 3, icon: "03", title: "Speak on a Prestigious Stage", description: "Share your expertise and vision with thousands of high-impact attendees in an electrifying setting.", },
  { id: 4, icon: "04", title: "Elevate Your Personal Brand", description: "Be featured in global media, executive publications, and across our network of 100K+ professionals.", },
];

export const speakerPackages = [
  {
    id: 1, name: "Standard Speaker", badge: "Most Popular", earlyBirdPrice: "$699", regularPrice: "$899", buttonLabel: "Choose Standard",
    includes: ["Speaking slot (25-30 minutes)", "Certificate of Recognition", "Global Networking Access", "Professional Event Photos", "Featured on Website"],
    note: "Without accommodation",
  },
  {
    id: 2, name: "Premium Speaker", badge: "", earlyBirdPrice: "$899", regularPrice: "$1199", buttonLabel: "Choose Premium",
    includes: ["Speaking slot", "2 Nights Accommodation", "Priority Speaking Slot", "Free Social Media Promotion", "Certificate", "Premium Networking", "Enhanced Visibility"],
    note: "",
  },
  {
    id: 3, name: "VIP Speaker Experience", badge: "VIP", earlyBirdPrice: "$1699", regularPrice: "$1999", buttonLabel: "Choose VIP",
    includes: ["2 Speaking Slots (Maximum Exposure)", "3 Nights Accommodation", "Priority Stage Positioning", "Free Social Media Promotion", "Extra Branding & Visibility", "VIP Networking Access", "Certificate of Excellence"],
    note: "",
  },
];

export const delegatePass = {
  name: "Delegate Pass", earlyBirdPrice: "$249", regularPrice: "$350", buttonLabel: "Choose Delegate",
  includes: ["Full Access to All Sessions", "Networking Opportunities", "Participation Certificate"],
};

export const earlyBirdOffer = {
  title: "Early Bird Offer", description: "Early Bird Offer valid for first 50 registrations only.",
  securedText: "18 slots already secured.", reminder: "Limited spots remaining - secure your place now.",
};

export const speakers = [
  { id: 1, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80", name: "Dr. Arjun Mehta", country: "India", role: "Global Strategy Advisor" },
  { id: 2, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80", name: "Sarah Al-Rashidi", country: "UAE", role: "CEO, FuturePath Inc." },
  { id: 3, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80", name: "James O'Brien", country: "United Kingdom", role: "Keynote Speaker & Author" },
  { id: 4, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80", name: "Amara Nwosu", country: "Nigeria", role: "Policy & Innovation Leader" },
];

export const highlights = [
  { id: 1, image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", size: "large" },
  { id: 2, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80", size: "small" },
  { id: 3, image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=500&q=80", size: "medium" },
  { id: 4, image: "https://images.unsplash.com/photo-1560523159-6b681a1e1852?w=500&q=80", size: "small" },
  { id: 5, image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80", size: "large" },
  { id: 6, image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80", size: "medium" },
  { id: 7, image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&q=80", size: "small" },
  { id: 8, image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=80", size: "medium" },
];

export const pastConferences = [
  { id: 1, image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=80", title: "Global Visionaries Summit", date: "March 2024", location: "Paris, France" },
  { id: 2, image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=80", title: "Leaders of Tomorrow Forum", date: "July 2024", location: "Mumbai, India" },
  { id: 3, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80", title: "Signature CEO Roundtable", date: "October 2023", location: "New York, USA" },
  { id: 4, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80", title: "International Impact Conference", date: "January 2023", location: "Dubai, UAE" },
  { id: 5, image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80", title: "Women Who Lead Summit", date: "May 2023", location: "London, UK" },
  { id: 6, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80", title: "Innovation Nexus Conference", date: "September 2022", location: "Singapore" },
  { id: 7, image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&q=80", title: "Entrepreneurship World Forum", date: "November 2022", location: "Toronto, Canada" },
];

/* ==================================================
   CONSTANTS
================================================== */
const NAV_LINKS = [
  { label: "Home", to: "/europe" },
  { label: "About", to: "/europe-about" },
  { label: "Events", to: "/europe-events" },
  { label: "Speakers", to: "/europe-speakers" },
  { label: "Gallery", to: "/europe-gallery" },
  { label: "Contact", to: "/europe-contact" },
  
];

const EVENTS = [
  { id: 1, title: "Global Women Leadership & Mental Resilience Signature Conference", date: "August 08-09, 2026", location: "Paris, France", category: "Women Leadership", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop" },
  { id: 2, title: "Future Technology & Innovation Summit", date: "September 15-16, 2026", location: "New York, USA", category: "Technology", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop" },
  { id: 3, title: "Global Business Leadership & Strategy Forum", date: "October 10-11, 2026", location: "London, UK", category: "Business", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop" },
  { id: 4, title: "International Health & Wellness Conference", date: "November 20-21, 2026", location: "Dubai, UAE", category: "Health & Wellness", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop" },
];

const SWAY_CLASSES = ["europe-sway-a", "europe-sway-b", "europe-sway-c", "europe-sway-d"];

const SPEAKERS = [
  { id: 1, name: "Dr. Amara Osei", title: "AI Ethics Lead", org: "DeepMind", topic: "Responsible AI in the Wild", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop&crop=face" },
  { id: 2, name: "Lena Marchetti", title: "CTO & Co-Founder", org: "NeuralEdge", topic: "Scaling LLMs for Enterprises", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop&crop=face" },
  { id: 3, name: "James Thornton", title: "Principal Engineer", org: "Anthropic", topic: "The Future of Code Generation", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face" },
  { id: 4, name: "Priya Nair", title: "Head of Product", org: "OpenSpark", topic: "Building Human-Centered AI", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face" },
  { id: 5, name: "Carlos Vega", title: "Research Scientist", org: "MIT CSAIL", topic: "Multimodal Models Explained", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face" },
  { id: 6, name: "Yuki Tanaka", title: "Design Director", org: "Figma AI", topic: "AI-Augmented Creativity", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face" },
  { id: 7, name: "Fatima Al-Rashid", title: "VP Engineering", org: "Cohere", topic: "RAG at Production Scale", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face" },
];

const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=900&auto=format&fit=crop", alt: "Conference keynote hall", label: "Keynote Session", tag: "Main Stage", span: "tall" },
  { id: 2, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&auto=format&fit=crop", alt: "Speaker presenting on stage", label: "Opening Address", tag: "Speaker", span: "wide" },
  { id: 3, src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&auto=format&fit=crop", alt: "People networking", label: "Networking Lounge", tag: "Networking", span: "square" },
  { id: 4, src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=900&auto=format&fit=crop", alt: "Panel discussion", label: "Panel Discussion", tag: "Panel", span: "square" },
  { id: 5, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop", alt: "Conference auditorium", label: "Grand Auditorium", tag: "Venue", span: "wide" },
  { id: 6, src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&auto=format&fit=crop", alt: "Workshop session", label: "Breakout Workshop", tag: "Workshop", span: "square" },
  { id: 8, src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop", alt: "Expo and booths", label: "Exhibition Floor", tag: "Expo", span: "wide" },
  { id: 9, src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop", alt: "Audience interaction", label: "Live Q&A", tag: "Audience", span: "square" },
];

/* ==================================================
   SVG ICONS
================================================== */
function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const IconPeople = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="europe-wju-card-icon-svg">
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M21 21v-2a4 4 0 0 0-3-3.85" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const IconPen = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="europe-wju-card-icon-svg">
    <path d="M12 20h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="europe-wju-card-icon-svg">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconConnect = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="europe-wju-card-icon-svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7" />
    <line x1="19" y1="8" x2="19" y2="14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <line x1="16" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="europe-wju-card-icon-svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="europe-wju-card-icon-svg">
    <path d="M3 20.5V14M8 20.5V10M13 20.5V6M18 20.5V2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M1 20.5h22" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const items = [
  { number: "01", title: "Be Part of a Global Movement", description: "Join a purpose-driven community of leaders who are shaping the future.", icon: <IconPeople /> },
  { number: "02", title: "Inspire Through Your Voice", description: "Your story has power — share it, inspire others, and create change.", icon: <IconPen /> },
  { number: "03", title: "Elevate Your Leadership", description: "Step into your potential and grow beyond limitations.", icon: <IconStar /> },
  { number: "04", title: "Build Meaningful Connections", description: "Connect with individuals who value impact over competition.", icon: <IconConnect /> },
  { number: "05", title: "Create Lasting Impact", description: "Leave a mark that goes beyond the stage.", icon: <IconShield /> },
  { number: "06", title: "Accelerate Your Growth", description: "Gain tools, insights, and exposure that fast-track your journey.", icon: <IconChart /> },
];

/* ======================COMPONENTS========================== */
function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="europe-navbar">
      <Link to="/" className="europe-navbar__logo" onClick={closeMenu}>
        <img src={sgcLogo} alt="SGC Logo" className="europe-navbar__logo-img" />
        <span className="europe-navbar__logo-text">
          <span className="europe-logo-line1">Europe</span>
          <span className="europe-logo-line2">Signature Global Conferences</span>
        </span>
      </Link>
      <ul className={`europe-navbar__links ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(({ label, to }) => (
          <li key={to}>
            <Link to={to} className={location.pathname === to ? "active" : ""} onClick={closeMenu}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="europe-navbar__cta-wrapper">
        <button className="europe-navbar__cta" onClick={() => navigate("/europe-register")}>
          Register Now
        </button>
      </div>
      <button className={`europe-navbar__hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>
        <span /><span /><span />
      </button>
    </nav>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="europe-hero" style={{ backgroundImage: `url(${BgImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
      <div className="europe-hero__overlay" />
      <img src={FloatingImage} alt="floating decoration" className="europe-hero__floating-image" />
      <img src={RightImage} alt="right building" className="europe-hero__floating-image--right" />
      <div className="europe-hero__content">
        <h1 className="europe-hero__title">EUROPE SIGNATURE GLOBAL CONFERENCES</h1>
        <p className="europe-hero__tagline">WHERE LEADERS RISE AND IMPACT</p>
        <div className="europe-hero__buttons">
          <Link to="/europe-events" className="europe-hero__btn primary">View Conferences</Link>
          <button className="europe-hero__btn secondary" onClick={() => navigate("/europe-register")}>Register Now</button>
        </div>
      </div>
    </section>
  );
}

function FutureEvents() {
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("europe-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="europe-fe-section" style={{ backgroundImage: `url(${BgImage})` }}>
      <div className="europe-fe-overlay" aria-hidden="true" />
      <div className="europe-fe-header">
        <span className="europe-fe-label">What's Coming</span>
        <h2 className="europe-fe-title">FUTURE EVENTS</h2>
      </div>
      <div className="europe-fe-rope-wrapper">
        <div className="europe-fe-rope-line" />
        <div className="europe-fe-cards-row">
          {EVENTS.map((event, index) => (
            <div key={event.id} className="europe-fe-card-wrap" ref={(el) => (cardsRef.current[index] = el)} style={{ animationDelay: `${index * 0.12}s` }}>
              <div className="europe-fe-clip"><span className="europe-fe-clip-shine" /></div>
              <article className={`europe-fe-card ${SWAY_CLASSES[index % SWAY_CLASSES.length]}`}>
                <div className="europe-fe-card__image-outer">
                  <img src={event.image} alt={event.title} className="europe-fe-card__image" loading="lazy" />
                </div>
                <div className="europe-fe-card__body">
                  <span className="europe-fe-card__category">{event.category}</span>
                  <h3 className="europe-fe-card__title">{event.title}</h3>
                  <div className="europe-fe-card__meta">
                    <div className="europe-fe-card__meta-item"><CalendarIcon />{event.date}</div>
                    <div className="europe-fe-card__meta-item"><PinIcon />{event.location}</div>
                  </div>
                </div>
                <button className="europe-fe-card__cta" onClick={() => navigate("/europe-register")}>Register Now</button>
              </article>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "50px", position: "relative", zIndex: 10 }}>
        <button className="europe-hero__btn primary" onClick={() => navigate("/europe-events")} style={{ cursor: "pointer", border: "none", fontSize: "1rem", padding: "12px 30px" }}>View All Events</button>
      </div>
    </section>
  );
}

function WhyJoinUs() {
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".europe-wju-card");
            cards.forEach((card, i) => {
              setTimeout(() => card.classList.add("europe-wju-card--visible"), i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="europe-wju-section" style={{ backgroundImage: `url(${BgImage})` }}>
      <div className="europe-wju-overlay" aria-hidden="true" />
      <div className="europe-wju-inner">
        <div className="europe-wju-header">
          <div className="europe-wju-tag">
            <span className="europe-wju-tag-line" />  WHY JOIN US  <span className="europe-wju-tag-line" />
          </div>
          <h2 className="europe-wju-heading">Why Join <em className="europe-wju-heading-accent">ESGC 2025</em></h2>
          <p className="europe-wju-subtext">Join a global community of visionary leaders, changemakers, and innovators committed to creating lasting impact.</p>
        </div>
        <div className="europe-wju-grid" ref={gridRef}>
          {items.map((item, i) => (
            <div className="europe-wju-card" key={i}>
              <span className="europe-wju-card-arc" aria-hidden="true" />
              <span className="europe-wju-card-number">{item.number}</span>
              <h3 className="europe-wju-card-title">{item.title}</h3>
              <p className="europe-wju-card-desc">{item.description}</p>
              <div className="europe-wju-card-footer">
                <div className="europe-wju-card-icon">{item.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CARD_W = 190;
const CENTER_W = 295;
const GAP = 16;
const DUR = 650;
const COUNT = SPEAKERS.length;

function SpeakersCarousel() {
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const go = useCallback((idx) => {
    if (busy) return;
    const next = ((idx % COUNT) + COUNT) % COUNT;
    if (next === active) return;
    setBusy(true);
    setActive(next);
    setTimeout(() => setBusy(false), DUR);
  }, [busy, active]);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % COUNT);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(advance, 3000);
    return () => clearInterval(timerRef.current);
  }, [advance]);

  const handleNav = useCallback((idx) => {
    clearInterval(timerRef.current);
    go(idx);
    timerRef.current = setInterval(advance, 3000);
  }, [go, advance]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handleNav(active - 1);
      else if (e.key === "ArrowRight") handleNav(active + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, handleNav]);

  const getStyle = (offset) => {
    const abs = Math.abs(offset);
    const isCenter = offset === 0;
    const xBase = offset * (CARD_W + GAP);
    const xAdj = offset > 0 ? (CENTER_W - CARD_W) / 2 : offset < 0 ? -(CENTER_W - CARD_W) / 2 : 0;
    const scale = isCenter ? 1 : abs === 1 ? 0.87 : abs === 2 ? 0.74 : 0.62;
    const opacity = isCenter ? 1 : abs === 1 ? 0.7 : abs === 2 ? 0.4 : 0.15;
    return {
      transform: `translateX(${xBase + xAdj}px) scale(${scale})`,
      opacity,
      zIndex: 10 - abs,
      width: `${isCenter ? CENTER_W : CARD_W}px`,
      transition: `transform ${DUR}ms cubic-bezier(.4,0,.2,1), opacity ${DUR}ms ease, width ${DUR}ms ease`,
    };
  };

  return (
    <section className="europe-sc-section" style={{ backgroundImage: `url(${BgImage})` }}>
      <div className="europe-sc-overlay" aria-hidden="true" />
      <div className="europe-sc-header">
        <h2 className="europe-sc-heading">our esteemed <em>speakers.</em></h2>
        <p className="europe-sc-subtext">Visionaries, builders &amp; researchers shaping tomorrow's technology.</p>
      </div>
      <div className="europe-sc-stage-wrap">
        <div className="europe-sc-stage">
          {SPEAKERS.map((sp, idx) => {
            let offset = (idx - active) % COUNT;
            if (offset > Math.floor(COUNT / 2)) offset -= COUNT;
            if (offset < -Math.floor(COUNT / 2)) offset += COUNT;
            const isCenter = offset === 0;
            return (
              <div key={sp.id} className={`europe-sc-pill${isCenter ? " europe-sc-pill--center" : ""}`} style={getStyle(offset)} onClick={() => !isCenter && handleNav(idx)}>
                <div className="europe-sc-pill-photo">
                  <img src={sp.image} alt={sp.name} draggable={false} />
                  <div className="europe-sc-pill-photo-fade" />
                </div>
                <div className="europe-sc-pill-footer">
                  {isCenter && <span className="europe-sc-pill-tag">{sp.topic}</span>}
                  <p className="europe-sc-pill-name">{sp.name}</p>
                  {isCenter && <p className="europe-sc-pill-role">{sp.title} &middot; <span>{sp.org}</span></p>}
                </div>
                {isCenter && <div className="europe-sc-pill-crown">Featured Speaker</div>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="europe-sc-dots">
        {SPEAKERS.map((_, i) => (
          <button key={i} className={`europe-sc-dot${i === active ? " europe-sc-dot--on" : ""}`} onClick={() => handleNav(i)} aria-label={`Go to speaker ${i + 1}`} />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "50px", position: "relative", zIndex: 10 }}>
        <button className="europe-hero__btn primary" onClick={() => navigate("/europe-speakers")} style={{ cursor: "pointer", border: "none", fontSize: "1rem", padding: "12px 30px" }}>Meet Our Speakers</button>
      </div>
    </section>
  );
}

function GalleryGrid({ onViewGallery }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleViewGallery = () => {
    if (onViewGallery) onViewGallery();
    else window.location.href = "/europe-gallery";
  };

  return (
    <section className="europe-gallery-section" style={{ backgroundImage: `url(${BgImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", position: "relative", zIndex: 1 }} ref={sectionRef}>
      <div className="europe-fe-overlay" aria-hidden="true" style={{ zIndex: -1 }} />
      <div className={`europe-gallery-header ${visible ? "europe-header-visible" : ""}`}>
        <span className="europe-gallery-eyebrow">Captured Moments</span>
        <h2 className="europe-gallery-title" style={{ position: "relative", zIndex: 10 }}>Through the <em>Lens</em></h2>
        <p className="europe-gallery-subtitle" style={{ position: "relative", zIndex: 10 }}>Highlights from our most unforgettable sessions, talks, and connections.</p>
      </div>
      <div className="europe-tape europe-tape-left" aria-hidden="true" />
      <div className="europe-tape europe-tape-right" aria-hidden="true" />
      <div className={`europe-gallery-grid ${visible ? "europe-grid-visible" : ""}`} style={{ position: "relative", zIndex: 10 }}>
        {photos.map((photo, i) => (
          <div key={photo.id} className={`europe-gallery-card europe-card-${photo.span} ${visible ? "europe-card-in" : ""} ${hovered === photo.id ? "europe-card-focused" : ""} ${hovered !== null && hovered !== photo.id ? "europe-card-dimmed" : ""}`} style={{ "--delay": `${i * 80}ms` }} onMouseEnter={() => setHovered(photo.id)} onMouseLeave={() => setHovered(null)}>
            <span className="europe-card-dot europe-dot-tl" aria-hidden="true" />
            <span className="europe-card-dot europe-dot-br" aria-hidden="true" />
            <div className="europe-card-img-wrap">
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="europe-card-shimmer" />
            </div>
            <div className="europe-card-overlay">
              <span className="europe-card-tag">{photo.tag}</span>
              <p className="europe-card-label">{photo.label}</p>
              <div className="europe-card-line" />
            </div>
          </div>
        ))}
      </div>
      <div className={`europe-gallery-cta ${visible ? "europe-cta-visible" : ""}`} style={{ position: "relative", zIndex: 10 }}>
        <button className="europe-gallery-btn" onClick={handleViewGallery}>
          <span className="europe-btn-text">Explore Full Gallery</span>
          <span className="europe-btn-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}

/* ========================= MAIN PAGE EXPORT ===================================== */
export { Navbar };

export default function HomePage() {
  return (
    <div className="europe-page">
      <div className="europe-page-wrapper">
        <Navbar />
        <HeroSection />
        <FutureEvents />
        <WhyJoinUs />
        <SpeakersCarousel />
        <GalleryGrid />
        <Footer theme="europe" />
      </div>
    </div>
  );
}