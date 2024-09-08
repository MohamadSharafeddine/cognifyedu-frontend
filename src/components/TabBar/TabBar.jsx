import React from "react";
import "./TabBar.css";

const TabBar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? "active" : ""}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
