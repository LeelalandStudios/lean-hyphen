import {
  PAYTM_OTP_SENDER,
  UNKNOWN_OTP_SENDER,
} from "../../../content/scenario2.js";
import { INBOX_DECOY_THREADS } from "../../../content/constants.js";
import AppScreen from "../../../components/phone/AppScreen.jsx";

export default function MessagesOtpInboxScreen() {
  return (
    <AppScreen title="Messages" appIcon="💬">
      <div className="border-b border-slate-200 bg-amber-50 p-4">
        <div className="flex justify-between">
          <b>{UNKNOWN_OTP_SENDER}</b>
          <span className="text-xs font-medium text-amber-700">now</span>
        </div>
        <div className="text-sm text-slate-600">
          Did you get a 6-digit OTP? Please send it…
        </div>
      </div>
      <div className="border-b border-slate-200 bg-blue-50 p-4">
        <div className="flex justify-between">
          <b>{PAYTM_OTP_SENDER}</b>
          <span className="text-xs text-slate-500">1 min ago</span>
        </div>
        <div className="text-sm text-slate-600">
          Your Paytm verification code is: 847291…
        </div>
      </div>
      {INBOX_DECOY_THREADS.map((thread) => (
        <div key={thread.name} className="border-b border-slate-200 p-4 opacity-60">
          <b>{thread.name}</b>
          <p className="text-sm text-slate-600">{thread.preview}</p>
        </div>
      ))}
    </AppScreen>
  );
}
