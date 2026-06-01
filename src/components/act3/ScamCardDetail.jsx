import { useEffect, useRef, useState } from "react";
import MarkdownContent from "./MarkdownContent.jsx";
import UnderstandButton from "./UnderstandButton.jsx";

const SECTION_DELAY_MS = 900;
const FADE_MS = 700;

/**
 * Expanded card — sections fade in; Understand button charges when done.
 * @param {{
 *   card: { id: string, emoji: string, label: string, sections: { id: string, title: string, markdown: string }[] },
 *   onUnderstand: (stars: number) => void,
 * }} props
 */
export default function ScamCardDetail({ card, onUnderstand }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const scrollRef = useRef(null);
  const total = card.sections.length;
  const allRevealed = revealedCount >= total;

  useEffect(() => {
    setRevealedCount(0);
  }, [card.id]);

  useEffect(() => {
    if (revealedCount >= total) return undefined;
    const t = window.setTimeout(() => {
      setRevealedCount((n) => n + 1);
    }, revealedCount === 0 ? 400 : SECTION_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [card.id, revealedCount, total]);

  useEffect(() => {
    if (revealedCount === 0) return undefined;
    const t = window.setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [revealedCount]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="relative shrink-0 flex items-center justify-center gap-2 border-b border-slate-200/80 px-5 py-4">
        <span className="text-3xl">{card.emoji}</span>
        <div className="text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            Scam card
          </p>
          <p className="text-lg font-extrabold text-slate-900">{card.label}</p>
        </div>
        <span className="absolute right-5 text-[11px] font-semibold text-slate-500">
          {Math.min(revealedCount, total)}/{total}
        </span>
      </div>

      <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <div className="mx-auto max-w-lg space-y-6">
          {card.sections.map((section, index) => {
            if (index >= revealedCount) return null;
            return (
              <section
                key={section.id}
                className="rounded-2xl border border-slate-200 bg-white/95 px-4 py-4 shadow-sm"
                style={{ animation: `fadeIn ${FADE_MS}ms ease-out both` }}
              >
                {section.title !== "Card" && (
                  <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    {section.title}
                  </p>
                )}
                <MarkdownContent markdown={section.markdown} />
              </section>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 border-t border-slate-200/80 px-5 py-4">
        <UnderstandButton ready={allRevealed} onConfirm={onUnderstand} />
      </div>
    </div>
  );
}
