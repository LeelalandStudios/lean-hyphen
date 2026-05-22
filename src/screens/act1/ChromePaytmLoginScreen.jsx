import AppScreen from "../../components/phone/AppScreen.jsx";

/** Scene 4 [A] — fake Paytm login in Chrome (before capture alert). */
export default function ChromePaytmLoginScreen() {
  return (
    <AppScreen title="Chrome" appIcon="🌐">
      <div className="m-4 rounded-2xl border p-4 text-center">
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-3/4 rounded-full bg-slate-900" />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-[#00b9f1]">Paytm</h2>
        <p className="mt-1 text-sm text-slate-500">cashback claim</p>
        <p className="mt-4 text-sm">
          Enter your mobile number to claim the reward.
        </p>
        <div className="mt-5 rounded-xl border-2 border-[#00b9f1] p-3 text-left font-mono text-slate-800">
          98765 43210<span className="animate-pulse">|</span>
        </div>
      </div>
      <div className="mx-4 mt-8 rounded-t-2xl border border-b-0 border-slate-200 bg-slate-100 p-4 text-center text-xs text-slate-500">
        ◀︎ Keyboard (static)
      </div>
    </AppScreen>
  );
}
