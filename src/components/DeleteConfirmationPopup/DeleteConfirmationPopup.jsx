import React, { useEffect, useRef } from "react";
import "./DeleteConfirmationPopup.css";
import Button from "../Button/Button";

const DeleteConfirmationPopup = ({ onClose, onDelete }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="delete-popup-modal">
      <div className="delete-popup-content" ref={modalRef}>
        <h2>Are you sure?</h2>
        <div className="delete-popup-button-group">
          <Button
            className="delete-popup-cancel-btn"
            color="#ddd"
            text="Cancel"
            size="medium"
            onClick={onClose}
          />
          <Button
            className="delete-popup-delete-btn"
            color="#C53030"
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
