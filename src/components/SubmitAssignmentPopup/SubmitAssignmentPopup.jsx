import React, { useEffect, useState } from 'react';
import './SubmitAssignmentPopup.css';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { submitAssignment } from '../../redux/slices/submissionsSlice';
import axios from '../../utils/axios';

const SubmitAssignmentPopup = ({ assignment, onClose }) => {
  const dispatch = useDispatch();
  const [deliverable, setDeliverable] = useState(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

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

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleSubmit = () => {
    if (!deliverable) {
      setError('You need to add your work before submitting.');
      return;
    }

    if (!assignment.id) {
      setError('Assignment ID is missing.');
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
        console.error('Submission failed:', err);
        setError('Failed to submit the assignment.');
      });
  };

  const handleDownloadFile = async (assignmentId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`http://127.0.0.1:8000/api/assignments/${assignmentId}/download`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const fileName = `assignment-${assignmentId}.txt`;
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error('Failed to download the file.', response.status);
        alert('Failed to download the file.');
      }
    } catch (error) {
      console.error('Error downloading the file:', error);
      alert('Error downloading the file.');
    }
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
          <div className="submit-assignment-attachment centered-attachment">
            <h4>Attachments</h4>
            {assignment.attachment ? (
              <button onClick={() => handleDownloadFile(assignment.id)} className="download-attachment-button">
                Download Attachment
              </button>
            ) : (
              <div className="no-attachment">No file attached</div>
            )}
          </div>
        </div>

        <div className="divider"></div>

        <div className="my-work">
          <h3>My Work</h3>
          <div
            className={`submit-file-upload ${dragging ? 'dragging' : ''} ${deliverable ? 'file-present' : 'file-empty'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              onChange={handleFileChange}
              id="deliverable-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="deliverable-upload" className="submit-upload-label">
              {deliverable ? (
                <span className="submit-file-name">{deliverable.name}</span>
              ) : (
                <span className="submit-upload-icon">+</span>
              )}
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="submit-assignment-buttons">
            <Button color="#e74c3c" text="Close" size="medium" onClick={onClose} />
            <Button color="#25738b" text="Submit" size="medium" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitAssignmentPopup;
