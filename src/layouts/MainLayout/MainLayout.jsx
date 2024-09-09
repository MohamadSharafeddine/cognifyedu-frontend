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
    <div className="mainlayout-container">
      {isProfilePage ? <ProfileSidebar /> : <ClassesSidebar />}
      <div className="mainlayout-rightcontent">
        <TopBar />
        <div className="mainlayout-maincontent">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
