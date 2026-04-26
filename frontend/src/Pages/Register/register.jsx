import { useState } from "react";

const CONFERENCES = {
  Asia: ["Asia Tech Summit 2025", "APAC Innovation Forum", "Singapore FinTech Expo"],
  USA: ["Silicon Valley AI Congress", "New York Global Leaders Forum", "Austin Innovation Week"],
  Europe: ["London Future of Work Summit", "Berlin Digital Transformation Expo", "Paris Climate & Tech Forum"],
  "North America": ["Toronto Emerging Markets Summit", "Chicago Global Finance Forum", "Mexico City Trade Innovation Expo"],
};

const COUNTRIES = [
  "United States","United Kingdom","Germany","France","India","Singapore",
  "Japan","Australia","Canada","UAE","Brazil","South Korea",
];

const IN_PERSON_PACKAGES = [
  { id: "sp", name: "Standard Speaker Pass", desc: null, price: 699 },
  { id: "da", name: "Deal A", desc: "Speaker + 2 Nights Stay", price: 999 },
  { id: "db", name: "Deal B", desc: "Speaker + 3 Nights Stay", price: 1099 },
];

const VIRTUAL_PACKAGES = [
  { id: "vs", name: "Virtual Speaker", desc: null, price: 299 },
  { id: "vk", name: "Virtual Keynote Speaker", desc: null, price: 399 },
];

