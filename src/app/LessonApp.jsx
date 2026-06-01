import { useCallback, useEffect, useState } from "react";
import PhoneExplorer from "../phone/PhoneExplorer.jsx";
import ActPanel from "./ActPanel.jsx";
import Act3PriyaExplains from "./Act3PriyaExplains.jsx";
import Act1Hook from "./Act1Hook.jsx";
import Act2ScenarioExperience from "./Act2ScenarioExperience.jsx";
import { ACTS, DEFAULT_ACT_ID } from "../content/acts.js";

function actIdFromSearch() {
  if (typeof window === "undefined") return DEFAULT_ACT_ID;
  const param = new URLSearchParams(window.location.search).get("act");
  return ACTS.some((a) => a.id === param) ? param : DEFAULT_ACT_ID;
}

export default function LessonApp() {
  const [activeActId, setActiveActId] = useState(actIdFromSearch);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeActId === DEFAULT_ACT_ID) {
      url.searchParams.delete("act");
    } else {
      url.searchParams.set("act", activeActId);
    }
    window.history.replaceState({}, "", url);
  }, [activeActId]);

  const selectAct = useCallback((actId) => {
    setActiveActId(actId);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      <aside className="flex h-full w-56 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
        <div className="shrink-0 border-b border-slate-800 p-4">
          <h1 className="text-sm font-bold text-white">Spot the Scam</h1>
          <p className="mt-0.5 text-[10px] text-slate-500">
            Money Safety & Scams I
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-2">
          {ACTS.map((act) => {
            const selected = act.id === activeActId;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => selectAct(act.id)}
                className={`rounded-lg px-3 py-3 text-left transition ${
                  selected
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span className="block text-sm font-semibold">{act.title}</span>
                <span
                  className={`mt-0.5 block text-[10px] ${
                    selected ? "text-emerald-100" : "text-slate-500"
                  }`}
                >
                  {act.subtitle}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-slate-800 p-3 space-y-1.5">
          <a
            href="?index=1"
            className="block text-[10px] text-slate-500 hover:text-slate-300 hover:underline"
          >
            Scene index (dev)
          </a>
          <a
            href="?catalog=1"
            className="block text-[10px] text-slate-500 hover:text-slate-300 hover:underline"
          >
            Screen catalog (dev)
          </a>
        </div>
      </aside>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-slate-950">
        <div className="min-h-0 flex-1 overflow-hidden">
          {activeActId === "act1" ? (
            <Act1Hook onComplete={() => setActiveActId("act2")} />
          ) : activeActId === "act2" ? (
            <Act2ScenarioExperience onComplete={() => setActiveActId("act3")} />
          ) : activeActId === "act3" ? (
            <Act3PriyaExplains onComplete={() => setActiveActId("act4")} />
          ) : (
            <ActPanel actId={activeActId} />
          )}
        </div>
      </main>
    </div>
  );
}
