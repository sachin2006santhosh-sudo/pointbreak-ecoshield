// Mock GeoJSON grid data for Kerala
// Coordinates accurately mapped to Kerala state land boundary (Lat 8.25 - 12.8, Lng 74.9 - 77.5)

const getDistrictForLocation = (lat, lng) => {
  if (lat < 8.8) return "Thiruvananthapuram";
  if (lat < 9.3) return lng < 76.6 ? "Kollam" : "Pathanamthitta";
  if (lat < 9.7) return lng < 76.4 ? "Alappuzha" : "Kottayam";
  if (lat < 10.2) return lng > 76.7 ? "Idukki" : "Ernakulam";
  if (lat < 10.7) return lng > 76.4 ? "Palakkad" : "Thrissur";
  if (lat < 11.3) return lng > 76.0 ? "Wayanad" : lng > 75.8 ? "Malappuram" : "Kozhikode";
  if (lat < 12.1) return "Kannur";
  return "Kasaragod";
};

function isInKerala(lat, lng) {
  if (lat < 8.25 || lat > 12.8) return false;

  let minLng, maxLng;
  if (lat < 8.8) {
    minLng = 76.75;
    maxLng = 77.45;
  } else if (lat < 9.6) {
    minLng = 76.25;
    maxLng = 77.25;
  } else if (lat < 10.3) {
    minLng = 76.15;
    maxLng = 77.15;
  } else if (lat < 11.0) {
    minLng = 75.95;
    maxLng = 76.85;
  } else if (lat < 11.6) {
    minLng = 75.65;
    maxLng = 76.25;
  } else if (lat < 12.2) {
    minLng = 75.25;
    maxLng = 75.85;
  } else {
    minLng = 74.95;
    maxLng = 75.35;
  }

  return lng >= minLng && lng <= maxLng;
}

const generateKeralaGrid = () => {
  const features = [];
  const latStart = 8.25;
  const latEnd = 12.8;
  const lngStart = 74.9;
  const lngEnd = 77.5;
  const cellSize = 0.12; // ~12km precision grid cells

  // High risk zones (historical flood zones)
  const highRiskZones = [
    { lat: 9.4, lng: 76.3, radius: 0.4 },   // Alappuzha backwaters
    { lat: 9.9, lng: 76.3, radius: 0.35 },  // Ernakulam low-lying
    { lat: 10.5, lng: 76.2, radius: 0.35 },  // Thrissur / Chalakudy
    { lat: 11.2, lng: 75.8, radius: 0.3 },  // Kozhikode coast
    { lat: 11.7, lng: 76.0, radius: 0.3 },  // Wayanad hills
    { lat: 8.5, lng: 76.9, radius: 0.25 },  // Trivandrum
  ];

  let id = 0;
  for (let lat = latStart; lat < latEnd; lat += cellSize) {
    for (let lng = lngStart; lng < lngEnd; lng += cellSize) {
      const centerLat = lat + cellSize / 2;
      const centerLng = lng + cellSize / 2;

      if (!isInKerala(centerLat, centerLng)) continue;

      let intensity = Math.random() * 0.25;

      for (const zone of highRiskZones) {
        const dist = Math.sqrt(
          Math.pow(centerLat - zone.lat, 2) + Math.pow(centerLng - zone.lng, 2)
        );
        if (dist < zone.radius) {
          intensity += (1 - dist / zone.radius) * 0.75;
        }
      }

      if (centerLng < 76.2) intensity += 0.1; // coastal proximity

      intensity = Math.min(1.0, Math.max(0.0, intensity));
      const districtName = getDistrictForLocation(centerLat, centerLng);

      features.push({
        type: "Feature",
        id: id++,
        properties: {
          flood_intensity: parseFloat(intensity.toFixed(3)),
          area_name: districtName,
          grid_id: `GRID-${String(id).padStart(4, "0")}`,
          last_updated: "2026-09-25",
          rainfall_mm: parseFloat((intensity * 210 + Math.random() * 40).toFixed(1)),
          risk_level:
            intensity >= 0.75
              ? "Extreme"
              : intensity >= 0.5
              ? "High"
              : intensity >= 0.25
              ? "Moderate"
              : "Low",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [lng, lat],
              [lng + cellSize, lat],
              [lng + cellSize, lat + cellSize],
              [lng, lat + cellSize],
              [lng, lat],
            ],
          ],
        },
      });
    }
  }

  return { type: "FeatureCollection", features };
};

export const mockKeralaGeoJSON = generateKeralaGrid();

export const getIntensityColor = (intensity) => {
  if (intensity >= 0.75) return "#ff1744";   // Extreme - Red
  if (intensity >= 0.5)  return "#ff9100";   // High    - Orange
  if (intensity >= 0.25) return "#ffea00";   // Moderate - Yellow
  return "#00e676";                           // Low     - Green
};

export const getRiskLevel = (intensity) => {
  if (intensity >= 0.75) return "Extreme";
  if (intensity >= 0.5) return "High";
  if (intensity >= 0.25) return "Moderate";
  return "Low";
};
