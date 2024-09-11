import React, { useState, useEffect } from "react";
import "./EditAssignmentPopup.css";
import Button from "../Button/Button";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { updateAssignment } from "../../redux/slices/assignmentsSlice";
import moment from "moment";

const EditAssignmentPopup = ({ onClose, onSave, assignment }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [dueDate, setDueDate] = useState(assignment.due_date);
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
      "text/*": [".txt"],
    },
    onDrop: (acceptedFiles) => {
      setAttachment(acceptedFiles[0]);
    },
  });

  useEffect(() => {
    if (assignment.due_date) {
      const formattedDueDate = moment(assignment.due_date).format("YYYY-MM-DD");
      setDueDate(formattedDueDate);
    }
  }, [assignment.due_date]);

  const handleSave = async () => {
    if (title && dueDate) {
      const updatedAssignment = {
        id: assignment.id,
        title,
        description,
        due_date: dueDate,
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
    } else {
      setError("Please fill in the required fields");
    }
  };

  return (
    <div className="edit-assignment-modal">
      <div className="edit-assignment-modal-content">
        <h2>Edit Assignment</h2>
        <div className="edit-assignment-popup-body">
          <div className="edit-assignment-left-section">
            <div className="edit-assignment-form-group">
              <label>
                Title <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
                required
              />
            </div>

            <div className="edit-assignment-form-group">
              <label>
                Description <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                required
              />
            </div>

            <div className="edit-assignment-form-group">
              <label>Attach</label>
              <div {...getRootProps({ className: "edit-assignment-dropzone" })}>
                <input {...getInputProps()} />
                <p>
                  {attachment
                    ? attachment.name
                    : "Drag and drop a file here, or click to select a file"}
                </p>
                <div className="edit-assignment-attach-icon">📁</div>
              </div>
            </div>
          </div>

          <div className="edit-assignment-right-section">
            <div className="edit-assignment-form-group due-date">
              <label>
                Due Date <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="edit-assignment-button-group">
              <Button color="#25738b" text="Save" size="medium" onClick={handleSave} />
              <Button color="#e74c3c" text="Cancel" size="medium" onClick={onClose} />
            </div>
          </div>
        </div>

        {error && <p className="edit-assignment-error-message">{error}</p>}
      </div>
    </div>
  );
};

export default EditAssignmentPopup;
