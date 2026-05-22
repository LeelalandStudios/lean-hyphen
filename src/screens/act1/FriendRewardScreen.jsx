import { scripts } from "../../content/scripts.js";
import AppScreen from "../../components/phone/AppScreen.jsx";

export default function FriendRewardScreen() {
  return (
    <AppScreen title="Messages" appIcon="💬">
      <div className="p-4">
        <div className="rounded-2xl bg-slate-100 p-4">{scripts.friend}</div>
        <div className="ml-auto mt-4 w-fit rounded-2xl bg-blue-600 p-4 text-white">
          No, not anymore.
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">
          (Student typed reply — static)
        </p>
      </div>
    </AppScreen>
  );
}
