import React, { useState } from 'react';
import './ClassCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

const ClassCard = ({
  className = 'Class Name',
  teacherName = 'Teacher Name',
  description = 'This is a default description for the class. It provides some basic information about the class.',
  onDelete
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    onDelete(className);
    setShowDeletePopup(false);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

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
