import { useEffect, useState } from "react";
import StatusBar from "../../phone/StatusBar.jsx";
import { triggerAct2Choice } from "../../../content/act2ChoiceTrigger.js";
import {
  startLivestreamPromoLoop,
  stopLivestreamPromoLoop,
  unlockAudio,
} from "../../../utils/sound.js";

const PORTRAIT_SRC = "/act2/deepfake-livestream-portrait.jpg";

/** YouTube-style deepfake giveaway — convincing fake livestream layout. */
export default function YouTubeDeepfakeScreen({ phone }) {
  const triggerClick = () => phone && triggerAct2Choice(phone, "click");
  const activeViewVar = phone?.state?.vars?.act2_youtube_view;
  const [localView, setLocalView] = useState("video");
  const view = activeViewVar || localView;

  const setView = (newView) => {
    setLocalView(newView);
    if (phone) {
      phone.api.setVars({ act2_youtube_view: newView });
    }
  };

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

  if (view === "channel") {
    return (
      <div className="relative flex h-full flex-col bg-[#0f0f0f] pt-12 text-white">
        <StatusBar />
        <header className="flex shrink-0 items-center gap-4 border-b border-white/10 px-3 pb-3">
          <button
            type="button"
            onClick={() => setView("video")}
            className="text-lg font-bold hover:text-slate-300 px-1"
          >
            ←
          </button>
          <span className="text-sm font-semibold">Virat Kohli Official</span>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-white/20">
              <img
                src={PORTRAIT_SRC}
                alt="Channel avatar"
                className="h-full w-full object-cover object-[center_18%]"
              />
            </div>
            <h1 className="mt-3 text-base font-bold">Virat Kohli Official</h1>
            <p className="text-xs text-white/60">@viratkohli_official_giveaways</p>
            <p className="mt-1 text-xs text-white/50">200 subscribers · 3 videos</p>

            <button
              type="button"
              className="mt-4 rounded-full bg-white px-6 py-2 text-xs font-bold text-black hover:bg-slate-200"
            >
              Subscribe
            </button>
          </div>

          <div className="mt-8 border-t border-white/10 pt-4">
            <h2 className="text-sm font-bold">About</h2>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              Official YouTube channel for Virat Kohli&apos;s fan giveaways and interactive updates. Created to reward loyal fans.
            </p>
            
            <div className="mt-4 space-y-3 border-t border-white/5 pt-4 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>Joined Jun 5, 2026 (4 days ago)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📈</span>
                <span>1,402 views</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>India</span>
              </div>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => setView("video")}
            className="mt-8 w-full rounded-xl bg-[#212121] py-3 text-center text-xs font-bold hover:bg-[#313131]"
          >
            ← Back to video
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-[#0f0f0f] pt-12 text-white">
      <StatusBar />
      <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-3 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-500">▶</span>
          <span className="text-sm font-semibold">YouTube</span>
        </div>
        <div className="flex gap-3 text-sm opacity-80">
          <span>🔍</span>
          <span>👤</span>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Video Player */}
        <button
          type="button"
          onClick={triggerClick}
          className="relative aspect-video w-full overflow-hidden bg-black block text-left"
        >
          <img
            src={PORTRAIT_SRC}
            alt="Live presenter on stream"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-2 pt-12">
            <div className="relative">
              <div className="mx-auto h-[3.5rem] w-[3.5rem] overflow-hidden rounded-full border-2 border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.15)] ring-2 ring-red-500/40">
                <img
                  src={PORTRAIT_SRC}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover object-[center_18%] scale-125"
                />
              </div>
              {speakingPulse && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded bg-red-600 px-1 py-0.5 text-[6px] font-bold uppercase tracking-wide">
                  Speaking
                </span>
              )}
            </div>
          </div>
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[9px] font-bold uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Live
          </span>
          <div
            className={`absolute right-2 top-2 flex items-center gap-1 rounded px-2 py-1 text-[8px] ${
              audioActive
                ? "bg-red-600/90 text-white"
                : "bg-black/50 text-white/70"
            }`}
          >
            <span aria-hidden>{audioActive ? "🔊" : "🔇"}</span>
            <span className={speakingPulse && audioActive ? "opacity-100" : "opacity-80"}>
              {audioActive ? "Live audio on" : "Tap to hear stream"}
            </span>
          </div>
          <div className="absolute inset-x-3 bottom-10 rounded bg-black/60 px-2 py-1 text-center text-[9px] leading-snug text-white/95 backdrop-blur-sm">
            &ldquo;Register your UPI now — first 100 fans get ₹10,000 instantly!&rdquo;
          </div>
        </button>

        {/* Video Info */}
        <div className="p-3">
          <h1 className="text-xs font-bold leading-snug">
            Giving away ₹10,000 to 100 fans RIGHT NOW — limited time only!
          </h1>
          <p className="mt-1 text-[9px] text-white/50">
            14.2K watching · Streamed live 5 mins ago
          </p>

          {/* Channel Info Row */}
          <div className="mt-3 flex items-center justify-between border-y border-white/5 py-2">
            <button
              type="button"
              onClick={() => {
                setView("channel");
                triggerAct2Choice(phone, "check");
              }}
              className="flex items-center gap-2 text-left"
            >
              <div className="flex h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/25">
                <img
                  src={PORTRAIT_SRC}
                  alt=""
                  className="h-full w-full object-cover object-[center_18%]"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">Virat Kohli Official</p>
                <p className="text-[9px] text-white/50">200 subscribers</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setView("channel");
                triggerAct2Choice(phone, "check");
              }}
              className="rounded-full bg-white px-3 py-1 text-[9px] font-bold text-black"
            >
              Subscribe
            </button>
          </div>

          {/* Action Row */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 text-[9px]">
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold">
              👍 1.2K | 👎
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold">
              🔗 Share
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold">
              ✂️ Remix
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold">
              🏳️ Report
            </span>
          </div>

          {/* Description Box */}
          <div className="mt-3 rounded-xl bg-white/5 p-3">
            <p className="text-[10px] leading-relaxed text-white/85">
              To celebrate 100M subscribers, I&apos;m giving back to my fans. Click the link, register with your UPI ID, and receive ₹10,000 directly.
            </p>
            <button
              type="button"
              onClick={triggerClick}
              className="mt-2 block break-all text-left text-[10px] font-semibold text-blue-400 underline-offset-2 hover:underline animate-pulse"
            >
              → virat-kohli-giveaway.in/claim
            </button>
            <p className="mt-1 text-[10px] font-bold text-amber-400">
              ⏰ 87 spots left
            </p>
          </div>

          {/* Comments Section */}
          <div className="mt-4 rounded-xl bg-white/5 p-3">
            <div className="flex justify-between text-[10px] font-bold">
              <span>Comments · 1.4K</span>
              <span className="text-white/60">▼</span>
            </div>
            <div className="mt-2 flex gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold shrink-0">
                R
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-semibold text-white/80">Rahul Sharma</p>
                <p className="mt-0.5 text-xs text-white/90 leading-snug">
                  OMG it actually worked! Just received ₹10,000 in my account! Thank you Virat sir! 🙏🔥
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
