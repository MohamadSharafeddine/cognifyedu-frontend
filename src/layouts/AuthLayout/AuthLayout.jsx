import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="authlayout-container">
      <Navbar />
      <div className="authlayout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
