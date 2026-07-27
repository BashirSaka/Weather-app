import { useState } from "react";
import { Plus, Search, Bell, Menu, MoreVertical } from "lucide-react";
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
  onMenuClick,
}) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileActionsOpen, setIsMobileActionsOpen] = useState(false);
  const { notifications, readIds, unreadCount, markAsRead, markAllAsRead } =
    useNotifications(alerts);

  const handleMobileAddCity = () => {
    setIsMobileActionsOpen(false);
    onAddCityClick();
  };

  const handleMobileSearch = () => {
    setIsMobileActionsOpen(false);
    onSearchClick();
  };

  return (
    <header className="flex items-center justify-between w-full mb-6 sm:mb-8">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white flex items-center justify-center cursor-pointer shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Welcome
          </p>
          <h1 className="text-base sm:text-xl font-semibold text-slate-900 dark:text-white truncate">
            {user.name}
          </h1>
        </div>
      </div>

      {/* Desktop / tablet: individual icons, unchanged */}
      <div className="hidden sm:flex items-center gap-3">
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

      {/* Mobile: single consolidated menu button */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setIsMobileActionsOpen((prev) => !prev)}
          className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white flex items-center justify-center cursor-pointer"
          aria-label="More actions"
        >
          <MoreVertical className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full bg-red-500 text-white text-[9px] font-semibold pointer-events-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {isMobileActionsOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-300/50 dark:border-white/20 shadow-xl z-50">
            <button
              onClick={handleMobileAddCity}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-left"
            >
              <Plus className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              Add City
            </button>

            <button
              onClick={handleMobileSearch}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-left"
            >
              <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              Search
            </button>

            <button
              onClick={() => {
                setIsMobileActionsOpen(false);
                setIsNotificationsOpen(true);
              }}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setIsMobileActionsOpen(false);
                setIsProfileOpen(true);
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-left"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-4 h-4 rounded object-cover"
              />
              Profile
            </button>
          </div>
        )}

        {/* Notifications and Profile panels, triggered from the menu above */}
        {isNotificationsOpen && (
          <NotificationsPanel
            notifications={notifications}
            readIds={readIds}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            onClose={() => setIsNotificationsOpen(false)}
          />
        )}

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
    </header>
  );
}
