import { useCallback, useEffect, useState } from "react";
import { ACTS, DEFAULT_ACT_ID } from "../content/acts.js";
import Act1Hook from "./Act1Hook.jsx";
import Act2ScenarioExperience from "./Act2ScenarioExperience.jsx";
import Act3PriyaExplains from "./Act3PriyaExplains.jsx";
import Act4Challenge from "./Act4Challenge.jsx";
import ActPanel from "./ActPanel.jsx";

import { ACT2_SCENARIOS } from "../content/act2Scenarios.js";

export const ACT1_SUB_SCENES = [
  { id: "intrusion", number: 1, title: "The Intrusion" },
  { id: "chat", number: 2, title: "Squad Goals Chat" },
  { id: "quote", number: 3, title: "Why it happened" },
];

export const ACT3_SUB_SCENES = [
  { id: "intro", number: 1, title: "Priya's Debrief" },
  { id: "cards", number: 2, title: "Scam Cards Table" },
  { id: "outro", number: 3, title: "Urgency Lesson" },
];

export const ACT4_SUB_SCENES = [
  { id: "fake-link", number: 1, title: "Spot the Fake Link" },
  { id: "speed-round", number: 2, title: "Real or Scam?" },
  { id: "email-red-flags", number: 3, title: "What's Wrong Here?" },
  { id: "response-match", number: 4, title: "What Do You Do Now?" },
  { id: "boss-level", number: 5, title: "The Boss Level" },
  { id: "group", number: 6, title: "Squad Goals Wrap up" },
  { id: "rules", number: 7, title: "What to do if it happens to you" },
];

function actIdFromSearch() {
  if (typeof window === "undefined") return DEFAULT_ACT_ID;
  const param = new URLSearchParams(window.location.search).get("act");
  return ACTS.some((a) => a.id === param) ? param : DEFAULT_ACT_ID;
}

function act4RoundFromSearch() {
  if (typeof window === "undefined") return null;
  const round = new URLSearchParams(window.location.search).get("round");
  return ACT4_SUB_SCENES.some((r) => r.id === round) ? round : null;
}

function act2ScenarioFromSearch() {
  if (typeof window === "undefined") return null;
  const scenario = new URLSearchParams(window.location.search).get("scenario");
  return ACT2_SCENARIOS.some((s) => s.id === scenario) ? scenario : null;
}

function act1SubSceneFromSearch() {
  if (typeof window === "undefined") return null;
  const param = new URLSearchParams(window.location.search).get("act1_scene");
  return ACT1_SUB_SCENES.some((s) => s.id === param) ? param : null;
}

function act3SubSceneFromSearch() {
  if (typeof window === "undefined") return null;
  const param = new URLSearchParams(window.location.search).get("act3_scene");
  return ACT3_SUB_SCENES.some((s) => s.id === param) ? param : null;
}

