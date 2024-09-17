import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addParentToStudent } from "../../redux/slices/usersSlice";
import "./AddParentPopup.css";
import Button from "../Button/Button";

const AddParentPopup = ({ onClose, student }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleAddParent = () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    dispatch(addParentToStudent({ studentId: student.id, email }))
      .unwrap()
      .then((updatedStudent) => {
        onClose(updatedStudent);
      })
      .catch((err) => {
        setError(err.message || "Failed to add parent");
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Parent</h2>
        <div className="form-group">
          <label>
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Enter Parent Email"
            required
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="button-group">
          <Button color="#e74c3c" text="Cancel" size="medium" onClick={onClose} />
          <Button color="#25738b" text="Add" size="medium" onClick={handleAddParent} />
        </div>
      </div>
    </div>
  );
};

export default AddParentPopup;
