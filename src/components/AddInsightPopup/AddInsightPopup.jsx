import React, { useState } from 'react';
import axios from '../../utils/axios';
import './AddInsightPopup.css';
import Button from '../Button/Button';

const AddInsightPopup = ({ onClose, userId, teacherId }) => {
  const [comment, setComment] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log('Comment to submit:', userId, teacherId, comment);
      await axios.post(`/profile-comments`, {
        student_id: userId,
        teacher_id: teacherId,
        comment: comment,
      });
      // console.log('Comment Submitted:', comment);
      console.log('Comment Submitted:', userId, teacherId, comment);
      onClose();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="add-insight-popup-overlay" onClick={onClose}>
      <div className="add-insight-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="add-insight-popup-header">
          <h2>Add Insight</h2>
          <div
            className="add-insight-popup-help-icon"
            onMouseEnter={() => setShowHelp(true)}
            onMouseLeave={() => setShowHelp(false)}
          >
            <span>?</span>
            {showHelp && <div className="add-insight-popup-help-popup">This is where you can enter your insight to help the AI...</div>}
          </div>
        </div>
        <p className="add-insight-popup-subtitle">Help the AI formulate its assessment!</p>
        <div className="add-insight-popup-form-group">
          <label htmlFor="teacher-comment">Teacher's comment</label>
          <textarea
            id="teacher-comment"
            placeholder="Enter comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Button text="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddInsightPopup;
