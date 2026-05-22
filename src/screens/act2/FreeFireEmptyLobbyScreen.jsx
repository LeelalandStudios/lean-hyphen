import StatusBar from "../../components/phone/StatusBar.jsx";

/** Gaming scam — emptied account lobby (static). */
export default function FreeFireEmptyLobbyScreen() {
  return (
    <div className="relative h-full bg-gradient-to-b from-slate-700 to-slate-950 p-5 pt-16 text-white">
      <StatusBar />
      <div className="rounded-3xl border-2 border-red-900/50 bg-black/40 p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-400">Free Fire</h1>
        <p className="mt-4 text-6xl opacity-30">👤</p>
        <p className="mt-4 text-red-400">0 💎 · No skins</p>
        <p className="mt-2 text-sm text-slate-500">Rank reset</p>
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm">
        📱 Free Fire — logged in from new device. Diamonds transferred. Recovery
        may take 30 days.
      </div>
    </div>
  );
}
