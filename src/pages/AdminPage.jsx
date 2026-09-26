import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import './AdminPage.css';

const MOCK_PREDICTIONS = [
  { id: 'PRD-001', region: 'Alappuzha North', intensity: 0.89, risk: 'Extreme', updated: '2026-09-25', status: 'Active' },
  { id: 'PRD-002', region: 'Ernakulam West', intensity: 0.72, risk: 'High', updated: '2026-09-25', status: 'Active' },
  { id: 'PRD-003', region: 'Thrissur Plains', intensity: 0.65, risk: 'High', updated: '2026-09-24', status: 'Active' },
  { id: 'PRD-004', region: 'Kozhikode Coast', intensity: 0.45, risk: 'Moderate', updated: '2026-09-24', status: 'Review' },
  { id: 'PRD-005', region: 'Idukki Hills', intensity: 0.18, risk: 'Low', updated: '2026-09-23', status: 'Active' },
  { id: 'PRD-006', region: 'Wayanad East', intensity: 0.55, risk: 'High', updated: '2026-09-25', status: 'Active' },
];

const RISK_COLORS = { Extreme: '#ff1744', High: '#ff9100', Moderate: '#ffea00', Low: '#00e676' };
const STATUS_COLORS = { Active: '#00e676', Review: '#ffea00', Inactive: '#ff5252' };

const AdminPage = () => {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState(MOCK_PREDICTIONS);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleGeoJsonUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadStatus('processing');
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(null), 3000);
    }, 1500);
  };

  const toggleStatus = (id) => {
    setPredictions((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' }
          : p
      )
    );
  };

  return (
    <div className="admin-layout" id="admin-page">
      <Navbar />
      <main className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">
              Logged in as <strong>{user?.username}</strong> · {user?.phone} · {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <label className="upload-geojson-btn" htmlFor="admin-geojson-upload" id="label-admin-upload">
            {uploadStatus === 'processing' ? 'Processing...' : uploadStatus === 'success' ? 'Uploaded!' : 'Upload New GeoJSON'}
            <input type="file" id="admin-geojson-upload" accept=".geojson,.json" onChange={handleGeoJsonUpload} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Summary cards */}
        <div className="admin-stats-row">
          {[
            { label: 'Total Predictions', val: predictions.length, icon: '', color: '#1eb4c3' },
            { label: 'Active Alerts', val: predictions.filter(p => p.status === 'Active').length, icon: '', color: '#ff1744' },
            { label: 'Extreme Risk Zones', val: predictions.filter(p => p.risk === 'Extreme').length, icon: '', color: '#ff5c7f' },
            { label: 'Pending Review', val: predictions.filter(p => p.status === 'Review').length, icon: '', color: '#ffa500' },
          ].map((s) => (
            <div key={s.label} className="admin-stat-card" style={{ borderColor: `${s.color}33` }}>
              <span className="astat-icon">{s.icon}</span>
              <span className="astat-val" style={{ color: s.color }}>{s.val}</span>
              <span className="astat-lbl">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Predictions table */}
        <div className="admin-table-wrapper">
          <div className="table-header">
            <h2>Flood Prediction Records</h2>
            <span className="table-count">{predictions.length} records</span>
          </div>
          <div className="admin-table-scroll">
            <table className="admin-table" aria-label="Prediction records">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Region</th>
                  <th>Intensity</th>
                  <th>Risk Level</th>
                  <th>Last Updated</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((p) => (
                  <tr key={p.id} className="table-row">
                    <td className="td-id">{p.id}</td>
                    <td className="td-region">{p.region}</td>
                    <td className="td-intensity">
                      <div className="intensity-cell">
                        <div className="intensity-bar-bg">
                          <div
                            className="intensity-bar-fill"
                            style={{ width: `${p.intensity * 100}%`, background: RISK_COLORS[p.risk] }}
                          />
                        </div>
                        <span>{(p.intensity * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="risk-badge" style={{ color: RISK_COLORS[p.risk], borderColor: `${RISK_COLORS[p.risk]}44`, background: `${RISK_COLORS[p.risk]}15` }}>
                        {p.risk}
                      </span>
                    </td>
                    <td className="td-date">{p.updated}</td>
                    <td>
                      <span className="status-dot" style={{ background: STATUS_COLORS[p.status] }} />
                      <span style={{ color: STATUS_COLORS[p.status], fontSize: '0.8rem', fontWeight: 600 }}>{p.status}</span>
                    </td>
                    <td>
                      <button
                        className="action-btn"
                        id={`btn-toggle-${p.id}`}
                        onClick={() => toggleStatus(p.id)}
                      >
                        {p.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
