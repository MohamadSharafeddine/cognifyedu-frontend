import React from 'react';
import './DeleteConfirmationPopup.css';
import Button from '../Button/Button';

const DeleteConfirmationPopup = ({ onClose, onDelete }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure?</h2>
        <div className="delete-button-group">
          <Button
            className="cancel-btn"
            color="#ddd"
            text="Cancel"
            size="medium"
            onClick={onClose}
          />
          <Button
            className="delete-btn"
            color="#e74c3c"
            text="Yes, Delete"
            size="medium"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
