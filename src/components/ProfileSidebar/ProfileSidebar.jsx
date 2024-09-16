import React from "react";
import "./ProfileSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faUser, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../assets/logo-bar.png";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const handleMenuSelect = (path) => {
    navigate(`/profile/${userId}/${path}`);
  };

  const isOwnProfile = user.id === parseInt(userId, 10);

  return (
    <div className="sidebar">
      <img
        src={Logo}
        alt="CognifyEdu Logo"
        className="sidebar-logo"
        onClick={() => navigate("/courses")}
      />
      <ul>
        <li>
          <button
            className={
              location.pathname.includes("/analysis") ? "active" : ""
            }
            onClick={() => handleMenuSelect("analysis/cognitive")}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <div className="title">Analysis</div>
          </button>
        </li>
        <li>
          <button
            className={
              location.pathname.includes("/insights") ? "active" : ""
            }
            onClick={() => handleMenuSelect("insights")}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="title">Insights</div>
          </button>
        </li>
        {isOwnProfile && (
          <li>
            <button
              className={
                location.pathname.includes("/edit") ? "active" : ""
              }
              onClick={() => handleMenuSelect("edit")}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div className="title">Edit Profile</div>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
