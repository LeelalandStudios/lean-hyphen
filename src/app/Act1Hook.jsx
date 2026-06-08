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
import { playVoiceoverForText, stopVoiceover } from "../utils/voiceover.js";

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

import { unlockAudio } from "../utils/sound.js";

function BlackIntrusion({ onComplete, speedRef }) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const { maxSpreadRatio } = ACT1_INTRUSION;

  useEffect(() => {
    let cancelled = false;
    let frameId = null;
    let completionTimerId = null;
    let intrusionAudio = null;
    let intrusionSource = null;
    let intrusionGain = null;
    const {
      delayBeforeStartMs,
      durationMs,
      holdAfterMs,
      maxSpreadRatio,
    } = ACT1_INTRUSION;

    async function run() {
      await scaledWait(delayBeforeStartMs, speedRef);
      if (cancelled) return;

      const ctx = await unlockAudio();
      if (cancelled) return;

      intrusionAudio = new Audio("/sfx/act1-typewriter.mp3");
      intrusionAudio.loop = true;
      intrusionAudio.volume = 1;
      intrusionAudio.playbackRate = 0.96;
      if (ctx && ctx.state === "running") {
        intrusionSource = ctx.createMediaElementSource(intrusionAudio);
        intrusionGain = ctx.createGain();
        intrusionGain.gain.value = 4.2;
        intrusionSource.connect(intrusionGain);
        intrusionGain.connect(ctx.destination);
      }
      void intrusionAudio.play().catch(() => {});

      let phaseElapsed = 0;
      let lastTime = null;

      const step = (now) => {
        if (cancelled) return;
        if (lastTime == null) {
          lastTime = now;
        }

        const realDelta = now - lastTime;
        lastTime = now;
        const delta = realDelta * speedRef.current;
        phaseElapsed += delta;

        const nextProgress = Math.min(1, phaseElapsed / durationMs);
        setProgress(nextProgress);

        if (intrusionAudio) {
          intrusionAudio.playbackRate = 0.96 + nextProgress * 0.1;
        }
        if (intrusionGain) {
          intrusionGain.gain.value = 4.2 + nextProgress * 0.8;
        }

        if (nextProgress >= 1) {
          completionTimerId = window.setTimeout(() => {
            if (!cancelled) onCompleteRef.current();
          }, scaledMs(holdAfterMs, speedRef.current));
          return;
        }

        frameId = window.requestAnimationFrame(step);
      };

      frameId = window.requestAnimationFrame(step);
    }

    void run();
    return () => {
      cancelled = true;
      if (frameId) window.cancelAnimationFrame(frameId);
      if (completionTimerId) window.clearTimeout(completionTimerId);
      if (intrusionAudio) {
        intrusionAudio.pause();
        intrusionAudio.currentTime = 0;
      }
      intrusionSource?.disconnect();
      intrusionGain?.disconnect();
    };
  }, [speedRef]);

  const easedProgress = Math.pow(progress, 1.9);
  const spread = easedProgress * maxSpreadRatio;
  const edgeY = spread * 100;
  const edgeX = spread * 100;
  const smokeOpacity = 0.12 + easedProgress * 0.34;
  const glowOpacity = 0.05 + easedProgress * 0.16;
  const blurPx = 24 + easedProgress * 38;
  const drift = 6 + easedProgress * 10;

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div
        className="absolute left-0 right-0 top-0"
        style={{
          height: `${edgeY}%`,
          opacity: smokeOpacity,
          filter: `blur(${blurPx}px)`,
          background: `linear-gradient(180deg, rgba(170,10,18,0.95) 0%, rgba(120,0,8,0.55) 42%, rgba(60,0,0,0.08) 100%)`,
          transform: `translateY(${-drift * (1 - progress)}px)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: `${edgeY}%`,
          opacity: smokeOpacity,
          filter: `blur(${blurPx}px)`,
          background: `linear-gradient(0deg, rgba(170,10,18,0.95) 0%, rgba(120,0,8,0.55) 42%, rgba(60,0,0,0.08) 100%)`,
          transform: `translateY(${drift * (1 - progress)}px)`,
        }}
      />
      <div
        className="absolute left-0"
        style={{
          top: `${Math.max(0, edgeY * 0.4)}%`,
          bottom: `${Math.max(0, edgeY * 0.4)}%`,
          width: `${edgeX}%`,
          opacity: smokeOpacity,
          filter: `blur(${blurPx}px)`,
          background: `linear-gradient(90deg, rgba(170,10,18,0.92) 0%, rgba(120,0,8,0.52) 42%, rgba(60,0,0,0.08) 100%)`,
          transform: `translateX(${-drift * (1 - progress)}px)`,
        }}
      />
      <div
        className="absolute right-0"
        style={{
          top: `${Math.max(0, edgeY * 0.4)}%`,
          bottom: `${Math.max(0, edgeY * 0.4)}%`,
          width: `${edgeX}%`,
          opacity: smokeOpacity,
          filter: `blur(${blurPx}px)`,
          background: `linear-gradient(270deg, rgba(170,10,18,0.92) 0%, rgba(120,0,8,0.52) 42%, rgba(60,0,0,0.08) 100%)`,
          transform: `translateX(${drift * (1 - progress)}px)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, rgba(0,0,0,0) 42%, rgba(120,0,0,${glowOpacity}) 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0) 20%),
            repeating-linear-gradient(
              180deg,
              rgba(255,255,255,0.012) 0px,
              rgba(255,255,255,0.012) 2px,
              rgba(0,0,0,0.01) 3px,
              rgba(0,0,0,0.01) 5px
            )
          `,
          opacity: 0.28 + easedProgress * 0.14,
          mixBlendMode: "screen",
        }}
      />
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
      className="flex h-full w-full flex-col items-center justify-center bg-transparent text-white"
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
    playVoiceoverForText(ACT1_TRANSITION_B);
    return () => {
      stopVoiceover();
    };
  }, []);

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
    <div className="flex h-full min-h-0 flex-col bg-transparent px-4 py-4">
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

  // Voiceover playback for ACT1_TRANSITION_A
  useEffect(() => {
    if (phase === "transition" && transitionStep === 0) {
      playVoiceoverForText(ACT1_TRANSITION_A);
    }
    return () => {
      stopVoiceover();
    };
  }, [phase, transitionStep]);

  useEffect(() => {
    if (!focusPhaseId) return;
    if (focusPhaseId === "intrusion") {
      setChatFading(false);
      setPhase("black");
      setTransitionStep(0);
    } else if (focusPhaseId === "chat") {
      setChatFading(false);
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
          className="flex h-full w-full items-center justify-center bg-transparent px-8 text-center"
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
    </div>
  );
}
