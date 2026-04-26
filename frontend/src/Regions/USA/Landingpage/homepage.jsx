import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./homepage.css";
import Footer from "../../../Components/Footer/footer";
import statue from "./statue.png";
import whyJoinUs from "./whyjoinus4.png";
import sgcLogo from "../globaldata/sgc_logo.jpeg";

const NAV_LINKS = [
  { label: "Home", to: "/usa" },
  { label: "Events", to: "/usa-events" },
  { label: "Speakers", to: "/usa-speakers" },
  { label: "Gallery", to: "/usa-gallery" },
  { label: "About", to: "/usa-about" },
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
  {
    id: 1,
    title: "Global Women Leadership & Mental Resilience Signature Conference",
    date: "August 08-09, 2026",
    location: "Paris, France",
    category: "Women Leadership",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Future Technology & Innovation Summit",
    date: "September 15-16, 2026",
    location: "New York, USA",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Global Business Leadership & Strategy Forum",
    date: "October 10-11, 2026",
    location: "London, UK",
    category: "Business",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "International Health & Wellness Conference",
    date: "November 20-21, 2026",
    location: "Dubai, UAE",
    category: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop",
  },
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
                  <span className="usa-event-card__category">{event.category}</span>
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

const WhyJoinUs = () => {
  return (
    <section className="usa-why-join-section">
      <div className="usa-why-join-header">
        <span className="usa-why-join-label">Why Choose Us</span>
        <h2 className="usa-why-join-title">WHY JOIN US</h2>
      </div>
      <div className="usa-why-join-backdrop">
        <img src={whyJoinUs} alt="Why Join Us" className="usa-why-join-image" />
      </div>
    </section>
  );
};

const SPEAKERS = [
  { id: 1, name: "Dr. Sarah Mitchell", title: "CEO, FutureMind Institute", topic: "Women Leadership", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" },
  { id: 2, name: "James Okonkwo", title: "Global Innovation Director, TechVision", topic: "Technology", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80" },
  { id: 3, name: "Dr. Aisha Patel", title: "Founder, Wellness Horizons", topic: "Health & Wellness", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=80" },
  { id: 4, name: "Marcus Lehmann", title: "Managing Partner, Apex Capital", topic: "Business", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" },
  { id: 5, name: "Priya Nair", title: "Deputy Secretary-General, UN Women", topic: "Women Leadership", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80" },
  { id: 6, name: "Dr. Leon Hartfield", title: "Head of AI Research, DeepLogic", topic: "Technology", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80" },
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
                  <div className="usa-speaker-card__overlay">
                    <h3 className="usa-speaker-card__name">{speaker.name}</h3>
                    <p className="usa-speaker-card__title">{speaker.title}</p>
                  </div>
                </div>
                <div className="usa-speaker-card__tags">
                  <span className="usa-speaker-card__topic">{speaker.topic}</span>
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
      <EsteeemedSpeakers />
      <GallerySection />
      <Footer theme="usa" />
    </div>
  );
}