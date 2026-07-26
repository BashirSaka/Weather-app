export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-slate-300/40 dark:bg-white/10 rounded-lg ${className}`}
    />
  );
}
