import { useNavigate} from "react-router-dom";
import { Navbar } from "../Home/asia.jsx";
import "./asgcabout.css";
import "../Home/asia.css";
import Footer from "../../../Components/Footer/footer";

/* ─── DATA ───────────────────────────────── */
const stats = [
  { value: "50+",  label: "Global Cities" },
  { value: "10K+", label: "Leaders Empowered" },
  { value: "200+", label: "World-Class Speakers" },
  { value: "30+",  label: "Countries Reached" },
];

const pillars = [
  { id: "keynote",        icon: "🎤", title: "Keynote Experiences", desc: "Transformative sessions delivered by the world's most powerful voices, designed to shift perspective and ignite purpose." },
  { id: "network",        icon: "🌐", title: "Global Network",       desc: "Connect with a worldwide community of like-minded entrepreneurs, coaches, and changemakers across every industry." },
  { id: "transformation", icon: "🔥", title: "Real Transformation",  desc: "Leave not just with knowledge, but with a renewed vision, renewed confidence, and a clear path forward." },
  { id: "leadership",     icon: "👑", title: "Leadership Elevated",  desc: "A platform where emerging speakers and seasoned leaders both grow and amplify their voice on a global stage." },
];

const values = [
  { id: "authentic-leadership", num: "01", title: "Authentic Leadership",  desc: "We believe leadership is defined not by title, but by the ability to influence, uplift, and create change. Authenticity is the foundation of every voice we amplify." },
  { id: "purpose-driven",       num: "02", title: "Purpose-Driven Action", desc: "Every session, every connection, every moment on our stage is designed to move people from inspiration to action — because potential only counts when it is activated." },
  { id: "global-inclusivity",   num: "03", title: "Global Inclusivity",    desc: "We build spaces that welcome every voice — across cultures, industries, and backgrounds. Diversity of thought and experience is what makes our movement powerful." },
  { id: "lasting-impact",       num: "04", title: "Lasting Impact",        desc: "We measure our success not in ticket sales, but in the ripple effect of transformed leaders returning to their communities with clarity, confidence, and vision." },
  { id: "courage",              num: "05", title: "Courage to Rise",       desc: "We create a culture where stepping onto the stage — literally and metaphorically — is celebrated. Because the world needs people willing to rise and lead." },
  { id: "community",            num: "06", title: "Community First",       desc: "Every attendee becomes part of a global family. Our conferences are the beginning of lifelong relationships built on shared purpose and mutual growth." },
];

const timeline = [
  { id: "vision",    step: "01", year: "The Vision",     title: "A Stage for Every Voice",      desc: "Signature Global Conferences was founded on the conviction that powerful ideas deserve powerful platforms — that every entrepreneur, coach, and changemaker deserves a global stage." },
  { id: "launch",    step: "02", year: "The First Event", title: "From Local to Global",         desc: "What began as a single gathering of determined leaders quickly grew into a movement spanning continents — proof that the hunger for authentic connection and real impact was universal." },
  { id: "expansion", step: "03", year: "The Expansion",  title: "Across Borders & Industries",  desc: "We expanded into Europe, Asia, and beyond — bringing world-class conferences to Paris, London, Berlin, Rome, and dozens of cities, uniting professionals from every walk of life." },
  { id: "today",     step: "04", year: "Today",          title: "A Global Movement",             desc: "With 10,000+ leaders empowered, 200+ speakers platformed, and 30+ countries reached, Signature Global Conferences is now one of the most impactful leadership platforms in the world." },
];

const testimonial = {
  quote:    "Signature Global Conferences didn't just give me a stage — it gave me the courage to believe my story was worth telling. I left transformed.",
  author:   "Priya Menon",
  role:     "Entrepreneur & Keynote Speaker, Dubai",
  initials: "PM",
};

const missionText = [
  "Signature Global Conferences was born from a simple belief: that every individual carries within them a story powerful enough to change the world. We exist to build the stages where those stories are told.",
  "Hosted in some of the most influential cities across the globe, each conference is an immersive environment where entrepreneurs, professionals, coaches, and changemakers gather to grow, lead, and make lasting impact in their fields.",
  "We go beyond traditional events. Our gatherings are curated experiences where clarity meets purpose, and where connection transforms into action.",
];

