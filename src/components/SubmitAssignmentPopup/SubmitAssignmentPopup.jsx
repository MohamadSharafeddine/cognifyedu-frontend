import React, { useEffect, useState } from 'react';
import './SubmitAssignmentPopup.css';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { submitAssignment, fetchSubmissionsByAssignment } from '../../redux/slices/submissionsSlice';
import axios from '../../utils/axios';
import moment from 'moment';

const SubmitAssignmentPopup = ({ assignment, onClose }) => {
  const dispatch = useDispatch();
  const [deliverable, setDeliverable] = useState(null);
  const [existingSubmission, setExistingSubmission] = useState(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  const { submissions } = useSelector((state) => state.submissions);

  useEffect(() => {
    dispatch(fetchSubmissionsByAssignment(assignment.id))
      .unwrap()
      .then((submissions) => {
        const mySubmission = submissions.find((sub) => sub.assignment_id === assignment.id);
        if (mySubmission) {
          setExistingSubmission(mySubmission);
          setDeliverable(mySubmission.deliverable); // Pre-load the deliverable
        }
      });
  }, [dispatch, assignment.id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDeliverable(file);
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setDeliverable(file);
      setError('');
    }
  };

  const handleSubmit = () => {
    const now = moment();
    const dueDate = moment(assignment.due_date);
    if (dueDate.isBefore(now)) {
      setError('The due date for this assignment has passed.');
      return;
    }

    if (!deliverable) {
      setError('You need to add your work before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('assignment_id', assignment.id);
    formData.append('deliverable', deliverable);

    dispatch(submitAssignment({ assignmentId: assignment.id, deliverable }))
      .unwrap()
      .then(() => {
        alert('Assignment submitted successfully!');
        onClose();
      })
      .catch((err) => {
        setError('Failed to submit the assignment.');
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('submit-assignment-popup-backdrop')) {
        onClose();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="submit-assignment-popup-backdrop">
      <div className="submit-assignment-popup">
        <div className="submit-assignment-header">
          <div className="submit-assignment-title">
            <h2>{assignment.title}</h2>
            <h3>Description</h3>
            <p>{assignment.description}</p>
          </div>
        </div>

        <div className="divider"></div>

        <div className="my-work">
          <h3>My Work</h3>
          <div
            className={`file-upload ${dragging ? 'dragging' : ''} ${deliverable ? 'file-present' : 'file-empty'}`}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              onChange={handleFileChange}
              id="deliverable-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="deliverable-upload" className="upload-label">
              {deliverable ? (
                <span className="file-name">{typeof deliverable === 'string' ? deliverable : deliverable.name}</span>
              ) : (
                <span className="upload-icon">+</span>
              )}
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <Button color="#25738b" text={existingSubmission ? 'Update' : 'Submit'} size="medium" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SubmitAssignmentPopup;
