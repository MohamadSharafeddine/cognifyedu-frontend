import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses, deleteCourse } from "../../redux/slices/coursesSlice";
import "./AdminCourses.css";
import Button from "../../components/Button/Button";
import DeleteConfirmationPopup from "../../components/DeleteConfirmationPopup/DeleteConfirmationPopup";

const AdminCourses = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    if (selectedCourse) {
      dispatch(deleteCourse(selectedCourse.id))
        .unwrap()
        .then(() => setShowDeletePopup(false))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="admincourses-container">
      <div className="admincourses-header">
        <input
          type="text"
          placeholder="Search Courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="admincourses-list">
        {loading && <p>Loading courses...</p>}
        {error && <p>Error fetching courses: {error}</p>}
        {!loading && !error && (
          <table className="admincourses-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Teacher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr key={index}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.teacher?.name || "Unknown"}</td>
                  <td>
                    <div className="button-group">
                      <Button
                        color="#C53030"
                        text="Delete"
                        size="small"
                        onClick={() => handleDeleteClick(course)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showDeletePopup && (
        <DeleteConfirmationPopup
          onClose={() => setShowDeletePopup(false)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default AdminCourses;
