import StatusBar from "../../components/phone/StatusBar.jsx";
import ScamAlert from "../../components/ui/ScamAlert.jsx";

export default function OtpBadScreen() {
  return (
    <div className="relative h-full bg-white p-6 pt-20 text-slate-900">
      <StatusBar dark />
      <ScamAlert text="YOUR ACCOUNT DETAILS WERE STOLEN." />
      <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-700">
        Rs. 40,000 debited from A/C
      </div>
      <div className="mt-4 rounded-2xl bg-slate-100 p-5 text-sm">
        Call abruptly cut. User tries to call back — switched off.
      </div>
    </div>
  );
}
