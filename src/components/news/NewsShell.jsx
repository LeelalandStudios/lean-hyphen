import StatusBar from "../phone/StatusBar.jsx";

/** Simple news reader chrome. */
export default function NewsShell({ title, subtitle, children }) {
  return (
    <div className="relative flex h-full flex-col bg-white pt-12 text-slate-900">
      <StatusBar dark />
      <header className="shrink-0 border-b border-slate-200 bg-[#c41200] px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-90">‹</span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-90">
              {title}
            </p>
            {subtitle && (
              <p className="truncate text-sm font-semibold">{subtitle}</p>
            )}
          </div>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
