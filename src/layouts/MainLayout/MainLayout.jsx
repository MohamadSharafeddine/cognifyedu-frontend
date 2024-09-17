import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import CoursesSidebar from "../../components/CoursesSidebar/CoursesSidebar";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import ParentSidebar from "../../components/ParentSidebar/ParentSidebar";
import TopBar from "../../components/TopBar/TopBar";
import { useSelector } from "react-redux";
import "./MainLayout.css";

const MainLayout = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const isProfilePage = location.pathname.startsWith("/profile");

  return (
    <div className="mainlayout-container">
      {user?.type === "admin" ? (
        <AdminSidebar />
      ) : isProfilePage ? (
        <ProfileSidebar />
      ) : user?.type === "parent" ? (
        <ParentSidebar />
      ) : (
        <CoursesSidebar />
      )}
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
