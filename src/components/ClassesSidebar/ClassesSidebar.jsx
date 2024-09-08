import React from 'react';
import './ClassesSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectClass } from '../../redux/slices/classesSlice';
import Logo from '../../assets/logo-bar.png';

const ClassesSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedClass = useSelector((state) => state.classes.selectedClass);
  const classesData = useSelector((state) => state.classes.classes);

  const handleClassesSelect = () => {
    dispatch(selectClass('Classes'));
    navigate('/classes');
  };

  const handleClassSelect = (className) => {
    dispatch(selectClass(className));
    navigate(`/class/${className}`);
  };

  const handleLogoClick = () => {
    handleClassesSelect();
  };

  return (
    <div className="sidebar">
      <img
        src={Logo}
        alt="CognifyEdu Logo"
        className="sidebar-logo"
        onClick={handleLogoClick}
      />
      <ul>
        <li>
          <button
            className={selectedClass === 'Classes' ? 'active' : ''}
            onClick={handleClassesSelect}
          >
            <div className="icon"><FontAwesomeIcon icon={faThList} /></div>
            <div className="title">Classes</div>
          </button>
        </li>
        {classesData.map((classItem, index) => (
          <li key={index}>
            <button
              className={selectedClass === classItem.className ? 'active' : ''}
              onClick={() => handleClassSelect(classItem.className)}
            >
              <div className="icon"><FontAwesomeIcon icon={faThList} /></div>
              <div className="title">{classItem.className}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassesSidebar;
