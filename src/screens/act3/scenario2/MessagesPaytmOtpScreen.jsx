import { PAYTM_OTP_MESSAGE } from "../../../content/scenario2.js";
import AppScreen from "../../../components/phone/AppScreen.jsx";
import MessageBody from "../../../components/ui/MessageBody.jsx";

/** Paytm automated OTP — read-only system message. */
export default function MessagesPaytmOtpScreen() {
  return (
    <AppScreen title="Paytm" appIcon="📱">
      <div className="p-4">
        <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          Automated message
        </p>
        <div className="rounded-2xl border-2 border-[#5f259f]/30 bg-[#f3e8ff] p-4">
          <MessageBody text={PAYTM_OTP_MESSAGE} className="font-medium" />
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-[#5f259f]">
          DO NOT SHARE THIS CODE WITH ANYONE
        </p>
      </div>
    </AppScreen>
  );
}
