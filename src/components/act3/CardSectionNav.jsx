const btnBase =
  "rounded-xl px-5 py-2.5 text-sm font-black transition shadow-sm disabled:cursor-not-allowed disabled:opacity-50";
const btnPrimary =
  `${btnBase} border border-amber-400 bg-amber-400 text-slate-950 hover:bg-amber-300`;
const btnSecondary =
  `${btnBase} border border-slate-300 bg-white text-slate-800 hover:bg-slate-50`;

/**
 * @param {{
 *   showBack: boolean,
 *   showNext: boolean,
 *   showClose: boolean,
 *   nextDisabled?: boolean,
 *   onBack: () => void,
 *   onNext: () => void,
 *   onClose: () => void,
 * }} props
 */
export default function CardSectionNav({
  showBack,
  showNext,
  showClose,
  nextDisabled = false,
  onBack,
  onNext,
  onClose,
}) {
  const pair = showBack && showNext;

  return (
    <nav
      className={`mx-auto flex w-full max-w-md items-stretch gap-3 ${
        showClose && !pair ? "justify-center" : ""
      }`}
      aria-label="Card pages"
    >
      {showBack && (
        <button type="button" onClick={onBack} className={`${btnSecondary} ${pair ? "flex-1" : ""}`}>
          ← Back
        </button>
      )}
      {showNext && (
        <button
          type="button"
          disabled={nextDisabled}
          onClick={onNext}
          className={`${btnPrimary} ${pair ? "flex-1" : "min-w-[140px] flex-1"}`}
        >
          Next →
        </button>
      )}
      {showClose && (
        <button
          type="button"
          onClick={onClose}
          className={`${btnPrimary} ${pair ? "" : "w-full max-w-md"}`}
        >
          Close
        </button>
      )}
    </nav>
  );
}
