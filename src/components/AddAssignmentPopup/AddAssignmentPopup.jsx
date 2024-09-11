import React, { useState } from "react";
import "./AddAssignmentPopup.css";
import Button from "../Button/Button";
import { useDropzone } from "react-dropzone";
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
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
      "text/*": [".txt"],
    },
    onDrop: (acceptedFiles) => {
      setAttachment(acceptedFiles[0]);
    },
  });

  const handleAddAssignment = () => {
    if (!title.trim() || !description.trim() || !dueDate || !courseId) {
      setError("Title, Description, Due Date, and Course ID are required.");
      return;
    }

    const formattedDueDate = moment(dueDate).format("YYYY-MM-DD");

    const newAssignment = {
      course_id: courseId,
      title,
      description,
      due_date: formattedDueDate,
      attachment,
    };

    dispatch(addAssignment(newAssignment))
      .unwrap()
      .catch((err) => {
        console.error("Error adding assignment:", err);
      });

    onClose();
  };

  return (
    <div className="add-assignment-modal">
      <div className="add-assignment-modal-content">
        <h2>Add Assignment</h2>

        <div className="add-assignment-popup-body">
          <div className="add-assignment-left-section">
            <div className="add-assignment-form-group">
              <label>
                Title <span style={{ color: "red" }}>*</span>
              </label>
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

            <div className="add-assignment-form-group">
              <label>Attach</label>
              <div {...getRootProps({ className: "add-assignment-dropzone" })}>
                <input {...getInputProps()} />
                <p>
                  {attachment
                    ? attachment.name
                    : "Drag and drop a file here, or click to select a file"}
                </p>
                <div className="add-assignment-attach-icon">📁</div>
              </div>
            </div>
          </div>

          <div className="add-assignment-right-section">
            <div className="add-assignment-form-group due-date">
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
