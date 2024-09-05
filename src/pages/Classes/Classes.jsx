import React from 'react';
import { useSelector } from 'react-redux';
import './Classes.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import ClassCard from '../../components/ClassCard/ClassCard';
import ClassPage from '../../components/ClassPage/ClassPage';
import TopBar from '../../components/TopBar/TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const Classes = () => {
  const selectedClass = useSelector((state) => state.classState.selectedClass);

  return (
    <div className="main-content">
      <Sidebar menuItems={['Classes', 'Class1', 'Class2']} />
      <div className='right-content'>
      <TopBar />
      <div className="classes-content">
        
        <div className="add-button-container">
          <button className="add-btn">
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
        </div>

        {selectedClass === 'Classes' ? (
        <div className="cards-container">
          {classesData.map((classItem, index) => (
            <ClassCard
              key={index}
              className={classItem.className}
              teacherName={classItem.teacherName}
              description={classItem.description}
            />
          ))}
        </div>
        ) : (
          <ClassPage className={selectedClass} />
        )}
      </div>
      </div>
    </div>
  );
};

export default Classes;
