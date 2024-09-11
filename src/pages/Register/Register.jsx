import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button/Button';
import logoTitle from '../../assets/logo-title.png';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { token, error, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  const handleRegister = () => {
    const userType = determineUserTypeByEmail(formData.email);
    const newUser = {
      ...formData,
      type: userType,
    };
    dispatch(registerUser(newUser));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <div className="hero-section">
        <img src={logoTitle} alt="CognifyEdu Logo" />
        <p>Unlocking Potential, One Insight at a Time.</p>
      </div>
      <div className="register-form-container">
        <h2>Register</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
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
            />
          </div>
        </div>
        <div className="form-actions">
          <Button text="Register" onClick={handleRegister} color="#25738b" size="medium" />
        </div>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
