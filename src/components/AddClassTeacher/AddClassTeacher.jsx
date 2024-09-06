import React, { useState } from 'react';
import './AddClassTeacher.css';
import Button from '../Button/Button';

const AddClassTeacher = ({ onClose, onAddClass }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  return (
    <div className="modal">
    </div>
  );
};

export default AddClassTeacher;
