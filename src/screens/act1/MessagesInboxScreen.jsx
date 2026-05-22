import { INBOX_DECOY_THREADS, PAYTM_SENDER } from "../../content/constants.js";
import AppScreen from "../../components/phone/AppScreen.jsx";

export default function MessagesInboxScreen() {
  return (
    <AppScreen title="Messages" appIcon="💬">
      <div className="w-full border-b border-slate-200 bg-blue-50 p-4 text-left">
        <div className="flex justify-between">
          <b>{PAYTM_SENDER}</b>
          <span className="text-xs text-slate-500">3:47 PM</span>
        </div>
        <div className="text-sm text-slate-600">
          🎉 You have won ₹3,000 Payt...
        </div>
      </div>

      {INBOX_DECOY_THREADS.map((thread) => (
        <div key={thread.name} className="border-b border-slate-200 p-4">
          <b>{thread.name}</b>
          <p className="text-sm text-slate-600">{thread.preview}</p>
        </div>
      ))}
    </AppScreen>
  );
}
