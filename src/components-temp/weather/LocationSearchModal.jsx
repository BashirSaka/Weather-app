import { useState } from "react";
import { Search, X, MapPin, Locate } from "lucide-react";
import { useGeolocation } from "../../hooks/useGeolocation";

export default function LocationSearchModal({ cities, onSelect, onClose }) {
  const [query, setQuery] = useState("");
  const { getCurrentLocation, loading, error } = useGeolocation();

  const filtered = cities.filter((c) =>
    c.city.toLowerCase().includes(query.toLowerCase()),
  );

  const handleUseCurrentLocation = async () => {
    try {
      const { city } = await getCurrentLocation();
      // temp is a placeholder since we don't have a real weather API yet
      onSelect({ city, temp: "--" });
    } catch (err) {
      // error is already captured in the hook's `error` state
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Change location</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Use current location */}
        <button
          onClick={handleUseCurrentLocation}
          disabled={loading}
          className="flex items-center gap-2 w-full px-3 py-2 mb-3 rounded-xl bg-amber-400/10 border border-amber-300/30 text-amber-400 text-sm hover:bg-amber-400/20 transition-colors cursor-pointer disabled:opacity-50"
        >
          <Locate className="w-4 h-4" />
          {loading ? "Detecting location..." : "Use my current location"}
        </button>

        {error && <p className="text-xs text-red-400 mb-3 px-1">{error}</p>}

        {/* Search input */}
        <div className="flex items-center gap-2 px-3 py-2 mb-3 rounded-xl bg-white/10 border border-white/20">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 outline-none"
          />
        </div>

        {/* Results list */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="text-xs text-slate-400 px-2 py-3">No cities found.</p>
          )}
          {filtered.map((c) => (
            <button
              key={c.city}
              onClick={() => onSelect(c)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-white/10 cursor-pointer transition-colors"
            >
              <span className="flex items-center gap-2 text-sm text-white">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {c.city}
              </span>
              <span className="text-sm text-slate-300">{c.temp}°</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
