import { useState, useEffect } from "react";
import { fetchForecast } from "../services/weatherApi";
import {
  mapCurrentWeather,
  mapForecastDays,
  mapHourlyForecast,
  mapAlerts,
  mapAirQuality,
} from "../utils/mapWeatherApiResponse";

const REFRESH_INTERVAL_MS = 15 * 60 * 1000;

export function useWeatherData(city) {
  const [rawData, setRawData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchForecast(city, 6);
        if (!ignore) {
          setRawData(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();
    const interval = setInterval(load, REFRESH_INTERVAL_MS);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, [city]);

  const currentWeather = rawData ? mapCurrentWeather(rawData) : null;
  const forecastDays = rawData ? mapForecastDays(rawData) : [];
  const alerts = rawData ? mapAlerts(rawData) : [];
  const airQuality = rawData ? mapAirQuality(rawData) : null;
  const getHourlyForDate = (date) =>
    rawData ? mapHourlyForecast(rawData, date) : [];

  return {
    currentWeather,
    forecastDays,
    getHourlyForDate,
    alerts,
    airQuality,
    isLoading,
    error,
  };
}
