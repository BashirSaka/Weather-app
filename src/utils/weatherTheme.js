// Maps a condition + day/night flag to a background gradient and animation type.
// When you wire in a real weather API later, its `condition.text` and `is_day`
// fields map directly onto this same function.
export function getWeatherTheme(condition = "Clear", isDay = true) {
  const c = condition.toLowerCase();

  if (c.includes("thunderstorm")) {
    return {
      label: "Thunderstorm",
      gradient:
        "linear-gradient(180deg, #0f0f1a 0%, #1e1b2e 50%, #2d2a3d 100%)",
      animation: "thunderstorm",
    };
  }

  if (c.includes("rain")) {
    return {
      label: "Rain",
      gradient: isDay
        ? "linear-gradient(180deg, #4a5568 0%, #718096 60%, #a0aec0 100%)"
        : "linear-gradient(180deg, #1a202c 0%, #2d3748 60%, #4a5568 100%)",
      animation: "rain",
    };
  }

  if (c.includes("snow")) {
    return {
      label: "Snow",
      gradient:
        "linear-gradient(180deg, #cbd5e1 0%, #e2e8f0 50%, #f1f5f9 100%)",
      animation: "snow",
    };
  }

  if (!isDay) {
    return {
      label: "Night",
      gradient:
        "linear-gradient(180deg, #0c1220 0%, #1a2340 50%, #2a3556 100%)",
      animation: "night",
    };
  }

  if (c.includes("cloud")) {
    return {
      label: "Cloudy",
      gradient:
        "linear-gradient(180deg, #7a8b99 0%, #9fb0bd 50%, #c5d3db 100%)",
      animation: "cloudy",
    };
  }

  // Clear / sunny — the default
  return {
    label: "Sunny",
    gradient: "linear-gradient(180deg, #3b82f6 0%, #60a5fa 40%, #fbbf24 100%)",
    animation: "sunny",
  };
}
