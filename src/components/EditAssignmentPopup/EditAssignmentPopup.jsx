import React, { useState, useEffect } from "react";
import "./EditAssignmentPopup.css";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { updateAssignment } from "../../redux/slices/assignmentsSlice";
import moment from "moment";

const EditAssignmentPopup = ({ onClose, onSave, assignment }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [dueDate, setDueDate] = useState(assignment.due_date);
  const [attachment, setAttachment] = useState(null);
  const [existingAttachment, setExistingAttachment] = useState(
    assignment.attachment || null
  );
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (assignment.due_date) {
      const formattedDueDate = moment(assignment.due_date).format("YYYY-MM-DD");
      setDueDate(formattedDueDate);
    }
  }, [assignment.due_date]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        ![
          "text/plain",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/gif",
        ].includes(file.type)
      ) {
        setError(
          "Invalid file type. Please upload a txt, pdf, doc, docx, jpeg, png, jpg, or gif file."
        );
        setAttachment(null);
        return;
      }
      setAttachment(file);
      setExistingAttachment(null);
      setError("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (
        ![
          "text/plain",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/gif",
        ].includes(file.type)
      ) {
        setError(
          "Invalid file type. Please upload a txt, pdf, doc, docx, jpeg, png, jpg, or gif file."
        );
        setAttachment(null);
        return;
      }
      setAttachment(file);
      setExistingAttachment(null);
      setError("");
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

  const handleRemoveAttachment = () => {
    setAttachment(null);
    setExistingAttachment(null);
  };

  const handleSave = async () => {
    if (!title.trim() || !description.trim() || !dueDate) {
      setError("Title, Description, and Due Date are required.");
      return;
    }

    const formattedDueDate = moment(dueDate).format("YYYY-MM-DD");

    const updatedAssignment = {
      id: assignment.id,
      title,
      description,
      due_date: formattedDueDate,
      course_id: assignment.course_id,
      attachment,
    };

    try {
      await dispatch(updateAssignment(updatedAssignment)).unwrap();
      onSave(updatedAssignment);
      onClose();
    } catch (err) {
      console.error("Error updating assignment:", err);
      setError("Failed to update assignment. Please try again.");
    }
  };

  return (
    <div className="edit-assignment-modal">
      <div className="edit-assignment-modal-content">
        <h2>Edit Assignment</h2>
        <div className="edit-assignment-popup-body">
          <div className="edit-assignment-left-section">
            <div className="edit-assignment-form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
                required
              />
            </div>

            <div className="edit-assignment-form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                required
              />
            </div>

            <div className="edit-assignment-form-group">
              <label>Attach</label>
              <div
                className={`edit-file-upload ${
                  dragging ? "edit-dragging" : ""
                } ${
                  attachment || existingAttachment
                    ? "edit-file-present"
                    : "edit-file-empty"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="edit-attachment-upload"
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="edit-attachment-upload"
                  className="edit-upload-label"
                >
                  {attachment ? (
                    <span className="edit-file-name">
                      {attachment.name}{" "}
                      <button
                        className="edit-remove-button"
                        onClick={handleRemoveAttachment}
                      >
                        Remove
                      </button>
                    </span>
                  ) : existingAttachment ? (
                    <span className="edit-file-name">
                      {existingAttachment.name}{" "}
                      <button
                        className="edit-remove-button"
                        onClick={handleRemoveAttachment}
                      >
                        Remove
                      </button>
                    </span>
                  ) : (
                    <span className="edit-upload-icon">+</span>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="edit-assignment-right-section">
            <div className="edit-assignment-form-group due-date">
              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="edit-assignment-button-group">
              <Button
                color="#C53030"
                text="Cancel"
                size="medium"
                onClick={onClose}
              />
              <Button
                color="#25738b"
                text="Save"
                size="medium"
                onClick={handleSave}
              />
            </div>
          </div>
        </div>

        {error && <p className="edit-assignment-error-message">{error}</p>}
      </div>
    </div>
  );
};

export default EditAssignmentPopup;
