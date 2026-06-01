import { useMemo } from "react";
import PhoneShell from "../components/phone/PhoneShell.jsx";
import ScriptChoiceOverlay from "../components/engine/ScriptChoiceOverlay.jsx";
import ScriptContinueBar from "../components/engine/ScriptContinueBar.jsx";
import { getScreenEntry } from "../engine/screenRegistry.js";
import { useScriptRunner } from "../hooks/useScriptRunner.js";
import gameScript from "../content/game.script.md?raw";

function renderScreen(entry, props) {
  const { Component } = entry;
  return <Component {...props} />;
}

export default function ScriptDrivenGame() {
  const { view, vars, advance, choose, restart } = useScriptRunner(gameScript);

  const screenEntry = useMemo(() => {
    if (!view.screenId) return null;
    return getScreenEntry(view.screenId);
  }, [view.screenId]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 p-4 text-slate-100">
      <header className="flex w-full max-w-md items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          <p className="font-semibold uppercase tracking-wide text-emerald-500">
            Simulation
          </p>
          <p className="font-mono text-[10px]">node: {view.nodeId}</p>
        </div>
        <button
          type="button"
          onClick={restart}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-300 hover:bg-slate-900"
        >
          Restart
        </button>
      </header>

      {view.error && (
        <p className="max-w-md text-center text-sm text-red-400">{view.error}</p>
      )}

      <div className="relative">
        <PhoneShell>
          {screenEntry ? (
            renderScreen(screenEntry, view.screenProps)
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-400">
              No screen for this step.
            </div>
          )}

          {view.mode === "choice" && view.choices && (
            <ScriptChoiceOverlay
              prompt={view.choicePrompt ?? "What do you do?"}
              options={view.choices}
              onChoose={choose}
            />
          )}

          {view.mode === "screen" && view.advance && (
            <ScriptContinueBar mode={view.advance} onAdvance={advance} />
          )}
        </PhoneShell>
      </div>

      {Object.keys(vars).length > 0 && (
        <p className="max-w-md text-center font-mono text-[10px] text-slate-500">
          vars: {JSON.stringify(vars)}
        </p>
      )}

      <p className="max-w-md text-center text-[10px] text-slate-600">
        Design review:{" "}
        <code className="text-slate-400">?index=1</code> (scenes) or{" "}
        <code className="text-slate-400">?catalog=1</code> (static frames)
      </p>
    </div>
  );
}
