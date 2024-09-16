import React, { useState, useEffect } from "react";
import axios from '../../../utils/axios';
import { useOutletContext } from "react-router-dom";
import "./Insights.css";
import TabBar from "../../../components/TabBar/TabBar";

const Insights = () => {
  const { userId } = useOutletContext();
  const [activeTab, setActiveTab] = useState("Summary");
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
      <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="insights-content">{renderContent()}</div>
    </div>
  );
};

export default Insights;
