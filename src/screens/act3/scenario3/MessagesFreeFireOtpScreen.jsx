import {
  FREE_FIRE_OTP_MESSAGE,
  FREE_FIRE_OTP_SENDER,
} from "../../../content/scenario3.js";
import AppScreen from "../../../components/phone/AppScreen.jsx";
import MessageBody from "../../../components/ui/MessageBody.jsx";

export default function MessagesFreeFireOtpScreen() {
  return (
    <AppScreen title={FREE_FIRE_OTP_SENDER} appIcon="💬">
      <div className="p-4">
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
          <p className="text-xs font-bold uppercase text-orange-800">Game OTP</p>
          <MessageBody text={FREE_FIRE_OTP_MESSAGE} className="mt-2 text-sm" />
        </div>
        <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-center text-xs text-amber-900">
          This code unlocks YOUR Free Fire account — not someone else's signup.
        </p>
      </div>
    </AppScreen>
  );
}
