import React from 'react';
import './ClassCard.css';
import { useDispatch } from 'react-redux';
import { selectClass } from '../../redux/actions/classActions';

const ClassCard = ({
  className = 'Class Name',
  teacherName = 'Teacher Name',
  description = 'This is a default description for the class. It provides some basic information about the class.',
}) => {
  const dispatch = useDispatch();

  return (
    <div
      className="class-card"
      onClick={() => dispatch(selectClass(className))}
    >
      <div className="class-card-header">
        <span className="classname">{className}</span>
        <span className="teacher">{teacherName}</span>
      </div>
      <div className="class-card-body">
        <h3>Description</h3>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default ClassCard;
