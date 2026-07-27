import { useState, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useWeatherData } from "./hooks/useWeatherData";
import { useGeolocation } from "./hooks/useGeolocation";
import { fetchForecast } from "./services/weatherApi";
import { mapCurrentWeather } from "./utils/mapWeatherApiResponse";
import {
  convertTemp,
  convertWind,
  convertPressure,
} from "./utils/unitConversions";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import WeatherHero from "./components/weather/WeatherHero";
import CurrentWeatherCard from "./components/weather/CurrentWeatherCard";
import CurrentWeatherCardSkeleton from "./components/weather/CurrentWeatherCardSkeleton";
import RegionWeatherList from "./components/weather/RegionWeatherList";
import DayTabs from "./components/weather/DayTabs";
import ForecastChart from "./components/weather/ForecastChart";
import ForecastChartSkeleton from "./components/weather/ForecastChartSkeleton";
import WeatherAlertsModal from "./components/weather/WeatherAlertsModal";
import FavoritesModal from "./components/weather/FavoritesModal";
import SettingsModal from "./components/settings/SettingsModal";
import AboutModal from "./components/layout/AboutModal";
import CitySearchModal from "./components/weather/CitySearchModal";
import WeatherBackground from "./components/weather/WeatherBackground";
import LocationPermissionBanner from "./components/layout/LocationPermissionBanner";
import AirQualityCard from "./components/weather/AirQualityCard";

import {
  regionWeather as defaultRegionWeather,
  defaultFavorites,
  defaultSettings,
} from "./data/fakeData";

const FALLBACK_CITY = "London";

