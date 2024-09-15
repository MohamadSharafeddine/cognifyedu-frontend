import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';

const Profile = () => {
  const { userId } = useParams();
  const teacherId = useSelector((state) => state.auth.user?.id);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <Outlet context={{ userId, teacherId }} />
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
