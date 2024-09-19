import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addParentToStudent } from "../../redux/slices/usersSlice";
import "./AddParentPopup.css";
import Button from "../Button/Button";

const AddParentPopup = ({ onClose, student }) => {
  const [parentId, setParentId] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleAddParent = () => {
    if (!parentId.trim()) {
      setError("Parent ID is required");
      return;
    }

    dispatch(addParentToStudent({ studentId: student.id, parentId }))
      .unwrap()
      .then((updatedStudent) => {
        onClose(updatedStudent);
      })
      .catch((err) => {
        setError(err.message || "Parent ID not found or failed to add parent");
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("add-parent-modal")) {
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="add-parent-modal">
      <div className="add-parent-modal-content">
        <h2>Add Parent</h2>
        <div className="add-parent-form-group">
          <label>
            Parent ID <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={parentId}
            onChange={(e) => {
              setParentId(e.target.value);
              setError("");
            }}
            placeholder="Enter Parent ID"
            required
          />
          {error && <p className="add-parent-error-message">{error}</p>}
        </div>
        <div className="add-parent-button-group">
          <Button
            color="#C53030"
            text="Cancel"
            size="medium"
            onClick={onClose}
          />
          <Button
            color="#25738b"
            text="Add"
            size="medium"
            onClick={handleAddParent}
          />
        </div>
      </div>
    </div>
  );
};

export default AddParentPopup;