const ADDONS = [
  { id: "ap", name: "Accompanying Person", price: 199 },
  { id: "ea", name: "Extra Accommodation", price: 150 },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    --gold: #FCA311;
    --gold-dim: rgba(252,163,17,.15);
    --gold-glow: rgba(252,163,17,.32);
    --navy: #14213D;
    --navy-d: #0d1728;
    --navy-l: #1c2d52;
    --white: #FFFFFF;
    --mute: rgba(255,255,255,.48);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .sgc-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--navy-d);
    color: var(--white);
    min-height: 100vh;
  }

  /* ── HERO ── */
  .sgc-hero {
    background: linear-gradient(160deg, #060b15 0%, #0d1728 45%, #101e35 100%);
    padding: 90px 24px 100px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .sgc-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 65% 55% at 50% 55%, rgba(252,163,17,.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .sgc-hero::after {
    content: '';
    position: absolute;
    bottom: 0; left: 50%; transform: translateX(-50%);
    width: 80%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(252,163,17,.3), transparent);
  }
  .sgc-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--gold-dim);
    border: 1px solid rgba(252,163,17,.35);
    border-radius: 40px; padding: 6px 18px;
    font-size: 11px; font-weight: 600;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 28px;
    position: relative; z-index: 1;
  }
  .sgc-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--gold); flex-shrink: 0;
    box-shadow: 0 0 6px var(--gold);
  }
  .sgc-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 800; line-height: 1.05;
    color: var(--white);
    margin-bottom: 6px;
    position: relative; z-index: 1;
  }
  .sgc-hero-title em { font-style: italic; color: var(--gold); }
  .sgc-divider {
    width: 56px; height: 3px;
    background: linear-gradient(90deg, var(--gold), transparent);
    border-radius: 2px; margin: 22px auto;
    position: relative; z-index: 1;
  }
  .sgc-hero-sub {
    font-size: clamp(13px, 1.8vw, 16px);
    color: var(--mute); max-width: 500px;
    margin: 0 auto; line-height: 1.75;
    position: relative; z-index: 1;
  }
  .sgc-stats {
    display: flex; justify-content: center;
    gap: 48px; flex-wrap: wrap;
    margin-top: 40px; position: relative; z-index: 1;
  }
  .sgc-stat-n { font-size: 24px; font-weight: 700; color: var(--gold); }
  .sgc-stat-l { font-size: 11px; color: var(--mute); text-transform: uppercase; letter-spacing: 1px; margin-top: 3px; }
  .sgc-cta-btn {
    margin-top: 40px; position: relative; z-index: 1;
    background: var(--gold); color: var(--navy-d);
    border: none; padding: 15px 40px;
    border-radius: 8px; font-size: 15px; font-weight: 700;
    cursor: pointer; letter-spacing: .3px;
    transition: background .2s, transform .2s;
    font-family: 'DM Sans', sans-serif;
  }
  .sgc-cta-btn:hover { background: #e5920a; transform: translateY(-2px); }

  /* ── REGISTRATION SECTION ── */
  .sgc-reg {
    background: var(--navy-d);
    padding: 60px 20px 80px;
  }
  .sgc-reg-inner { max-width: 700px; margin: 0 auto; }
  .sgc-reg-heading {
    text-align: center; font-size: 22px; font-weight: 700;
    color: var(--white); margin-bottom: 6px;
    font-family: 'Playfair Display', serif;
  }
  .sgc-reg-heading em { font-style: italic; color: var(--gold); }
  .sgc-reg-sub {
    text-align: center; font-size: 13px; color: var(--mute); margin-bottom: 40px;
  }

  /* ── FORM CARD ── */
  .sgc-card {
    background: var(--navy);
    border: 1px solid rgba(252,163,17,.15);
    border-radius: 14px; padding: 36px 32px;
  }
  .sgc-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .sgc-form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
  .sgc-label {
    font-size: 11px; font-weight: 600;
    color: rgba(252,163,17,.8);
    text-transform: uppercase; letter-spacing: .7px;
  }
  .sgc-optional { color: rgba(255,255,255,.25); font-size: 10px; font-weight: 400; margin-left: 4px; text-transform: none; }
  .sgc-input, .sgc-select {
    background: var(--navy-d);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 8px; padding: 12px 15px;
    color: var(--white); font-size: 14px;
    outline: none; transition: border-color .2s;
    width: 100%; font-family: 'DM Sans', sans-serif;
    -webkit-appearance: none; appearance: none;
  }
  .sgc-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23FCA311'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px; cursor: pointer;
  }
  .sgc-input:focus, .sgc-select:focus { border-color: var(--gold); background: #0f1828; }
  .sgc-input::placeholder { color: rgba(255,255,255,.2); }
  .sgc-select option { background: #0d1728; color: #fff; }

  /* ── BUTTONS ── */
  .sgc-next-btn {
    width: 100%; margin-top: 6px;
    background: var(--gold); color: var(--navy-d);
    border: none; padding: 14px;
    border-radius: 8px; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: background .2s;
    font-family: 'DM Sans', sans-serif; letter-spacing: .3px;
  }
  .sgc-next-btn:hover { background: #e5920a; }
  .sgc-back-btn {
    width: 100%; margin-top: 10px;
    background: transparent; color: var(--mute);
    border: 1px solid rgba(255,255,255,.1);
    padding: 13px; border-radius: 8px;
    font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all .2s;
    font-family: 'DM Sans', sans-serif;
  }
  .sgc-back-btn:hover { border-color: var(--gold); color: var(--gold); }

  /* ── PACKAGES ── */
  .sgc-pkg-section { margin-bottom: 24px; }
  .sgc-pkg-title {
    font-size: 11px; font-weight: 700; color: var(--gold);
    text-transform: uppercase; letter-spacing: 1px;
    margin-bottom: 12px; padding-bottom: 8px;
    border-bottom: 1px solid rgba(252,163,17,.15);
  }
  .sgc-pkg-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px;
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 9px; margin-bottom: 8px;
    cursor: pointer; transition: all .2s;
    position: relative;
  }
  .sgc-pkg-item:hover { border-color: rgba(252,163,17,.3); background: var(--gold-dim); }
  .sgc-pkg-item.selected { border-color: var(--gold); background: var(--gold-dim); }
  .sgc-pkg-item.selected::before {
    content: ''; position: absolute;
    left: 0; top: 0; bottom: 0; width: 3px;
    background: var(--gold); border-radius: 9px 0 0 9px;
  }
  .sgc-pkg-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
  .sgc-pkg-radio {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,.2);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all .2s;
  }
  .sgc-pkg-item.selected .sgc-pkg-radio { border-color: var(--gold); background: var(--gold); }
  .sgc-pkg-radio-dot {
    width: 7px; height: 7px; background: var(--navy-d); border-radius: 50%;
  }
  .sgc-pkg-name { font-size: 14px; font-weight: 500; color: var(--white); }
  .sgc-pkg-desc { font-size: 12px; color: var(--mute); margin-top: 2px; }

  /* ── PKG RIGHT (price + qty) ── */
  .sgc-pkg-right {
    display: flex; align-items: center; gap: 12px; flex-shrink: 0;
  }
  .sgc-pkg-price { font-size: 15px; font-weight: 700; color: var(--gold); min-width: 56px; text-align: right; }
  .sgc-pkg-subtotal {
    font-size: 11px; color: var(--mute); margin-top: 2px; text-align: right;
  }

  /* ── QUANTITY COUNTER ── */
  .sgc-qty {
    display: flex; align-items: center; gap: 0;
    background: var(--navy-d);
    border: 1px solid rgba(255,255,255,.15);
    border-radius: 7px; overflow: hidden;
    flex-shrink: 0;
  }
  .sgc-qty-btn {
    width: 30px; height: 30px;
    background: transparent; border: none;
    color: var(--gold); font-size: 16px; font-weight: 700;
    cursor: pointer; transition: background .15s;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Sans', sans-serif;
    flex-shrink: 0;
  }
  .sgc-qty-btn:hover { background: var(--gold-dim); }
  .sgc-qty-btn:disabled { color: rgba(255,255,255,.2); cursor: default; }
  .sgc-qty-btn:disabled:hover { background: transparent; }
  .sgc-qty-val {
    width: 32px; text-align: center;
    font-size: 14px; font-weight: 600; color: var(--white);
    border-left: 1px solid rgba(255,255,255,.1);
    border-right: 1px solid rgba(255,255,255,.1);
    line-height: 30px;
    flex-shrink: 0;
  }

  /* ── ADDONS ── */
  .sgc-addon-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px;
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 9px; margin-bottom: 8px;
    cursor: pointer; transition: all .2s;
  }
  .sgc-addon-item:hover { border-color: rgba(252,163,17,.25); }
  .sgc-addon-item.selected { border-color: rgba(252,163,17,.5); background: var(--gold-dim); }
  .sgc-addon-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
  .sgc-addon-check {
    width: 18px; height: 18px; border-radius: 4px;
    border: 2px solid rgba(255,255,255,.2);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 11px; font-weight: 700;
    transition: all .2s; color: transparent;
  }
  .sgc-addon-item.selected .sgc-addon-check { background: var(--gold); border-color: var(--gold); color: var(--navy-d); }
  .sgc-addon-name { font-size: 14px; font-weight: 500; color: var(--white); }
  .sgc-addon-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
  .sgc-addon-price { font-size: 14px; font-weight: 600; color: var(--gold); min-width: 56px; text-align: right; }
  .sgc-addon-subtotal { font-size: 11px; color: var(--mute); margin-top: 2px; text-align: right; }

  /* ── TOTAL BAR ── */
  .sgc-total-bar {
    background: var(--navy-d);
    border: 1px solid rgba(252,163,17,.2);
    border-radius: 9px; padding: 16px 18px;
    margin-top: 20px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .sgc-total-label { font-size: 13px; color: var(--mute); }
  .sgc-total-breakdown { font-size: 11px; color: rgba(255,255,255,.25); margin-top: 3px; max-width: 350px; line-height: 1.5; }
  .sgc-total-amount { font-size: 26px; font-weight: 800; color: var(--gold); flex-shrink: 0; }

  /* ── REVIEW ── */
  .sgc-review-section { margin-bottom: 22px; }
  .sgc-review-title {
    font-size: 11px; font-weight: 700; color: var(--gold);
    text-transform: uppercase; letter-spacing: 1px;
    margin-bottom: 10px; padding-bottom: 8px;
    border-bottom: 1px solid rgba(252,163,17,.15);
  }
  .sgc-review-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .sgc-review-item {
    padding: 10px 14px; background: var(--navy-d);
    border-radius: 7px; border: 1px solid rgba(255,255,255,.06);
  }
  .sgc-review-label { font-size: 10px; color: rgba(252,163,17,.6); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
  .sgc-review-value { font-size: 13px; font-weight: 500; color: var(--white); }
  .sgc-pkg-summary {
    padding: 14px 16px; background: var(--gold-dim);
    border: 1px solid rgba(252,163,17,.2);
    border-radius: 8px; margin-bottom: 6px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .sgc-pkg-summary-name { font-size: 14px; font-weight: 600; color: var(--gold); }
  .sgc-pkg-summary-meta { font-size: 12px; color: var(--mute); margin-top: 3px; }
  .sgc-pkg-summary-price { font-size: 15px; font-weight: 700; color: var(--gold); flex-shrink: 0; margin-left: 12px; }

  /* ── COMPLETE BTN ── */
  .sgc-complete-btn {
    width: 100%; background: var(--gold); color: var(--navy-d);
    border: none; padding: 16px;
    border-radius: 8px; font-size: 15px; font-weight: 800;
    cursor: pointer; transition: all .2s; margin-top: 16px;
    font-family: 'DM Sans', sans-serif; letter-spacing: .3px;
  }
  .sgc-complete-btn:hover { background: #e5920a; transform: translateY(-1px); }

  /* ── DONE SCREEN ── */
  .sgc-done { text-align: center; padding: 16px 0 8px; }
  .sgc-done-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: var(--gold-dim); border: 2px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px; font-size: 28px; color: var(--gold);
  }
  .sgc-done-title {
    font-size: 24px; font-weight: 800; color: var(--white);
    margin-bottom: 8px; font-family: 'Playfair Display', serif;
  }
  .sgc-done-title em { font-style: italic; color: var(--gold); }
  .sgc-done-sub { font-size: 14px; color: var(--mute); max-width: 380px; margin: 0 auto; line-height: 1.75; }
  .sgc-done-ref {
    margin-top: 28px; padding: 18px 22px;
    background: var(--navy-d); border-radius: 10px;
    border: 1px solid rgba(252,163,17,.2); text-align: left;
  }
  .sgc-done-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,.05);
  }
  .sgc-done-row:last-child { border-bottom: none; }
  .sgc-done-rlabel { font-size: 12px; color: var(--mute); }
  .sgc-done-rvalue { font-size: 13px; font-weight: 600; color: var(--white); }
  .sgc-done-total { font-size: 22px; font-weight: 800; color: var(--gold); }

  /* ── RESPONSIVE ── */
  @media (max-width: 620px) {
    .sgc-hero { padding: 60px 20px 70px; }
    .sgc-stats { gap: 24px; }
    .sgc-card { padding: 22px 16px; }
    .sgc-form-row { grid-template-columns: 1fr; }
    .sgc-review-grid { grid-template-columns: 1fr; }
    .sgc-total-bar { flex-direction: column; gap: 10px; text-align: center; }
    .sgc-pkg-item { flex-wrap: wrap; gap: 10px; }
    .sgc-pkg-right { width: 100%; justify-content: flex-end; }
  }
`;

export default function SignatureConferenceRegistration() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fname: "", lname: "", email: "", phone: "",
    country: "", desig: "", region: "", conference: "",
  });
  // pkgQtys: { [id]: quantity }  — selected if qty > 0
  const [pkgQtys, setPkgQtys] = useState({});
  // addonQtys: { [id]: quantity } — selected if qty > 0
  const [addonQtys, setAddonQtys] = useState({});
  const [errors, setErrors] = useState({});

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (field === "region") setForm((prev) => ({ ...prev, region: value, conference: "" }));
  };

  const setPkgQty = (id, delta) => {
    setPkgQtys((prev) => {
      const cur = prev[id] || 0;
      const next = Math.max(0, cur + delta);
      return { ...prev, [id]: next };
    });
  };

  const setAddonQty = (id, delta) => {
    setAddonQtys((prev) => {
      const cur = prev[id] || 0;
      const next = Math.max(0, cur + delta);
      return { ...prev, [id]: next };
    });
  };

  // All packages combined
  const allPackages = [...IN_PERSON_PACKAGES, ...VIRTUAL_PACKAGES];

  // Selected packages with qty > 0
  const selectedPkgs = allPackages.filter((p) => (pkgQtys[p.id] || 0) > 0);
  const selectedAddons = ADDONS.filter((a) => (addonQtys[a.id] || 0) > 0);

  const pkgTotal = selectedPkgs.reduce((s, p) => s + p.price * (pkgQtys[p.id] || 0), 0);
  const addonTotal = selectedAddons.reduce((s, a) => s + a.price * (addonQtys[a.id] || 0), 0);
  const total = pkgTotal + addonTotal;

  const breakdownParts = [
    ...selectedPkgs.map((p) => `${p.name} x${pkgQtys[p.id]} $${p.price * pkgQtys[p.id]}`),
    ...selectedAddons.map((a) => `${a.name} x${addonQtys[a.id]} $${a.price * addonQtys[a.id]}`),
  ];
  const breakdown = breakdownParts.length > 0 ? breakdownParts.join(" + ") : "No items selected";

  const validateStep1 = () => {
    const e = {};
    if (!form.fname.trim()) e.fname = "Required";
    if (!form.lname.trim()) e.lname = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.country) e.country = "Required";
    if (!form.desig.trim()) e.desig = "Required";
    if (!form.region) e.region = "Required";
    if (!form.conference) e.conference = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext1 = () => { if (validateStep1()) setStep(2); };
  const handleNext2 = () => {
    if (selectedPkgs.length === 0) { alert("Please select at least one package."); return; }
    setStep(3);
  };
  const handleComplete = () => setStep(4);

  const scrollToReg = () => {
    document.getElementById("sgc-register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="sgc-root">

        {/* ── HERO ── */}
        <section className="sgc-hero">
          <div className="sgc-badge">
            <span className="sgc-badge-dot" />
            Annual Global Summit 2025
          </div>
          <h1 className="sgc-hero-title">
            Signature<br /><em>Global Conference</em>
          </h1>
          <div className="sgc-divider" />
          <p className="sgc-hero-sub">
            Where visionaries converge. Connect with world-class leaders, innovators,
            and changemakers across four continents.
          </p>
          <div className="sgc-stats">
            {[["50+","Speakers"],["4","Regions"],["2,000+","Attendees"],["3","Days"]].map(([n,l]) => (
              <div key={l}>
                <div className="sgc-stat-n">{n}</div>
                <div className="sgc-stat-l">{l}</div>
              </div>
            ))}
          </div>
          <div>
            <button className="sgc-cta-btn" onClick={scrollToReg}>
              Register Now →
            </button>
          </div>
        </section>

        {/* ── REGISTRATION ── */}
        <section className="sgc-reg" id="sgc-register">
          <div className="sgc-reg-inner">
            <div className="sgc-reg-heading">
              Complete Your <em>Registration</em>
            </div>
            <p className="sgc-reg-sub">3 simple steps to secure your spot at the conference</p>

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div className="sgc-card">
                <div className="sgc-form-row">
                  <FormGroup label="First Name" error={errors.fname}>
                    <input className="sgc-input" placeholder="John"
                      value={form.fname} onChange={(e) => updateForm("fname", e.target.value)} />
                  </FormGroup>
                  <FormGroup label="Last Name" error={errors.lname}>
                    <input className="sgc-input" placeholder="Smith"
                      value={form.lname} onChange={(e) => updateForm("lname", e.target.value)} />
                  </FormGroup>
                </div>
                <FormGroup label="Email Address" error={errors.email}>
                  <input className="sgc-input" type="email" placeholder="john@company.com"
                    value={form.email} onChange={(e) => updateForm("email", e.target.value)} />
                </FormGroup>
                <FormGroup label={<>Phone <span className="sgc-optional">(optional)</span></>}>
                  <input className="sgc-input" type="tel" placeholder="+1 (555) 000-0000"
                    value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} />
                </FormGroup>
                <div className="sgc-form-row">
                  <FormGroup label="Country" error={errors.country}>
                    <select className="sgc-select" value={form.country}
                      onChange={(e) => updateForm("country", e.target.value)}>
                      <option value="">Select Country</option>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </FormGroup>
                  <FormGroup label="Designation" error={errors.desig}>
                    <input className="sgc-input" placeholder="e.g. CEO, CTO, Director"
                      value={form.desig} onChange={(e) => updateForm("desig", e.target.value)} />
                  </FormGroup>
                </div>
                <div className="sgc-form-row">
                  <FormGroup label="Region" error={errors.region}>
                    <select className="sgc-select" value={form.region}
                      onChange={(e) => { updateForm("region", e.target.value); }}>
                      <option value="">Select Region</option>
                      {Object.keys(CONFERENCES).map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </FormGroup>
                  <FormGroup label="Conference" error={errors.conference}>
                    <select className="sgc-select" value={form.conference}
                      onChange={(e) => updateForm("conference", e.target.value)}
                      disabled={!form.region}>
                      <option value="">{form.region ? "Select Conference" : "Select Region First"}</option>
                      {(CONFERENCES[form.region] || []).map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </FormGroup>
                </div>
                <button className="sgc-next-btn" onClick={handleNext1}>
                  Next: Choose Package →
                </button>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <div className="sgc-card">
                <PkgSection
                  title="In-Person Passes"
                  packages={IN_PERSON_PACKAGES}
                  pkgQtys={pkgQtys}
                  onQtyChange={setPkgQty}
                />
                <PkgSection
                  title="Virtual Passes"
                  packages={VIRTUAL_PACKAGES}
                  pkgQtys={pkgQtys}
                  onQtyChange={setPkgQty}
                />

                <div className="sgc-pkg-section">
                  <div className="sgc-pkg-title">Add-ons</div>
                  {ADDONS.map((addon) => {
                    const qty = addonQtys[addon.id] || 0;
                    const selected = qty > 0;
                    return (
                      <div
                        key={addon.id}
                        className={`sgc-addon-item${selected ? " selected" : ""}`}
                        onClick={(e) => {
                          // Only toggle if not clicking the qty buttons
                          if (e.target.closest(".sgc-qty")) return;
                          if (qty === 0) setAddonQty(addon.id, 1);
                        }}
                      >
                        <div className="sgc-addon-left">
                          <div
                            className="sgc-addon-check"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (qty > 0) setAddonQtys((prev) => ({ ...prev, [addon.id]: 0 }));
                              else setAddonQty(addon.id, 1);
                            }}
                          >
                            {selected ? "✓" : ""}
                          </div>
                          <div>
                            <div className="sgc-addon-name">{addon.name}</div>
                            {selected && qty > 1 && (
                              <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 2 }}>
                                ${addon.price} × {qty}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="sgc-addon-right">
                          {selected && (
                            <QuantityCounter
                              qty={qty}
                              onDecrement={() => setAddonQty(addon.id, -1)}
                              onIncrement={() => setAddonQty(addon.id, 1)}
                            />
                          )}
                          <div>
                            <div className="sgc-addon-price">
                              {selected && qty > 1
                                ? `$${(addon.price * qty).toLocaleString()}`
                                : `+$${addon.price}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="sgc-total-bar">
                  <div>
                    <div className="sgc-total-label">Total Amount</div>
                    <div className="sgc-total-breakdown">{breakdown}</div>
                  </div>
                  <div className="sgc-total-amount">${total.toLocaleString()}</div>
                </div>

                <button className="sgc-next-btn" style={{ marginTop: 16 }} onClick={handleNext2}>
                  Review Registration →
                </button>
                <button className="sgc-back-btn" onClick={() => setStep(1)}>← Back</button>
              </div>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <div className="sgc-card">
                <div className="sgc-review-section">
                  <div className="sgc-review-title">Personal Information</div>
                  <div className="sgc-review-grid">
                    {[
                      ["First Name", form.fname], ["Last Name", form.lname],
                      ["Email", form.email], ["Phone", form.phone || "—"],
                      ["Country", form.country], ["Designation", form.desig],
                      ["Region", form.region], ["Conference", form.conference],
                    ].map(([label, value]) => (
                      <div className="sgc-review-item" key={label}>
                        <div className="sgc-review-label">{label}</div>
                        <div className="sgc-review-value">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sgc-review-section" style={{ marginTop: 20 }}>
                  <div className="sgc-review-title">Selected Packages & Add-ons</div>
                  {selectedPkgs.map((p) => (
                    <div className="sgc-pkg-summary" key={p.id}>
                      <div>
                        <div className="sgc-pkg-summary-name">{p.name}</div>
                        <div className="sgc-pkg-summary-meta">
                          ${p.price.toLocaleString()} × {pkgQtys[p.id]}
                          {p.desc ? ` · ${p.desc}` : ""}
                        </div>
                      </div>
                      <div className="sgc-pkg-summary-price">
                        ${(p.price * pkgQtys[p.id]).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  {selectedAddons.map((a) => (
                    <div className="sgc-pkg-summary" key={a.id}
                      style={{ borderColor: "rgba(252,163,17,.15)" }}>
                      <div>
                        <div className="sgc-pkg-summary-name" style={{ fontSize: 13 }}>+ {a.name}</div>
                        <div className="sgc-pkg-summary-meta">
                          ${a.price} × {addonQtys[a.id]}
                        </div>
                      </div>
                      <div className="sgc-pkg-summary-price" style={{ fontSize: 13 }}>
                        ${(a.price * addonQtys[a.id]).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sgc-total-bar" style={{ marginTop: 4 }}>
                  <div>
                    <div className="sgc-total-label">Total Amount Due</div>
                    <div className="sgc-total-breakdown">{breakdown}</div>
                  </div>
                  <div className="sgc-total-amount">${total.toLocaleString()}</div>
                </div>

                <button className="sgc-complete-btn" onClick={handleComplete}>
                  Complete Registration
                </button>
                <button className="sgc-back-btn" onClick={() => setStep(2)}>← Back to Packages</button>
              </div>
            )}

            {/* ── DONE ── */}
            {step === 4 && (
              <div className="sgc-card">
                <div className="sgc-done">
                  <div className="sgc-done-icon">✓</div>
                  <div className="sgc-done-title">You're <em>Registered!</em></div>
                  <p className="sgc-done-sub">
                    Thank you for registering for{" "}
                    <strong style={{ color: "#fff" }}>Signature Global Conference 2025</strong>.
                    A confirmation has been sent to your email.
                  </p>
                  <div className="sgc-done-ref">
                    {[
                      ["Name", `${form.fname} ${form.lname}`],
                      ["Email", form.email],
                      ["Conference", form.conference],
                      ["Packages", selectedPkgs.map((p) => `${p.name} ×${pkgQtys[p.id]}`).join(", ")],
                    ].map(([l, v]) => (
                      <div className="sgc-done-row" key={l}>
                        <span className="sgc-done-rlabel">{l}</span>
                        <span className="sgc-done-rvalue">{v}</span>
                      </div>
                    ))}
                    {selectedAddons.map((a) => (
                      <div className="sgc-done-row" key={a.id}>
                        <span className="sgc-done-rlabel">{a.name}</span>
                        <span className="sgc-done-rvalue">×{addonQtys[a.id]}</span>
                      </div>
                    ))}
                    <div className="sgc-done-row" style={{ marginTop: 6 }}>
                      <span className="sgc-done-rlabel" style={{ fontWeight: 600, color: "var(--gold)" }}>Total Paid</span>
                      <span className="sgc-done-total">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </div>
    </>
  );
}

/* ── Quantity Counter ── */
function QuantityCounter({ qty, onDecrement, onIncrement }) {
  return (
    <div className="sgc-qty" onClick={(e) => e.stopPropagation()}>
      <button className="sgc-qty-btn" onClick={onDecrement} disabled={qty <= 0}>−</button>
      <span className="sgc-qty-val">{qty}</span>
      <button className="sgc-qty-btn" onClick={onIncrement}>+</button>
    </div>
  );
}

/* ── Helper Components ── */
function FormGroup({ label, error, children }) {
  return (
    <div className="sgc-form-group">
      <label className="sgc-label">{label}</label>
      {children}
      {error && <span style={{ fontSize: 11, color: "#f87171", marginTop: 2 }}>{error}</span>}
    </div>
  );
}

function PkgSection({ title, packages, pkgQtys, onQtyChange }) {
  return (
    <div className="sgc-pkg-section">
      <div className="sgc-pkg-title">{title}</div>
      {packages.map((pkg) => {
        const qty = pkgQtys[pkg.id] || 0;
        const selected = qty > 0;
        return (
          <div
            key={pkg.id}
            className={`sgc-pkg-item${selected ? " selected" : ""}`}
            onClick={(e) => {
              if (e.target.closest(".sgc-qty")) return;
              if (qty === 0) onQtyChange(pkg.id, 1);
            }}
          >
            <div className="sgc-pkg-left">
              <div
                className="sgc-pkg-radio"
                onClick={(e) => {
                  e.stopPropagation();
                  if (qty > 0) onQtyChange(pkg.id, -qty); // deselect all
                  else onQtyChange(pkg.id, 1);
                }}
              >
                {selected && <div className="sgc-pkg-radio-dot" />}
              </div>
              <div>
                <div className="sgc-pkg-name">{pkg.name}</div>
                {pkg.desc && <div className="sgc-pkg-desc">{pkg.desc}</div>}
                {selected && qty > 1 && (
                  <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 2 }}>
                    ${pkg.price.toLocaleString()} × {qty}
                  </div>
                )}
              </div>
            </div>
            <div className="sgc-pkg-right">
              {selected && (
                <QuantityCounter
                  qty={qty}
                  onDecrement={() => onQtyChange(pkg.id, -1)}
                  onIncrement={() => onQtyChange(pkg.id, 1)}
                />
              )}
              <div>
                <div className="sgc-pkg-price">
                  {selected && qty > 1
                    ? `$${(pkg.price * qty).toLocaleString()}`
                    : `$${pkg.price}`}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}