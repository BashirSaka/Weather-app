// src/hooks/useGeolocation.js
import { useState } from "react";

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        reject(new Error("Geolocation not supported"));
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            );
            const data = await res.json();

            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.county ||
              "Unknown location";

            const country = data.address?.country || "";

            setLoading(false);
            resolve({ city, country, latitude, longitude });
          } catch (err) {
            setLoading(false);
            setError("Could not determine city name");
            reject(err);
          }
        },
        (err) => {
          setLoading(false);
          setError(err.message);
          reject(err);
        },
      );
    });
  };

  return { getCurrentLocation, loading, error };
}
