import React, { useState } from 'react';
import './EditProfile.css';
import Button from '../../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEdit } from '@fortawesome/free-solid-svg-icons';
import userProfile from '../../../assets/profile.png';

const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '********',
    dateOfBirth: '2000-01-01',
    address: 'Beirut, Lebanon',
  });

  const [profileImage, setProfileImage] = useState(userProfile);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log('Profile Data Saved:', formData);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
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
