import { useCallback, useEffect, useRef, useState } from "react";
import PhoneShell from "../components/phone/PhoneShell.jsx";
import WhatsAppShell from "../components/whatsapp/WhatsAppShell.jsx";
import WhatsAppTypingBubble from "../components/whatsapp/WhatsAppTypingBubble.jsx";
import {
  ACT1_CTA_LABEL,
  ACT1_HOOK_BEATS,
  ACT1_HOOK_GROUP,
  ACT1_INTRUSION,
  ACT1_SENDER_COLORS,
  ACT1_TRANSITION_A,
  ACT1_TRANSITION_B,
} from "../content/act1Hook.js";
import HomeScreen from "../screens/HomeScreen.jsx";

const SCROLL_BOTTOM_THRESHOLD = 48;

function isAtBottom(el) {
  return el.scrollHeight - el.scrollTop - el.clientHeight <= SCROLL_BOTTOM_THRESHOLD;
}

function pauseAfterMessage(text, overrideMs) {
  if (overrideMs != null) return overrideMs;
  const len = text.length;
  // Base gap + ~45ms per character so longer lines get time to read
  const byReading = 900 + len * 45;
  if (len < 24) return Math.max(1400, byReading);
  if (len < 70) return Math.max(2200, byReading);
  if (len < 140) return Math.max(3500, byReading);
  return Math.max(5000, byReading);
}

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

let sharedAudioContext = null;

async function unlockAudio() {
  if (typeof window === "undefined") return null;
  try {
    if (!sharedAudioContext) {
      sharedAudioContext = new AudioContext();
    }
    if (sharedAudioContext.state === "suspended") {
      await sharedAudioContext.resume();
    }
    return sharedAudioContext;
  } catch {
    return null;
  }
}

function playNotificationPing() {
  const ctx = sharedAudioContext;
  if (!ctx || ctx.state !== "running") return;

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(920, t);
    osc.frequency.exponentialRampToValueAtTime(640, t + 0.08);
    osc.frequency.exponentialRampToValueAtTime(480, t + 0.22);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.22, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.46);
  } catch {
    // Audio unavailable.
  }
}

function playTypingClick() {
  const ctx = sharedAudioContext;
  if (!ctx || ctx.state !== "running") return;

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(1100 + Math.random() * 500, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.055, t + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.022);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.024);
  } catch {
    // Audio unavailable.
  }
}

