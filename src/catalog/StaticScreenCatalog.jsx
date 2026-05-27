import { useMemo, useState } from "react";
import PhoneShell from "../components/phone/PhoneShell.jsx";
import {
  DEFAULT_STATIC_SCREEN_ID,
  STATIC_SCREEN_GROUPS,
  STATIC_SCREENS,
} from "../content/staticScreens.js";

function renderScreen(entry) {
  const { Component, props = {} } = entry;
  return <Component {...props} />;
}

export default function StaticScreenCatalog() {
  const [screenId, setScreenId] = useState(DEFAULT_STATIC_SCREEN_ID);

  const entry = useMemo(
    () => STATIC_SCREENS.find((s) => s.id === screenId) ?? STATIC_SCREENS[0],
    [screenId]
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      <aside className="flex h-full w-80 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
        <div className="shrink-0 border-b border-slate-800 p-4">
          <h1 className="text-sm font-bold uppercase tracking-wide text-slate-400">
            Phase 1 — Static screens
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Aligned to script.md · No story flow yet
          </p>
        </div>
        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
          {STATIC_SCREEN_GROUPS.map((group) => (
            <div key={group.act} className="mb-4">
              <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                {group.act}
              </p>
              <ul className="space-y-0.5">
                {group.screens.map((screen) => (
                  <li key={screen.id}>
                    <button
                      type="button"
                      onClick={() => setScreenId(screen.id)}
                      className={`w-full rounded-lg px-2 py-2 text-left text-xs leading-snug transition ${
                        screenId === screen.id
                          ? "bg-emerald-600 text-white"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {screen.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <p className="shrink-0 border-t border-slate-800 p-3 font-mono text-[10px] text-slate-500">
          id: {entry.id}
          <br />
          <a href="/" className="text-emerald-600 hover:underline">
            ← Back to lesson app
          </a>
        </p>
      </aside>

      <main className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-4">
        <PhoneShell>{renderScreen(entry)}</PhoneShell>
      </main>
    </div>
  );
}
