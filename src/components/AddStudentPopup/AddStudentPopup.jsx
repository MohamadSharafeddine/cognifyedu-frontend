import React, { useState } from 'react';
import './AddStudentPopup.css'; 
import Button from '../Button/Button';

const AddStudentPopup = ({ onClose, onAddStudent }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');

  const handleAddStudent = () => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      avatar: avatar || 'defaultAvatar.png',
    };

    onAddStudent(newStudent);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Student</h2>
        <div className="form-group">
          <label>Name <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Enter Student Name"
            required
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="form-group">
          <label>Avatar URL</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Enter Avatar URL"
          />
        </div>
        <div className="button-group">
          <Button color="#25738b" text="Add" size="medium" onClick={handleAddStudent} />
          <Button color="#e74c3c" text="Cancel" size="medium" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AddStudentPopup;
