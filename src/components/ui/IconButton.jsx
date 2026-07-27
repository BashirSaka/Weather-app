export default function IconButton({
  icon: Icon,
  active = false,
  onClick,
  label,
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`
        flex items-center justify-center
        w-10 h-10 sm:w-11 sm:h-11
        rounded-xl transition-all duration-200
        cursor-pointer
        ${
          active
            ? "bg-amber-400/20 border border-amber-300/40 text-amber-500 dark:text-amber-400"
            : "bg-slate-900/5 dark:bg-white/5 border border-slate-300/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-900/10 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
        }
      `}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
