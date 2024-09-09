import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo-bar.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div onClick={handleLogoClick} className="navbar-logo">
          <img src={logo} alt="CognifyEdu Logo" />
        </div>
        <ul className="navbar-menu">
          <li>
            <Link
              smooth
              to="/#about"
              className={`navbar-item ${activeSection === "about" ? "active-link" : ""}`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              smooth
              to="/#services"
              className={`navbar-item ${activeSection === "services" ? "active-link" : ""}`}
            >
              Our Services
            </Link>
          </li>
          <li>
            <Link
              smooth
              to="/#contact"
              className={`navbar-item ${activeSection === "contact" ? "active-link" : ""}`}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/login" className="navbar-item get-started">
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
