import AppScreen from "../../components/phone/AppScreen.jsx";

/** Path A — wallet drained after fake login. */
export default function PhonePeWalletZeroScreen() {
  return (
    <AppScreen title="PhonePe" appIcon="📱">
      <div className="bg-[#5f259f] px-4 pb-8 pt-4 text-white">
        <p className="text-sm opacity-90">Wallet balance</p>
        <p className="mt-1 text-5xl font-bold">₹0</p>
        <p className="mt-2 text-xs opacity-75">Available balance</p>
      </div>

      <div className="p-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Money sent to unknown account — ₹3,000
        </div>
        <p className="mt-4 text-center text-sm text-slate-600">
          You open the app to check after entering your number on the fake site.
        </p>
      </div>
    </AppScreen>
  );
}
