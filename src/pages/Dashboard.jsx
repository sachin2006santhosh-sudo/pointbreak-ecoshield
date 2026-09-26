import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MapView from '../components/MapView';
import FloodAreasList from '../components/FloodAreasList';
import { mockKeralaGeoJSON, getRiskLevel } from '../data/mockKeralaGrid';
import './Dashboard.css';

const computeStats = (geoData) => {
  if (!geoData?.features) return null;
  const stats = { extreme: 0, high: 0, moderate: 0, low: 0, total: 0 };
  geoData.features.forEach((f) => {
    const level = getRiskLevel(f.properties.flood_intensity);
    stats[level.toLowerCase()]++;
    stats.total++;
  });
  return stats;
};

const Dashboard = () => {
  const [geoData, setGeoData] = useState(mockKeralaGeoJSON);
  const stats = useMemo(() => computeStats(geoData), [geoData]);

  return (
    <div className="dashboard-layout" id="dashboard">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar
          geoData={geoData}
          onFileUpload={setGeoData}
          stats={stats}
        />
        <div className="dashboard-main">
          <MapView geoData={geoData} />
          <FloodAreasList geoData={geoData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
