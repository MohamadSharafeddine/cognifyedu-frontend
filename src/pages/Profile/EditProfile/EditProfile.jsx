import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import Button from '../../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../redux/slices/authSlice';
import defaultProfileImage from '../../../assets/profile.png';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, updateSuccess } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    password: '',
    dateOfBirth: user?.date_of_birth || '',
    address: user?.address || '',
  });

  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  useEffect(() => {
    if (user?.profile_picture) {
      const fullImageUrl = `${process.env.REACT_APP_API_URL}${user?.profile_picture}`;
      setProfileImage(fullImageUrl || defaultProfileImage);
    }
  }, [user?.profile_picture]);

  useEffect(() => {
    if (updateSuccess && user?.profile_picture) {
      const fullImageUrl = `${process.env.REACT_APP_API_URL}${user?.profile_picture}`;
      setProfileImage(fullImageUrl || defaultProfileImage);
      alert('Profile updated successfully!');
    }
  }, [updateSuccess, user?.profile_picture]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setFormData({ ...formData, profile_picture: file });
    }
  };

  const handleSave = () => {
    const data = new FormData();
    data.append('name', formData.fullName);
    data.append('email', formData.email);
    if (formData.password) {
      data.append('password', formData.password);
    }
    data.append('date_of_birth', formData.dateOfBirth);
    data.append('address', formData.address);
    if (formData.profile_picture) {
      data.append('profile_picture', formData.profile_picture);
    }
    dispatch(updateUserProfile(data));
  };

  return (
    <div className="edit-profile-page">
      <div className="profile-picture-section">
        <label htmlFor="profile-upload" className="profile-label">
          <div className="profile-image-wrapper">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-picture"
              title="Click to change picture"
            />
            <div className="profile-edit-icon">
              <FontAwesomeIcon icon={faEdit} />
            </div>
          </div>
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="profile-form-section">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="form-group password-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div className="save-button-container">
          <Button text="Save" onClick={handleSave} color="#25738b" size="medium" />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
