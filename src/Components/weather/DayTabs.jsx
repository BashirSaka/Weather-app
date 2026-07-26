export default function DayTabs({ days, activeDate, onDayChange }) {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      {days.map((item) => {
        const isActive = item.date === activeDate;

        // Parse "YYYY-MM-DD" manually and build the Date in local time,
        // avoiding the UTC-midnight parsing bug that can shift the day back
        const [year, month, day] = item.date.split("-").map(Number);
        const localDate = new Date(year, month - 1, day);
        const weekdayLabel = localDate.toLocaleDateString("en-US", {
          weekday: "short",
        });

        return (
          <button
            key={item.date}
            onClick={() => onDayChange(item.date)}
            className={`
              flex-1 py-2 px-2 sm:px-4
              rounded-xl text-xs sm:text-sm
              transition-all duration-200
              ${
                isActive
                  ? "bg-amber-400/20 border border-amber-300/40 text-amber-400 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }
            `}
          >
            {weekdayLabel}
          </button>
        );
      })}
    </div>
  );
}
