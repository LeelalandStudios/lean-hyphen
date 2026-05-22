import { INFOGRAPHIC_FILENAME } from "../../content/act1Scene2.js";
import StatusBar from "../../components/phone/StatusBar.jsx";

/** Confirmation after saving infographic (static). */
export default function InfographicSavedScreen() {
  return (
    <div className="relative h-full bg-slate-100 pt-12 text-slate-900">
      <StatusBar dark />
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <h1 className="text-lg font-bold">Downloads</h1>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-[#25d366]/30 bg-white p-4 shadow-sm">
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#075e54] text-2xl text-white">
            🛡️
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{INFOGRAPHIC_FILENAME}</p>
            <p className="text-xs text-[#25d366]">Saved just now</p>
            <p className="text-xs text-slate-500">Image · 1.2 MB (static)</p>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-6 rounded-2xl bg-[#25d366] px-4 py-3 text-center text-sm font-medium text-white shadow-lg">
        ✓ Saved to phone — you can open it anytime
      </div>

      <p className="mt-8 px-6 text-center text-xs text-slate-500">
        Priya shared this guide so your group can spot fake links, OTP tricks,
        and gaming scams.
      </p>
    </div>
  );
}
