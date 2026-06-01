const THROW_DELAY_MS = 520;

function CardBack({ status, ready }) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isActive = status === "active";

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
    </div>
  );
}

function DeckCard({ card, slotIndex, status, ready, onSelect }) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isActive = status === "active";
  const canTap = isActive && ready;

  let borderAccent = "border-slate-600/40";
  if (isActive && ready) borderAccent = "border-amber-400/90";
  if (isCompleted) borderAccent = "border-emerald-500/50";

  return (
    <div
      className="relative flex justify-center"
      style={{
        animation: `act3CardThrow${slotIndex} 620ms cubic-bezier(.22, 1, .32, 1) both`,
      }}
    >
      <button
        type="button"
        disabled={!canTap}
        onClick={() => canTap && onSelect(card.id)}
        className={`relative block h-[200px] w-full max-w-[220px] overflow-hidden rounded-[28px] border-2 bg-slate-900 p-0 shadow-xl transition-shadow duration-300 ${borderAccent} ${
          !canTap && ready && !isCompleted
            ? "cursor-not-allowed opacity-50 grayscale"
            : ""
        } ${
          isActive && ready
            ? "ring-4 ring-amber-300/90 ring-offset-2 ring-offset-[#4a3220] hover:shadow-2xl"
            : ""
        } ${isCompleted ? "opacity-90" : ""}`}
      >
        <CardBack status={status} ready={ready} />
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
 * Cards on the table — thrown one at a time into a loose grid (face-down).
 * @param {{
 *   cards: { id: string, emoji: string, label: string }[],
 *   completedIds: string[],
 *   activeCardId: string | null,
 *   onSelectCard: (id: string) => void,
 *   dealtCount: number,
 *   ready: boolean,
 * }} props
 */
export default function ScamCardDeck({
  cards,
  completedIds,
  activeCardId,
  onSelectCard,
  dealtCount,
  ready,
}) {
  const completedSet = new Set(completedIds);

  function cardStatus(cardId) {
    if (completedSet.has(cardId)) return "completed";
    if (cardId === activeCardId) return "active";
    return "locked";
  }

  return (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-10 px-4 sm:grid-cols-3 sm:gap-8 sm:px-8">
      {cards.map((card, slotIndex) => {
        if (slotIndex >= dealtCount) {
          return <div key={card.id} className="min-h-[200px]" aria-hidden />;
        }
        return (
          <DeckCard
            key={card.id}
            card={card}
            slotIndex={slotIndex}
            status={cardStatus(card.id)}
            ready={ready}
            onSelect={onSelectCard}
          />
        );
      })}
    </div>
  );
}

export { THROW_DELAY_MS };

export function CardProgressBar({ total, completed, visible }) {
  const pct = total > 0 ? (completed / total) * 100 : 0;
  return (
    <div
      className={`relative h-full min-h-[220px] w-3 shrink-0 rounded-full bg-slate-900/50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-label={`${completed} of ${total} stars earned`}
      aria-hidden={!visible}
    >
      <div
        className="absolute bottom-0 left-0 right-0 rounded-full bg-gradient-to-t from-sky-600 via-sky-500 to-sky-300 transition-[height] duration-700 ease-out"
        style={{ height: `${pct}%` }}
      />
    </div>
  );
}
