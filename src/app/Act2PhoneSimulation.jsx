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
const PRIYA_AVATAR_SRC = "/avatars/priya.png";
const NOTIFICATION_PREVIEW =
  "🎉 You have won ₹3,000 PhonePe cashback! Claim now or offer expires in 5 minutes!";

const PHONEPE_LOGIN_DETECTED_SMS = "New login detected on your PhonePe account";
const S2_GOOGLE_THREAD_ID = "act2_s2_google_security";
const S2_GOOGLE_ALERT_SMS = "New login to your Google account from unknown device";

const SCENARIO2 = {
  id: "s2",
  appId: "mail",
  appLabel: "📧 Mail",
  from: "it-support@sch00l-portal.in",
  subject: "⚠️ Action Required — Account Deactivation in 24 Hours",
  body:
    "Your school portal will be deactivated. You will lose access to results and timetable. Verify now →\n" +
    "school-portal-login.net/verify-now",
  thought: "My results. My timetable. 24 hours.",
  choices: [
    { id: "click", label: "Click the link — I can't lose my results" },
    { id: "dont", label: "Something looks wrong — I won't click" },
    { id: "see", label: "Click just to see what it looks like" },
  ],
};

const SCENARIO3_THREAD_GARENA_ID = "act2_s3_garena";
const SCENARIO3_THREAD_UNKNOWN_ID = "act2_s3_unknown";
const SCENARIO4_THREAD_ID = "act2_s4_kabir";

const SCENARIO5 = {
  id: "s5",
  appId: "mlbb",
  appLabel: "🎮 Mobile Legends",
  from: "[BGMI_ADMIN_OFFICIAL]",
  body:
    "Our system flagged your account for third-party software. Reply with your email and password within 10 minutes.",
  thought: "Permanent ban. 10 minutes. I haven't done anything wrong.",
  choices: [
    { id: "send", label: "Send email and password — I don't want to lose my account" },
    { id: "dont", label: "This doesn't seem right — real admins don't work this way" },
    { id: "email", label: "Send just email, not password" },
  ],
};

