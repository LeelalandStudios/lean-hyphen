import { RAFI_SAVED_CONTACT } from "../../../content/scenario3.js";
import StatusBar from "../../../components/phone/StatusBar.jsx";

export default function IncomingCallRafiScreen() {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-slate-800 to-slate-950 pt-16 text-white">
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8">
        <div className="grid h-28 w-28 place-items-center rounded-full bg-[#25d366]/30 text-5xl">
          R
        </div>
        <div className="text-center">
          <p className="text-sm text-white/60">Incoming call</p>
          <h1 className="mt-1 text-3xl font-light">{RAFI_SAVED_CONTACT}</h1>
          <p className="mt-2 text-sm text-white/50">Saved contact · mobile</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 px-10 pb-16">
        <button type="button" className="flex flex-col items-center gap-2">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-red-600 text-2xl">
            ✕
          </span>
          <span className="text-xs">Decline</span>
        </button>
        <button type="button" className="flex flex-col items-center gap-2">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-green-600 text-2xl">
            📞
          </span>
          <span className="text-xs">Answer</span>
        </button>
      </div>
    </div>
  );
}
