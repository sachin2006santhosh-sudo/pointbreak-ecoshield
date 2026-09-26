import React from 'react';
import Navbar from '../components/Navbar';
import './DisasterPlaceholder.css';

const DISASTER_INFO = {
  landslide: {
    icon: '',
    title: 'Landslide Prediction',
    description: 'Slope stability analysis and landslide vulnerability mapping for hilly terrains of Kerala using satellite elevation data and rainfall intensity models.',
    color: '#8d6e63',
    features: ['Slope angle analysis', 'Soil saturation mapping', 'Real-time rainfall triggers', 'Evacuation route planning'],
  },
  'forest-fire': {
    icon: '',
    title: 'Forest Fire Detection',
    description: 'Vegetation dryness index, wind direction tracking, and thermal anomaly detection across Kerala\'s forest reserves and wildlife sanctuaries.',
    color: '#ff7043',
    features: ['NDVI analysis', 'Wind pattern tracking', 'Hotspot detection', 'Fire spread simulation'],
  },
  cyclone: {
    icon: '',
    title: 'Cyclone Tracking',
    description: 'Arabian Sea and Bay of Bengal cyclone monitoring with track prediction, storm surge modelling, and coastal impact assessment for Kerala\'s coastline.',
    color: '#5c6bc0',
    features: ['Storm track prediction', 'Wind speed forecasting', 'Storm surge mapping', 'Coastal vulnerability'],
  },
};

const ComingSoonPage = ({ disaster }) => {
  const data = DISASTER_INFO[disaster] || DISASTER_INFO.landslide;

  return (
    <div className="placeholder-layout" id={`page-${disaster}`}>
      <Navbar />
      <main className="placeholder-main">
        <div className="placeholder-card" style={{ '--accent': data.color }}>
          <div className="placeholder-icon">{data.icon}</div>
          <h1 className="placeholder-title">{data.title}</h1>
          <p className="placeholder-desc">{data.description}</p>

          <div className="coming-soon-badge">
            <span className="cs-pulse" />
            Coming Soon — Under Development
          </div>

          <div className="placeholder-features">
            {data.features.map((feature) => (
              <div key={feature} className="placeholder-feature">
                {feature}
              </div>
            ))}
          </div>

          <p className="placeholder-note">
            This module is currently in development. The flood prediction module is fully active.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ComingSoonPage;
