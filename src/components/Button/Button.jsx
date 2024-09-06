import React from 'react';
import './Button.css'; // The CSS for styling

const Button = ({ color = '#25738b', text = 'Click Me', size = 'medium', onClick }) => {
  return (
    <button
      className={`btn btn-${size}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
