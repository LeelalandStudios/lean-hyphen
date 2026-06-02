import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PhoneShell from "../components/phone/PhoneShell.jsx";
import LockScreen from "../screens/LockScreen.jsx";
import HomeScreen from "../screens/HomeScreen.jsx";
import NotificationBanner from "../components/phone/NotificationBanner.jsx";
import { EXPLORER_APPS, NOTIFICATION_BANNER_STAY_MS } from "../content/constants.js";
import { usePhoneStore } from "./phoneStore.js";
import { appIdFromNotification, renderPhoneApp } from "./appRegistry.jsx";

/**
 * Phone Explorer — the navigable phone OS (lock → home → apps).
 * @param {{ embedded?: boolean, phone?: ReturnType<typeof usePhoneStore>, onUnlocked?: () => void, onNotificationOpened?: (notification: { app?: string, from?: string, body?: string } | null) => void, onScamReached?: () => void, scenarioThreadId?: string, onPhonepeClaim?: () => void, openAppId?: string | null, lockNotification?: { appId?: string, appLabel?: string, from?: string, body?: string } | null, badgeApp?: string, homeApps?: { id: string, emoji: string, label: string }[], phoneSessionKey?: number }} props
 */
export default function PhoneExplorer({
  embedded = false,
  phone: phoneOverride,
  onUnlocked,
  onNotificationOpened,
  onScamReached,
  scenarioThreadId,
  onPhonepeClaim,
  openAppId = null,
  lockNotification = null,
  badgeApp,
  homeApps = EXPLORER_APPS,
  phoneSessionKey = 0,
}) {
  const internalPhone = usePhoneStore();
  const phone = phoneOverride ?? internalPhone;
  const [route, setRoute] = useState({ screen: "lock", appId: null });
  const [history, setHistory] = useState([]);
  const lastOpenAppIdRef = useRef(null);

  const goHome = useCallback(() => {
    setRoute({ screen: "home", appId: null });
    setHistory([]);
  }, []);

  const openApp = useCallback(
    (appId) => {
      phone.api.clearNotifications();
      setHistory((h) => [...h, route]);
      setRoute({ screen: "app", appId });
    },
    [route, phone.api]
  );

  const goBack = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) {
        setRoute({ screen: "home", appId: null });
        return [];
      }
      const prev = h[h.length - 1];
      setRoute(prev);
      return h.slice(0, -1);
    });
  }, []);

  const unlock = useCallback(() => {
    setRoute({ screen: "home", appId: null });
    setHistory([]);
    onUnlocked?.();
  }, []);

  const latestNotification = phone.selectors.latestNotification;
  const totalUnreadSms = phone.selectors.totalUnreadSms;

  const banner = useMemo(() => {
    if (!latestNotification) return null;
    return {
      id: latestNotification.id,
      appId: latestNotification.appId,
      app: latestNotification.appLabel,
      from: latestNotification.from,
      body: latestNotification.body,
    };
  }, [latestNotification]);

  const dismissBanner = useCallback(() => {
    if (!banner?.id) return;
    phone.api.dismissNotification(banner.id);
  }, [phone.api, banner?.id]);

  const homeBadge =
    badgeApp != null ? true : totalUnreadSms > 0;
  const resolvedBadgeApp = badgeApp ?? (totalUnreadSms > 0 ? "messages" : undefined);

  let content = null;

  useEffect(() => {
    setRoute({ screen: "lock", appId: null });
    setHistory([]);
    lastOpenAppIdRef.current = null;
  }, [phoneSessionKey]);

  if (route.screen === "lock") {
    content = (
      <LockScreen onUnlock={unlock} notification={lockNotification} />
    );
  } else if (route.screen === "home") {
    content = (
      <HomeScreen
        apps={homeApps}
        variant="default"
        notification={banner}
        badge={homeBadge}
        badgeApp={resolvedBadgeApp}
        onOpenApp={openApp}
        onOpenNotification={() => {
          const appId = appIdFromNotification(banner);
          dismissBanner();
          onNotificationOpened?.(banner);
          if (scenarioThreadId && appId === "messages") {
            phone.api.signal("open_messages_thread", scenarioThreadId);
          }
          openApp(appId);
        }}
        onNotificationDismiss={dismissBanner}
      />
    );
  } else if (route.screen === "app" && route.appId) {
    content = renderPhoneApp(route.appId, {
      phone,
      onBack: goBack,
      onBackToHome: goHome,
      scenarioThreadId,
      onOpenScenarioThread: onNotificationOpened,
      onPhonepeClaim,
      onScamReached,
    });
  }

  useEffect(() => {
    if (!openAppId) return;
    if (lastOpenAppIdRef.current === openAppId) return;
    lastOpenAppIdRef.current = openAppId;
    openApp(openAppId);
  }, [openAppId, openApp]);

  const showHomeButton = route.screen !== "lock" && route.screen !== "home";

  const shell = (
    <PhoneShell>
      <div className="relative h-full">
        {route.screen !== "lock" && route.screen !== "home" && (
          <NotificationBanner
            data={banner}
            onClick={() => {
              const appId = appIdFromNotification(banner);
              dismissBanner();
              onNotificationOpened?.(banner);
              if (scenarioThreadId && appId === "messages") {
                phone.api.signal("open_messages_thread", scenarioThreadId);
              }
              openApp(appId);
            }}
            autoDismissMs={banner ? NOTIFICATION_BANNER_STAY_MS : 0}
            onDismiss={dismissBanner}
          />
        )}
        {content}

        {showHomeButton && (
          <button
            type="button"
            onClick={goHome}
            className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/60 px-6 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-black/70 active:bg-black/80"
          >
            Home
          </button>
        )}
      </div>
    </PhoneShell>
  );

  if (embedded) {
    return <div className="shrink-0">{shell}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4">
      {shell}

      <div className="mt-4 flex items-center gap-4 text-[10px] text-slate-600">
        <a href="?index=1" className="underline-offset-2 hover:text-slate-400 hover:underline">
          Scene index (dev)
        </a>
        <a href="?catalog=1" className="underline-offset-2 hover:text-slate-400 hover:underline">
          Screen catalog (dev)
        </a>
      </div>
    </div>
  );
}
