import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <Navbar />
      <main className="auth-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
