import { useMemo, useState } from "react";
import PhoneShell from "../components/phone/PhoneShell.jsx";
import ScriptChoiceOverlay from "../components/engine/ScriptChoiceOverlay.jsx";
import HomeScreen from "../screens/HomeScreen.jsx";
import DrawerScreen from "../screens/DrawerScreen.jsx";
import MessagesApp from "../phone/MessagesApp.jsx";
import WhatsAppApp from "../phone/WhatsAppApp.jsx";
import { usePhoneStore } from "../phone/phoneStore.js";
import { useEventScript } from "../hooks/useEventScript.js";
import eventScript from "../content/game.events.md?raw";

function overlayNotificationFromLatest(latest) {
  if (!latest) return null;
  return {
    app: latest.appLabel,
    from: latest.from,
    body: latest.body,
  };
}

export default function PhoneRuntime() {
  const phone = usePhoneStore();
  const [route, setRoute] = useState({ screen: "home", appId: null });

  const { node, onChoice } = useEventScript(eventScript, { phone });

  const latestNotification = phone.selectors.latestNotification;
  const totalUnreadSms = phone.selectors.totalUnreadSms;

  const homeNotification = useMemo(
    () => overlayNotificationFromLatest(latestNotification),
    [latestNotification]
  );

  const homeBadge = totalUnreadSms > 0;

  const activeApp = route.appId;

  let content = null;
  if (route.screen === "home") {
    content = (
      <HomeScreen
        variant="default"
        notification={homeNotification}
        badge={homeBadge}
        badgeApp={homeBadge ? "messages" : undefined}
        onOpenDrawer={() => setRoute({ screen: "drawer", appId: null })}
        onOpenApp={(appId) => setRoute({ screen: "app", appId })}
        onOpenNotification={() => {
          // For now, all injected notifications are Messages-related.
          setRoute({ screen: "app", appId: "messages" });
          phone.api.signal("opened_messages_from_notification", "1");
        }}
      />
    );
  } else if (route.screen === "drawer") {
    content = (
      <DrawerScreen
        onGoHome={() => setRoute({ screen: "home", appId: null })}
        onOpenApp={(appId) => setRoute({ screen: "app", appId })}
      />
    );
  } else if (route.screen === "app") {
    if (activeApp === "messages") content = <MessagesApp phone={phone} />;
    else if (activeApp === "whatsapp")
      content = <WhatsAppApp onBackToHome={() => setRoute({ screen: "home", appId: null })} />;
    else {
      content = (
        <div className="relative h-full bg-slate-950 pt-12 text-white">
          <div className="p-6 text-center text-sm text-white/70">
            App not implemented yet: <b>{activeApp}</b>
          </div>
          <button
            type="button"
            onClick={() => setRoute({ screen: "home", appId: null })}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-6 py-2 text-xs font-semibold backdrop-blur"
          >
            Home
          </button>
        </div>
      );
    }
  }

  const gate = phone.state.choiceGate;
  const gateActive = !!gate;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="relative">
        <PhoneShell>
          <div className="relative h-full">
            {content}

            {/* Global Home control (disabled during choice gates) */}
            {!gateActive && route.screen !== "home" && (
              <button
                type="button"
                onClick={() => setRoute({ screen: "home", appId: null })}
                className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/60 px-6 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-black/70 active:bg-black/80"
              >
                Home
              </button>
            )}

            {/* Block interactions only during an explicit choice gate */}
            {gateActive && (
              <div className="absolute inset-0 z-40">
                <div className="absolute inset-0 bg-black/20" />
                <ScriptChoiceOverlay
                  prompt={gate.prompt}
                  options={gate.options}
                  onChoose={onChoice}
                />
              </div>
            )}
          </div>
        </PhoneShell>

        {/* Debug label (small, non-intrusive) */}
        <div className="mt-3 text-center font-mono text-[10px] text-slate-500">
          node: {node?.id ?? "—"}
        </div>
      </div>
    </div>
  );
}

