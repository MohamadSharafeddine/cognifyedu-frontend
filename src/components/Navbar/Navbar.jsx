import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo-bar.jpg";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        setActiveSection(id);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  const closeModals = () => {
    setShowRegister(false);
    setShowLogin(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div onClick={handleLogoClick} className="navbar-logo">
            <img src={logo} alt="CognifyEdu Logo" />
          </div>

          <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </div>

          <ul className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
            <li>
              <Link
                smooth
                to="/#about"
                className={`navbar-item ${
                  activeSection === "about" ? "active-link" : ""
                }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                smooth
                to="/#services"
                className={`navbar-item ${
                  activeSection === "services" ? "active-link" : ""
                }`}
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                smooth
                to="/#users"
                className={`navbar-item ${
                  activeSection === "users" ? "active-link" : ""
                }`}
              >
                Our Users
              </Link>
            </li>
            <li>
              <Link
                smooth
                to="/#contact"
                className={`navbar-item ${
                  activeSection === "contact" ? "active-link" : ""
                }`}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <button
                onClick={toggleLogin}
                className="navbar-item get-started"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {showRegister && (
        <Register onSwitchToLogin={toggleLogin} onClose={closeModals} />
      )}
      {showLogin && (
        <Login onSwitchToRegister={toggleRegister} onClose={closeModals} />
      )}
    </>
  );
};

export default Navbar;
