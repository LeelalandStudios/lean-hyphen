import StatusBar from "./StatusBar.jsx";

export default function AppScreen({
  title,
  children,
  onBack,
  appIcon,
  footer,
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white pt-12 text-slate-900">
      <StatusBar dark />
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4 pb-3">
        {onBack ? (
          <button type="button" onClick={onBack} className="text-sm">
            ‹ Back
          </button>
        ) : (
          <span className="w-10 text-sm text-slate-400">‹ Back</span>
        )}
        {appIcon && <span className="text-xl">{appIcon}</span>}
        <h1 className="text-xl font-bold">{title}</h1>
      </header>
      <div
        className={`min-h-0 flex-1 overflow-y-auto ${footer ? "" : "pb-24"}`}
      >
        {children}
      </div>
      {footer}
    </div>
  );
}
