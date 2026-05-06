import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import videoSrc from "./herovideo.mp4";
import teamPhoto from "./image.png";
import image1 from "./newimg.jpg";
import image2 from "./newimg1.jpg";

/* ─── REGION DATA ───────────────────────────────── */
const regions = [
  { title: "Asia", sub: "Signature Global Conferences", desc: "Where ancient wisdom meets tomorrow's innovation across the world's most dynamic continent.", 
    stat: "42+ Events", cls: "main-card-asia", route: "/asia" },
  { title: "Europe", sub: "Signature Global Conferences", desc: "Bridging heritage and progress at the crossroads of culture, policy, and emerging technology.",  
    stat: "38+ Events",  cls: "main-card-europe", route: "/europe" },
  { title: "North America", sub: "Signature Global Conferences", desc: "Driving bold conversations that define the future of business, innovation, and leadership.",       
    stat: "61+ Events",  cls: "main-card-namerica", route: "/northamerica"},
  { title: "USA", sub: "Signature Global Conferences", esc: "At the epicenter of global influence — where every summit shapes industries and reshapes agendas.", 
    stat: "55+ Events",  cls: "main-card-usa", route: "/usa" },
];

const regionData = [
  { id: "asia", name: "Asia", trips: "1,527 trips", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80", imageAlt: "Taj Mahal, India", caption: "Best Time to Visit Asia", captionDesc: "Asia offers unparalleled diversity — from ancient temples and bustling megacities to pristine beaches and mountain landscapes. Every season brings a new adventure.", countries: [["Tokyo", "Japan", "Dubai", "UAE"], ["Australia", "Melbourne",]] },
  { id: "europe", name: "Europe", trips: "2,184 trips", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&q=80", imageAlt: "Paris, Europe", caption: "Discover European Heritage", captionDesc: "Europe's rich tapestry of cultures, architecture, and landscapes spans thousands of years of history. From Paris boulevards to Greek islands, every destination tells a story.", countries: [["Germany", "Berlin", "Europe", "Rome"], ["Italy", "France", "Paris"]] },
  { id: "namerica", name: "North America", trips: "986 trips", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&q=80", imageAlt: "New York, North America", caption: "Explore North America", captionDesc: "From the Rocky Mountains to tropical coastlines, North America's sheer scale and variety make it a destination unlike any other. Iconic cities meet breathtaking wilderness.", countries: [["Canada", "Ontario", "Toronto", "Miami"], ["USA"]] },
  { id: "usa", name: "USA", trips: "3,412 trips", image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=900&q=80", imageAlt: "New York City, USA", caption: "America's Most Iconic Destinations", captionDesc: "The United States packs extraordinary diversity into one nation — from the skyscrapers of Manhattan to the red canyons of Utah and the sun-drenched beaches of Miami.", countries: [["New York", "California", "USA", " Los Angeles"], ["San Francisco", "Texas"]] },
];

/* ─── ICONS ─────────────────────────────────────── */
const GlobeIcon = () => ( 
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"> 
    <circle cx="12" cy="12" r="10"/>  
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>  
  </svg> 
);

const ArrowIcon = () => ( 
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">  
    <path d="M3 8h10M9 4l4 4-4 4"/>  
  </svg> 
);

const CheckIcon = () => (  
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"> 
    <path d="M4 10l4.5 4.5L16 6"/>  
  </svg> 
);

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="8" y1="2" x2="8" y2="14" />
    <line x1="2" y1="8" x2="14" y2="8" />
  </svg>
);

const MinusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="2" y1="8" x2="14" y2="8" />
  </svg>
);

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

/* ─── MAIN COMPONENT ────────────────────────────── */
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [activeId, setActiveId] = useState("asia");
  const active = regionData.find((r) => r.id === activeId);

  const regionsSectionRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.querySelector('.main-page');
    if (!root) return;
    
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("main-visible")),
      { threshold: 0.08 }
    );
    root.querySelectorAll(".main-observe").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ─── NAVIGATION HANDLERS ─────────────────────── */
  const scrollToRegions = () => { regionsSectionRef.current?.scrollIntoView({  behavior: "smooth", block: "start" }); };
  const goToAbout = () => { navigate("/about"); };
  const goToRegister = () => {navigate("/register");};
  const goToRegion = (route) => { navigate(route); };

  /* ─── FEATURES DATA ───────────────────────────── */
  const features = [
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>  <circle cx="9" cy="7" r="4"/> <path d="M23 21v-2a4 4 0 0 0-3-3.87"/> <path d="M16 3.13a4 4 0 0 1 0 7.75"/>  </svg>, 
      title: "Executive Networking",desc: "Build meaningful relationships with executives, founders, professionals, and global decision-makers in one powerful space.", link: "Explore Networking"  },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M12 20h9"/> <path d="M12 4c0 0 1.5 2 4 2s4-2 4-2v6c0 3.5-2.5 6-4 7-1.5-1-4-3.5-4-7V4z"/> <path d="M3 10h4M5 8v4"/> <circle cx="5" cy="18" r="3"/> </svg>, 
      title: "World-Class Speakers", desc: "Gain insights from renowned keynote speakers, innovators, authors, and leaders shaping tomorrow’s world.", link: "Meet Our Speakers"  },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z"/> <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/> <path d="M9 12.5l1.5 4.5 1.5-3 1.5 3 1.5-4.5"/> </svg>, 
      title: "Women Leadership Growth", desc: "Empower women to lead with confidence, vision, and impact through mentorship, leadership sessions, and success strategies.",  link: "Explore Leadership" },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/> <circle cx="12" cy="12" r="4"/> </svg>, 
      title: "Innovation & Success", desc: "Explore future trends, business innovation, entrepreneurship, and strategies for sustainable growth in a changing world.", link: "Discover Innovation" },
  ];

  /* ─── RENDER ──────────────────────────────────── */
  return (
    <div className="main-page">


      {/* ══ HERO ══ */}
      <section className="main-hero">
        <div className="main-hero-video-wrap">
          <video className="main-hero-video" autoPlay loop muted playsInline disablePictureInPicture>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
        <div className="main-hero-overlay" />
        <div className="main-noise-layer" />

        <div className="main-hero-content">
          <h1 className="main-anim main-d1"> Signature Global<br /> Conferences </h1>
          <div className="main-gold-bar main-anim main-d2" />
          <p className="main-hero-para main-anim main-d2"> Connect with industry leaders and visionaries at world-class events
            shaping the future of business, technology, and innovation. </p>
          <div className="main-hero-btns main-anim main-d3">
            <button className="main-btn main-btn-gold" onClick={scrollToRegions}> Explore Conferences  </button>
            <button className="main-btn main-btn-ghost" onClick={goToAbout}> Learn More </button>
          </div>
        </div>
      </section>

      

      {/* ══ REGIONS ══ */}
      <section className="main-regions" ref={regionsSectionRef}>
        <div className="main-container">
          <div className="main-section-head main-observe">
            <span className="main-eyebrow-row">
              <span className="main-eline" />
              Global Footprint
              <span className="main-eline" />
            </span>
            <h2 className="main-sec-title">  Explore <span className="main-outline-gold">SGC</span> Regions </h2>
            <p className="main-sec-sub">Attend the regions based conferences</p>
          </div>

          <div className="main-cards-grid">
            {regions.map((r, i) => (
              <article  className={`main-card ${r.cls} main-observe`}  key={r.title}  style={{ "--i": i }} >
  
                <span className="main-card-dot" />
                <div className="main-card-body"> <h3>{r.title}</h3>  </div>
                <div className="main-card-footer">
                  <button className="main-card-btn" onClick={() => goToRegion(r.route)}  > Explore <ArrowIcon /> </button>
                  <span className="main-card-more">More Information</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section className="main-about">
        <div className="main-sec-glow main-gold-glow-right" />
        <div className="main-container main-about-inner">

          <div className="main-about-text-col main-observe main-slide-right">
            <span className="main-eyebrow-row main-left-align">
              <span className="main-eline" /> Who We Are <span className="main-eline" />
            </span>
            <h2 className="main-sec-title main-left-align">  About <span className="main-outline-gold">Us</span> </h2>
            <p className="main-about-lead">
              Result: your trusted global platform for impactful conferences! We proudly create events that bring together visionary speakers, leaders, entrepreneurs, and innovators from around the world.
            </p>
            <p className="main-about-body">
              Signature Global Conferences (SGC) organizes region-based international conferences that connect people, ideas, and opportunities on one stage. We believe every event creates valuable partnerships and fresh perspectives.
              <br/>
              Our team is dedicated to delivering exceptional conferences with seamless planning, engaging speakers, and professional execution. Your growth, visibility, and connections are our priority.
              We empower voices that inspire change and create lasting impact. Every conference is designed to build knowledge, collaboration, and success.
            </p>

            <ul className="main-check-list">
              {["Inspiring women & men speakers worldwide","Business, leadership & innovation topics","Region-based networking opportunities","Trusted by global communities"].map(t => (
                <li key={t}>
                  <span className="main-chk"><CheckIcon /></span>
                  {t}
                </li>
              ))}
            </ul>

            <button className="main-btn main-btn-gold" onClick={goToAbout}> Learn More <ArrowIcon /> </button>
          </div>

          <div className="main-about-img-col main-observe main-slide-left">
            <div className="main-about-img-frame">
              <img src={teamPhoto} alt="Our Team" />
            </div>
            <div className="main-corner-accent main-tl" />
            <div className="main-corner-accent main-br" />
          </div>

        </div>
      </section>

      {/* ══ FEATURES SECTION ══ */}
      <section className="main-fs-section">
        <div className="main-fs-container">
          <div className="main-fs-header">
            <h2 className="main-fs-title">Bringing Visionaries Together</h2>
            <p className="main-fs-sub">Bringing people under one roof to network, learn, and grow through world-class conferences.</p>
          </div>
          <div className="main-fs-grid">
            <div className="main-fs-img-card main-fs-img-large">
              <img src={image1} alt="Smart living room" />
              <div className="main-fs-img-overlay" />
            </div>
            {features.slice(0,2).map((f,i) => (
              <div key={i} className="main-fs-feat-card">
                <div className="main-fs-icon">{f.icon}</div>
                <h3 className="main-fs-feat-title">{f.title}</h3>
                <p className="main-fs-feat-desc">{f.desc}</p>
                <a className="main-fs-link" href="#">{f.link} →</a>
              </div>
            ))}
            {features.slice(2,4).map((f,i) => (
              <div key={i+2} className="main-fs-feat-card">
                <div className="main-fs-icon">{f.icon}</div>
                <h3 className="main-fs-feat-title">{f.title}</h3>
                <p className="main-fs-feat-desc">{f.desc}</p>
                <a className="main-fs-link" href="#">{f.link} →</a>
              </div>
            ))}
            <div className="main-fs-img-card main-fs-img-right">
              <img src={image2} alt="Smart thermostat" />
              <div className="main-fs-img-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ REGIONS ACCORDION ══ */}
      <section className="main-re-section">
        <div className="main-re-container">
          <div className="main-re-header">
            <h2 className="main-re-title">REGIONS TO EXPLORE</h2>
          </div>
          <div className="main-re-body">
            <div className="main-re-image-panel">
              <div className="main-re-image-wrap">
                <img key={active.id} src={active.image} alt={active.imageAlt} className="main-re-img" />
                <div className="main-re-img-overlay" />
                <div className="main-re-img-caption">
                  <span className="main-re-caption-icon"><ImageIcon /></span>
                  <div>
                    <strong>{active.caption}</strong>
                    <p>{active.captionDesc}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-re-accordion">
              {regionData.map((r) => { 
                const isOpen = r.id === activeId; 
                return (
                  <div key={r.id} className={`main-re-item${isOpen ? " main-re-item--open" : ""}`}>
                    <button className="main-re-item-header" onClick={() => setActiveId(r.id)}>
                      <div className="main-re-item-left">
                        <span className="main-re-item-name">{r.name}</span>
                        <span className="main-re-item-trips">{r.trips}</span>
                      </div>
                      <span className="main-re-item-toggle">
                        {isOpen ? <MinusIcon /> : <PlusIcon />}
                      </span>
                    </button>
                    <div className="main-re-item-body">
                      <div className="main-re-countries">
                        {r.countries.map((row, ri) => 
                          row.map((c, ci) => (
                            <span key={`${ri}-${ci}`} className="main-re-country">{c}</span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ); 
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="main-cta-banner">
        <div className="main-container">
          <div className="main-observe">
            <span className="main-eyebrow-row" style={{ justifyContent: "center" }}>
              <span className="main-eline" /> Don't Miss Out  <span className="main-eline" />
            </span>
            <h2 className="main-sec-title"> Reserve Your <span className="main-outline-gold">Seat</span> Today  </h2>
            <p> Join thousands of global leaders at our upcoming conferences. <br />Early bird registrations now open.</p>
            <div className="main-cta-btns">
              <button className="main-btn main-btn-gold" onClick={goToRegister}> Register Now <ArrowIcon /> </button>
              <button className="main-btn main-btn-ghost">View Schedule</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}