import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import './Login.css';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Login = ({ onSwitchToRegister, onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const { token, user, error, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user?.type) {
      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(formData));
      } else {
        localStorage.removeItem('rememberedUser');
      }
      navigate(`/dashboard/${user.type}`);
    }
  }, [token, user, rememberMe, navigate, formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    dispatch(loginUser(formData));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('login-modal')) {
      onClose();
    }
  };

  return (
    <div className="login-modal" onClick={handleOutsideClick}>
      <div className="login-modal-content">
        <h2>Login</h2>
        {error && <p className="login-error-message">{error}</p>}
        <div className="login-form-group">
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
        <div className="login-form-group login-password-group">
          <label>Password</label>
          <div className="login-password-wrapper">
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
              className="login-password-icon"
              onClick={togglePasswordVisibility}
              style={{ color: '#25738b' }}
            />
          </div>
        </div>
        <div className="login-form-actions">
          <Button
            text={loading ? 'Logging in...' : 'Login'}
            onClick={handleLogin}
            color="#25738b"
            size="medium"
          />
        </div>
        <p className="login-register-link">
          Don't have an account? <span onClick={onSwitchToRegister}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
