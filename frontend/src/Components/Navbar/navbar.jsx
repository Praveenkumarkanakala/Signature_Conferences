import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "./SGCLogo.png";

const LINKS = [
  { label: "HOME",        path: "#home",    type: "scroll" },
  { label: "ABOUT",       path: "/about",   type: "route"  },
  { label: "GLOBAL HUBS", path: "#regions", type: "scroll", hasDropdown: true },
  { label: "CONTACT",     path: "/contact", type: "route"  },
];

const REGIONS_DROPDOWN = [
  { label: "Signature Asia Global Conferences",          path: "/asia",         type: "route" },
  { label: "Signature Europe Global Conferences",        path: "/europe",       type: "route" },
  { label: "Signature North America Global Conferences", path: "/northamerica", type: "route" },
  { label: "Signature USA Global Conference",            path: "/usa",          type: "route" },
];

const safeNavigate = (path) => {
  try {
    window.location.href = path;
  } catch (e) {
    console.error("Navigation error:", e);
  }
};

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [regionsOpen, setRegionsOpen] = useState(false);
  const [active,      setActive]      = useState("");
  const [isMobile,    setIsMobile]    = useState(window.innerWidth <= 768);

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

  const handleNav = (e, link) => {
    e.preventDefault();
    setMenuOpen(false);
    setRegionsOpen(false);

    if (link.type === "route") {
      safeNavigate(link.path);
      return;
    }

    if (link.type === "scroll") {
      const isHash = link.path.startsWith("#");
      if (!isHash) {
        safeNavigate(link.path);
        return;
      }
      const el = document.querySelector(link.path);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", link.path);
      } else {
        window.location.href = "/" + link.path;
      }
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

        {/* DESKTOP LINKS */}
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

        {/* RIGHT - Register CTA */}
        <div className="nav-right">
          <span
            className="cta"
            onClick={(e) => handleNav(e, { path: "/register", type: "route" })}
          >
            Register
          </span>

          <button className="ham" onClick={() => setMenuOpen((v) => !v)}>
            {[1, 2, 3].map((i) => (
              <span key={i} className={`line ${menuOpen ? "open" : ""}`} />
            ))}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
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
                        onClick={(e) => handleNav(e, sub)}
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <a
                href={link.path}
                className="m-link"
                onClick={(e) => handleNav(e, link)}
              >
                {link.label}
              </a>
            )}
          </div>
        ))}

        <span
          className="m-cta"
          onClick={(e) => handleNav(e, { path: "/register", type: "route" })}
        >
          Register
        </span>
      </div>
    </nav>
  );
};

export default Navbar;