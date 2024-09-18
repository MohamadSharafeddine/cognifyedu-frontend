import React, { useState } from "react";
import { useSelector } from "react-redux";
import ViewSubmissionsPopup from "../../components/ViewSubmissionsPopup/ViewSubmissionsPopup";

const DashboardTeacher = () => {
  const { courses } = useSelector((state) => state.courses);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment); 
  };

  const closeViewSubmissionsPopup = () => {
    setSelectedAssignment(null); 
  };

  return (
    <div className="dashboard">
      <h2>Teacher Dashboard</h2>
      <div className="dashboard-assignments">
        <h3>Upcoming Assignments</h3>
        <ul>
          {courses.map((courseItem) =>
            courseItem.assignments.map((assignment, index) => (
              <li key={index} onClick={() => handleAssignmentClick(assignment)}>
                <h4>{assignment.title}</h4>
                <p>Due Date: {assignment.dueDate}</p>
                <p>Number of Submissions: {assignment.submissionsCount}</p>
              </li>
            ))
          )}
        </ul>
      </div>

      {selectedAssignment && (
        <ViewSubmissionsPopup
          assignmentTitle={selectedAssignment.title}
          assignmentId={selectedAssignment.id}
          onClose={closeViewSubmissionsPopup}
        />
      )}
    </div>
  );
};

export default DashboardTeacher;
