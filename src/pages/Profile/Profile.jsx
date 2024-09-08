import React from 'react';
import { Outlet } from 'react-router-dom';

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <Outlet />
    </div>
  );
};

export default Profile;
