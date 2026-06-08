import StatusBar from "../phone/StatusBar.jsx";

/** WhatsApp-style app chrome (green header). */
export default function WhatsAppShell({
  title,
  subtitle,
  time,
  showSearch = false,
  onBack,
  bodyRef,
  onBodyScroll,
  footer,
  children,
}) {
  let resolvedTime = time;
  if (!resolvedTime && typeof subtitle === "string") {
    const timeMatch = subtitle.match(/\b(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm])\b/i);
    if (timeMatch) resolvedTime = timeMatch[0];
  }

  return (
    <div className="relative flex h-full flex-col bg-[#e5ddd5] pt-12">
      <StatusBar dark time={resolvedTime} />
      <header className="shrink-0 bg-[#075e54] shadow-md">
        <div className="flex items-center gap-3 px-4 pb-2 pt-1 text-white">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="text-sm opacity-90"
              aria-label="Back"
            >
              ‹
            </button>
          ) : (
            <span className="text-sm opacity-80">‹</span>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold">{title}</h1>
            {subtitle && (
              <p className="truncate text-xs text-white/75">{subtitle}</p>
            )}
          </div>
          <span className="text-lg opacity-90">⋮</span>
        </div>
        {showSearch && (
          <div className="px-4 pb-3">
            <div className="flex items-center rounded-lg bg-white/15 px-3 py-2 text-sm text-white/90">
              <span className="mr-2 opacity-70">🔍</span>
              Search or start new chat
            </div>
          </div>
        )}
      </header>
      <div
        ref={bodyRef}
        onScroll={onBodyScroll}
        className="min-h-0 flex-1 overflow-y-auto"
      >
        {children}
      </div>
      {footer}
    </div>
  );
}
