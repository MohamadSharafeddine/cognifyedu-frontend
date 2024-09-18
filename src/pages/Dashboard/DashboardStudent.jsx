import React, { useState } from "react";
import { useSelector } from "react-redux";
import SubmitAssignmentPopup from "../../components/SubmitAssignmentPopup/SubmitAssignmentPopup";

const DashboardStudent = () => {
  const { courses } = useSelector((state) => state.courses);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment); 
  };

  const closeSubmitAssignmentPopup = () => {
    setSelectedAssignment(null); 
  };

  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      <div className="dashboard-assignments">
        <h3>Upcoming Assignments</h3>
        <ul>
          {courses.map((courseItem) =>
            courseItem.assignments.map((assignment, index) => (
              <li key={index} onClick={() => handleAssignmentClick(assignment)}>
                <h4>{assignment.title}</h4>
                <p>Due Date: {assignment.dueDate}</p>
                <p>{assignment.submitted ? "Submitted" : "Not Submitted"}</p>
              </li>
            ))
          )}
        </ul>
      </div>

      {selectedAssignment && (
        <SubmitAssignmentPopup
          assignment={selectedAssignment}
          onClose={closeSubmitAssignmentPopup}
        />
      )}
    </div>
  );
};

export default DashboardStudent;
