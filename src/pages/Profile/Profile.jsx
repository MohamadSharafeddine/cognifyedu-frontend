import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../utils/axios';
import Button from "../../components/Button/Button";
import AddInsightPopup from "../../components/AddInsightPopup/AddInsightPopup";
import { fetchCognitiveScores, fetchBehavioralScores, fetchInsights } from '../../redux/slices/profileSlice';
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [profileUser, setProfileUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (userId) {
      dispatch(fetchCognitiveScores(userId));
      dispatch(fetchBehavioralScores(userId));
      dispatch(fetchInsights(userId));
    }
  }, [userId, refetchTrigger, dispatch]);

  const togglePopup = () => setShowPopup(!showPopup);

  const triggerRefetch = () => {
    setRefetchTrigger(prev => !prev);
  };

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
          {showPopup && <AddInsightPopup onClose={togglePopup} userId={userId} teacherId={user.id} triggerRefetch={triggerRefetch} />}
          
          <Outlet context={{ userId, teacherId: user.id, refetchTrigger }} />
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
