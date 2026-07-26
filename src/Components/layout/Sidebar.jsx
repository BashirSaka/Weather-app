import {
  LayoutGrid,
  Cloud,
  MapPin,
  Bookmark,
  Settings,
  Info,
} from "lucide-react";
import IconButton from "../ui/IconButton";
import { useState } from "react";

const navItems = [
  { id: "dashboard", icon: LayoutGrid, label: "Dashboard" },
  { id: "weather", icon: Cloud, label: "Weather" },
  { id: "locations", icon: MapPin, label: "Locations" },
  { id: "saved", icon: Bookmark, label: "Saved" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({
  onLocationClick,
  onWeatherClick,
  onFavoritesClick,
  onSettingsClick,
  onAboutClick,
}) {
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleNavClick = (item) => {
    setActiveItem(item.id);
    if (item.id === "locations") {
      onLocationClick?.();
    }
    if (item.id === "weather") {
      onWeatherClick?.();
    }
    if (item.id === "saved") {
      onFavoritesClick?.();
    }
    if (item.id === "settings") {
      onSettingsClick?.();
    }
  };

  return (
    <aside
      className="
        flex flex-col items-center justify-between
        h-full py-6
        w-16 sm:w-20
        bg-white/60 dark:bg-white/5
        border-r border-slate-300/40 dark:border-white/10
        backdrop-blur-xl
      "
    >
      {/* Logo */}
      <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-300/30">
        <Cloud className="w-5 h-5 text-amber-400" />
      </div>

      {/* Nav icons */}
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <IconButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.id}
            onClick={() => handleNavClick(item)}
          />
        ))}
      </nav>

      {/* About / Help */}
      <IconButton icon={Info} label="About" onClick={() => onAboutClick?.()} />
    </aside>
  );
}
