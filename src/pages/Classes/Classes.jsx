import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addClass, deleteClass, editClass } from "../../redux/slices/classesSlice"; // Import the editClass action
import "./Classes.css";
import ClassCard from "../../components/ClassCard/ClassCard";
import ClassPage from "../ClassPage/ClassPage";
import Button from "../../components/Button/Button";
import AddClassPopupTeacher from "../../components/AddClassPopupTeacher/AddClassPopupTeacher";

const Classes = () => {
  const dispatch = useDispatch();
  const selectedClass = useSelector((state) => state.classes.selectedClass); // Fetch selected class from Redux
  const classesData = useSelector((state) => state.classes.classes); // Fetch classes data from Redux
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  const handleAddClass = (newClass) => {
    dispatch(addClass(newClass));
    setIsAddClassOpen(false);
  };

  const handleDeleteClass = (className) => {
    dispatch(deleteClass(className));
  };

  const handleEditClass = (oldClassName, newClassName, newDescription) => {
    dispatch(editClass({ oldClassName, newClassName, newDescription }));
  };

  const handleAddClick = () => {
    setIsAddClassOpen(true);
  };

  return (
    <div className="classes-content">
      {selectedClass === "Classes" ? (
        <>
          <div className="add-button-container">
            <Button
              color="#25738b"
              text="Add"
              size="medium"
              onClick={handleAddClick}
            />
          </div>

          <div className="cards-container">
            {classesData.map((classItem, index) => (
              <ClassCard
                key={index}
                className={classItem.className}
                teacherName={classItem.teacherName}
                description={classItem.description}
                onDelete={handleDeleteClass}
                onEdit={handleEditClass}
              />
            ))}
          </div>
        </>
      ) : (
        <ClassPage />
      )}

      {isAddClassOpen && (
        <AddClassPopupTeacher
          onClose={() => setIsAddClassOpen(false)}
          onAddClass={handleAddClass}
        />
      )}
    </div>
  );
};

export default Classes;
