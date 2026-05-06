import React, { useEffect, useRef, useCallback, useState } from "react";
import { Navbar } from "../Home/asia.jsx";
import Footer from "../../../Components/Footer/footer";
import { arcPhotos, bentoItems } from "./gallerydata.js";
import { TempGallery } from "./TempGallery.jsx";
import "./gallery.css";

const VISIBLE_SLOTS = 8;
const ARC_SPAN_DEG = 160; 
const SPEED_DEG_PER_S = 6;
const FADE_DEG = 16;

function GalleryArc() {
  const stageRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const vw = window.innerWidth;
    const radius = Math.min(Math.max(vw * 0.54, 300), 540);
    const cardW = Math.min(Math.max(vw * 0.1, 88), 130);
    const cardH = cardW * 1.38;

    const belowAmount = radius * 0.18;
    const stageHeight = radius - belowAmount - cardH * 0.3;

    const cx = vw / 2;
    const cy = stageHeight + belowAmount;

    stage.style.height = `${stageHeight}px`;

    const arcMid = 90;
    const arcStart = arcMid - ARC_SPAN_DEG / 2;
    const arcEnd = arcMid + ARC_SPAN_DEG / 2;
    const slotStep = ARC_SPAN_DEG / (VISIBLE_SLOTS - 1);

    stage.innerHTML = "";
    const cards = [];
    const totalImages = arcPhotos.length;

    for (let i = 0; i < VISIBLE_SLOTS; i++) {
      const el = document.createElement("div");
      el.className = "as-gl-arc__card";
      el.style.width = `${cardW}px`;
      el.style.height = `${cardH}px`;

      const img = document.createElement("img");
      img.src = arcPhotos[i % totalImages].url;
      img.alt = arcPhotos[i % totalImages].alt;
      img.loading = "lazy";

      const sheen = document.createElement("div");
      sheen.className = "as-gl-arc__card-sheen";

      el.appendChild(img);
      el.appendChild(sheen);
      stage.appendChild(el);

      cards.push({
        el,
        img,
        angle: arcStart + i * slotStep,
        imgIndex: i % totalImages,
      });
    }

    let lastTime = null;
    let offset = 0;

    function frame(ts) {
      if (lastTime === null) lastTime = ts;
      const dt = (ts - lastTime) / 1000;
      lastTime = ts;
      offset += SPEED_DEG_PER_S * dt;

      for (const card of cards) {
        let angle = card.angle + offset;

        if (angle > arcEnd + slotStep * 0.5) {
          card.angle -= ARC_SPAN_DEG + slotStep;
          angle = card.angle + offset;
          card.imgIndex = (card.imgIndex + VISIBLE_SLOTS) % totalImages;
          card.img.src = arcPhotos[card.imgIndex].url;
          card.img.alt = arcPhotos[card.imgIndex].alt;
        }

        const rad = (angle * Math.PI) / 180;
        const xPos = cx + radius * Math.cos(rad) - cardW / 2;
        const yPos = cy - radius * Math.sin(rad) - cardH / 2;
        const rotateDeg = -(90 - angle);
        const edgeDist = Math.min(angle - arcStart, arcEnd - angle);
        const opacity = edgeDist < FADE_DEG ? Math.max(0, edgeDist / FADE_DEG) : 1;
        const distFromMid = Math.abs(angle - arcMid);
        const scale = 1 - (distFromMid / (ARC_SPAN_DEG / 2)) * 0.25;

        card.el.style.transform = `translate(${xPos}px,${yPos}px) rotate(${rotateDeg}deg) scale(${scale})`;
        card.el.style.opacity = opacity;
        card.el.style.zIndex = Math.round(scale * 10);
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div className="as-gl-arc-stage" ref={stageRef} aria-hidden="true" />;
}

function GalleryHero() {
  return (
    <section className="as-gl-hero">
      <GalleryArc />
      <div className="as-gl-hero__content">
        <span className="as-gl-hero__badge">Gallery 2026</span>
        <h1 className="as-gl-hero__title"> Moments That <br /> <span className="as-gl-hero__title-em">Move The World</span> </h1>
        <p className="as-gl-hero__sub">
          An intimate look at world-class conferences, inspiring panels, and the
          connections that spark lasting change.
        </p>
        <button className="as-gl-hero__cta">
          <span>Explore Gallery</span>
          <svg className="as-gl-hero__cta-arrow" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}

function BentoGrid() {
  return (
    <section className="as-gl-bento-section">
      <div className="as-gl-bento-section__inner">
        <div className="as-gl-bento-header">
          <span className="as-gl-bento-header__tag">Highlights</span>
          <h2 className="as-gl-bento-header__title">  Everything Your  <br /> Conference Needs </h2>
          <p className="as-gl-bento-header__sub">
            From electrifying keynotes to intimate workshops — captured in every
            frame.
          </p>
        </div>
        <div className="as-gl-bento">
          {bentoItems.map((item) =>
            item.type === "photo" ? (
              <PhotoCard key={item.id} item={item} />
            ) : (
              <TextCard key={item.id} item={item} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function PhotoCard({ item }) {
  return (
    <div className={`as-gl-bento__card as-gl-bento__card--photo as-gl-bento__card--${item.span}`}>
      <img src={item.url} alt={item.alt} loading="lazy" />
      <div className="as-gl-bento__photo-overlay">
        <h3 className="as-gl-bento__photo-title">{item.title}</h3>
        <p className="as-gl-bento__photo-sub">{item.subtitle}</p>
      </div>
    </div>
  );
}

function TextCard({ item }) {
  return (
    <div className={`as-gl-bento__card as-gl-bento__card--text as-gl-bento__card--${item.span}`} style={{ "--as-gl-card-accent": item.accent }}>
      <div className="as-gl-bento__text-body">
        <div className="as-gl-bento__text-dot" />
        <h3 className="as-gl-bento__text-title">{item.title}</h3>
        <p className="as-gl-bento__text-sub">{item.subtitle}</p>
      </div>
      <div className="as-gl-bento__text-decor" />
    </div>
  );
}

const slides = [
  { id: 1, src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=85", eyebrow: "Keynote Session", heading: ["World Leaders,", "One Stage"], meta: "March 14–16, 2025  ·  Dubai World Trade Centre", description: "Back-to-back keynotes from the world's most visionary thinkers — reshaping industries and inspiring the next generation of global leaders.", anim: "zoom", accent: "#d4a55a", },
  { id: 2, src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1100&q=85", eyebrow: "Opening Address", heading: ["A Vision", "for Tomorrow"], meta: "March 14, 2025  ·  Main Hall  ·  09:00 AM", description: "The conference opens with a powerful address setting the tone for three days of breakthrough conversations and transformative ideas.", anim: "slide-left", accent: "#b8845a", },
  { id: 3, src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1100&q=85", eyebrow: "Networking & Dining", heading: ["Ideas Meet", "Over Dinner"], meta: "Each Evening  ·  Sky Lounge, Level 12", description: "Curated dining experiences designed to spark conversations between delegates from 60+ countries — where the real deals happen.", anim: "slide-right", accent: "#c0724a", },
  { id: 4, src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1100&q=85", eyebrow: "The Venue", heading: ["Architecture", "of Ambition"], meta: "Dubai World Trade Centre  ·  Hall 7", description: "An iconic venue purpose-built for the world's most important conversations — 12,000 sq ft of immersive, state-of-the-art conference space.", anim: "slide-top", accent: "#d4a55a", },
  { id: 5, src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1100&q=85", eyebrow: "Panel Discussion", heading: ["Three Minds.", "One Truth."], meta: "March 15, 2025  ·  Panel Room B  ·  14:00 PM", description: "Industry pioneers clash and collaborate on stage — challenging assumptions and rewriting the rules of modern leadership and innovation.", anim: "slide-bottom", accent: "#b8845a", },
  { id: 6, src: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?auto=format&fit=crop&w=1100&q=85", eyebrow: "Live Audience", heading: ["5,000 Minds.", "One Movement."], meta: "March 14–16, 2025  ·  All Sessions", description: "Join a sold-out crowd of executives, founders, and policymakers united by a shared hunger to shape the future of our world.", anim: "rotate-fade", accent: "#c0724a", },
];

const INTERVAL = 5500;

function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [progress, setProgress] = useState(0);

  const advance = useCallback((index) => {
    setCurrent(index);
    setAnimKey((k) => k + 1);
    setProgress(0);
  }, []);

  useEffect(() => {
    const start = Date.now();
    let raf;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (elapsed >= INTERVAL) {
        advance((current + 1) % slides.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current, advance]);

  const goTo = (i) => { if (i === current) return; advance(i); };
  const slide = slides[current];

  return (
    <section className="as-gl-hs">
      <div className="as-gl-hs__grain" aria-hidden="true" />
      <div className="as-gl-hs__inner">
        <div className="as-gl-hs__text" key={`text-${animKey}`}>
          <span className="as-gl-hs__eyebrow">{slide.eyebrow}</span>
          <h1 className="as-gl-hs__heading" aria-label={slide.heading.join(" ")}>
            {slide.heading.map((line, i) => (
              <span key={i} className="as-gl-hs__heading-line" style={{ "--as-gl-line-delay": `${i * 80}ms` }}>{line}</span>
            ))}
          </h1>
          <p className="as-gl-hs__meta">{slide.meta}</p>
          <p className="as-gl-hs__desc">{slide.description}</p>
          <div className="as-gl-hs__nav">
            <div className="as-gl-hs__dots">
              {slides.map((_, i) => (
                <button key={i} className={`as-gl-hs__dot ${i === current ? "as-gl-hs__dot--active" : ""}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}>
                  {i === current && <span className="as-gl-hs__dot-fill" style={{ width: `${progress}%` }} />}
                </button>
              ))}
            </div>
            <span className="as-gl-hs__slide-num">{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>
        <div className="as-gl-hs__card-area">
          <div className="as-gl-hs__glow" aria-hidden="true" />
          <div className={`as-gl-hs__entrance as-gl-hs__entrance--${slide.anim}`} key={`entrance-${animKey}`}>
            <div className="as-gl-hs__float">
              <div className="as-gl-hs__card">
                <div className="as-gl-hs__card-img">
                  <img src={slide.src} alt={slide.eyebrow} loading="eager" draggable="false" />
                </div>
                <div className="as-gl-hs__sheen" aria-hidden="true" />
                <div className="as-gl-hs__badge"><span>{slide.eyebrow}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CARDS = [
  { id: 1, type: "session", title: "Future of Global Trade", subtitle: "Keynote Session", date: "Oct 14, 2025", location: "Hall A — Main Stage", tag: "Keynote", color: "#1a2a4a", accent: "#e8a020", icon: "🌐", },
  { id: 2, type: "highlight", title: "Singapore Summit", subtitle: "Past Conference", date: "March 2024", location: "Marina Bay Sands, SG", tag: "2024", color: "#0f3d38", accent: "#3ecfb2", icon: "🏙️", },
  { id: 3, type: "speakers", title: "All-Star Speaker Panel", subtitle: "Meet Our Experts", date: "Oct 15, 2025", location: "20+ Industry Leaders", tag: "Speakers", color: "#2e1a4a", accent: "#b07efc", icon: "🎤", },
  { id: 4, type: "session", title: "Sustainable Business Models", subtitle: "Workshop Session", date: "Oct 14, 2025", location: "Hall B — Workshop Bay", tag: "Workshop", color: "#1a3a20", accent: "#5dbe72", icon: "♻️", },
  { id: 5, type: "highlight", title: "Dubai Conclave", subtitle: "Past Conference", date: "November 2023", location: "World Trade Centre, UAE", tag: "2023", color: "#3a2010", accent: "#f0852a", icon: "🏛️", },
  { id: 6, type: "session", title: "AI in Enterprise Strategy", subtitle: "Panel Discussion", date: "Oct 15, 2025", location: "Innovation Theatre", tag: "Panel", color: "#1a1a3a", accent: "#5ab4f5", icon: "🤖", },
  { id: 7, type: "highlight", title: "London Forum 2022", subtitle: "Past Conference", date: "September 2022", location: "ExCeL London, UK", tag: "2022", color: "#3a1a2a", accent: "#f07aaa", icon: "🎡", },
];

const POSITIONS = [
  { x: -420, z: -180, rotY: 38, scale: 0.72, opacity: 0.55, zIndex: 1 },
  { x: -230, z: -80, rotY: 22, scale: 0.84, opacity: 0.75, zIndex: 2 },
  { x: 0, z: 0, rotY: 0, scale: 1.0, opacity: 1.0, zIndex: 5 },
  { x: 230, z: -80, rotY: -22, scale: 0.84, opacity: 0.75, zIndex: 2 },
  { x: 420, z: -180, rotY: -38, scale: 0.72, opacity: 0.55, zIndex: 1 },
];

function GalleryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const total = CARDS.length;

  const goTo = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((index + total) % total);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, total]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 2500);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const getVisibleCards = () => {
    const result = [];
    for (let i = -2; i <= 2; i++) {
      const cardIndex = (activeIndex + i + total) % total;
      result.push({ card: CARDS[cardIndex], posIndex: i + 2 });
    }
    return result;
  };

  return (
    <section className="as-gl-sgc-gallery">
      <div className="as-gl-sgc-gallery__hero">
        <div className="as-gl-sgc-gallery__headline">
          <span className="as-gl-sgc-gallery__eyebrow">Our Signature Events</span>
          <h2 className="as-gl-sgc-gallery__title"> Where Leaders <br /> Shape the World </h2>
          <p className="as-gl-sgc-gallery__subtitle">
            Signature Global Conferences brings together the world's most
            influential minds — across industries, borders, and disciplines —
            for transformative conversations that matter.
          </p>
          <button className="as-gl-sgc-gallery__cta">Explore All Conferences</button>
        </div>
        <div className="as-gl-sgc-gallery__stage-wrap">
          <div className="as-gl-sgc-gallery__stage">
            {getVisibleCards().map(({ card, posIndex }) => {
              const pos = POSITIONS[posIndex];
              return (
                <div key={card.id} className="as-gl-sgc-card" style={{ "--as-gl-card-bg": card.color, "--as-gl-card-accent": card.accent, transform: `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.rotY}deg) scale(${pos.scale})`, opacity: pos.opacity, zIndex: pos.zIndex }} onClick={() => posIndex !== 2 && goTo(activeIndex + (posIndex - 2))}>
                  <div className="as-gl-sgc-card__inner">
                    <div className="as-gl-sgc-card__top"><span className="as-gl-sgc-card__tag">{card.tag}</span><span className="as-gl-sgc-card__icon">{card.icon}</span></div>
                    <div className="as-gl-sgc-card__body"><p className="as-gl-sgc-card__type">{card.subtitle}</p><h3 className="as-gl-sgc-card__name">{card.title}</h3></div>
                    <div className="as-gl-sgc-card__footer"><div className="as-gl-sgc-card__meta"><span className="as-gl-sgc-card__date">{card.date}</span><span className="as-gl-sgc-card__location">{card.location}</span></div><div className="as-gl-sgc-card__line" /></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="as-gl-sgc-gallery__nav">
            <button className="as-gl-sgc-nav-btn" onClick={() => { clearInterval(intervalRef.current); prev(); }} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="as-gl-sgc-nav-btn as-gl-sgc-nav-btn--next" onClick={() => { clearInterval(intervalRef.current); next(); }} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80", alt: "Conference main stage with large audience", span: "wide", },
  { id: 2,  src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",  alt: "Speaker presenting on stage", span: "tall",},
  { id: 3, src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80", alt: "Panel discussion on stage", span: "normal",},
  { id: 4, src: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80", alt: "Networking event crowd", span: "normal", },
  { id: 5, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80", alt: "Round table business meeting", span: "wide", },
  { id: 6, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80", alt: "Speaker addressing packed hall", span: "normal", },
  { id: 7, src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&q=80", alt: "Award ceremony on stage", span: "tall", },
  { id: 8, src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80", alt: "Conference registration and entry", span: "normal", },
  { id: 9, src: "https://images.unsplash.com/photo-1464863979621-258859e62245?w=900&q=80", alt: "Keynote speaker full hall", span: "wide", },
  { id: 10, src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80", alt: "Workshop session delegates", span: "normal", },
];

function RegularGallery() {
  return (
    <section className="as-gl-rg-section">
      <div className="as-gl-rg-header">
        <div className="as-gl-rg-header__left">
          <span className="as-gl-rg-eyebrow">Visual Stories</span>
          <h2 className="as-gl-rg-title">  Moments That <br />  <em>Move the World</em> </h2>
        </div>
        <div className="as-gl-rg-header__right">
          <p className="as-gl-rg-desc">
            Every frame captures a conversation that shaped an industry, a
            handshake that built a partnership, and a stage where the future was
            written.
          </p>
        </div>
      </div>
      <div className="as-gl-rg-grid">
        {IMAGES.map((img) => (
          <div key={img.id} className={`as-gl-rg-item as-gl-rg-item--${img.span}`}>
            <div className="as-gl-rg-item__inner">
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="as-gl-rg-item__overlay" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VideoSection() {
  const sectionRef = useRef(null);
  const iframeRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const observerRef = useRef(null);
  const VIDEO_ID = "UF8uR6Z6KLc";

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
    const initPlayer = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: VIDEO_ID,
        playerVars: { autoplay: 0, controls: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onStateChange: (event) => {
            if (event.data === 0) { setIsPlaying(false); setShowReplay(true); }
            if (event.data === 1) { setIsPlaying(true); setShowReplay(false); }
            if (event.data === 2) { setIsPlaying(false); }
          },
        },
      });
    };
    if (window.YT && window.YT.Player) { initPlayer(); } else { window.onYouTubeIframeAPIReady = initPlayer; }
    return () => { if (playerRef.current && playerRef.current.destroy) { playerRef.current.destroy(); } };
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasPlayed) {
          setTimeout(() => {
            if (playerRef.current && playerRef.current.playVideo) {
              playerRef.current.playVideo();
              setHasPlayed(true);
              setIsPlaying(true);
            }
          }, 600);
          observerRef.current.disconnect();
        }
      });
    }, { threshold: 0.5 });
    if (sectionRef.current) { observerRef.current.observe(sectionRef.current); }
    return () => observerRef.current && observerRef.current.disconnect();
  }, [hasPlayed]);

  const handleReplay = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
      setShowReplay(false);
      setIsPlaying(true);
    }
  };

  return (
    <section className="as-gl-vs-section" ref={sectionRef}>
      <div className="as-gl-vs-header">
        <span className="as-gl-vs-eyebrow">In Focus</span>
        <h2 className="as-gl-vs-title">  Voices That <em>Shape the Future</em> </h2>
        <p className="as-gl-vs-subtitle">Relive the energy, insight, and impact from our most powerful conference sessions.</p>
      </div>
      <div className="as-gl-vs-stage">
        <span className="as-gl-vs-ghost as-gl-vs-ghost--tl">inspiring</span>
        <span className="as-gl-vs-ghost as-gl-vs-ghost--br">leaders</span>
        <div className="as-gl-vs-pill as-gl-vs-pill--left"><span>S</span><span>G</span><span>C</span></div>
        <div className="as-gl-vs-pill as-gl-vs-pill--right"><span>2</span><span>0</span><span>2</span><span>5</span></div>
        <div className="as-gl-vs-blob as-gl-vs-blob--tl" />
        <div className="as-gl-vs-blob as-gl-vs-blob--br" />
        <div className={`as-gl-vs-card ${isPlaying ? "as-gl-vs-card--playing" : ""}`}>
          <div className="as-gl-vs-card__inner">
            <div id="yt-player" ref={iframeRef} />
            {showReplay && (
              <div className="as-gl-vs-replay-overlay">
                <button className="as-gl-vs-replay-btn" onClick={handleReplay}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Watch Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="as-gl-vs-platforms">
        <span className="as-gl-vs-platforms__label">Also streaming on:</span>
        <div className="as-gl-vs-platforms__list">
          {[ "YouTube", "LinkedIn Live", "Facebook Live", "Zoom Webinar", "Google Meet", ].map((p) => (
            <div className="as-gl-vs-platform-badge" key={p}>{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ──────────────────────────────────── */
export default function AsiaGallery() {
  return (
    // ✅ KEY CHANGE: Scoped root class matches Asia pattern
    <div className="as-page">
      <Navbar />
      {/* <GalleryHero /> */}
      {/* <HeroSection /> */}
      {/* <RegularGallery /> */}
      {/* <VideoSection /> */}
      {/* <GalleryCarousel /> */}
      < TempGallery/>
      <Footer theme="asia" />
    </div>
  );
}