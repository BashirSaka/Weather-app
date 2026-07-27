import { MapPin, Wind, Droplets, Gauge } from "lucide-react";

export default function CurrentWeatherCard({
  location,
  temp,
  tempUnit,
  wind,
  windUnit,
  humidity,
  pressure,
  pressureUnit,
  selectedHourLabel,
  onClearSelectedHour,
}) {
  return (
    <div
      className="
        w-full sm:w-64
        p-5 rounded-2xl
        bg-white/70 dark:bg-white/10
        backdrop-blur-xl
        border border-slate-300/50 dark:border-white/20
        shadow-lg
      "
    >
      <div className="flex items-center gap-1.5 mb-2">
        <MapPin className="w-4 h-4 text-amber-500 dark:text-amber-400" />
        <span className="text-sm text-slate-700 dark:text-slate-200">
          {location}
        </span>
      </div>

      {selectedHourLabel && (
        <button
          onClick={onClearSelectedHour}
          className="text-xs text-amber-500 dark:text-amber-400 mb-1 hover:underline cursor-pointer"
        >
          Showing {selectedHourLabel} · tap to clear
        </button>
      )}

      <div className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-4">
        {temp}
        <span className="text-3xl sm:text-4xl align-top">°{tempUnit}</span>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-1">
          <Wind className="w-3.5 h-3.5" />
          <span>
            {wind} {windUnit}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Droplets className="w-3.5 h-3.5" />
          <span>{humidity}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Gauge className="w-3.5 h-3.5" />
          <span>
            {pressure} {pressureUnit}
          </span>
        </div>
      </div>
    </div>
  );
}
