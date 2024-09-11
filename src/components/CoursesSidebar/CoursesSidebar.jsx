import React, { useEffect } from "react";
import "./CoursesSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCourse } from "../../redux/slices/uiSlice"; 
import Logo from "../../assets/logo-bar.png";

const CoursesSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCourseId = useSelector((state) => state.ui.selectedCourseId); 
  const coursesData = useSelector((state) => state.courses.courses);

  useEffect(() => {
    if (!selectedCourseId) {
      handleCoursesSelect();
    }
  }, [selectedCourseId, navigate]);

  useEffect(() => {
    if (location.pathname === "/courses") {
      dispatch(selectCourse({ courseId: "Courses", courseName: "Courses" }));
    }
  }, [location, dispatch]);

  const handleCoursesSelect = () => {
    dispatch(selectCourse({ courseId: "Courses", courseName: "Courses" }));
    navigate("/courses");
  };

  const handleCourseSelect = (courseId, courseName) => {
    dispatch(selectCourse({ courseId, courseName }));
    navigate(`/course/${courseId}`);
  };

  const handleLogoClick = () => {
    handleCoursesSelect();
  };

  return (
    <div className="sidebar">
      <img
        src={Logo}
        alt="CognifyEdu Logo"
        className="sidebar-logo"
        onClick={handleLogoClick}
      />
      <ul>
        <li>
          <button
            className={selectedCourseId === "Courses" || location.pathname === "/courses" ? "active" : ""}
            onClick={handleCoursesSelect}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faThList} />
            </div>
            <div className="title">Courses</div>
          </button>
        </li>
        {coursesData.map((courseItem) => (
          <li key={courseItem.id}>
            <button
              className={selectedCourseId === courseItem.id ? "active" : ""}
              onClick={() => handleCourseSelect(courseItem.id, courseItem.name)}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faThList} />
              </div>
              <div className="title">{courseItem.name}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesSidebar;
