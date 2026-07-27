import { X, Star, Trash2 } from "lucide-react";
import { useState } from "react";

export default function FavoritesModal({
  favorites,
  onRemove,
  onAdd,
  onClose,
}) {
  const [newCity, setNewCity] = useState("");

  const handleAdd = () => {
    const trimmed = newCity.trim();
    if (trimmed && !favorites.includes(trimmed)) {
      onAdd(trimmed);
      setNewCity("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-sm my-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-300/50 dark:border-white/20 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Favorite Cities</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Add new favorite */}
        <div className="flex items-center gap-2 mb-3">
          <input
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a city..."
            className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder-slate-400 outline-none"
          />
          <button
            onClick={handleAdd}
            className="px-3 py-2 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-400 text-sm hover:bg-amber-400/30 transition-colors cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Favorites list */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {favorites.length === 0 && (
            <p className="text-xs text-slate-400 px-2 py-3">
              No favorite cities yet.
            </p>
          )}
          {favorites.map((city) => (
            <div
              key={city}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <span className="flex items-center gap-2 text-sm text-white">
                <Star className="w-3.5 h-3.5 text-amber-400" fill="#fbbf24" />
                {city}
              </span>
              <button
                onClick={() => onRemove(city)}
                className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                aria-label={`Remove ${city}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
