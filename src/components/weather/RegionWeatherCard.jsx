import { Trash2 } from "lucide-react";

export default function RegionWeatherCard({
  country,
  city,
  condition,
  temp,
  onRemove,
}) {
  return (
    <div
      className="
    relative group
    flex items-center justify-between gap-3
    p-3 sm:p-4 rounded-2xl
    bg-white/70 dark:bg-white/10
    backdrop-blur-xl
    border border-slate-300/50 dark:border-white/20
    w-full
  "
    >
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5 truncate">
          {country}
        </p>
        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
          {city}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-300 truncate">
          {condition}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {temp}
          <span className="text-sm align-top">°</span>
        </div>

        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(city);
            }}
            aria-label={`Remove ${city}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
