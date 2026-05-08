export function ISSStats({ currentPosition, speed, locationName, positionCount }) {
  return (
    <div className="iss-stats">
      <div className="stat-card">
        <div className="stat-icon">📍</div>
        <div className="stat-info">
          <span className="stat-label">Latitude</span>
          <span className="stat-value">{currentPosition ? currentPosition.lat.toFixed(4) : '—'}°</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">📍</div>
        <div className="stat-info">
          <span className="stat-label">Longitude</span>
          <span className="stat-value">{currentPosition ? currentPosition.lon.toFixed(4) : '—'}°</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">⚡</div>
        <div className="stat-info">
          <span className="stat-label">Speed</span>
          <span className="stat-value">{speed.toFixed(0)} km/h</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🌍</div>
        <div className="stat-info">
          <span className="stat-label">Location</span>
          <span className="stat-value location-name">{locationName}</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-info">
          <span className="stat-label">Positions Tracked</span>
          <span className="stat-value">{positionCount}</span>
        </div>
      </div>
    </div>
  );
}
