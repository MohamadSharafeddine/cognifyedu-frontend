import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logos/Logo_bar.png';

const Sidebar = ({ menuItems = ['Classes', 'Class1', 'Class2'] }) => {
  return (
    <div className="sidebar">
      <Link to="/classes">
        <img src={Logo} alt="CognifyEdu Logo" />
      </Link>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <button className={index === 0 ? 'active' : ''}>
              <div class="icon"><FontAwesomeIcon icon={faThList} /></div>
              <div class="title">{item}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
