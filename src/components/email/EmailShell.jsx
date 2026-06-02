import StatusBar from "../phone/StatusBar.jsx";

/** Gmail-style mail app chrome (static). */
export default function EmailShell({ title = "Gmail", children, footer, onBack }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white pt-12 text-slate-900">
      <StatusBar dark />
      <header className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3 py-2">
        {onBack ? (
          <button type="button" onClick={onBack} className="text-xl" aria-label="Back">
            ‹
          </button>
        ) : (
          <span className="text-xl">☰</span>
        )}
        <span className="text-2xl font-normal text-red-600">M</span>
        <span className="flex-1 truncate text-sm font-medium text-slate-700">{title}</span>
        <span className="text-lg">🔍</span>
      </header>
      <div className={`min-h-0 flex-1 overflow-y-auto ${footer ? "" : "pb-16"}`}>
        {children}
      </div>
      {footer}
    </div>
  );
}
