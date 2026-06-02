const MAX_TABLE_STACK_LAYERS = 5;

function CardBack({ status, ready, label, sectionCount }) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[26px] border-2 border-slate-600 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-4 shadow-lg">
      <span className="text-3xl drop-shadow">
        {isLocked ? "🔒" : isCompleted ? "✓" : "🃏"}
      </span>
      {ready && (
        <span className="text-center text-[10px] font-extrabold uppercase tracking-wider text-white/80">
          {isCompleted ? "Done" : isLocked ? "Locked" : "Tap to read"}
        </span>
      )}
      {!ready && <span className="text-[10px] font-bold text-white/40">…</span>}
      {ready && (
        <p className="text-center text-xs font-bold text-white/90">{label}</p>
      )}
      {ready && sectionCount > 1 && (
        <span className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-bold text-white/90">
          {sectionCount} cards
        </span>
      )}
    </div>
  );
}

function DeckCard({ card, slotIndex, status, ready, visibleLayerCount, onSelect }) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isActive = status === "active";
  const sectionCount = card.sections.length;
  const isDealt = visibleLayerCount >= sectionCount;
  const canTap = isActive && ready;
  const showAsReady = isDealt;
  const layersToRender = Math.min(visibleLayerCount, sectionCount, MAX_TABLE_STACK_LAYERS);

  let borderAccent = "border-slate-600/40";
  if (isActive && showAsReady) borderAccent = "border-amber-400/90";
  if (isCompleted) borderAccent = "border-emerald-500/50";

  return (
    <div className="relative w-full max-w-[220px] shrink-0 pb-7">
      <button
        type="button"
        disabled={!canTap}
        onClick={() => canTap && onSelect(card.id)}
        className={`relative block h-[200px] w-full overflow-hidden rounded-[28px] border-2 bg-transparent p-0 shadow-xl transition-shadow duration-300 ${borderAccent} ${
          !canTap && showAsReady && !isCompleted
            ? "cursor-not-allowed opacity-50 grayscale"
            : ""
        } ${
          isActive && showAsReady
            ? "shadow-[0_0_0_4px_rgba(251,191,36,0.85)] hover:shadow-[0_0_0_4px_rgba(251,191,36,0.85),0_18px_40px_rgba(0,0,0,0.35)]"
            : ""
        } ${isCompleted ? "opacity-90" : ""}`}
      >
        <div className="relative h-full w-full">
          {Array.from({ length: layersToRender }).map((_, index) => {
            const isNewest = index === layersToRender - 1;
            const visualIndex = Math.min(index, 4);
            const stackX = "0px";
            const stackY = "0px";
            const stackRot = `${(visualIndex - 2) * 1.6}deg`;
            const stackScale = 1 - (layersToRender - index - 1) * 0.012;

            if (isNewest) {
              return (
                <div
                  key={index}
                  className="absolute inset-0 overflow-hidden rounded-[26px]"
                  style={{
                    transform: `translate(${stackX}, ${stackY}) rotate(${stackRot}) scale(${stackScale})`,
                    transformOrigin: "50% 56%",
                    zIndex: index + 1,
                    ["--stack-x"]: stackX,
                    ["--stack-y"]: stackY,
                    ["--stack-rot"]: stackRot,
                  }}
                >
                  <div
                    className={
                      visibleLayerCount === index + 1
                        ? "act3-stack-layer-in h-full w-full overflow-hidden"
                        : "h-full w-full"
                    }
                  >
                    <CardBack
                      status={status}
                      ready={showAsReady}
                      label={card.label}
                      sectionCount={sectionCount}
                    />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`absolute inset-0 rounded-[26px] border-2 border-slate-600 bg-slate-800 ${
                  visibleLayerCount === index + 1 ? "act3-stack-layer-in" : ""
                }`}
                style={{
                  transform: `translate(${stackX}, ${stackY}) rotate(${stackRot}) scale(${stackScale})`,
                  transformOrigin: "50% 56%",
                  boxShadow: `0 ${6 + visualIndex * 2}px ${14 + visualIndex * 2}px rgba(15, 23, 42, 0.24)`,
                  zIndex: index,
                  ["--stack-x"]: stackX,
                  ["--stack-y"]: stackY,
                  ["--stack-rot"]: stackRot,
                }}
              />
            );
          })}
        </div>
      </button>

      {ready && isActive && (
        <p className="pointer-events-none absolute -bottom-7 left-0 right-0 text-center text-xs font-bold text-amber-100/90">
          Tap to read
        </p>
      )}
    </div>
  );
}

/**
 * Topic stacks on the table — each stack has one card per section.
 * @param {{
 *   cards: { id: string, emoji: string, label: string, sections: unknown[] }[],
 *   completedIds: string[],
 *   activeCardId: string | null,
 *   onSelectCard: (id: string) => void,
 *   dealtLayersByCardId: Record<string, number>,
 *   ready: boolean,
 * }} props
 */
export default function ScamCardDeck({
  cards,
  completedIds,
  activeCardId,
  onSelectCard,
  dealtLayersByCardId,
  ready,
}) {
  const completedSet = new Set(completedIds);

  function cardStatus(cardId) {
    if (completedSet.has(cardId)) return "completed";
    if (cardId === activeCardId) return "active";
    return "locked";
  }

  return (
    <div className="grid w-full min-w-0 max-w-5xl grid-cols-1 justify-items-start gap-10 px-2 sm:px-4 lg:grid-cols-3 lg:gap-6 lg:px-4">
      {cards.map((card, slotIndex) => {
        const visibleLayerCount = dealtLayersByCardId[card.id] ?? 0;
        if (visibleLayerCount < 1) {
          return <div key={card.id} className="min-h-[200px]" aria-hidden />;
        }
        return (
          <DeckCard
            key={card.id}
            card={card}
            slotIndex={slotIndex}
            status={cardStatus(card.id)}
            ready={ready}
            visibleLayerCount={visibleLayerCount}
            onSelect={onSelectCard}
          />
        );
      })}
    </div>
  );
}

export function CardProgressBar({ total, completed }) {
  const pct = total > 0 ? (completed / total) * 100 : 0;
  return (
    <div
      className="relative mx-auto min-h-0 w-1.5 max-w-full flex-1 self-stretch rounded-full bg-slate-900/60"
      aria-label={`${completed} of ${total} sections complete`}
    >
      <div
        className="absolute bottom-0 left-0 right-0 rounded-full bg-red-500 transition-[height] duration-700 ease-out"
        style={{ height: `${pct}%` }}
      />
    </div>
  );
}
