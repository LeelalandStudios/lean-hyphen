import StatusBar from "../phone/StatusBar.jsx";

/** Mobile Legends in-game overlay chrome (static). */
export default function MLBBShell({ title = "Mobile Legends", children, footer }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 pt-12 text-white">
      <StatusBar />
      <header className="flex shrink-0 items-center gap-2 border-b border-white/10 px-4 py-2">
        <span className="text-lg">‹</span>
        <h1 className="text-sm font-bold tracking-wide">{title}</h1>
      </header>
      <div className={`min-h-0 flex-1 overflow-y-auto ${footer ? "" : "pb-4"}`}>{children}</div>
      {footer}
    </div>
  );
}
