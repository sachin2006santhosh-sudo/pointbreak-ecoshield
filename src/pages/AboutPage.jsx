import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './AboutPage.css';

const HOW_IT_WORKS = [
  { step: '01', title: 'Data Ingestion', desc: 'Receives GeoJSON files containing grid-cell level environmental data including rainfall, elevation, and historical records.' },
  { step: '02', title: 'Intensity Mapping', desc: 'Each grid cell is assigned a flood intensity value (0.0–1.0) derived from ML model outputs and mapped to a risk category.' },
  { step: '03', title: 'Visual Alerting', desc: 'The Kerala map updates in real-time with color-coded grid overlays. Extreme zones trigger priority alerts.' },
  { step: '04', title: 'Response Planning', desc: 'Authorities can view area-wise breakdowns, download risk reports, and coordinate evacuation routes.' },
];

const TECH_STACK = [
  { name: 'React + Vite', desc: 'Frontend framework', icon: '' },
  { name: 'React Leaflet', desc: 'Interactive maps', icon: '' },
  { name: 'GeoJSON', desc: 'Spatial data format', icon: '' },
  { name: 'Recharts', desc: 'Data visualization', icon: '' },
];

const AboutPage = () => {
  return (
    <div className="about-layout" id="about-page">
      <Navbar />
      <main className="about-main">
        <section className="about-hero">
          <div className="about-logo" aria-hidden="true" />
          <h1>About POINT BREAK ECO_SHIELD Kerala</h1>
          <p className="about-tagline">
            An AI-powered disaster early warning system designed to protect the lives and livelihoods of Kerala's communities.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            POINT BREAK ECO_SHIELD  leverages geospatial data analysis and machine learning to predict natural disasters before they strike.
            By analyzing real-time GeoJSON data from meteorological and topographic sources, we generate flood intensity maps divided
            into granular grid cells — enabling authorities and citizens to take proactive action.
          </p>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <div className="how-steps">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="how-step">
                <div className="step-num">{step}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            {TECH_STACK.map(({ name, desc, icon }) => (
              <div key={name} className="tech-card">
                <span className="tech-icon">{icon}</span>
                <span className="tech-name">{name}</span>
                <span className="tech-desc">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="about-cta">
          <Link to="/dashboard" className="cta-btn" id="btn-goto-dashboard">
            Go to Flood Dashboard
          </Link>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
