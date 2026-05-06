import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import "./asia.css";
import HERO_IMAGE from "./ASIA_IMG.jpg";
import { getConferencesByRegion } from "../../globaldata/eventsglobaldata";
import Footer from "../../../Components/Footer/footer";
import { TempHomeGallery, TempHomeSpeakers } from "./TempHGS";

/* ─── DATA ──────────────────────────────────── */
const stats = [
  { id: 1, value: 12000, suffix: "+", label: "Attendees" },
  { id: 2, value: 85, suffix: "+", label: "Events Hosted" },
  { id: 3, value: 98, suffix: "%", label: "Satisfaction Rate" },
  { id: 4, value: 47, suffix: "+", label: "Countries" },
];

const whyJoinFeatures = [
  { id: 1, icon: "01", title: "Network with Global Leaders", description: "Connect face-to-face with CEOs, ministers, and thought leaders shaping the future of business and governance." },
  { id: 2, icon: "02", title: "Gain International Exposure", description: "Position yourself and your brand on an international stage, reaching audiences across 47+ countries." },
  { id: 3, icon: "03", title: "Speak on a Prestigious Stage", description: "Share your expertise and vision with thousands of high-impact attendees in an electrifying setting." },
  { id: 4, icon: "04", title: "Elevate Your Personal Brand", description: "Be featured in global media, executive publications, and across our network of 100K+ professionals." },
];

