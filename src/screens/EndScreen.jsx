import StatusBar from "../components/phone/StatusBar.jsx";

export default function EndScreen() {
  return (
    <div className="relative h-full bg-emerald-950 p-8 pt-24 text-center text-white">
      <StatusBar />
      <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-white/10 text-5xl">
        🛡️
      </div>
      <h1 className="text-3xl font-bold">Simulation Complete</h1>
      <p className="mt-4 text-white/75">
        You learned to spot fake links, OTP pressure, QR traps, and gaming scams.
      </p>
      <button
        type="button"
        className="mt-8 rounded-2xl bg-white px-6 py-3 font-bold text-slate-950"
      >
        Restart
      </button>
    </div>
  );
}
