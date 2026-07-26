import { useLocalStorage } from "./useLocalStorage";

export function useNotifications(alerts = []) {
  const [readIds, setReadIds] = useLocalStorage("readNotificationIds", []);

  const markAsRead = (id) => {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const markAllAsRead = () => {
    setReadIds(alerts.map((a) => a.id));
  };

  const unreadCount = alerts.filter((a) => !readIds.includes(a.id)).length;

  return {
    notifications: alerts,
    readIds,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}

