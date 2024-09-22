import React, { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentsByCourse,
  deleteStudentFromCourse,
} from "../../redux/slices/studentsSlice";
import "./Students.css";
import Button from "../Button/Button";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup/DeleteConfirmationPopup";
import defaultAvatar from "../../assets/profile.jpg";
import { FRONTEND_API_URL } from "../../../src/constants";

const Students = () => {
  const { searchTerm } = useOutletContext();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error } = useSelector((state) => state.students);
  const userType = useSelector((state) => state.auth.user?.type);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    if (courseId && students.length === 0) {
      dispatch(fetchStudentsByCourse(courseId));
    }
  }, [dispatch, courseId, students.length]);

  const sortedStudents = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const filteredStudents = sortedStudents.filter((student) => {
    const studentName = student?.name ? student.name.toLowerCase() : "";
    return searchTerm ? studentName.includes(searchTerm.toLowerCase()) : true;
  });

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    dispatch(
      deleteStudentFromCourse({ courseId, studentId: selectedStudent.id })
    );
    setShowDeletePopup(false);
  };

  const getProfileImageUrl = (student) => {
    return student.profile_picture
      ? `${FRONTEND_API_URL}${student.profile_picture}`
      : defaultAvatar;
  };

  const handleStudentClick = (studentId) => {
    if (userType === "teacher") {
      navigate(`/profile/${studentId}/analysis/cognitive`);
    }
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
                {userType === "teacher" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td
                    onClick={() => handleStudentClick(student.id)}
                    style={{
                      cursor: userType === "teacher" ? "pointer" : "default",
                    }}
                  >
                    <img
                      src={getProfileImageUrl(student)}
                      alt="avatar"
                      className="avatar"
                    />
                    {student.name}
                  </td>
                  {userType === "teacher" && (
                    <td>
                      <Button
                        color="#C53030"
                        text="Remove"
                        size="small"
                        onClick={() => handleDeleteClick(student)}
                      />
                    </td>
                  )}
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
