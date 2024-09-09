import React, { useState } from "react";
import "./Insights.css";
import Button from "../../../components/Button/Button";
import TabBar from "../../../components/TabBar/TabBar";
import AddInsightPopup from "../../../components/AddInsightPopup/AddInsightPopup";

const Insights = () => {
  const [activeTab, setActiveTab] = useState("Summary");
  const [showPopup, setShowPopup] = useState(false);

  const tabs = ["Summary", "Details", "Recommendations", "Progress"];

  const togglePopup = () => setShowPopup(!showPopup);

  const renderContent = () => {
    switch (activeTab) {
      case "Summary":
        return (
          <div className="insights-card">
            You have demonstrated strong critical thinking skills, consistently
            applying logical reasoning to solve complex problems. However, there
            is room for improvement in time management, as you often rush
            through tasks, leading to minor errors.
          </div>
        );
      case "Details":
        return (
          <div className="insights-card">
            Detailed insights about John's performance...
          </div>
        );
      case "Recommendations":
        return (
          <div className="insights-card">
            Recommendations to improve John's performance...
          </div>
        );
      case "Progress":
        return (
          <div className="insights-card">
            Progress tracked over the course of assignments...
          </div>
        );
      default:
        return <div className="insights-card">No content available</div>;
    }
  };

  return (
    <div className="insights-page">
      <div className="insights-header">
        <h2>John Doe</h2>
        <Button
          text="Add Insight"
          color="#25738b"
          size="small"
          onClick={togglePopup}
        />
      </div>

      <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="insights-content">{renderContent()}</div>

      {showPopup && <AddInsightPopup onClose={togglePopup} />}
    </div>
  );
};

export default Insights;
