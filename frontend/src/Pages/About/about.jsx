import { useEffect, useRef, useState } from "react";

import heroMain       from "./SGCTeam.jpg";
import missionMain    from "./aboutimg.jpg";
import missionOverlay from "./Team.jpg";
import gallery1       from "./regionimg1.jpg";
import gallery2       from "./regionimg2.jpeg";
import gallery3       from "./regionimg3.jpeg";
import gallery4       from "./regionimg.jpeg";

const IMGS = { heroMain, missionMain, missionOverlay, gallery: [gallery1, gallery2, gallery3, gallery4] };

const REGIONS = [
  { title:"USA Signature Global Conferences",           desc:"Connecting North American professionals with global standards of excellence.",        icon:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" },
  { title:"Euro Signature Global Conferences",          desc:"Bridging European leaders and emerging talents through curated high-impact gatherings.", icon:"M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M2 12h20 M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10" },
  { title:"Asia Signature Global Conferences",          desc:"Fostering innovation across Asia-Pacific with world-class speakers and networking.",    icon:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { title:"North America Signature Global Conferences", desc:"Uniting Canadian and broader North American professionals in world-class events.",     icon:"M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M2 9h20 M2 15h20" },
];

const HIGHLIGHTS = [
  { title:"Expert Speakers",    desc:"World-class keynotes and panel discussions from thought leaders and global innovators.",    icon:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87" },
  { title:"Knowledge Exchange", desc:"Interactive workshops enabling deep learning and meaningful cross-industry collaboration.", icon:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
  { title:"Innovation Focus",   desc:"Curated sessions designed to spark bold ideas and accelerate transformation globally.",    icon:"M22 12h-4l-3 9L9 3l-3 9H2" },
];

const MISSION_LIST = [
  "Premier platform for global professionals",
  "Conferences across 4+ major regions worldwide",
  "Innovation-driven, collaboration-focused events",
  "Connecting visionaries and industry leaders",
];

// ── hook ──────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, on];
}

// ── helpers ───────────────────────────────────────────────────────────────
const Icon = ({ d, stroke = "#f59e0b", size = 26 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6"
    style={{ width:size, height:size, flexShrink:0 }}>
    {d.split(" M").map((seg, i) => <path key={i} d={(i?"M":"")+seg} />)}
  </svg>
);

const Eyebrow = ({ label, hero }) => (
  <div style={{ display:"inline-flex",alignItems:"center",gap:10,marginBottom:hero?24:16 }}>
    <span style={{ display:"block",width:28,height:2,background:"#f59e0b",boxShadow:"0 0 8px rgba(245,158,11,.8)" }} />
    <span style={{ color:"rgba(255,255,255,.45)",fontSize:10.5,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase" }}>{label}</span>
  </div>
);

const SecHead = ({ eyebrow, title, accent, sub, maxW=560, sectionRef, on }) => (
  <div ref={sectionRef} className={`rv-up${on?" on":""}`} style={{ textAlign:"center",marginBottom:56 }}>
    <Eyebrow label={eyebrow} />
    <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:700,color:"#fff",margin:"0 0 16px",lineHeight:1.12 }}>
      {title}{accent && <> <span style={{ background:"linear-gradient(90deg,#f59e0b,#d97706)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{accent}</span></>}
    </h2>
    {sub && <p style={{ fontSize:15,color:"rgba(255,255,255,.55)",lineHeight:1.75,margin:"0 auto",maxWidth:maxW }}>{sub}</p>}
  </div>
);

// ── styles ────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Manrope:wght@300;400;500;600;700;800&family=Barlow+Condensed:wght@700;900&display=swap');

.about-page {
  --gold:#f59e0b;
  --gold-l:#fbbf24;
  --gold-d:#d97706;
  --teal:#4fc3d8;
  --ink:#07091e;
  --ink2:#0c0e2a;
  --muted:rgba(255,255,255,.55);
  --border:rgba(255,255,255,.08);
  --eout:cubic-bezier(.16,1,.3,1);
}

.about-page .rv-up{opacity:0;transform:translateY(40px);transition:opacity .7s var(--eout) var(--rd,0s),transform .7s var(--eout) var(--rd,0s)}
.about-page .rv-up.on{opacity:1;transform:none}
.about-page .rv-left{opacity:0;transform:translateX(-50px);transition:opacity .8s var(--eout) .1s,transform .8s var(--eout) .1s}
.about-page .rv-left.on{opacity:1;transform:none}
.about-page .rv-right{opacity:0;transform:translateX(50px);transition:opacity .8s var(--eout) .25s,transform .8s var(--eout) .25s}
.about-page .rv-right.on{opacity:1;transform:none}
.about-page .rv-card{opacity:0;transform:translateY(48px) scale(.97);transition:opacity .65s var(--eout) calc(.1s + var(--ci,0)*.13s),transform .65s var(--eout) calc(.1s + var(--ci,0)*.13s)}
.about-page .rv-card.on{opacity:1;transform:none}
.about-page .btn-gold{position:relative;overflow:hidden;background:var(--gold);color:#1a0800;font-size:14px;font-weight:700;padding:13px 28px;border-radius:8px;text-decoration:none;display:inline-flex;align-items:center;box-shadow:0 6px 22px rgba(245,158,11,.35);transition:transform .25s,box-shadow .25s,background .2s;font-family:'Manrope',sans-serif}
.about-page .btn-gold:hover{transform:translateY(-3px);box-shadow:0 14px 34px rgba(245,158,11,.55);background:var(--gold-l)}
.about-page .btn-shimmer{position:absolute;top:0;left:-80%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:skewX(-20deg);animation:shimmer 3.5s 3s ease-in-out infinite}
@keyframes shimmer{0%,90%,100%{left:-80%;opacity:0}10%{left:-80%;opacity:1}50%{left:140%;opacity:1}51%{opacity:0}}
.about-page .btn-outline{color:rgba(255,255,255,.65);font-size:14px;font-weight:500;padding:13px 24px;border-radius:8px;text-decoration:none;border:1px solid rgba(245,158,11,.3);display:inline-block;transition:border-color .2s,color .2s,transform .25s;font-family:'Manrope',sans-serif}
.about-page .btn-outline:hover{color:var(--gold);border-color:var(--gold);transform:translateY(-3px)}
.about-page .rcard{background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:20px;padding:30px 24px;position:relative;overflow:hidden;transition:transform .35s var(--eout),border-color .3s,background .3s,box-shadow .35s}
.about-page .rcard::after{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-d));transform:scaleX(0);transform-origin:left;transition:transform .4s var(--eout)}
.about-page .rcard:hover::after{transform:scaleX(1)}
.about-page .rcard:hover{transform:translateY(-8px);border-color:rgba(245,158,11,.35);background:rgba(245,158,11,.04);box-shadow:0 24px 60px rgba(0,0,0,.4)}
.about-page .hlcard{background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:20px;padding:32px;position:relative;overflow:hidden;transition:transform .35s var(--eout),border-color .3s,background .3s,box-shadow .35s}
.about-page .hlcard:hover{transform:translateY(-8px);border-color:rgba(79,195,216,.3);background:rgba(79,195,216,.04);box-shadow:0 24px 60px rgba(0,0,0,.4)}
.about-page .cline{width:28px;height:2px;margin-top:20px;border-radius:2px;transform:scaleX(0);transform-origin:left;transition:transform .4s var(--eout) .1s}
.about-page .rcard:hover .cline,.about-page .hlcard:hover .cline{transform:scaleX(1)}
.about-page .igl{display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:14px;margin-bottom:20px;position:relative}
.about-page .iglow{position:absolute;inset:-6px;border-radius:50%;opacity:0;transition:opacity .3s}
.about-page .rcard:hover .iglow,.about-page .hlcard:hover .iglow{opacity:1}
.about-page .gitem{border-radius:16px;overflow:hidden;position:relative;background:rgba(255,255,255,.04)}
.about-page .gitem img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s var(--eout)}
.about-page .gitem:hover img{transform:scale(1.05)}
.about-page .gov{position:absolute;inset:0;background:linear-gradient(to top,rgba(7,9,30,.5),transparent);opacity:0;transition:opacity .3s}
.about-page .gitem:hover .gov{opacity:1}
.about-page .mlist li{margin-bottom:12px;color:#fff;position:relative;padding-left:28px;font-size:14px;opacity:0;transform:translateX(16px);transition:opacity .5s var(--eout) calc(.4s + var(--li,0)*.1s),transform .5s var(--eout) calc(.4s + var(--li,0)*.1s)}
.about-page .mlist li::before{content:"✔";position:absolute;left:0;color:var(--gold)}
.about-page .rv-right.on .mlist li{opacity:1;transform:none}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes wordIn{0%{opacity:0;transform:translateY(32px) skewX(-5deg)}65%{opacity:1;transform:translateY(-4px) skewX(1deg)}100%{opacity:1;transform:none}}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes orbPulse{0%,100%{opacity:1}50%{opacity:.65}}
@media(max-width:1100px){.about-page .hero-content{padding:100px 48px 60px!important}.about-page .hero-badges{right:48px!important}.about-page .reg-grid{grid-template-columns:repeat(2,1fr)!important}}
@media(max-width:900px){.about-page .mission-grid{grid-template-columns:1fr!important;gap:48px!important}.about-page .hl-grid{grid-template-columns:repeat(2,1fr)!important}.about-page .hero-badges{display:none!important}.about-page .gal-grid{grid-template-columns:1fr 1fr!important;grid-template-rows:unset!important}.about-page .gal-main{grid-column:1/3!important}.about-page .gal-tall{grid-row:auto!important;grid-column:auto!important}}
@media(max-width:768px){.about-page .hero-content{padding:80px 28px 48px!important}.about-page .about-wrap{padding:0 24px!important}.about-page .about-sec{padding:72px 0!important}.about-page .hero-geo,.about-page .hero-glow{display:none!important}}
@media(max-width:560px){.about-page .reg-grid{grid-template-columns:1fr!important}.about-page .hl-grid{grid-template-columns:1fr!important}.about-page .gal-grid{grid-template-columns:1fr!important}.about-page .gal-main,.about-page .gal-tall,.about-page .gitem{height:220px!important;grid-column:auto!important;grid-row:auto!important}}
@media(max-width:480px){.about-page .cta-btns{flex-direction:column!important}.about-page .btn-gold,.about-page .btn-outline{text-align:center;width:100%;justify-content:center}}
`;

export default function About() {

  // No scroll manipulation needed - handled via CSS on .about-page wrapper

  const [misHeadRef, misOn]  = useReveal();
  const [regHeadRef, regOn]  = useReveal();
  const [hlHeadRef,  hlOn]   = useReveal();
  const [galHeadRef, galOn]  = useReveal();
  const [ctaRef,     ctaOn]  = useReveal();
  const [misLRef,    misLOn] = useReveal();
  const [misRRef,    misROn] = useReveal();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const wrap = { maxWidth:1200, margin:"0 auto", padding:"0 40px" };
  const sec  = { padding:"100px 0" };

  return (
    <>
      <style>{`.about-page{font-family:'Manrope',sans-serif;background:#07091e;color:#fff}`}</style>
      
      <div className="about-page">

      {/* ══ HERO ══ */}
      <section style={{ position:"relative",minHeight:"100svh",display:"flex",flexDirection:"column",justifyContent:"center",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 70% 50%,rgba(110,40,200,.15),transparent 65%),radial-gradient(ellipse 60% 80% at 20% 80%,rgba(245,158,11,.07),transparent 65%),linear-gradient(160deg,#040614 0%,#0a0c28 60%,#04060f 100%)" }} />
        {[{w:460,t:"8%",r:"4%",dur:28},{w:240,t:"16%",r:"11%",dur:18,rev:true},{w:96,t:"36%",r:"26%",dur:10}].map((g,i)=>(
          <div className="hero-geo" key={i} style={{ position:"absolute",width:g.w,height:g.w,top:g.t,right:g.r,borderRadius:"50%",border:"1px solid rgba(245,158,11,.12)",animation:`spin ${g.dur}s linear ${g.rev?"reverse":""} infinite`,pointerEvents:"none",zIndex:1 }} />
        ))}
        <div className="hero-glow" style={{ position:"absolute",right:"12%",top:"50%",transform:"translateY(-50%)",width:500,height:500,borderRadius:"50%",pointerEvents:"none",zIndex:1,background:"radial-gradient(circle,rgba(245,158,11,.09),rgba(180,100,10,.05) 48%,transparent 70%)",animation:"orbPulse 5s ease-in-out infinite" }} />

        <div className="hero-content" style={{ position:"relative",zIndex:10,padding:"120px 80px 60px",maxWidth:700,animation:"fadeUp .8s .3s both" }}>
          <Eyebrow label="About SGC" hero />
          <h1 style={{ margin:"0 0 24px",display:"flex",flexDirection:"column",gap:0 }}>
            {["Signature Global","Conferences"].map((w,i)=>(
              <span key={w} style={{ display:"block",fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(44px,6.5vw,96px)",fontWeight:700,lineHeight:1.04,color:w==="Global"?"transparent":"#fff",background:w==="Global"?"linear-gradient(90deg,#f59e0b,#fbbf24)":undefined,WebkitBackgroundClip:w==="Global"?"text":undefined,WebkitTextFillColor:w==="Global"?"transparent":undefined,animation:`wordIn .55s cubic-bezier(.4,0,.2,1) ${.5+i*.22}s both` }}>{w}</span>
            ))}
          </h1>
          <p style={{ fontSize:"clamp(14px,1.4vw,17px)",color:"rgba(255,255,255,.55)",lineHeight:1.75,maxWidth:500,margin:"0 0 36px",animation:"fadeUp .7s .9s both" }}>
            A premier international platform dedicated to bringing together professionals, leaders, innovators, and visionaries from across the world.
          </p>
          <div style={{ display:"flex",gap:14,flexWrap:"wrap",animation:"fadeUp .7s 1.1s both" }}>
            <a href="#mission" className="btn-gold"><span>Our Mission</span><span className="btn-shimmer"/></a>
            <a href="/contact" className="btn-outline">Get In Touch →</a>
          </div>
        </div>
      </section>

      {/* ══ MISSION ══ */}
      <section id="mission" className="about-sec" style={{ ...sec,background:"#07091e",borderTop:"1px solid rgba(255,255,255,.08)" }}>
        <div className="about-wrap" style={wrap}>
          <SecHead eyebrow="Who We Are" title="Our" accent="Mission"
            sub="We create meaningful opportunities for knowledge sharing, collaboration, and networking through world-class conferences across multiple regions."
            sectionRef={misHeadRef} on={misOn} />
          <div className="mission-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center" }}>
            <div className={`rv-left${misLOn?" on":""}`} ref={misLRef} style={{ position:"relative" }}>
              <div style={{ borderRadius:22,overflow:"hidden",aspectRatio:"4/3",background:"rgba(255,255,255,.04)",position:"relative" }}>
                <img src={IMGS.missionMain} alt="Conference hall" style={{ width:"100%",height:"100%",objectFit:"cover",filter:"brightness(.8)",display:"block" }} />
                <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(7,9,30,.1),rgba(7,9,30,.55))" }} />
              </div>
              <div style={{ position:"absolute",bottom:-20,right:-20,width:"38%",aspectRatio:1,borderRadius:16,overflow:"hidden",border:"4px solid #07091e",background:"rgba(255,255,255,.04)" }}>
                <img src={IMGS.missionOverlay} alt="Team" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
              </div>
              <div style={{ position:"absolute",top:20,left:20,background:"linear-gradient(135deg,rgba(245,158,11,.9),rgba(180,100,10,.9))",padding:"16px 20px",borderRadius:14,color:"#fff",textAlign:"center",boxShadow:"0 10px 28px rgba(0,0,0,.45)" }}>
                <h3 style={{ fontSize:26,margin:0,fontWeight:900 }}>9+</h3>
                <p style={{ fontSize:11,opacity:.8,margin:"4px 0 0" }}>Years of Impact</p>
              </div>
            </div>

            <div className={`rv-right${misROn?" on":""}`} ref={misRRef}>
              <span style={{ fontSize:11,letterSpacing:"3px",textTransform:"uppercase",color:"#f59e0b",opacity:.7,display:"block",marginBottom:12 }}>Our Story</span>
              <p style={{ color:"rgba(255,255,255,.55)",lineHeight:1.8,marginBottom:14 }}>
                Signature Global Conferences is a premier international platform that brings together professionals, leaders, innovators, and visionaries from across the world. Our mission is to create meaningful opportunities for knowledge sharing, collaboration, and networking through world-class conferences.
              </p>
              <div style={{ background:"rgba(245,158,11,.06)",borderLeft:"3px solid #f59e0b",padding:"16px 20px",margin:"20px 0",fontSize:14,color:"#fff",lineHeight:1.75,fontWeight:500,borderRadius:"0 8px 8px 0" }}>
                We organize worldwide conferences designed to foster innovation, encourage collaboration, and promote cross-industry learning across 4+ global regions.
              </div>
              <ul className="mlist" style={{ margin:"20px 0 0",padding:0,listStyle:"none" }}>
                {MISSION_LIST.map((item,i)=><li key={i} style={{ "--li":i }}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ REGIONS ══ */}
      <section className="about-sec" style={{ ...sec,background:"#0c0e2a" }}>
        <div className="about-wrap" style={wrap}>
          <SecHead eyebrow="Global Reach" title="Region-Based" accent="Conferences"
            sub="We host region-based conferences ensuring global reach with local relevance — connecting professionals within specific geographic areas."
            sectionRef={regHeadRef} on={regOn} />
          <div className="reg-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }}>
            {REGIONS.map((r,i)=>(
              <div className={`rcard rv-card${regOn?" on":""}`} key={i} style={{ "--ci":i }}>
                <div className="igl" style={{ background:"rgba(245,158,11,.08)" }}>
                  <Icon d={r.icon} />
                  <div className="iglow" style={{ background:"radial-gradient(circle,rgba(245,158,11,.15),transparent 70%)" }} />
                </div>
                <h4 style={{ color:"#fff",margin:"0 0 10px",fontSize:16,fontWeight:700 }}>{r.title}</h4>
                <p style={{ color:"rgba(255,255,255,.55)",fontSize:13,lineHeight:1.7,margin:0 }}>{r.desc}</p>
                <div className="cline" style={{ background:"#f59e0b" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HIGHLIGHTS ══ */}
      <section className="about-sec" style={{ ...sec,background:"#07091e",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(700px 300px at 80% 20%,rgba(79,195,216,.05),transparent 60%),radial-gradient(600px 300px at 10% 80%,rgba(245,158,11,.04),transparent 60%)",pointerEvents:"none" }} />
        <div className="about-wrap" style={wrap}>
          <SecHead eyebrow="What We Offer" title="Conference" accent="Highlights"
            sub="Our events are carefully designed to deliver maximum impact for every attendee across all regions and industries."
            sectionRef={hlHeadRef} on={hlOn} />
          <div className="hl-grid" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22 }}>
            {HIGHLIGHTS.map((h,i)=>(
              <div className={`hlcard rv-card${hlOn?" on":""}`} key={i} style={{ "--ci":i }}>
                <div className="igl" style={{ background:"rgba(79,195,216,.1)" }}>
                  <Icon d={h.icon} stroke="#4fc3d8" size={24} />
                  <div className="iglow" style={{ background:"radial-gradient(circle,rgba(79,195,216,.2),transparent 70%)" }} />
                </div>
                <h4 style={{ color:"#fff",margin:"0 0 10px",fontSize:17,fontWeight:700 }}>{h.title}</h4>
                <p style={{ color:"rgba(255,255,255,.55)",fontSize:14,lineHeight:1.65,margin:0 }}>{h.desc}</p>
                <div className="cline" style={{ background:"#4fc3d8" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section className="about-sec" style={{ ...sec,background:"#07091e" }}>
        <div className="about-wrap" style={wrap}>
          <SecHead eyebrow="Our Events" title="Conference" accent="Gallery"
            sub="A glimpse into the world-class experiences we create at every Signature Global Conference."
            maxW={460} sectionRef={galHeadRef} on={galOn} />
          <div className={`rv-up${galOn?" on":""} gal-grid`} style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"280px 220px",gap:14 }}>
            <div className="gitem gal-main" style={{ gridColumn:"1/3",gridRow:"1" }}>
              <img src={IMGS.gallery[0]} alt="Conference" /><div className="gov"/>
            </div>
            <div className="gitem gal-tall" style={{ gridColumn:"3",gridRow:"1/3" }}>
              <img src={IMGS.gallery[1]} alt="Speaker" /><div className="gov"/>
            </div>
            <div className="gitem" style={{ gridColumn:"1",gridRow:"2" }}>
              <img src={IMGS.gallery[2]} alt="Event" /><div className="gov"/>
            </div>
            <div className="gitem" style={{ gridColumn:"2",gridRow:"2" }}>
              <img src={IMGS.gallery[3]} alt="Event" /><div className="gov"/>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ position:"relative",overflow:"hidden",background:"linear-gradient(120deg,#0e0a30,#07091e 50%,#0a0618)",padding:"100px 40px",textAlign:"center" }} ref={ctaRef}>
        <div style={{ position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 60% 80% at 20% 50%,rgba(245,158,11,.1),transparent 55%),radial-gradient(ellipse 50% 60% at 80% 50%,rgba(245,158,11,.08),transparent 55%)" }} />
        <div className={`rv-up${ctaOn?" on":""}`} style={{ position:"relative",zIndex:2,maxWidth:680,margin:"auto" }}>
          <p style={{ fontSize:11,letterSpacing:"3px",color:"#f59e0b",marginBottom:14,display:"block" }}>JOIN THE MOVEMENT</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(32px,5vw,64px)",fontWeight:700,color:"#fff",marginBottom:18,lineHeight:1.1 }}>Ready to Join the Global Stage?</h2>
          <p style={{ color:"rgba(255,255,255,.55)",fontSize:16,lineHeight:1.7,maxWidth:500,margin:"0 auto 36px" }}>
            Be part of a worldwide community of leaders, innovators, and changemakers shaping the future together.
          </p>
          <div style={{ display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap" }} className="cta-btns">
            <a href="/contact" className="btn-gold"><span>Get In Touch</span><span className="btn-shimmer"/></a>
            <a href="#mission" className="btn-outline">Our Mission →</a>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}