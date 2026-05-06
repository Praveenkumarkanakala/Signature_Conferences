import { useNavigate } from "react-router-dom";
import { NaNavbar } from "../NAHome/Nahome";
import Footer from "../../../Components/Footer/footer";
import "./aboutus.css";

/* ─── INLINED DATA ─────────────────────────────────────────────── */
const DATA = {
  stats: [
    { value: "50+", label: "Global Cities" },
    { value: "10K+", label: "Leaders Empowered" },
    { value: "200+", label: "World-Class Speakers" },
    { value: "30+", label: "Countries Reached" },
  ],
  pillars: [
    { id: "keynote", icon: "🎤", title: "Keynote Experiences", desc: "Transformative sessions delivered by the world's most powerful voices, designed to shift perspective and ignite purpose." },
    { id: "network", icon: "🌐", title: "Global Network", desc: "Connect with a worldwide community of like-minded entrepreneurs, coaches, and changemakers across every industry." },
    { id: "transformation", icon: "🔥", title: "Real Transformation", desc: "Leave not just with knowledge, but with a renewed vision, renewed confidence, and a clear path forward." },
    { id: "leadership", icon: "👑", title: "Leadership Elevated", desc: "A platform where emerging speakers and seasoned leaders both grow and amplify their voice on a global stage." },
  ],
  values: [
    { id: "authentic-leadership", num: "01", title: "Authentic Leadership", desc: "We believe leadership is defined not by title, but by the ability to influence, uplift, and create change. Authenticity is the foundation of every voice we amplify." },
    { id: "purpose-driven", num: "02", title: "Purpose-Driven Action", desc: "Every session, every connection, every moment on our stage is designed to move people from inspiration to action — because potential only counts when it is activated." },
    { id: "global-inclusivity", num: "03", title: "Global Inclusivity", desc: "We build spaces that welcome every voice — across cultures, industries, and backgrounds. Diversity of thought and experience is what makes our movement powerful." },
    { id: "lasting-impact", num: "04", title: "Lasting Impact", desc: "We measure our success not in ticket sales, but in the ripple effect of transformed leaders returning to their communities with clarity, confidence, and vision." },
    { id: "courage", num: "05", title: "Courage to Rise", desc: "We create a culture where stepping onto the stage — literally and metaphorically — is celebrated. Because the world needs people willing to rise and lead." },
    { id: "community", num: "06", title: "Community First", desc: "Every attendee becomes part of a global family. Our conferences are the beginning of lifelong relationships built on shared purpose and mutual growth." },
  ],
  timeline: [
    { id: "vision", step: "01", year: "The Vision", title: "A Stage for Every Voice", desc: "Signature Global Conferences was founded on the conviction that powerful ideas deserve powerful platforms — that every entrepreneur, coach, and changemaker deserves a global stage." },
    { id: "launch", step: "02", year: "The First Event", title: "From Local to Global", desc: "What began as a single gathering of determined leaders quickly grew into a movement spanning continents — proof that the hunger for authentic connection and real impact was universal." },
    { id: "expansion", step: "03", year: "The Expansion", title: "Across Borders & Industries", desc: "We expanded into Europe, Asia, and beyond — bringing world-class conferences to Paris, London, Berlin, Rome, and dozens of cities, uniting professionals from every walk of life." },
    { id: "today", step: "04", year: "Today", title: "A Global Movement", desc: "With 10,000+ leaders empowered, 200+ speakers platformed, and 30+ countries reached, Signature Global Conferences is now one of the most impactful leadership platforms in the world." },
  ],
  testimonial: { quote: "Signature Global Conferences didn't just give me a stage — it gave me the courage to believe my story was worth telling. I left transformed.", author: "Priya Menon", role: "Entrepreneur & Keynote Speaker, Dubai", initials: "PM" },
  missionText: [
    "At North America Signature Global Conferences, we are deeply passionate about the 3C’s—Creating, Connections, and Conversions—bringing together visionary women leaders, researchers, entrepreneurs, and professionals on a global platform. It is designed to empower and integrate individuals and organizations, fostering meaningful collaborations that inspire growth, innovation, and impactful leadership.",
    "This conferences aims to create a dynamic environment where women leaders and aspiring professionals can connect, communicate, cultivate, and convert ideas into powerful actions that contribute to society and human advancement. We strive to build a strong B2B and professional network that encourages collaboration and sustainable success. The conference endeavors to unite experts from diverse fields, providing an ideal platform for extraordinary, like-minded professionals to explore their potential while engaging in real-time interactions. It is a space to exchange ideas, share experiences, and inspire one another through meaningful conversations and thought leadership.",
    "Our vision is to bring together high-profile speakers, researchers, authors, entrepreneurs, and coaches who will share their valuable insights on leadership, innovation, personal growth, and global challenges—both virtually and in person—with exceptional support and engagement. Through this initiative, we continue our legacy of organizing impactful global conferences across areas such as women’s leadership, mental health, technology, artificial intelligence, sustainability, and innovation, enabling participants to gain valuable knowledge and perspectives from around the world.",
    "At its core, focuses on gathering and showcasing diverse ideas on one stage to create, build, and execute cutting-edge leadership conversations, ensuring lasting impact and “top-of-mind” awareness. It fosters strong connections among individuals, entrepreneurs, and business leaders, helping build a consistent and powerful network of opportunities."
  ]
};

