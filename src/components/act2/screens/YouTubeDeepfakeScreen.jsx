import { useEffect, useState } from "react";
import StatusBar from "../../phone/StatusBar.jsx";
import {
  startLivestreamPromoLoop,
  stopLivestreamPromoLoop,
  unlockAudio,
} from "../../../utils/sound.js";

const PORTRAIT_SRC = "/act2/deepfake-livestream-portrait.jpg";

/** YouTube-style deepfake giveaway — convincing fake livestream layout. */
export default function YouTubeDeepfakeScreen() {
  const [speakingPulse, setSpeakingPulse] = useState(true);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let retryId = 0;

    const tryStartAudio = () => {
      void unlockAudio().then((ctx) => {
        if (cancelled) return;
        if (ctx?.state === "running") {
          startLivestreamPromoLoop();
          setAudioActive(true);
          return;
        }
        retryId = window.setTimeout(tryStartAudio, 450);
      });
    };

    tryStartAudio();
    const pulseId = window.setInterval(() => setSpeakingPulse((p) => !p), 900);

    return () => {
      cancelled = true;
      window.clearTimeout(retryId);
      window.clearInterval(pulseId);
      stopLivestreamPromoLoop();
    };
  }, []);

  return (
    <div className="relative flex h-full flex-col bg-[#0f0f0f] pt-12 text-white">
      <StatusBar />
      <header className="flex shrink-0 items-center gap-2 border-b border-white/10 px-3 pb-2">
        <span className="text-lg font-bold text-red-500">▶</span>
        <span className="text-sm font-semibold">YouTube</span>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="overflow-hidden rounded-xl bg-[#212121]">
          <div className="relative aspect-video overflow-hidden bg-black">
            <img
              src={PORTRAIT_SRC}
              alt="Live presenter on stream"
              className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-2 pt-12">
              <div className="relative">
                <div className="mx-auto h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full border-2 border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.15)] ring-2 ring-red-500/40">
                  <img
                    src={PORTRAIT_SRC}
                    alt=""
                    aria-hidden
                    className="h-full w-full object-cover object-[center_18%] scale-125"
                  />
                </div>
                {speakingPulse && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide">
                    Speaking
                  </span>
                )}
              </div>
            </div>
            <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              Live
            </span>
            <div
              className={`absolute right-2 top-2 flex items-center gap-1 rounded px-2 py-1 text-[9px] ${
                audioActive
                  ? "bg-red-600/90 text-white"
                  : "bg-black/50 text-white/70"
              }`}
            >
              <span aria-hidden>{audioActive ? "🔊" : "🔇"}</span>
              <span className={speakingPulse && audioActive ? "opacity-100" : "opacity-80"}>
                {audioActive ? "Live audio on" : "Tap phone to hear stream"}
              </span>
            </div>
            <div className="absolute inset-x-3 bottom-12 rounded bg-black/60 px-2 py-1.5 text-center text-[10px] leading-snug text-white/95 backdrop-blur-sm">
              &ldquo;Register your UPI now — first 100 fans get ₹10,000 instantly!&rdquo;
            </div>
          </div>

          <div className="p-3">
            <h1 className="text-sm font-bold leading-snug">
              Giving away ₹10,000 to 100 fans RIGHT NOW — limited time only!
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/25">
                <img
                  src={PORTRAIT_SRC}
                  alt=""
                  className="h-full w-full object-cover object-[center_18%]"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">Virat Kohli Official</p>
                <p className="text-[10px] text-white/50">200 subscribers · 3 videos</p>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-white/70">
              To celebrate 100M subscribers, I&apos;m giving back to my fans. Click the
              link, register with your UPI ID, and receive ₹10,000 directly. First 100
              fans only.
            </p>
            <p className="mt-2 break-all text-[11px] font-semibold text-blue-400">
              → virat-kohli-giveaway.in/claim
            </p>
            <p className="mt-1 text-[11px] font-bold text-amber-400">
              ⏰ 87 spots left
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
