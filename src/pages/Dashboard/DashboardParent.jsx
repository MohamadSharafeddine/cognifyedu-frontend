import React from 'react';
// import './DashboardParent.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardParent = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard-parent">
      <h1>Welcome, {user.name}</h1>
      <div className="dashboard-parent-overview">
        <h2>Your Child's Progress</h2>
        <div className="progress-cards">
          <div className="progress-card">
            <h3>Math</h3>
            <p>Progress: 85%</p>
            <Link to="/profile/analysis/cognitive">View Detailed Report</Link>
          </div>
          <div className="progress-card">
            <h3>Science</h3>
            <p>Progress: 78%</p>
            <Link to="/profile/analysis/behavioral">View Behavioral Insights</Link>
          </div>
        </div>
      </div>
      <div className="parent-actions">
        <h2>Actions</h2>
        <ul>
          <li>
            <Link to="/profile">View Child's Profile</Link>
          </li>
          <li>
            <Link to="/contact-teacher">Contact Teacher</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardParent;
