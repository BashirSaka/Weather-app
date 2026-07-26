export function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

export function mphToKmh(mph) {
  return Math.round(mph * 1.60934);
}

export function hpaToMmHg(hpa) {
  return Math.round(hpa * 0.750062);
}

export function convertTemp(celsius, unit) {
  return unit === "fahrenheit" ? celsiusToFahrenheit(celsius) : celsius;
}

export function convertWind(mph, unit) {
  return unit === "kmh" ? mphToKmh(mph) : mph;
}

export function convertPressure(hpa, unit) {
  return unit === "mmhg" ? hpaToMmHg(hpa) : hpa;
}
