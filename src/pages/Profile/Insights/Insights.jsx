import React, { useState, useEffect } from "react";
import axios from '../../../utils/axios';
import { useOutletContext } from "react-router-dom";
import "./Insights.css";
import Button from "../../../components/Button/Button";
import TabBar from "../../../components/TabBar/TabBar";
import AddInsightPopup from "../../../components/AddInsightPopup/AddInsightPopup";

const Insights = () => {
  const { userId, teacherId } = useOutletContext();
  const [activeTab, setActiveTab] = useState("Summary");
  const [showPopup, setShowPopup] = useState(false);
  const [insightData, setInsightData] = useState({});
  const [loading, setLoading] = useState(true);

  const tabs = ["Summary", "Details", "Recommendations", "Progress"];

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get(`/insights/user/${userId}/latest`);
        setInsightData(response.data);
      } catch (error) {
        console.error("Error fetching insights:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, [userId]);

  const togglePopup = () => setShowPopup(!showPopup);

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;

    switch (activeTab) {
      case "Summary":
        return <div className="insights-card">{insightData.summary || 'No summary available.'}</div>;
      case "Details":
        return <div className="insights-card">{insightData.detailed_analysis || 'No details available.'}</div>;
      case "Recommendations":
        return <div className="insights-card">{insightData.recommendations || 'No recommendations available.'}</div>;
      case "Progress":
        return <div className="insights-card">{insightData.progress_tracking || 'No progress available.'}</div>;
      default:
        return <div className="insights-card">No content available</div>;
    }
  };

  return (
    <div className="insights-page">
      <div className="insights-header">
        <h2>Insights</h2>
        <Button
          text="Add Insight"
          color="#25738b"
          size="small"
          onClick={togglePopup}
        />
      </div>

      <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="insights-content">{renderContent()}</div>

      {showPopup && <AddInsightPopup onClose={togglePopup} userId={userId} teacherId={teacherId} />}
    </div>
  );
};

export default Insights;
