import { scripts } from "../../content/scripts.js";
import StatusBar from "../../components/phone/StatusBar.jsx";

/** Gaming scam — ban warning overlay on Free Fire lobby (static). */
export default function GamingBanOverlayScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-b from-orange-700 to-slate-950">
      <StatusBar />
      <div className="p-5 pt-14 opacity-40">
        <div className="rounded-3xl bg-black/30 p-4 text-white">
          <h1 className="text-2xl font-bold">Free Fire</h1>
          <p className="text-sm">340 💎 · Rank badge visible</p>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-6">
        <div className="w-full max-w-sm rounded-3xl border-2 border-orange-500 bg-slate-900 p-6 text-center text-white shadow-2xl">
          <p className="text-xs uppercase tracking-widest text-orange-400">
            Official overlay (static)
          </p>
          <p className="mt-4 text-sm">{scripts.gamingLink}</p>
          <button
            type="button"
            className="mt-6 w-full rounded-2xl bg-orange-600 py-3 font-bold"
          >
            Download file
          </button>
        </div>
      </div>
    </div>
  );
}
