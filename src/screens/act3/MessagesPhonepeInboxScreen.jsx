import { PHONEPE_SCAM_SENDER } from "../../content/scenario1.js";
import { INBOX_DECOY_THREADS } from "../../content/constants.js";
import AppScreen from "../../components/phone/AppScreen.jsx";

/** Messages inbox with PhonePe scam thread on top. */
export default function MessagesPhonepeInboxScreen() {
  return (
    <AppScreen title="Messages" appIcon="💬">
      <div className="w-full border-b border-slate-200 bg-blue-50 p-4 text-left">
        <div className="flex justify-between">
          <b>{PHONEPE_SCAM_SENDER}</b>
          <span className="text-xs font-medium text-red-600">now</span>
        </div>
        <div className="text-sm text-slate-600">
          🎉 You have won ₹3,000 PhonePe cashb...
        </div>
      </div>

      {INBOX_DECOY_THREADS.map((thread) => (
        <div key={thread.name} className="border-b border-slate-200 p-4 opacity-70">
          <b>{thread.name}</b>
          <p className="text-sm text-slate-600">{thread.preview}</p>
        </div>
      ))}
    </AppScreen>
  );
}
