import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./AddCoursePopupTeacher.css";
import Button from "../Button/Button";

const AddCoursePopupTeacher = ({ onClose, onAddCourse }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  
  const { user } = useSelector((state) => state.auth);

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
    <div className="modal">
      <div className="modal-content">
        <h2>Add Course</h2>
        <div className="form-group">
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
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
          />
        </div>
        <div className="button-group">
          <Button
            color="#25738b"
            text="Add"
            size="medium"
            onClick={handleAddCourse}
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

export default AddCoursePopupTeacher;
