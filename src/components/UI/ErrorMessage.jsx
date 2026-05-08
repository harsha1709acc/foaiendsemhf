export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠</div>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="btn btn-retry" onClick={onRetry}>
          ↻ Retry
        </button>
      )}
    </div>
  );
}
