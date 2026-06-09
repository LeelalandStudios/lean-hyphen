import { useEffect, useState } from "react";
import GuideAvatar from "./GuideAvatar.jsx";
import { playVoiceoverForText, stopVoiceover } from "../../utils/voiceover.js";

export default function Act2OutcomePanel({ outcome, isLastScenario, onRetry, onNext }) {
  const isSuccess = outcome?.result === "success";
  const hasConsequence = isSuccess && outcome?.consequence?.length > 0;
  const consequenceCount = hasConsequence ? outcome.consequence.length : 0;
  const hasExplanation = outcome?.explanation?.length > 0;
  const explanationCount = hasExplanation ? outcome.explanation.length : 0;

  const [consequenceIndex, setConsequenceIndex] = useState(0);
  const [explanationIndex, setExplanationIndex] = useState(() => (hasConsequence ? -1 : 0));
  const [showCta, setShowCta] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    setConsequenceIndex(0);
    setExplanationIndex(hasConsequence ? -1 : 0);
    setShowCta(false);
    setAudioDuration(0);
  }, [outcome, hasConsequence]);

  // Voiceover playback for current explanation line
  useEffect(() => {
    if (explanationIndex >= 1 && explanationIndex <= explanationCount && outcome?.explanation) {
      const line = outcome.explanation[explanationIndex - 1];
      if (line) {
        playVoiceoverForText(line, (durationSecs) => {
          setAudioDuration(durationSecs);
        });
      }
    }
    return () => {
      stopVoiceover();
    };
  }, [explanationIndex, outcome, explanationCount]);

  useEffect(() => {
    if (!outcome) return;

    // Sequence: 1. Consequence lines -> 2. AI Typing -> 3. Explanation lines -> 4. CTA
    if (consequenceIndex < consequenceCount) {
      const line = outcome.consequence[consequenceIndex];
      // Delay longer for spinners
      const delay = line.toLowerCase().includes("spinner") ? 2000 : 1200;
      const t = window.setTimeout(() => setConsequenceIndex(i => i + 1), delay);
      return () => window.clearTimeout(t);
    }

    if (consequenceIndex === consequenceCount && hasExplanation && explanationIndex === -1) {
      const t = window.setTimeout(() => setExplanationIndex(0), 500);
      return () => window.clearTimeout(t);
    }

    if (explanationIndex === 0) {
      setExplanationIndex(1); // Reveal first line immediately
      return;
    }

    if (explanationIndex >= 1 && explanationIndex < explanationCount) {
      const line = outcome.explanation[explanationIndex - 1]; // Line currently being read
      const defaultDelay = Math.max(1000, line.length * 20); // Dynamic reading time
      const delay = audioDuration > 0 ? (audioDuration * 1000) : defaultDelay;
      const t = window.setTimeout(() => {
        setExplanationIndex(i => i + 1);
        setAudioDuration(0);
      }, delay);
      return () => window.clearTimeout(t);
    }

    if ((explanationIndex >= explanationCount || !hasExplanation) && !showCta) {
      const defaultDelay = 300;
      const delay = audioDuration > 0 ? (audioDuration * 1000) : defaultDelay;
      const t = window.setTimeout(() => {
        setShowCta(true);
        setAudioDuration(0);
      }, delay);
      return () => window.clearTimeout(t);
    }
  }, [outcome, consequenceIndex, consequenceCount, explanationIndex, explanationCount, hasExplanation, showCta, audioDuration]);

  if (!outcome) return null;

  const accent = isSuccess
    ? "border-emerald-500/50 bg-emerald-950/30"
    : "border-red-500/40 bg-red-950/20";
  const titleColor = isSuccess ? "text-emerald-300" : "text-red-300";

  return (
    <section
      className={`rounded-2xl border p-4 shadow-lg transition-colors ${accent}`}
      role="region"
      aria-label={outcome.title}
    >
      {isSuccess && (
        <h3 className={`mb-3 text-base font-bold ${titleColor}`}>{outcome.title}</h3>
      )}

      {hasConsequence && (
        <ul className="mb-4 space-y-2 text-sm text-slate-200">
          {outcome.consequence.slice(0, consequenceIndex).map((line, i) => {
            const isSpinner = line.toLowerCase().includes("spinner");
            const isDebit = line.toLowerCase().includes("debit") || line.includes("₹");

            if (isSpinner) {
              return (
                <li key={i} className="flex items-center gap-2 py-1 text-slate-400">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-slate-200" />
                  <span className="italic">{line}</span>
                </li>
              );
            }

            if (isDebit) {
              return (
                <li key={i} className="flex items-start gap-2 rounded-lg bg-red-950/40 px-3 py-2 font-semibold text-red-200 border border-red-500/20">
                  <span className="mt-0.5 text-red-400">💸</span>
                  {line}
                </li>
              );
            }

            return (
              <li key={i} className="flex items-start gap-2 text-slate-200">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                {line}
              </li>
            );
          })}
        </ul>
      )}

      {explanationIndex >= 0 && (
        <div className={isSuccess ? "mt-4 border-t border-slate-700/50 pt-4" : ""}>
          <GuideAvatar label={isSuccess ? "Priya breaks it down" : "What went wrong"} />
          
          {explanationIndex === 0 && (
            <div className="mt-2 flex w-16 items-center justify-center gap-1 rounded-full bg-slate-800 px-3 py-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          )}

          {explanationIndex >= 1 && (
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
              {outcome.explanation.slice(0, explanationIndex).map((line, i) => (
                <p key={i} className="animate-explanation-line">{line}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {showCta && outcome.reward && (
        <p className="mt-4 animate-explanation-line text-sm font-bold text-emerald-400">
          {outcome.reward}
        </p>
      )}

      {showCta && (
        <div className="mt-5 animate-explanation-cta">
          {isSuccess ? (
            <button
              type="button"
              onClick={onNext}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {isLastScenario ? outcome.ctaLabel : outcome.ctaLabel}
            </button>
          ) : (
            <button
              type="button"
              onClick={onRetry}
              className="w-full rounded-xl bg-slate-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              {outcome.ctaLabel}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
