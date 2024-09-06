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
        <div className="header-top">
        <span className="classname">{className}</span>
          <span className="delete-icon" onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
        <div className="header-bottom">
        <span className="teacher">{teacherName}</span>
        </div>
      </div>
      <div className="class-card-body">
        <h3>Description</h3>
        <div className="description-container">
          <p className="description">{description}</p>
        </div>
      </div>

      {showDeletePopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete this class?</p>
          <div className="button-group">
            <Button
              color="#e74c3c"
              text="Yes, Delete"
              size="small"
              onClick={confirmDelete}
            />
            <Button
              color="#ddd"
              text="Cancel"
              size="small"
              onClick={cancelDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCard;
