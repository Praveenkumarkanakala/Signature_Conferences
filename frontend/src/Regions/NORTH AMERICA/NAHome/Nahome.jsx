import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "./Nahome.css";
import logo from "./SGC Logo.png";
import heroImg from "../Images/heroimg.jpg";
import aboutImg from "../Images/image.png";
import Mainimg from "../Images/imageregion.jpeg";
import Mapimg1 from "../Images/toronto.jpg";
import Mapimg2 from "../Images/ontario.jpg";
import Mapimg3 from "../Images/miami.jpg";
import Mapimg from "../Images/NAmap.jpg";
import Footer from "../../../Components/Footer/footer";

const NAV_ITEMS = [
  { label: "Home", path: "/northamerica" },
  { label: "About", path: "/na-about" },
  { label: "Events", path: "/na-events" },
  { label: "Speakers", path: "/na-speakers" },
  { label: "Gallery", path: "/na-gallery" },
  { label: "Contact", path: "/na-contact" },
];

/* ─── NAVBAR ─────────── */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="na-navbar">
      <div className="na-nav-container">
        <div className="na-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="SGC Logo" className="na-logo-img" />
            <span className="na-logo-text">
              <span className="na-logo-line1">North America</span>
              <span className="na-logo-line2">Signature Global Conferences</span>
            </span>
          </Link>
        </div>

        <button className="na-mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>
          <span className={`na-hamburger ${mobileMenuOpen ? 'na-open' : ''}`}>
            <span></span><span></span><span></span>
          </span>
        </button>

        <ul className={`na-nav-links ${mobileMenuOpen ? 'na-mobile-active' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) => isActive ? "na-nav-link na-active" : "na-nav-link"}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="na-mobile-cta-wrapper">
            <Link to="/na-register" className="na-nav-cta na-mobile-cta" onClick={closeMenu}>
              Register Now
            </Link>
          </li>
        </ul>

        <Link to="/na-register" className="na-nav-cta na-desktop-cta">
          Register Now
        </Link>
      </div>
    </nav>
  );
}

/* ─── MAIN HOME COMPONENT ─────────── */
const NorthAmericaHome = () => {
  const refs = {
    heroLeft: useRef(null),
    heroRight: useRef(null),
    stats: useRef(null),
    about: useRef(null),
  };

  useEffect(() => {
    document.querySelectorAll('.na-fade-left, .na-fade-right, .na-fade-up').forEach(el => {
      el.classList.add('na-visible');
    });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("na-visible")),
      { threshold: 0.05 }
    );

    Object.values(refs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const statsData = [
    { val: "15+", label: "Countries Reached" },
    { val: "2000+", label: "Attendees Worldwide" },
    { val: "200+", label: "International Speakers" },
  ];

  const features = ["World-Class Speakers", "Global Networking", "Innovation Hub"];
  const navigate = useNavigate();

  return (
    <div className="na-page">
      <Navbar />

      {/* ── HERO ─ */}
      <section className="na-hero">
        <div className="na-hero-bg-overlay" />
        {["na-blob1", "na-blob2", "na-blob3"].map(blob => <div key={blob} className={`na-blob ${blob}`} />)}

        <div className="na-hero-wrapper">
          <div className="na-hero-left na-fade-left" ref={refs.heroLeft}>
            <h1 className="na-animated-heading">
              <span className="na-heading-line na-line-1">North America</span>
              <span className="na-heading-line na-line-2 na-highlight">Signature Global <br /> Conferences</span>
              <span className="na-heading-line na-line-3"><span className="na-decorative-line" /></span>
            </h1>
            <p>Connecting innovators, leaders, and visionaries through world-class conferences and networking experiences.</p>
            <div className="na-hero-buttons">
              <Link to="/na-events"> <button className="na-primary-btn">Explore Events</button> </Link>
              <Link to="/na-register"> <button className="na-secondary-btn">Become Speaker</button> </Link>
            </div>
          </div>

          <div className="na-hero-right na-fade-right" ref={refs.heroRight}>
            <div className="na-image-frame">
              <img src={heroImg} alt="hero" />
              <div className="na-image-glow" />
            </div>
          </div>
        </div>

        <div className="na-hero-stats-container">
          <div className="na-stats na-fade-up" ref={refs.stats}>
            {statsData.map((stat, i) => (
              <React.Fragment key={i}>
                <div className="na-stat-box">
                  <h2>{stat.val}</h2>
                  <p>{stat.label}</p>
                </div>
                {i < statsData.length - 1 && <div className="na-stat-divider" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="na-about na-visible" ref={refs.about}>
        <div className="na-about-wrapper">
          <div className="na-about-left na-fade-left na-visible">
            <div className="na-about-image-frame">
              <img src={Mapimg} alt="About SGC" />
              <div className="na-about-image-glow" />
              <div className="na-experience-badge">
                <span className="na-badge-number">15+</span>
                <span className="na-badge-text">Years Excellence</span>
              </div>
            </div>
          </div>

          <div className="na-about-right na-fade-right na-visible">
            <span className="na-about-label"><span className="na-label-icon">✦</span> About Us</span>
            <h2 className="na-about-title">North America <span className="na-about-highlight">Signature Global</span></h2>
            <p className="na-about-text">We are the premier destination for transformative conferences that bring together the brightest minds, industry leaders, and innovative thinkers from across North America and beyond.</p>
            <p className="na-about-text">Our mission is to create world-class networking experiences that foster collaboration, spark innovation, and drive meaningful connections that last long after the event ends.</p>
            <div className="na-about-features">
              {features.map((feature, i) => (
                <div key={i} className="na-feature-item">
                  <span className="na-feature-icon">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
             <Link to="/na-about"><button className="na-about-cta">Learn More</button></Link>
          </div>
        </div>
      </section>

      {/* ── NEWS / EXPLORE ── */}
      <section className="na-news">
        <h2 className="na-section-title">Explore North America</h2>
        <div className="na-news-wrapper">
          <div className="na-news-featured">
            <img src={Mainimg} alt="featured" />
            <div className="na-news-overlay">
              <span className="na-news-category">Now Live</span>
              <h3>Experience World-Class Conferences &amp; Networking Opportunities</h3>
            </div>
          </div>
          <div className="na-news-list">
            {[
              { cat: "Toronto, Canada", location: "toronto", title: "Bringing together global leaders to share ideas, insights, and opportunities for growth", img: Mapimg1 },
              { cat: "Ontario, Canada", location: "ontario", title: "A platform to connect, collaborate, and explore new possibilities across industries", img: Mapimg2 },
              { cat: "Miami, USA",      location: "miami",   title: "Empowering professionals through meaningful discussions and valuable networking experiences", img: Mapimg3 },
            ].map((item, i) => (
              <div
                key={i}
                className="na-news-item"
                onClick={() => navigate(`/na-events?location=${item.location}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/na-events?location=${item.location}`)}
              >
                <img src={item.img} alt={item.cat} />
                <div className="na-news-content">
                  <span className="na-news-cat-small">{item.cat}</span>
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
            <button className="na-news-all" onClick={() => navigate("/na-events")}>
              See What's Happening
            </button>
          </div>
        </div>
      </section>

      {/* ── SPEAKERS ── */}
      <section className="na-speakers">
        <h2 className="na-speakers-title">Our Esteemed Speakers</h2>
        <div className="na-speakers-track">
          {[...Array(2)].map((_, dupIndex) => (
            <div key={dupIndex} className="na-speakers-scroll">
              {[1, 2, 3, 4, 5, 6].map((speaker) => (
                <div key={speaker} className="na-speaker-card">
                  <div className="na-speaker-image">
                    <img src={aboutImg} alt={`Speaker ${speaker}`} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="na-zigzag-steps">
        <h2 className="na-zigzag-title">How It Works</h2>
        <div className="na-zigzag-container">
          {[
            { num: "01", icon: "📝", title: "Submission", desc: "Submission of headshot, short bio less than 300 words along with catchy talk title I.e Title of the Talk." },
            { num: "02", icon: "🎯", title: "Registration", desc: "Registration step to confirm your Keynote speaker slot in the agenda based on your convenience I.e Morning or Afternoon slot and Date of your preference." },
            { num: "03", icon: "📄", title: "Abstract", desc: "Submission of 1 page Abstract with clear Aim, Methodology or Strategies involved, Results and Conclusion." },
          ].map((step, i) => (
            <div key={i} className="na-zigzag-step">
              <div className="na-step-card">
                <span className="na-step-tag">STEP {step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              <div className="na-step-icon-circle">
                <span className="na-step-icon">{step.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="na-gallery-section">
        <div className="na-gallery-header">
          <h2>Our Gallery</h2>
          <p>Moments captured across North America</p>
        </div>
        <div className="na-gallery-mosaic">
          <div className="na-gallery-col-left">
            {[1, 2].map(i => <div key={i} className="na-gallery-item"><img src={aboutImg} alt={`Moment ${i}`} /></div>)}
          </div>
          <div className="na-gallery-col-center">
            <div className="na-gallery-item na-large"><img src={aboutImg} alt="Main Event" /></div>
          </div>
          <div className="na-gallery-col-right">
            <div className="na-gallery-item"><img src={aboutImg} alt="Moment 3" /></div>
            <div className="na-gallery-text-card">
              <h4>Project Name 3</h4>
              <p>Connecting innovators, leaders, and visionaries through world-class conferences and networking experiences.</p>
              <span className="na-text-link">Read More →</span>
            </div>
          </div>
        </div>
      </section>

      <Footer theme="northamerica" />
    </div>
  );
};

export default NorthAmericaHome;