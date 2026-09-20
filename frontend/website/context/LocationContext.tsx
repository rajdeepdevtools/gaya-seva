'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Coordinates {
  lat: number;
  lng: number;
}

export type LocationStatus = 'prompt' | 'locating' | 'granted' | 'denied' | 'error';

// Default center point (Vishnupad Temple, Gaya Ji)
export const DEFAULT_GAYA_COORDS: Coordinates = {
  lat: 24.7865,
  lng: 85.0080,
};

interface LocationContextType {
  userLocation: Coordinates | null;
  activeCoords: Coordinates; // Either real user location or fallback default
  locationName: string;
  locationStatus: LocationStatus;
  errorMessage: string | null;
  hasUserSetLocation: boolean;
  requestLocation: () => void;
  getDistance: (lat: number | string, lng: number | string) => { kilometers: number; formatted: string };
  sortByDistance: <T extends { lat?: number | string; lng?: number | string }>(
    items: T[]
  ) => (T & { distanceKm: number; distanceFormatted: string })[];
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationName, setLocationName] = useState<string>('Gaya Ji Teerth (Vishnupad)');
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('prompt');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasUserSetLocation, setHasUserSetLocation] = useState<boolean>(false);

  // Active coordinates (user location if available, otherwise default Gaya Ji center)
  const activeCoords: Coordinates = userLocation || DEFAULT_GAYA_COORDS;

  const requestLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocationStatus('error');
      setErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    setLocationStatus('locating');
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setLocationStatus('granted');
        setHasUserSetLocation(true);
        setLocationName('Your Current GPS Location');

        // Attempt reverse geocoding via OpenStreetMap free API
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.display_name) {
              const parts = data.display_name.split(',');
              const shortName = parts.slice(0, 3).join(', ');
              setLocationName(shortName);
            }
          })
          .catch(() => {
            setLocationName(`GPS: ${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}`);
          });

        // Save in localStorage
        localStorage.setItem('gayaseva_user_location', JSON.stringify({ coords, status: 'granted' }));
      },
      (error) => {
        setLocationStatus('denied');
        setHasUserSetLocation(false);
        let msg = 'Unable to retrieve location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission denied. Showing default Gaya Ji listings.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        setErrorMessage(msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  // Auto request location permission on initial mount to fetch real active GPS location
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check saved state first for instant UI response
    const saved = localStorage.getItem('gayaseva_user_location');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.coords && parsed.status === 'granted') {
          setUserLocation(parsed.coords);
          setLocationStatus('granted');
          setHasUserSetLocation(true);
          setLocationName('Your Live GPS Location');
        }
      } catch {
        // ignore
      }
    }

    // Always attempt live browser geolocation request by default
    if (navigator.geolocation) {
      requestLocation();
    }
  }, []);

  const getDistance = (lat: number | string, lng: number | string) => {
    const numericLat = typeof lat === 'string' ? parseFloat(lat) : lat;
    const numericLng = typeof lng === 'string' ? parseFloat(lng) : lng;

    if (isNaN(numericLat) || isNaN(numericLng)) {
      return { kilometers: 0, formatted: 'Nearby' };
    }

    const kilometers = calculateHaversineDistance(
      activeCoords.lat,
      activeCoords.lng,
      numericLat,
      numericLng
    );

    return {
      kilometers,
      formatted: formatDistance(kilometers),
    };
  };

  const sortByDistance = <T extends { lat?: number | string; lng?: number | string }>(items: T[]) => {
    return items
      .map((item) => {
        const latVal = item.lat != null ? item.lat : DEFAULT_GAYA_COORDS.lat;
        const lngVal = item.lng != null ? item.lng : DEFAULT_GAYA_COORDS.lng;
        const dist = getDistance(latVal, lngVal);
        return {
          ...item,
          distanceKm: Number(dist.kilometers.toFixed(2)),
          distanceFormatted: dist.formatted,
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm); // Closest proximity first!
  };

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        activeCoords,
        locationName,
        locationStatus,
        errorMessage,
        hasUserSetLocation,
        requestLocation,
        getDistance,
        sortByDistance,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
