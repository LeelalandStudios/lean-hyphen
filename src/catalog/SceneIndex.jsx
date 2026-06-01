import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_SCENE_ID,
  getPlayableScene,
  resolveSceneId,
  SCENE_BY_ID,
  SCENE_SECTIONS,
} from "./sceneIndex.js";

function sceneIdFromSearch() {
  if (typeof window === "undefined") return DEFAULT_SCENE_ID;
  return new URLSearchParams(window.location.search).get("scene");
}

function StatusBadge({ status }) {
  const styles =
    status === "live"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
      : "border-slate-600 bg-slate-800 text-slate-400";
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${styles}`}>
      {status}
    </span>
  );
}

function PlannedScenePanel({ scene }) {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="max-w-lg rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Planned</p>
        <h2 className="mt-2 text-xl font-bold text-slate-100">{scene.label}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{scene.summary}</p>
        {scene.supersedes && SCENE_BY_ID[scene.supersedes] && (
          <p className="mt-4 text-xs text-slate-500">
            Will replace:{" "}
            <span className="text-slate-300">{SCENE_BY_ID[scene.supersedes].label}</span>
          </p>
        )}
        <p className="mt-2 font-mono text-[10px] text-slate-600">{scene.source}</p>
      </div>
    </div>
  );
}

function ScenePreview({ scene }) {
  if (scene.planned || !scene.Component) {
    return <PlannedScenePanel scene={scene} />;
  }

  const { Component, props = {} } = scene;
  return (
    <div className="h-full min-h-0 overflow-hidden">
      <Component {...props} />
    </div>
  );
}

export default function SceneIndex() {
  const [sceneId, setSceneId] = useState(() =>
    resolveSceneId(sceneIdFromSearch())
  );

  const scene = useMemo(
    () => SCENE_BY_ID[sceneId] ?? SCENE_BY_ID[DEFAULT_SCENE_ID],
    [sceneId]
  );

  const playable = getPlayableScene(sceneId);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("index", "1");
    url.searchParams.delete("catalog");
    if (sceneId === DEFAULT_SCENE_ID) {
      url.searchParams.delete("scene");
    } else {
      url.searchParams.set("scene", sceneId);
    }
    window.history.replaceState({}, "", url);
  }, [sceneId]);

  const selectScene = useCallback((id) => {
    setSceneId(resolveSceneId(id));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      <aside className="flex h-full w-80 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
        <div className="shrink-0 border-b border-slate-800 p-4">
          <h1 className="text-sm font-bold text-white">Scene index</h1>
          <p className="mt-1 text-xs text-slate-500">
            Playable scenes — live, legacy, and planned.
          </p>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
          {SCENE_SECTIONS.map((section) => (
            <div key={section.id} className="mb-5">
              <div className="px-2 py-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                  {section.title}
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                  {section.description}
                </p>
              </div>
              <ul className="mt-1 space-y-0.5">
                {section.scenes.map((entry) => {
                  const selected = entry.id === sceneId;
                  const isPlanned = entry.planned || !entry.Component;
                  return (
                    <li key={entry.id}>
                      <button
                        type="button"
                        onClick={() => selectScene(entry.id)}
                        className={`w-full rounded-lg px-2 py-2 text-left transition ${
                          selected
                            ? "bg-emerald-600 text-white"
                            : "text-slate-300 hover:bg-slate-800"
                        } ${isPlanned ? "opacity-80" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs leading-snug">{entry.label}</span>
                          {!isPlanned && (
                            <StatusBadge status={entry.status} />
                          )}
                        </div>
                        {entry.act != null && (
                          <span
                            className={`mt-1 block text-[10px] ${
                              selected ? "text-emerald-100" : "text-slate-500"
                            }`}
                          >
                            Act {entry.act}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="shrink-0 space-y-2 border-t border-slate-800 p-3 text-[10px] text-slate-500">
          <p className="font-mono">
            id: {scene.id}
            {playable ? "" : " · not playable"}
          </p>
          {scene.supersededBy && SCENE_BY_ID[scene.supersededBy] && (
            <p>
              Superseded by:{" "}
              <button
                type="button"
                onClick={() => selectScene(scene.supersededBy)}
                className="text-emerald-500 hover:underline"
              >
                {SCENE_BY_ID[scene.supersededBy].label}
              </button>
            </p>
          )}
          {scene.supersedes && SCENE_BY_ID[scene.supersedes] && (
            <p>
              Replaces:{" "}
              <button
                type="button"
                onClick={() => selectScene(scene.supersedes)}
                className="text-emerald-500 hover:underline"
              >
                {SCENE_BY_ID[scene.supersedes].label}
              </button>
            </p>
          )}
          <p className="font-mono text-slate-600">{scene.source}</p>
          <a href="/" className="block text-emerald-600 hover:underline">
            ← Lesson app
          </a>
          <a
            href="?catalog=1"
            className="block text-slate-600 hover:text-slate-400 hover:underline"
          >
            Screen catalog (static frames)
          </a>
        </div>
      </aside>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="shrink-0 border-b border-slate-800 bg-slate-950/80 px-5 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-sm font-semibold text-slate-100">{scene.label}</h2>
            {!scene.planned && scene.Component && (
              <StatusBadge status={scene.status} />
            )}
            {scene.planned && (
              <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-300">
                planned
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-400">{scene.summary}</p>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden">
          <ScenePreview scene={scene} />
        </div>
      </main>
    </div>
  );
}
