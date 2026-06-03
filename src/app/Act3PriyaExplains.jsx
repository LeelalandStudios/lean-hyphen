import { useCallback, useEffect, useMemo, useState } from "react";
import Act3CardTable from "../components/act3/Act3CardTable.jsx";
import RoomDialogue from "../components/room/RoomDialogue.jsx";
import {
  ACT3_CARDS,
  ACT3_INTRO_SCRIPT,
  ACT3_OUTRO_SCRIPT,
} from "../content/act3/act3Patterns.js";

/**
 * Act 3 — Priya explains patterns (room dialogue + sequential scam card stacks).
 * @param {{ onComplete?: () => void }} props
 */
export default function Act3PriyaExplains({ onComplete, focusPhaseId, onFocusPhaseChange }) {
  const [internalPhase, setInternalPhase] = useState("intro");
  const [completedIds, setCompletedIds] = useState([]);

  const phase = focusPhaseId || internalPhase;
  const setPhase = onFocusPhaseChange || setInternalPhase;

  const activeCardId = useMemo(() => {
    for (const card of ACT3_CARDS) {
      if (!completedIds.includes(card.id)) return card.id;
    }
    return null;
  }, [completedIds]);

  const allCardsDone = completedIds.length >= ACT3_CARDS.length;

  useEffect(() => {
    if (phase === "cards" && allCardsDone) {
      setPhase("outro");
    }
  }, [phase, allCardsDone]);

  const handleCardComplete = useCallback((cardId) => {
    setCompletedIds((prev) => (prev.includes(cardId) ? prev : [...prev, cardId]));
  }, []);

  const frameClass =
    "relative flex h-full min-h-0 flex-col overflow-hidden bg-transparent";

  if (phase === "intro") {
    return (
      <div className={frameClass}>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-black/60" />
        <RoomDialogue
          script={ACT3_INTRO_SCRIPT}
          onComplete={() => setPhase("cards")}
          header={
            <div className="text-center select-none pb-2">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/50">
                🔥 Squad Goals · 12:14 AM
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-white">
                Priya explains the patterns
              </h2>
            </div>
          }
        />
      </div>
    );
  }

  if (phase === "outro") {
    return (
      <div className={frameClass}>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-black/60" />
        <RoomDialogue
          script={ACT3_OUTRO_SCRIPT}
          finalButtonLabel="Test yourself →"
          onComplete={() => onComplete?.()}
          header={
            <div className="text-center select-none pb-2">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/50">
                🔥 Squad Goals
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-white">
                The pattern
              </h2>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className={`${frameClass} act3-table-enter`}>
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #5c3d28 0%, #4a3220 40%, #1a1410 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.02) 8px, rgba(0,0,0,0.06) 16px)",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden py-5 pl-5 pr-0">
        <header className="shrink-0 pb-2 text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-200/80">
            Scam cards
          </p>
          <p className="mt-1 text-sm text-white/70">
            Priya deals the cards — tap each stack in order.
          </p>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden">
        <Act3CardTable
          cards={ACT3_CARDS}
          completedIds={completedIds}
          activeCardId={activeCardId}
          onCardComplete={handleCardComplete}
        />
        </div>
      </div>
    </div>
  );
}
