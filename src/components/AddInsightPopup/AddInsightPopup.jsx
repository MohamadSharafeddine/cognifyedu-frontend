import React, { useState } from 'react';
import axios from '../../utils/axios';
import './AddInsightPopup.css';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const AddInsightPopup = ({ onClose, userId, teacherId }) => {
  const [comment, setComment] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setError('Feedback is required.');
      return;
    }
    setIsLoading(true);
    try {
      console.log('Feedback to submit:', userId, teacherId, comment);
      await axios.post(`/profile-comments`, {
        student_id: userId,
        teacher_id: teacherId,
        comment: comment,
      });
      console.log('Feedback Submitted:', userId, teacherId, comment);
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-insight-popup-overlay" onClick={onClose}>
      <div className="add-insight-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="add-insight-popup-header">
          <FontAwesomeIcon icon={faMicrochip} className="ai-icon" />
          <h2>Add Insight</h2>
          <div
            className="add-insight-popup-help-icon"
            onMouseEnter={() => setShowHelp(true)}
            onMouseLeave={() => setShowHelp(false)}
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
            {showHelp && (
              <div className="add-insight-popup-help-popup">
                <strong>Tips for Feedback:</strong>
                <ul>
                  <li>Provide objective observations about the student's work.</li>
                  <li>Include observations on student's interactions and engagement.</li>
                  <li>Provide examples of both positive and negative behaviors.</li>
                  <li>The more details provided the more accurate the assessment will be.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <p className="add-insight-popup-subtitle">Provide context for a more accurate AI assessment.</p>
        <div className="add-insight-popup-form-group">
          <label htmlFor="teacher-comment">Your Feedback</label>
          <textarea
            id="teacher-comment"
            placeholder="Enter your detailed feedback..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (error) setError('');
            }}
          />
          {error && <p className="add-insight-error-message">{error}</p>}
        </div>
        <div className="add-insight-popup-submit-button">
          <Button text="Submit" onClick={handleSubmit} />
        </div>
        {isLoading && (
          <div className="ai-loading">
            <FontAwesomeIcon icon={faMicrochip} spin className="ai-loading-icon" />
            <p>AI is processing the assessment...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddInsightPopup;
