import React, { useState, useRef, useEffect } from 'react';
import './TopBar.css';
import userProfile from '../../assets/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const TopBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownLocked, setDropdownLocked] = useState(false);
  const containerRef = useRef(null);

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

  return (
    <div className="topbar">
      <div className="user-info">
        <span className="username">John Doe</span>
        <img src={userProfile} alt="User Profile" className="profile-img" />
      </div>
    </div>
  );
};

export default TopBar;
