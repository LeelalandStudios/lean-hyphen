import { useCallback, useEffect, useMemo, useState } from "react";
import ScamCardDeck, { CardProgressBar } from "./ScamCardDeck.jsx";
import ScamCardDetail from "./ScamCardDetail.jsx";
import { playThwack, playCompleteCard, playProgressBar } from "../../utils/sound.js";

const TABLE_SETTLE_MS = 400;
const STACK_THROW_DELAY_MS = 120;
const BETWEEN_STACKS_DELAY_MS = 260;

/**
 * Wooden table + card stacks thrown into grid slots + expand overlay.
 */
export default function Act3CardTable({
  cards,
  completedIds,
  activeCardId,
  onCardComplete,
}) {
  const [dealtLayersByCardId, setDealtLayersByCardId] = useState({});
  const [ready, setReady] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [overlayAnim, setOverlayAnim] = useState("closed");

  const viewingCard = useMemo(
    () => cards.find((c) => c.id === expandedId) ?? null,
    [cards, expandedId]
  );

  useEffect(() => {
    setDealtLayersByCardId({});
    setReady(false);
    const timers = [];
    let delay = TABLE_SETTLE_MS;

    for (const card of cards) {
      const cardId = card.id;
      const finalLayers = card.sections.length;
      timers.push(
        window.setTimeout(() => {
          setDealtLayersByCardId((prev) => ({
            ...prev,
            [cardId]: finalLayers,
          }));
          playThwack();
        }, delay)
      );
      delay += BETWEEN_STACKS_DELAY_MS + 200;
    }

    timers.push(window.setTimeout(() => setReady(true), delay));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [cards]);

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

  const handleComplete = useCallback(() => {
    if (!expandedId) return;
    playCompleteCard();
    onCardComplete(expandedId);
    closeCard();
  }, [closeCard, expandedId, onCardComplete]);

  const allStacksDealt = cards.every(
    (card) => (dealtLayersByCardId[card.id] ?? 0) >= card.sections.length
  );

  const totalSections = cards.reduce((sum, card) => sum + card.sections.length, 0);
  const completedSections = cards.reduce(
    (sum, card) =>
      sum + (completedIds.includes(card.id) ? card.sections.length : 0),
    0
  );

  useEffect(() => {
    if (completedSections > 0) {
      playProgressBar();
    }
  }, [completedSections]);

  const tableDimmed = Boolean(expandedId);

  return (
    <div className="relative flex h-full min-h-0 flex-row overflow-hidden">
      <div
        className={`act3-scroll min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain transition-opacity duration-500 ${
          tableDimmed ? "pointer-events-none opacity-35 blur-[3px]" : ""
        }`}
      >
        <div className="relative w-full px-1 pb-6 pt-2 sm:px-2 lg:pb-8 lg:pt-4">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 20% 15%, rgba(255,220,180,0.12), transparent 70%)",
            }}
          />

          <div className="relative w-full py-4 sm:py-6 lg:py-2">
            <ScamCardDeck
              cards={cards}
              completedIds={completedIds}
              activeCardId={activeCardId}
              onSelectCard={openCard}
              dealtLayersByCardId={dealtLayersByCardId}
              ready={ready}
            />
          </div>
        </div>
      </div>

      {allStacksDealt && (
        <aside
          className={`flex h-full min-h-0 w-7 shrink-0 flex-col items-center gap-2 border-l border-amber-950/30 bg-black/15 py-3 pl-0.5 pr-1 ${
            tableDimmed ? "opacity-35" : ""
          }`}
          aria-label="Section progress"
        >
          <CardProgressBar total={totalSections} completed={completedSections} />
          <span className="shrink-0 text-center text-[9px] font-bold leading-none tabular-nums text-white/50">
            {completedSections}/{totalSections}
          </span>
        </aside>
      )}

      {expandedId && viewingCard && (
        <div
          className={`act3-scroll-panel absolute inset-0 z-30 overflow-x-hidden overflow-y-auto overscroll-y-contain transition-opacity duration-400 ${
            overlayAnim === "closing" ? "opacity-0" : "opacity-100"
          }`}
        >
          <button
            type="button"
            aria-label="Close card"
            className="fixed inset-0 bg-black/25"
            onClick={closeCard}
          />
          <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6">
            <div
              className={`relative flex w-full max-w-xl max-h-[min(92dvh,720px)] min-h-[min(320px,70dvh)] flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_32px_120px_rgba(0,0,0,0.45)] transition-transform ease-out ${
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
              <ScamCardDetail card={viewingCard} onComplete={handleComplete} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
