import React, { useState } from 'react';
import './AddInsightPopup.css';
import Button from '../Button/Button';

const AddInsightPopup = ({ onClose }) => {

  return (
    <div className="add-insight-popup-overlay" onClick={onClose}>
    </div>
  );
};

export default AddInsightPopup;
