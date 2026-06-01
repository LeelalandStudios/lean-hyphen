import { useCallback, useEffect, useState } from "react";
import { FAKE_LINK_FEEDBACK, FAKE_LINK_OPTIONS } from "../../content/act4Challenge.js";
import TimerBar from "./TimerBar.jsx";

/**
 * @param {{ active: boolean, onComplete: (result: object) => void }} props
 */
export default function FakeLinkGame({ active, onComplete }) {
  const [locked, setLocked] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (active) {
      setLocked(false);
      setTimerActive(true);
    }
  }, [active]);

  const finish = useCallback(
    (selectedId, timedOut = false) => {
      if (locked) return;
      setLocked(true);
      setTimerActive(false);

      const correct = FAKE_LINK_OPTIONS.find((o) => o.correct);
      const selected = FAKE_LINK_OPTIONS.find((o) => o.id === selectedId);
      const selectedCorrect = !timedOut && selected?.correct === true;

      onComplete({
        roundId: "fake-link",
        title: "Spot the Fake Link",
        pointsEarned: selectedCorrect ? 20 : 0,
        maxPoints: 20,
        shieldEarned: selectedCorrect,
        closeCalls: selectedCorrect ? 0 : 1,
        correctCount: selectedCorrect ? 1 : 0,
        totalCount: 1,
        summary: selectedCorrect
          ? FAKE_LINK_FEEDBACK.correct
          : timedOut
            ? "Time ran out — the real link was phonepe.com."
            : `Wrong — ${selected?.why ?? "That domain was fake."} The real link was ${correct?.display}.`,
        details: FAKE_LINK_OPTIONS.map((o) => ({
          label: o.label,
          ok: o.correct,
          text: o.correct ? "Real domain" : o.why,
        })),
      });
    },
    [locked, onComplete]
  );

  if (!active) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <TimerBar
        seconds={15}
        active={timerActive && !locked}
        onExpire={() => finish(null, true)}
      />
      <p className="text-center text-sm text-slate-400">Tap the real link</p>
      <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
        {FAKE_LINK_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            disabled={locked}
            onClick={() => finish(opt.id)}
            className="rounded-xl border border-slate-700 bg-slate-800/80 p-4 text-left transition hover:border-amber-500/50 hover:bg-slate-800 disabled:opacity-60"
          >
            <span className="text-xs font-bold text-amber-400">{opt.label}</span>
            <p className="mt-2 break-all font-mono text-sm text-white">
              <span className="text-emerald-400/90">{opt.domain}</span>
              <span className="text-slate-500">{opt.path}</span>
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
