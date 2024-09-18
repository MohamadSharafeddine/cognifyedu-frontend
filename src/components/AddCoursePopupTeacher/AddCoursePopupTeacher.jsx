import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./AddCoursePopupTeacher.css";
import Button from "../Button/Button";

const AddCoursePopupTeacher = ({ onClose, onAddCourse }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleAddCourse = () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!user?.id) {
      setError("Teacher ID is missing");
      return;
    }

    const newCourse = {
      name,
      description,
      teacher_id: user?.id,
    };

    onAddCourse(newCourse);
    onClose();
  };

  return (
    <div className="add-course-popup-teacher-modal">
      <div className="add-course-popup-teacher-modal-content" ref={modalRef}>
        <h2>Add Course</h2>
        <div className="add-course-popup-teacher-form-group">
          <label>
            Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="Enter Name"
            required
          />
          {error && <p className="add-course-popup-teacher-error-message">{error}</p>}
        </div>
        <div className="add-course-popup-teacher-form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
          />
        </div>
        <div className="add-course-popup-teacher-button-group">
          <Button
            color="#e74c3c"
            text="Cancel"
            size="medium"
            onClick={onClose}
          />
          <Button
            color="#25738b"
            text="Add"
            size="medium"
            onClick={handleAddCourse}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCoursePopupTeacher;
