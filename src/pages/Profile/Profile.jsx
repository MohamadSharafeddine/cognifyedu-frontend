import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';
import Button from "../../components/Button/Button";
import AddInsightPopup from "../../components/AddInsightPopup/AddInsightPopup";
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [profileUser, setProfileUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setProfileUser(response.data);
        
        if (user.id === parseInt(userId, 10) && response.data.type !== "student") {
          navigate(`/profile/${userId}/edit`);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [userId, navigate, user.id]);

  const togglePopup = () => setShowPopup(!showPopup);

  const isTeacherProfile = profileUser?.type === "teacher";
  const isOwnProfile = user.id === profileUser?.id;

  return (
    <div>
      {profileUser ? (
        <>
          {!isOwnProfile && <h1>{profileUser.name}</h1>}
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
