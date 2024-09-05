import React from 'react';
import './Footer.css'; // Importing the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Logo from '../../assets/Logos/Logo.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <img src={Logo} alt="CognifyEdu Logo" />
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} className="social-icon" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          </a>
        </div>
        <div className="location">Lebanon - English</div>
      </div>
      <div className="center">
        <div>Support</div>
        <a href="#">FAQ</a>
        <div className="copyright">© 2024 CognifyEdu</div>
      </div>
      <div className="right">
        <div>About</div>
        <a href="#">Careers</a>
        <a href="#">Terms & Conditions</a>
      </div>
    </div>
  );
};

export default Footer;
