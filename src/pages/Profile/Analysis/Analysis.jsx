import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Analysis.css';

const Analysis = () => {
  return (
    <div className="analysis-page">
      <div className="analysis-tabbar">
        <NavLink to="cognitive" className={({ isActive }) => isActive ? 'active-tab' : ''}>
          Cognitive
        </NavLink>
        <NavLink to="behavioral" className={({ isActive }) => isActive ? 'active-tab' : ''}>
          Behavioral
        </NavLink>
      </div>
      <div className="analysis-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Analysis;
