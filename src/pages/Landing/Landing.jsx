import React, { useEffect, useState } from "react";
import "./Landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import heroImage from "../../assets/hero-image.jpg";
import servicesImage1 from "../../assets/service1.jpg";
import servicesImage2 from "../../assets/service2.jpg";
import servicesImage3 from "../../assets/service3.jpg";
import aboutUsImage from "../../assets/about-us.jpg";
import userTeacherImage from "../../assets/user-teacher.jpg";
import userStudentImage from "../../assets/user-student.jpg";
import userParentImage from "../../assets/user-parent.jpg";
import Register from "../Register/Register";
import Login from "../Login/Login";

const Landing = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

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

  return (
    <div className="landing-page">
      <section className="landing-hero-section">
        <img src={heroImage} alt="Hero" className="landing-hero-image" />
        <div className="landing-hero-overlay">
          <div className="landing-hero-text" data-aos="fade-up">
            <h1>Unlocking Potential, One Insight at a Time.</h1>
            <p className="hero-subtext">
              Empowering education with AI-driven insights.
            </p>
            <button className="hero-cta-button" onClick={toggleRegister}>
              Get Started
            </button>
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
            potential.
          </p>
        </div>
      </section>

      <section id="services" className="landing-services-section">
        <h2 data-aos="fade-up">Our Services</h2>
        <div className="landing-services-grid">
          {[
            {
              img: servicesImage1,
              title: "Assignments",
              description:
                "Manage assignments with personalized feedback and AI-powered analysis to track student progress.",
            },
            {
              img: servicesImage2,
              title: "Analysis",
              description:
                "In-depth analysis of student performance, helping educators and parents understand strengths and areas for improvement.",
            },
            {
              img: servicesImage3,
              title: "Insights",
              description:
                "Gain actionable insights into student cognitive and behavioral data, driving better learning outcomes.",
            },
          ].map((service, index) => (
            <div
              className="landing-service"
              data-aos="zoom-in"
              data-aos-delay={`${index * 100}`}
            >
              <img src={service.img} alt={service.title} />
              <h3>{service.title}</h3>
              <div className="landing-service-description">
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="users" className="landing-users-section">
        <h2 data-aos="fade-up">Our Users</h2>
        <div className="landing-users-grid">
          {[
            {
              img: userTeacherImage,
              title: "Teachers",
              description:
                "Teachers can create and manage assignments, track student progress, and gain insights to tailor their teaching strategies.",
            },
            {
              img: userStudentImage,
              title: "Students",
              description:
                "Students can access assignments, view feedback, and monitor their cognitive and behavioral development over time.",
            },
            {
              img: userParentImage,
              title: "Parents",
              description:
                "Parents can stay informed about their child's progress, viewing detailed insights and supporting their learning journey.",
            },
          ].map((user, index) => (
            <div
              className="landing-user"
              data-aos="zoom-in"
              data-aos-delay={`${index * 100}`}
            >
              <img src={user.img} alt={user.title} />
              <h3>{user.title}</h3>
              <div className="landing-user-description">
                <p>{user.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="contact" className="landing-contact-section"></section>

      {showRegister && (
        <Register onSwitchToLogin={toggleLogin} onClose={closeModals} />
      )}
      {showLogin && (
        <Login onSwitchToRegister={toggleRegister} onClose={closeModals} />
      )}
    </div>
  );
};

export default Landing;
