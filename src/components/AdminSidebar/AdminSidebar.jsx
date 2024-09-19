import React from "react";
import "./AdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo-bar.jpg";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="adminsidebar-container">
      <img
        src={Logo}
        alt="CognifyEdu Logo"
        className="adminsidebar-logo"
        onClick={() => handleNavigation("/dashboard/admin")}
      />
      <ul className="adminsidebar-list">
        <li>
          <button
            className={
              isActive("/dashboard/admin")
                ? "adminsidebar-item active"
                : "adminsidebar-item"
            }
            onClick={() => handleNavigation("/dashboard/admin")}
          >
            <div className="adminsidebar-icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <div className="adminsidebar-title">Home</div>
          </button>
        </li>
        <li>
          <button
            className={
              isActive("/admin/users")
                ? "adminsidebar-item active"
                : "adminsidebar-item"
            }
            onClick={() => handleNavigation("/admin/users")}
          >
            <div className="adminsidebar-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="adminsidebar-title">Users</div>
          </button>
        </li>
        <li>
          <button
            className={
              isActive("/admin/courses")
                ? "adminsidebar-item active"
                : "adminsidebar-item"
            }
            onClick={() => handleNavigation("/admin/courses")}
          >
            <div className="adminsidebar-icon">
              <FontAwesomeIcon icon={faBook} />
            </div>
            <div className="adminsidebar-title">Courses</div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
