import React from "react";
import "./ProfileSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faLightbulb, faEdit } from "@fortawesome/free-solid-svg-icons";
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
  const isStudentProfile = user.type === "student" || !isOwnProfile;

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="profilesidebar-container">
      <img
        src={Logo}
        alt="CognifyEdu Logo"
        className="profilesidebar-logo"
        onClick={() => navigate("/courses")}
      />
      <ul className="profilesidebar-list">
        {isStudentProfile && (
          <>
            <li>
              <button
                className={
                  isActive("/analysis")
                    ? "profilesidebar-item active"
                    : "profilesidebar-item"
                }
                onClick={() => handleMenuSelect("analysis/cognitive")}
              >
                <div className="profilesidebar-icon">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <div className="profilesidebar-title">Analysis</div>
              </button>
            </li>
            <li>
              <button
                className={
                  isActive("/insights")
                    ? "profilesidebar-item active"
                    : "profilesidebar-item"
                }
                onClick={() => handleMenuSelect("insights")}
              >
                <div className="profilesidebar-icon">
                  <FontAwesomeIcon icon={faLightbulb} />
                </div>
                <div className="profilesidebar-title">Insights</div>
              </button>
            </li>
          </>
        )}
        {isOwnProfile && (
          <li>
            <button
              className={
                isActive("/edit")
                  ? "profilesidebar-item active"
                  : "profilesidebar-item"
              }
              onClick={() => handleMenuSelect("edit")}
            >
              <div className="profilesidebar-icon">
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div className="profilesidebar-title">Edit Profile</div>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
