import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../Navbar/SGCLogo.png";
import { footerThemes } from "./footertheme";

const FOOTER_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
:root{--eout:cubic-bezier(.16,1,.3,1)}
.footer{isolation:isolate;position:relative;z-index:1}
.footer-wave{display:block;line-height:0;overflow:hidden;background:#0a1428}
.footer-wave svg{display:block;width:100%;height:48px}
.footer-body{background:var(--ink);position:relative;overflow:hidden}
.footer-body-texture{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:48px 48px}
.footer-body-inner{max-width:1200px;margin:0 auto;padding:40px 40px 36px;display:flex;gap:0;flex-wrap:wrap;opacity:0;transform:translateY(32px);transition:opacity .8s var(--eout),transform .8s var(--eout)}
.footer-body-inner.body--on{opacity:1;transform:translateY(0)}
.footer-body-rule{max-width:1200px;margin:0 auto;height:1px;background:linear-gradient(90deg,transparent,var(--border) 20%,var(--teal) 50%,var(--border) 80%,transparent);transform:scaleX(0);transition:transform 1s var(--eout) .4s}
.footer-body-rule.rule--on{transform:scaleX(1)}
.footer-brand{flex:0 0 340px;min-width:280px;padding-right:36px;display:flex;flex-direction:column;gap:0;opacity:0;transform:translateX(-20px);transition:opacity .7s var(--eout) var(--fd,0s),transform .7s var(--eout) var(--fd,0s)}
.footer-body-inner.body--on .footer-brand{opacity:1;transform:translateX(0)}
.footer-logo{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.footer-logo-img-wrap{position:relative;flex-shrink:0}
.footer-logo-img{width:60px;height:60px;object-fit:contain;border-radius:14px;display:block;position:relative;z-index:1;transition:transform .4s var(--eout)}
.footer-logo-img-wrap:hover .footer-logo-img{transform:scale(1.06)}
.footer-logo-ring{position:absolute;inset:-4px;border-radius:18px;border:1.5px solid rgba(79,195,216,.25);animation:ringPulse 3.5s ease-in-out infinite}
@keyframes ringPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.9;transform:scale(1.06)}}
.footer-logo-text{display:flex;flex-direction:column;gap:3px}
.footer-logo-main{font-family:'Manrope',sans-serif;font-size:20px;font-weight:900;color:var(--white);letter-spacing:3px;line-height:1}
.footer-logo-sub{font-family:'Manrope',sans-serif;font-size:9px;font-weight:500;color:rgba(255,255,255,.4);letter-spacing:1.3px;text-transform:uppercase;line-height:1.4}
.footer-brand-divider{height:1px;background:linear-gradient(90deg,var(--teal),transparent);margin-bottom:14px;opacity:.3}
.footer-address-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 16px;margin-bottom:12px}
.footer-address{font-family:'Manrope',sans-serif;font-size:11px;color:var(--muted);line-height:1.7;margin:0;display:flex;align-items:flex-start;gap:6px}
.footer-address-title{display:block;font-family:'Manrope',sans-serif;font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--teal);margin-bottom:4px}
.footer-meta-icon{width:13px;height:13px;flex-shrink:0;margin-top:3px;opacity:.55}
.footer-contact-row{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px}
.footer-email{font-family:'Manrope',sans-serif;font-size:11px;color:var(--muted);line-height:1.8;margin:0;display:flex;align-items:center;gap:6px;text-decoration:none;word-break:break-all;transition:color .2s}
.footer-email:hover{color:var(--teal)}
.footer-socials{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}
.footer-social-btn{position:relative;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9px;background:rgba(255,255,255,.05);border:1px solid var(--border);color:var(--muted);text-decoration:none;opacity:0;transform:translateY(10px);transition:opacity .4s var(--eout) calc(.5s + var(--si,0)*.07s),transform .4s var(--eout) calc(.5s + var(--si,0)*.07s),background .25s,color .25s,border-color .25s}
.footer-body-inner.body--on .footer-social-btn{opacity:1;transform:translateY(0)}
.footer-social-btn:hover{background:rgba(79,195,216,.15);color:var(--teal);border-color:rgba(79,195,216,.4);transform:translateY(-3px)!important}
.footer-social-btn svg{width:13px;height:13px}
.footer-social-tooltip{position:absolute;bottom:calc(100% + 7px);left:50%;transform:translateX(-50%) translateY(4px);background:var(--ink-deep);color:var(--white);font-family:'Manrope',sans-serif;font-size:10px;font-weight:600;letter-spacing:.5px;padding:4px 8px;border-radius:5px;white-space:nowrap;pointer-events:none;opacity:0;border:1px solid var(--border);transition:opacity .2s,transform .2s var(--eout)}
.footer-social-btn:hover .footer-social-tooltip{opacity:1;transform:translateX(-50%) translateY(0)}
.footer-vdivider{width:1px;background:linear-gradient(to bottom,transparent,var(--border) 20%,var(--border) 80%,transparent);margin:0 32px;align-self:stretch;transform:scaleY(0);transform-origin:top;transition:transform .9s var(--eout) .3s}
.footer-vdivider.vd--on{transform:scaleY(1)}
.footer-nav-cols{flex:1;display:flex;gap:28px;flex-wrap:wrap}
.footer-col{flex:1;min-width:120px;opacity:0;transform:translateY(20px);transition:opacity .65s var(--eout) var(--fd,.1s),transform .65s var(--eout) var(--fd,.1s)}
.footer-body-inner.body--on .footer-col{opacity:1;transform:translateY(0)}
.footer-col-heading{font-family:'Manrope',sans-serif;font-size:10px;font-weight:800;letter-spacing:2.5px;color:var(--white);text-transform:uppercase;margin:0 0 14px;display:flex;align-items:center;gap:9px}
.footer-col-bar{display:block;width:18px;height:2px;background:linear-gradient(90deg,var(--teal),var(--gold));border-radius:2px;flex-shrink:0}
.footer-col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:0}
.footer-col ul li{opacity:0;transform:translateX(-10px);transition:opacity .45s var(--eout) calc(.3s + var(--li,0)*.07s),transform .45s var(--eout) calc(.3s + var(--li,0)*.07s)}
.footer-body-inner.body--on .footer-col ul li{opacity:1;transform:translateX(0)}
.footer-col ul li a{font-family:'Manrope',sans-serif;font-size:12.5px;color:var(--muted);text-decoration:none;display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid transparent;transition:color .2s,gap .25s var(--eout);position:relative}
.footer-col ul li a:hover{color:var(--white);gap:12px}
.footer-col ul li a::after{content:"";position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--teal);transition:width .35s var(--eout)}
.footer-col ul li a:hover::after{width:100%}
.footer-link-bullet{width:4px;height:4px;border-radius:50%;background:var(--teal);flex-shrink:0;opacity:0;transition:opacity .2s}
.footer-col ul li a:hover .footer-link-bullet{opacity:1}
.footer-regions li a{padding:7px 0}
.footer-region-link{display:flex!important;align-items:center;gap:8px!important}
.footer-region-pip{width:7px;height:7px;border-radius:50%;background:var(--rc,var(--teal));box-shadow:0 0 6px var(--rc,var(--teal));flex-shrink:0;animation:pipPulse 2.5s ease-in-out infinite}
@keyframes pipPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
.footer-region-flag{font-size:14px;flex-shrink:0}
.footer-region-name{flex:1}
.footer-region-arr{font-size:12px;color:var(--teal);opacity:0;transform:translateX(-4px);transition:opacity .2s,transform .25s var(--eout);flex-shrink:0}
.footer-region-link:hover .footer-region-arr{opacity:1;transform:translateX(0)}
.footer-col--cta{min-width:170px}
.footer-cta-card{position:relative;background:rgba(15,34,48,.7);border:1px solid rgba(79,195,216,.18);border-radius:16px;padding:20px 18px;overflow:hidden;transition:border-color .3s,box-shadow .3s}
.footer-cta-card:hover{border-color:rgba(79,195,216,.4);box-shadow:0 16px 40px rgba(0,0,0,.35),0 0 0 1px rgba(79,195,216,.1)}
.footer-cta-card-accent{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--teal),var(--gold))}
.footer-cta-card-text{font-family:'Manrope',sans-serif;font-size:12px;color:var(--muted);line-height:1.65;margin:0 0 14px}
.footer-cta-btn{display:inline-flex;align-items:center;gap:8px;background:var(--teal);color:var(--ink-deep);font-family:'Manrope',sans-serif;font-size:12px;font-weight:800;letter-spacing:.8px;text-decoration:none;padding:9px 14px;border-radius:8px;transition:background .2s,gap .25s var(--eout),transform .2s}
.footer-cta-btn:hover{background:var(--teal-dk);gap:12px;transform:translateY(-2px)}
.footer-cta-btn svg{width:13px;height:13px;transition:transform .25s var(--eout)}
.footer-cta-btn:hover svg{transform:translateX(3px)}
.footer-bottom{background:var(--ink-deep);border-top:1px solid var(--border)}
.footer-bottom-inner{max-width:1200px;margin:0 auto;padding:14px 40px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;opacity:0;transition:opacity .6s var(--eout) .2s}
.footer-bottom-inner.bot--on{opacity:1}
.footer-legal{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.footer-legal-text{font-family:'Manrope',sans-serif;font-size:10px;font-weight:600;letter-spacing:1px;color:rgba(255,255,255,0.85);text-transform:uppercase;transition:color .2s}
.footer-legal-text:hover{color:var(--teal)}
.footer-legal-sep{width:3px;height:3px;border-radius:50%;background:var(--border)}
.footer-bottom-logo{width:32px;height:32px;object-fit:contain;opacity:.5;filter:grayscale(1) brightness(2);transition:opacity .3s,filter .3s}
.footer-bottom-logo:hover{opacity:1;filter:none}
.footer-copy{font-family:'Manrope',sans-serif;font-size:10.5px;color:rgba(255,255,255,0.85);margin:0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;letter-spacing:0.3px}
.footer-license-icons{display:inline-flex;align-items:center;gap:6px}
.footer-cc-icon{width:20px;height:20px;display:flex;align-items:center;justify-content:center}
.footer-cc-icon svg{width:100%;height:100%}
@media(max-width:1024px){.footer-body-inner{padding:36px 28px 32px}.footer-brand{flex:0 0 300px;padding-right:24px}.footer-vdivider{margin:0 24px}}
@media(max-width:860px){.footer-vdivider{display:none}.footer-brand{flex:0 0 100%;padding-right:0;padding-bottom:24px;border-bottom:1px solid var(--border)}.footer-address-grid{grid-template-columns:1fr 1fr}.footer-nav-cols{padding-top:24px}}
@media(max-width:600px){.footer-body-inner{padding:28px 20px 24px}.footer-address-grid{grid-template-columns:1fr}.footer-nav-cols{display:grid;grid-template-columns:1fr 1fr;gap:20px}.footer-col--cta{grid-column:1/-1}.footer-bottom-inner{padding:12px 20px;flex-direction:column;align-items:flex-start;gap:14px}.footer-copy{justify-content:flex-start}.footer-bottom-logo{display:none}}
`;

const SOCIAL_LINKS = [
  { label: "Twitter",   icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: "Facebook",  icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { label: "YouTube",   icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg> },
  { label: "Instagram", icon: <svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
];

const REGIONS = [
  { flag: "", name: "North America", path: "/Northamerica", color: "#f59e0b" },
  { flag: "🌎", name: "USA",           path: "/usa",          color: "#4fc3d8" },
  { flag: "🌎", name: "Europe",        path: "/europe",       color: "#4fc3d8" },
  { flag: "🌍", name: "Asia",          path: "/asia",         color: "#a78bfa" },
];

const NAV_LINKS = [
  { label: "Home",    path: "/" },
  { label: "About",   path: "/about" },
  { label: "Blog",    path: "/blog" },
  { label: "FAQ",     path: "/faq" },
  { label: "Contact", path: "/contact" },
];

const ADDRESSES = [
  { title: "Head Office", lines: ["Signature United Global Conferences", "8TH Green, Dover DE", "United States 19901"] },
  { title: "Regional",    lines: ["BITS Pilani, Dubai Campus", "Dubai International Academic City", "P.O. Box 345055, Dubai, UAE"] },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const PinIcon = () => (
  <svg className="footer-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);

const CCIcon = () => (
  <div className="footer-cc-icon">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" fontFamily="Arial,sans-serif">cc</text>
    </svg>
  </div>
);
const BYIcon = () => (
  <div className="footer-cc-icon">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="8.5" r="2.5" fill="currentColor"/>
      <path d="M7 19c0-2.76 2.24-5 5-5s5 2.24 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </div>
);

export default function Footer({ theme = "default" }) {
  const t = footerThemes[theme] ?? footerThemes.default;

  const cssVars = {
    "--teal": t.teal, "--teal-dk": t.tealDark, "--gold": t.gold,
    "--ink": t.ink, "--ink-deep": t.inkDeep,
    "--white": "#ffffff", "--muted": "rgba(255,255,255,0.45)",
    "--border": "rgba(255,255,255,0.07)", "--eout": "cubic-bezier(.16,1,.3,1)",
  };

  const [bodyRef, bodyVisible] = useInView(0.08);
  const [botRef,  botVisible]  = useInView(0.3);

  useEffect(() => {
    const id = "sgc-footer-styles";
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id; tag.textContent = FOOTER_STYLES;
    document.head.appendChild(tag);
    return () => document.getElementById(id)?.remove();
  }, []);

  return (
    <footer className="footer" style={cssVars}>

      <div className="footer-wave" style={{ background: "#0a1428" }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,48 L0,24 Q180,0 360,20 Q540,40 720,20 Q900,0 1080,20 Q1260,40 1440,24 L1440,48 Z" style={{ fill: t.ink }} />
        </svg>
      </div>

      <div className="footer-body" ref={bodyRef}>
        <div className="footer-body-texture" />
        <div className={`footer-body-inner ${bodyVisible ? "body--on" : ""}`}>

          <div className="footer-brand" style={{ "--fd": "0s" }}>
            <div className="footer-logo">
              <div className="footer-logo-img-wrap">
                <img src={logo} alt="SGC Logo" className="footer-logo-img" />
                <div className="footer-logo-ring" />
              </div>
              <div className="footer-logo-text">
                <span className="footer-logo-main">SGC</span>
                <span className="footer-logo-sub">Signature Global<br />Conferences</span>
              </div>
            </div>

            <div className="footer-brand-divider" />

            <div className="footer-address-grid">
              {ADDRESSES.map(({ title, lines }) => (
                <p className="footer-address" key={title}>
                  <PinIcon />
                  <span>
                    <span className="footer-address-title">{title}</span>
                    {lines.map((l, i) => <span key={i}>{l}{i < lines.length - 1 && <br />}</span>)}
                  </span>
                </p>
              ))}
            </div>

            <div className="footer-contact-row">
              <a href="mailto:global@signaturetalks.org" className="footer-email">
                <svg className="footer-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                global@signaturetalks.org
              </a>

              <a href="tel:+12025715721" className="footer-email">
                <svg className="footer-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                +1-202-571-5721
              </a>
            </div>

            <div className="footer-socials">
              {SOCIAL_LINKS.map((s, i) => (
                <a key={i} href="#" aria-label={s.label} className="footer-social-btn" style={{ "--si": i }}>
                  {s.icon}
                  <span className="footer-social-tooltip">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className={`footer-vdivider ${bodyVisible ? "vd--on" : ""}`} />

          <div className="footer-nav-cols">
            <div className="footer-col" style={{ "--fd": ".12s" }}>
              <h4 className="footer-col-heading"><span className="footer-col-bar" />Quick Links</h4>
              <ul>
                {NAV_LINKS.map((link, i) => (
                  <li key={i} style={{ "--li": i }}>
                    <Link to={link.path}><span className="footer-link-bullet" />{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col" style={{ "--fd": ".22s" }}>
              <h4 className="footer-col-heading"><span className="footer-col-bar" />Events by Region</h4>
              <ul className="footer-regions">
                {REGIONS.map((r, i) => (
                  <li key={i} style={{ "--li": i }}>
                    <Link to={r.path} className="footer-region-link">
                      <span className="footer-region-pip" style={{ "--rc": r.color }} />
                      <span className="footer-region-flag">{r.flag}</span>
                      <span className="footer-region-name">{r.name}</span>
                      <span className="footer-region-arr">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col footer-col--cta" style={{ "--fd": ".32s" }}>
              <h4 className="footer-col-heading"><span className="footer-col-bar" />Get Involved</h4>
              <div className="footer-cta-card">
                <div className="footer-cta-card-accent" />
                <p className="footer-cta-card-text">Ready to take your conference experience global?</p>
                <Link to="/contact" className="footer-cta-btn">
                  <span>Contact Us</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>

        </div>
        <div className={`footer-body-rule ${bodyVisible ? "rule--on" : ""}`} />
      </div>

      <div className="footer-bottom" ref={botRef}>
        <div className={`footer-bottom-inner ${botVisible ? "bot--on" : ""}`}>
          <div className="footer-legal">
            <span className="footer-legal-text">Terms & Conditions</span>
            <span className="footer-legal-sep" />
            <span className="footer-legal-text">Privacy Policy</span>
          </div>
          <img src={logo} alt="SGC" className="footer-bottom-logo" />
          <div className="footer-copy">
            <span>United Signature Conferences © 2025 by Signature Conferences</span>
            Licensed under CC BY 4.0
            <span className="footer-license-icons">
              <CCIcon />
              <BYIcon />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}