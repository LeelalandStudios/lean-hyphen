import { useCallback, useEffect, useMemo, useState } from "react";
import ScamCardDeck, { CardProgressBar, THROW_DELAY_MS } from "./ScamCardDeck.jsx";
import ScamCardDetail from "./ScamCardDetail.jsx";

const TABLE_SETTLE_MS = 400;

/**
 * Wooden table + cards thrown into grid slots + expand overlay.
 * @param {{
 *   cards: { id: string, emoji: string, label: string, sections: unknown[] }[],
 *   completedIds: string[],
 *   cardStars: Record<string, number>,
 *   activeCardId: string | null,
 *   onCardUnderstood: (id: string, stars: number) => void,
 * }} props
 */
export default function Act3CardTable({
  cards,
  completedIds,
  cardStars,
  activeCardId,
  onCardUnderstood,
}) {
  const [dealtCount, setDealtCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [overlayAnim, setOverlayAnim] = useState("closed");

  const viewingCard = useMemo(
    () => cards.find((c) => c.id === expandedId) ?? null,
    [cards, expandedId]
  );

  useEffect(() => {
    setDealtCount(0);
    setReady(false);
    const timers = [];
    for (let i = 0; i < cards.length; i += 1) {
      timers.push(
        window.setTimeout(() => setDealtCount(i + 1), TABLE_SETTLE_MS + i * THROW_DELAY_MS)
      );
    }
    timers.push(
      window.setTimeout(
        () => setReady(true),
        TABLE_SETTLE_MS + cards.length * THROW_DELAY_MS + 200
      )
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [cards.length]);

  const openCard = useCallback((id) => {
    setExpandedId(id);
    setOverlayAnim("opening");
    window.requestAnimationFrame(() => {
      window.setTimeout(() => setOverlayAnim("open"), 20);
    });
  }, []);

  const closeCard = useCallback(() => {
    setOverlayAnim("closing");
    window.setTimeout(() => {
      setExpandedId(null);
      setOverlayAnim("closed");
    }, 420);
  }, []);

  const handleUnderstand = useCallback((stars) => {
    if (!expandedId) return;
    onCardUnderstood(expandedId, stars);
    closeCard();
  }, [closeCard, expandedId, onCardUnderstood]);

  const allDealt = dealtCount >= cards.length;
  const earnedStars = cards.reduce((sum, card) => sum + (cardStars[card.id] ?? 0), 0);
  const totalStars = cards.length * 3;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        className={`flex min-h-0 flex-1 gap-4 transition-all duration-500 ease-out ${
          expandedId
            ? "pointer-events-none scale-[0.86] opacity-35 blur-[3px]"
            : "scale-100 opacity-100 blur-0"
        }`}
      >
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 55%, rgba(255,220,180,0.12), transparent 65%)",
            }}
          />

          <div className="relative flex min-h-0 flex-1 flex-col items-center justify-start pt-8 sm:pt-12">
            <ScamCardDeck
              cards={cards}
              completedIds={completedIds}
              activeCardId={activeCardId}
              onSelectCard={openCard}
              dealtCount={dealtCount}
              ready={ready}
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2 py-4">
          <CardProgressBar
            total={totalStars}
            completed={earnedStars}
            visible={allDealt}
          />
          <span
            className={`text-[10px] font-bold tabular-nums text-white/50 transition-opacity ${
              allDealt ? "opacity-100" : "opacity-0"
            }`}
          >
            {earnedStars}/{totalStars} ★
          </span>
        </div>
      </div>

      {expandedId && viewingCard && (
        <div
          className={`absolute inset-0 z-30 flex items-center justify-center p-6 transition-opacity duration-400 ${
            overlayAnim === "closing" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-black/25" />
          <div
            className={`relative flex h-[min(92%,720px)] w-full max-w-xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_32px_120px_rgba(0,0,0,0.45)] transition-transform ease-out ${
              overlayAnim === "open"
                ? "scale-100"
                : overlayAnim === "closing"
                  ? "scale-90 opacity-0"
                  : "scale-[0.42]"
            }`}
            style={{
              transitionDuration: overlayAnim === "open" ? "450ms" : "420ms",
            }}
          >
            <ScamCardDetail card={viewingCard} onUnderstand={handleUnderstand} />
          </div>
        </div>
      )}
    </div>
  );
}
