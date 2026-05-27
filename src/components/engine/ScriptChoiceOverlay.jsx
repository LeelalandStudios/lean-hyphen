/**
 * @param {{ prompt: string, options: import('../../engine/parseScript.js').ScriptOption[], onChoose: (id: string) => void }} props
 */
export default function ScriptChoiceOverlay({ prompt, options, onChoose }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-40 max-h-[55%] overflow-y-auto rounded-t-2xl border-t border-slate-200 bg-slate-50/95 p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.2)] backdrop-blur-sm">
      <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-500">
        {prompt}
      </p>
      <div className="grid gap-2">
        {options.map((option, index) => {
          const optionId = option.id ?? String(index);
          return (
            <button
              key={optionId}
              type="button"
              onClick={() => onChoose(optionId)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-xs font-semibold text-slate-900 active:bg-slate-100"
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
