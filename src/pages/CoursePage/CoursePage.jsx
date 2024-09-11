import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import "./CoursePage.css";
import Button from "../../components/Button/Button";
import AddAssignmentPopup from "../../components/AddAssignmentPopup/AddAssignmentPopup";
import AddStudentPopup from "../../components/AddStudentPopup/AddStudentPopup";
import TabBar from "../../components/TabBar/TabBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignmentsByCourse } from "../../redux/slices/assignmentsSlice";

const CoursePage = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("Assignments");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddAssignmentPopup, setShowAddAssignmentPopup] = useState(false);
  const [showAddStudentPopup, setShowAddStudentPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { assignments = [], loading, error } = useSelector((state) => state.assignments || {});

  useEffect(() => {
    if (courseId) {
      console.log("useEffect triggered, dispatching fetchAssignmentsByCourse for courseId:", courseId);
      dispatch(fetchAssignmentsByCourse(courseId));
    } else {
      console.log("No courseId provided");
    }
  }, [courseId, dispatch]);
  

  const handleAddClick = () => {
    if (activeTab === "Assignments") {
      setShowAddAssignmentPopup(true);
    } else if (activeTab === "Students") {
      setShowAddStudentPopup(true);
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    navigate(`/course/${courseName}/${tab.toLowerCase()}`);
  };

  const tabs = ["Assignments", "Students", "Marks"];

  return (
    <div className="coursepage-container">
      <div className="coursepage-header">
        <h2 className="coursepage-title">{courseName}</h2>
        <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={handleTabSwitch} />
        <div className="coursepage-search-and-add">
          <div className="coursepage-search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {(activeTab === "Assignments" || activeTab === "Students") && (
            <Button
              color="#25738b"
              text="Add"
              size="medium"
              onClick={handleAddClick}
            />
          )}
        </div>
      </div>

      <div className="coursepage-content">
        <Outlet
          context={{
            searchTerm,
            assignmentsData,
            setAssignmentsData,
            studentsData,
            setStudentsData,
          }}
        />
      </div>

      {showAddAssignmentPopup && (
        <AddAssignmentPopup
          onClose={() => setShowAddAssignmentPopup(false)}
          onSave={(newAssignment) => {
            setAssignmentsData([...assignmentsData, newAssignment]);
            setShowAddAssignmentPopup(false);
          }}
        />
      )}

      {showAddStudentPopup && (
        <AddStudentPopup
          onClose={() => setShowAddStudentPopup(false)}
          onAddStudent={(newStudent) => {
            setStudentsData([...studentsData, newStudent]);
            setShowAddStudentPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default CoursePage;
