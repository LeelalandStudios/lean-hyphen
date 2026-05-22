import { INBOX_DECOY_THREADS } from "../../content/constants.js";
import AppScreen from "../../components/phone/AppScreen.jsx";

/** Path B — scam thread removed; only normal chats remain. */
export default function MessagesPhonepeDeletedScreen() {
  return (
    <AppScreen title="Messages" appIcon="💬">
      <p className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-center text-xs text-slate-500">
        Unknown number thread deleted
      </p>
      {INBOX_DECOY_THREADS.map((thread) => (
        <div key={thread.name} className="border-b border-slate-200 p-4">
          <b>{thread.name}</b>
          <p className="text-sm text-slate-600">{thread.preview}</p>
        </div>
      ))}
    </AppScreen>
  );
}
