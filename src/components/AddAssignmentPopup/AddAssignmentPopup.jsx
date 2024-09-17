import React, { useState, useEffect } from "react";
import "./AddAssignmentPopup.css";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { addAssignment } from "../../redux/slices/assignmentsSlice";
import moment from "moment";
import { useParams } from "react-router-dom";

const AddAssignmentPopup = ({ onClose }) => {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        if (![
            'text/plain',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
            'image/jpg',
            'image/gif'
        ].includes(file.type)) {
            setError('Invalid file type. Please upload a txt, pdf, doc, docx, jpeg, png, jpg, or gif file.');
            setAttachment(null);
            return;
        }
        setAttachment(file);
        setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (![
          'text/plain',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ].includes(file.type)) {
        setError('Invalid file type. Please upload a txt, pdf, doc, or docx file.');
        setAttachment(null);
        return;
      }
      setAttachment(file);
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

  const handleAddAssignment = () => {
    if (!title.trim() || !description.trim() || !dueDate || !courseId) {
      setError("Title, Description, Due Date, and Course ID are required.");
      return;
    }

    const formattedDueDate = moment(dueDate).format("YYYY-MM-DD");

    const currentDate = moment().format("YYYY-MM-DD");
    if (moment(formattedDueDate).isBefore(currentDate)) {
      setError("Due date cannot be in the past.");
      return;
    }

    const assignmentData = {
      title,
      description,
      due_date: formattedDueDate,
      course_id: courseId,
      attachment,
    };

    dispatch(addAssignment(assignmentData))
      .unwrap()
      .then(() => {
        alert("Assignment added successfully!");
        onClose();
      })
      .catch((err) => {
        setError(err?.message || "Failed to add assignment.");
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("add-assignment-modal")) {
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="add-assignment-modal">
      <div className="add-assignment-modal-content">
        <h2>Add Assignment</h2>

        <div className="add-assignment-popup-body">
          <div className="add-assignment-left-section">
            <div className="add-assignment-form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                placeholder="Enter Title"
                required
              />
            </div>

            <div className="add-assignment-form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                required
              />
            </div>

            <div className="add-assignment-form-group">
              <label>Attach</label>
              <div
                className={`add-file-upload ${dragging ? "dragging" : ""} ${attachment ? "file-present" : "file-empty"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="add-attachment-upload"
                  style={{ display: "none" }}
                />
                <label htmlFor="add-attachment-upload" className="add-upload-label">
                  {attachment ? (
                    <span className="add-file-name">{attachment.name}</span>
                  ) : (
                    <span className="add-upload-icon">+</span>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="add-assignment-right-section">
            <div className="add-assignment-form-group due-date">
              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="add-assignment-button-group">
              <Button color="#e74c3c" text="Cancel" size="medium" onClick={onClose} />
              <Button color="#25738b" text="Add" size="medium" onClick={handleAddAssignment} />
            </div>
          </div>
        </div>

        {error && <p className="add-assignment-error-message">{error}</p>}
      </div>
    </div>
  );
};

export default AddAssignmentPopup;
