import { MapPin, X } from "lucide-react";

export default function LocationPermissionBanner({ onAllow, onDismiss }) {
  return (
    <div
      className="
        fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 pl-2 pr-3
        w-[calc(100%-1.5rem)] sm:w-full max-w-md mx-3 sm:mx-4
        flex items-start gap-2 sm:gap-3
        p-3 sm:p-4 rounded-xl sm:rounded-2xl
        bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
        border border-slate-300/50 dark:border-white/20
        shadow-xl
      "
    >
      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shrink-0">
        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 dark:text-amber-400" />
      </div>

      <div className="flex-1 min-w-0 justify-center pl-3">
        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
          Use your location?
        </p>
        <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-0.5">
          We'd like your location to show accurate weather for where you are.
        </p>

        <div className="flex items-center gap-2 mt-2 sm:mt-3 ">
          <button
            onClick={onAllow}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-amber-400 text-slate-900 text-[11px] sm:text-xs font-semibold hover:bg-amber-300 transition-colors cursor-pointer"
          >
            Allow
          </button>
          <button
            onClick={onDismiss}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-900/5 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs hover:bg-slate-900/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
          >
            Not now
          </button>
        </div>
      </div>

      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer shrink-0"
      >
        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}
