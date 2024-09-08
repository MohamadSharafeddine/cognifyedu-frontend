import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectClass } from '../../redux/slices/classesSlice';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../assets/logo-bar.png';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedClass = useSelector((state) => state.classes.selectedClass);
  const classesData = useSelector((state) => state.classes.classes);

  const handleClassSelect = (className) => {
    dispatch(selectClass(className));
    if (className === 'Classes') {
      navigate('/classes');
    } else {
      navigate(`/class/${className}`);
    }
  };

  return (
    <div className="sidebar">
      <Link to="/classes">
        <img src={Logo} alt="CognifyEdu Logo" />
      </Link>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              className={selectedClass === item ? 'active' : ''}
              onClick={() => dispatch(selectClass(item))}
            >
              <div className="icon"><FontAwesomeIcon icon={faThList} /></div>
              <div className="title">{item}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
