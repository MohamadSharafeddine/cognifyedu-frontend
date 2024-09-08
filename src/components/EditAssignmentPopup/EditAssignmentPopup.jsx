import React, { useState } from 'react';
import './EditAssignmentPopup.css';
import Button from '../Button/Button';

const EditAssignmentPopup = ({ onClose, onSave, assignment }) => {
  const [title, setTitle] = useState(assignment.title);
  const [dueDate, setDueDate] = useState(assignment.dueDate);

  const handleSave = () => {
    if (title && dueDate) {
      onSave({ title, dueDate });
      onClose();
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Assignment</h2>
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
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="button-group">
          <Button color="#25738b" text="Save" size="medium" onClick={handleSave} />
          <Button color="#e74c3c" text="Cancel" size="medium" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default EditAssignmentPopup;
