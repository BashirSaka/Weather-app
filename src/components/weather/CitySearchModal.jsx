import { useState } from "react";
import { Search, X, MapPin, Loader2 } from "lucide-react";
import { useCitySearch } from "../../hooks/useCitySearch";

export default function CitySearchModal({
  title,
  placeholder,
  onSelect,
  onClose,
  excludeCities = [],
}) {
  const [query, setQuery] = useState("");
  const { results, isSearching, error } = useCitySearch(query);

  const filtered = results.filter((c) => !excludeCities.includes(c.name));

  const handleSelect = (city) => {
    onSelect(city);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filtered.length > 0) {
      handleSelect(filtered[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-sm my-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-300/50 dark:border-white/20 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search input */}
        <div className="flex items-center gap-2 px-3 py-2 mb-3 rounded-xl bg-slate-900/5 dark:bg-white/10 border border-slate-300/40 dark:border-white/20">
          <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none"
          />
          {isSearching && (
            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
          )}
        </div>

        {/* Suggestions */}
        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
          {!query.trim() && (
            <p className="text-xs text-slate-500 dark:text-slate-400 px-2 py-3">
              Start typing to search cities...
            </p>
          )}
          {query.trim() && query.trim().length < 2 && (
            <p className="text-xs text-slate-500 dark:text-slate-400 px-2 py-3">
              Keep typing...
            </p>
          )}
          {error && (
            <p className="text-xs text-red-400 px-2 py-3">
              Search failed: {error}
            </p>
          )}
          {query.trim().length >= 2 &&
            !isSearching &&
            !error &&
            filtered.length === 0 && (
              <p className="text-xs text-slate-500 dark:text-slate-400 px-2 py-3">
                No cities found.
              </p>
            )}
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelect(c)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-slate-900/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
              <span className="text-sm text-slate-900 dark:text-white">
                {c.name}
                <span className="text-slate-500 dark:text-slate-400">
                  {c.region ? `, ${c.region}` : ""}, {c.country}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
