import { ACT2_HEADER } from "../../content/act2Scenarios.js";

export default function Act2ProgressHeader({
  scenarioNumber,
  scenarioCount,
  shieldCount,
  closeCalls,
}) {
  return (
    <header className="shrink-0 border-b border-slate-800 bg-slate-900/80 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
            {ACT2_HEADER.title}
          </p>
          <p className="text-xs text-slate-400">
            Scenario {scenarioNumber} / {scenarioCount}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="font-semibold text-emerald-400">
            🛡️ Shields: {shieldCount} / {scenarioCount}
          </span>
          <span className="font-semibold text-amber-400">
            ⚠️ Close calls: {closeCalls}
          </span>
        </div>
      </div>
      <p className="mx-auto mt-2 max-w-5xl text-center text-[11px] text-slate-500">
        {ACT2_HEADER.helperText}
      </p>
    </header>
  );
}
