import { getWeatherTheme } from "../../utils/weatherTheme";

// Generated once when this module loads — not during render, so no purity violation
function createRandomPositions(count, config) {
  return Array.from({ length: count }, (_, i) => {
    const item = { id: i };
    for (const key in config) {
      const [min, max] = config[key];
      item[key] = min + Math.random() * (max - min);
    }
    return item;
  });
}

const RAIN_DROPS = createRandomPositions(40, {
  left: [0, 100],
  delay: [0, 1.5],
  duration: [0.6, 1.0],
});

const SNOW_FLAKES = createRandomPositions(30, {
  left: [0, 100],
  delay: [0, 5],
  duration: [5, 9],
});

const STARS = createRandomPositions(50, {
  top: [0, 70],
  left: [0, 100],
  delay: [0, 3],
  duration: [2, 4],
});

function RainOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {RAIN_DROPS.map((drop) => (
        <span
          key={drop.id}
          className="absolute top-[-10%] w-[1.5px] h-8 bg-white/40 rounded-full animate-rain-fall"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function SnowOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {SNOW_FLAKES.map((flake) => (
        <span
          key={flake.id}
          className="absolute top-[-5%] w-1.5 h-1.5 bg-white/80 rounded-full animate-snow-fall"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function CloudyOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 blur-xl animate-cloud-drift"
          style={{
            width: `${180 + i * 60}px`,
            height: `${60 + i * 20}px`,
            top: `${10 + i * 18}%`,
            animationDelay: `${i * 6}s`,
            animationDuration: `${25 + i * 8}s`,
          }}
        />
      ))}
    </div>
  );
}

function SunnyOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-start justify-end">
      <div className="relative w-40 h-40 mt-10 mr-16">
        <div className="absolute inset-0 rounded-full bg-amber-300/40 blur-2xl animate-sun-pulse" />
        <div className="absolute inset-4 rounded-full bg-amber-200/60 blur-md" />
      </div>
    </div>
  );
}

function NightOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {STARS.map((star) => (
        <span
          key={star.id}
          className="absolute w-[2px] h-[2px] bg-white rounded-full animate-star-twinkle"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function ThunderstormOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <RainOverlay />
      <div className="absolute inset-0 bg-white/0 animate-lightning-flash" />
    </div>
  );
}

const overlayMap = {
  rain: RainOverlay,
  snow: SnowOverlay,
  cloudy: CloudyOverlay,
  sunny: SunnyOverlay,
  night: NightOverlay,
  thunderstorm: ThunderstormOverlay,
};

export default function WeatherBackground({ condition, isDay }) {
  const theme = getWeatherTheme(condition, isDay);
  const Overlay = overlayMap[theme.animation];

  return (
    <div
      className="fixed inset-0 -z-10 transition-all duration-1000"
      style={{ background: theme.gradient }}
    >
      {Overlay && <Overlay />}
    </div>
  );
}
