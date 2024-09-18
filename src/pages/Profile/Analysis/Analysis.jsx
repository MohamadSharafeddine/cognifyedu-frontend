import React, { useState } from 'react';
import './Analysis.css';
import TabBar from '../../../components/TabBar/TabBar';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';

const Analysis = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Cognitive');

  const { userId, teacherId } = useOutletContext();

  const tabs = ['Cognitive', 'Behavioral'];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab.toLowerCase());
  };

  return (
    <div className="analysis-page">
      <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={handleTabChange} />
      <div className="analysis-content">
        <Outlet context={{ userId, teacherId }} />
      </div>
    </div>
  );
};

export default Analysis;
