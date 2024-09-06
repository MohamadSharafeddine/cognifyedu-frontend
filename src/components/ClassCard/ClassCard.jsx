import React from 'react';
import './ClassCard.css';

const ClassCard = ({
  className = 'Class Name',
  teacherName = 'Teacher Name',
  description = 'This is a default description for the class. It provides some basic information about the class.',
}) => {
  return (
    <div className="class-card">
      <div className="class-card-header">
        <span className="classname">{className}</span>
        <span className="teacher">{teacherName}</span>
      </div>
      <div className="class-card-body">
        <h3>Description</h3>
        <div className="description-container">
        <p className="description">{description}</p>
      </div>
    </div>
    </div>
  );
};

export default ClassCard;
