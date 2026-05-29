import React, { useState, useRef, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Html, Grid } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import "./homepage.css";

import teamPhoto from "./image.png";
import image1 from "./newimg.jpg";
import image2 from "./newimg1.jpg";
import { supabase } from "../../lib/supabase.jsx";
import mapData from "./mapBase64.json";
import SEO from "../../Components/SEO.jsx";

/* ─── CAMERA VIEWS SEQUENCE ────────────────────── */
const cameraViews = {
  0: { position: [-4.0, 0.0, 21.0], target: [-4.0, 0.0, 0], fov: 45 },
  1: { position: [1.5, -0.5, 14.5], target: [1.5, 0.5, 0],  fov: 45 },
  2: { position: [-3.5, 2.0, 9.5],  target: [-3.0, 3.1, 0], fov: 40 },
  3: { position: [-7.5, 1.0, 12.0], target: [-8.0, 2.0, 0], fov: 42 },
  4: { position: [-9.5, 1.6, 9.5],  target: [-9.5, 2.3, 0], fov: 40 },
  5: { position: [-4.0, 0.0, 22.0], target: [-4.0, 0.0, 0], fov: 45 },
};

const cameraViewsMobile = {
  0: { position: [0.0, -2.0, 26.0], target: [0.0, 0.0, 0],  fov: 60 },
  1: { position: [7.5, -0.5, 15.0], target: [7.5, 0.5, 0],  fov: 65 },
  2: { position: [0.5,  2.0, 11.0], target: [0.5, 3.1, 0],  fov: 55 },
  3: { position: [-4.0, 1.0, 14.0], target: [-4.5, 1.8, 0], fov: 58 },
  4: { position: [-6.0, 1.6, 11.0], target: [-6.0, 2.3, 0], fov: 55 },
  5: { position: [0.0, -2.0, 28.0], target: [0.0, 0.0, 0],  fov: 60 },
};

