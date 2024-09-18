import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, type }) => {  
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  if (location.pathname === '/dashboard') {
    if (user.type === 'admin') {
      return <Navigate to="/admin/users" replace />;
    }
    if (user.type === 'parent') {
      return <Navigate to="/parent/children" replace />;
    }
  }

  if (user.type !== type) {  
    return <Navigate to={`/dashboard/${user.type}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
