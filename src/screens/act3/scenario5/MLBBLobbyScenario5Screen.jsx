import {
  HOME_MLBB_NOTIFICATION,
  MLBB_LOBBY_DIAMONDS,
} from "../../../content/scenario5.js";
import StatusBar from "../../../components/phone/StatusBar.jsx";

export default function MLBBLobbyScenario5Screen() {
  return (
    <div className="relative h-full overflow-y-auto bg-gradient-to-b from-indigo-800 via-violet-900 to-slate-950 p-5 pt-16 text-white">
      <StatusBar />
      <div className="rounded-3xl border border-amber-400/50 bg-black/40 p-5">
        <h1 className="text-2xl font-bold tracking-wide">Mobile Legends</h1>
        <p className="mt-2 text-sm text-white/70">Lobby · Ranked ready</p>
        <p className="mt-4 text-3xl font-bold text-amber-300">{MLBB_LOBBY_DIAMONDS} 💎</p>
      </div>
      <div className="mt-4 rounded-2xl border border-red-500/60 bg-red-950/80 p-4">
        <p className="text-xs font-bold uppercase text-red-300">In-game mail</p>
        <p className="mt-2 text-sm font-semibold">{HOME_MLBB_NOTIFICATION}</p>
        <p className="mt-2 text-xs text-red-200/80">Tap to open admin message →</p>
      </div>
    </div>
  );
}
