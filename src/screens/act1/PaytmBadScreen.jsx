import AppScreen from "../../components/phone/AppScreen.jsx";
import ScamAlert from "../../components/ui/ScamAlert.jsx";

/** Scene 4 [A] — capture alert + debit (Chrome login is separate screen). */
export default function PaytmBadScreen() {
  return (
    <AppScreen title="Chrome" appIcon="🌐">
      <ScamAlert text="YOUR PAYTM DETAILS WERE JUST CAPTURED." />
      <div className="mx-4 mt-4 rounded-2xl bg-red-50 p-4 text-red-700">
        Rs. 30,000 debited from account
      </div>
      <p className="mx-4 mt-4 text-sm text-slate-600">
        Closes inbox and opens Paytm — see Paytm balance screen.
      </p>
    </AppScreen>
  );
}
