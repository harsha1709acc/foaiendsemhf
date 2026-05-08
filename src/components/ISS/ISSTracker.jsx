import { useISS } from '../../hooks/useISS';
import { ISSMap } from './ISSMap';
import { ISSStats } from './ISSStats';
import { PeopleInSpace } from './PeopleInSpace';
import { Loader } from '../UI/Loader';
import { ErrorMessage } from '../UI/ErrorMessage';
import { useToast } from '../UI/Toast';

export function ISSTracker() {
  const {
    currentPosition,
    positions,
    speeds,
    speed,
    locationName,
    peopleInSpace,
    loading,
    error,
    refresh,
  } = useISS();

  const toast = useToast();

  const handleRefresh = () => {
    refresh();
    toast('ISS data refreshed!', 'success');
  };

  if (loading && !currentPosition) {
    return (
      <section id="iss" className="section">
        <Loader text="Tracking ISS..." />
      </section>
    );
  }

  if (error && !currentPosition) {
    return (
      <section id="iss" className="section">
        <ErrorMessage message={error} onRetry={refresh} />
      </section>
    );
  }

  return (
    <section id="iss" className="section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-icon">🛰️</span>
          ISS Live Tracker
        </h2>
        <button className="btn btn-refresh" onClick={handleRefresh}>
          ↻ Refresh
        </button>
      </div>

      <ISSStats
        currentPosition={currentPosition}
        speed={speed}
        locationName={locationName}
        positionCount={positions.length}
      />

      <ISSMap currentPosition={currentPosition} positions={positions} />

      <PeopleInSpace data={peopleInSpace} />
    </section>
  );
}
