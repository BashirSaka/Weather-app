// Maps WeatherAPI.com's forecast.json response into the shapes our
// components already expect (same shapes the mock generators produced).

export function mapCurrentWeather(apiData) {
  const { location, current } = apiData;
  return {
    location: location.name,
    temp: Math.round(current.temp_c),
    wind: Math.round(current.wind_mph),
    humidity: current.humidity,
    pressure: Math.round(current.pressure_mb),
    condition: current.condition.text,
    isDay: current.is_day === 1,
  };
}

export function mapForecastDays(apiData) {
  return apiData.forecast.forecastday.map((day) => ({
    date: day.date, // already "YYYY-MM-DD"
    temp: Math.round(day.day.avgtemp_c),
  }));
}

export function mapHourlyForecast(apiData, targetDate) {
  const dayData = apiData.forecast.forecastday.find(
    (d) => d.date === targetDate,
  );
  if (!dayData) return [];

  // Sample every 3 hours (API gives 24 points/day) to match our existing
  // 6-point chart design: 6AM, 9AM, 12PM, 3PM, 6PM, 9PM
  const targetHours = [6, 9, 12, 15, 18, 21];

  return dayData.hour
    .filter((h) => targetHours.includes(new Date(h.time).getHours()))
    .map((h) => {
      const hourNum = new Date(h.time).getHours();
      const label =
        hourNum === 12
          ? "12PM"
          : hourNum > 12
            ? `${hourNum - 12}PM`
            : `${hourNum}AM`;

      return {
        time: label,
        temp: Math.round(h.temp_c),
        humidity: h.humidity,
        wind: Math.round(h.wind_mph),
        pressure: Math.round(h.pressure_mb),
        condition: h.condition.text,
        isDay: h.is_day === 1,
      };
    });
}

// Maps WeatherAPI.com's alerts (a real, present-tense feed — often empty,
// since most locations have no active alert most of the time) into the
// shape our WeatherAlertsModal and notification bell already expect.
export function mapAlerts(apiData) {
  const rawAlerts = apiData?.alerts?.alert || [];

  return rawAlerts.map((alert, i) => ({
    id: `${alert.event}-${alert.effective}-${i}`,
    event: alert.event || alert.headline || "Weather Alert",
    severity: mapSeverity(alert.severity),
    description: alert.desc || alert.headline || "No further details provided.",
    timestamp: alert.effective || new Date().toISOString(),
  }));
}

function mapSeverity(apiSeverity = "") {
  const s = apiSeverity.toLowerCase();
  if (s.includes("extreme") || s.includes("severe")) return "high";
  if (s.includes("moderate")) return "moderate";
  return "low";
}

// WeatherAPI.com's us-epa-index: 1=Good, 2=Moderate, 3=Unhealthy for Sensitive
// Groups, 4=Unhealthy, 5=Very Unhealthy, 6=Hazardous
const EPA_INDEX_MAP = {
  1: { label: "Good", severity: "low" },
  2: { label: "Moderate", severity: "low" },
  3: { label: "Unhealthy for Sensitive Groups", severity: "moderate" },
  4: { label: "Unhealthy", severity: "moderate" },
  5: { label: "Very Unhealthy", severity: "high" },
  6: { label: "Hazardous", severity: "high" },
};

export function mapAirQuality(apiData) {
  const aqiData = apiData?.current?.air_quality;
  if (!aqiData) return null;

  const epaIndex = aqiData["us-epa-index"];
  const mapped = EPA_INDEX_MAP[epaIndex] || {
    label: "Unknown",
    severity: "low",
  };

  return {
    index: epaIndex,
    label: mapped.label,
    severity: mapped.severity,
    pm2_5: Math.round(aqiData.pm2_5),
    pm10: Math.round(aqiData.pm10),
    o3: Math.round(aqiData.o3),
  };
}
