import React from 'react';
import './Students.css';
import defaultAvatar from '../../assets/profile.png';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const Students = ({ searchTerm }) => {
  const navigate = useNavigate();
  return (
    <div className="students-list">
    </div>
  );
};

export default Students;
