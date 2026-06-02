import { useEffect } from "react";
import { ACT4_SCORE_BANDS } from "../../content/act4Challenge.js";
import { getScoreBand } from "./answerScoring.js";
import ChallengeButton from "./ChallengeButton.jsx";
import { playScore80, playScorePerfect } from "../../utils/sound.js";

/**
 * @param {{
 *   score: number,
 *   shields: number,
 *   closeCalls: number,
 *   roundResults: object[],
 *   onContinue: () => void,
 * }} props
 */
export default function ResultsBoard({ score, shields, closeCalls, roundResults, onContinue }) {
  const band = getScoreBand(score, ACT4_SCORE_BANDS);

  useEffect(() => {
    if (score === 200) {
      playScorePerfect();
    } else if (score >= 160) {
      playScore80();
    }
  }, [score]);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
      <div className="mx-auto w-full max-w-lg">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
          Results
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-white">{band.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{band.copy}</p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
          <span className="rounded-lg bg-amber-500/15 px-3 py-2 text-amber-300">
            Score: {score} / 200
          </span>
          <span className="rounded-lg bg-emerald-500/15 px-3 py-2 text-emerald-300">
            🛡️ {shields} shields earned
          </span>
          <span className="rounded-lg bg-slate-800 px-3 py-2 text-slate-400">
            {closeCalls} close calls
          </span>
        </div>

        <ul className="mt-8 space-y-3">
          {roundResults.map((r) => (
            <li
              key={r.roundId}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm"
            >
              <span className="font-medium text-slate-200">{r.title}</span>
              <span className="text-slate-400">
                {r.pointsEarned} / {r.maxPoints}
                {r.shieldEarned ? " · 🛡️" : ""}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-end">
          <ChallengeButton onClick={onContinue}>Continue →</ChallengeButton>
        </div>
      </div>
    </div>
  );
}
