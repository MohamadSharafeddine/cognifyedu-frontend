import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudentToCourse } from '../../redux/slices/studentsSlice';
import './AddStudentPopup.css';
import Button from '../Button/Button';

const AddStudentPopup = ({ onClose, courseId }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleAddStudent = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    dispatch(addStudentToCourse({ courseId, email }))
      .unwrap()
      .then((newStudent) => {
        onClose(newStudent);
      })
      .catch((err) => {
        setError(err.message || 'Failed to add student');
      });
  };

  return (
    <div className="add-student-modal">
      <div className="add-student-modal-content">
        <h2>Add Student</h2>
        <div className="add-student-form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="Enter Student Email"
            required
          />
          {error && <p className="add-student-error-message">{error}</p>}
        </div>
        <div className="add-student-button-group">
          <Button color="#e74c3c" text="Cancel" size="medium" onClick={onClose} />
          <Button color="#25738b" text="Add" size="medium" onClick={handleAddStudent} />
        </div>
      </div>
    </div>
  );
};

export default AddStudentPopup;
