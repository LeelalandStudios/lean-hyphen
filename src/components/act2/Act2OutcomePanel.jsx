export default function Act2OutcomePanel({ outcome, isLastScenario, onRetry, onNext }) {
  if (!outcome) return null;

  const isSuccess = outcome.result === "success";
  const accent = isSuccess
    ? "border-emerald-500/50 bg-emerald-950/30"
    : "border-red-500/40 bg-red-950/20";
  const titleColor = isSuccess ? "text-emerald-300" : "text-red-300";

  return (
    <section
      className={`rounded-2xl border p-4 shadow-lg ${accent}`}
      role="region"
      aria-label={outcome.title}
    >
      <h3 className={`text-base font-bold ${titleColor}`}>{outcome.title}</h3>

      {outcome.consequence?.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
          {outcome.consequence.map((line, i) => (
            <li key={i} className={line.includes("₹") || line.includes("login") || line.includes("debited") ? "font-semibold text-red-200" : ""}>
              {line}
            </li>
          ))}
        </ul>
      )}

      {outcome.explanation?.length > 0 && (
        <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-slate-300">
          {outcome.explanation.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}

      {outcome.reward && (
        <p className="mt-3 text-sm font-bold text-emerald-400">{outcome.reward}</p>
      )}

      <div className="mt-4">
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
    </section>
  );
}
