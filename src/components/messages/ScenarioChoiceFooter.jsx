import { SCENARIO1_CHOICES } from "../../content/scenario1.js";

/**
 * @param {{ choices?: typeof SCENARIO1_CHOICES, title?: string, onChoose?: (id: string) => void }} props
 */
export default function ScenarioChoiceFooter({
  choices = SCENARIO1_CHOICES,
  title = "What do you do?",
  onChoose,
}) {
  return (
    <footer className="shrink-0 border-t border-slate-200 bg-slate-50 p-3 pb-16 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <div className="grid gap-2">
        {choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => onChoose?.(choice.id)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-xs font-semibold text-slate-900 active:bg-slate-100"
          >
            {choice.label}
          </button>
        ))}
      </div>
    </footer>
  );
}