/* ─── COMPONENTS ───────────────────────────────────────────────── */
function AboutHero() {
  return (
    <section className="na-hero">
      <div className="na-hero__lines" />
      <div className="na-hero__orb" />
      <div className="na-hero__orb2" />
      <div className="na-hero__inner">
        <div>
          <span className="na-section__eyebrow">About Us</span>
          <h1 className="na-hero__title">More Than a<br />Conference.<br /><em>A Movement.</em></h1>
          <p className="na-hero__sub">A premier international platform dedicated to inspiring voices, empowering leaders, and creating meaningful global impact — one stage, one story, one life at a time.</p>
          <div className="na-hero__actions">
            <button className="na-btn na-btn--primary">Explore Conferences</button>
            <button className="na-btn na-btn--ghost">Our Story ↓</button>
          </div>
        </div>
        <div>
          <div className="na-hero__manifesto">
            <p className="na-manifesto__quote">"Leadership is not a title. It is the courage to <span>inspire others."</span></p>
            <div className="na-manifesto__items">
              {["Voices are heard", "Stories inspire change", "Leaders rise with confidence", "Global impact begins here"].map((t, i) => (
                <div key={i} className="na-manifesto__item"><div className="na-manifesto__dot" />{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="na-stats">
      <div className="na-stats__inner">
        {DATA.stats.map((s) => (
          <div key={s.label} className="na-stat">
            <div className="na-stat__num">{s.value}</div>
            <div className="na-stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="na-mission">
      <div className="na-mission__inner">

        {/* ── Centered heading ── */}
        <div className="na-mission__header">
          <span className="na-section__eyebrow na-section__eyebrow--center">Our Mission</span>
          <h2 className="na-section__title na-section__title--center">
            Creating Spaces Where Voices Matter
          </h2>
        </div>

        {/* ── Two-column text ── */}
        <div className="na-mission__text-grid">
          <div className="na-mission__col">
            {DATA.missionText.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="na-mission__col">
            {DATA.missionText.slice(2).map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        {/* ── 4-column pillars ── */}
        <div className="na-pillars">
          {DATA.pillars.map((p) => (
            <div key={p.id} className="na-pillar">
              <div className="na-pillar__icon-wrap">
                <span className="na-pillar__icon">{p.icon}</span>
              </div>
              <div className="na-pillar__title">{p.title}</div>
              <p className="na-pillar__desc">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="na-values">
      <div className="na-values__inner">
        <div className="na-values__header">
          <span className="na-section__eyebrow na-section__eyebrow--center">Our Values</span>
          <h2 className="na-section__title na-section__title--center">What We Stand For</h2>
        </div>
        <div className="na-values__grid">
          {DATA.values.map((v) => (
            <div key={v.id} className="na-value-card">
              <div className="na-value-card__num">{v.num}</div>
              <div className="na-value-card__title">{v.title}</div>
              <div className="na-value-card__rule" />
              <p className="na-value-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  const navigate = useNavigate();
  return (
    <section className="na-cta">
      <div className="na-cta__inner">
        <h2 className="na-cta__title">Ready to Step Into<br /><em>Your Global Stage?</em></h2>
        <p className="na-cta__sub">Join thousands of leaders, speakers, and changemakers who have already stepped into their purpose at Signature Global Conferences.</p>
        <div className="na-cta__btns">
          <button className="na-btn na-btn--primary" onClick={() => navigate("/na-events")}>View Conferences</button>
          <button className="na-btn na-btn--ghost" onClick={() => navigate("/na-register")}>Speak at an Event</button>
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT EXPORT ──────────────────────────────────────────────── */
export default function AboutUs() {
  return (
    <div className="na-page">
      <NaNavbar />
      <AboutHero />
      <StatsBar />
      <Mission />
      <Values />
      <AboutCTA />
      <Footer theme="northamerica" />
    </div>
  );
}