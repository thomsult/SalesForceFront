import { useContext } from "react";
import { BellIcon, BellSlashIcon } from "@heroicons/react/24/solid";

import NotificationContext from "./NotificationContext";

export default function NotificationManager() {
  const { Pending, DisplayNotificationPending } =
    useContext(NotificationContext);
  const [notificationPending] = Pending;

  return (
    notificationPending && (
      <button
        type="button"
        onClick={() => DisplayNotificationPending(notificationPending)}
        className="bg-gray-800 relative p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <div className="flex">
          <span className="sr-only">Voir mes notifications</span>
          {notificationPending.length > 0 ? (
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <BellSlashIcon className="h-6 w-6" aria-hidden="true" />
          )}
          <span className="mt-0.5 font-medium">
            {notificationPending.length > 0 ? notificationPending.length : ""}
          </span>
        </div>
      </button>
    )
  );
}
