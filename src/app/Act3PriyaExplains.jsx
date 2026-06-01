import { useCallback, useEffect, useMemo, useState } from "react";
import Act3CardTable from "../components/act3/Act3CardTable.jsx";
import RoomDialogue from "../components/room/RoomDialogue.jsx";
import {
  ACT3_CARDS,
  ACT3_INTRO_SCRIPT,
  ACT3_OUTRO_SCRIPT,
} from "../content/act3/act3Patterns.js";

/**
 * Act 3 — Priya explains patterns (room dialogue + sequential scam cards).
 * @param {{ onComplete?: () => void }} props
 */
export default function Act3PriyaExplains({ onComplete }) {
  const [phase, setPhase] = useState("intro");
  const [completedIds, setCompletedIds] = useState([]);
  const [cardStars, setCardStars] = useState({});

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

  const handleCardUnderstood = useCallback((cardId, stars) => {
    setCompletedIds((prev) => (prev.includes(cardId) ? prev : [...prev, cardId]));
    setCardStars((prev) => ({
      ...prev,
      [cardId]: Math.max(0, Math.min(3, Number(stars) || 0)),
    }));
  }, []);

  const frameClass =
    "relative flex h-full min-h-0 flex-col overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black";

  if (phase === "intro") {
    return (
      <div className={frameClass}>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-black/60" />
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-32 pt-10">
          <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/50">
            🔥 Squad Goals · 12:14 AM
          </p>
          <h2 className="mt-2 text-center text-2xl font-extrabold text-white">
            Priya explains the patterns
          </h2>
        </div>
        <RoomDialogue
          script={ACT3_INTRO_SCRIPT}
          onComplete={() => setPhase("cards")}
        />
      </div>
    );
  }

  if (phase === "outro") {
    return (
      <div className={frameClass}>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-black/60" />
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-32 pt-10">
          <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/50">
            🔥 Squad Goals
          </p>
          <h2 className="mt-2 text-center text-2xl font-extrabold text-white">
            The pattern
          </h2>
        </div>
        <RoomDialogue
          script={ACT3_OUTRO_SCRIPT}
          finalButtonLabel="Test yourself →"
          onComplete={() => onComplete?.()}
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

      <div className="relative z-10 flex min-h-0 flex-1 flex-col p-5 pr-3">
        <header className="shrink-0 pb-2 text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-200/80">
            Scam cards
          </p>
          <p className="mt-1 text-sm text-white/70">
            Priya deals the cards — tap each one in order.
          </p>
        </header>

        <Act3CardTable
          cards={ACT3_CARDS}
          completedIds={completedIds}
          cardStars={cardStars}
          activeCardId={activeCardId}
          onCardUnderstood={handleCardUnderstood}
        />
      </div>
    </div>
  );
}
