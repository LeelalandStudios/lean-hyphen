import { useEffect, useState } from "react";

/**
 * Internal thought with delay, thinking dots, and line-by-line reveal.
 * @param {{ lines: string[], delayMs?: number, typingSpeedMs?: number, onComplete?: () => void }} props
 */
export default function Act2ThoughtBubble({
  lines,
  delayMs = 700,
  typingSpeedMs = 24,
  onComplete,
}) {
  const [phase, setPhase] = useState("waiting");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!lines?.length) return;
    setPhase("waiting");
    setLineIndex(0);
    setCharIndex(0);
    const t = window.setTimeout(() => setPhase("thinking"), delayMs);
    return () => window.clearTimeout(t);
  }, [lines, delayMs]);

  useEffect(() => {
    if (phase !== "thinking") return;
    const t = window.setTimeout(() => setPhase("typing"), 480);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing" || !lines?.length) return;
    const line = lines[lineIndex] ?? "";
    if (charIndex < line.length) {
      const t = window.setTimeout(() => setCharIndex((c) => c + 1), typingSpeedMs);
      return () => window.clearTimeout(t);
    }
    if (lineIndex < lines.length - 1) {
      const t = window.setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 400);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 350);
    return () => window.clearTimeout(t);
  }, [phase, lines, lineIndex, charIndex, typingSpeedMs, onComplete]);

  if (!lines?.length) return null;

  const visibleLines = lines.slice(0, lineIndex + 1).map((full, i) => {
    if (i < lineIndex) return full;
    return full.slice(0, charIndex);
  });

  return (
    <aside className="rounded-2xl border border-slate-700/80 bg-slate-800/60 p-4 shadow-lg">
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
  );
}
