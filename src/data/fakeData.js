
export const availableCities = [
  { city: "Central Jakarta", country: "Indonesia", temp: 10 },
  { city: "North Jakarta", country: "Indonesia", temp: 12 },
  { city: "Bandung", country: "Indonesia", temp: 10 },
  { city: "South Jakarta", country: "Indonesia", temp: 14 },
  { city: "Surabaya", country: "Indonesia", temp: 16 },
];

export const regionWeather = [
  {
    country: "Indonesia",
    city: "North Jakarta",
    condition: "Mostly Sunny",
    temp: 12,
  },
  { country: "Indonesia", city: "Bandung", condition: "Cloudy", temp: 10 },
  { country: "Indonesia", city: "South Jakarta", condition: "Sunny", temp: 14 },
];

export const user = {
  name: "Guest User",
  avatar:
    "https://i.pinimg.com/736x/e7/cd/44/e7cd4463837757fe4d86529b5dab8347.jpg",
  isGuest: true,
};
export const weatherAlerts = [
  {
    id: 1,
    event: "Heavy rain expected",
    severity: "moderate",
    description:
      "Heavy rainfall expected between 2PM and 6PM. Possible localized flooding in low-lying areas.",
  },
  {
    id: 2,
    event: "Thunderstorm tomorrow",
    severity: "moderate",
    description:
      "Thunderstorms likely tomorrow afternoon with strong wind gusts.",
  },
  {
    id: 3,
    event: "UV Index is High",
    severity: "high",
    description:
      "UV index expected to reach 8. Limit sun exposure between 11AM and 3PM.",
  },
];
export const defaultFavorites = ["Lagos", "Abuja", "London", "Tokyo", "Paris"];
export const defaultSettings = {
  appearance: "dark",
  temperatureUnit: "celsius",
  windSpeedUnit: "kmh",
  pressureUnit: "hpa",
  language: "english",
};