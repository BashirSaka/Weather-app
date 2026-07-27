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
        flex items-center justify-between
        p-4 rounded-2xl
        bg-white/70 dark:bg-white/10
        backdrop-blur-xl
        border border-slate-300/50 dark:border-white/20
        w-full
      "
    >
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">
          {country}
        </p>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {city}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {condition}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
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
            className="
              opacity-0 group-hover:opacity-100
              transition-opacity
              text-slate-400 hover:text-red-400
              cursor-pointer
            "
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
