import AppScreen from "../../components/phone/AppScreen.jsx";

/** Path A — fake PhonePe cashback page in Chrome. */
export default function ChromePhonepeFakeLoginScreen() {
  return (
    <AppScreen title="Chrome" appIcon="🌐">
      <div className="m-4 rounded-2xl border p-4 text-center">
        <p className="text-left text-[10px] text-slate-400">
          bit.ly/phonepe-bonus-3000
        </p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-3/4 rounded-full bg-slate-900" />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-[#5f259f]">PhonePe</h2>
        <p className="mt-1 text-sm text-slate-500">cashback claim</p>
        <p className="mt-4 text-sm">
          Enter your mobile number to claim ₹3,000 reward.
        </p>
        <div className="mt-5 rounded-xl border-2 border-[#5f259f] p-3 text-left font-mono text-slate-800">
          98765 43210<span className="animate-pulse">|</span>
        </div>
      </div>
      <div className="mx-4 rounded-t-2xl border border-b-0 border-slate-200 bg-slate-100 p-4 text-center text-xs text-slate-500">
        Keyboard — mobile number entered
      </div>
    </AppScreen>
  );
}
