import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, role }) => {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && user.type !== role) {
    return <Navigate to={`/dashboard/${user.type}`} replace />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
