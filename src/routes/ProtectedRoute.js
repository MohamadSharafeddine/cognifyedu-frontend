import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, type }) => {  
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && user.type !== type) {  
    return <Navigate to={`/dashboard/${user.type}`} replace />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
