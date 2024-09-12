import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsByCourse, deleteStudentFromCourse } from "../../redux/slices/studentsSlice";
import "./Students.css";
import Button from "../Button/Button";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup/DeleteConfirmationPopup";
import defaultAvatar from "../../assets/profile.png";

const Students = () => {
  const { searchTerm } = useOutletContext();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchStudentsByCourse(courseId));
    }
  }, [dispatch, courseId]);

  const filteredStudents = students.filter((student) => {
    const studentName = student?.name ? student.name.toLowerCase() : "";
    return searchTerm ? studentName.includes(searchTerm.toLowerCase()) : true;
  });

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    dispatch(deleteStudentFromCourse({ courseId, studentId: selectedStudent.id }));
    setShowDeletePopup(false);
  };

  return (
    <div className="students-list">
      {loading && <p>Loading students...</p>}
      {error && <p>Error fetching students: {error.message}</p>}
      {!loading && !error && (
        <>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={student.profile_picture || defaultAvatar}
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
        </>
      )}
    </div>
  );
};

export default Students;
