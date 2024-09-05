import React from 'react';
import './ClassPage.css';

const ClassPage = ({ className }) => {
  return (
    <div className="class-page">
      <h2>{className} Details</h2>
      <p>Welcome to {className}! Here are the details and classwork.</p>
    </div>
  );
};

export default ClassPage;
