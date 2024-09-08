import React, { useState } from 'react';
import './ClassCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationPopup from '../DeleteConfirmationPopup/DeleteConfirmationPopup';
import EditClassPopup from '../EditClassPopup/EditClassPopup';
import { useNavigate } from 'react-router-dom';

const ClassCard = ({ className, teacherName, description, onDelete, onEdit }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    if (e.target.closest('.icon')) return;
    navigate(`/class/${className}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeletePopup(true);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); 
    setShowEditPopup(true);
  };

  const handleDeleteConfirmation = () => {
    onDelete(className);
    setShowDeletePopup(false);
  };

  const handleEditConfirmation = (newClassName, newDescription) => {
    onEdit(className, newClassName, newDescription);
    setShowEditPopup(false);
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
