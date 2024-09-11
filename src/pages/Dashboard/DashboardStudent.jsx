import React from "react";
import { useSelector } from "react-redux";

const DashboardStudent = () => {
  const { courses } = useSelector((state) => state.courses);

  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      <div className="dashboard-assignments">
        <h3>Upcoming Assignments</h3>
        <ul>
          {courses.map((courseItem) =>
            courseItem.assignments.map((assignment, index) => (
              <li key={index}>
                <h4>{assignment.title}</h4>
                <p>Due Date: {assignment.dueDate}</p>
                <p>{assignment.submitted ? "Submitted" : "Not Submitted"}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardStudent;
