import React from 'react';
import './Sidebar.css';

const LEGEND_ITEMS = [
  { color: '#ff1744', label: 'Extreme Risk', range: '0.75 – 1.0', icon: '' },
  { color: '#ff9100', label: 'High Risk', range: '0.50 – 0.75', icon: '' },
  { color: '#ffea00', label: 'Moderate Risk', range: '0.25 – 0.50', icon: '' },
  { color: '#00e676', label: 'Low Risk', range: '0.00 – 0.25', icon: '' },
];

const Sidebar = React.memo(({ stats }) => {

  const lastUpdated = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <aside className="sidebar" aria-label="Map legend and controls">
      <section className="sidebar-section">
        <h3 className="sidebar-title">
          <span aria-hidden="true" /> Flood Intensity
        </h3>
        <div className="legend-list">
          {LEGEND_ITEMS.map((item) => (
            <div key={item.label} className="legend-item">
              <div className="legend-color" style={{ background: item.color }} />
              <div className="legend-info">
                <span className="legend-label">{item.label}</span>
                <span className="legend-range">{item.range}</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {stats && (
        <section className="sidebar-section">
          <h3 className="sidebar-title">
            <span aria-hidden="true" /> Grid Stats
          </h3>
          <div className="stats-grid">
            <div className="stat-card extreme">
              <span className="stat-val">{stats.extreme}</span>
              <span className="stat-lbl">Extreme</span>
            </div>
            <div className="stat-card high">
              <span className="stat-val">{stats.high}</span>
              <span className="stat-lbl">High</span>
            </div>
            <div className="stat-card moderate">
              <span className="stat-val">{stats.moderate}</span>
              <span className="stat-lbl">Moderate</span>
            </div>
            <div className="stat-card low">
              <span className="stat-val">{stats.low}</span>
              <span className="stat-lbl">Low</span>
            </div>
          </div>
          <div className="total-cells">
            Total grid cells: <strong>{stats.total}</strong>
          </div>
        </section>
      )}

      <section className="sidebar-section sidebar-footer">
        <div className="live-indicator">
          <span className="pulse-dot" />
          <span>Live Monitoring</span>
        </div>
        <p className="last-updated">Last updated: {lastUpdated}</p>
      </section>
    </aside>
  );
});

export default Sidebar;
