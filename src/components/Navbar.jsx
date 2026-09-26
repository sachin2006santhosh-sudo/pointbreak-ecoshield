import React, { useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const DISASTER_TABS = [
  { id: 'flood', label: 'Flood', icon: '', path: '/dashboard', active: true },
  { id: 'landslide', label: 'Landslide', icon: '', path: '/landslide', active: false },
  { id: 'forest-fire', label: 'Forest Fire', icon: '', path: '/forest-fire', active: false },
  { id: 'cyclone', label: 'Cyclone', icon: '', path: '/cyclone', active: false },
];

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const activeTab = DISASTER_TABS.find(t => location.pathname === t.path)?.id || 'flood';

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-brand" id="nav-brand">
          <div className="brand-icon" aria-hidden="true" />
          <div className="brand-text">
            <span className="brand-name">POINT BREAK ECO_SHIELD </span>
          </div>
        </Link>

        {/* Disaster Tabs */}
        <div className="disaster-tabs" role="tablist" aria-label="Disaster types">
          {DISASTER_TABS.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`disaster-tab ${activeTab === tab.id ? 'active' : ''} ${!tab.active ? 'coming-soon' : ''}`}
              onClick={() => tab.active && navigate(tab.path)}
              title={!tab.active ? `${tab.label} — Coming Soon` : tab.label}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {!tab.active && <span className="soon-badge">Soon</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="navbar-right">
        {/* Alert badge */}
        <div className="alert-badge" title="Active Alerts">
          <span aria-hidden="true" />
          <span className="alert-count">3</span>
        </div>

        {isAdmin && (
          <Link to="/admin" className="admin-link" id="nav-admin">
            Admin
          </Link>
        )}

        <Link to="/about" className="nav-link" id="nav-about">About</Link>

        <div className="user-menu">
          <button
            className="user-btn"
            id="btn-user-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            <div className="user-avatar">{user?.username?.[0]?.toUpperCase() || 'U'}</div>
            <span className="user-name">{user?.username}</span>
            <span className="chevron">{menuOpen ? '▲' : '▼'}</span>
          </button>

          {menuOpen && (
            <div className="user-dropdown" role="menu">
              <div className="dropdown-info">
                <p className="dropdown-name">{user?.username}</p>
                <p className="dropdown-role">{user?.role?.toUpperCase()}</p>
                <p className="dropdown-phone">{user?.phone}</p>
              </div>
              <button
                className="logout-btn"
                id="btn-logout"
                onClick={handleLogout}
                role="menuitem"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
