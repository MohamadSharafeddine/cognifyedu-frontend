import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addClass, deleteClass, selectClass, editClass } from "../../redux/slices/classesSlice";
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

  const handleEditClass = (oldClassName, newClassName, newDescription) => {
    dispatch(editClass({ oldClassName, newClassName, newDescription }));
  };

  const handleAddClick = () => {
    setIsAddClassOpen(true);
  };

  return (
    <div className="classes-container">
      {selectedClass === "Classes" ? (
        <>
          <div className="classes-addbutton">
            <Button
              color="#25738b"
              text="Add"
              size="medium"
              onClick={handleAddClick}
            />
          </div>
          <div className="classes-cardscontainer">
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
