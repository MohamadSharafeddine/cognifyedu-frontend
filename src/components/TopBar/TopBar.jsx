import React, { useState, useRef, useEffect } from "react";
import "./TopBar.css";
import defaultProfileImage from "../../assets/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { FRONTEND_API_URL } from "../../../src/constants";

const TopBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownLocked, setDropdownLocked] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setDropdownLocked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isDropdownLocked) {
      setDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isDropdownLocked) {
      setDropdownOpen(false);
    }
  };

  const handleClick = () => {
    setDropdownLocked(!isDropdownLocked);
    setDropdownOpen(true);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user.id}/analysis/cognitive`);
    setDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/");
  };

  const userEmail = user?.email || "User Email";
  const profileImage = user?.profile_picture
    ? user.profile_picture.startsWith('http')
      ? user.profile_picture
      : `${FRONTEND_API_URL}${user.profile_picture}`
    : defaultProfileImage;

  return (
    <div className="topbar">
      <div
        className="user-info-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        ref={containerRef}
      >
        <span className="user-email">{userEmail}</span>
        <img src={profileImage} alt="User Profile" className="profile-img" />
        <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleProfileClick}>
              <FontAwesomeIcon icon={faUser} className="dropdown-item-icon" />
              Profile
            </button>
            <button className="dropdown-item" onClick={handleLogoutClick}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="dropdown-item-icon"
              />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
