import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "./SGCLogo.png";

const LINKS = [
  { label: "HOME", path: "#home", type: "scroll" },
  { label: "ABOUT", path: "/about", type: "route" },
  { label: "GLOBAL HUBS", path: "#regions", type: "scroll", hasDropdown: true },
  { label: "CONTACT", path: "/contact", type: "route" },
];

const REGIONS_DROPDOWN = [
  { label: "Asia Signature Global Conferences", path: "/asia", type: "route" },
  { label: "Europe Signature Global Conferences", path: "/europe", type: "route" },
  { label: "North America Signature Global Conferences", path: "/northamerica", type: "route" },
  { label: "USA Signature Global Conference", path: "/usa", type: "route" }, // ✅ FIX
];

const Navbar = () => {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [regionsOpen, setRegionsOpen] = useState(false);
  const [active, setActive] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      document.querySelectorAll("section[id]").forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 100) {
          setActive(`#${sec.id}`);
        }
      });
    };

    const onResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
        setRegionsOpen(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // 🔥 Unified Navigation Handler
  const handleNav = (e, link) => {
    setMenuOpen(false);
    setRegionsOpen(false);

    if (link.type === "scroll") {
      e.preventDefault();

      const el = document.querySelector(link.path);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", link.path);
      } else {
        // If section not found → go to home first then scroll
        navigate("/");
        setTimeout(() => {
          document.querySelector(link.path)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else if (link.type === "route") {
      navigate(link.path);
    }
  };

  const toggleRegions = (e) => {
    if (isMobile) {
      e.preventDefault();
      setRegionsOpen((v) => !v);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${menuOpen ? "open" : ""}`}>
      <div className="nav-inner">

        {/* LOGO */}
        <div className="logo" onClick={(e) => handleNav(e, LINKS[0])}>
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="brand-text">
            Signature<br className="brand-break" />
            <span className="brand-highlight">Global Conferences</span>
          </span>
        </div>


        {/* DESKTOP */}
        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.label} className="nav-item">

              {link.hasDropdown ? (
                <div
                  className="dropdown-wrapper"
                  onMouseEnter={() => !isMobile && setRegionsOpen(true)}
                  onMouseLeave={() => !isMobile && setRegionsOpen(false)}
                >
                  <a
                    href={link.path}
                    className={`link ${regionsOpen ? "open" : ""}`}
                    onClick={toggleRegions}
                  >
                    {link.label}
                  </a>

                  <ul className={`dropdown-menu ${regionsOpen ? "show" : ""}`}>
                    {REGIONS_DROPDOWN.map((sub) => (
                      <li key={sub.label}>
                        <a
                          href={sub.path}
                          className="dropdown-item"
                          onClick={(e) => handleNav(e, sub)}
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : link.type === "route" ? (
                <span className="link" onClick={(e) => handleNav(e, link)}>
                  {link.label}
                </span>
              ) : (
                <a
                  href={link.path}
                  className={`link ${active === link.path ? "active" : ""}`}
                  onClick={(e) => handleNav(e, link)}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* RIGHT */}
        <div className="nav-right">
          <span className="cta" onClick={(e) => handleNav(e, { path: "/register", type: "route" })}>
            Register
          </span>

          <button className="ham" onClick={() => setMenuOpen((v) => !v)}>
            {[1, 2, 3].map((i) => (
              <span key={i} className={`line ${menuOpen ? "open" : ""}`} />
            ))}
          </button>
        </div>
      </div>

      {/* MOBILE */}
      <div className={`mobile ${menuOpen ? "show" : ""}`}>
        {LINKS.map((link) => (
          <div key={link.label} className="mobile-item">

            {link.hasDropdown ? (
              <>
                <a href={link.path} className="m-link" onClick={toggleRegions}>
                  {link.label}
                </a>

                <ul className={`mobile-dropdown ${regionsOpen ? "show" : ""}`}>
                  {REGIONS_DROPDOWN.map((sub) => (
                    <li key={sub.label}>
                      <a
                        href={sub.path}
                        className="m-dropdown-item"
                        onClick={(e) => handleNav(e, { ...sub, type: "scroll" })}
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <span className="m-link" onClick={(e) => handleNav(e, link)}>
                {link.label}
              </span>
            )}
          </div>
        ))}

        <span className="m-cta" onClick={(e) => handleNav(e, { path: "#register", type: "scroll" })}>
          Register
        </span>
      </div>
    </nav>
  );
};

export default Navbar;