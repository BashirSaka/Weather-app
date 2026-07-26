import Skeleton from "../ui/Skeleton";

const BAR_HEIGHTS = [55, 90, 70, 100, 60, 80]; // fixed varied heights, avoids render-time randomness

export default function ForecastChartSkeleton() {
  return (
    <div className="w-full h-[140px] flex items-end justify-between gap-3 px-4">
      {BAR_HEIGHTS.map((height, i) => (
        <Skeleton
          key={i}
          className="flex-1"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}
