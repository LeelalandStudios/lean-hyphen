/** @param {{ score: number, maxScore?: number, shields: number, closeCalls: number }} props */
export default function ScoreHud({ score, maxScore = 200, shields, closeCalls }) {
  return (
    <header className="shrink-0 border-b border-amber-500/20 bg-slate-900/90 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/90">
            Scam Detective
          </p>
          <p className="text-xs text-slate-400">Challenge round</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
          <span className="text-amber-300">
            Score: {score} / {maxScore}
          </span>
          <span className="text-emerald-400">🛡️ {shields} / 5</span>
          <span className="text-amber-500/90">⚠️ {closeCalls}</span>
        </div>
      </div>
    </header>
  );
}
