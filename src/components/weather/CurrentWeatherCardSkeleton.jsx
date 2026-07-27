import Skeleton from "../ui/Skeleton";

export default function CurrentWeatherCardSkeleton() {
  return (
    <div
      className="
        w-full sm:w-64
        p-5 rounded-2xl
        bg-white/70 dark:bg-white/10
        backdrop-blur-xl
        border border-slate-300/50 dark:border-white/20
        shadow-lg
      "
    >
      <Skeleton className="h-4 w-28 mb-3" />
      <Skeleton className="h-14 w-32 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

