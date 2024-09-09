import React from "react";
import "./TabBar.css";

const TabBar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tabbar-container">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tabbar-button ${
            activeTab === tab ? "tabbar-active" : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