export default function LessonApp() {
  const [activeActId, setActiveActId] = useState(actIdFromSearch);
  const [act4RoundId, setAct4RoundId] = useState(() => {
    const fromSearch = act4RoundFromSearch();
    if (fromSearch) return fromSearch;
    if (actIdFromSearch() === "act4") return ACT4_SUB_SCENES[0]?.id ?? null;
    return null;
  });
  const [act2ScenarioId, setAct2ScenarioId] = useState(() => {
    const fromSearch = act2ScenarioFromSearch();
    if (fromSearch) return fromSearch;
    if (actIdFromSearch() === "act2") return ACT2_SCENARIOS[0]?.id ?? null;
    return null;
  });
  const [act1PhaseId, setAct1PhaseId] = useState(() => {
    const fromSearch = act1SubSceneFromSearch();
    if (fromSearch) return fromSearch;
    if (actIdFromSearch() === "act1") return ACT1_SUB_SCENES[0]?.id ?? null;
    return null;
  });
  const [act3PhaseId, setAct3PhaseId] = useState(() => {
    const fromSearch = act3SubSceneFromSearch();
    if (fromSearch) return fromSearch;
    if (actIdFromSearch() === "act3") return ACT3_SUB_SCENES[0]?.id ?? null;
    return null;
  });

  const [act2CompletedIds, setAct2CompletedIds] = useState([]);
  const [act4RoundResults, setAct4RoundResults] = useState([]);
  const [expandedActs, setExpandedActs] = useState({
    act1: false,
    act2: false,
    act3: false,
    act4: false
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeActId === DEFAULT_ACT_ID) {
      url.searchParams.delete("act");
    } else {
      url.searchParams.set("act", activeActId);
    }
    if (activeActId === "act4" && act4RoundId) {
      url.searchParams.set("round", act4RoundId);
    } else {
      url.searchParams.delete("round");
    }
    if (activeActId === "act2" && act2ScenarioId) {
      url.searchParams.set("scenario", act2ScenarioId);
    } else {
      url.searchParams.delete("scenario");
    }
    if (activeActId === "act1" && act1PhaseId) {
      url.searchParams.set("act1_scene", act1PhaseId);
    } else {
      url.searchParams.delete("act1_scene");
    }
    if (activeActId === "act3" && act3PhaseId) {
      url.searchParams.set("act3_scene", act3PhaseId);
    } else {
      url.searchParams.delete("act3_scene");
    }
    window.history.replaceState({}, "", url);
  }, [activeActId, act4RoundId, act2ScenarioId, act1PhaseId, act3PhaseId]);

  const selectAct = useCallback((actId) => {
    setActiveActId(actId);
    if (actId === "act2") {
      setAct2ScenarioId(ACT2_SCENARIOS[0]?.id ?? null);
      setAct1PhaseId(null);
      setAct3PhaseId(null);
      setAct4RoundId(null);
    } else if (actId === "act1") {
      setAct1PhaseId(ACT1_SUB_SCENES[0]?.id ?? null);
      setAct2ScenarioId(null);
      setAct3PhaseId(null);
      setAct4RoundId(null);
    } else if (actId === "act3") {
      setAct3PhaseId(ACT3_SUB_SCENES[0]?.id ?? null);
      setAct1PhaseId(null);
      setAct2ScenarioId(null);
      setAct4RoundId(null);
    } else if (actId === "act4") {
      setAct4RoundId(ACT4_SUB_SCENES[0]?.id ?? null);
      setAct1PhaseId(null);
      setAct2ScenarioId(null);
      setAct3PhaseId(null);
    } else {
      setAct2ScenarioId(null);
      setAct1PhaseId(null);
      setAct3PhaseId(null);
      setAct4RoundId(null);
    }
  }, []);

  const selectAct4Round = useCallback((roundId) => {
    setActiveActId("act4");
    setAct4RoundId(roundId);
  }, []);

  const selectAct2Scenario = useCallback((scenarioId) => {
    setActiveActId("act2");
    setAct2ScenarioId(scenarioId);
  }, []);

  const selectAct1SubScene = useCallback((subId) => {
    setActiveActId("act1");
    setAct1PhaseId(subId);
  }, []);

  const selectAct3SubScene = useCallback((subId) => {
    setActiveActId("act3");
    setAct3PhaseId(subId);
  }, []);

  useEffect(() => {
    const bgAudio = new Audio("/backgrounds/Scam Simulation Game (2).mp3");
    bgAudio.loop = true;
    bgAudio.volume = 0.20; // Soft volume for ambient background

    const playAudio = () => {
      bgAudio.play().then(() => {
        // Success: remove listeners
        window.removeEventListener("click", playAudio);
        window.removeEventListener("touchstart", playAudio);
      }).catch((err) => {
        console.log("Autoplay blocked, waiting for user interaction.", err);
      });
    };

    playAudio();
    window.addEventListener("click", playAudio);
    window.addEventListener("touchstart", playAudio);

    return () => {
      bgAudio.pause();
      window.removeEventListener("click", playAudio);
      window.removeEventListener("touchstart", playAudio);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      <aside className="flex h-full w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
        <div className="shrink-0 border-b border-slate-800 p-4">
          <h1 className="text-sm font-bold text-white">Spot the Scam</h1>
          <p className="mt-0.5 text-[10px] text-slate-500">
            Money Safety & Scams I
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
          {ACTS.map((act) => {
            const selected = act.id === activeActId;
            const isAct4 = act.id === "act4";
            const isAct3 = act.id === "act3";
            const isAct2 = act.id === "act2";
            const isAct1 = act.id === "act1";

            return (
              <div key={act.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveActId(act.id);
                    if (act.id === "act4") {
                      setAct4RoundId(null);
                      setAct2ScenarioId(null);
                      setAct1PhaseId(null);
                      setAct3PhaseId(null);
                    } else if (act.id === "act2") {
                      setAct2ScenarioId(ACT2_SCENARIOS[0]?.id ?? null);
                      setAct4RoundId(null);
                      setAct1PhaseId(null);
                      setAct3PhaseId(null);
                    } else if (act.id === "act1") {
                      setAct1PhaseId(ACT1_SUB_SCENES[0]?.id ?? null);
                      setAct4RoundId(null);
                      setAct2ScenarioId(null);
                      setAct3PhaseId(null);
                    } else if (act.id === "act3") {
                      setAct3PhaseId(ACT3_SUB_SCENES[0]?.id ?? null);
                      setAct4RoundId(null);
                      setAct2ScenarioId(null);
                      setAct1PhaseId(null);
                    } else {
                      setAct4RoundId(null);
                      setAct2ScenarioId(null);
                      setAct1PhaseId(null);
                      setAct3PhaseId(null);
                    }
                  }}
                  className={`w-full rounded-lg px-3 py-3 text-left transition ${selected && !act4RoundId && !act2ScenarioId && !act1PhaseId && !act3PhaseId
                    ? "bg-emerald-600 text-white"
                    : selected
                      ? "bg-emerald-700/80 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                    }`}
                >
                  <span className="block text-sm font-semibold">{act.title}</span>
                  <span
                    className={`mt-0.5 block text-[10px] ${selected ? "text-emerald-100" : "text-slate-500"
                      }`}
                  >
                    {act.subtitle}
                  </span>
                </button>

                {(act.id === "act1" || act.id === "act2" || act.id === "act3" || act.id === "act4") && (
                  <div className="flex justify-end pr-1 mt-0.5 mb-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setExpandedActs((prev) => ({ ...prev, [act.id]: !prev[act.id] }));
                      }}
                      className="flex items-center gap-0.5 text-[8px] tracking-wide text-slate-700 hover:text-slate-500 transition select-none uppercase font-semibold"
                    >
                      <span>{expandedActs[act.id] ? "hide scenes" : "show scenes"}</span>
                      {expandedActs[act.id] ? (
                        <svg
                          className="h-2 w-2 stroke-current"
                          fill="none"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                      ) : (
                        <svg
                          className="h-2 w-2 stroke-current"
                          fill="none"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      )}
                    </button>
                  </div>
                )}

                {isAct1 && expandedActs.act1 && (
                  <ul className="mb-1 ml-2 mt-0.5 space-y-0.5 border-l border-slate-700/80 pl-2">
                    {ACT1_SUB_SCENES.map((sub) => {
                      const subSelected =
                        activeActId === "act1" && act1PhaseId === sub.id;
                      return (
                        <li key={sub.id}>
                          <button
                            type="button"
                            onClick={() => selectAct1SubScene(sub.id)}
                            className={`w-full rounded-md px-2 py-1.5 text-left text-[10px] leading-snug transition ${subSelected
                              ? "bg-amber-500/20 font-semibold text-amber-200"
                              : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                              }`}
                          >
                            <span className="font-bold text-amber-400/90">
                              {sub.number}.
                            </span>{" "}
                            {sub.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {isAct2 && expandedActs.act2 && (
                  <ul className="mb-1 ml-2 mt-0.5 space-y-0.5 border-l border-slate-700/80 pl-2">
                    {ACT2_SCENARIOS.map((scenario) => {
                      const scenarioSelected =
                        activeActId === "act2" && act2ScenarioId === scenario.id;
                      const hasShield = act2CompletedIds.includes(scenario.id);
                      return (
                        <li key={scenario.id}>
                          <button
                            type="button"
                            onClick={() => selectAct2Scenario(scenario.id)}
                            className={`flex items-center justify-between w-full rounded-md px-2 py-1.5 text-left text-[10px] leading-snug transition ${scenarioSelected
                              ? "bg-amber-500/20 font-semibold text-amber-200"
                              : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                              }`}
                          >
                            <span className="min-w-0 flex-1 truncate">
                              <span className="font-bold text-amber-400/90 mr-1">
                                {scenario.number}.
                              </span>{" "}
                              {scenario.title}
                            </span>
                            {hasShield && (
                              <span className="ml-2 shrink-0 flex gap-0.5" aria-label="Shield earned">
                                🛡️
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {isAct3 && expandedActs.act3 && (
                  <ul className="mb-1 ml-2 mt-0.5 space-y-0.5 border-l border-slate-700/80 pl-2">
                    {ACT3_SUB_SCENES.map((sub) => {
                      const subSelected =
                        activeActId === "act3" && act3PhaseId === sub.id;
                      return (
                        <li key={sub.id}>
                          <button
                            type="button"
                            onClick={() => selectAct3SubScene(sub.id)}
                            className={`w-full rounded-md px-2 py-1.5 text-left text-[10px] leading-snug transition ${subSelected
                              ? "bg-amber-500/20 font-semibold text-amber-200"
                              : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                              }`}
                          >
                            <span className="font-bold text-amber-400/90">
                              {sub.number}.
                            </span>{" "}
                            {sub.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {isAct4 && expandedActs.act4 && (
                  <ul className="mb-1 ml-2 mt-0.5 space-y-0.5 border-l border-slate-700/80 pl-2">
                    {ACT4_SUB_SCENES.map((sub) => {
                      const subSelected =
                        activeActId === "act4" && act4RoundId === sub.id;
                      const resultForRound = act4RoundResults.find((r) => r.roundId === sub.id);
                      const shieldCount = resultForRound?.shieldEarned ? 1 : 0;
                      return (
                        <li key={sub.id}>
                          <button
                            type="button"
                            onClick={() => selectAct4Round(sub.id)}
                            className={`flex items-center justify-between w-full rounded-md px-2 py-1.5 text-left text-[10px] leading-snug transition ${subSelected
                              ? "bg-amber-500/20 font-semibold text-amber-200"
                              : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                              }`}
                          >
                            <span className="min-w-0 flex-1 truncate">
                              {sub.number != null && (
                                <span className="font-bold text-amber-400/90 mr-1">
                                  {sub.number}.
                                </span>
                              )}
                              {sub.title}
                            </span>
                            {shieldCount > 0 && (
                              <span className="ml-2 shrink-0 flex gap-0.5" aria-label="Shields earned">
                                {Array.from({ length: shieldCount }).map((_, i) => (
                                  <span key={i}>🛡️</span>
                                ))}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="shrink-0 space-y-1.5 border-t border-slate-800 p-3">
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
          <a
            href="?chats=1"
            className="block text-[10px] text-slate-500 hover:text-slate-300 hover:underline"
          >
            Chat catalog (dev)
          </a>
        </div>
      </aside>

      <main
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url('/backgrounds/gemini-2.5-flash-image_remove_the_rectangle_shape-0.jpg')` }}
      >
        <div className="absolute inset-0 bg-slate-950/75 pointer-events-none" />
        <div className="relative z-10 min-h-0 flex-1 overflow-hidden flex flex-col">
          {activeActId === "act1" ? (
            <Act1Hook
              onComplete={() => setActiveActId("act2")}
              focusPhaseId={act1PhaseId}
              onFocusPhaseChange={setAct1PhaseId}
            />
          ) : activeActId === "act2" ? (
            <Act2ScenarioExperience
              onComplete={() => setActiveActId("act3")}
              focusScenarioId={act2ScenarioId}
              onFocusScenarioChange={setAct2ScenarioId}
              completedScenarioIds={act2CompletedIds}
              onCompletedScenarioIdsChange={setAct2CompletedIds}
            />
          ) : activeActId === "act3" ? (
            <Act3PriyaExplains
              onComplete={() => setActiveActId("act4")}
              focusPhaseId={act3PhaseId}
              onFocusPhaseChange={setAct3PhaseId}
            />
          ) : activeActId === "act4" ? (
            <Act4Challenge
              focusRoundId={act4RoundId}
              onFocusRoundChange={setAct4RoundId}
              roundResults={act4RoundResults}
              onRoundResultsChange={setAct4RoundResults}
            />
          ) : (
            <ActPanel actId={activeActId} />
          )}
        </div>
      </main>
    </div>
  );
}
