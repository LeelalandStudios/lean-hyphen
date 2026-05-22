import Bubble from "../../components/ui/Bubble.jsx";
import AppScreen from "../../components/phone/AppScreen.jsx";

const ADMIN_SPAM = [
  "Admin: Your account has been flagged for illegal login activity.",
  "Admin: We are verifying ownership before suspension.",
  "Admin: Reply quickly or the account will be permanently deleted.",
];

/** Gaming scam — WhatsApp thread spam (static). */
export default function GamingWhatsappScreen() {
  return (
    <AppScreen title="WhatsApp" appIcon="💬">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-green-50 p-4">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-orange-600 text-xl text-white">
          🎮
        </div>
        <div>
          <b className="text-sm">[FREEFIRE_ADMIN_OFFICIAL] ✓</b>
          <p className="text-xs text-slate-500">Game-related profile (static)</p>
        </div>
      </div>
      <div className="space-y-3 p-4">
        {ADMIN_SPAM.map((text) => (
          <Bubble key={text}>{text}</Bubble>
        ))}
      </div>
    </AppScreen>
  );
}
