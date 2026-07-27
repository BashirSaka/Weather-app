import { useRef, useEffect } from "react";
import { Sun, Moon, Star, Settings, LogOut } from "lucide-react";

export default function ProfileDropdown({
  user,
  appearance,
  onAppearanceChange,
  onFavoritesClick,
  onSettingsClick,
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

  const themeOptions = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
  ];

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-300/50 dark:border-white/20 shadow-xl z-50"
    >
      {/* Profile row */}
      <div className="flex items-center gap-3 px-1 pb-3 mb-2 border-b border-slate-300/40 dark:border-white/10">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-xl object-cover border border-slate-300/40 dark:border-white/20"
        />
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {user.name}
          </p>
          {user.isGuest && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Not signed in
            </p>
          )}
        </div>
      </div>

      {/* Theme quick toggle */}
      <div className="mb-2">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 px-1">
          Theme
        </p>
        <div className="flex gap-1.5">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = appearance === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onAppearanceChange(opt.value)}
                className={`
                  flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-xs
                  border transition-all cursor-pointer
                  ${
                    isActive
                      ? "bg-amber-400/20 border-amber-300/40 text-amber-500 dark:text-amber-400 font-semibold"
                      : "bg-slate-900/5 dark:bg-white/5 border-slate-300/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-900/10 dark:hover:bg-white/10"
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu items */}
      <div className="flex flex-col gap-0.5">
        <button
          onClick={onFavoritesClick}
          className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-left"
        >
          <Star className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          Favorites
        </button>

        <button
          onClick={onSettingsClick}
          className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-left"
        >
          <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          Settings
        </button>

        <button
          disabled
          title="Sign in isn't set up yet"
          className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed text-left"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
