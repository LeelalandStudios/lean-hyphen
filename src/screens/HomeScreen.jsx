import { HOME_APPS, HOME_VARIANTS } from "../content/constants.js";
import AppIcon from "../components/phone/AppIcon.jsx";
import NotificationBanner from "../components/phone/NotificationBanner.jsx";
import StatusBar from "../components/phone/StatusBar.jsx";

/**
 * Static home screen. Variant matches script beats (no navigation).
 * @param {{ variant?: keyof typeof HOME_VARIANTS }} props
 */
export default function HomeScreen({ variant = "default" }) {
  const { badge, badgeApp, notification, notice } =
    HOME_VARIANTS[variant] ?? HOME_VARIANTS.default;

  return (
    <div className="relative h-full bg-gradient-to-br from-indigo-700 via-purple-700 to-slate-900 p-6 pt-16 text-white">
      <StatusBar />
      <NotificationBanner data={notification} />

      <div className="mb-8 flex items-center rounded-full bg-white/90 px-4 py-3 text-slate-500">
        <span>🔎</span>
        <span className="ml-2 text-sm">Search or type web address</span>
      </div>

      <div className="grid grid-cols-4 gap-x-5 gap-y-7 pt-6">
        {HOME_APPS.map((app) => (
          <AppIcon
            key={app.id}
            emoji={app.emoji}
            label={app.label}
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

      <p className="mt-6 text-center text-[10px] text-white/40">
        Swipe up for more apps
      </p>

      {notice && (
        <div className="absolute bottom-24 left-5 right-5 rounded-2xl bg-black/40 p-3 text-center text-sm">
          {notice}
        </div>
      )}
    </div>
  );
}
