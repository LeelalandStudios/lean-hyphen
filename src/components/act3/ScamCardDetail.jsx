import { useCallback, useEffect, useState } from "react";
import MarkdownContent from "./MarkdownContent.jsx";
import CardSectionNav from "./CardSectionNav.jsx";

/**
 * Expanded card — one section per step; scrollable body; Next / Back / Close in footer.
 * @param {{
 *   card: { id: string, emoji: string, label: string, sections: { id: string, title: string, markdown: string }[] },
 *   onComplete: () => void,
 * }} props
 */
export default function ScamCardDetail({ card, onComplete }) {
  const [pageIndex, setPageIndex] = useState(0);

  const totalSections = card.sections.length;
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === totalSections - 1;
  const currentSection = card.sections[pageIndex];

  useEffect(() => {
    setPageIndex(0);
  }, [card.id]);

  const goNext = useCallback(() => {
    if (isLastPage) return;
    setPageIndex((i) => Math.min(totalSections - 1, i + 1));
  }, [isLastPage, totalSections]);

  const goBack = useCallback(() => {
    if (isFirstPage) return;
    setPageIndex((i) => Math.max(0, i - 1));
  }, [isFirstPage]);

  return (
    <div className="flex max-h-[inherit] min-h-0 flex-1 flex-col">
      <div className="relative shrink-0 flex items-center justify-center gap-2 border-b border-slate-200/80 px-5 py-4">
        <span className="text-3xl">{card.emoji}</span>
        <div className="text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            Scam card
          </p>
          <p className="text-lg font-extrabold text-slate-900">{card.label}</p>
        </div>
        <span className="absolute right-5 text-[11px] font-semibold text-slate-500">
          {pageIndex + 1}/{totalSections}
        </span>
      </div>

      <div className="act3-scroll-panel min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-4 sm:px-5">
        {currentSection && (
          <div
            key={currentSection.id}
            className="act3-section-card-in rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
          >
            {currentSection.title !== "Card" && (
              <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                {currentSection.title}
              </p>
            )}
            <MarkdownContent markdown={currentSection.markdown} />
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-slate-200/80 bg-white px-5 py-4">
        <CardSectionNav
          showBack={!isFirstPage && !isLastPage}
          showNext={!isLastPage}
          showClose={isLastPage}
          onBack={goBack}
          onNext={goNext}
          onClose={onComplete}
        />
      </div>
    </div>
  );
}
