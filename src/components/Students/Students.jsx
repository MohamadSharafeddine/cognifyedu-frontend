import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./Students.css";
import defaultAvatar from "../../assets/profile.png";
import Button from "../Button/Button";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup/DeleteConfirmationPopup";

const Students = () => {
  const { searchTerm, studentsData, setStudentsData } = useOutletContext();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const filteredStudents = studentsData.filter((student) => {
    const studentName = student.name ? student.name.toLowerCase() : "";
    return studentName.includes(searchTerm.toLowerCase());
  });

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    setStudentsData((prevStudents) =>
      prevStudents.filter((student) => student.id !== selectedStudent.id)
    );
    setShowDeletePopup(false);
  };

  return (
    <div className="students-list">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index} className="clickable-row">
              <td>
                <img
                  src={student.avatar || defaultAvatar}
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                  }}
                  alt="avatar"
                  className="avatar"
                />
                {student.name}
              </td>
              <td>
                <Button
                  color="#e74c3c"
                  text="Remove"
                  size="small"
                  onClick={() => handleDeleteClick(student)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeletePopup && (
        <DeleteConfirmationPopup
          onClose={() => setShowDeletePopup(false)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default Students;
