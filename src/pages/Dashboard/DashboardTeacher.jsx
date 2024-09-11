import React from "react";
import { useSelector } from "react-redux";

const DashboardTeacher = () => {
  const { courses } = useSelector((state) => state.courses);

  return (
    <div className="dashboard">
      <h2>Teacher Dashboard</h2>
      <div className="dashboard-stats">
        <h3>Courses</h3>
        <ul>
          {courses.map((classItem) => (
            <li key={classItem.className}>
              <h4>{classItem.className}</h4>
              <p>Teacher: {classItem.teacherName}</p>
              <p>Number of Assignments: {classItem.assignments.length}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardTeacher;
