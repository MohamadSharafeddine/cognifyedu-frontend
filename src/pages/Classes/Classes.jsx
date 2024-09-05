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
  const selectedClass = useSelector((state) => state.classState.selectedClass); // Get selected class from Redux

  return (
    <div className="main-content">
    </div>
  );
};

export default Classes;
