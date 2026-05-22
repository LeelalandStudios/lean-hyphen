import { scripts } from "../../content/scripts.js";
import StatusBar from "../../components/phone/StatusBar.jsx";

export default function GamingBadScreen() {
  return (
    <div className="relative h-full bg-slate-950 p-6 pt-16 text-white">
      <StatusBar />

      <div className="rounded-3xl bg-white p-5 text-slate-900">
        <p className="text-sm">{scripts.gamingLink}</p>
        <div className="mt-4 rounded-2xl bg-slate-100 p-4 font-mono text-sm">
          FreeFire_Mod_v12.apk
        </div>
        <button
          type="button"
          className="mt-3 w-full rounded-2xl bg-slate-900 p-3 text-white"
        >
          Allow Unknown Sources
        </button>
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
          Verifying now. Please wait.
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-white/95 p-4 text-sm text-slate-900">
        📱 Free Fire — logged in from new device. Diamonds transferred.
      </div>
    </div>
  );
}
