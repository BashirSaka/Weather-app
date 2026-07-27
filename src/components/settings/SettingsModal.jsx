import { useState } from "react";
import { X } from "lucide-react";

const optionGroups = [
  {
    key: "temperatureUnit",
    label: "Temperature",
    options: [
      { value: "celsius", label: "Celsius" },
      { value: "fahrenheit", label: "Fahrenheit" },
    ],
  },
  {
    key: "windSpeedUnit",
    label: "Wind Speed",
    options: [
      { value: "mph", label: "mph" },
      { value: "kmh", label: "km/h" },
    ],
  },
  {
    key: "pressureUnit",
    label: "Pressure",
    options: [
      { value: "hpa", label: "hPa" },
      { value: "mmhg", label: "mmHg" },
    ],
  },
  {
    key: "appearance",
    label: "Appearance",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
    ],
  },
];

export default function SettingsModal({ settings, onApply, onClose }) {
  const [draft, setDraft] = useState(settings);

  const handleSelect = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-sm my-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-300/50 dark:border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Settings
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-5 mb-5">
          {optionGroups.map((group) => (
            <div key={group.key}>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.options.map((opt) => {
                  const isActive = draft[group.key] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(group.key, opt.value)}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs
                        border transition-all duration-200 cursor-pointer
                        ${
                          isActive
                            ? "bg-amber-400/20 border-amber-300/40 text-amber-500 dark:text-amber-400 font-semibold"
                            : "bg-slate-900/5 dark:bg-white/5 border-slate-300/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-900/10 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                        }
                      `}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              Language
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg text-xs border bg-amber-400/20 border-amber-300/40 text-amber-500 dark:text-amber-400 font-semibold">
                English
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleApply}
          className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-900 text-sm font-semibold hover:bg-amber-300 transition-colors cursor-pointer"
        >
          Apply Settings
        </button>
      </div>
    </div>
  );
}
