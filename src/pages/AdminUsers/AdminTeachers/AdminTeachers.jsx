import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./AdminTeachers.css";
import Button from "../../../components/Button/Button";
import DeleteConfirmationPopup from "../../../components/DeleteConfirmationPopup/DeleteConfirmationPopup";
import { deleteUser } from "../../../redux/slices/usersSlice";

const AdminTeachers = () => {
  const { searchTerm, users } = useOutletContext();
  const dispatch = useDispatch();
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    if (users) {
      const filteredTeachers = users.filter((user) => user.type === "teacher");
      setTeachers(filteredTeachers);
    }
  }, [users]);

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    if (selectedTeacher) {
      dispatch(deleteUser(selectedTeacher.id))
        .unwrap()
        .then(() => setShowDeletePopup(false))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="adminteachers-list">
      <table className="adminteachers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.map((teacher, index) => (
            <tr key={index}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>
                <div className="button-group">
                  <Button
                    color="#e74c3c"
                    text="Delete"
                    size="small"
                    onClick={() => handleDeleteClick(teacher)}
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
    </div>
  );
};

export default AdminTeachers;