export default function App() {
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAddCityModalOpen, setIsAddCityModalOpen] = useState(false);
  const [isQuickSearchModalOpen, setIsQuickSearchModalOpen] = useState(false);

  const [favorites, setFavorites] = useLocalStorage(
    "favoriteCities",
    defaultFavorites,
  );
  const [settings, setSettings] = useLocalStorage(
    "appSettings",
    defaultSettings,
  );
  const [regionWeather, setRegionWeather] = useLocalStorage(
    "regionWeather",
    defaultRegionWeather,
  );

  // Starts on a sensible default so there's no blank/loading state on first
  // paint. Only swaps to the visitor's real location if they click "Allow"
  // on the permission banner below.
  const [selectedCityName, setSelectedCityName] = useState(FALLBACK_CITY);
  const [showLocationBanner, setShowLocationBanner] = useState(true);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const { getCurrentLocation } = useGeolocation();

  const handleAllowLocation = async () => {
    setShowLocationBanner(false);
    setIsDetectingLocation(true);
    try {
      const { city } = await getCurrentLocation();
      setSelectedCityName(city || FALLBACK_CITY);
    } catch {
      // permission denied, unsupported, or lookup failed — quietly keep the fallback city
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const handleDismissBanner = () => {
    setShowLocationBanner(false);
    // stays on FALLBACK_CITY until the user searches/picks a city manually
  };

  const {
    currentWeather,
    forecastDays,
    getHourlyForDate,
    alerts,
    airQuality,
    isLoading,
    error,
  } = useWeatherData(selectedCityName);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHourIndex, setSelectedHourIndex] = useState(null);
  const [selectedHourData, setSelectedHourData] = useState(null);
  const [selectionContext, setSelectionContext] = useState(null);

  // If nothing's been explicitly picked yet, fall back to "today"
  // (the first date in the list) — computed during render, not via effect
  const effectiveSelectedDay = selectedDay ?? forecastDays[0]?.date ?? null;

  const isSelectionStale =
    selectionContext !== null &&
    (selectionContext.city !== selectedCityName ||
      selectionContext.day !== effectiveSelectedDay);

  const effectiveHourIndex = isSelectionStale ? null : selectedHourIndex;
  const effectiveHourData = isSelectionStale ? null : selectedHourData;

  // Theme
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (isDark) => root.classList.toggle("dark", isDark);

    if (settings.appearance === "dark") {
      applyTheme(true);
    } else if (settings.appearance === "light") {
      applyTheme(false);
    } else {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches);
      const handleChange = (e) => applyTheme(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [settings.appearance]);

  const handleAddFavorite = (city) => {
    setFavorites((prev) => [...prev, city]);
  };

  const handleRemoveFavorite = (city) => {
    setFavorites((prev) => prev.filter((c) => c !== city));
  };

  const handleApplySettings = (newSettings) => {
    setSettings(newSettings);
  };

  const handleHourSelect = (hourData, index) => {
    setSelectedHourIndex(index);
    setSelectedHourData(hourData);
    setSelectionContext({ city: selectedCityName, day: effectiveSelectedDay });
  };

  const handleClearSelectedHour = () => {
    setSelectedHourIndex(null);
    setSelectedHourData(null);
    setSelectionContext(null);
  };

  const handleAddCity = async (city) => {
    const alreadyAdded = regionWeather.some((r) => r.city === city.name);
    if (alreadyAdded) {
      setIsAddCityModalOpen(false);
      return;
    }

    try {
      const data = await fetchForecast(city.name, 1);
      const weather = mapCurrentWeather(data);
      setRegionWeather((prev) => [
        ...prev,
        {
          country: city.country,
          city: city.name,
          condition: weather.condition,
          temp: weather.temp,
        },
      ]);
    } catch (err) {
      console.error("Failed to fetch weather for added city:", err);
    }

    setIsAddCityModalOpen(false);
  };

  const handleRemoveRegion = (city) => {
    setRegionWeather((prev) => prev.filter((r) => r.city !== city));
  };

  const handleQuickSearchSelect = (city) => {
    setSelectedCityName(city.name);
    setSelectedDay(null);
    setIsQuickSearchModalOpen(false);
  };

  const tempUnitLabel = settings.temperatureUnit === "fahrenheit" ? "F" : "C";
  const windUnitLabel = settings.windSpeedUnit === "kmh" ? "km/h" : "mph";
  const pressureUnitLabel = settings.pressureUnit === "mmhg" ? "mmHg" : "hPa";

  const rawHourlyData = effectiveSelectedDay
    ? getHourlyForDate(effectiveSelectedDay)
    : [];

  const displayHourlyData = rawHourlyData.map((h) => ({
    ...h,
    temp: convertTemp(h.temp, settings.temperatureUnit),
    wind: convertWind(h.wind, settings.windSpeedUnit),
    pressure: convertPressure(h.pressure, settings.pressureUnit),
  }));

  const displayTemp = effectiveHourData
    ? effectiveHourData.temp
    : currentWeather
      ? convertTemp(currentWeather.temp, settings.temperatureUnit)
      : null;
  const displayWind = effectiveHourData
    ? effectiveHourData.wind
    : currentWeather
      ? convertWind(currentWeather.wind, settings.windSpeedUnit)
      : null;
  const displayHumidity = effectiveHourData
    ? effectiveHourData.humidity
    : currentWeather?.humidity;
  const displayPressure = effectiveHourData
    ? effectiveHourData.pressure
    : currentWeather
      ? convertPressure(currentWeather.pressure, settings.pressureUnit)
      : null;

  const activeConditionSource = effectiveHourData ||
    rawHourlyData[0] ||
    currentWeather || {
      condition: "Clear",
      isDay: true,
    };

  return (
    <div className="relative w-full min-h-screen flex">
      <WeatherBackground
        condition={activeConditionSource.condition}
        isDay={activeConditionSource.isDay}
      />

      <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/30" />

      {showLocationBanner && (
        <LocationPermissionBanner
          onAllow={handleAllowLocation}
          onDismiss={handleDismissBanner}
        />
      )}

      <div className="relative h-auto z-10">
        <Sidebar
          onLocationClick={() => setIsQuickSearchModalOpen(true)}
          onWeatherClick={() => setIsAlertsModalOpen(true)}
          onFavoritesClick={() => setIsFavoritesModalOpen(true)}
          onSettingsClick={() => setIsSettingsModalOpen(true)}
          onAboutClick={() => setIsAboutModalOpen(true)}
        />
      </div>

      <div className="relative z-10 flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
        <Header
          onAddCityClick={() => setIsAddCityModalOpen(true)}
          onSearchClick={() => setIsQuickSearchModalOpen(true)}
          onFavoritesClick={() => setIsFavoritesModalOpen(true)}
          onSettingsClick={() => setIsSettingsModalOpen(true)}
          appearance={settings.appearance}
          onAppearanceChange={(value) =>
            setSettings((prev) => ({ ...prev, appearance: value }))
          }
          alerts={alerts}
        />

        <div className="flex flex-col lg:flex-row gap-6 flex-1">
          <div className="flex-1 flex flex-col justify-between gap-8">
            <WeatherHero
              tag="Weather Forecast"
              title={<>Weather Dashboard</>}
              description="Accurate weather forecasts, air quality,
hourly predictions, and saved locations 
everything you need to plan your dayh."
            />

            <div className="flex flex-col gap-6">
              {isLoading || isDetectingLocation || !effectiveSelectedDay ? (
                <ForecastChartSkeleton />
              ) : (
                <ForecastChart
                  data={displayHourlyData}
                  selectedIndex={effectiveHourIndex}
                  onHourSelect={handleHourSelect}
                />
              )}
              {forecastDays.length > 0 && effectiveSelectedDay && (
                <DayTabs
                  days={forecastDays}
                  activeDate={effectiveSelectedDay}
                  onDayChange={setSelectedDay}
                />
              )}
            </div>
          </div>

          <div className="w-full lg:w-72 flex flex-col gap-4">
            {isLoading || isDetectingLocation || !currentWeather ? (
              <CurrentWeatherCardSkeleton />
            ) : (
              <>
                <CurrentWeatherCard
                  location={currentWeather.location}
                  temp={displayTemp}
                  tempUnit={tempUnitLabel}
                  wind={displayWind}
                  windUnit={windUnitLabel}
                  humidity={displayHumidity}
                  pressure={displayPressure}
                  pressureUnit={pressureUnitLabel}
                  selectedHourLabel={
                    effectiveHourData
                      ? `${effectiveHourData.time}, ${effectiveSelectedDay}`
                      : null
                  }
                  onClearSelectedHour={handleClearSelectedHour}
                />

                <AirQualityCard airQuality={airQuality} />
              </>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/30 text-xs text-red-400">
                Couldn't load weather for "{selectedCityName}": {error}
              </div>
            )}

            <RegionWeatherList
              regions={regionWeather}
              onRemoveRegion={handleRemoveRegion}
            />
          </div>
        </div>
      </div>

      {isAlertsModalOpen && (
        <WeatherAlertsModal
          alerts={alerts}
          onClose={() => setIsAlertsModalOpen(false)}
        />
      )}

      {isFavoritesModalOpen && (
        <FavoritesModal
          favorites={favorites}
          onAdd={handleAddFavorite}
          onRemove={handleRemoveFavorite}
          onClose={() => setIsFavoritesModalOpen(false)}
        />
      )}

      {isSettingsModalOpen && (
        <SettingsModal
          key={JSON.stringify(settings)}
          settings={settings}
          onApply={handleApplySettings}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      )}

      {isAboutModalOpen && (
        <AboutModal onClose={() => setIsAboutModalOpen(false)} />
      )}

      {isAddCityModalOpen && (
        <CitySearchModal
          title="Add a city"
          placeholder="Search city to add..."
          excludeCities={regionWeather.map((r) => r.city)}
          onSelect={handleAddCity}
          onClose={() => setIsAddCityModalOpen(false)}
        />
      )}

      {isQuickSearchModalOpen && (
        <CitySearchModal
          title="Search city"
          placeholder="Jump to a city..."
          onSelect={handleQuickSearchSelect}
          onClose={() => setIsQuickSearchModalOpen(false)}
        />
      )}
    </div>
  );
}
