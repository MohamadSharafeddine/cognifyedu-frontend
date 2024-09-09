import React, { useEffect } from "react";
import "./Landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../assets/logo-title.png";
import servicesImage1 from "../../assets/service1.png";
import servicesImage2 from "../../assets/service2.png";
import servicesImage3 from "../../assets/service3.png";
import aboutUsImage from "../../assets/about-us.png";

const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
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

      <section id="about" className="landing-about-section">
        <h2>About Us</h2>
        <div className="landing-about-content">
          <img
            src={aboutUsImage}
            alt="About CognifyEdu"
            className="landing-about-image"
            data-aos="fade-right"
          />
          <p data-aos="fade-left" data-aos-delay="100">
            At CognifyEdu, we believe in the power of personalized education.
            Our platform is designed to bridge the gap between traditional
            teaching methods and modern psychological insights, offering a
            holistic approach to student development. By leveraging AI-driven
            analysis, we create comprehensive profiles that highlight each
            student's unique cognitive and behavioral strengths. Our mission is
            to empower educators, students, and parents with the tools they need
            to support every learner's growth, ensuring they reach their full
            potential. Whether it's through tailored learning paths, insightful
            assessments, or seamless class management, CognifyEdu is here to
            transform the educational experience for everyone involved.
          </p>
        </div>
      </section>

      <section id="services" className="landing-services-section">
        <h2 data-aos="fade-up">Our Services</h2>
        <div className="landing-services-grid">
          <div className="landing-service-card" data-aos="zoom-in">
            <img src={servicesImage1} alt="Assignments" />
            <h3>Assignments</h3>
            <div className="landing-service-description">
              <p>
                Manage assignments with personalized feedback and AI-powered
                analysis to track student progress.
              </p>
            </div>
          </div>
          <div
            className="landing-service-card"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <img src={servicesImage2} alt="Analysis" />
            <h3>Analysis</h3>
            <div className="landing-service-description">
              <p>
                In-depth analysis of student performance, helping educators and
                parents understand strengths and areas for improvement.
              </p>
            </div>
          </div>
          <div
            className="landing-service-card"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img src={servicesImage3} alt="Insights" />
            <h3>Insights</h3>
            <div className="landing-service-description">
              <p>
                Gain actionable insights into student cognitive and behavioral
                data, driving better learning outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="landing-contact-section"></section>
    </div>
  );
};

export default Landing;
