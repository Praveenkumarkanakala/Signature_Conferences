import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from './ScrollToTop';
import { matchPath } from 'react-router-dom';
import "./App.css"

import Navbar from "./Components/Navbar/navbar";
import Footer from "./Components/Footer/footer";
import CustomCursor from "./Components/Cursor/cursor";

import Home from "./Pages/Home/homepage";
import ContactPage from "./Pages/Contact/contact";
import Aboutpage from "./Pages/About/about";
import Register from "./Pages/Register/register";
import PrivacyPolicy from "./Pages/Policy/policy";
import Termsandconditions from "./Pages/Termsandconditions/terms";
import FAQ from "./Components/FAQ/faq";

// USA Region Pages
import USAHome from "./Regions/USA/Landingpage/homepage";
import UScontact from "./Regions/USA/contact/contact";
import USabout from "./Regions/USA/aboutus/aboutus";
import USevents from "./Regions/USA/events/events";
import USinsidepage from "./Regions/USA/events/individual_eventpage";
import USgallery from "./Regions/USA/gallery/gallery";
import USregister from "./Regions/USA/register/register";
import USspeakers from "./Regions/USA/speakers/Speakers";

// EUROPE Region Pages
import Europehome from "./Regions/EUROPE/Landingpage/eurohome";
import Eurogallery from "./Regions/EUROPE/gallery/gallery";
import Euroabout from "./Regions/EUROPE/aboutus/aboutus";
import Euroregister from "./Regions/EUROPE/register/register";
import Eurocontact from "./Regions/EUROPE/contact/contact";
import Eurospekers from "./Regions/EUROPE/speakers/Speakers";
import Euroevents from "./Regions/EUROPE/events/events";
import Euroinsidepage from "./Regions/EUROPE/events/individual_eventpage";
// import EuropeSpeakers  from "./Regions/EUROPE/speakers/tempspeakers";

// NORTH AMERICA Region Pages
import NorthamericaHome from "./Regions/NORTH AMERICA/NAHome/Nahome";
import NAabout from "./Regions/NORTH AMERICA/aboutus/aboutus";
import NAcontact from "./Regions/NORTH AMERICA/contact/contact";
import NAgallery from "./Regions/NORTH AMERICA/gallery/gallery";
import NAregister from "./Regions/NORTH AMERICA/Register/register";
import NAspeakers from "./Regions/NORTH AMERICA/speakers/Speakers";
import NAevents from  "./Regions/NORTH AMERICA/events/events";
import EventDetail from "./Regions/NORTH AMERICA/events/individual_eventpage";

// ASIA Region Pages
import Asiahome from "./Regions/ASIA/Home/asia";
import AsiaRegister from "./Regions/ASIA/Register/asiaregister";
import ASGCabout from "./Regions/ASIA/AboutASGC/asgcabout";
import Asiacontact from "./Regions/ASIA/Contact/contact";
import AsiaEvents from "./Regions/ASIA/events/events";
import AsiaEventDetail  from "./Regions/ASIA/events/individual_eventpage";
import AsiaGallery from "./Regions/ASIA/gallery/gallery"
import AsiaSpeakers from "./Regions/ASIA/speakers/Speakers";

function LayoutWrapper({ children }) {
  const location = useLocation();
  
  const hideLayoutPaths = [
    "/usa", "/usa-events", "/usa-speakers", "/usa-gallery", "/usa-about", "/usa-contact", "/usa-register", "/usa-events/:id",
     "/europe", "/europe-gallery", "/europe-about","/europe-register", "/europe-contact","/europe-speakers" , "/europe-events", "/europe-events/:id",
    "/asia", "/asiaregister", "/aboutasgc","/asiacontact", "/asiaevents","/asiaevents/:id" ,"/asiagallery", "/asiaspeakers",
    "/northamerica","/na-about", "/na-events", "/na-events/:id", "/na-contact", "/na-gallery", "/na-register", "/na-speakers",  

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
          <Route path="/usa-events/:id" element={<USinsidepage />} />
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
          <Route path="/europe-events/:id" element={<Euroinsidepage />} />
          
          <Route path="/northamerica" element={<NorthamericaHome />} />
          <Route path="/na-about" element={<NAabout />} />
          <Route path="/na-events" element={<NAevents />} />
          <Route path="/na-events/:id" element={<EventDetail/>}/>
          <Route path="/na-contact" element={<NAcontact />} />
          <Route path="/na-gallery" element={<NAgallery />} />
          <Route path="/na-register" element={<NAregister />} />
          <Route path="/na-speakers" element={<NAspeakers />} />


          <Route path="/asia" element={<Asiahome />} />
          <Route path="/asiaregister" element={<AsiaRegister />} />
          <Route path="/aboutasgc" element={<ASGCabout />} />
          <Route path="/asiacontact" element={<Asiacontact />} />
          <Route path="/asiaevents" element={<AsiaEvents/>}/>
          <Route path="/asiaevents/:id" element={<AsiaEventDetail/>}/>
          <Route  path="/asiagallery" element={<AsiaGallery/>}/>
          <Route path="/asiaspeakers" element={<AsiaSpeakers />} /> 


        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;