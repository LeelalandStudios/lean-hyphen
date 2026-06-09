import { useEffect, useState } from "react";
import { playVoiceoverForText, stopVoiceover } from "../../utils/voiceover.js";
import GuideAvatar from "./GuideAvatar.jsx";

/**
 * Internal thought with delay, thinking dots, and line-by-line reveal.
 * @param {{ lines: string[], delayMs?: number, typingSpeedMs?: number, onComplete?: () => void }} props
 */
export default function Act2ThoughtBubble({
  lines,
  delayMs = 700,
  typingSpeedMs = 35,
  onComplete,
  skipTrigger = 0,
}) {
  const [phase, setPhase] = useState("waiting");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [dynamicInterval, setDynamicInterval] = useState(typingSpeedMs);
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    if (skipTrigger > 0 && phase !== "done") {
      setPhase("done");
      setLineIndex(lines.length - 1);
      setCharIndex(lines[lines.length - 1]?.length ?? 0);
      onComplete?.();
    }
  }, [skipTrigger, lines, onComplete, phase]);

  useEffect(() => {
    if (!lines?.length) return;
    setPhase("waiting");
    setLineIndex(0);
    setCharIndex(0);
    setDynamicInterval(typingSpeedMs);
    setAudioDuration(0);
    const t = window.setTimeout(() => setPhase("thinking"), delayMs);
    return () => window.clearTimeout(t);
  }, [lines, delayMs, typingSpeedMs]);

  useEffect(() => {
    if (phase !== "thinking") return;
    const t = window.setTimeout(() => setPhase("typing"), 480);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing" || !lines?.length) return;
    const line = lines[lineIndex] ?? "";
    if (charIndex < line.length) {
      const t = window.setTimeout(() => setCharIndex((c) => c + 1), dynamicInterval);
      return () => window.clearTimeout(t);
    }
    
    let readingDelay = 400;
    if (audioDuration > 0) {
      const timeSpentTyping = line.length * dynamicInterval;
      readingDelay = Math.max(400, (audioDuration * 1000) - timeSpentTyping + 400);
    }

    if (lineIndex < lines.length - 1) {
      const t = window.setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
        setAudioDuration(0);
        setDynamicInterval(typingSpeedMs);
      }, readingDelay);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, readingDelay);
  }, [phase, lines, lineIndex, charIndex, dynamicInterval, onComplete, audioDuration, typingSpeedMs]);

  // Voiceover playback for current thought line
  useEffect(() => {
    if (phase === "typing" && lines && lines[lineIndex]) {
      playVoiceoverForText(lines[lineIndex], (durationSecs) => {
        setAudioDuration(durationSecs);
        setDynamicInterval(20);
      });
    }
    return () => {
      stopVoiceover();
    };
  }, [phase, lineIndex, lines]);

  const handleSkip = () => {
    if (phase === "done") return;
    setPhase("done");
    setLineIndex(lines.length - 1);
    setCharIndex(lines[lines.length - 1]?.length ?? 0);
    onComplete?.();
  };

  if (!lines?.length) return null;

  const visibleLines = lines.slice(0, lineIndex + 1).map((full, i) => {
    if (i < lineIndex) return full;
    return full.slice(0, charIndex);
  });

  return (
    <div
      className={`flex items-end gap-3 pl-1 select-none ${phase !== "done" ? "cursor-pointer" : ""}`}
      onClick={handleSkip}
    >
      {/* Player Character Avatar (Transparent, not a circle/icon) */}
      <div className="shrink-0 mb-1">
        <img
          src="https://api.dicebear.com/7.x/micah/svg?seed=John&backgroundColor=transparent&baseColor=f9c9b6"
          alt="You thinking"
          className="h-20 w-auto object-contain drop-shadow-md"
          style={{ transform: "scaleX(-1)" }} // Face the bubble
        />
      </div>

      <aside className="relative flex-1 rounded-2xl rounded-bl-none border border-slate-700/80 bg-slate-800/60 p-4 shadow-lg">
        {/* Thought Bubble Tail */}
        <div className="absolute -left-3 bottom-0 h-5 w-4 overflow-hidden">
          <div className="absolute bottom-0 left-2 h-4 w-4 origin-bottom-left -rotate-45 transform border-b border-l border-slate-700/80 bg-slate-800/60" />
        </div>

        <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-500">
          Internal thought
        </p>

        {phase === "thinking" && (
          <div className="flex items-center gap-1 py-2" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block h-2 w-2 animate-pulse rounded-full bg-slate-400"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        )}

        {(phase === "typing" || phase === "done") && (
          <div className="space-y-2 text-sm italic leading-relaxed text-slate-300">
            {visibleLines.map((line, i) => (
              <p key={i}>
                &ldquo;{line}
                {phase === "typing" && i === lineIndex && charIndex < (lines[lineIndex]?.length ?? 0) ? (
                  <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-slate-400 align-middle" />
                ) : null}
                &rdquo;
              </p>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
