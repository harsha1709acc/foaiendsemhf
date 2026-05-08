import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchISSPosition, fetchPeopleInSpace, reverseGeocode } from '../utils/api';
import { calculateSpeed } from '../utils/haversine';
import { useDashboard } from '../context/DashboardContext';

export function useISS() {
  const { issData, updateISS } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const positionsRef = useRef([]);
  const speedsRef = useRef([]);

  const fetchPosition = useCallback(async () => {
    try {
      setError(null);
      const pos = await fetchISSPosition();

      const prev = positionsRef.current;
      const newPositions = [...prev, pos].slice(-15);
      positionsRef.current = newPositions;

      let speed = issData.speed;
      if (prev.length > 0) {
        const lastPos = prev[prev.length - 1];
        speed = calculateSpeed(lastPos, pos);
        if (speed > 50000) speed = issData.speed; // sanity check
      }

      const newSpeeds = [
        ...speedsRef.current,
        { speed, timestamp: pos.timestamp },
      ].slice(-30);
      speedsRef.current = newSpeeds;

      const locationName = await reverseGeocode(pos.lat, pos.lon);

      updateISS({
        currentPosition: pos,
        positions: newPositions,
        speeds: newSpeeds,
        speed,
        locationName,
      });

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [updateISS, issData.speed]);

  const fetchPeople = useCallback(async () => {
    try {
      const data = await fetchPeopleInSpace();
      updateISS({ peopleInSpace: data });
    } catch (err) {
      console.error('Failed to fetch people in space:', err);
    }
  }, [updateISS]);

  useEffect(() => {
    fetchPosition();
    fetchPeople();
    const interval = setInterval(fetchPosition, 15000);
    return () => clearInterval(interval);
  }, []);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchPosition();
    fetchPeople();
  }, [fetchPosition, fetchPeople]);

  return { ...issData, loading, error, refresh };
}
