import { FAKE_DOMAIN, PATH_TAP_CAPTURED } from "../../../content/scenario4.js";
import AppScreen from "../../../components/phone/AppScreen.jsx";

export default function ChromeSchoolPortalScreen() {
  return (
    <AppScreen title="Chrome" appIcon="🌐">
      <div className="m-4 rounded-2xl border p-4 text-center">
        <p className="text-left text-[10px] text-slate-400">{FAKE_DOMAIN}/pay-fees</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-4/5 rounded-full bg-blue-800" />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-blue-900">Riverside Academy</h2>
        <p className="mt-1 text-sm text-slate-500">Student fee portal</p>
        <p className="mt-4 text-sm">Enter parent mobile + UPI to clear the hold.</p>
        <div className="mt-5 rounded-xl border-2 border-blue-800 p-3 text-left font-mono text-slate-800">
          98765 43210<span className="animate-pulse">|</span>
        </div>
      </div>
      <div className="mx-4 rounded-2xl bg-red-50 p-4 text-center text-sm font-medium text-red-800">
        {PATH_TAP_CAPTURED}
      </div>
    </AppScreen>
  );
}
