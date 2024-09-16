import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';
import Button from "../../components/Button/Button";
import AddInsightPopup from "../../components/AddInsightPopup/AddInsightPopup";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [profileUser, setProfileUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setProfileUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [userId]);

  const togglePopup = () => setShowPopup(!showPopup);

  const isTeacherProfile = profileUser?.type === "teacher";
  return (
    <div>
      {profileUser ? (
        <>
          <h1>{profileUser.name}</h1>
          {!isTeacherProfile && user.type === "teacher" && (
            <Button
              text="Add Insight"
              color="#25738b"
              size="medium"
              onClick={togglePopup}
            />
          )}
          {showPopup && <AddInsightPopup onClose={togglePopup} userId={userId} teacherId={user.id} />}
          <Outlet context={{ userId, teacherId: user.id }} />
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
