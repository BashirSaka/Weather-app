import { useState } from "react";

export default function ForecastChart({ data, selectedIndex, onHourSelect }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const width = 500;
  const height = 140;
  const paddingX = 30;
  const paddingY = 32;

  const temps = data.map((d) => d.temp);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);

  const points = data.map((d, i) => {
    const x = paddingX + (i * (width - paddingX * 2)) / (data.length - 1);
    const range = maxTemp - minTemp || 1;
    const y =
      height -
      paddingY -
      ((d.temp - minTemp) / range) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const linePath = points.reduce((path, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = points[i - 1];
    const midX = (prev.x + point.x) / 2;
    return `${path} Q ${prev.x} ${prev.y} ${midX} ${(prev.y + point.y) / 2} T ${point.x} ${point.y}`;
  }, "");

  const activeIndex = hoveredIndex ?? selectedIndex;
  const activePoint = activeIndex != null ? points[activeIndex] : null;

  const getTooltipTransform = (point) => {
    const percentX = (point.x / width) * 100;
    const isNearLeftEdge = percentX < 12;
    const isNearRightEdge = percentX > 88;

    let translateX = "-50%";
    if (isNearLeftEdge) translateX = "0%";
    if (isNearRightEdge) translateX = "-100%";

    return `translate(${translateX}, 20%)`;
  };

  return (
    <div className="w-full min-w-0 overflow-x-auto overflow-y-visible relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto min-w-[380px] max-w-[500px]"
        preserveAspectRatio="none"
      >
        <path
          d={linePath}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
        />

        {points.map((point, i) => {
          const isActive = i === activeIndex;
          return (
            <g key={i}>
              <text
                x={point.x}
                y={point.y - 12}
                textAnchor="middle"
                fontSize="11"
                fontWeight={isActive ? "700" : "400"}
                fill={isActive ? "#fbbf24" : "#e2e8f0"}
              >
                {point.temp}°
              </text>

              <text
                x={point.x}
                y={height - 8}
                textAnchor="middle"
                fontSize="9"
                fill={isActive ? "#fbbf24" : "#94a3b8"}
              >
                {point.time}
              </text>

              <circle
                cx={point.x}
                cy={point.y}
                r={12}
                fill="transparent"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onHourSelect(point, i)}
              />

              <circle
                cx={point.x}
                cy={point.y}
                r={isActive ? 5 : 3}
                fill={isActive ? "#fbbf24" : "rgba(255,255,255,0.6)"}
                style={{ pointerEvents: "none" }}
              />
            </g>
          );
        })}
      </svg>

      {activePoint && (
        <div
          className="absolute px-2.5 py-1.5 rounded-lg bg-slate-900/95 border border-white/20 text-xs text-white shadow-lg pointer-events-none z-10"
          style={{
            left: `${(activePoint.x / width) * 100}%`,
            top: `${(activePoint.y / height) * 100}%`,
            transform: getTooltipTransform(activePoint),
            whiteSpace: "nowrap",
          }}
        >
          <p className="font-semibold text-amber-400">
            {activePoint.time} · {activePoint.temp}°
          </p>
          <p className="text-slate-300">{activePoint.condition}</p>
          <p className="text-slate-400">
            💧 {activePoint.humidity}% · 💨 {activePoint.wind}
          </p>
        </div>
      )}
    </div>
  );
}
