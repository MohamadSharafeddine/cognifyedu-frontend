import React from 'react';
import './Button.css';

const Button = ({ color = '#25738b', text = 'Click Me', size = 'medium', onClick }) => {
  return (
    <button
      className={`button-component button-component-${size}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
