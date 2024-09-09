import React, { useEffect } from 'react';
import './Landing.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../../assets/logo-title.png';
import servicesImage1 from '../../assets/service1.png';
import servicesImage2 from '../../assets/service2.png';
import servicesImage3 from '../../assets/service3.png';
import aboutUsImage from '../../assets/about-us.png';

const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out' });
  }, []);

  return (
    <div className="landing-page">
      <section className="landing-hero-section">
        <div className="landing-hero-content" data-aos="fade-up">
          <img src={logo} alt="CognifyEdu Logo" className="landing-hero-logo" />
          <div className="landing-hero-text">
            <h2>Unlocking Potential,</h2>
            <h2>One Insight at a Time.</h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
