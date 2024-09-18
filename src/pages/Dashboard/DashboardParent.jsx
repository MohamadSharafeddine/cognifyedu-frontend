import React from "react";
import { useSelector } from "react-redux";
import "./DashboardParent.css";

const DashboardParent = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard-parent">
      <h1>Welcome, {user.name}!</h1>
      <div className="parent-welcome-card">
        <p>
          Dive into your child's educational journey! Here, you can explore their progress, gain insights, and celebrate their achievements. Use the menu to access detailed analysis and support their learning every step of the way.
        </p>
      </div>
    </div>
  );
};

export default DashboardParent;
