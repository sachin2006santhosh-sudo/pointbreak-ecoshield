import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { getIntensityColor, getRiskLevel } from '../data/mockKeralaGrid';
import './MapView.css';

const KERALA_CENTER = [10.5, 76.3];
const KERALA_ZOOM = 7.5;
const RISK_COLORS = {
  Extreme: '#ff1744',
  High: '#ff9100',
  Moderate: '#ffea00',
  Low: '#00e676',
};

const TooltipInfo = ({ info }) => {
  if (!info) return null;

  return (
    <div className="map-tooltip" style={{ left: info.x + 16, top: info.y - 10 }}>
      <div className="tooltip-grid-id">GRID CELL • {info.grid_id || 'Cell'}</div>
      <div className="tooltip-area">{info.area_name}</div>
      <div className="tooltip-row">
        <span>Flood Intensity</span>
        <strong style={{ color: RISK_COLORS[info.risk_level] }}>
          {(info.flood_intensity * 100).toFixed(1)}%
        </strong>
      </div>
      <div className="tooltip-row">
        <span>Risk Level</span>
        <strong style={{ color: RISK_COLORS[info.risk_level] }}>{info.risk_level}</strong>
      </div>
      {info.rainfall_mm !== undefined && (
        <div className="tooltip-row">
          <span>Rainfall</span>
          <strong style={{ color: '#1eb4c3' }}>{info.rainfall_mm} mm</strong>
        </div>
      )}
      <div className="tooltip-hint">Click cell to pin details</div>
    </div>
  );
};

const MapResetter = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const MapView = React.memo(({ geoData }) => {
  const [tooltip, setTooltip] = useState(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const featureCount = useMemo(() => geoData?.features?.length || 0, [geoData]);

  const getStyleForFeature = useCallback(
    (feature, isHovered = false, isSelected = false) => {
      const intensityColor = getIntensityColor(feature.properties.flood_intensity);

      if (isSelected) {
        return {
          fillColor: intensityColor,
          fillOpacity: 0.55,
          color: '#ffffff',
          weight: 2.5,
          dashArray: '',
        };
      }

      if (isHovered) {
        return {
          fillColor: intensityColor,
          fillOpacity: 0.45,
          color: '#1eb4c3',
          weight: 2,
          dashArray: '',
        };
      }

      if (showHeatmap) {
        return {
          fillColor: intensityColor,
          fillOpacity: 0.45,
          color: 'rgba(0, 0, 0, 0.2)',
          weight: 0.8,
        };
      }

      return {
        fillColor: 'transparent',
        fillOpacity: 0,
        color: 'transparent',
        weight: 0,
      };
    },
    [showHeatmap]
  );

  const onEachFeature = useCallback(
    (feature, layer) => {
      const props = feature.properties;

      layer.setStyle(getStyleForFeature(feature, false, feature.id === selectedFeatureId));

      layer.on({
        mousemove: (event) => {
          const { x, y } = event.containerPoint;
          setTooltip({ x, y, ...props, risk_level: getRiskLevel(props.flood_intensity) });
          layer.setStyle(getStyleForFeature(feature, true, feature.id === selectedFeatureId));
        },
        mouseout: () => {
          setTooltip(null);
          layer.setStyle(getStyleForFeature(feature, false, feature.id === selectedFeatureId));
        },
        click: () => {
          setSelectedFeatureId(feature.id);
          layer.setStyle(getStyleForFeature(feature, true, true));
        },
      });
    },
    [getStyleForFeature, selectedFeatureId]
  );

  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <div className="map-wrapper" id="kerala-map">
      <MapContainer center={KERALA_CENTER} zoom={KERALA_ZOOM} className="leaflet-map" zoomControl scrollWheelZoom>
        <TileLayer
          url={tileUrl}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {geoData && (
          <GeoJSON
            data={geoData}
            style={(feature) => getStyleForFeature(feature, false, feature.id === selectedFeatureId)}
            onEachFeature={onEachFeature}
          />
        )}

        <MapResetter center={KERALA_CENTER} zoom={KERALA_ZOOM} />
      </MapContainer>

      <TooltipInfo info={tooltip} />

      <div className="map-controls">
        <button
          className={`grid-toggle-btn ${!showHeatmap ? 'active' : ''}`}
          onClick={() => setShowHeatmap((prev) => !prev)}
          title="Toggle Grid Overlay Visibility"
        >
          {showHeatmap ? 'Heatmap Overlay' : 'Invisible Grid Mode'}
        </button>

        {featureCount > 0 && <div className="feature-count">{featureCount} Grids</div>}
      </div>
    </div>
  );
});

export default MapView;
