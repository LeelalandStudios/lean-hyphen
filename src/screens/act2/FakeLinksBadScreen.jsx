import AppScreen from "../../components/phone/AppScreen.jsx";
import ScamAlert from "../../components/ui/ScamAlert.jsx";

export default function FakeLinksBadScreen() {
  return (
    <AppScreen title="Chrome" appIcon="🌐">
      <ScamAlert text="YOUR ACCOUNT DETAILS WERE STOLEN." />
      <p className="mx-4 text-center text-xs text-slate-500">
        SCREEN GLITCHES (static)
      </p>
      <div className="mx-4 mt-4 rounded-2xl bg-red-50 p-4 text-red-700">
        Rs. 50,000 debited from A/C
      </div>
    </AppScreen>
  );
}
