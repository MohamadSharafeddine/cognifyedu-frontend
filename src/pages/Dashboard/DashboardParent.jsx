import React from "react";
import { useNavigate } from "react-router-dom";
// import "./DashboardParent.css";
import Button from "../../components/Button/Button";

const DashboardParent = () => {
  const navigate = useNavigate();

  const handleViewChildren = () => {
    navigate("/parent/children");
  };

  return (
    <div className="dashboardparent-container">
      <h1>Parent Dashboard</h1>
      <Button 
        text="View Children" 
        onClick={handleViewChildren} 
        size="large"
        color="#25738b"
      />
    </div>
  );
};

export default DashboardParent;
