import { scripts } from "../../content/scripts.js";
import StatusBar from "../../components/phone/StatusBar.jsx";
import MessageBody from "../../components/ui/MessageBody.jsx";

export default function GamingScreen() {
  return (
    <div className="relative h-full overflow-y-auto bg-gradient-to-b from-orange-700 to-slate-950 p-5 pt-16 text-white">
      <StatusBar />

      <div className="rounded-3xl bg-black/30 p-4">
        <h1 className="text-2xl font-bold">Free Fire</h1>
        <p className="text-sm">Character standing in lobby</p>
        <p className="text-sm">Rank badge visible</p>
        <p className="text-sm">Diamond count: 340 💎</p>
      </div>

      <div className="mt-4 rounded-2xl bg-white/95 p-4 text-slate-900 shadow-lg">
        <b className="text-sm">🎮 [FREEFIRE_ADMIN_OFFICIAL] ✓</b>
        <MessageBody text={scripts.gamingNotice} className="mt-2" />
        <p className="mt-2 text-xs text-red-600">
          Verification mark slightly off-colour if you zoom in (static).
        </p>
      </div>
    </div>
  );
}
