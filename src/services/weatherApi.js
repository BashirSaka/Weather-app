const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

/**
 * Fetches current + hourly + multi-day forecast for a given city.
 * Returns the raw WeatherAPI.com response — mapping into our app's
 * internal shape happens in the hook, keeping this file a thin fetch layer.
 */
export async function fetchForecast(city, days = 6) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
    city,
  )}&days=${days}&aqi=yes&alerts=yes`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.error?.message || `Weather API error: ${response.status}`,
    );
  }

  return response.json();
}
/**
 * Searches for cities matching a query string, used for autocomplete.
 * Returns an array of { id, name, region, country, lat, lon, url }.
 * Note: this endpoint returns location matches only — no temperature or
 * condition data, since that would require a full weather lookup per
 * keystroke. That's fetched separately once a city is actually selected.
 */
export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];

  const url = `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`City search failed: ${response.status}`);
  }

  return response.json();
}
