import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addClass, deleteClass, selectClass } from "../../redux/slices/classesSlice";
import "./Classes.css";
import ClassCard from "../../components/ClassCard/ClassCard";
import Button from "../../components/Button/Button";
import AddClassPopupTeacher from "../../components/AddClassPopupTeacher/AddClassPopupTeacher";

const Classes = () => {
  const dispatch = useDispatch();
  const selectedClass = useSelector((state) => state.classes.selectedClass);
  const classesData = useSelector((state) => state.classes.classes);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  useEffect(() => {
    dispatch(selectClass('Classes'));
  }, [dispatch]);

  const handleAddClass = (newClass) => {
    dispatch(addClass(newClass));
    setIsAddClassOpen(false);
  };

  const handleDeleteClass = (className) => {
    dispatch(deleteClass(className));
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
              />
            ))}
          </div>
        </>
      ) : (
        <p>No classes selected.</p>
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
