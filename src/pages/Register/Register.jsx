import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';
import './Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const Register = ({ onSwitchToLogin, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const { token, user, error, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      const userType = user.type;
      switch (userType) {
        case 'teacher':
          navigate('/dashboard/teacher');
          break;
        case 'student':
          navigate('/dashboard/student');
          break;
        case 'parent':
          navigate('/dashboard/parent');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        default:
          navigate('/dashboard');
      }
    }
  }, [token, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setLocalError('');
  };

  const handleRegister = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setLocalError('Invalid email format');
      return;
    }

    if (formData.password.length < 8) {
      setLocalError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    const newUser = {
      ...formData,
      type: determineUserTypeByEmail(formData.email),
    };
    dispatch(registerUser(newUser));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const determineUserTypeByEmail = (email) => {
    if (email.endsWith('@school.com')) {
      return 'teacher';
    } else if (email.endsWith('@student.com')) {
      return 'student';
    } else if (email.endsWith('@parent.com')) {
      return 'parent';
    } else {
      return 'student';
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('register-modal')) {
      onClose();
    }
  };

  const getErrorMessage = () => {
    if (localError) {
      return localError;
    }
    if (error) {
      if (typeof error === 'string') {
        return error;
      } else if (error.message) {
        return error.message;
      } else if (error.errors) {
        return Object.values(error.errors).flat().join(', ');
      }
    }
    return '';
  };

  return (
    <div className="register-modal" onClick={handleOutsideClick}>
      <div className="register-modal-content">
        <h2>Register</h2>
        {getErrorMessage() && <p className="register-error-message">{getErrorMessage()}</p>}
        <div className="register-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your Full Name"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="register-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="register-form-group register-password-group">
          <label>Password</label>
          <div className="register-password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="register-password-icon"
              onClick={togglePasswordVisibility}
              style={{ color: '#25738b' }}
            />
          </div>
        </div>
        {formData.password && (
          <div className="register-form-group register-password-group">
            <label>Confirm Password</label>
            <div className="register-password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="register-password-icon"
                onClick={toggleConfirmPasswordVisibility}
                style={{ color: '#25738b' }}
              />
            </div>
          </div>
        )}
        <div className="register-form-actions">
          <Button
            text={loading ? 'Registering...' : 'Register'}
            onClick={handleRegister}
            color="#25738b"
            size="medium"
          />
        </div>
        <p className="register-login-link">
          Already have an account? <span onClick={onSwitchToLogin}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
