export default function Act2ChoicePanel({
  prompt = "Your choice",
  choices,
  selectedChoiceId,
  disabled,
  onChoose,
}) {
  return (
    <section className="rounded-2xl border border-slate-700/80 bg-slate-800/60 p-4 shadow-lg">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-wide text-slate-500">
        {prompt}
      </p>
      <div className="grid gap-2">
        {choices.map((choice) => {
          const selected = selectedChoiceId === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              disabled={disabled}
              onClick={() => onChoose(choice.id)}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                selected
                  ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-100"
                  : "border-slate-600 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800"
              }`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
