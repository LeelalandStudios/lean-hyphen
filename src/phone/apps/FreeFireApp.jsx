import StatusBar from "../../components/phone/StatusBar.jsx";

export default function FreeFireApp({ onBack }) {
  return (
    <div className="relative h-full bg-gradient-to-b from-orange-700 via-red-900 to-slate-950 p-5 pt-16 text-white">
      <StatusBar />
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-[54px] z-30 rounded-full bg-black/25 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/35"
        >
          ‹ Back
        </button>
      )}
      <div className="rounded-3xl border border-orange-400/40 bg-black/40 p-6 text-center">
        <h1 className="text-2xl font-bold tracking-wide">Free Fire</h1>
        <p className="mt-2 text-sm text-white/70">Lobby · BR Ranked</p>
        <p className="mt-4 text-3xl font-bold text-amber-300">420 💎</p>
        <p className="mt-1 text-xs text-white/50">Level 47 · Gold III</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          ["🎯", "BR Ranked"],
          ["⚔️", "Clash Squad"],
          ["👥", "Friends"],
          ["🛒", "Store"],
        ].map(([icon, label]) => (
          <div
            key={label}
            className="rounded-2xl bg-white/10 p-4 text-center text-sm font-semibold"
          >
            <div className="text-2xl">{icon}</div>
            <div className="mt-2">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
