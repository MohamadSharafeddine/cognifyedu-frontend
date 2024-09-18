import React, { useState } from "react";
import "./CourseCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup/DeleteConfirmationPopup";
import EditCoursePopup from "../EditCoursePopup/EditCoursePopup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCourse } from "../../redux/slices/uiSlice";

const CourseCard = ({
  courseId,
  courseName,
  teacherName,
  description,
  onDelete,
  onEdit,
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userType = useSelector((state) => state.auth.user?.type);

  const handleCardClick = () => {
    dispatch(selectCourse({ courseId, courseName }));
    navigate(`/course/${courseId}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeletePopup(true);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowEditPopup(true);
  };

  const handleDeleteConfirmation = () => {
    onDelete();
    setShowDeletePopup(false);
  };

  const handleEditConfirmation = (newCourseName, newDescription) => {
    const updatedData = { name: newCourseName, description: newDescription };
    onEdit(courseId, updatedData);
    setShowEditPopup(false);
  };

  return (
    <div className="coursecard-container" onClick={handleCardClick}>
      <div className="coursecard-header">
        <div className="coursecard-header-top">
          <span className="coursecard-coursename">{courseName}</span>
          {userType === "teacher" && (
            <div className="coursecard-icon-group">
              <span className="coursecard-delete-icon" onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span className="coursecard-edit-icon" onClick={handleEditClick}>
                <FontAwesomeIcon icon={faEdit} />
              </span>
            </div>
          )}
        </div>
        <div className="coursecard-header-bottom">
          <span className="coursecard-teacher">{teacherName}</span>
        </div>
      </div>
      <div className="coursecard-body">
        <h3>Description</h3>
        <div className="coursecard-description-container">
          <p className="coursecard-description">{description}</p>
        </div>
      </div>

      {showDeletePopup && (
        <div onClick={(e) => e.stopPropagation()}>
          <DeleteConfirmationPopup
            onClose={() => setShowDeletePopup(false)}
            onDelete={handleDeleteConfirmation}
          />
        </div>
      )}

      {showEditPopup && (
        <div onClick={(e) => e.stopPropagation()}>
          <EditCoursePopup
            courseName={courseName}
            description={description}
            onClose={() => setShowEditPopup(false)}
            onSave={handleEditConfirmation}
          />
        </div>
      )}
    </div>
  );
};

export default CourseCard;
