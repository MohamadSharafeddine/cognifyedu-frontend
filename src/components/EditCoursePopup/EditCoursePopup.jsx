import React, { useState } from "react";
import "./EditCoursePopup.css";
import Button from "../Button/Button";

const EditCoursePopup = ({ courseName, description, onClose, onSave }) => {
  const [title, setTitle] = useState(courseName);
  const [desc, setDesc] = useState(description);
  const [error, setError] = useState("");

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
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Course</h2>
        <div className="form-group">
          <label>
            Title <span style={{ color: "red" }}>*</span>
          </label>
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
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter Description"
          />
        </div>
        <div className="button-group">
          <Button
            color="#25738b"
            text="Save"
            size="medium"
            onClick={handleSaveCourse}
          />
          <Button
            color="#e74c3c"
            text="Cancel"
            size="medium"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCoursePopup;
