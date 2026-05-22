import StatusBar from "../components/phone/StatusBar.jsx";

/** Act 2 — OTP scam: incoming call from unknown number (static). */
export default function IncomingCallScreen() {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-slate-800 to-slate-950 pt-16 text-white">
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8">
        <div className="grid h-28 w-28 place-items-center rounded-full bg-white/10 text-5xl">
          📞
        </div>
        <div className="text-center">
          <p className="text-sm text-white/60">Incoming call</p>
          <h1 className="mt-1 text-3xl font-light">Unknown Number</h1>
          <p className="mt-2 text-sm text-white/50">5G upgrade department</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 px-10 pb-16">
        <button
          type="button"
          className="flex flex-col items-center gap-2"
          aria-label="Decline call"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-red-600 text-2xl">
            ✕
          </span>
          <span className="text-xs">Decline</span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-2"
          aria-label="Answer call"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-green-600 text-2xl">
            📞
          </span>
          <span className="text-xs">Answer</span>
        </button>
      </div>
    </div>
  );
}
