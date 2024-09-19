import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./AdminStudents.css";
import Button from "../../../components/Button/Button";
import DeleteConfirmationPopup from "../../../components/DeleteConfirmationPopup/DeleteConfirmationPopup";
import AddParentPopup from "../../../components/AddParentPopup/AddParentPopup";
import { deleteUser } from "../../../redux/slices/usersSlice";

const AdminStudents = () => {
  const { searchTerm, users } = useOutletContext();
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAddParentPopup, setShowAddParentPopup] = useState(false);

  useEffect(() => {
    if (users) {
      const filteredStudents = users.filter((user) => user.type === "student");
      setStudents(filteredStudents);
    }
  }, [users]);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowDeletePopup(true);
  };

  const handleAddParentClick = (student) => {
    setSelectedStudent(student);
    setShowAddParentPopup(true);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      dispatch(deleteUser(selectedStudent.id))
        .unwrap()
        .then(() => setShowDeletePopup(false))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="adminstudents-list">
      <table className="adminstudents-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <div className="adminstudents-button-group">
                  <Button
                    color="#25738b"
                    text="Add Parent"
                    size="small"
                    onClick={() => handleAddParentClick(student)}
                  />
                  <Button
                    color="#C53030"
                    text="Delete"
                    size="small"
                    onClick={() => handleDeleteClick(student)}
                  />
                </div>
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

      {showAddParentPopup && (
        <AddParentPopup
          student={selectedStudent}
          onClose={() => setShowAddParentPopup(false)}
        />
      )}
    </div>
  );
};

export default AdminStudents;
