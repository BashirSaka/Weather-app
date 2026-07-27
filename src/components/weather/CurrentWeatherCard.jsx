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
        w-full
        p-3 sm:p-5 rounded-xl sm:rounded-2xl
        bg-white/70 dark:bg-white/10
        backdrop-blur-xl
        border border-slate-300/50 dark:border-white/20
        shadow-lg
      "
    >
      <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 dark:text-amber-400" />
        <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 truncate">
          {location}
        </span>
      </div>

      {selectedHourLabel && (
        <button
          onClick={onClearSelectedHour}
          className="text-[11px] sm:text-xs text-amber-500 dark:text-amber-400 mb-1 hover:underline cursor-pointer"
        >
          Showing {selectedHourLabel} · tap to clear
        </button>
      )}

      <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-4">
        {temp}
        <span className="text-xl sm:text-3xl md:text-4xl align-top">
          °{tempUnit}
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-1">
          <Wind className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>
            {wind} {windUnit}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Droplets className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>{humidity}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Gauge className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>
            {pressure} {pressureUnit}
          </span>
        </div>
      </div>
    </div>
  );
}
