import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ClassesSidebar from '../../components/ClassesSidebar/ClassesSidebar';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import TopBar from '../../components/TopBar/TopBar';
import './MainLayout.css';

const MainLayout = () => {
  const location = useLocation();

  const isProfilePage = location.pathname.startsWith("/profile");

  return (
    <div className="main-layout">
      {isProfilePage ? <ProfileSidebar /> : <ClassesSidebar />}
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
