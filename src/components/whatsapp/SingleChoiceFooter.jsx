/** One action button pinned at bottom of a screen. */
export default function SingleChoiceFooter({ label }) {
  return (
    <footer className="shrink-0 border-t border-[#e9edef] bg-[#f0f2f5] p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <button
        type="button"
        className="w-full rounded-xl bg-[#25d366] px-3 py-3 text-sm font-semibold text-white active:bg-[#1da851]"
      >
        {label}
      </button>
    </footer>
  );
}