/* ─── SECTIONS ───────────────────────────── */
function AboutHero() {
  return (
    <section className="as-ab-hero">
      <div className="as-ab-hero__lines" />
      <div className="as-ab-hero__orb" />
      <div className="as-ab-hero__orb2" />
      <div className="as-ab-hero__inner">
        <div>
          <span className="as-ab-hero__eyebrow">About Us</span>
          <h1 className="as-ab-hero__title">
            More Than a<br />Conference.<br /><em>A Movement.</em>
          </h1>
          <p className="as-ab-hero__sub">
            A premier international platform dedicated to inspiring voices, empowering leaders,
            and creating meaningful global impact — one stage, one story, one life at a time.
          </p>
          <div className="as-ab-hero__actions">
            <button className="as-ab-btn as-ab-btn--primary">Explore Conferences</button>
            <button className="as-ab-btn as-ab-btn--ghost">Our Story ↓</button>
          </div>
        </div>
        <div className="as-ab-hero__manifesto">
          <p className="as-ab-manifesto__quote">
            "Leadership is not a title. It is the courage to <span>inspire others."</span>
          </p>
          <div className="as-ab-manifesto__items">
            {["Voices are heard", "Stories inspire change", "Leaders rise with confidence", "Global impact begins here"].map((t) => (
              <div key={t} className="as-ab-manifesto__item">
                <div className="as-ab-manifesto__dot" />{t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="as-ab-stats">
      <div className="as-ab-stats__inner">
        {stats.map((s) => (
          <div key={s.label} className="as-ab-stat">
            <div className="as-ab-stat__num">{s.value}</div>
            <div className="as-ab-stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="as-ab-mission">
      <div className="as-ab-mission__bg" />
      <div className="as-ab-mission__inner">
        <div className="as-ab-mission__grid">
          <div>
            <span className="as-ab-section__eyebrow">Our Mission</span>
            <h2 className="as-ab-section__title">Creating Spaces Where Voices Matter</h2>
            <div className="as-ab-mission__text">
              {missionText.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
          <div className="as-ab-pillars">
            {pillars.map((p) => (
              <div key={p.id} className="as-ab-pillar">
                <span className="as-ab-pillar__icon">{p.icon}</span>
                <div className="as-ab-pillar__title">{p.title}</div>
                <p className="as-ab-pillar__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="as-ab-values">
      <div className="as-ab-values__inner">
        <div className="as-ab-values__header">
          <span className="as-ab-section__eyebrow as-ab-section__eyebrow--center">Our Values</span>
          <h2 className="as-ab-section__title as-ab-section__title--center">What We Stand For</h2>
        </div>
        <div className="as-ab-values__grid">
          {values.map((v) => (
            <div key={v.id} className="as-ab-value-card">
              <div className="as-ab-value-card__num">{v.num}</div>
              <div className="as-ab-value-card__title">{v.title}</div>
              <div className="as-ab-value-card__rule" />
              <p className="as-ab-value-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="as-ab-story">
      <div className="as-ab-story__inner">
        <div>
          <span className="as-ab-section__eyebrow">Our Story</span>
          <h2 className="as-ab-section__title">How the Movement Began</h2>
          <div className="as-ab-timeline">
            {timeline.map((item) => (
              <div key={item.id} className="as-ab-timeline__item">
                <div className="as-ab-timeline__dot">{item.step}</div>
                <div>
                  <div className="as-ab-timeline__year">{item.year}</div>
                  <div className="as-ab-timeline__title">{item.title}</div>
                  <p className="as-ab-timeline__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="as-ab-story__quote">
          <div className="as-ab-quote-card">
            <span className="as-ab-quote__mark">"</span>
            <p className="as-ab-quote__text">{testimonial.quote}</p>
            <div className="as-ab-quote__author">
              <div className="as-ab-quote__avatar">{testimonial.initials}</div>
              <div>
                <div className="as-ab-quote__name">{testimonial.author}</div>
                <div className="as-ab-quote__role">{testimonial.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  const navigate = useNavigate();
  return (
    <section className="as-ab-cta">
      <div className="as-ab-cta__inner">
        <h2 className="as-ab-cta__title">Ready to Step Into<br /><em>Your Global Stage?</em></h2>
        <p className="as-ab-cta__sub">
          Join thousands of leaders, speakers, and changemakers who have already
          stepped into their purpose at Signature Global Conferences.
        </p>
        <div className="as-ab-cta__btns">
          <button className="as-ab-btn as-ab-btn--primary" onClick={() => navigate("/conferences")}>View Conferences</button>
          <button className="as-ab-btn as-ab-btn--ghost"   onClick={() => navigate("/asiaregister")}>Speak at an Event</button>
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ───────────────────────────────── */
export default function AboutUs() {
  return (
    // ✅ KEY CHANGE: Scoped root class matches Asia pattern
    <div className="as-page">
      <Navbar />
      <AboutHero />
      <StatsBar />
      <Mission />
      <Values />
      <Story />
      <AboutCTA />
      <Footer theme="asia" />
    </div>
  );
}