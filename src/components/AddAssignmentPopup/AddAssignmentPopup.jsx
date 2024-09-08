import React, { useState } from 'react';
import './AddAssignmentPopup.css';
import Button from '../Button/Button';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';


const AddAssignmentPopup = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
      'text/*': ['.txt'],
    },
    onDrop: (acceptedFiles) => {
      setAttachment(acceptedFiles[0]);
    },
  });

  const handleAddAssignment = () => {
    if (!title.trim() || !instructions.trim() || !dueDate) {
      setError('Title, Instructions, and Due Date are required.');
      return;
    }

    const newAssignment = {
      title,
      instructions,
      dueDate,
      attachment,
    };

    onSave(newAssignment);
    onClose();
  };

  return (
    <div className="add-assignment-modal">
      <div className="add-assignment-modal-content">
        <h2>Add Assignment</h2>

        <div className="add-assignment-popup-body">
          <div className="add-assignment-left-section">
            <div className="add-assignment-form-group">
              <label>Title <span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError('');
                }}
                placeholder="Enter Title"
                required
              />
            </div>

            <div className="add-assignment-form-group">
              <label>Instructions <span style={{ color: 'red' }}>*</span></label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Enter Instructions"
                required
              />
            </div>

            <div className="add-assignment-form-group">
              <label>Attach</label>
              <div {...getRootProps({ className: 'add-assignment-dropzone' })}>
                <input {...getInputProps()} />
                <p>{attachment ? attachment.name : 'Drag and drop a file here, or click to select a file'}</p>
                <div className="add-assignment-attach-icon">📁</div>
              </div>
            </div>
          </div>

          <div className="add-assignment-right-section">
            <div className="add-assignment-form-group due-date">
              <label>Due Date <span style={{ color: 'red' }}>*</span></label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="add-assignment-button-group">
              <Button color="#25738b" text="Add" size="medium" onClick={handleAddAssignment} />
              <Button color="#e74c3c" text="Cancel" size="medium" onClick={onClose} />
            </div>
          </div>
        </div>

        {error && <p className="add-assignment-error-message">{error}</p>}
      </div>
    </div>
  );
};

export default AddAssignmentPopup;
