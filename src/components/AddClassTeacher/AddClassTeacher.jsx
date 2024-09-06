import React, { useState } from 'react';
import './AddClassTeacher.css';
import Button from '../Button/Button';

const AddClassTeacher = ({ onClose, onAddClass }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddClass = () => {
    const newClass = {
      className: title,
      teacherName: "New Teacher",
      description,
    };

    if (onAddClass) {
      onAddClass(newClass);
    }
    
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Class</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
          />
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
          <Button color="#25738b" text="Add" size="medium" onClick={handleAddClass} />
          <Button color="#e74c3c" text="Cancel" size="medium" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AddClassTeacher;
