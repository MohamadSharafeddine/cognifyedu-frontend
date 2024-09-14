import React, { useEffect, useState } from 'react';
import './ViewSubmissionsPopup.css';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissionsByAssignment, gradeSubmission } from '../../redux/slices/submissionsSlice';
import axios from '../../utils/axios';

const ViewSubmissionsPopup = ({ onClose, assignmentTitle, assignmentId }) => {
  const dispatch = useDispatch();

  const { submissions, loading, error } = useSelector((state) => state.submissions);

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [comment, setComment] = useState('');
  const [mark, setMark] = useState('');
  const [validationError, setValidationError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    if (assignmentId) {
      dispatch(fetchSubmissionsByAssignment(assignmentId));
    }

    const handleClickOutside = (event) => {
      if (event.target.className === 'modal-backdrop') {
        onClose();
      }
    };
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [dispatch, assignmentId, onClose]);

  const handleSubmissionClick = (submission) => {
    setSelectedSubmission(submission);
    setComment(submission.teacher_comment || '');
    setMark(submission.mark || '');
  };

  const handleReturnClick = () => {
    const markValue = Number(mark);
    if (mark === '') {
      setValidationError('Mark is required');
      return;
    } else if (markValue < 0 || markValue > 100) {
      setValidationError('Mark must be between 0 and 100');
      return;
    } else {
      setValidationError('');

      dispatch(gradeSubmission({
        submissionId: selectedSubmission.id,
        gradeData: {
          mark: markValue,
          teacher_comment: comment,
        },
      }))
        .unwrap()
        .then(() => {
          setFeedbackMessage(`Returned submission for ${selectedSubmission.student.name} with mark ${mark}/100`);

          const updatedSubmission = {
            ...selectedSubmission,
            mark: markValue,
            teacher_comment: comment,
          };
          setSelectedSubmission(updatedSubmission);
        })
        .catch(() => {
          setValidationError('Failed to return the submission.');
        });
    }
  };

  const handleMarkChange = (e) => {
    setMark(e.target.value);
    setValidationError('');
    setFeedbackMessage('');
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setValidationError('');
    setFeedbackMessage('');
  };

  const handleFileClick = async () => {
    if (selectedSubmission && selectedSubmission.id) {
      try {
        const token = localStorage.getItem('token');
        const submissionId = selectedSubmission.id;
        console.log('Attempting to download submission file:', submissionId);
  
        const response = await axios.get(`http://127.0.0.1:8000/api/submissions/${submissionId}/download`, {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log('Download response:', response);
  
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          const fileName = selectedSubmission.deliverable.split('/').pop();
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
        } else {
          console.error('Failed to download the file:', response.status);
          alert('Failed to download the file.');
        }
      } catch (error) {
        console.error('Error downloading the file:', error);
        alert('Error downloading the file.');
      }
    } else {
      console.error('No file submitted or deliverable URL is invalid.');
      alert('No file submitted');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="view-submissions-popup">
        <div className="left-section">
          <h2 className="assignment-title">{assignmentTitle}</h2>

          <div className="submissions-table-wrapper">
            {loading && <p>Loading submissions...</p>}
            {error && <p>Error fetching submissions: {error}</p>}
            {!loading && !error && (
              <table className="submissions-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <tr
                      key={index}
                      onClick={() => handleSubmissionClick(submission)}
                      className={selectedSubmission && selectedSubmission.id === submission.id ? 'active' : ''}
                    >
                      <td>{submission.student.name}</td>
                      <td>{submission.mark ? 'Graded' : 'Submitted'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="right-section">
          <div className="header-right">
            <h4>{selectedSubmission ? selectedSubmission.student.name : 'Select a submission'}</h4>
            <Button
              color="#25738b"
              text="Return"
              size="medium"
              onClick={handleReturnClick}
              disabled={!selectedSubmission}
            />
          </div>

          <div className="feedback-messages">
            {validationError && <p className="error">{validationError}</p>}
            {feedbackMessage && <p className="feedback">{feedbackMessage}</p>}
          </div>

          <div className="file-display" onClick={handleFileClick}>
            <span role="img" aria-label="file">
              📄
            </span>
            <p>Click to view the submitted file</p>
          </div>

          <div className="feedback-section">
            <div className="comment">
              <label>Comment</label>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Enter comment"
                rows="3"
              />
            </div>
            <div className="mark">
              <label>Mark</label>
              <div className="mark-input">
                <input
                  type="number"
                  value={mark || ''}
                  onChange={handleMarkChange}
                  placeholder="0"
                  min="0"
                  max="100"
                  disabled={!selectedSubmission}
                />
                <span>/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubmissionsPopup;