import { INBOX_DECOY_THREADS } from "../../content/constants.js";
import AppScreen from "../../components/phone/AppScreen.jsx";

/** Scene 4 [B] — inbox after scam message deleted. */
export default function MessagesInboxCleanScreen() {
  return (
    <AppScreen title="Messages" appIcon="💬">
      {INBOX_DECOY_THREADS.map((thread) => (
        <div key={thread.name} className="border-b border-slate-200 p-4">
          <b>{thread.name}</b>
          <p className="text-sm text-slate-600">{thread.preview}</p>
        </div>
      ))}
      <p className="p-6 text-center text-sm text-slate-400">
        Scam conversation removed — inbox clean.
      </p>
    </AppScreen>
  );
}
