import { X, AlertTriangle } from "lucide-react";

const severityStyles = {
  high: "border-red-400/40 bg-red-400/10 text-red-300",
  moderate: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  low: "border-slate-400/40 bg-slate-400/10 text-slate-300",
};

export default function WeatherAlertsModal({ alerts, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-sm my-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-300/50 dark:border-white/20 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Weather Alerts</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Alerts list */}
        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
          {alerts.length === 0 && (
            <p className="text-xs text-slate-400 px-2 py-3">
              No active alerts for this location.
            </p>
          )}
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-2 px-3 py-2.5 rounded-xl border ${
                severityStyles[alert.severity] || severityStyles.low
              }`}
            >
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">{alert.event}</p>
                <p className="text-xs text-slate-300 mt-0.5">
                  {alert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
