import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.jpg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <img src={Logo} alt="CognifyEdu Logo" className="footer-logo" />
        <div className="social-icons">
          <a
            href="https://x.com/i/flow/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
          </a>
          <a
            href="https://www.instagram.com/accounts/login/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
          <a
            href="https://www.youtube.com/signin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          </a>
        </div>
        <div className="location">Lebanon - English</div>
      </div>
      <div className="footer-center">
        <div className="footer-title">Support</div>
        <Link to="/faq" className="footer-link">
          FAQ
        </Link>
        <div className="copyright">© 2024 CognifyEdu</div>
      </div>
      <div className="footer-right">
        <div className="footer-title">About</div>
        <Link to="/terms" className="footer-link">
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
};

export default Footer;
