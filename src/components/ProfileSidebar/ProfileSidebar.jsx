import React from 'react';
import './ProfileSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo-bar.png';

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuSelect = (path) => {
    navigate(`/profile/${path}`);
  };

  return (
    <div className="sidebar">
      <img
        src={Logo}
        alt="CognifyEdu Logo"
        className="sidebar-logo"
        onClick={() => navigate('/classes')}
      />
      <ul>
        <li>
          <button
            className={location.pathname.includes('/profile/analysis') ? 'active' : ''}
            onClick={() => handleMenuSelect('analysis/cognitive')}
          >
            <div className="icon"><FontAwesomeIcon icon={faChartLine} /></div>
            <div className="title">Analysis</div>
          </button>
        </li>
        <li>
          <button
            className={location.pathname.includes('/profile/insights') ? 'active' : ''}
            onClick={() => handleMenuSelect('insights')}
          >
            <div className="icon"><FontAwesomeIcon icon={faUser} /></div>
            <div className="title">Insights</div>
          </button>
        </li>
        <li>
          <button
            className={location.pathname.includes('/profile/edit') ? 'active' : ''}
            onClick={() => handleMenuSelect('edit')}
          >
            <div className="icon"><FontAwesomeIcon icon={faEdit} /></div>
            <div className="title">Edit Profile</div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
