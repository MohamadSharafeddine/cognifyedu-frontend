import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses, createCourse, deleteCourse, updateCourse } from "../../redux/slices/coursesSlice";
import "./Courses.css";
import CourseCard from "../../components/CourseCard/CourseCard";
import Button from "../../components/Button/Button";
import AddCoursePopupTeacher from "../../components/AddCoursePopupTeacher/AddCoursePopupTeacher";

const Courses = () => {
  const dispatch = useDispatch();
  const coursesData = useSelector((state) => state.courses.courses);
  const userId = useSelector((state) => state.auth.user?.id);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCourses()); 
    }
  }, [dispatch, userId]);

  const handleAddCourse = (newCourse) => {
    dispatch(createCourse(newCourse)); 
    setIsAddCourseOpen(false);
  };

  const handleDeleteCourse = (courseId) => {
    dispatch(deleteCourse(courseId)); 
  };

  const handleEditCourse = (id, updatedData) => {
    dispatch(updateCourse({ id, updatedData }));
  };

  const handleAddClick = () => {
    setIsAddCourseOpen(true);
  };

  return (
    <div className="courses-container">
      <div className="courses-addbutton">
        <Button
          color="#25738b"
          text="Add"
          size="medium"
          onClick={handleAddClick}
        />
      </div>
      <div className="courses-cardscontainer">
        {coursesData.map((courseItem) => (
          <CourseCard
            key={courseItem.id}
            courseId={courseItem.id}
            courseName={courseItem.name}
            teacherName={courseItem.teacherName || "Teacher Name"}
            description={courseItem.description || "No description available"}
            onDelete={() => handleDeleteCourse(courseItem.id)}
            onEdit={handleEditCourse}
          />
        ))}
      </div>

      {isAddCourseOpen && (
        <AddCoursePopupTeacher
          onClose={() => setIsAddCourseOpen(false)}
          onAddCourse={handleAddCourse}
        />
      )}
    </div>
  );
};

export default Courses;
