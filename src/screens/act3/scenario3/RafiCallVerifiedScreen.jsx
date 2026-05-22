import { PATH_CALL_VERIFIED_TEXT } from "../../../content/scenario3.js";
import StatusBar from "../../../components/phone/StatusBar.jsx";

export default function RafiCallVerifiedScreen() {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-slate-800 to-slate-950 pt-16 text-white">
      <StatusBar />
      <div className="flex flex-1 flex-col justify-center px-8">
        <p className="text-sm text-white/60">On call with</p>
        <h1 className="text-2xl font-semibold">{PATH_CALL_VERIFIED_TEXT.title}</h1>
        <p className="mt-6 text-lg leading-relaxed">{PATH_CALL_VERIFIED_TEXT.body}</p>
        <p className="mt-6 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/80">
          {PATH_CALL_VERIFIED_TEXT.hint}
        </p>
      </div>
      <button
        type="button"
        className="mx-8 mb-12 rounded-full bg-red-600 py-4 text-center font-semibold"
      >
        End call
      </button>
    </div>
  );
}
