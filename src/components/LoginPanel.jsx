import React, { useState } from 'react';
import axios from 'axios';
import './LoginPanel.css'; // Import the CSS file

const LoginPanel = () => {
  // Toggle between login and register panels
  const [isActive, setIsActive] = useState(false);

  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Registration states
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [registerError, setRegisterError] = useState('');

  // Toggle panels
  const handleRegister = () => setIsActive(true);
  const handleLogin = () => setIsActive(false);

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/login', {
        email: loginEmail,
        password: loginPassword
      });

      const { token, role } = response.data;
      localStorage.setItem('token', token);

      if (role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setLoginError('Invalid email or password');
    }
  };

  // Handle registration submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8082/api/register', {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        role: role
      });

      // Switch to login panel after successful registration
      setIsActive(false);
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRole('customer');
      setRegisterError('');
    } catch (err) {
      setRegisterError('Registration failed');
    }
  };

  return (
    <div className="login-panel-wrapper">
      <div className={`container ${isActive ? 'active' : ''}`}>
        {/* Registration Panel */}
        <div className="form-container sign-up">
          <form onSubmit={handleRegisterSubmit}>
            <div className='logo'>
              <span>e</span>Store
            </div>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />

            {registerError && <p style={{ color: 'red' }}>{registerError}</p>}
            <button type="submit">Sign Up</button>
            <div className="role-toggle">
            <span className={`role-label ${role === 'customer' ? 'active' : ''}`}>Customer</span>
            <label className="switch">
                <input 
                type="checkbox" 
                checked={role === 'customer'}
                onChange={() => setRole(role === 'customer' ? 'admin' : 'customer')} 
                />
                <span className="slider"></span>
            </label>
            <span className={`role-label ${role === 'admin' ? 'active' : ''}`}>Admin</span>
            </div>
          </form>
        </div>

        {/* Login Panel */}
        <div className="form-container sign-in">
          <form onSubmit={handleLoginSubmit}>
            <div className='logo'>
              <span>e</span>Store
            </div>
            <h1>Log In</h1>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <a href="#">Forget Your Password?</a>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
            <button type="submit">Log In</button>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Already have an Account?</p>
              <button className="hidden" onClick={handleLogin}>Log In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Welcome!</h1>
              <p>Don't have an Account?</p>
              <button className="hidden" onClick={handleRegister}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
