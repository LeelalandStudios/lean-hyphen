import { OTP_SCAM_SENDER } from "../../content/constants.js";
import { scripts } from "../../content/scripts.js";
import AppScreen from "../../components/phone/AppScreen.jsx";
import MessageBody from "../../components/ui/MessageBody.jsx";

/** Act 2 OTP — Messages inbox with OTP thread (static). */
export default function MessagesInboxOtpScreen() {
  return (
    <AppScreen title="Messages" appIcon="💬">
      <div className="border-b border-slate-200 bg-blue-50 p-4">
        <div className="flex justify-between">
          <b>{OTP_SCAM_SENDER}</b>
          <span className="text-xs text-slate-500">3:47 PM</span>
        </div>
        <div className="mt-2 rounded-2xl bg-white p-3">
          <MessageBody text={scripts.otpSms} />
        </div>
        <p className="mt-2 text-xs text-red-600">Recurrent OTP messages (static)</p>
      </div>
      <div className="border-b border-slate-200 p-4 opacity-60">
        <b>Mom</b>
        <p className="text-sm text-slate-600">Call me when free.</p>
      </div>
    </AppScreen>
  );
}
