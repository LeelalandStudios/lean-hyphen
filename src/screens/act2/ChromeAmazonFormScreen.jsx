import { FAKE_LINKS_FIELDS } from "../../content/constants.js";
import AppScreen from "../../components/phone/AppScreen.jsx";

/** Fake links — Amazon-style form before glitch (static). */
export default function ChromeAmazonFormScreen() {
  return (
    <AppScreen title="Chrome" appIcon="🌐">
      <div className="m-4 rounded-2xl border p-4">
        <h2 className="text-xl font-bold text-[#ff9900]">amazon</h2>
        <p className="mt-1 text-xs text-slate-500">amaz0n-track-help.in</p>
        <ul className="mt-4 space-y-3 text-sm">
          {FAKE_LINKS_FIELDS.map((field) => (
            <li key={field}>
              <label className="text-slate-500">{field}</label>
              <div className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-slate-400">
                ········
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppScreen>
  );
}
