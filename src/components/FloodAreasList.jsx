import React, { useMemo, useState } from 'react';
import { getIntensityColor, getRiskLevel } from '../data/mockKeralaGrid';
import './FloodAreasList.css';

const FILTER_OPTIONS = ['all', 'Extreme', 'High', 'Moderate', 'Low'];

const FloodAreasList = React.memo(({ geoData }) => {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [sortBy, setSortBy] = useState('intensity');

  const areas = useMemo(() => {
    if (!geoData?.features) return [];

    return geoData.features
      .map((feature) => {
        const intensity = feature.properties.flood_intensity;
        return {
          ...feature.properties,
          id: feature.id,
          risk_level: getRiskLevel(intensity),
          color: getIntensityColor(intensity),
        };
      })
      .filter((area) => filter === 'all' || area.risk_level === filter)
      .sort((a, b) => {
        if (sortBy === 'intensity') return b.flood_intensity - a.flood_intensity;
        return a.area_name.localeCompare(b.area_name);
      });
  }, [geoData, filter, sortBy]);

  const counts = useMemo(() => {
    if (!geoData?.features) return {};

    const nextCounts = { Extreme: 0, High: 0, Moderate: 0, Low: 0 };
    geoData.features.forEach((feature) => {
      const risk = getRiskLevel(feature.properties.flood_intensity);
      if (risk in nextCounts) nextCounts[risk] += 1;
    });
    return nextCounts;
  }, [geoData]);

  const displayAreas = expanded ? areas : areas.slice(0, 8);

  return (
    <section className="flood-areas-panel" aria-label="Flood areas list">
      <div className="flood-areas-header">
        <div className="flood-areas-title">
          <span aria-hidden="true" />
          <h2>Flood Risk Areas</h2>
          <span className="areas-count">{areas.length} zones</span>
        </div>

        <div className="flood-controls">
          <div className="filter-pills" role="group" aria-label="Filter by risk level">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option}
                id={`filter-${option.toLowerCase()}`}
                className={`filter-pill ${filter === option ? 'active' : ''}`}
                data-risk={option}
                onClick={() => setFilter(option)}
              >
                {option === 'all' ? 'All' : option}
                {option !== 'all' && counts[option] !== undefined && (
                  <span className="pill-count">{counts[option]}</span>
                )}
              </button>
            ))}
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort areas"
            id="select-sort-areas"
          >
            <option value="intensity">Sort: Intensity ↓</option>
            <option value="name">Sort: Name A-Z</option>
          </select>
        </div>
      </div>

      <div className="areas-list">
        {displayAreas.length === 0 ? (
          <div className="no-areas">No grid cells match the selected filter.</div>
        ) : (
          displayAreas.map((area, index) => (
            <div key={area.id ?? index} className="area-item">
              <div className="area-rank">#{index + 1}</div>
              <div
                className="area-intensity-bar"
                style={{
                  background: `linear-gradient(to right, ${area.color}33, ${area.color}11)`,
                  borderLeft: `3px solid ${area.color}`,
                }}
              >
                <div
                  className="area-bar-fill"
                  style={{ width: `${area.flood_intensity * 100}%`, background: area.color }}
                />
              </div>
              <div className="area-info">
                <span className="area-name">{area.area_name}</span>
                {area.grid_id && <span className="area-grid-id">{area.grid_id}</span>}
              </div>
              <div className="area-metrics">
                <span className="area-pct">{(area.flood_intensity * 100).toFixed(1)}%</span>
                {area.rainfall_mm && <span className="area-rain">{area.rainfall_mm}mm</span>}
              </div>
              <span
                className="area-badge"
                style={{
                  background: `${area.color}22`,
                  color: area.color,
                  borderColor: `${area.color}44`,
                }}
              >
                {area.risk_level}
              </span>
            </div>
          ))
        )}
      </div>

      {areas.length > 8 && (
        <button className="show-more-btn" id="btn-show-more-areas" onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? '▲ Show Less' : `▼ Show All ${areas.length} Zones`}
        </button>
      )}
    </section>
  );
});

export default FloodAreasList;
