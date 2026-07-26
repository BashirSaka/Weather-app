import { useState, useEffect } from "react";
import { searchCities } from "../services/weatherApi";

const DEBOUNCE_MS = 350;

export function useCitySearch(query) {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const trimmed = query?.trim() ?? "";

    if (trimmed.length < 2) {
      setResults([]);
      setError(null);
      setIsSearching(false);
      return;
    }

    let ignore = false;
    setIsSearching(true);

    const timeoutId = setTimeout(() => {
      searchCities(trimmed)
        .then((data) => {
          if (ignore) return;
          setResults(data);
          setError(null);
        })
        .catch((err) => {
          if (ignore) return;
          setError(err.message);
          setResults([]);
        })
        .finally(() => {
          if (ignore) return;
          setIsSearching(false);
        });
    }, DEBOUNCE_MS);

    return () => {
      ignore = true;
      clearTimeout(timeoutId);
    };
  }, [query]);

  return { results, isSearching, error };
}