const speakers = [
  { id: 1, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80", name: "Dr. Arjun Mehta", country: "India", role: "Global Strategy Advisor" },
  { id: 2, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80", name: "Sarah Al-Rashidi", country: "UAE", role: "CEO, FuturePath Inc." },
  { id: 3, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80", name: "James O'Brien", country: "United Kingdom", role: "Keynote Speaker & Author" },
  { id: 4, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80", name: "Amara Nwosu", country: "Nigeria", role: "Policy & Innovation Leader" },
];

const highlights = [
  { id: 1, image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", size: "large" },
  { id: 2, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80", size: "small" },
  { id: 3, image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=500&q=80", size: "medium" },
  { id: 4, image: "https://images.unsplash.com/photo-1560523159-6b681a1e1852?w=500&q=80", size: "small" },
  { id: 5, image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80", size: "large" },
  { id: 6, image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80", size: "medium" },
  { id: 7, image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&q=80", size: "small" },
  { id: 8, image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=80", size: "medium" },
];

const pastConferences = [
  { id: 1, image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=80", title: "Global Visionaries Summit", date: "March 2024", location: "Paris, France" },
  { id: 2, image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=80", title: "Leaders of Tomorrow Forum", date: "July 2024", location: "Mumbai, India" },
  { id: 3, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80", title: "Signature CEO Roundtable", date: "October 2023", location: "New York, USA" },
  { id: 4, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80", title: "International Impact Conference", date: "January 2023", location: "Dubai, UAE" },
  { id: 5, image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80", title: "Women Who Lead Summit", date: "May 2023", location: "London, UK" },
  { id: 6, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80", title: "Innovation Nexus Conference", date: "September 2022", location: "Singapore" },
  { id: 7, image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&q=80", title: "Entrepreneurship World Forum", date: "November 2022", location: "Toronto, Canada" },
];

const philosophyLines = [
  "We don't just host events.", "We build leaders.", "We create impact.",
  "We shape global voices.", "Every stage is an opportunity.",
  "Every connection is meaningful.", "Every moment is transformational.",
];

const REGION = "asia";
const conferences = getConferencesByRegion(REGION);

/* ─── HOOKS ─────────────────────────────────── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  const start = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setCount(0);
    const startTime = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
  }, [target, duration]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);
  return [count, start];
}

/* ─── SHARED COMPONENTS ─────────────────────── */
function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("as-hp-visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div className="as-hp-fade-up" ref={ref}>{children}</div>;
}

function StatItem({ stat, triggerKey }) {
  const [count, start] = useCountUp(stat.value, 1800);
  const prevKey = useRef(0);

  useEffect(() => {
    if (triggerKey > 0 && triggerKey !== prevKey.current) {
      prevKey.current = triggerKey;
      start();
    }
  }, [triggerKey, start]);

  return (
    <div className="as-hp-stats__item">
      <div className="as-hp-stats__number">{count.toLocaleString()}{stat.suffix}</div>
      <div className="as-hp-stats__label">{stat.label}</div>
    </div>
  );
}

/* ─── NAVBAR ────────────────────────────────── */
/* ── Only the Navbar function needs to change.
   Copy-paste this to replace your existing Navbar()
   in Regions/ASIA/Home/asia.jsx                    */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sectionLinks = {
    Home:     "/asia",
    About:    "/aboutasgc",
    Events:   "/asiaevents",
    Speakers: "/asiaspeakers",
    Gallery:  "/asiagallery",
    Contact:  "/asiacontact",
  };
  const links = ["Home", "About", "Events", "Speakers", "Gallery", "Contact"];

  const normalizedPath = location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
  const isAsiaHome = normalizedPath === "/asia";

  useEffect(() => {
    document.documentElement.classList.add("as-route-active");
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });

    // Close menu on resize to desktop
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("as-route-active");
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav
        className={[
          "as-hp-navbar",
          !isAsiaHome ? "as-hp-navbar--solid" : "",
          scrolled ? "as-hp-navbar--scrolled" : "",
        ].filter(Boolean).join(" ")}
      >
        {/* Logo */}
        <div className="as-hp-navbar__logo" onClick={() => navigate("/")}>
          <span className="as-hp-navbar__logo-sig">SIGNATURE</span>
          <span className="as-hp-navbar__logo-sub">Conferences</span>
        </div>

        {/* Desktop links */}
        <ul className="as-hp-navbar__links">
          {links.map((l) => (
            <li key={l}>
              <Link to={sectionLinks[l]}>{l}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          className="as-hp-navbar__cta"
          onClick={() => navigate("/asiaregister")}
        >
          Register Now
        </button>

        {/* Hamburger (mobile only — shown via CSS) */}
        <button
          className={`as-hp-navbar__ham${menuOpen ? " as-hp-navbar__ham--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="as-hp-navbar__ham-line" />
          <span className="as-hp-navbar__ham-line" />
          <span className="as-hp-navbar__ham-line" />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`as-hp-mobile-menu${menuOpen ? " as-hp-mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {links.map((l) => (
          <span
            key={l}
            className="as-hp-mobile-menu__link"
            onClick={() => handleNav(sectionLinks[l])}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleNav(sectionLinks[l])}
          >
            {l}
          </span>
        ))}
        <button
          className="as-hp-mobile-menu__cta"
          onClick={() => handleNav("/asiaregister")}
        >
          Register Now
        </button>
      </div>
    </>
  );
}

/* ─── HERO ──────────────────────────────────── */
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="as-hp-hero" id="home">
      <div className="as-hp-hero__bg-texture" />
      <div className="as-hp-hero__glow" />
      <div className="as-hp-hero__glow as-hp-hero__glow--2" />
      <div className="as-hp-hero__content">
        <div className="as-hp-hero__left">
          <p className="as-hp-hero__eyebrow">World-Class Events Platform</p>
          <div className="as-hp-hero__heading">
            <span className="as-hp-hero__word as-hp-hero__word--1">ASIA</span>
            <span className="as-hp-hero__word as-hp-hero__word--2">SIGNATURE</span>
            <span className="as-hp-hero__word as-hp-hero__word--3">GLOBAL</span>
            <span className="as-hp-hero__word as-hp-hero__word--2">CONFERENCES</span>
          </div>
          <p className="as-hp-hero__subtitle">Where Leaders Rise and Impact Begins.</p>
          <div className="as-hp-hero__actions">
            <button className="as-hp-btn as-hp-btn--primary">Become a Speaker</button>
            <button className="as-hp-btn as-hp-btn--outline" onClick={() => navigate("/asiaregister")}>Register Now</button>
          </div>
          <p className="as-hp-hero__note">Limited Speaker Slots Available</p>
        </div>
        <div className="as-hp-hero__right">
          <div className="as-hp-hero__img-border" />
          <div className="as-hp-hero__img-frame">
            <img src={HERO_IMAGE} alt="Featured Speaker" />
            <div className="as-hp-hero__img-badge">
              <div className="as-hp-hero__img-badge-name">Global Leadership Platform</div>
              <div className="as-hp-hero__img-badge-role">Asia • Innovation • Influence • Impact</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STATS ───────────────────────────── */
function Stats() {
  const sectionRef = useRef(null);
  const [triggerKey, setTriggerKey] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggerKey((n) => n + 1);
          obs.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="as-hp-stats" ref={sectionRef}>
      <div className="as-hp-stats__inner">
        {stats.map((stat) => (
          <StatItem key={stat.id} stat={stat} triggerKey={triggerKey} />
        ))}
      </div>
    </div>
  );
}

/* ─── UPCOMING ──────────────────────────────── */
function Upcoming() {
  const navigate = useNavigate();
  return (
    <section className="as-hp-upcoming" id="events">
      <div className="as-hp-upcoming__inner">
        <FadeUp>
          <div className="as-hp-upcoming__header">
            <div className="as-hp-upcoming__header-left">
              <span className="as-hp-section-tag">
                <span className="as-hp-section-tag__dot" />
                Coming Up
              </span>
              <h2 className="as-hp-section-title">
                Upcoming <em>Conferences</em>
              </h2>
              <p className="as-hp-upcoming__subtitle">
                Join world-class gatherings that inspire, connect, and transform.
              </p>
            </div>
            <button
              className="as-hp-view-all-btn"
              onClick={() => navigate("/asiaevents")}
            >
              View All Events
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="as-hp-upcoming__grid">
            {conferences.slice(0, 4).map((ev, index) => (
              <div
                className="as-hp-event-card"
                key={ev.id}
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => navigate(`/asiaevents/${ev.id}`)}
              >
                {/* <div className="as-hp-event-card__badge">Upcoming</div> */}

                <div className="as-hp-event-card__img">
                  <img src={ev.image} alt={ev.title} loading="lazy" />
                  <div className="as-hp-event-card__img-overlay" />
                </div>

                <div className="as-hp-event-card__body">
                  <h3 className="as-hp-event-card__title">{ev.title}</h3>
                  <div className="as-hp-event-card__divider" />
                  <div className="as-hp-event-card__meta">
                    <span className="as-hp-event-card__date">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                        <path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                      {ev.date}
                    </span>
                    <span className="as-hp-event-card__loc">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1a5 5 0 015 5c0 3.5-5 9-5 9S3 9.5 3 6a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.4"/>
                        <circle cx="8" cy="6" r="1.8" stroke="currentColor" strokeWidth="1.4"/>
                      </svg>
                      {ev.location}
                    </span>
                  </div>
                  <button className="as-hp-event-card__cta">
                    Learn More
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── PHILOSOPHY ────────────────────────────── */
function Philosophy() {
  const doubled = [...philosophyLines, ...philosophyLines];
  return (
    <section className="as-hp-phil" id="philosophy">
      <div className="as-hp-phil__inner">
        <FadeUp>
          <div className="as-hp-phil__label">
            <span className="as-hp-phil__label-line" />
            <span className="as-hp-section-tag">Our Philosophy</span>
            <span className="as-hp-phil__label-line" />
          </div>
        </FadeUp>
        <div className="as-hp-phil__track-wrap">
          <div className="as-hp-phil__track">
            {doubled.map((text, i) => (
              <div key={i} className="as-hp-phil__pill as-hp-phil__pill--accent">
                <span className="as-hp-phil__pill-dot" />
                <span className="as-hp-phil__pill-text">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY JOIN ──────────────────────────────── */
function WhyJoin() {
  return (
    <section className="as-hp-why" id="about">
      <div className="as-hp-why__inner">
        <FadeUp>
          <div className="as-hp-why__header">
            <span className="as-hp-section-tag">The Signature Advantage</span>
            <h2 className="as-hp-section-title">Why Join Us</h2>
            <p className="as-hp-section-subtitle">Curated experiences that transform careers and organisations.</p>
          </div>
        </FadeUp>
        <div className="as-hp-why__grid">
          {whyJoinFeatures.map((f, i) => (
            <FadeUp key={f.id} delay={i * 80}>
              <div className="as-hp-feature-card">
                <span className="as-hp-feature-card__icon">{f.icon}</span>
                <h3 className="as-hp-feature-card__title">{f.title}</h3>
                <p className="as-hp-feature-card__desc">{f.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SPEAKERS ──────────────────────────────── */
function Speakers() {
  const navigate = useNavigate();
  return (
    <section className="as-hp-speakers" id="speakers">
      <div className="as-hp-speakers__inner">
        <FadeUp>
          <div className="as-hp-speakers__header">
            <span className="as-hp-section-tag">Thought Leaders</span>
            <h2 className="as-hp-section-title">Our Esteemed Speakers</h2>
            <p className="as-hp-section-subtitle">Industry icons, change-makers, and visionaries shaping the world.</p>
          </div>
        </FadeUp>
        <div className="as-hp-speakers__grid">
          {speakers.map((sp, i) => (
            <FadeUp key={sp.id} delay={i * 80}>
              <div className="as-hp-speaker-card">
                <div className="as-hp-speaker-card__img-wrap"><img src={sp.image} alt={sp.name} /></div>
                <h3 className="as-hp-speaker-card__name">{sp.name}</h3>
                <p className="as-hp-speaker-card__country">{sp.country}</p>
                <span className="as-hp-speaker-card__role">{sp.role}</span>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={200}>
          <div className="as-hp-speakers__actions">
            <button className="as-hp-btn as-hp-btn--outline" onClick={() => navigate("/asiaspeakers")}>View All Speakers</button>
            <button className="as-hp-btn as-hp-btn--primary" onClick={() => navigate("/asiaregister")}>Apply as Speaker</button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── HIGHLIGHTS ────────────────────────────── */
function Highlights() {
  return (
    <section className="as-hp-highlights" id="gallery">
      <div className="as-hp-highlights__inner">
        <FadeUp>
          <div className="as-hp-highlights__header">
            <span className="as-hp-section-tag">Conference Memories</span>
            <h2 className="as-hp-section-title">Conference Highlights</h2>
            <p className="as-hp-section-subtitle">Moments of connection, inspiration and transformation.</p>
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="as-hp-highlights__grid">
            {highlights.map((h) => (
              <div key={h.id} className={`as-hp-highlight-item as-hp-highlight-item--${h.size}`}>
                <img src={h.image} alt="Conference highlight" />
                <div className="as-hp-highlight-item__overlay" />
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── PAST CONFERENCES ──────────────────────── */
function PastConferences() {
  const doubled = [...pastConferences, ...pastConferences];
  return (
    <section className="as-hp-past">
      <FadeUp>
        <div className="as-hp-past__header">
          <span className="as-hp-section-tag">Our Legacy</span>
          <h2 className="as-hp-section-title">Past Conferences</h2>
          <p className="as-hp-section-subtitle">A decade of transformative global events.</p>
        </div>
      </FadeUp>
      <div className="as-hp-past__track-wrap">
        <div className="as-hp-past__track">
          {doubled.map((conf, idx) => (
            <div className="as-hp-past-card" key={`${conf.id}-${idx}`}>
              <div className="as-hp-past-card__img"><img src={conf.image} alt={conf.title} /></div>
              <div className="as-hp-past-card__body">
                <h3 className="as-hp-past-card__title">{conf.title}</h3>
                <div className="as-hp-past-card__meta">
                  <span>{conf.date}</span><span>|</span><span>{conf.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA BANNER ────────────────────────────── */
function CTABanner() {
  const navigate = useNavigate();
  return (
    <section className="as-hp-cta-banner">
      <div className="as-hp-cta-banner__glow" />
      <div className="as-hp-cta-banner__inner">
        <FadeUp>
          <span className="as-hp-section-tag">Take the Stage</span>
          <h2 className="as-hp-cta-banner__title">Ready to Make Your Mark on the World?</h2>
          <p className="as-hp-cta-banner__sub">Join thousands of leaders who have transformed their careers at Signature Conferences.</p>
          <div className="as-hp-cta-banner__actions">
            <button className="as-hp-btn as-hp-btn--primary as-hp-btn--lg" onClick={() => navigate("/asiaregister")}>Register Now</button>
            <button className="as-hp-btn as-hp-btn--outline as-hp-btn--lg">Become a Speaker</button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── ROOT ──────────────────────────────────── */
export default function Homepage() {
  return (
    // ✅ KEY CHANGE: Scoped root class
    <div className="as-page">
      <Navbar />
      <Hero />
      <Stats />
      <div className="as-hp-divider" />
      <Upcoming />
      <div className="as-hp-divider" />
      <Philosophy />
      <div className="as-hp-divider" />
      <WhyJoin />
      <div className="as-hp-divider" />
      {/* <Speakers /> */}
      < TempHomeSpeakers/>
      <div className="as-hp-divider" />
      <TempHomeGallery/>
      {/* <Highlights /> */}
      {/* <PastConferences /> */}
      <CTABanner />
      <Footer theme="asia" />
    </div>
  );
}