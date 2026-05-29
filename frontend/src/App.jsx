import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from './ScrollToTop';
import { matchPath } from 'react-router-dom';
import "./App.css"

import Navbar from "./Components/Navbar/navbar";
import Footer from "./Components/Footer/footer";
import CustomCursor from "./Components/Cursor/cursor";

// Global Pages
const Home = lazy(() => import("./Pages/Home/homepage"));
const ContactPage = lazy(() => import("./Pages/Contact/contact"));
const Aboutpage = lazy(() => import("./Pages/About/about"));
const Register = lazy(() => import("./Pages/Register/register"));
const PrivacyPolicy = lazy(() => import("./Pages/Policy/policy"));
const Termsandconditions = lazy(() => import("./Pages/Termsandconditions/terms"));
const FAQ = lazy(() => import("./Components/FAQ/faq"));

// USA Region Pages
const USAHome = lazy(() => import("./Regions/USA/Landingpage/homepage"));
const UScontact = lazy(() => import("./Regions/USA/contact/contact"));
const USabout = lazy(() => import("./Regions/USA/aboutus/aboutus"));
const USevents = lazy(() => import("./Regions/USA/events/events"));
const USinsidepage = lazy(() => import("./Regions/USA/events/individual_eventpage"));
const USgallery = lazy(() => import("./Regions/USA/gallery/gallery"));
const USregister = lazy(() => import("./Regions/USA/register/register"));
const USspeakers = lazy(() => import("./Regions/USA/speakers/Speakers"));

// EUROPE Region Pages
const Europehome = lazy(() => import("./Regions/EUROPE/Landingpage/eurohome"));
const Eurogallery = lazy(() => import("./Regions/EUROPE/gallery/gallery"));
const Euroabout = lazy(() => import("./Regions/EUROPE/aboutus/aboutus"));
const Euroregister = lazy(() => import("./Regions/EUROPE/register/register"));
const Eurocontact = lazy(() => import("./Regions/EUROPE/contact/contact"));
const Eurospekers = lazy(() => import("./Regions/EUROPE/speakers/Speakers"));
const Euroevents = lazy(() => import("./Regions/EUROPE/events/events"));
const Euroinsidepage = lazy(() => import("./Regions/EUROPE/events/individual_eventpage"));

// NORTH AMERICA Region Pages
const NorthamericaHome = lazy(() => import("./Regions/NORTH AMERICA/NAHome/Nahome"));
const NAabout = lazy(() => import("./Regions/NORTH AMERICA/aboutus/aboutus"));
const NAcontact = lazy(() => import("./Regions/NORTH AMERICA/contact/contact"));
const NAgallery = lazy(() => import("./Regions/NORTH AMERICA/gallery/gallery"));
const NAregister = lazy(() => import("./Regions/NORTH AMERICA/Register/register"));
const NAspeakers = lazy(() => import("./Regions/NORTH AMERICA/speakers/Speakers"));
const NAevents = lazy(() => import("./Regions/NORTH AMERICA/events/events"));
const EventDetail = lazy(() => import("./Regions/NORTH AMERICA/events/individual_eventpage"));

// ASIA Region Pages
const Asiahome = lazy(() => import("./Regions/ASIA/Home/asia"));
const AsiaRegister = lazy(() => import("./Regions/ASIA/Register/asiaregister"));
const ASGCabout = lazy(() => import("./Regions/ASIA/AboutASGC/asgcabout"));
const Asiacontact = lazy(() => import("./Regions/ASIA/Contact/contact"));
const AsiaEvents = lazy(() => import("./Regions/ASIA/events/events"));
const AsiaEventDetail = lazy(() => import("./Regions/ASIA/events/individual_eventpage"));
const AsiaGallery = lazy(() => import("./Regions/ASIA/gallery/gallery"));
const AsiaSpeakers = lazy(() => import("./Regions/ASIA/speakers/Speakers"));

function LayoutWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let bgColor = "#0d1728"; // Default dark navy for homepage and global routes
    let isLight = false;

    if (path.startsWith("/usa")) {
      bgColor = "#f4f4f4";
      isLight = true;
    } else if (path.startsWith("/europe")) {
      bgColor = "#f5ede0";
      isLight = true;
    } else if (path.startsWith("/asia") || path.startsWith("/aboutasgc") || path.startsWith("/asiacontact") || path.startsWith("/asiaevents") || path.startsWith("/asiagallery") || path.startsWith("/asiaspeakers") || path.startsWith("/asiaregsiter")) {
      bgColor = "#160002";
      isLight = false;
    } else if (path.startsWith("/northamerica") || path.startsWith("/na-")) {
      bgColor = "#e8e4db";
      isLight = true;
    }

    // Update body background color dynamically to blend viewport scrollbar track
    document.body.style.backgroundColor = bgColor;

    // Set scrollbar adaptive colors on root html
    const root = document.documentElement;
    if (isLight) {
      root.style.setProperty("--scrollbar-thumb-color", "rgba(0, 0, 0, 0.15)");
      root.style.setProperty("--scrollbar-thumb-hover-color", "rgba(0, 0, 0, 0.45)");
    } else {
      root.style.setProperty("--scrollbar-thumb-color", "rgba(255, 255, 255, 0.15)");
      root.style.setProperty("--scrollbar-thumb-hover-color", "rgba(255, 255, 255, 0.45)");
    }
  }, [location.pathname]);
  
  const hideLayoutPaths = [
    "/usa", "/usa-events", "/usa-speakers", "/usa-gallery", "/usa-about", "/usa-contact", "/usa-register", "/usa-events/:slug",
     "/europe", "/europe-gallery", "/europe-about","/europe-register", "/europe-contact","/europe-speakers" , "/europe-events", "/europe-events/:slug",
    "/asia", "/asiaregsiter", "/aboutasgc","/asiacontact", "/asiaevents","/asiaevents/:slug" ,"/asiagallery", "/asiaspeakers",
    "/northamerica","/na-about", "/na-events", "/na-events/:slug", "/na-contact", "/na-gallery", "/na-register", "/na-speakers",  

  ];
  
const shouldHideLayout = hideLayoutPaths.some(path => 
  matchPath(path, location.pathname)
);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomCursor />
      
      <LayoutWrapper>
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#0d1728', color: '#fff', fontSize: '1.2rem', fontFamily: 'sans-serif' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/terms&conditions" element={<Termsandconditions />} />
            <Route path="/faq" element={<FAQ />} />
            
            <Route path="/usa" element={<USAHome />} />
            <Route path="/usa-contact" element={<UScontact />} />
            <Route path="/usa-about" element={<USabout />} />
            <Route path="/usa-events" element={<USevents />} />
            <Route path="/usa-events/:slug" element={<USinsidepage />} />
            <Route path="/usa-gallery" element={<USgallery />} />
            <Route path="/usa-register" element={<USregister />} />
            <Route path="/usa-speakers" element={<USspeakers />} />

            <Route path="/europe" element={<Europehome />}/>
            <Route path="/europe-gallery" element={<Eurogallery />} />
            <Route path="/europe-about" element={<Euroabout />} />
            <Route path="/europe-register" element={<Euroregister />} />
            <Route path="/europe-contact" element={<Eurocontact />} />
            <Route path="/europe-speakers" element={<Eurospekers />} />

            <Route path="/europe-events" element={<Euroevents />} />
            <Route path="/europe-events/:slug" element={<Euroinsidepage />} />
            
            <Route path="/northamerica" element={<NorthamericaHome />} />
            <Route path="/na-about" element={<NAabout />} />
            <Route path="/na-events" element={<NAevents />} />
            <Route path="/na-events/:slug" element={<EventDetail/>}/>
            <Route path="/na-contact" element={<NAcontact />} />
            <Route path="/na-gallery" element={<NAgallery />} />
            <Route path="/na-register" element={<NAregister />} />
            <Route path="/na-speakers" element={<NAspeakers />} />

            <Route path="/asia" element={<Asiahome />} />
            <Route path="/asiaregsiter" element={<AsiaRegister />} />
            <Route path="/aboutasgc" element={<ASGCabout />} />
            <Route path="/asiacontact" element={<Asiacontact />} />
            <Route path="/asiaevents" element={<AsiaEvents/>}/>
            <Route path="/asiaevents/:slug" element={<AsiaEventDetail/>}/>
            <Route  path="/asiagallery" element={<AsiaGallery/>}/>
            <Route path="/asiaspeakers" element={<AsiaSpeakers />} /> 
          </Routes>
        </Suspense>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;