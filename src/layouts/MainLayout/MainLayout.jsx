import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import CoursesSidebar from "../../components/CoursesSidebar/CoursesSidebar";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import TopBar from "../../components/TopBar/TopBar";
import "./MainLayout.css";

const MainLayout = () => {
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith("/profile");

  return (
    <div className="mainlayout-container">
      {isProfilePage ? <ProfileSidebar /> : <CoursesSidebar />}
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
