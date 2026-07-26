import { useRef, useEffect } from "react";
import {
  AlertTriangle,
  Wind,
  Thermometer,
  CloudRain,
  Sparkles,
} from "lucide-react";

const severityStyles = {
  high: "border-red-400/40 bg-red-400/10 text-red-500 dark:text-red-300",
  moderate:
    "border-amber-400/40 bg-amber-400/10 text-amber-500 dark:text-amber-300",
  low: "border-slate-400/40 bg-slate-400/10 text-slate-500 dark:text-slate-300",
};

const typeIcons = {
  "Heavy Rain": CloudRain,
  "Storm Tomorrow": AlertTriangle,
  "Heat Wave": Thermometer,
  "Strong Wind": Wind,
  "Air Quality Poor": Sparkles,
};

function formatRelativeTime(timestamp) {
  const diffMs = new Date() - new Date(timestamp);
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

export default function NotificationsPanel({
  notifications,
  readIds,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-300/50 dark:border-white/20 shadow-xl z-50"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Notifications
        </h3>
        {notifications.length > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="text-xs text-amber-500 dark:text-amber-400 hover:underline cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1.5 max-h-80 overflow-y-auto">
        {notifications.length === 0 && (
          <p className="text-xs text-slate-500 dark:text-slate-400 px-2 py-3">
            No notifications right now.
          </p>
        )}
        {notifications.map((n) => {
          const isRead = readIds.includes(n.id);
          const Icon = typeIcons[n.event] || AlertTriangle;
          return (
            <button
              key={n.id}
              onClick={() => onMarkAsRead(n.id)}
              className={`flex items-start gap-2 px-2.5 py-2 rounded-xl border text-left transition-colors cursor-pointer ${
                severityStyles[n.severity] || severityStyles.low
              } ${isRead ? "opacity-50" : ""}`}
            >
              <Icon className="w-4 h-4 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold">{n.event}</p>
                  {!isRead && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {n.description}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  {formatRelativeTime(n.timestamp)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
