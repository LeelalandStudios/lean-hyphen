/**
 * @param {{ mode: 'tap' | 'continue', onAdvance: () => void }} props
 */
export default function ScriptContinueBar({ mode, onAdvance }) {
  const label = mode === "tap" ? "Tap to continue" : "Continue";

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 p-4">
      <button
        type="button"
        onClick={onAdvance}
        className="w-full rounded-full bg-black/70 px-4 py-3 text-sm font-semibold text-white backdrop-blur active:bg-black/85"
      >
        {label}
      </button>
    </div>
  );
}
