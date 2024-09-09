import React, { useState } from 'react';
import './ClassCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationPopup from '../DeleteConfirmationPopup/DeleteConfirmationPopup';
import EditClassPopup from '../EditClassPopup/EditClassPopup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectClass } from '../../redux/slices/classesSlice';

const ClassCard = ({ className, teacherName, description, onDelete, onEdit }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(selectClass(className));
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
    <div className="classcard-container" onClick={handleCardClick}>
      <div className="classcard-header">
        <div className="classcard-header-top">
          <span className="classcard-classname">{className}</span>
          <div className="classcard-icon-group">
            <span className="classcard-delete-icon" onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <span className="classcard-edit-icon" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} />
            </span>
          </div>
        </div>
        <div className="classcard-header-bottom">
          <span className="classcard-teacher">{teacherName}</span>
        </div>
      </div>
      <div className="classcard-body">
        <h3>Description</h3>
        <div className="classcard-description-container">
          <p className="classcard-description">{description}</p>
        </div>
      </div>

      {showDeletePopup && (
        <div>
          <DeleteConfirmationPopup
            onClose={() => setShowDeletePopup(false)}
            onDelete={handleDeleteConfirmation}
          />
        </div>
      )}

      {showEditPopup && (
        <div>
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
