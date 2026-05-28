import { HOME_APPS, HOME_VARIANTS } from "../content/constants.js";
import AppIcon from "../components/phone/AppIcon.jsx";
import NotificationBanner from "../components/phone/NotificationBanner.jsx";
import StatusBar from "../components/phone/StatusBar.jsx";

/**
 * Home screen — static variant for catalog, or interactive when callbacks are passed.
 */
export default function HomeScreen({
  variant = "default",
  apps = HOME_APPS,
  notification: notificationOverride,
  badge: badgeOverride,
  badgeApp: badgeAppOverride,
  onOpenDrawer,
  onOpenApp,
  onOpenNotification,
  onNotificationDismiss,
  notificationAutoDismissMs = 2000,
}) {
  const variantConfig = HOME_VARIANTS[variant] ?? HOME_VARIANTS.default;
  const notification =
    notificationOverride !== undefined
      ? notificationOverride
      : variantConfig.notification;
  const badge = badgeOverride !== undefined ? badgeOverride : variantConfig.badge;
  const badgeApp =
    badgeAppOverride !== undefined ? badgeAppOverride : variantConfig.badgeApp;
  const { notice } = variantConfig;

  return (
    <div className="relative flex h-full flex-col bg-gradient-to-br from-indigo-700 via-purple-700 to-slate-900 p-6 pt-16 text-white">
      <StatusBar />
      <NotificationBanner
        data={notification}
        onClick={onOpenNotification}
        autoDismissMs={onNotificationDismiss ? notificationAutoDismissMs : 0}
        onDismiss={onNotificationDismiss}
      />

      <div className="mb-8 flex items-center rounded-full bg-white/90 px-4 py-3 text-slate-500">
        <span>🔎</span>
        <span className="ml-2 text-sm">Search or type web address</span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="grid grid-cols-4 gap-x-5 gap-y-7 pt-2 pb-4">
          {apps.map((app) => (
            <AppIcon
              key={app.id}
              emoji={app.emoji}
              label={app.label}
              onClick={onOpenApp ? () => onOpenApp(app.id) : undefined}
              badge={
                badge &&
                (badgeApp
                  ? app.id === badgeApp
                  : (app.id === "messages" && variant !== "whatsapp_activity") ||
                    (app.id === "whatsapp" && variant === "whatsapp_activity"))
              }
            />
          ))}
        </div>
      </div>

      {onOpenDrawer ? (
        <button
          type="button"
          onClick={onOpenDrawer}
          className="shrink-0 pt-2 w-full text-center text-[10px] text-white/40 hover:text-white/60"
        >
          Swipe up for more apps ↑
        </button>
      ) : !onOpenApp ? (
        <p className="shrink-0 pt-2 text-center text-[10px] text-white/40">
          Swipe up for more apps
        </p>
      ) : null}

      {notice && (
        <div className="absolute bottom-24 left-5 right-5 rounded-2xl bg-black/40 p-3 text-center text-sm">
          {notice}
        </div>
      )}
    </div>
  );
}
