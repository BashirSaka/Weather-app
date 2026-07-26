import { Wind } from "lucide-react";

const severityStyles = {
  low: "border-emerald-400/40 bg-emerald-400/10 text-emerald-500 dark:text-emerald-300",
  moderate:
    "border-amber-400/40 bg-amber-400/10 text-amber-500 dark:text-amber-300",
  high: "border-red-400/40 bg-red-400/10 text-red-500 dark:text-red-300",
};

export default function AirQualityCard({ airQuality }) {
  if (!airQuality) return null;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-xl ${
        severityStyles[airQuality.severity] || severityStyles.low
      }`}
    >
      <Wind className="w-4 h-4 mt-0.5 shrink-0" />
      <div className="flex flex-col gap-1">
        <p className="text-xs opacity-80">Air Quality</p>
        <p className="text-sm font-semibold">{airQuality.label}</p>
        <p className="text-xs opacity-70 mt-1">PM2.5: {airQuality.pm2_5}</p>
        <p className="text-xs opacity-70">O₃: {airQuality.o3}</p>
      </div>
    </div>
  );
}
