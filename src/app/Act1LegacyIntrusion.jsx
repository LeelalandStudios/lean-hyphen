import { useEffect, useRef, useState } from "react";
import {
  playScamNotification as playNotificationPing,
  unlockAudio,
} from "../utils/sound.js";

const LEGACY_INTRUSION = {
  from: "PhonePe Risk & Verification",
  subtitle: "Unknown sender",
  text:
    "Security review initiated on your linked bank account. ₹3,000 cashback settlement is pending due to incomplete verification. Complete before 11:59 PM to avoid UPI restriction.",
  delayBeforeNotifyMs: 1100,
  charMs: 24,
};

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function LegacyIntrusionCard({ runKey, onComplete }) {
  const [cardVisible, setCardVisible] = useState(false);
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;
    let typingAudio = null;
    let typingSource = null;
    let typingGain = null;
    const { text, delayBeforeNotifyMs, charMs } = LEGACY_INTRUSION;

    async function run() {
      setCardVisible(false);
      setTyped("");
      setTypingDone(false);

      await wait(delayBeforeNotifyMs);
      if (cancelled) return;

      const ctx = await unlockAudio();
      if (cancelled) return;

      playNotificationPing();
      setCardVisible(true);
      await wait(450);
      if (cancelled) return;

      typingAudio = new Audio("/sfx/act1-typewriter.mp3");
      typingAudio.loop = true;
      typingAudio.volume = 1;
      typingAudio.playbackRate = 0.96;
      if (ctx && ctx.state === "running") {
        typingSource = ctx.createMediaElementSource(typingAudio);
        typingGain = ctx.createGain();
        typingGain.gain.value = 4.2;
        typingSource.connect(typingGain);
        typingGain.connect(ctx.destination);
      }
      void typingAudio.play().catch(() => {});

      for (let i = 0; i < text.length; i += 1) {
        if (cancelled) return;
        setTyped(text.slice(0, i + 1));
        
        const progress = i / Math.max(1, text.length - 1);
        if (typingAudio) {
          typingAudio.playbackRate = 0.96 + progress * 0.1;
        }
        if (typingGain) {
          typingGain.gain.value = 4.2 + progress * 0.8;
        }

        await wait(charMs);
      }

      if (typingAudio) {
        typingAudio.pause();
        typingAudio.currentTime = 0;
      }
      if (cancelled) return;
      setTypingDone(true);
    }

    void run();
    return () => {
      cancelled = true;
      if (typingAudio) {
        typingAudio.pause();
        typingAudio.currentTime = 0;
      }
      typingSource?.disconnect();
      typingGain?.disconnect();
    };
  }, [runKey]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {cardVisible && (
        <div
          className="absolute inset-x-0 bottom-[14%] flex justify-center px-6"
          style={{ animation: "slideUp 0.5s ease-out both" }}
        >
          <button
            type="button"
            disabled={!typingDone}
            onClick={() => typingDone && onCompleteRef.current?.()}
            className={`w-full max-w-md overflow-hidden rounded-2xl border bg-[#0a0a0a] text-left transition ${
              typingDone
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
                    {LEGACY_INTRUSION.from}
                  </p>
                  <span className="shrink-0 text-[10px] text-white/40">now</span>
                </div>
                <p className="mt-0.5 text-[10px] text-white/25">
                  {LEGACY_INTRUSION.subtitle}
                </p>
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

export default function Act1LegacyIntrusion() {
  const [started, setStarted] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [complete, setComplete] = useState(false);

  const start = () => {
    setComplete(false);
    setRunKey((key) => key + 1);
    void unlockAudio().then(() => setStarted(true));
  };

  if (!started) {
    return (
      <button
        type="button"
        onClick={start}
        className="flex h-full w-full flex-col items-center justify-center bg-black text-white"
      >
        <p className="animate-pulse text-xs text-white/40">Tap to play legacy intrusion</p>
      </button>
    );
  }

  return (
    <div className="relative h-full w-full">
      <LegacyIntrusionCard runKey={runKey} onComplete={() => setComplete(true)} />
      {complete && (
        <button
          type="button"
          onClick={start}
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur transition hover:bg-white/15 hover:text-white"
        >
          Replay legacy intrusion
        </button>
      )}
    </div>
  );
}