function MessageBubble({ msg, receipts }) {
  const color = ACT1_SENDER_COLORS[msg.sender] ?? "#e542a3";
  return (
    <div className="flex justify-start">
      <div className="max-w-[88%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
        <p className="mb-0.5 text-xs font-semibold" style={{ color }}>
          {msg.sender}
        </p>
        <p className="whitespace-pre-wrap text-sm leading-snug text-[#111b21]">{msg.text}</p>
        <div className="mt-1 flex items-center justify-end gap-1">
          <span className="text-[10px] text-[#667781]">{msg.time}</span>
          {receipts && (
            <span className="animate-pulse text-[10px] text-[#53bdeb]">✓✓</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatInputBar() {
  return (
    <div className="flex shrink-0 items-center gap-2 border-t border-[#e9edef] bg-[#f0f2f5] px-3 py-2">
      <span className="text-xl text-[#54656f]">😊</span>
      <div className="flex-1 rounded-full bg-white px-4 py-2 text-sm text-[#667781]">
        Message
      </div>
      <span className="text-xl text-[#54656f]">🎤</span>
    </div>
  );
}

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
 * @param {{ onComplete?: () => void }} props
 */
export default function Act1Hook({ onComplete }) {
  const [phase, setPhase] = useState("black");
  const [beatIndex, setBeatIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [receiptMessageId, setReceiptMessageId] = useState(null);
  const [receiptsVisible, setReceiptsVisible] = useState(false);
  const [scrollPaused, setScrollPaused] = useState(false);
  const [chatFading, setChatFading] = useState(false);
  const [transitionStep, setTransitionStep] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const scrollRef = useRef(null);
  const messagesRef = useRef(messages);
  const beatRunning = useRef(false);
  const mountedRef = useRef(true);
  const scrollPausedRef = useRef(false);
  const programmaticScrollRef = useRef(false);
  const lastAutoScrollTopRef = useRef(0);
  const skipRef = useRef(false);
  const speedRef = useRef(1);

  speedRef.current = speedMultiplier;

  messagesRef.current = messages;
  scrollPausedRef.current = scrollPaused;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const scrollToBottom = useCallback((force = false) => {
    if (!force && scrollPausedRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    programmaticScrollRef.current = true;
    el.scrollTop = el.scrollHeight;
    lastAutoScrollTopRef.current = el.scrollTop;
    requestAnimationFrame(() => {
      programmaticScrollRef.current = false;
    });
  }, []);

  const pauseFollowing = useCallback(() => {
    if (scrollPausedRef.current) return;
    scrollPausedRef.current = true;
    setScrollPaused(true);
    programmaticScrollRef.current = false;
  }, []);

  const setFollowing = useCallback(
    (following) => {
      scrollPausedRef.current = !following;
      setScrollPaused(!following);
      if (following) scrollToBottom(true);
    },
    [scrollToBottom]
  );

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Detect manual scroll-up even while auto-scroll is running (e.g. during typing).
    if (el.scrollTop < lastAutoScrollTopRef.current - 8) {
      pauseFollowing();
      return;
    }

    if (programmaticScrollRef.current) return;

    if (isAtBottom(el)) {
      if (scrollPausedRef.current) setFollowing(true);
    } else if (!scrollPausedRef.current) {
      pauseFollowing();
    }
  }, [setFollowing, pauseFollowing]);

  const resumeFollowing = useCallback(() => {
    setFollowing(true);
  }, [setFollowing]);

  useEffect(() => {
    if (phase !== "chat") return;
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY < 0) pauseFollowing();
    };

    let touchY = 0;
    const onTouchStart = (e) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      const y = e.touches[0]?.clientY ?? touchY;
      if (y > touchY + 8) pauseFollowing();
      touchY = y;
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [phase, pauseFollowing]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  const waitUntilFollowing = useCallback(async () => {
    while (scrollPausedRef.current && mountedRef.current && !skipRef.current) {
      await scaledWait(80, speedRef);
    }
  }, []);

  const bumpSpeed = useCallback(() => {
    setSpeedMultiplier((m) => m * 2);
  }, []);

  const resetSpeed = useCallback(() => {
    setSpeedMultiplier(1);
  }, []);

  const skipToChatEnd = useCallback(() => {
    skipRef.current = true;
    beatRunning.current = false;
    scrollPausedRef.current = false;
    setTyping(false);
    setScrollPaused(false);
    setChatFading(false);

    const allMessages = ACT1_HOOK_BEATS.flatMap((beat, index) =>
      beat.type === "message"
        ? [
          {
            id: `msg-${index}`,
            sender: beat.sender,
            text: beat.text,
            time: ACT1_HOOK_GROUP.time,
          },
        ]
        : []
    );

    const gone = allMessages.find((m) => m.text === "it's gone");
    setReceiptMessageId(gone?.id ?? null);
    setReceiptsVisible(Boolean(gone));
    setMessages(allMessages);
    setBeatIndex(ACT1_HOOK_BEATS.length);
    setPhase("transition");
    setTransitionStep(0);

    window.setTimeout(() => {
      skipRef.current = false;
    }, 0);
  }, []);

  const runBeat = useCallback(async (index) => {
    if (beatRunning.current || skipRef.current) return;
    await waitUntilFollowing();
    if (!mountedRef.current || skipRef.current) return;

    const beat = ACT1_HOOK_BEATS[index];
    if (!beat) {
      setChatFading(true);
      window.setTimeout(() => {
        if (mountedRef.current && !skipRef.current) setPhase("transition");
      }, scaledMs(700, speedRef.current));
      return;
    }

    beatRunning.current = true;

    if (beat.type === "typing" || beat.type === "pause") {
      setTyping(true);
      await scaledWait(beat.ms ?? 1000, speedRef);
      if (!mountedRef.current || skipRef.current) return;
      setTyping(false);
      await waitUntilFollowing();
      if (!mountedRef.current || skipRef.current) return;
      beatRunning.current = false;
      setBeatIndex(index + 1);
      return;
    }

    if (beat.type === "readReceipts") {
      const gone = messagesRef.current.find((m) => m.text === "it's gone");
      if (gone) {
        setReceiptMessageId(gone.id);
        await scaledWait(450, speedRef);
        if (!mountedRef.current || skipRef.current) return;
        setReceiptsVisible(true);
        await scaledWait(2000, speedRef);
      }
      if (!mountedRef.current || skipRef.current) return;
      await waitUntilFollowing();
      if (!mountedRef.current || skipRef.current) return;
      beatRunning.current = false;
      setBeatIndex(index + 1);
      return;
    }

    if (beat.type === "message") {
      const id = `msg-${index}`;
      setMessages((prev) => [
        ...prev,
        {
          id,
          sender: beat.sender,
          text: beat.text,
          time: ACT1_HOOK_GROUP.time,
        },
      ]);

      await scaledWait(pauseAfterMessage(beat.text, beat.pauseAfterMs), speedRef);
      if (!mountedRef.current || skipRef.current) return;
      await waitUntilFollowing();
      if (!mountedRef.current || skipRef.current) return;
      beatRunning.current = false;
      setBeatIndex(index + 1);
    }
  }, [waitUntilFollowing]);

  useEffect(() => {
    if (phase !== "chat" || beatRunning.current || skipRef.current) return;
    void runBeat(beatIndex);
  }, [phase, beatIndex, runBeat]);

  let body;

  if (phase === "black") {
    body = <BlackOpening onContinue={() => setPhase("chat")} speedRef={speedRef} />;
  } else if (phase === "transition") {
    if (transitionStep === 0) {
      body = (
        <button
          type="button"
          onClick={() => setTransitionStep(1)}
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
      <div
        className="relative mx-auto h-full max-w-lg transition-opacity"
        style={{
          opacity: chatFading ? 0 : 1,
          transitionDuration: animDuration(0.7, speedMultiplier),
        }}
      >
        <WhatsAppShell
          title={ACT1_HOOK_GROUP.title}
          subtitle={`${ACT1_HOOK_GROUP.memberCount} members · ${ACT1_HOOK_GROUP.time}`}
          bodyRef={scrollRef}
          onBodyScroll={handleScroll}
          footer={<ChatInputBar />}
        >
          <div
            className="space-y-2 px-2 py-3"
            style={{
              backgroundColor: "#e5ddd5",
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.04) 0%, transparent 40%)",
            }}
          >
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                receipts={msg.id === receiptMessageId && receiptsVisible}
              />
            ))}

            {typing && <WhatsAppTypingBubble speed={speedMultiplier} />}
          </div>
        </WhatsAppShell>

        {scrollPaused && (
          <button
            type="button"
            onClick={resumeFollowing}
            className="absolute inset-x-0 bottom-16 z-10 flex justify-center"
          >
            <span className="rounded-full bg-black/70 px-4 py-1.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur">
              Tap to continue
            </span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {body}
      <Act1FastForward
        speed={speedMultiplier}
        onSingleClick={bumpSpeed}
        onDoubleClick={skipToChatEnd}
        onResetSpeed={resetSpeed}
      />
    </div>
  );
}
