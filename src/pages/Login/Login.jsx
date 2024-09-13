import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logoTitle from '../../assets/logo-title.png';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  
  const { token, user, error, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      const userData = JSON.parse(rememberedUser);
      setFormData({
        email: userData.email,
        password: userData.password,
      });
      setRememberMe(true);
    }
  }, []);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="login-container">
      <div className="hero-section">
        <img src={logoTitle} alt="CognifyEdu Logo" />
        <p>Unlocking Potential, One Insight at a Time.</p>
      </div>
      <div className="login-form-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group password-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-icon"
              onClick={togglePasswordVisibility}
              style={{ color: '#25738b' }}
            />
          </div>
        </div>
        <div className="remember-me-container">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <div className="form-actions">
          <Button
            text={loading ? 'Logging in...' : 'Login'}
            onClick={handleLogin}
            color="#25738b"
            size="medium"
          />
        </div>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
