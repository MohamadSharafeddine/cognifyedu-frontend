import React, { useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import "./ClassPage.css";
import Button from "../../components/Button/Button";
import AddAssignmentPopup from "../../components/AddAssignmentPopup/AddAssignmentPopup";
import AddStudentPopup from "../../components/AddStudentPopup/AddStudentPopup"; // Import AddStudentPopup
import TabBar from "../../components/TabBar/TabBar"; // Import TabBar

const ClassPage = () => {
  const { className } = useParams(); // Get className from URL
  const [activeTab, setActiveTab] = useState("Assignments"); // Default tab
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [showAddAssignmentPopup, setShowAddAssignmentPopup] = useState(false);
  const [showAddStudentPopup, setShowAddStudentPopup] = useState(false); // For the student popup
  const [assignmentsData, setAssignmentsData] = useState([]); // Assignments data
  const [studentsData, setStudentsData] = useState([]); // Students data

  const navigate = useNavigate();

  const handleAddClick = () => {
    if (activeTab === "Assignments") {
      setShowAddAssignmentPopup(true);
    } else if (activeTab === "Students") {
      setShowAddStudentPopup(true); // Show AddStudentPopup
    }
  };

  // Handle tab switching with navigation
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    navigate(`/class/${className}/${tab.toLowerCase()}`);
  };

  const tabs = ["Assignments", "Students", "Marks"]; // Tab labels

  return (
    <div className="class-page">
      <div className="class-header">
        <h2 className="class-title">{className}</h2> {/* Display class name */}
        {/* Use TabBar to switch between tabs */}
        <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={handleTabSwitch} />

        <div className="class-search-and-add">
          <div className="class-search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </div>
          {(activeTab === "Assignments" || activeTab === "Students") && (
            <Button color="#25738b" text="Add" size="medium" onClick={handleAddClick} />
          )}
        </div>
      </div>

      <div className="class-content">
        {/* Pass searchTerm as a prop to be used in the child components */}
        <Outlet context={{ searchTerm, assignmentsData, setAssignmentsData, studentsData, setStudentsData }} />
      </div>

      {/* Show the respective popup */}
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
            setStudentsData([...studentsData, newStudent]); // Add the new student
            setShowAddStudentPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default ClassPage;