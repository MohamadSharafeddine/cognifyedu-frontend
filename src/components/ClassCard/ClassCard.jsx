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
    <div className="class-card" onClick={handleCardClick}>
      <div className="class-card-header">
        <div className="header-top">
          <span className="classname">{className}</span>
          <div className="icon-group">
            <span className="icon delete-icon" onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <span className="icon edit-icon" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} />
            </span>
          </div>
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
        <div onClick={(e) => e.stopPropagation()}>
          <DeleteConfirmationPopup
            onClose={() => setShowDeletePopup(false)}
            onDelete={handleDeleteConfirmation}
          />
        </div>
      )}

      {showEditPopup && (
        <div onClick={(e) => e.stopPropagation()}>
          <EditClassPopup
            className={className}
            description={description}
            onClose={() => setShowEditPopup(false)}
            onSave={handleEditConfirmation}
          />
        </div>
      )}
    </div>
  );
};

export default ClassCard;
