import React, { useState, useRef, useEffect } from 'react';
import './TopBar.css';
import userProfile from '../../assets/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownLocked, setDropdownLocked] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setDropdownLocked(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    navigate('/profile');
    setDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="topbar">
      <div
        className="user-info-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        ref={containerRef}
      >
        <span className="username">John Doe</span>
        <img src={userProfile} alt="User Profile" className="profile-img" />
        <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleProfileClick}>
              <FontAwesomeIcon icon={faUser} className="dropdown-item-icon" />
              Profile
            </button>
            <button className="dropdown-item" onClick={handleLogoutClick}>
              <FontAwesomeIcon icon={faSignOutAlt} className="dropdown-item-icon" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