/* ─── REGIONS & CITIES DATA ──────────────────────── */
const regionData = [
  {
    id: 1,
    name: "Asia-Pacific",
    color: "#990000",
    cities: [
      { name: "Tokyo",     pos: [9.3,  2.4, 0], offset: [110, -90], landmark: "Tokyo Tower", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80" },
      { name: "Dubai",     pos: [3.7,  1.7, 0], offset: [-110, -80], landmark: "Burj Khalifa", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
      { name: "Melbourne", pos: [9.7, -2.5, 0], offset: [120, 60], landmark: "Melbourne Arena", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400&q=80" },
    ],
    connections: [[0,1],[1,2],[2,0]],
  },
  {
    id: 2,
    name: "Europe",
    color: "#d4a55a",
    cities: [
      { name: "Berlin", pos: [0.9, 3.5, 0], offset: [120, -70], landmark: "Brandenburg Gate", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&q=80" },
      { name: "Rome",   pos: [0.8, 2.8, 0], offset: [90, 80], landmark: "Colosseum", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80" },
      { name: "Paris",  pos: [0.2, 3.3, 0], offset: [-120, -60], landmark: "Eiffel Tower", image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&q=80" },
    ],
    connections: [[0,1],[1,2],[2,0]],
  },
  {
    id: 3,
    name: "North America",
    color: "#00fa9a",
    cities: [
      { name: "Toronto", pos: [-5.3, 2.9, 0], offset: [110, 50], landmark: "CN Tower", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80" },
      { name: "Ontario", pos: [-5.05,3.0, 0], offset: [-110, -80], landmark: "Innovation Hub", image: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?w=400&q=80" },
      { name: "Miami",   pos: [-5.4, 1.7, 0], offset: [-90, 80], landmark: "Miami Coast", image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&q=80" },
    ],
    connections: [[0,1],[1,2],[2,0]],
  },
  {
    id: 4,
    name: "United States",
    color: "#f0a500",
    cities: [
      { name: "New York",       pos: [-4.9, 2.7, 0], offset: [60, -40], landmark: "Statue of Liberty", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80" },
      { name: "Los Angeles",    pos: [-7.9, 2.3, 0], offset: [-50, 50], landmark: "Hollywood Sign", image: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?w=400&q=80" },
      { name: "San Francisco",  pos: [-8.2, 2.5, 0], offset: [-60, -40], landmark: "Golden Gate Bridge", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&q=80" },
      { name: "Texas",          pos: [-6.5, 2.0, 0], offset: [40, 50], landmark: "Energy Nexus", image: "https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?w=400&q=80" },
    ],
    connections: [[0,1],[1,2],[2,3],[3,0]],
  },
];

const stepContent = {
  0: { tagline: "GLOBAL SUMMIT NETWORK",      title: "Connecting Visionaries",     titleSub: "Across Continents",           desc: "Uniting industry leaders, researchers, and pioneers at world-class global conferences.",                                                         count: "196+ Global Events" },
  1: { tagline: "ASIA-PACIFIC SECTOR",        title: "Empowering Innovation",      titleSub: "In Asia-Pacific",             desc: "Fostering synergy between Eastern innovation hubs, connecting leaders across Tokyo, Dubai, and Melbourne.",                                    count: "42+ Active Conferences" },
  2: { tagline: "EUROPEAN CONNECTIONS",       title: "Innovation & Heritage",      titleSub: "In Europe",                   desc: "Exploring collaborative research, digital policy, and emerging trends across Berlin, Rome, and Paris.",                                        count: "38+ Active Conferences" },
  3: { tagline: "NORTH AMERICAN REGION",      title: "Driving Business",           titleSub: "In North America",            desc: "Unleashing bold discussions that define the next wave of innovation from Toronto to Miami.",                                                   count: "61+ Active Conferences" },
  4: { tagline: "UNITED STATES NODES",        title: "Epicenter of Influence",     titleSub: "In the United States",        desc: "Shaping industry agendas and energy-tech breakthroughs in NYC, Silicon Valley, LA, and Texas.",                                               count: "55+ Active Conferences" },
  5: { tagline: "SIGNATURE GLOBAL CONFERENCES", title: "Where Vision",             titleSub: "Meets the World",             desc: "Global conferences uniting innovators, leaders, researchers, and industry pioneers across every continent.",                                  count: "196+ Global Events" },
};

/* ─── STARS BACKGROUND ───────────────────────────── */
const StarsScene = ({ isMobile }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.012;
      ref.current.rotation.x += delta * 0.004;
    }
  });
  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={isMobile ? 150 : 500} factor={isMobile ? 12 : 18} saturation={0} fade speed={2} />
    </group>
  );
};

/* ─── AMBIENT SPACE DUST ─────────────────────────── */
const FloatingDust = ({ count = 220 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = [];
    for (let i = 0; i < count; i++) {
      a.push((Math.random() - 0.5) * 36, (Math.random() - 0.5) * 24, (Math.random() - 0.5) * 6);
    }
    return new Float32Array(a);
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.014;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00f0ff" size={0.04} sizeAttenuation transparent opacity={0.22} />
    </points>
  );
};

/* ─── DETAILED SOLID HOLOGRAPHIC MAP ─────────────── */
const SolidMap = ({ activeRegionColor }) => {
  const ref = useRef();
  
  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(mapData.base64);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }, []);

  const shader = useMemo(() => ({
    uniforms: {
      uMap:   { value: texture },
      uColor: { value: new THREE.Color("#4f46e5") },
      uTime:  { value: 0 },
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying float vWave;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float wave = sin(uTime * 1.5 + pos.x * 0.55 + pos.y * 0.85) * 0.05;
        pos.z += wave;
        vWave = wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uMap;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying float vWave;
      void main() {
        vec4 texColor = texture2D(uMap, vUv);
        float land = 1.0 - texColor.r; // Dark areas in base64 are land
        
        if (land < 0.2) discard;
        
        vec3 col = uColor + vec3(vWave * 0.8, vWave * 0.4, vWave * 1.0);
        gl_FragColor = vec4(col, land * 0.85);
      }
    `,
  }), [texture]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    ref.current.material.uniforms.uColor.value.lerp(new THREE.Color(activeRegionColor), 0.07);
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[24, 12, 128, 64]} />
      <shaderMaterial args={[shader]} transparent depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
};

/* ─── LOCATION MARKER ────────────────────────────── */
const Marker = ({ position, active, color }) => {
  const ringRef = useRef();
  useFrame((state) => {
    if (ringRef.current) {
      const s = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.14;
      ringRef.current.scale.set(s, s, 1);
    }
  });
  return (
    <group position={position}>
      <mesh>
        <circleGeometry args={[0.07, 16]} />
        <meshBasicMaterial color={active ? color : "#ffffff"} transparent opacity={active ? 1 : 0.35} />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.09, 0.13, 16]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.7 : 0.12} />
      </mesh>
    </group>
  );
};


/* ─── BEZIER CONNECTION PATH ─────────────────────── */
const ConnectionPath = ({ startPos, endPos, active, color }) => {
  const packetRef = useRef();
  // Reuse a single Vector3 per component — never allocate inside useFrame
  const _packetPos = useMemo(() => new THREE.Vector3(), []);

  const { linePositions, curve } = useMemo(() => {
    const s = new THREE.Vector3(...startPos);
    const e = new THREE.Vector3(...endPos);
    const mid = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5);
    mid.z += s.distanceTo(e) * 0.22;
    const c = new THREE.QuadraticBezierCurve3(s, mid, e);
    const pts = c.getPoints(26);
    const lp  = new Float32Array(pts.flatMap(p => [p.x, p.y, p.z]));
    return { linePositions: lp, curve: c };
  }, [startPos, endPos]);

  useFrame((state) => {
    if (!packetRef.current) return;
    if (!active) {
      packetRef.current.visible = false;
      return;
    }
    packetRef.current.visible = true;
    const t = (state.clock.getElapsedTime() * 0.7) % 1.0;
    // Use getPoint (not getPointAt) and write into pre-allocated vector — zero GC
    curve.getPoint(t, _packetPos);
    packetRef.current.position.copy(_packetPos);
  });

  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={active ? 0.38 : 0.06} />
      </line>
      {/* Always mounted — visibility toggled imperatively to avoid GPU stall on mount/unmount */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.045, 6, 6]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};

/* ─── WAVE PULSE RINGS ───────────────────────────── */
const WavePulse = ({ position, color, visible }) => {
  const r1 = useRef();
  const r2 = useRef();

  useFrame((state) => {
    // Skip all math if not visible — zero GPU cost when inactive
    if (!visible) {
      if (r1.current) r1.current.material.opacity = 0;
      if (r2.current) r2.current.material.opacity = 0;
      return;
    }
    const t = state.clock.getElapsedTime();
    if (r1.current) {
      const p = (t * 0.65) % 1;
      r1.current.scale.set(p * 4, p * 4, 1);
      r1.current.material.opacity = (1 - p) * 0.28;
    }
    if (r2.current) {
      const p = ((t * 0.65) + 0.5) % 1;
      r2.current.scale.set(p * 4, p * 4, 1);
      r2.current.material.opacity = (1 - p) * 0.28;
    }
  });

  return (
    <group position={[position[0], position[1], 0.01]}>
      {[r1, r2].map((ref, i) => (
        <mesh key={i} ref={ref}>
          <ringGeometry args={[0.85, 0.94, 24]} />
          <meshBasicMaterial color={color} transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
};

/* region centre lookup */
const regionCentre = {
  1: [7.6,  0.5],
  2: [0.6,  3.2],
  3: [-5.3, 2.5],
  4: [-6.9, 2.4],
};

/* ─── WORLD MAP SCENE ────────────────────────────── */
const WorldMapScene = ({ activeStep, isMobile, regionData }) => {
  const camTarget = useRef(new THREE.Vector3());
  const mouse     = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Optimize by reusing vectors to prevent garbage collection stuttering
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const baseTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const activeViews = isMobile ? cameraViewsMobile : cameraViews;
    const view = activeViews[activeStep] ?? activeViews[0];
    
    const px = mouse.current.x * 0.35;
    const py = mouse.current.y * 0.20;

    const targetX = view.position[0] + px;
    const targetY = view.position[1] + py;
    let targetZ = view.position[2];

    // --- DYNAMIC ARC LOGIC ---
    // Calculate 2D distance to the target destination
    const dx = targetX - state.camera.position.x;
    const dy = targetY - state.camera.position.y;
    const dist2D = Math.sqrt(dx * dx + dy * dy);
    
    // Zoom out (increase Z) proportionally to how far the camera has to travel.
    // This creates a parabolic swoop that prevents GPU frame dropping by moving the camera away from the map.
    targetZ += dist2D * 0.6;

    targetPos.set(targetX, targetY, targetZ);
    baseTarget.set(...view.target);

    // Slightly increased lerp multiplier since the arc makes the path much longer
    const lerpSpeed = delta * 1.2;

    state.camera.position.lerp(targetPos, lerpSpeed);
    camTarget.current.lerp(baseTarget, lerpSpeed);
    state.camera.lookAt(camTarget.current);

    // Instantly snap FOV instead of lerping it. 
    // Calling updateProjectionMatrix() every frame during a transition is the primary cause of frame drops!
    if (state.camera.fov !== view.fov) {
      state.camera.fov = view.fov;
      state.camera.updateProjectionMatrix();
    }
  });

  const activeColor = regionData.find(r => r.id === activeStep)?.color ?? "#8b5cf6";
  const isGlobal    = activeStep === 0 || activeStep === 5;

  return (
    <>
      <ambientLight intensity={1.6} />
      {/* Static light color — changing color every frame causes WebGL uniform flushes */}
      <directionalLight position={[5, 10, 10]} intensity={1.4} color="#ffffff" />
      <pointLight      position={[-10, 5, 5]}  intensity={0.9} color="#ffffff" />
      <fog attach="fog" args={["#0d1728", 10, 26]} />

      {/* Reduced particle count for better mobile performance */}
      <FloatingDust count={isMobile ? 60 : 140} />

      <SolidMap activeRegionColor={activeColor} />

      {/* Always render ALL region geometry — toggle visibility imperatively.
          This prevents mount/unmount GPU stalls on every region switch. */}
      {regionData.map((region) => {
        const isFocus  = activeStep === region.id;
        const isActive = isFocus || isGlobal;

        return (
          <group key={region.id}>
            {/* WavePulse always mounted, invisible when not focused */}
            {regionCentre[region.id] && (
              <WavePulse
                position={regionCentre[region.id]}
                color={region.color}
                visible={isFocus}
              />
            )}

            {region.cities.map((city) => (
              <group key={city.name}>
                <Marker position={city.pos} active={isFocus} color={region.color} />

                {/* Html overlay — only mount when focused to avoid DOM overhead,
                    but wrapped in a stable key so React doesn't thrash the DOM */}
                {isFocus && (
                  <Html
                    key={city.name}
                    position={[city.pos[0], city.pos[1], 0.1]}
                    distanceFactor={8}
                    center
                    zIndexRange={[100, 0]}
                    style={{ pointerEvents: 'none' }}
                  >
                    <div className="hud-card-wrapper" style={{
                      transform: `translate(${(city.offset[0] || 0) * (isMobile ? 0.6 : 1)}px, ${(city.offset[1] || 0) * (isMobile ? 0.6 : 1)}px)`
                    }}>
                      <div
                        className="hud-card"
                        style={{ borderColor: `${region.color}55`, boxShadow: `0 4px 18px ${region.color}28` }}
                      >
                        {city.image && <img src={city.image} alt={city.landmark} className="hud-card-image" loading="lazy" />}
                        <div className="hud-card-city">{city.name}</div>
                        <div className="hud-card-landmark">{city.landmark}</div>
                        <div className="hud-card-stat">SUMMIT NODE</div>
                      </div>
                    </div>
                  </Html>
                )}
              </group>
            ))}

            {/* Always render ConnectionPaths — active prop toggles packet visibility */}
            {region.connections.map(([si, ei], ci) => (
              <ConnectionPath
                key={ci}
                startPos={region.cities[si].pos}
                endPos={region.cities[ei].pos}
                active={isActive}
                color={region.color}
              />
            ))}
          </group>
        );
      })}

      {/* Global inter-region arcs — always mounted, active toggles opacity */}
      <ConnectionPath startPos={[-4.9, 2.7, 0]} endPos={[0.2, 3.3, 0]}  active={isGlobal} color="#a855f7" />
      <ConnectionPath startPos={[3.7,  1.7, 0]} endPos={[0.2, 3.3, 0]}  active={isGlobal} color="#3b82f6" />
      <ConnectionPath startPos={[9.3,  2.4, 0]} endPos={[-7.9, 2.3, 0]} active={isGlobal} color="#10b981" />
      <ConnectionPath startPos={[9.7, -2.5, 0]} endPos={[3.7,  1.7, 0]} active={isGlobal} color="#ec4899" />
    </>
  );
};

/* ─── REGION CARDS DATA ─────────────────────────── */
const regions = [
  { title: "Asia",          sub: "Signature Global Conferences", desc: "Where ancient wisdom meets tomorrow's innovation across the world's most dynamic continent.",      stat: "42+ Events", cls: "main-card-asia",     route: "/asia"         },
  { title: "Europe",        sub: "Signature Global Conferences", desc: "Bridging heritage and progress at the crossroads of culture, policy, and emerging technology.",      stat: "38+ Events", cls: "main-card-europe",   route: "/europe"       },
  { title: "North America", sub: "Signature Global Conferences", desc: "Driving bold conversations that define the future of business, innovation, and leadership.",         stat: "61+ Events", cls: "main-card-namerica", route: "/northamerica" },
  { title: "USA",           sub: "Signature Global Conferences", desc: "At the epicenter of global influence — where every summit shapes industries and reshapes agendas.",  stat: "55+ Events", cls: "main-card-usa",      route: "/usa"          },
];

/* ─── ICONS ─────────────────────────────────────── */
const GlobeIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
const ArrowIcon  = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>;
const CheckIcon  = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10l4.5 4.5L16 6" /></svg>;
const PlusIcon   = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" /></svg>;
const MinusIcon  = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="2" y1="8" x2="14" y2="8" /></svg>;
const ImageIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>;

/* ─── HUD STEP LABELS ────────────────────────────── */
const hudSteps = [
  { step: 0, label: "GLOBAL"    },
  { step: 1, label: "ASIA-PAC"  },
  { step: 2, label: "EUROPE"    },
  { step: 3, label: "N.AMERICA" },
  { step: 4, label: "USA"       },
];

/* ─── MAIN COMPONENT ────────────────────────────── */
export default function HomePage() {
  const [scrolled,        setScrolled]        = useState(false);
  const [isMobile,        setIsMobile]        = useState(false);
  const [explorerData,    setExplorerData]    = useState([]);
  const [activeId,        setActiveId]        = useState(null);
  const [activeCity,      setActiveCity]      = useState(null);
  const [mapPoints,       setMapPoints]       = useState([]);
  const [activeStep,      setActiveStep]      = useState(0);
  const [isAutoplay,      setIsAutoplay]      = useState(true);

  const regionsSectionRef = useRef(null);
  const navigate          = useNavigate();

  /* ── Load hero data from Supabase ── */
  const { data: homeHeroData, error: heroError } = useQuery({
    queryKey: ['homeHero'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("home_hero")
        .select("*")
        .order("step_id", { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  if (heroError) console.error("Error fetching home_hero:", heroError.message);

  const dynStepContent = useMemo(() => {
    if (!homeHeroData) return stepContent;
    const res = {};
    homeHeroData.forEach(r => {
      res[r.step_id] = {
        tagline: r.tagline,
        title: r.title,
        titleSub: r.title_sub,
        desc: r.description,
        // count: r.event_count
      };
    });
    return res;
  }, [homeHeroData]);

  const dynRegionData = useMemo(() => {
    if (!homeHeroData) return regionData;
    return homeHeroData.filter(r => r.step_id >= 1 && r.step_id <= 4).map(r => ({
      id: r.step_id,
      name: r.region_name,
      color: r.theme_color,
      cities: r.map_cities || [],
      connections: r.map_connections || []
    }));
  }, [homeHeroData]);

  /* ── Load world map from offline base64 ── */
  useEffect(() => {
    // Map points extraction removed since we now use SolidMap ShaderMaterial.
    // Setting a dummy state to clear loading dependencies if any exist elsewhere.
    setMapPoints([1]);
  }, []);

  /* ── Autoplay sequencer ── */
  useEffect(() => {
    if (!isAutoplay) return;
    // Reduced waiting time by 2 seconds (2000ms) as requested
    const delay = activeStep === 0 ? 2000 : activeStep === 5 ? 8000 : 5000;
    const t = setTimeout(() => {
      setActiveStep(prev => (prev === 5 ? 1 : prev + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [activeStep, isAutoplay]);

  /* ── Supabase regions_explorer ── */
  const { data: explorerQueryData, isLoading: explorerLoading } = useQuery({
    queryKey: ['regionsExplorer'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("regions_explorer")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data || [];
    }
  });

  useEffect(() => {
    if (explorerQueryData) {
      setExplorerData(explorerQueryData);
      if (explorerQueryData.length > 0 && !activeId) {
        setActiveId(explorerQueryData[0].region_id);
      }
    }
  }, [explorerQueryData]);

  const handleRegionClick = (id) => { setActiveId(id); setActiveCity(null); };

  const activeRegion = explorerData.find(r => r.region_id === activeId);
  const panelImage   = activeCity?.image              ?? activeRegion?.region_image      ?? "";
  const panelAlt     = activeRegion?.region_image_alt ?? "";
  const panelCaption = activeRegion?.region_caption   ?? "";
  const panelDesc    = activeRegion?.region_caption_desc ?? "";

  /* ── Responsive / scroll / observe ── */
  useEffect(() => {
    const chk = () => setIsMobile(window.innerWidth < 768);
    chk();
    window.addEventListener("resize", chk);
    return () => window.removeEventListener("resize", chk);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.querySelector(".main-page");
    if (!root) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("main-visible")),
      { threshold: 0.08 }
    );
    root.querySelectorAll(".main-observe").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToRegions = () => regionsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const goToAbout       = () => navigate("/about");
  const goToRegister    = () => navigate("/register");
  const goToRegion      = (route) => navigate(route);

  const features = [
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, title: "Executive Networking",      desc: "Build meaningful relationships with executives, founders, professionals, and global decision-makers in one powerful space.",                link: "Explore Networking"   },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M12 4c0 0 1.5 2 4 2s4-2 4-2v6c0 3.5-2.5 6-4 7-1.5-1-4-3.5-4-7V4z" /><path d="M3 10h4M5 8v4" /><circle cx="5" cy="18" r="3" /></svg>, title: "World-Class Speakers",        desc: "Gain insights from renowned keynote speakers, innovators, authors, and leaders shaping tomorrow's world.",                                  link: "Meet Our Speakers"    },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /><path d="M9 12.5l1.5 4.5 1.5-3 1.5 3 1.5-4.5" /></svg>,                   title: "Women Leadership Growth",   desc: "Empower women to lead with confidence, vision, and impact through mentorship, leadership sessions, and success strategies.",                link: "Explore Leadership"   },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /><circle cx="12" cy="12" r="4" /></svg>, title: "Innovation & Success",       desc: "Explore future trends, business innovation, entrepreneurship, and strategies for sustainable growth in a changing world.",                   link: "Discover Innovation"  },
  ];

  const currentColor = dynRegionData.find(r => r.id === activeStep)?.color ?? "#8b5cf6";
  const content      = dynStepContent[activeStep] ?? dynStepContent[0];

  /* ─── RENDER ──────────────────────────────────── */
  return (
    <div className="main-page" id="main-page">
      <SEO title="Home" />

      {/* ══ GLOBAL STARS BACKGROUND ══ */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Canvas
          eventSource={document.getElementById("main-page")}
          eventPrefix="client"
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={1}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <React.Suspense fallback={null}>
            <StarsScene isMobile={isMobile} />
          </React.Suspense>
        </Canvas>
      </div>

      {/* ══ HERO ══ */}
      <section className="main-hero" style={{ position: "relative", zIndex: 1 }}>

        {/* 3-D world map canvas */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Canvas
            camera={{ position: [0, 0, 16], fov: 45 }}
            dpr={1}
            gl={{ antialias: true, powerPreference: "high-performance" }}
          >
            <React.Suspense fallback={null}>
              <WorldMapScene activeStep={activeStep} isMobile={isMobile} regionData={dynRegionData} />
            </React.Suspense>
          </Canvas>
        </div>

        {/* Overlay text + HUD */}
        <div className="hero-grid" style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-content-col">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <div className="hero-tagline" style={{ color: currentColor }}>
                  {content.tagline}
                </div>
                <h1 style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}>
                  <span>{content.title}</span>
                  <br />{content.titleSub}
                </h1>
                <p style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}>
                  {content.desc}
                </p>

                {/* <div className="hero-event-badge" style={{ borderColor: `${currentColor}66`, color: currentColor }}>
                  <span className="hero-badge-dot" style={{ backgroundColor: currentColor }} />
                  {content.count}
                </div> */}

                <div className="hero-btns">
                  <button
                    className="main-btn main-btn-gold"
                    onClick={scrollToRegions}
                    style={{ background: currentColor, color: "#000", boxShadow: `0 4px 22px ${currentColor}55` }}
                  >
                    Explore Conferences <ArrowIcon />
                  </button>
                  <button className="main-btn main-btn-ghost" onClick={() => navigate("/register")}>
                    Become a speaker
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── HUD Console ── */}
            <div className="hud-console">
              <div className="hud-status">
                {/* <span className="hud-status-dot" style={{ backgroundColor: currentColor }} /> */}
                {/* <span className="hud-status-text">
                  {activeStep === 0 || activeStep === 5 ? "GLOBAL GRID ACTIVE" : `${dynRegionData.find(r => r.id === activeStep)?.name?.toUpperCase()} NODE ACTIVE`}
                </span> */}
              </div>
              <div className="hud-controls">
                {hudSteps.map(({ step, label }) => (
                  <button
                    key={step}
                    className={`hud-btn${activeStep === step ? " hud-btn--active" : ""}`}
                    onClick={() => { setActiveStep(step); setIsAutoplay(false); }}
                    style={{
                      borderColor: activeStep === step ? currentColor : "rgba(255,255,255,0.13)",
                      color:       activeStep === step ? currentColor : "#8da0be",
                    }}
                  >
                    {label}
                  </button>
                ))}
                <button
                  className="hud-play-btn"
                  onClick={() => setIsAutoplay(p => !p)}
                  style={{ borderColor: isAutoplay ? currentColor : "rgba(255,255,255,0.13)", color: isAutoplay ? currentColor : "#8da0be" }}
                >
                  {isAutoplay ? "⏸ PAUSE" : "▶ AUTO"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ REGION CARDS ══ */}
      <section className="main-regions" ref={regionsSectionRef}>
        <div className="main-container">
          <div className="main-section-head main-observe">
            <span className="main-eyebrow-row">
              <span className="main-eline" />Global Footprint<span className="main-eline" />
            </span>
            <h2 className="main-sec-title">Explore <span className="main-outline-gold">SGC</span> Regions</h2>
            <p className="main-sec-sub">Attend the regions based conferences</p>
          </div>
          <div className="main-cards-grid">
            {regions.map((r, i) => (
              <article className={`main-card ${r.cls} main-observe`} key={r.title} style={{ "--i": i }}>
                <span className="main-card-dot" />
                <div className="main-card-body"><h3>{r.title}</h3></div>
                <div className="main-card-footer">
                  <button className="main-card-btn" onClick={() => goToRegion(r.route)}>
                    Explore <ArrowIcon />
                  </button>
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
            <h2 className="main-sec-title main-left-align">About <span className="main-outline-gold">Us</span></h2>
            <p className="main-about-lead">
              Result: your trusted global platform for impactful conferences! We proudly create events that bring together visionary speakers, leaders, entrepreneurs, and innovators from around the world.
            </p>
            <p className="main-about-body">
              Signature Global Conferences (SGC) organizes region-based international conferences that connect people, ideas, and opportunities on one stage. We believe every event creates valuable partnerships and fresh perspectives.
              <br />
              Our team is dedicated to delivering exceptional conferences with seamless planning, engaging speakers, and professional execution. Your growth, visibility, and connections are our priority.
              We empower voices that inspire change and create lasting impact. Every conference is designed to build knowledge, collaboration, and success.
            </p>
            <ul className="main-check-list">
              {["Inspiring women & men speakers worldwide", "Business, leadership & innovation topics", "Region-based networking opportunities", "Trusted by global communities"].map(t => (
                <li key={t}><span className="main-chk"><CheckIcon /></span>{t}</li>
              ))}
            </ul>
            <button className="main-btn main-btn-gold" onClick={goToAbout}>Learn More <ArrowIcon /></button>
          </div>
          <div className="main-about-img-col main-observe main-slide-left">
            <div className="main-about-img-frame">
              <img src={teamPhoto} alt="Our Team" loading="lazy" />
            </div>
            <div className="main-corner-accent main-tl" />
            <div className="main-corner-accent main-br" />
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="main-fs-section">
        <div className="main-fs-container">
          <div className="main-fs-header">
            <h2 className="main-fs-title">Bringing Visionaries Together</h2>
            <p className="main-fs-sub">Bringing people under one roof to network, learn, and grow through world-class conferences.</p>
          </div>
          <div className="main-fs-grid">
            <div className="main-fs-img-card main-fs-img-large">
              <img src={image1} alt="Smart living room" loading="lazy" />
              <div className="main-fs-img-overlay" />
            </div>
            {features.slice(0, 2).map((f, i) => (
              <div key={i} className="main-fs-feat-card">
                <div className="main-fs-icon">{f.icon}</div>
                <h3 className="main-fs-feat-title">{f.title}</h3>
                <p className="main-fs-feat-desc">{f.desc}</p>
                <p className="main-fs-link">{f.link}</p>
              </div>
            ))}
            {features.slice(2, 4).map((f, i) => (
              <div key={i + 2} className="main-fs-feat-card">
                <div className="main-fs-icon">{f.icon}</div>
                <h3 className="main-fs-feat-title">{f.title}</h3>
                <p className="main-fs-feat-desc">{f.desc}</p>
                <p className="main-fs-link">{f.link}</p>
              </div>
            ))}
            <div className="main-fs-img-card main-fs-img-right">
              <img src={image2} alt="Smart thermostat" loading="lazy" />
              <div className="main-fs-img-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ REGIONS ACCORDION (Supabase) ══ */}
      <section className="main-re-section">
        <div className="main-re-container">
          <div className="main-re-header">
            <h2 className="main-re-title">REGIONS TO EXPLORE</h2>
          </div>

          {explorerLoading ? (
            <div className="main-re-loading">Loading regions…</div>
          ) : (
            <div className="main-re-body">
              <div className="main-re-image-panel">
                <div className="main-re-image-wrap">
                  <img key={panelImage} src={panelImage} alt={panelAlt} className="main-re-img" loading="lazy" />
                  <div className="main-re-img-overlay" />
                  <div className="main-re-img-caption">
                    <span className="main-re-caption-icon"><ImageIcon /></span>
                    <div>
                      <strong>{panelCaption}</strong>
                      <p>{panelDesc}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-re-accordion">
                {explorerData.map((r) => {
                  const isOpen = r.region_id === activeId;
                  return (
                    <div key={r.region_id} className={`main-re-item${isOpen ? " main-re-item--open" : ""}`}>
                      <button className="main-re-item-header" onClick={() => handleRegionClick(r.region_id)}>
                        <div className="main-re-item-left">
                          <span className="main-re-item-name">{r.region_name}</span>
                        </div>
                        <span className="main-re-item-toggle">
                          {isOpen ? <MinusIcon /> : <PlusIcon />}
                        </span>
                      </button>
                      <div className="main-re-item-body">
                        <div className="main-re-countries">
                          {(r.cities || []).map((city) => (
                            <span
                              key={city.name}
                              className={`main-re-country${activeCity?.name === city.name && isOpen ? " main-re-country--active" : ""}`}
                              onClick={() => setActiveCity(activeCity?.name === city.name ? null : city)}
                            >
                              {city.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="main-cta-banner">
        <div className="main-container">
          <div className="main-observe">
            <span className="main-eyebrow-row" style={{ justifyContent: "center" }}>
              <span className="main-eline" /> Don't Miss Out <span className="main-eline" />
            </span>
            <h2 className="main-sec-title">Reserve Your <span className="main-outline-gold">Seat</span> Today</h2>
            <p>Join thousands of global leaders at our upcoming conferences.<br />Early bird registrations now open.</p>
            <div className="main-cta-btns">
              <button className="main-btn main-btn-gold" onClick={goToRegister}>Register Now <ArrowIcon /></button>
              <button className="main-btn main-btn-ghost" onClick={scrollToRegions}>Explore Conferences <ArrowIcon /></button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

