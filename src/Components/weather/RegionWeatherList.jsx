import RegionWeatherCard from "./RegionWeatherCard";

export default function RegionWeatherList({ regions, onRemoveRegion }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {regions.map((region, index) => (
        <RegionWeatherCard
          key={index}
          country={region.country}
          city={region.city}
          condition={region.condition}
          temp={region.temp}
          onRemove={onRemoveRegion}
        />
      ))}
    </div>
  );
}
