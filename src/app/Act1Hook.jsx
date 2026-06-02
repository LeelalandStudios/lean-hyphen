import { useCallback, useEffect, useRef, useState } from "react";
import PhoneShell from "../components/phone/PhoneShell.jsx";
import ScriptedChat from "../components/chat/ScriptedChat.jsx";
import {
  ACT1_CTA_LABEL,
  ACT1_INTRUSION,
  ACT1_TRANSITION_A,
  ACT1_TRANSITION_B,
} from "../content/act1Hook.js";
import { getChatDefinition } from "../content/chatRegistry.js";
import HomeScreen from "../screens/HomeScreen.jsx";

const ACT1_HOOK_CHAT = getChatDefinition("act1-hook");

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function scaledMs(ms, speed) {
  return Math.max(1, ms / speed);
}

async function scaledWait(ms, speedRef) {
  await wait(scaledMs(ms, speedRef.current));
}

function animDuration(seconds, speed) {
  return `${seconds / speed}s`;
}

import { unlockAudio, playScamNotification as playNotificationPing, playTyping as playTypingClick } from "../utils/sound.js";

function BlackIntrusion({ onComplete, speedRef }) {
  const [cardVisible, setCardVisible] = useState(false);
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;
    const { text, delayBeforeNotifyMs, charMs } = ACT1_INTRUSION;

    async function run() {
      await scaledWait(delayBeforeNotifyMs, speedRef);
      if (cancelled) return;

      playNotificationPing();
      setCardVisible(true);
      await scaledWait(450, speedRef);
      if (cancelled) return;

      for (let i = 0; i < text.length; i++) {
        if (cancelled) return;
        if (text[i] !== " ") playTypingClick();
        setTyped(text.slice(0, i + 1));
        await scaledWait(charMs, speedRef);
      }

      if (cancelled) return;
      setTypingDone(true);
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [speedRef]);

  const speed = speedRef.current;

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {cardVisible && (
        <div
          className="absolute inset-x-0 bottom-[14%] flex justify-center px-6"
          style={{ animation: `slideUp ${animDuration(0.5, speed)} ease-out both` }}
        >
          <button
            type="button"
            disabled={!typingDone}
            onClick={() => typingDone && onCompleteRef.current()}
            className={`w-full max-w-md overflow-hidden rounded-2xl border bg-[#0a0a0a] text-left transition ${typingDone
                ? "cursor-pointer border-red-500/45 shadow-[0_0_20px_rgba(239,68,68,0.08)] hover:border-red-500/60 active:scale-[0.99]"
                : "cursor-default border-red-500/35"
              }`}
          >
            <div className="flex gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5f259f] text-xs font-bold text-white">
                Pe
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-white/95">
                    {ACT1_INTRUSION.from}
                  </p>
                  <span className="shrink-0 text-[10px] text-white/40">now</span>
                </div>
                <p className="mt-0.5 text-[10px] text-white/25">{ACT1_INTRUSION.subtitle}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/90">
                  {typed}
                  {!typingDone && (
                    <span className="ml-px inline-block h-[1em] w-0.5 animate-pulse bg-white/70 align-middle" />
                  )}
                </p>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

function BlackOpening({ onContinue, speedRef }) {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    void unlockAudio().then(() => setStarted(true));
  };

  if (started) {
    return <BlackIntrusion onComplete={onContinue} speedRef={speedRef} />;
  }

  return (
    <button
      type="button"
      onClick={handleStart}
      className="flex h-full w-full flex-col items-center justify-center bg-black text-white"
    >
      <p className="animate-pulse text-xs text-white/40">Tap to continue</p>
    </button>
  );
}

function Act1FastForward({ speed, onSingleClick, onDoubleClick, onResetSpeed }) {
  const clickTimerRef = useRef(null);
  const clickCountRef = useRef(0);
  const longPressTimerRef = useRef(null);
  const longPressTriggeredRef = useRef(false);

  const clearLongPress = useCallback(() => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const startLongPress = useCallback(() => {
    longPressTriggeredRef.current = false;
    clearLongPress();
    longPressTimerRef.current = window.setTimeout(() => {
      longPressTriggeredRef.current = true;
      clickCountRef.current = 0;
      if (clickTimerRef.current) {
        window.clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
      }
      onResetSpeed();
    }, 600);
  }, [clearLongPress, onResetSpeed]);

  const handleClick = () => {
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      return;
    }

    clickCountRef.current += 1;
    if (clickTimerRef.current) window.clearTimeout(clickTimerRef.current);
    clickTimerRef.current = window.setTimeout(() => {
      if (clickCountRef.current === 1) onSingleClick();
      else if (clickCountRef.current >= 2) onDoubleClick();
      clickCountRef.current = 0;
      clickTimerRef.current = null;
    }, 280);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={startLongPress}
      onMouseUp={clearLongPress}
      onMouseLeave={clearLongPress}
      onTouchStart={startLongPress}
      onTouchEnd={clearLongPress}
      onTouchCancel={clearLongPress}
      className="absolute right-3 top-3 z-[100] rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/70 backdrop-blur hover:bg-black/80 hover:text-white"
      title={speed > 1 ? "Hold to reset speed" : undefined}
    >
      {speed > 1 ? `${speed}× speed` : "Fast forward ▶▶"}
    </button>
  );
}

const PHONE_FRAME_W = 380;
const PHONE_FRAME_H = 760;

function computeHookPhoneLayout(areaWidth, areaHeight) {
  const buttonReserve = 52;
  const gap = 12;
  const availableH = Math.max(220, areaHeight - buttonReserve - gap);
  const availableW = Math.max(200, areaWidth);

  let scale = Math.min(availableW / PHONE_FRAME_W, 0.92);
  scale = Math.max(0.5, scale);

  let scaledH = PHONE_FRAME_H * scale;
  const minClipH = scaledH * 0.5;

  if (availableH < minClipH) {
    scale = availableH / (PHONE_FRAME_H * 0.5);
    scale = Math.max(0.5, Math.min(scale, 0.92));
    scaledH = PHONE_FRAME_H * scale;
  }

  const clipH = Math.min(scaledH, Math.max(minClipH, availableH));

  return {
    scale,
    clipHeight: clipH,
    phoneWidth: PHONE_FRAME_W * scale,
    isFullPhone: clipH >= scaledH - 1,
  };
}

function HookPhase({ onComplete, speed }) {
  const stageRef = useRef(null);
  const [phoneLayout, setPhoneLayout] = useState(() => computeHookPhoneLayout(360, 420));

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const update = () => {
      setPhoneLayout(computeHookPhoneLayout(el.clientWidth, el.clientHeight));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col bg-black px-4 py-4">
      <p
        className="mb-4 w-full max-w-lg shrink-0 self-center text-center text-base leading-relaxed text-white/90 italic sm:text-lg"
        style={{ animation: `fadeIn ${animDuration(0.8, speed)} ease-out both` }}
      >
        {ACT1_TRANSITION_B}
      </p>

      <div
        ref={stageRef}
        className="flex min-h-0 w-full flex-1 flex-col items-center justify-end gap-3 pb-2"
      >
        <div
          className="relative shrink-0 overflow-hidden"
          style={{
            width: phoneLayout.phoneWidth,
            height: phoneLayout.clipHeight,
            animation: `slideUp ${animDuration(0.9, speed)} ease-out both`,
          }}
        >
          <div
            style={{
              width: PHONE_FRAME_W,
              height: PHONE_FRAME_H,
              transform: `scale(${phoneLayout.scale})`,
              transformOrigin: "top left",
            }}
          >
            <PhoneShell>
              <HomeScreen
                variant="default"
                badge
                badgeApp="messages"
                badgeCount={5}
                badgePulse
                notification={{
                  app: "📱 Messages",
                  from: "Unknown",
                  body: "5 new messages waiting…",
                }}
              />
            </PhoneShell>
          </div>

          {!phoneLayout.isFullPhone && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent" />
          )}
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="w-[min(50%,220px)] shrink-0 whitespace-nowrap rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-extrabold text-slate-950 shadow-[0_8px_24px_rgba(16,185,129,0.35)] ring-1 ring-white/20 transition hover:bg-emerald-400"
          style={{
            animation: `fadeIn ${animDuration(1, speed)} ease-out ${animDuration(0.5, speed)} both`,
          }}
        >
          {ACT1_CTA_LABEL}
        </button>
      </div>
    </div>
  );
}

/**
 * @param {{ onComplete?: () => void, focusPhaseId?: string | null, onFocusPhaseChange?: (id: string) => void }} props
 */
export default function Act1Hook({ onComplete, focusPhaseId, onFocusPhaseChange }) {
  const [phase, setPhase] = useState(() => {
    if (focusPhaseId === "chat") return "chat";
    if (focusPhaseId === "quote" || focusPhaseId === "waiting") return "transition";
    return "black";
  });
  const [chatFading, setChatFading] = useState(false);
  const [transitionStep, setTransitionStep] = useState(() => {
    if (focusPhaseId === "waiting") return 1;
    return 0;
  });
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const speedRef = useRef(1);
  const chatRef = useRef(/** @type {import("../components/chat/ScriptedChat.jsx").default|null} */ (null));
  const mountedRef = useRef(true);

  speedRef.current = speedMultiplier;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!focusPhaseId) return;
    if (focusPhaseId === "intrusion") {
      setPhase("black");
      setTransitionStep(0);
    } else if (focusPhaseId === "chat") {
      setPhase("chat");
      setTransitionStep(0);
    } else if (focusPhaseId === "quote") {
      setPhase("transition");
      setTransitionStep(0);
    } else if (focusPhaseId === "waiting") {
      setPhase("transition");
      setTransitionStep(1);
    }
  }, [focusPhaseId]);

  const bumpSpeed = useCallback(() => {
    setSpeedMultiplier((m) => m * 2);
  }, []);

  const resetSpeed = useCallback(() => {
    setSpeedMultiplier(1);
  }, []);

  const beginTransition = useCallback(() => {
    setTransitionStep(0);
    setPhase("transition");
    onFocusPhaseChange?.("quote");
  }, [onFocusPhaseChange]);

  const handleChatComplete = useCallback(() => {
    setChatFading(true);
    window.setTimeout(() => {
      if (mountedRef.current) beginTransition();
    }, scaledMs(700, speedRef.current));
  }, [beginTransition]);

  const skipToChatEnd = useCallback(() => {
    chatRef.current?.skipToEnd({ invokeComplete: false });
    setChatFading(false);
    beginTransition();
  }, [beginTransition]);

  let body;

  if (phase === "black") {
    body = (
      <BlackOpening
        onContinue={() => {
          setPhase("chat");
          onFocusPhaseChange?.("chat");
        }}
        speedRef={speedRef}
      />
    );
  } else if (phase === "transition") {
    if (transitionStep === 0) {
      body = (
        <button
          type="button"
          onClick={() => {
            setTransitionStep(1);
            onFocusPhaseChange?.("waiting");
          }}
          className="flex h-full w-full items-center justify-center bg-black px-8 text-center"
        >
          <p
            className="max-w-xl text-xl leading-relaxed text-white/90 italic"
            style={{ animation: `fadeIn ${animDuration(0.6, speedMultiplier)} ease-out both` }}
          >
            {ACT1_TRANSITION_A}
          </p>
        </button>
      );
    } else {
      body = <HookPhase onComplete={() => onComplete?.()} speed={speedMultiplier} />;
    }
  } else {
    body = (
      <div className="relative mx-auto h-full max-w-lg">
        <ScriptedChat
          ref={chatRef}
          definition={ACT1_HOOK_CHAT}
          onComplete={handleChatComplete}
          speedRef={speedRef}
          speedMultiplier={speedMultiplier}
          showFastForward={false}
          fading={chatFading}
          fadeDurationMs={scaledMs(700, speedMultiplier)}
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {body}
      <Act1FastForward
        speed={speedMultiplier}
        onSingleClick={bumpSpeed}
        onDoubleClick={phase === "chat" ? skipToChatEnd : () => {}}
        onResetSpeed={resetSpeed}
      />
    </div>
  );
}
