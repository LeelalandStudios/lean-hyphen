import ChallengeButton from "./ChallengeButton.jsx";

/**
 * @param {{
 *   result: {
 *     title: string,
 *     pointsEarned: number,
 *     maxPoints: number,
 *     shieldEarned: boolean,
 *     closeCalls: number,
 *     summary?: string,
 *     details?: { label: string, ok?: boolean, text?: string }[],
 *   },
 *   onNext: () => void,
 *   onRetry?: () => void,
 *   nextLabel?: string,
 * }} props
 */
export default function RoundFeedback({ result, onNext, onRetry, nextLabel = "Next →" }) {
  return (
    <div className="flex flex-1 flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-lg">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Round complete
        </p>
        <h2 className="mt-2 text-xl font-extrabold text-white">{result.title}</h2>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-lg bg-amber-500/15 px-3 py-1.5 font-bold text-amber-300">
            +{result.pointsEarned} / {result.maxPoints} pts
          </span>
          {result.shieldEarned ? (
            <span className="rounded-lg bg-emerald-500/15 px-3 py-1.5 font-bold text-emerald-300">
              🛡️ Shield earned
            </span>
          ) : (
            <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-slate-400">
              No shield this round
            </span>
          )}
          {result.closeCalls > 0 && (
            <span className="rounded-lg bg-amber-900/40 px-3 py-1.5 text-amber-200">
              {result.closeCalls} close call{result.closeCalls !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {result.summary && (
          <p className="mt-4 text-sm leading-relaxed text-slate-300">{result.summary}</p>
        )}

        {result.modelAnswer && (
          <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/40 p-4">
            <p className="text-xs font-bold uppercase text-slate-500">Model answer</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{result.modelAnswer}</p>
          </div>
        )}

        {result.details && result.details.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {result.details.map((d, i) => (
              <li key={i} className="flex gap-2">
                <span className={d.ok ? "text-emerald-400" : "text-red-400"}>
                  {d.ok ? "✓" : "·"}
                </span>
                <span>
                  {d.label}
                  {d.text ? `: ${d.text}` : ""}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          {onRetry && (
            <ChallengeButton variant="secondary" onClick={onRetry}>
              Try again
            </ChallengeButton>
          )}
          <ChallengeButton onClick={onNext}>{nextLabel}</ChallengeButton>
        </div>
      </div>
    </div>
  );
}
