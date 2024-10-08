import React, { useEffect, useState } from 'react';
import './ViewSubmissionsPopup.css';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissionsByAssignment, markSubmission } from '../../redux/slices/submissionsSlice';
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
      dispatch(fetchSubmissionsByAssignment(assignmentId)).then((action) => {
        if (action.payload && action.payload.length > 0) {
          const firstSubmission = action.payload[0];
          setSelectedSubmission(firstSubmission);
          setComment(firstSubmission.teacher_comment || '');
          setMark(firstSubmission.mark || '');
        }
      });
    }

    const handleClickOutside = (event) => {
      if (event.target.className === 'viewsubmissionspopup-modal-backdrop') {
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

      dispatch(markSubmission({
        submissionId: selectedSubmission.id,
        markData: {
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

        const response = await axios.get(`http://127.0.0.1:8000/api/submissions/${submissionId}/download`, {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
          setValidationError('Failed to download the file.');
        }
      } catch (error) {
        setValidationError('Error downloading the file.');
      }
    } else {
      setValidationError('No file submitted or deliverable URL is invalid.');
    }
  };

  return (
    <div className="viewsubmissionspopup-modal-backdrop">
      <div className="viewsubmissionspopup-container">
        <div className="viewsubmissionspopup-left-section">
          <h2 className="viewsubmissionspopup-assignment-title">{assignmentTitle}</h2>

          <div className="viewsubmissionspopup-submissions-table-wrapper">
            {loading && <p>Loading submissions...</p>}
            {error && <p>Error fetching submissions: {error}</p>}
            {!loading && !error && (
              <table className="viewsubmissionspopup-submissions-table">
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
                      <td>{submission.mark ? 'Marked' : 'Submitted'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="viewsubmissionspopup-right-section">
          <div className="viewsubmissionspopup-header-right">
            <h4>{selectedSubmission ? selectedSubmission.student.name : 'Select a submission'}</h4>
            <Button
              color="#25738b"
              text="Return"
              size="medium"
              onClick={handleReturnClick}
              disabled={!selectedSubmission}
            />
          </div>

          <div className="viewsubmissionspopup-feedback-messages">
            {validationError && <p className="viewsubmissionspopup-error">{validationError}</p>}
            {feedbackMessage && <p className="viewsubmissionspopup-feedback">{feedbackMessage}</p>}
          </div>

          <div className="viewsubmissionspopup-file-display" onClick={handleFileClick}>
            <span role="img" aria-label="file">
              📄
            </span>
            <p>Click to download the submitted file</p>
          </div>

          <div className="viewsubmissionspopup-feedback-section">
            <div className="viewsubmissionspopup-comment">
              <label>Comment</label>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Enter comment"
                rows="3"
              />
            </div>
            <div className="viewsubmissionspopup-mark">
              <label>Mark</label>
              <div className="viewsubmissionspopup-mark-input">
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
