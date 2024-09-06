import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Classes.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import ClassCard from "../../components/ClassCard/ClassCard";
import ClassPage from "../Class/Class";
import TopBar from "../../components/TopBar/TopBar";
import Button from "../../components/Button/Button";
import AddClassTeacher from "../../components/AddClassTeacher/AddClassTeacher";

const initialClassesData = [
  {
    className: "Class1",
    teacherName: "Max Fischer",
    description: "This is a brief description of Class1",
  },
  {
    className: "Class2",
    teacherName: "Jane Doe",
    description: "This is a brief description of Class2",
  },
];

const Classes = () => {
  const selectedClass = useSelector((state) => state.classState.selectedClass);
  const [classesData, setClassesData] = useState(initialClassesData);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  const handleAddClass = (newClass) => {
    setClassesData([...classesData, newClass]);
    setIsAddClassOpen(false);
  };

  const handleAddClick = () => {
    setIsAddClassOpen(true);
  };

  const handleDeleteClass = (className) => {
    setClassesData(classesData.filter(classItem => classItem.className !== className));
  };

  return (
    <div className="main-content">
      <Sidebar menuItems={["Classes", ...classesData.map(classItem => classItem.className)]} />
      <div className="right-content">
        <TopBar />

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
            <ClassPage />
          )}
        </div>
      </div>

      {isAddClassOpen && (
        <AddClassTeacher
          onClose={() => setIsAddClassOpen(false)}
          onAddClass={handleAddClass}
        />
      )}
    </div>
  );
};

export default Classes;
