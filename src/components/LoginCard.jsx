import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginCard.css';

const DEMO_CREDENTIALS = {
  admin: [{ username: 'admin', phone: '9999999999' }],
  user: [
    { username: 'user1', phone: '8888888888' },
    { username: 'user2', phone: '7777777777' },
  ],
};

const LoginCard = () => {
  const [role, setRole] = useState('user');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const credentials = DEMO_CREDENTIALS[role];
    const match = credentials.find(
      (credential) =>
        credential.username === username.trim() && credential.phone === phone.trim()
    );

    if (match) {
      login(username.trim(), phone.trim(), role);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Invalid username or phone number. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="login-card">
      <div className="role-toggle">
        <button
          className={`toggle-btn ${role === 'user' ? 'active' : ''}`}
          onClick={() => handleRoleChange('user')}
          id="btn-user-login"
          type="button"
        >
          <span className="toggle-icon" aria-hidden="true" /> User
        </button>
        <button
          className={`toggle-btn ${role === 'admin' ? 'active' : ''}`}
          onClick={() => handleRoleChange('admin')}
          id="btn-admin-login"
          type="button"
        >
          <span className="toggle-icon" aria-hidden="true" /> Admin
        </button>
      </div>

      <div className="login-header">
        <div className="login-avatar" aria-hidden="true">{role === 'admin' ? 'Admin' : 'User'}</div>
        <h2>{role === 'admin' ? 'Admin Access' : 'User Login'}</h2>
        <p>{role === 'admin' ? 'Restricted — authorized personnel only' : 'Sign in to view disaster predictions'}</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="login-username">Username</label>
          <div className="input-wrapper">
            <span className="input-icon" aria-hidden="true" />
            <input
              id="login-username"
              type="text"
              placeholder={role === 'admin' ? 'admin' : 'user1'}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              autoComplete="username"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="login-phone">Phone Number</label>
          <div className="input-wrapper">
            <span className="input-icon" aria-hidden="true" />
            <input
              id="login-phone"
              type="tel"
              placeholder={role === 'admin' ? '9999999999' : '8888888888'}
              value={phone}
              onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
              required
              maxLength={10}
              pattern="[0-9]{10}"
            />
          </div>
        </div>

        {error && (
          <div className="login-error" role="alert">
            {error}
          </div>
        )}

        <button type="submit" className="login-btn" id="btn-submit-login" disabled={loading}>
          {loading ? (
            <span className="loader-dots"><span /><span /><span /></span>
          ) : (
            `Sign In as ${role === 'admin' ? 'Admin' : 'User'}`
          )}
        </button>
      </form>

      <div className="demo-hint">
        <p>Demo credentials:</p>
        {role === 'admin' ? <code>admin / 9999999999</code> : <code>user1 / 8888888888</code>}
      </div>
    </div>
  );
};

export default LoginCard;
