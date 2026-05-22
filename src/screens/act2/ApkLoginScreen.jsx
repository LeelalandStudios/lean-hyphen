import AppScreen from "../../components/phone/AppScreen.jsx";

/** Gaming scam — fake login after opening APK (static). */
export default function ApkLoginScreen() {
  return (
    <AppScreen title="FreeFire_Mod_v12" appIcon="🎮">
      <div className="m-4 space-y-4">
        <div className="rounded-2xl bg-orange-100 p-4 text-center">
          <p className="font-bold text-orange-900">Free Fire Account Verify</p>
          <p className="mt-1 text-xs text-orange-800">Unofficial APK (static)</p>
        </div>
        <div>
          <label className="text-xs text-slate-500">Game email</label>
          <div className="mt-1 rounded-xl border px-3 py-2 text-slate-400">
            player@example.com
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-500">Password</label>
          <div className="mt-1 rounded-xl border px-3 py-2 text-slate-400">
            ••••••••
          </div>
        </div>
        <button
          type="button"
          className="w-full rounded-2xl bg-orange-600 py-3 font-semibold text-white"
        >
          Login
        </button>
        <p className="text-center text-xs text-slate-400">
          Next: “Verifying now. Please wait.” (30s in script)
        </p>
      </div>
    </AppScreen>
  );
}
