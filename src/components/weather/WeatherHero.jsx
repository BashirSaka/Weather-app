export default function WeatherHero({ tag, title, description }) {
  return (
    <div className="max-w-md">
      {/* Tag pill */}
      <span
        className="
          inline-block px-4 py-1.5 mb-4
          text-xs font-medium text-white
          bg-white/10 backdrop-blur-md
          border border-white/20 rounded-full
        "
      >
        {tag}
      </span>

      {/* Headline */}
      <h2
        className="
          text-3xl sm:text-4xl lg:text-5xl
          font-bold text-white leading-tight
          mb-4
        "
      >
        {title}
      </h2>

      {/* Description */}
      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
