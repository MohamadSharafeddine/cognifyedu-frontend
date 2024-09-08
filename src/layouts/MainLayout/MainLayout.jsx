import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import './MainLayout.css';

const MainLayout = () => {
  const location = useLocation();

  const menuItems = location.pathname.includes("/profile")
    ? ["Profile", "Settings", "Logout"]
    : ["Classes", "Class1", "Class2"];

  return (
    <div className="main-layout">
      <Sidebar menuItems={menuItems} />
      <div className="right-content">
        <TopBar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
