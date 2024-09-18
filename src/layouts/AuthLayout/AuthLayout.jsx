import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './AuthLayout.css';
import Footer from '../../components/Footer/Footer';

const AuthLayout = () => {
  return (
    <div className="authlayout-container">
      <Navbar />
      <div className="authlayout-content">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default AuthLayout;
