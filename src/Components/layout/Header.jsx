import { useState } from "react";
import { Plus, Search, Bell } from "lucide-react";
import IconButton from "../ui/IconButton";
 import NotificationsPanel from "./NotificationsPanel";
import ProfileDropdown from "./ProfileDropdown";
import { useNotifications } from "../../hooks/useNotifications";
import { user } from "../../data/fakeData";

export default function Header({
  onAddCityClick,
  onSearchClick,
  onFavoritesClick,
  onSettingsClick,
  appearance,
  onAppearanceChange,
  alerts,
}) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { notifications, readIds, unreadCount, markAsRead, markAllAsRead } =
    useNotifications(alerts);

  return (
    <header className="flex items-center justify-between w-full mb-8">
      <div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Welcome back 👋
        </p>
        <h1 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
          {user.name}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <IconButton icon={Plus} label="Add City" onClick={onAddCityClick} />
        <IconButton icon={Search} label="Search" onClick={onSearchClick} />

        <div className="relative">
          <IconButton
            icon={Bell}
            label="Notifications"
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold pointer-events-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}

          {isNotificationsOpen && (
            <NotificationsPanel
              notifications={notifications}
              readIds={readIds}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onClose={() => setIsNotificationsOpen(false)}
            />
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="cursor-pointer"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-white/20 hover:opacity-80 transition-opacity"
            />
          </button>

          {isProfileOpen && (
            <ProfileDropdown
              user={user}
              appearance={appearance}
              onAppearanceChange={onAppearanceChange}
              onFavoritesClick={() => {
                setIsProfileOpen(false);
                onFavoritesClick();
              }}
              onSettingsClick={() => {
                setIsProfileOpen(false);
                onSettingsClick();
              }}
              onClose={() => setIsProfileOpen(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
}
