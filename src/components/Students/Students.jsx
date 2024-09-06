import React from 'react';
import './Students.css';
import defaultAvatar from '../../assets/profile.png';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const studentsData = [
  { id: 1, name: 'Miriam Wilderman', avatar: 'path_to_avatar1.png' },
  { id: 2, name: 'Betsy Zboncak', avatar: 'path_to_avatar2.png' },
  { id: 3, name: 'Dean Senger', avatar: 'path_to_avatar3.png' },
  { id: 4, name: 'Katie Hackett', avatar: 'path_to_avatar4.png' },
  { id: 5, name: 'Seth Erdman', avatar: 'path_to_avatar5.png' },
  { id: 6, name: 'Priscilla Bradtke', avatar: 'path_to_avatar6.png' },
];

const Students = ({ searchTerm }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/student/${id}`);
  };

  const handleRemoveClick = (e, studentId) => {
    e.stopPropagation();
    console.log(`Remove student with ID: ${studentId}`);
  };

  return (
    <div className="students-list">
    </div>
  );
};

export default Students;
