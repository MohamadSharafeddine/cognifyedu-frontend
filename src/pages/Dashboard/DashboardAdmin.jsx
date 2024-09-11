import React from "react";
// import './DashboardAdmin.css';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardAdmin = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard-admin">
      <h1>Welcome, {user.name}</h1>
      <div className="admin-overview">
        <h2>System Overview</h2>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Number of Students</h3>
            <p>250</p>
          </div>
          <div className="stat-card">
            <h3>Number of Teachers</h3>
            <p>45</p>
          </div>
          <div className="stat-card">
            <h3>Number of Courses</h3>
            <p>120</p>
          </div>
        </div>
      </div>
      <div className="admin-actions">
        <h2>Admin Actions</h2>
        <ul>
          <li>
            <Link to="/manage-users">Manage Users</Link>
          </li>
          <li>
            <Link to="/manage-courses">Manage Courses</Link>
          </li>
          <li>
            <Link to="/system-settings">System Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardAdmin;
