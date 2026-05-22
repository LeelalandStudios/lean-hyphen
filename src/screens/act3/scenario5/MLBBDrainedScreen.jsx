import { PATH_REPLY_DRAINED } from "../../../content/scenario5.js";
import StatusBar from "../../../components/phone/StatusBar.jsx";

export default function MLBBDrainedScreen() {
  return (
    <div className="relative h-full bg-gradient-to-b from-indigo-950 to-slate-950 p-5 pt-16 text-white">
      <StatusBar />
      <div className="rounded-3xl border-2 border-red-900/50 bg-black/50 p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-400">Mobile Legends</h1>
        <p className="mt-4 text-6xl opacity-30">⚔️</p>
        <p className="mt-4 text-red-400">0 💎 · Skins gone</p>
        <p className="mt-2 text-sm text-slate-500">Rank reset</p>
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm">📱 {PATH_REPLY_DRAINED}</div>
    </div>
  );
}
