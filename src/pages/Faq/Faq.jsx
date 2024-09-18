import React from 'react';
import './Faq.css';

const Faq = () => {
  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-item">
        <h2>What is CognifyEdu?</h2>
        <p>CognifyEdu is a platform designed to provide personalized education through AI-driven analysis and insights, supporting educators, students, and parents in enhancing the learning experience.</p>
      </div>
      <div className="faq-item">
        <h2>How does the AI assessment work?</h2>
        <p>Our AI assessments analyze students' cognitive and behavioral data to provide insights into their learning patterns. It uses advanced algorithms to generate feedback and recommendations.</p>
      </div>
      <div className="faq-item">
        <h2>Can parents access their child's progress?</h2>
        <p>Yes, parents can access detailed insights into their child's progress, including assignment feedback, cognitive and behavioral analysis, and tailored recommendations.</p>
      </div>
      <div className="faq-item">
        <h2>Is my data secure on CognifyEdu?</h2>
        <p>Yes, we prioritize data privacy and ensure that all personal information is securely stored and used only for enhancing your educational experience.</p>
      </div>
    </div>
  );
};

export default Faq;
