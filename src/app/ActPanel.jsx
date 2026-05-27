import { ACTS } from "../content/acts.js";

/**
 * Intro panel for acts that are not yet wired to interactive UI.
 * @param {{ actId: string }} props
 */
export default function ActPanel({ actId }) {
  const act = ACTS.find((a) => a.id === actId) ?? ACTS[0];

  return (
    <div className="flex h-full flex-col items-center justify-center p-8">
      <div className="max-w-lg text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">
          {act.title} · {act.subtitle}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-100">
          {act.summary.split(".")[0]}.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">{act.summary}</p>

        {act.comingSoon && (
          <p className="mt-6 inline-block rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300">
            Interactive content coming soon
          </p>
        )}

        <ul className="mt-8 space-y-2 text-left text-sm text-slate-300">
          {act.beats.map((beat) => (
            <li key={beat} className="flex gap-2">
              <span className="text-emerald-500">·</span>
              <span>{beat}</span>
            </li>
          ))}
        </ul>

        {actId === "act2" && (
          <p className="mt-8 text-xs text-slate-500">
            Select Act 2 in the sidebar to open the Phone Explorer.
          </p>
        )}
      </div>
    </div>
  );
}
