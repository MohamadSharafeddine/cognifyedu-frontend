import React, { useState, useRef, useEffect } from 'react';
import './TopBar.css';
import userProfile from '../../assets/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const TopBar = () => {
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
