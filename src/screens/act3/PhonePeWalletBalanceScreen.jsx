import AppScreen from "../../components/phone/AppScreen.jsx";

/**
 * @param {{ balance: number, subtitle?: string, debitNote?: string }} props
 */
export default function PhonePeWalletBalanceScreen({
  balance,
  subtitle = "Wallet balance",
  debitNote,
}) {
  return (
    <AppScreen title="PhonePe" appIcon="📱">
      <div className="bg-[#5f259f] px-4 pb-8 pt-4 text-white">
        <p className="text-sm opacity-90">{subtitle}</p>
        <p className="mt-1 text-5xl font-bold">₹{balance}</p>
      </div>

      {debitNote && (
        <div className="p-4">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {debitNote}
          </div>
        </div>
      )}
    </AppScreen>
  );
}
