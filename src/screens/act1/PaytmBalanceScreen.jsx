import AppScreen from "../../components/phone/AppScreen.jsx";

/** Scene 4 [A] — Paytm app showing ₹0 balance after scam. */
export default function PaytmBalanceScreen() {
  return (
    <AppScreen title="Paytm" appIcon="📱">
      <div className="p-6">
        <div className="rounded-2xl bg-[#00b9f1] p-6 text-center text-white">
          <div className="text-sm opacity-90">Paytm Balance</div>
          <div className="mt-2 text-5xl font-bold">₹0</div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          I did not get any cashback and lost the money too.
        </p>
        <div className="mt-4 rounded-2xl bg-red-50 p-4 text-center text-sm text-red-700">
          Rs. 30,000 debited from account
        </div>
      </div>
    </AppScreen>
  );
}
