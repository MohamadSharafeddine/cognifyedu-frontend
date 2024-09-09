import React, { useEffect, useState } from 'react';
import './ViewSubmissionsPopup.css';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';

// import { fetchSubmissions } from '../../actions/submissionsActions';

const ViewSubmissionsPopup = ({ onClose, assignmentTitle }) => {

  // const dispatch = useDispatch();

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [comment, setComment] = useState('');
  const [mark, setMark] = useState('');
  const [validationError, setValidationError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const sampleSubmissions = [
    { studentName: 'John Doe', status: 'Submitted', file: 'john-file.pdf' },
    { studentName: 'Jane Doe', status: 'Submitted', file: 'jane-file.pdf' },
    { studentName: 'Sam Smith', status: 'Not Submitted', file: '' },
    { studentName: 'Alice Johnson', status: 'Submitted', file: 'alice-file.pdf' },
    { studentName: 'Michael Brown', status: 'Submitted', file: 'michael-file.pdf' },
  ];

  useEffect(() => {

    // dispatch(fetchSubmissions(assignmentTitle));

    setSelectedSubmission(sampleSubmissions[0]);
    setComment('');
    setMark('');

    const handleClickOutside = (event) => {
      if (event.target.className === 'modal-backdrop') {
        onClose();
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmissionClick = (submission) => {
    setSelectedSubmission(submission);
    setComment('');
    setMark('');

    // dispatch(fetchSubmissionDetails(submission.studentName));

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
      setFeedbackMessage(`Returned submission for ${selectedSubmission.studentName} with mark ${mark}/100`);
    }
  };

  const handleMarkChange = (e) => {
    setMark(e.target.value);
    setValidationError('');
    setFeedbackMessage('');
  };

  const handleFileClick = () => {
    if (selectedSubmission && selectedSubmission.file) {
      alert(`Opening submission file: ${selectedSubmission.file}`);
    } else {
      alert('No file submitted');
    }
  };

  return (
    <div className="modal-backdrop">
    </div>
  );
};

export default ViewSubmissionsPopup;
