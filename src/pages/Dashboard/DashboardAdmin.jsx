import React from "react";
import { useSelector } from "react-redux";
import "./DashboardAdmin.css";

const DashboardAdmin = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard-admin">
      <h1>Welcome, {user.name}!</h1>
      <div className="admin-welcome-card">
        <p>
          As an administrator, you hold the keys to the platform! Monitor and manage users, oversee courses, and ensure a seamless experience for everyone. Navigate through the menu to start making an impact today.
        </p>
      </div>
    </div>
  );
};

export default DashboardAdmin;
