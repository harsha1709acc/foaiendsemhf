export function Loader({ text = 'Loading...' }) {
  return (
    <div className="loader-container">
      <div className="loader-spinner" />
      <p className="loader-text">{text}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer" />
      <div className="skeleton-line shimmer" style={{ width: '80%' }} />
      <div className="skeleton-line shimmer" style={{ width: '60%' }} />
      <div className="skeleton-line shimmer" style={{ width: '90%' }} />
    </div>
  );
}