function formatMMSS(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function Act2PhoneSimulation() {
  const phone = usePhoneStore();
  const [timerStartAt, setTimerStartAt] = useState(null);
  const [timerStopAt, setTimerStopAt] = useState(null);
  const [openAppId, setOpenAppId] = useState(null);
  const [thoughtsVisible, setThoughtsVisible] = useState(false);
  const [priya, setPriya] = useState(null);
  const [now, setNow] = useState(() => Date.now());
  const [scenarioId, setScenarioId] = useState("s1");
  const [phoneSessionKey, setPhoneSessionKey] = useState(1);
  const [notificationThreadId, setNotificationThreadId] = useState(SCENARIO1_THREAD_ID);

  const choice = phone.state.vars.act2_s1_choice ?? "";
  const responded = Boolean(choice && String(choice).length > 0);

  const remainingSeconds = useMemo(() => {
    if (!timerStartAt) return null;
    const t = timerStopAt ?? now;
    const elapsed = Math.floor((t - timerStartAt) / 1000);
    return Math.max(0, TIMER_SECONDS - elapsed);
  }, [timerStartAt, timerStopAt, now]);

  useEffect(() => {
    if (!timerStartAt) return;
    if (timerStopAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [timerStartAt, timerStopAt]);

  const startTimer = useCallback(() => {
    const startAt = Date.now();
    setTimerStartAt(startAt);
    setTimerStopAt(null);
    setNow(startAt);
  }, []);

  const resetForScenario = useCallback(
    (nextScenarioId) => {
      setScenarioId(nextScenarioId);
      phone.api.setVars({ act2_active_scenario: nextScenarioId });
      phone.api.signal("open_messages_thread", "");
      phone.api.closeChoiceGate();
      phone.api.clearNotifications();
      setNotificationThreadId(
        nextScenarioId === "s1"
          ? SCENARIO1_THREAD_ID
          : nextScenarioId === "s3"
            ? SCENARIO3_THREAD_UNKNOWN_ID
            : nextScenarioId === "s4"
              ? SCENARIO4_THREAD_ID
              : null
      );
      setOpenAppId(null);
      setThoughtsVisible(false);
      setPriya(null);
      // Reset timer when restarting / moving scenarios.
      setTimerStartAt(null);
      setTimerStopAt(null);
      // Each scenario starts from lock screen.
      setPhoneSessionKey((k) => k + 1);
    },
    [phone.api]
  );

  const startScenario1 = useCallback(() => {
    phone.api.setVars({ act2_s1_choice: "" });
    startTimer();

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
      targetAppId: "messages",
      targetId: SCENARIO1_THREAD_ID,
      options: SCENARIO1_CHOICES.map((c) => ({
        ...c,
        set: { act2_s1_choice: c.id },
      })),
    });
  }, [phone.api, startTimer]);

  const startScenario2 = useCallback(() => {
    phone.api.setVars({ act2_s2_choice: "" });
    setNotificationThreadId(null);
    phone.api.notify({
      appId: SCENARIO2.appId,
      appLabel: SCENARIO2.appLabel,
      from: SCENARIO2.from,
      body: SCENARIO2.subject,
    });
    phone.api.openChoiceGate({
      id: "act2_s2",
      prompt: "What do you do?",
      targetAppId: "mail",
      targetId: "act2_s2_school",
      options: SCENARIO2.choices.map((c) => ({
        ...c,
        set: { act2_s2_choice: c.id },
      })),
    });
  }, [phone.api]);

  const startScenario3 = useCallback(() => {
    phone.api.setVars({ act2_s3_choice: "" });
    setNotificationThreadId(SCENARIO3_THREAD_UNKNOWN_ID);

    // 1) First message (Garena automated) arrives.
    phone.api.receiveSms({
      threadId: SCENARIO3_THREAD_GARENA_ID,
      from: "Garena (Automated)",
      body: "Your Garena verification code is: 847291. Do not share this code with anyone.",
    });

    // 2) Second message (unknown number) arrives right after.
    window.setTimeout(() => {
      phone.api.receiveSms({
        threadId: SCENARIO3_THREAD_UNKNOWN_ID,
        from: "+91 87654 32109 (Unknown)",
        body:
          "Hello, I think I sent a code to your number by mistake when signing up. Could you forward it? It's urgent.",
      });
      phone.api.notify({
        appId: "messages",
        appLabel: "📱 Messages",
        from: "+91 87654 32109 (Unknown)",
        body: "Could you forward the OTP? It's urgent.",
      });
    }, 650);

    phone.api.openChoiceGate({
      id: "act2_s3",
      prompt: "What do you do?",
      targetAppId: "messages",
      targetId: SCENARIO3_THREAD_UNKNOWN_ID,
      options: [
        { id: "forward", label: "Forward the OTP", set: { act2_s3_choice: "forward" } },
        { id: "ignore", label: "Ignore both messages", set: { act2_s3_choice: "ignore" } },
      ],
    });
  }, [phone.api]);

  const startScenario4 = useCallback(() => {
    phone.api.setVars({ act2_s4_choice: "" });
    phone.api.receiveSms({
      threadId: SCENARIO4_THREAD_ID,
      from: "Kabir 🎮 (Unknown)",
      body:
        "It's Kabir. On my cousin's phone — mine ran out of charge. I sent an OTP to your number by mistake. Forward it fast — I'm in a ranked match!",
    });
    phone.api.notify({
      appId: "messages",
      appLabel: "📱 Messages",
      from: "Kabir 🎮",
      body: "Forward the OTP fast — I'm in a ranked match!",
    });
    phone.api.openChoiceGate({
      id: "act2_s4",
      prompt: "What do you do?",
      targetAppId: "messages",
      targetId: SCENARIO4_THREAD_ID,
      options: [
        {
          id: "send",
          label: "Send the OTP — it's Kabir, I trust him",
          set: { act2_s4_choice: "send" },
        },
        {
          id: "call",
          label: "Call Kabir on his actual number first",
          set: { act2_s4_choice: "call" },
        },
      ],
    });
  }, [phone.api]);

  const startScenario5 = useCallback(() => {
    phone.api.setVars({ act2_s5_choice: "" });
    setOpenAppId("mlbb");
    setNotificationThreadId(null);
    phone.api.notify({
      appId: SCENARIO5.appId,
      appLabel: SCENARIO5.appLabel,
      from: SCENARIO5.from,
      body: SCENARIO5.body,
    });
    phone.api.openChoiceGate({
      id: "act2_s5",
      prompt: "What do you do?",
      targetAppId: "mlbb",
      options: SCENARIO5.choices.map((c) => ({
        ...c,
        set: { act2_s5_choice: c.id },
      })),
    });
  }, [phone.api]);

  const onUnlocked = useCallback(() => {
    // Scenario always begins after unlocking.
    setTimerStartAt(null);
    setTimerStopAt(null);
    phone.api.closeChoiceGate();
    phone.api.clearNotifications();
    window.setTimeout(() => {
      if (scenarioId === "s1") return startScenario1();
      if (scenarioId === "s2") return startScenario2();
      if (scenarioId === "s3") return startScenario3();
      if (scenarioId === "s4") return startScenario4();
      if (scenarioId === "s5") return startScenario5();
    }, 2000);
  }, [scenarioId, startScenario1, startScenario2, startScenario3, startScenario4, startScenario5]);

  const onNotificationOpened = useCallback((n) => {
    setThoughtsVisible(true);
  }, []);

  // Stop (freeze) the timer:
  // - for ignore/forward: immediately when the option is chosen
  // - for tap: only after the user clicks "Claim" inside PhonePe
  useEffect(() => {
    if (!responded) return;
    if (choice === "tap") return;
    setTimerStopAt((v) => v ?? Date.now());
  }, [responded, choice]);

  // Timer + thought bubble should persist after opening Messages (and after taps).
  // We'll clear them explicitly later (e.g. on "Try again" / progression).

  const showSidePanel = true;

  const onPhonepeClaim = useCallback(() => {
    setTimerStopAt((v) => v ?? Date.now());
    // Login-detected should arrive inside Messages as SMS.
    phone.api.receiveSms({
      threadId: SCENARIO1_THREAD_ID,
      from: "PhonePe Security",
      body: PHONEPE_LOGIN_DETECTED_SMS,
    });
    phone.api.signal("open_messages_thread", SCENARIO1_THREAD_ID);
    setNotificationThreadId(SCENARIO1_THREAD_ID);
    setOpenAppId("messages");

    setThoughtsVisible(false);
    setPriya({
      text: "That wasn't real PhonePe. They just captured your login.",
      primary: { label: "Try again", action: "try_again" },
    });
  }, [phone.api]);

  useEffect(() => {
    if (choice !== "tap") return;
    setOpenAppId("phonepe");
  }, [choice]);

  useEffect(() => {
    if (choice !== "ignore") return;
    setThoughtsVisible(false);
    setPriya({
      text: "Nothing happened. Because it was never real.",
      primary: { label: "Next message →", action: "next_message" },
    });
  }, [choice]);

  const onPriyaAction = useCallback(
    (action) => {
      if (action === "try_again") {
        resetForScenario("s1");
      }

      if (action === "next_message") {
        resetForScenario("s2");
      }

      if (action === "try_again_s2") {
        resetForScenario("s2");
      }

      if (action === "next_message_s3") {
        resetForScenario("s3");
      }

      if (action === "try_again_s3") {
        resetForScenario("s3");
      }

      if (action === "next_message_s4") {
        resetForScenario("s4");
      }

      if (action === "try_again_s4") {
        resetForScenario("s4");
      }

      if (action === "next_message_s5") {
        resetForScenario("s5");
      }
    },
    [resetForScenario]
  );

  const s2Choice = phone.state.vars.act2_s2_choice ?? "";
  useEffect(() => {
    if (!s2Choice) return;
    if (s2Choice === "dont") {
      setTimerStopAt((v) => v ?? Date.now());
      setPriya({
        text: "If it was real, it would show up when you logged in yourself.",
        primary: { label: "Next message →", action: "next_message_s3" },
      });
      return;
    }
    // click/see
    setTimerStopAt((v) => v ?? Date.now());
    // Google security alert should show as a Messages notification + SMS thread (not the old PhonePe thread).
    phone.api.receiveSms({
      threadId: S2_GOOGLE_THREAD_ID,
      from: "Google Security",
      body: S2_GOOGLE_ALERT_SMS,
    });
    phone.api.signal("open_messages_thread", S2_GOOGLE_THREAD_ID);
    setNotificationThreadId(S2_GOOGLE_THREAD_ID);
    phone.api.notify({
      appId: "messages",
      appLabel: "📱 Messages",
      from: "Google Security",
      body: S2_GOOGLE_ALERT_SMS,
    });
    setPriya({
      text: "That wasn't your school. The domain was fake. They have your password now.",
      primary: { label: "Try again", action: "try_again_s2" },
    });
  }, [s2Choice, phone.api]);

  const s3Choice = phone.state.vars.act2_s3_choice ?? "";
  useEffect(() => {
    if (!s3Choice) return;
    if (s3Choice === "ignore") {
      setTimerStopAt((v) => v ?? Date.now());
      setPriya({
        text: "Someone tried. You didn't fall for it.",
        primary: { label: "Next message →", action: "next_message_s4" },
      });
      return;
    }
    // forward
    setTimerStopAt((v) => v ?? Date.now());
    window.setTimeout(() => {
      phone.api.notify({
        appId: "messages",
        appLabel: "🚨 Security alert",
        from: "Garena",
        body: "New login to your Garena account from unknown device",
      });
      setPriya({
        text: "That was YOUR account. They weren't signing up. They were logging in.",
        primary: { label: "Try again", action: "try_again_s3" },
      });
    }, 30000);
  }, [s3Choice, phone.api]);

  const s4Choice = phone.state.vars.act2_s4_choice ?? "";
  useEffect(() => {
    if (!s4Choice) return;
    setTimerStopAt((v) => v ?? Date.now());
    if (s4Choice === "call") {
      setPriya({
        text: "The name was real. The number wasn't.",
        primary: { label: "Next message →", action: "next_message_s5" },
      });
      return;
    }
    // send
    phone.api.notify({
      appId: "messages",
      appLabel: "🚨 Security alert",
      from: "Bank",
      body: "New login detected. Balance: 0.",
    });
    setPriya({
      text: "Someone used his name. That's all it took.",
      primary: { label: "Try again", action: "try_again_s4" },
    });
  }, [s4Choice, phone.api]);

  const s5Choice = phone.state.vars.act2_s5_choice ?? "";
  useEffect(() => {
    if (!s5Choice) return;
    setTimerStopAt((v) => v ?? Date.now());
    if (s5Choice === "dont") {
      setPriya({
        text:
          "If Krafton needed to check your account, they'd access it from their systems. They'd never need YOUR password.",
        primary: { label: "See what you just faced →", action: "end" },
      });
      return;
    }
    setPriya({
      text: "There was no ban. The urgency was the entire trick.",
      primary: { label: "Try again", action: "try_again_s5" },
    });
  }, [s5Choice]);

  const thoughtLines = useMemo(() => {
    if (scenarioId === "s1") return ACT2_S1_THOUGHTS;
    if (scenarioId === "s2") return [SCENARIO2.thought];
    if (scenarioId === "s3")
      return ["Why would their code come to my phone? But they seem genuine..."];
    if (scenarioId === "s4")
      return [
        "The name says Kabir. But the number isn't saved. And if his phone is dead... how is he messaging?",
      ];
    if (scenarioId === "s5") return [SCENARIO5.thought];
    return [];
  }, [scenarioId]);

  return (
    <div className="relative flex h-full min-h-0 w-full items-start justify-center gap-10 overflow-auto p-6">
      {/* Left column: timer */}
      <aside className="flex w-[320px] shrink-0 flex-col" style={{ minHeight: PHONE_HEIGHT_PX }}>
        {timerStartAt ? (
          <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-5 py-4">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-200/90">
              Offer expires
            </p>
            <p className="mt-1 font-mono text-4xl font-black tabular-nums tracking-tight text-white">
              {formatMMSS(remainingSeconds ?? TIMER_SECONDS)}
            </p>
          </div>
        ) : (
          <div className="h-[92px]" />
        )}
      </aside>

      {/* Center column: phone */}
      <div className="shrink-0">
        <PhoneExplorer
          key={phoneSessionKey}
          embedded
          phone={phone}
          onUnlocked={onUnlocked}
          onNotificationOpened={onNotificationOpened}
          onPhonepeClaim={onPhonepeClaim}
          openAppId={openAppId}
          scenarioThreadId={notificationThreadId}
        />
      </div>

      {/* Right column: thought + Priya */}
      <aside
        className="relative flex w-[320px] shrink-0 flex-col gap-5"
        style={{ minHeight: PHONE_HEIGHT_PX }}
      >
        {thoughtsVisible && (
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-4">
            {thoughtLines.map((thought, i) => (
              <p
                key={thought}
                className={`text-sm italic leading-relaxed text-slate-200 ${i > 0 ? "mt-3" : ""}`}
              >
                “{thought}”
              </p>
            ))}
          </div>
        )}

        {/* Spacer so Priya box can sit bottom-right without shifting layout */}
        <div className="flex-1" />

        {priya && (
          <div className="absolute bottom-0 left-0 right-0">
            <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-4">
              <div className="flex items-start gap-3">
                <img
                  src={PRIYA_AVATAR_SRC}
                  alt="Priya"
                  className="h-10 w-10 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-white/70">
                    Priya
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white">{priya.text}</p>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onPriyaAction(priya.primary.action)}
                      className="rounded-full bg-white px-5 py-2 text-xs font-extrabold text-slate-950 hover:bg-slate-100"
                    >
                      {priya.primary.label}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
