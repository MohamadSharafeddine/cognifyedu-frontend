import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import heroImage from "../../assets/hero-image.jpg"; 
import servicesImage1 from "../../assets/service1.png";
import servicesImage2 from "../../assets/service2.png";
import servicesImage3 from "../../assets/service3.png";
import aboutUsImage from "../../assets/about-us.png";
import userTeacherImage from "../../assets/user-teacher.png";
import userStudentImage from "../../assets/user-student.png";
import userParentImage from "../../assets/user-parent.png";

const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  return (
    <div className="landing-page">
      <section className="landing-hero-section">
        <img src={heroImage} alt="Hero" className="landing-hero-image" />
        <div className="landing-hero-overlay">
          <div className="landing-hero-text" data-aos="fade-up">
            <h1>Unlocking Potential, One Insight at a Time.</h1>
            <Link to="/login">
              <button className="hero-cta-button">Get Started</button>
            </Link>
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
          <div className="landing-service" data-aos="zoom-in">
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
            className="landing-service"
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
            className="landing-service"
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

      <section id="users" className="landing-users-section">
        <h2 data-aos="fade-up">Our Users</h2>
        <div className="landing-users-grid">
          <div className="landing-user" data-aos="zoom-in">
            <img src={userTeacherImage} alt="Teachers" />
            <h3>Teachers</h3>
            <div className="landing-user-description">
              <p>
                Teachers can create and manage assignments, track student progress,
                and gain insights to tailor their teaching strategies.
              </p>
            </div>
          </div>
          <div
            className="landing-user"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <img src={userStudentImage} alt="Students" />
            <h3>Students</h3>
            <div className="landing-user-description">
              <p>
                Students can access assignments, view feedback, and monitor their
                cognitive and behavioral development over time.
              </p>
            </div>
          </div>
          <div
            className="landing-user"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img src={userParentImage} alt="Parents" />
            <h3>Parents</h3>
            <div className="landing-user-description">
              <p>
                Parents can stay informed about their child's progress, viewing
                detailed insights and supporting their learning journey.
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
