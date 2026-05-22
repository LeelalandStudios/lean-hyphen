import { scripts } from "../../content/scripts.js";
import AppScreen from "../../components/phone/AppScreen.jsx";

/** Fake links — thread + QR + payment app sheet (static). */
export default function FakeLinksQrScreen() {
  return (
    <AppScreen title="Messages" appIcon="💬">
      <div className="relative space-y-4 p-4 pb-32">
        <div className="rounded-2xl bg-slate-100 p-4 text-sm">
          Your package delivery failed.
          <br />
          Verify address in 10 minutes or order will be cancelled.
          <br />→ amaz0n-track-help.in
        </div>
        <div className="rounded-2xl bg-slate-100 p-4 text-sm">
          {scripts.fakeLinksDelivery}
        </div>
        <div className="grid h-32 place-items-center rounded-2xl border-4 border-dashed border-slate-400 bg-white text-sm font-medium">
          QR CODE
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-4 shadow-2xl">
        <p className="mb-3 text-center text-sm font-semibold text-slate-700">
          Open with
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["📱", "GPay"],
            ["📱", "PhonePe"],
            ["📱", "Paytm"],
          ].map(([icon, label]) => (
            <button
              key={label}
              type="button"
              className="flex flex-col items-center gap-1 rounded-2xl bg-slate-100 p-3 text-xs font-medium"
            >
              <span className="text-2xl">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </AppScreen>
  );
}
