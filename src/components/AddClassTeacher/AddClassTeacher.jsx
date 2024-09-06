import React, { useState } from 'react';
import './AddClassTeacher.css';
import Button from '../Button/Button';

const AddClassTeacher = ({ onClose, onAddClass }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddClass = () => {
    const newClass = {
      className: title,
      teacherName: "New Teacher",
      description,
    };

    if (onAddClass) {
      onAddClass(newClass);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal">
    </div>
  );
};

export default AddClassTeacher;
