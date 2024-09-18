import React from "react";
import "./ParentSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChild, faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo-bar.png";

const ParentSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="parentsidebar-container">
      <img
        src={Logo}
        alt="CognifyEdu Logo"
        className="parentsidebar-logo"
        onClick={() => handleNavigation("/dashboard/parent")}
      />
      <ul className="parentsidebar-list">
        <li>
          <button
            className={
              isActive("/dashboard/parent")
                ? "parentsidebar-item active"
                : "parentsidebar-item"
            }
            onClick={() => handleNavigation("/dashboard/parent")}
          >
            <div className="parentsidebar-icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <div className="parentsidebar-title">Home</div>
          </button>
        </li>
        <li>
          <button
            className={
              isActive("/parent/children")
                ? "parentsidebar-item active"
                : "parentsidebar-item"
            }
            onClick={() => handleNavigation("/parent/children")}
          >
            <div className="parentsidebar-icon">
              <FontAwesomeIcon icon={faChild} />
            </div>
            <div className="parentsidebar-title">Children</div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ParentSidebar;
