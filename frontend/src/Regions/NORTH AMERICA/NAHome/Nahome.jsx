import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nahome.css";
import sgcLogo from "./SGC Logo.png";
import heroBg from "./north_america_bg.png";
import Footer from "../../../Components/Footer/footer";
import { TempHomeGallery, TempHomeSpeakers } from "./TempHGS";



import Naimg from "../../globaldata/images/naevent.jpeg";
import Naimg1 from "../../globaldata/images/naevent2.jpeg";
import Naimg2 from "../../globaldata/images/naevent3.jpeg";
import Naimg3 from "../../globaldata/images/naevent7.jpeg";


const NA_NAV_LINKS = [
  { label: "Home", path: "/northamerica" },
  { label: "About", path: "/na-about" },
  { label: "Events", path: "/na-events" },
  { label: "Speakers", path: "/na-speakers" },
  { label: "Gallery", path: "/na-gallery" },
  { label: "Contact", path: "/na-contact" },
];

function NaNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setMenuOpen((p) => !p);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {menuOpen && <div className="na-navbar__overlay" onClick={closeMenu} />}
      <nav className="na-navbar">
        <Link to="/" className="na-navbar__logo" onClick={closeMenu}>
          <img src={sgcLogo} alt="SGC Logo" className="na-navbar__logo-img" />
          <span className="na-navbar__logo-text">
            <span className="na-navbar__logo-title">NORTH AMERICA</span>
            <span className="na-navbar__logo-sub">SIGNATURE GLOBAL CONFERENCES</span>
          </span>
        </Link>
        <ul className={`na-navbar__links${menuOpen ? " open" : ""}`}>
          {NA_NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <Link to={path} className={location.pathname === path ? "active" : ""} onClick={closeMenu}>
                {label}
              </Link>
            </li>
          ))}
          <li className="na-navbar__cta-mobile">
            <Link to="/na-register" onClick={closeMenu}>Register Now →</Link>
          </li>
        </ul>
        <div className="na-navbar__cta-wrapper">
          <Link to="/na-register" className="na-navbar__cta">REGISTER NOW &nbsp;→</Link>
        </div>
        <button
          className={`na-navbar__hamburger${menuOpen ? " open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>
    </>
  );
}

function NaHero() {
  const imgRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) imgRef.current.style.transform = `translateY(${window.scrollY * 0.12}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="na-home-hero">
      <div className="na-home-hero__photo">
        <img ref={imgRef} src={heroBg} alt="North America skyline" className="na-home-hero__photo-img" />
      </div>
      <div className="na-home-hero__cream" />
      <div className="na-home-hero__green-strip" />
      <div className="na-home-hero__gold-line" />
      <div className="na-home-hero__dots" />
      <div className="na-home-hero__content">
        <div className="na-home-hero__tagline">
          <svg className="na-home-hero__tagline-icon" viewBox="0 0 22 14" fill="none">
            <path d="M1 13C1 13 3.5 9 3.5 6a7.5 7.5 0 0115 0c0 3-2.5 7-2.5 7"
              stroke="var(--na-gold)" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span>CONNECT. COLLABORATE. CREATE IMPACT.</span>
        </div>
        <h1 className="na-home-hero__heading">
          <span>NORTH AMERICA</span>
          <span>SIGNATURE GLOBAL</span>
          <span>CONFERENCES</span>
        </h1>
        <div className="na-home-hero__rule" />
        <p className="na-home-hero__desc">
        “Your signature is your story—write it boldly on the world stage.”
        </p>
        <div className="na-home-hero__btns">
          <Link to="/na-events" className="na-btn na-btn--solid">
            <svg viewBox="0 0 18 18" fill="none" className="na-btn__icon">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.7"/>
              <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            EXPLORE CONFERENCES
          </Link>
          <Link to="/na-register" className="na-btn na-btn--outline">
            <svg viewBox="0 0 18 18" fill="none" className="na-btn__icon">
              <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.7"/>
              <path d="M2.5 16c0-3.038 2.91-5.5 6.5-5.5s6.5 2.462 6.5 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            BECOME A SPEAKER
          </Link>
        </div>
      </div>
      <div className="na-home-hero__bar">
        {[
          {
            icon: <><circle cx="12" cy="12" r="9" stroke="var(--na-gold)" strokeWidth="1.5"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="var(--na-gold)" strokeWidth="1.3"/></>,
            top: "GLOBAL PERSPECTIVES", bot: "LOCAL IMPACT",
          },
          {
            icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="var(--na-gold)" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="var(--na-gold)" strokeWidth="1.5"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="var(--na-gold)" strokeWidth="1.5" strokeLinecap="round"/></>,
            top: "LEADING MINDS", bot: "UNSTOPPABLE IDEAS",
          },
          {
            icon: <><circle cx="12" cy="12" r="9" stroke="var(--na-gold)" strokeWidth="1.5"/><path d="M8 12l3 3 5-5" stroke="var(--na-gold)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></>,
            top: "COLLABORATE TODAY", bot: "TRANSFORM TOMORROW",
          },
        ].map((item, i, arr) => (
          <React.Fragment key={i}>
            <div className="na-home-hero__bar-item">
              <svg viewBox="0 0 24 24" fill="none" className="na-home-hero__bar-icon">{item.icon}</svg>
              <div className="na-home-hero__bar-copy">
                <span className="na-home-hero__bar-top">{item.top}</span>
                <span className="na-home-hero__bar-bot">{item.bot}</span>
              </div>
            </div>
            {i < arr.length - 1 && <div className="na-home-hero__bar-sep" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}


const NA_FE_EVENTS = [
  { id: 1, title: "Empowering Her Signature Global Conference: Women Redefining Power", date: "March 22-23, 2027", place: "Toronto, Canada", image: Naimg },
  { id: 2, title: "Signature Elite Summit on AI, Business, and Leadership", date: "March 22-23, 2027", place: "Toronto, Canada", image: Naimg1 },
  { id: 3, title: "She Rises Within Signature Global Conference: From Vision to Legacy", date: "July 20–21, 2027", place: "Miami, Florida, USA", image: Naimg2 },
  { id: 4, title: "She Leads with Strength Signature Global Conference", date: "November 15–16, 2027", place: "Ontario, Canada", image: Naimg3 },
];

const CalendarIcon = () => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="na-fe__meta-svg">
    <rect x="2" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2 9h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M7 2v4M15 2v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="7.5" cy="14" r="1" fill="currentColor" />
    <circle cx="11" cy="14" r="1" fill="currentColor" />
    <circle cx="14.5" cy="14" r="1" fill="currentColor" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="na-fe__meta-svg">
    <path d="M11 2C7.686 2 5 4.686 5 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="11" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

function NaFutureEvents() {
  const gridRef = useRef(null);
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".na-fe__card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("na-fe__card--visible"); observer.unobserve(entry.target); }
      }),
      { threshold: 0.12 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  return (
    <section className="na-fe">
      <div className="na-fe__bg-green" aria-hidden="true" />
      <div className="na-fe__dots" aria-hidden="true" />
      <div className="na-fe__gold-diag" aria-hidden="true" />
      <div className="na-fe__container">
        <div className="na-fe__header">
          <div className="na-fe__header-left">
            <p className="na-fe__sub">UPCOMING CONFERENCES</p>
            <h2 className="na-fe__heading">FUTURE EVENTS<br />IN NORTH AMERICA</h2>
          </div>
          <div className="na-fe__header-right">
            <Link to="/na-events" className="na-fe__cta">VIEW ALL EVENTS &nbsp;→</Link>
          </div>
        </div>
        <div className="na-fe__grid" ref={gridRef}>
          {NA_FE_EVENTS.map((ev, index) => (
            <article
              className={`na-fe__card ${index < 2 ? "na-fe__card--from-left" : "na-fe__card--from-right"}`}
              key={ev.id}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="na-fe__card-img-wrap">
                <img src={ev.image} alt={ev.title} className="na-fe__card-img" />
                <div className="na-fe__card-img-overlay" />
              </div>
              <div className="na-fe__card-body">
                <h3 className="na-fe__card-title">{ev.title}</h3>
                <div className="na-fe__card-meta">
                  {[{ Icon: CalendarIcon, label: "DATE:", value: ev.date }, { Icon: PinIcon, label: "PLACE:", value: ev.place }].map(({ Icon, label, value }) => (
                    <div className="na-fe__meta-item" key={label}>
                      <Icon />
                      <div className="na-fe__meta-text">
                        <span className="na-fe__meta-label">{label}</span>
                        <span className="na-fe__meta-value">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


const WJU_ITEMS = [
  { id: 1, title: "Be Part of a Global Movement", desc: "Join a purpose-driven community of leaders who are shaping the future." },
  { id: 2, title: "Inspire Through Your Voice", desc: "Your story has power — share it, inspire others, and create change." },
  { id: 3, title: "Elevate Your Leadership", desc: "Step into your potential and grow beyond limitations." },
  { id: 4, title: "Build Meaningful Connections", desc: "Connect with individuals who value impact over competition." },
  { id: 5, title: "Create Lasting Impact", desc: "Leave a mark that goes beyond the stage." },
];

const IconPeople = () => (
  <svg viewBox="0 0 40 40" fill="none" className="na-wju-icon-svg">
    <circle cx="15" cy="13" r="5" stroke="currentColor" strokeWidth="2" />
    <path d="M5 34c0-5.523 4.477-10 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="27" cy="13" r="5" stroke="currentColor" strokeWidth="2" />
    <path d="M27 24c5.523 0 10 4.477 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 24c2.761 0 5 4.477 5 10M25 24c-2.761 0-5 4.477-5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconMic = () => (
  <svg viewBox="0 0 40 40" fill="none" className="na-wju-icon-svg">
    <rect x="14" y="5" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="2" />
    <path d="M8 20c0 6.627 5.373 12 12 12s12-5.373 12-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 32v5M16 37h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconChart = () => (
  <svg viewBox="0 0 40 40" fill="none" className="na-wju-icon-svg">
    <path d="M5 35h30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 28l8-10 7 5 10-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 9l5-1-1 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="8" y="28" width="5" height="7" rx="1" fill="currentColor" opacity="0.35" />
    <rect x="18" y="22" width="5" height="13" rx="1" fill="currentColor" opacity="0.35" />
    <rect x="28" y="16" width="5" height="19" rx="1" fill="currentColor" opacity="0.35" />
  </svg>
);
const IconNetwork = () => (
  <svg viewBox="0 0 40 40" fill="none" className="na-wju-icon-svg">
    <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="8" cy="10" r="3.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="32" cy="10" r="3.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="8" cy="30" r="3.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="32" cy="30" r="3.5" stroke="currentColor" strokeWidth="2" />
    <path d="M11 12l6 6M29 12l-6 6M11 28l6-6M29 28l-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 40 40" fill="none" className="na-wju-icon-svg">
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" />
    <path d="M6 20h28M20 6a20 20 0 010 28M20 6a20 20 0 000 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 12h22M9 28h22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ICONS = [IconPeople, IconMic, IconChart, IconNetwork, IconGlobe];

function WjuTimeline({ itemRefs }) {
  const svgRef = useRef(null);
  useEffect(() => {
    function draw() {
      const svg = svgRef.current;
      if (!svg) return;
      const svgRect = svg.getBoundingClientRect();
      const dots = itemRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - svgRect.left, y: r.top + r.height / 2 - svgRect.top };
      }).filter(Boolean);
      if (dots.length < 2) return;
      let d = `M ${dots[0].x} ${dots[0].y}`;
      for (let i = 0; i < dots.length - 1; i++) {
        const p0 = dots[i], p1 = dots[i + 1];
        const dy = (p1.y - p0.y) * 0.45;
        const side = i % 2 === 0 ? -18 : 18;
        d += ` C ${p0.x + side} ${p0.y + dy}, ${p1.x - side} ${p1.y - dy}, ${p1.x} ${p1.y}`;
      }
      svg.querySelector(".na-wju-tl-path").setAttribute("d", d);
      svg.querySelectorAll(".na-wju-tl-dot").forEach((dot, i) => {
        if (dots[i]) { dot.setAttribute("cx", dots[i].x); dot.setAttribute("cy", dots[i].y); }
      });
    }
    const timeout = setTimeout(draw, 80);
    window.addEventListener("resize", draw);
    return () => { clearTimeout(timeout); window.removeEventListener("resize", draw); };
  }, [itemRefs]);

  return (
    <svg ref={svgRef} className="na-wju-timeline-svg" aria-hidden="true">
      <path className="na-wju-tl-path" fill="none" stroke="#b8922f" strokeWidth="1.3" strokeDasharray="5 4" opacity="0.75" />
      {WJU_ITEMS.map((_, i) => <circle key={i} className="na-wju-tl-dot" r="5.5" fill="#b8922f" cx="0" cy="0" />)}
    </svg>
  );
}

function NaWhyJoinUs() {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".na-wju-anim") || [];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("na-wju-visible"); observer.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="na-wju" ref={sectionRef}>
      <div className="na-wju__bg-photo" aria-hidden="true" />
      <div className="na-wju__deco-ring" aria-hidden="true" />
      <div className="na-wju__deco-dots" aria-hidden="true" />
      <div className="na-wju__content">
        <div className="na-wju__left na-wju-anim na-wju-anim--left">
          <p className="na-wju__sub"><span className="na-wju__sub-bracket">{"{ }"}</span>WHY JOIN US</p>
          <h2 className="na-wju__heading">BE PART OF<br />SOMETHING<br />BIGGER</h2>
          <div className="na-wju__heading-rule" />
          <p className="na-wju__desc">Join a global community of purpose-driven leaders who are shaping a better future—together.</p>
          <div className="na-wju__dotgrid" aria-hidden="true" />
        </div>
        <div className="na-wju__items-wrap">
          <WjuTimeline itemRefs={itemRefs} />
          <div className="na-wju__items">
            {WJU_ITEMS.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <div key={item.id} className="na-wju__item na-wju-anim na-wju-anim--right" style={{ transitionDelay: `${i * 0.1}s` }}
                  ref={(el) => { if (el) itemRefs.current[i] = el.querySelector(".na-wju__item-icon"); }}>
                  <div className="na-wju__item-icon"><Icon /></div>
                  <div className="na-wju__item-body">
                    <h3 className="na-wju__item-title">{item.title}</h3>
                    <div className="na-wju__item-rule" />
                    <p className="na-wju__item-desc">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const speakers = [
  { id: 1, name: "Dr. Amara Osei", role: "Keynote Speaker", topic: "Future of AI Ethics", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop&crop=face" },
  { id: 2, name: "Marcus Lin", role: "Tech Visionary", topic: "Quantum Computing", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" },
  { id: 3, name: "Priya Sharma", role: "Policy Director", topic: "Digital Sovereignty", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face" },
  { id: 4, name: "James Okafor", role: "Innovation Lead", topic: "Green Tech", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face" },
  { id: 5, name: "Elena Vasquez", role: "Entrepreneur", topic: "Startup Ecosystems", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face" },
  { id: 6, name: "Ravi Menon", role: "Research Scientist", topic: "Neural Interfaces", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face" },
  { id: 7, name: "Zoe Andersen", role: "Creative Director", topic: "Design & Culture", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop&crop=face" },
  { id: 8, name: "Tomás Reyes", role: "Economist", topic: "Web3 Finance", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop&crop=face" },
];

const row1 = [...speakers, ...speakers];
const row2 = [...[...speakers].reverse(), ...[...speakers].reverse()];

function NASpeakerCard({ sp, index, isActive, onEnter, onLeave }) {
  const num = String(((index % speakers.length) + 1)).padStart(2, "0");
  return (
    <div className={`na-speaker-card${isActive ? " na-speaker-card--active" : ""}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <span className="na-speaker-card__index" aria-hidden="true">{num}</span>
      <div className="na-speaker-card__img-wrap">
        <img src={sp.img} alt={sp.name} className="na-speaker-card__img" draggable="false" />
        <div className="na-speaker-card__overlay" aria-hidden="true" />
        <div className="na-speaker-card__info">
          <span className="na-speaker-card__topic">{sp.topic}</span>
          <strong className="na-speaker-card__name">{sp.name}</strong>
          <span className="na-speaker-card__role">{sp.role}</span>
        </div>
      </div>
      <div className="na-speaker-card__bar" aria-hidden="true" />
    </div>
  );
}

function NASpeakers() {
  const [pausedRow, setPausedRow] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const handleEnter = (row, id) => { setPausedRow(row); setActiveId(id); };
  const handleLeave = () => { setPausedRow(null); setActiveId(null); };

  const renderTrack = (rowData, rowNum, dir) => (
    <div className="na-speakers__track-wrap">
      <div className="na-speakers__fade na-speakers__fade--left" aria-hidden="true" />
      <div className="na-speakers__fade na-speakers__fade--right" aria-hidden="true" />
      <div className={`na-speakers__rail na-speakers__rail--${dir}${pausedRow === rowNum ? " na-speakers__rail--paused" : ""}`}>
        {rowData.map((sp, i) => (
          <NASpeakerCard key={`r${rowNum}-${sp.id}-${i}`} sp={sp} index={i} isActive={activeId === sp.id}
            onEnter={() => handleEnter(rowNum, sp.id)} onLeave={handleLeave} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="na-speakers">
      <div className="na-speakers__inner">
        <div className="na-speakers__watermark" aria-hidden="true">SPEAKERS</div>
        <header className="na-speakers__header">
          <span className="na-speakers__eyebrow">Line-up</span>
          <h2 className="na-speakers__title">Speak<em className="na-speakers__title-em">ers</em></h2>
          <p className="na-speakers__sub">World-class minds.&nbsp; One stage.&nbsp; Unfiltered conversations.</p>
        </header>
        {renderTrack(row1, 1, "ltr")}
        <div className="na-speakers__divider" aria-hidden="true">
          <span className="na-speakers__divider-dot" />
          <span className="na-speakers__divider-line" />
          <span className="na-speakers__divider-dot" />
        </div>
        {renderTrack(row2, 2, "rtl")}
      </div>
    </section>
  );
}

const features = [
  { id: 1, title: "Memorable Moments", desc: "Capturing highlights that inspire and empower.", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>) },
  { id: 2, title: "Real Connections", desc: "Building relationships that go beyond borders.", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>) },
  { id: 3, title: "Global Impact", desc: "Driving conversations that create a better tomorrow.", icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>) },
];

const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=540&fit=crop", alt: "Conference keynote stage", cls: "na-gallery__photo--wide" },
  { id: 2, src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=700&fit=crop", alt: "Professionals networking", cls: "na-gallery__photo--portrait" },
  { id: 3, src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop", alt: "Speaker at podium", cls: "" },
  { id: 4, src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&h=400&fit=crop", alt: "Two people networking", cls: "" },
  { id: 5, src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop", alt: "Audience applauding", cls: "" },
];

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

function NAGallery() {
  return (
    <section className="na-gallery">
      <div className="na-gallery__dots" aria-hidden="true" />
      <div className="na-gallery__swirl" aria-hidden="true">
        <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 200 Q 60 160 30 100 Q 0 40 80 20" stroke="#1e3a2f" strokeWidth="1.2" strokeOpacity="0.18" fill="none" />
          <path d="M30 200 Q 90 155 55 95 Q 20 35 110 10" stroke="#b8952a" strokeWidth="1" strokeOpacity="0.22" fill="none" />
          <path d="M55 200 Q 120 150 85 90 Q 50 30 145 5" stroke="#1e3a2f" strokeWidth="0.8" strokeOpacity="0.12" fill="none" />
        </svg>
      </div>
      <div className="na-gallery__body">
        <div className="na-gallery__left">
          <p className="na-gallery__eyebrow">
            <span className="na-gallery__brace" aria-hidden="true">&#123; &#125;</span>
            Our Moments. Lasting Impact.
          </p>
          <h2 className="na-gallery__title">Gallery</h2>
          <div className="na-gallery__rule" aria-hidden="true" />
          <p className="na-gallery__desc">
            A glimpse into the powerful moments, meaningful connections, and inspiring experiences from our global conferences.
          </p>
          <ul className="na-gallery__features" role="list">
            {features.map((f) => (
              <li key={f.id} className="na-gallery__feature">
                <div className="na-gallery__feature-icon">{f.icon}</div>
                <div className="na-gallery__feature-body">
                  <strong className="na-gallery__feature-title">{f.title}</strong>
                  <span className="na-gallery__feature-desc">{f.desc}</span>
                </div>
              </li>
            ))}
          </ul>
          <button className="na-gallery__btn" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="na-gallery__btn-icon" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            View More Photos
          </button>
        </div>
        <div className="na-gallery__right">
          <div className="na-gallery__grid">
            {photos.map((p) => (
              <div key={p.id} className={`na-gallery__photo${p.cls ? ` ${p.cls}` : ""}`}>
                <img src={p.src} alt={p.alt} loading="lazy" />
                <div className="na-gallery__photo-overlay" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="na-gallery__quote">
        <div className="na-gallery__quote-content">
          <span className="na-gallery__quote-mark">&ldquo;</span>
          <p className="na-gallery__quote-text">
            Together we share ideas, build connections,<br className="na-gallery__br" />and create a future of impact.
          </p>
          <span className="na-gallery__quote-mark">&rdquo;</span>
        </div>
        <div className="na-gallery__quote-rule" aria-hidden="true">
          <span className="na-gallery__quote-line" />
          <span className="na-gallery__quote-globe"><GlobeIcon /></span>
          <span className="na-gallery__quote-line" />
        </div>
      </div>
    </section>
  );
}

export { NaNavbar };

export default function NaHome() {
  return (
    <div className="na-page">
      <NaNavbar />
      <NaHero />
      <NaFutureEvents />
      <NaWhyJoinUs />
      {/* <NASpeakers /> */}
      < TempHomeSpeakers/>
      {/* <NAGallery /> */}
      <TempHomeGallery/>

      <Footer theme="northamerica" />
    </div>
  );
}