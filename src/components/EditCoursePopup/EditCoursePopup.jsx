import React, { useState, useEffect, useRef } from "react";
import "./EditCoursePopup.css";
import Button from "../Button/Button";

const EditCoursePopup = ({ courseName, description, onClose, onSave }) => {
  const [title, setTitle] = useState(courseName);
  const [desc, setDesc] = useState(description);
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSaveCourse = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (onSave) {
      onSave(title, desc);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="edit-course-popup-modal">
      <div className="edit-course-popup-modal-content" ref={modalRef}>
        <h2>Edit Course</h2>
        <div className="edit-course-popup-form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            placeholder="Enter Title"
            required
          />
          {error && <p className="edit-course-popup-error-message">{error}</p>}
        </div>
        <div className="edit-course-popup-form-group">
          <label>Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter Description"
          />
        </div>
        <div className="edit-course-popup-button-group">
          <Button
            color="#C53030"
            text="Cancel"
            size="medium"
            onClick={onClose}
          />
          <Button
            color="#25738b"
            text="Save"
            size="medium"
            onClick={handleSaveCourse}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCoursePopup;
