import { useCallback, useEffect, useMemo, useState } from "react";
import PhoneExplorer from "../phone/PhoneExplorer.jsx";
import { usePhoneStore } from "../phone/phoneStore.js";
import {
  ACT2_S1_THOUGHTS,
  PHONEPE_SCAM_NOTIFICATION,
  PHONEPE_SCAM_SENDER,
  SCENARIO1_CHOICES,
  SCENARIO1_THREAD_ID,
} from "../content/scenario1.js";

const TIMER_SECONDS = 5 * 60;
const PHONE_HEIGHT_PX = 760;
const NOTIFICATION_PREVIEW =
  "🎉 You have won ₹3,000 PhonePe cashback! Claim now or offer expires in 5 minutes!";

function formatMMSS(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function Act2PhoneSimulation() {
  const phone = usePhoneStore();
  const [timerStartAt, setTimerStartAt] = useState(null);
  const [thoughtsVisible, setThoughtsVisible] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const choice = phone.state.vars.act2_s1_choice ?? "";
  const responded = Boolean(choice && String(choice).length > 0);

  const remainingSeconds = useMemo(() => {
    if (!timerStartAt || responded) return null;
    const elapsed = Math.floor((now - timerStartAt) / 1000);
    return Math.max(0, TIMER_SECONDS - elapsed);
  }, [timerStartAt, responded, now]);

  useEffect(() => {
    if (!timerStartAt || responded) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [timerStartAt, responded]);

  const triggerScenario1 = useCallback(() => {
    const startAt = Date.now();
    setTimerStartAt(startAt);
    setNow(startAt);

    phone.api.receiveSms({
      threadId: SCENARIO1_THREAD_ID,
      from: PHONEPE_SCAM_SENDER,
      body: PHONEPE_SCAM_NOTIFICATION,
    });

    phone.api.notify({
      appId: "messages",
      appLabel: "📱 Messages",
      from: PHONEPE_SCAM_SENDER,
      body: NOTIFICATION_PREVIEW,
    });

    phone.api.openChoiceGate({
      id: "act2_s1",
      prompt: "What do you do?",
      options: SCENARIO1_CHOICES.map((c) => ({
        ...c,
        set: { act2_s1_choice: c.id },
      })),
    });
  }, [phone.api]);

  const onUnlocked = useCallback(() => {
    phone.api.setVars({ act2_s1_choice: "" });
    phone.api.signal("open_messages_thread", "");
    setTimerStartAt(null);
    setThoughtsVisible(false);

    window.setTimeout(() => {
      triggerScenario1();
    }, 2000);
  }, [phone.api, triggerScenario1]);

  const onNotificationOpened = useCallback(() => {
    setThoughtsVisible(true);
  }, []);

  useEffect(() => {
    if (!responded) return;
    setTimerStartAt(null);
    setThoughtsVisible(false);
  }, [responded]);

  const showSidePanel = timerStartAt != null && !responded;

  return (
    <div className="flex h-full min-h-0 w-full items-start justify-center gap-10 overflow-auto p-6">
      <PhoneExplorer
        embedded
        phone={phone}
        onUnlocked={onUnlocked}
        onNotificationOpened={onNotificationOpened}
        scenarioThreadId={SCENARIO1_THREAD_ID}
      />

      {showSidePanel && (
        <aside
          className="flex w-[min(320px,100%)] shrink-0 flex-col gap-5"
          style={{ minHeight: PHONE_HEIGHT_PX }}
        >
          <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-5 py-4">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-200/90">
              Offer expires
            </p>
            <p className="mt-1 font-mono text-4xl font-black tabular-nums tracking-tight text-white">
              {formatMMSS(remainingSeconds ?? TIMER_SECONDS)}
            </p>
          </div>

          {thoughtsVisible && (
            <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-4 transition-opacity duration-300">
              {ACT2_S1_THOUGHTS.map((thought, i) => (
                <p
                  key={thought}
                  className={`text-sm italic leading-relaxed text-slate-200 ${i > 0 ? "mt-3" : ""}`}
                >
                  “{thought}”
                </p>
              ))}
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
