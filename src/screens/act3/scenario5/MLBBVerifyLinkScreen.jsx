import StatusBar from "../../../components/phone/StatusBar.jsx";

export default function MLBBVerifyLinkScreen() {
  return (
    <div className="relative h-full bg-slate-950 p-6 pt-16 text-white">
      <StatusBar />
      <div className="rounded-3xl bg-white p-5 text-slate-900">
        <p className="text-sm">mlbb-security-verify.net</p>
        <p className="mt-2 font-semibold">MLBB Anti-Cheat Update</p>
        <div className="mt-4 rounded-2xl bg-slate-100 p-4 font-mono text-sm">
          MLBB_Security_v9.apk
        </div>
        <button type="button" className="mt-3 w-full rounded-2xl bg-slate-900 p-3 text-white">
          Allow Unknown Sources
        </button>
        <p className="mt-4 text-center text-xs text-slate-500">Verifying account…</p>
      </div>
      <p className="mt-5 rounded-2xl bg-red-950/80 p-4 text-sm text-red-200">
        Suspicious download — not from Play Store. Account access may be compromised.
      </p>
    </div>
  );
}
