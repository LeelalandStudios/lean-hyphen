import { RED_FLAG_OPTIONS } from "../../content/constants.js";
import { scripts } from "../../content/scripts.js";
import StatusBar from "../../components/phone/StatusBar.jsx";

export default function RedFlagScreen() {
  return (
    <div className="relative h-full bg-emerald-950 p-6 pt-20 text-white">
      <StatusBar />
      <div className="rounded-3xl bg-white p-6 text-slate-900">
        <p>{scripts.paytmPause}</p>
        <div className="mt-6 grid gap-3">
          {RED_FLAG_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className="rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white"
            >
              {option}
            </button>
          ))}
        </div>
        <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm">
          {scripts.redFlag}
        </p>
      </div>
    </div>
  );
}
