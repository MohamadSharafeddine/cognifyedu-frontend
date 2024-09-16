import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import "./CoursePage.css";
import Button from "../../components/Button/Button";
import AddAssignmentPopup from "../../components/AddAssignmentPopup/AddAssignmentPopup";
import AddStudentPopup from "../../components/AddStudentPopup/AddStudentPopup";
import TabBar from "../../components/TabBar/TabBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignmentsByCourse } from "../../redux/slices/assignmentsSlice";
import { fetchMarks } from "../../redux/slices/marksSlice";
import { fetchStudentsByCourse } from "../../redux/slices/studentsSlice";

const CoursePage = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("Assignments");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddAssignmentPopup, setShowAddAssignmentPopup] = useState(false);
  const [showAddStudentPopup, setShowAddStudentPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    assignments = [],
    loading,
    error,
  } = useSelector((state) => state.assignments || {});

  const { user } = useSelector((state) => state.auth);
  const userType = user?.type;

  const { marksData, loading: marksLoading } = useSelector((state) => state.marks);
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchAssignmentsByCourse(courseId));
      dispatch(fetchMarks(courseId));
      dispatch(fetchStudentsByCourse(courseId));
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
    navigate(`/course/${courseId}/${tab.toLowerCase()}`);
  };

  const tabs = ["Assignments", "Students"];
  if (userType === "teacher") {
    tabs.push("Marks");
  }

  return (
    <div className="coursepage-container">
      <div className="coursepage-header">
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={handleTabSwitch}
        />
        <div className="coursepage-search-and-add">
          <div className="coursepage-search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {userType === "teacher" && (activeTab === "Assignments" || activeTab === "Students") && (
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
        {loading && <p>Loading assignments...</p>}
        {error && <p>Error fetching assignments: {JSON.stringify(error)}</p>}
        {!loading && !error && (
          <Outlet
            context={{
              searchTerm,
              assignments,
              marksData,
              students,
              user,
            }}
          />
        )}
      </div>

      {showAddAssignmentPopup && (
        <AddAssignmentPopup onClose={() => setShowAddAssignmentPopup(false)} />
      )}

      {showAddStudentPopup && (
        <AddStudentPopup
          onClose={() => setShowAddStudentPopup(false)}
          courseId={courseId}
        />
      )}
    </div>
  );
};

export default CoursePage;
