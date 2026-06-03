import { useState, useEffect } from "react";
import { ROOM_CHARACTERS } from "./roomCharacters.js";
import { playVoiceoverForText, pauseVoiceover, stopVoiceover } from "../../utils/voiceover.js";

function ForwardedCard({ from, body }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10">
      <div className="flex items-center justify-between bg-black/20 px-4 py-2">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-white/80">
          Forwarded message
        </p>
        <span className="text-xs text-white/70">↪</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs font-semibold text-white/90">{from}</p>
        <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-snug text-white">
          {body}
        </pre>
      </div>
    </div>
  );
}

function DialogueBox({ speakerId, line, displayedText }) {
  const c = ROOM_CHARACTERS[speakerId] ?? ROOM_CHARACTERS.priya;

  return (
    <div className="pointer-events-auto w-full max-w-3xl rounded-[28px] border border-white/25 bg-black/45 p-4 shadow-2xl backdrop-blur">
      <div className="flex items-start gap-3">
        <img
          src={c.avatarSrc}
          alt={c.name}
          className="h-12 w-12 shrink-0 rounded-2xl object-cover shadow-lg"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold uppercase tracking-wider text-white/80">
            {c.name}
          </p>
          {line.type === "forwarded" ? (
            <div className="mt-2">
              <ForwardedCard from={line.from} body={displayedText} />
            </div>
          ) : (
            <p className="mt-1 text-base leading-snug text-white">{displayedText}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Visual-novel dialogue strip (same pattern as legacy Act 1 room chat).
 * Handles typewriter text generation, screen-tap pausing, and auto-advance timers.
 */
export default function RoomDialogue({ script, onComplete, finalButtonLabel, header }) {
  const [idx, setIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const line = script[idx] ?? script[0];
  const isLast = idx >= script.length - 1;
  const targetText = line.type === "forwarded" ? (line.body || "") : (line.text || "");

  // 1. Reset text state when transitioning to a new line
  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
  }, [idx, targetText]);

  // 2. Typewriter Effect (Pauseable)
  useEffect(() => {
    if (isComplete || isPaused || !targetText) {
      if (!targetText) setIsComplete(true);
      return;
    }

    let currentIndex = displayedText.length;
    const interval = setInterval(() => {
      currentIndex++;
      setDisplayedText(targetText.slice(0, currentIndex));
      if (currentIndex >= targetText.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [targetText, isPaused, isComplete, displayedText.length]);

  // 3. Auto-Advance Timer (Pauseable, skipped on last line)
  useEffect(() => {
    if (!isComplete || isPaused || isLast) return;

    // Calculate reading delay dynamically based on text length
    const baseDelay = 1200;
    const msPerChar = 25;
    const readingDelay = Math.max(1500, baseDelay + targetText.length * msPerChar);

    const timeout = setTimeout(() => {
      setIdx((prev) => prev + 1);
    }, readingDelay);

    return () => clearTimeout(timeout);
  }, [isComplete, isPaused, isLast, idx, targetText]);

  // 4. Voiceover Playback Integration
  useEffect(() => {
    if (!targetText) return;

    if (!isPaused) {
      playVoiceoverForText(targetText);
    } else {
      pauseVoiceover();
    }

    return () => {
      stopVoiceover();
    };
  }, [idx, targetText, isPaused]);

  const handleContainerClick = () => {
    setIsPaused((p) => !p);
  };

  return (
    <div 
      onClick={handleContainerClick}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center p-5 gap-4 cursor-pointer select-none"
    >
      {header}
      
      <DialogueBox
        speakerId={line.speaker}
        line={line}
        displayedText={displayedText}
      />

      {/* Control panel beneath dialogue card */}
      <div className="w-full max-w-3xl flex justify-center min-h-[44px]">
        {isLast && isComplete ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Avoid triggering pause toggle
              onComplete();
            }}
            className="rounded-full bg-white px-6 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-slate-100 shadow-xl transition-all duration-200 pointer-events-auto"
          >
            {finalButtonLabel ?? (line.type === "cta" ? line.label : "Continue →")}
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-sm border border-white/5 pointer-events-none select-none">
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              {isPaused ? "Paused · Tap to Continue" : "Auto-playing · Tap to Pause"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
