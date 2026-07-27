import {
  LayoutGrid,
  Cloud,
  MapPin,
  Bookmark,
  Settings,
  Info,
  X,
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
  isMobileOpen,
  onMobileClose,
}) {
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleNavClick = (item) => {
    setActiveItem(item.id);
    if (item.id === "locations") onLocationClick?.();
    if (item.id === "weather") onWeatherClick?.();
    if (item.id === "saved") onFavoritesClick?.();
    if (item.id === "settings") onSettingsClick?.();
    onMobileClose?.();
  };

  const handleAboutClick = () => {
    onAboutClick?.();
    onMobileClose?.();
  };

  return (
    <>
      {/* Mobile backdrop, closes drawer on tap outside */}
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`
          fixed  md:sticky top-0 left-0 z-50
          flex flex-col items-center justify-between
          h-auto py-6 gap-8 px-3
          w-16 sm:w-20 md:w-16 lg:w-20
          bg-white/10 dark:bg-white/5
          border-r border-slate-300/30 dark:border-white/10
          backdrop-blur-xl 
          transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close button, mobile only */}
        <button
          onClick={onMobileClose}
          className="absolute top-2 right-2 md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-300/30 mt-5">
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
              className=" text-amber-400"
            />
          ))}
        </nav>

        {/* About / Help */}
        <IconButton icon={Info} label="About" onClick={handleAboutClick} />
      </aside>
    </>
  );
}
