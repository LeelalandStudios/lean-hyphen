import { scripts } from "../../content/scripts.js";
import AppScreen from "../../components/phone/AppScreen.jsx";
import MessageBody from "../../components/ui/MessageBody.jsx";

export default function PaytmSafeScreen() {
  return (
    <AppScreen title="Messages" appIcon="💬">
      <div className="p-4">
        <div className="rounded-2xl bg-slate-100 p-4">
          <MessageBody text={scripts.paytmFull} />
        </div>
      </div>

      <div className="mx-4 rounded-2xl bg-white p-4 shadow">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full bg-slate-100 px-3 py-2 text-sm"
          >
            Reply
          </button>
          <button
            type="button"
            className="rounded-full bg-slate-100 px-3 py-2 text-sm"
          >
            Forward
          </button>
          <button
            type="button"
            className="rounded-full bg-red-600 px-3 py-2 text-sm text-white"
          >
            🗑 Delete
          </button>
        </div>
        <p className="mt-4 text-sm font-medium">Delete message? Confirm</p>
      </div>
    </AppScreen>
  );
}
