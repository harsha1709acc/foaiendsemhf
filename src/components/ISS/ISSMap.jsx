import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

const issIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2094/2094513.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

function MapUpdater({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lon], map.getZoom(), { animate: true });
    }
  }, [position, map]);
  return null;
}

export function ISSMap({ currentPosition, positions }) {
  if (!currentPosition) return null;

  const trajectory = positions.map((p) => [p.lat, p.lon]);

  return (
    <div className="iss-map-wrapper">
      <MapContainer
        center={[currentPosition.lat, currentPosition.lon]}
        zoom={3}
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapUpdater position={currentPosition} />

        <Marker position={[currentPosition.lat, currentPosition.lon]} icon={issIcon}>
          <Popup>
            <strong>ISS Location</strong><br />
            Lat: {currentPosition.lat.toFixed(4)}<br />
            Lon: {currentPosition.lon.toFixed(4)}
          </Popup>
        </Marker>

        {trajectory.length > 1 && (
          <Polyline
            positions={trajectory}
            pathOptions={{ color: '#00d4ff', weight: 2, opacity: 0.7, dashArray: '5,10' }}
          />
        )}
      </MapContainer>
    </div>
  );
}
