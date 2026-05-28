import { PHONEPE_WALLET_BALANCE } from "../../content/scenario1.js";
import AppScreen from "../../components/phone/AppScreen.jsx";

/** Scenario 1 — player checks PhonePe wallet (low balance before scam). */
export default function PhonePeWalletScreen({ onBack, onClaim }) {
  return (
    <AppScreen title="PhonePe" appIcon="📱" onBack={onBack}>
      <div className="bg-[#5f259f] px-4 pb-8 pt-4 text-white">
        <p className="text-sm opacity-90">Wallet balance</p>
        <p className="mt-1 text-5xl font-bold">₹{PHONEPE_WALLET_BALANCE}</p>
      </div>

      <div className="p-4">
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">
            Cashback
          </p>
          <p className="mt-1 text-sm font-bold text-slate-900">Claim ₹3,000 cashback</p>
          <p className="mt-1 text-xs text-slate-600">
            Limited time offer. Tap claim to continue.
          </p>
          <button
            type="button"
            onClick={onClaim}
            className="mt-3 w-full rounded-xl bg-[#5f259f] px-4 py-2.5 text-sm font-extrabold text-white hover:brightness-110 active:brightness-95"
          >
            Claim
          </button>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Quick actions
        </p>
        <div className="grid grid-cols-4 gap-3 text-center text-xs">
          {[
            ["📤", "To mobile"],
            ["🏦", "To bank"],
            ["📲", "Scan QR"],
            ["💡", "Recharge"],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="rounded-xl bg-slate-50 py-3 text-slate-700"
            >
              <div className="text-xl">{icon}</div>
              <div className="mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-800">
            Recent activity
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Tuition fee — ₹1,200 · Yesterday
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Snacks — ₹85 · 2 days ago
          </p>
        </div>
      </div>
    </AppScreen>
  );
}
