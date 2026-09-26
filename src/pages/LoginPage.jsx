

import React from 'react';
import LoginCard from '../components/LoginCard';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <main className="login-page" id="login-page">
      {/* Animated background */}
      <div className="login-bg">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="bg-orb orb-3" />
        <div className="grid-lines" />
      </div>

      {/* Content */}
      <div className="login-content">
        {/* Left side - branding */}
        <div className="login-branding">
          <div className="branding-logo">
            <div className="logo-hex" aria-hidden="true" />
          </div>
          <h1 className="branding-title">POINT BREAK ECO_SHIELD </h1>
          <p className="branding-tagline">AI-Powered Disaster Prediction System</p>
          <div className="branding-features">
            {[
              { icon: '', label: 'Flood Prediction' },
              { icon: '', label: 'Landslide Alerts' },
              { icon: '', label: 'Forest Fire Detection' },
              { icon: '', label: 'Cyclone Tracking' },
            ].map((f) => (
              <div key={f.label} className="feature-chip">
                <span>{f.icon}</span> {f.label}
              </div>
            ))}
          </div>
          <div className="branding-stats">
            <div className="bstat">
              <span className="bstat-val">14</span>
              <span className="bstat-lbl">Districts</span>
            </div>
            <div className="bstat-divider" />
            <div className="bstat">
              <span className="bstat-val">500+</span>
              <span className="bstat-lbl">Grid Cells</span>
            </div>
            <div className="bstat-divider" />
            <div className="bstat">
              <span className="bstat-val">24/7</span>
              <span className="bstat-lbl">Monitoring</span>
            </div>
          </div>
        </div>

        {/* Right side - login card */}
        <div className="login-card-wrapper">
          <LoginCard />
        </div>
      </div>

      {/* Footer */}
      <footer className="login-footer">
        <p>© 2026 POINT BREAK ECO_SHIELD  · Built for Hack'26</p>
      </footer>
    </main>
  );
};

export default LoginPage;
