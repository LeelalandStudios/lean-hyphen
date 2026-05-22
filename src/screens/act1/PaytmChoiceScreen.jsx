import StatusBar from "../../components/phone/StatusBar.jsx";

export default function PaytmChoiceScreen() {
  return (
    <div className="relative h-full bg-black p-8 pt-20 text-white">
      <StatusBar />
      <div className="mt-24 rounded-3xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur">
        <p className="mb-3 text-xs uppercase tracking-widest text-white/50">
          Full-screen overlay (paused)
        </p>
        <h1 className="text-3xl font-bold">should I tap it or not</h1>
        <p className="mt-4 text-sm text-white/70">
          A self talk — should I tap it or not (Voiceover)
        </p>
        <div className="mt-8 grid gap-3">
          <button
            type="button"
            className="rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950"
          >
            Tap the link
          </button>
          <button
            type="button"
            className="rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950"
          >
            Do not tap it
          </button>
        </div>
      </div>
    </div>
  );
}
