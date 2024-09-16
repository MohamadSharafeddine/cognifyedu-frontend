import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';
import Button from "../../components/Button/Button";
import AddInsightPopup from "../../components/AddInsightPopup/AddInsightPopup";

const Profile = () => {
  const { userId } = useParams();
  const teacherId = useSelector((state) => state.auth.user?.id);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for popup

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

  const togglePopup = () => setShowPopup(!showPopup); // Toggle popup

  return (
    <div>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <Button
            text="Add Insight"
            color="#25738b"
            size="medium"
            onClick={togglePopup}
          />
          {showPopup && <AddInsightPopup onClose={togglePopup} userId={userId} teacherId={teacherId} />}
          <Outlet context={{ userId, teacherId }} />
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
