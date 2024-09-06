import React from 'react';
import { useSelector } from 'react-redux';
import './Classes.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import ClassCard from '../../components/ClassCard/ClassCard';
import ClassPage from '../../components/ClassPage/ClassPage';
import TopBar from '../../components/TopBar/TopBar';
import Button from '../../components/Button/Button';

const classesData = [
  {
    className: 'Class1',
    teacherName: 'Max Fischer',
    description: 'This is a brief description of Class1',
  },
  {
    className: 'Class2',
    teacherName: 'Jane Doe',
    description: 'This is a brief description of Class2',
  },
  {
    className: 'Class3',
    teacherName: 'John Smith',
    description: 'This is a brief description of Class3',
  },
  {
    className: 'Class4',
    teacherName: 'Emily Johnson',
    description: 'This is a brief description of Class4',
  },
  {
    className: 'Class5',
    teacherName: 'Michael Brown',
    description: 'This is a brief description of Class5',
  },
  {
    className: 'Class6',
    teacherName: 'Sarah Davis',
    description: 'This is a brief description of Class6',
  },
  {
    className: 'Class7',
    teacherName: 'David Wilson',
    description: 'This is a brief description of Class7',
  },
  {
    className: 'Class8',
    teacherName: 'Olivia Taylor',
    description: 'This is a brief description of Class8',
  },
  {
    className: 'Class9',
    teacherName: 'James Anderson',
    description: 'This is a brief description of Class9',
  },
  {
    className: 'Class10',
    teacherName: 'Emma Thomas',
    description: 'This is a brief description of Class10',
  },
  {
    className: 'Class11',
    teacherName: 'Alexander Clark',
    description: 'This is a brief description of Class11',
  },
  {
    className: 'Class12',
    teacherName: 'Grace Wilson',
    description: 'This is a brief description of Class12',
  },
];

const Classes = () => {
  const selectedClass = useSelector((state) => state.classState.selectedClass);

  const handleAddClick = () => {
    console.log('Add button clicked!');
  };

  return (
    <div className="main-content">
      <Sidebar menuItems={['Classes', 'Class1', 'Class2']} />
      <div className="right-content">
        <TopBar />

        <div className="classes-content">
          {selectedClass === 'Classes' ? (
            <>
              <div className="add-button-container">
                <Button
                  color="#25738b"
                  text="Add"
                  size="medium"
                  onClick={handleAddClick}
                />
              </div>

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
            </>
          ) : (
            <ClassPage />
          )}
        </div>
      </div>
    </div>
  );
};

export default Classes;
