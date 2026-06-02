import { useEffect } from "react";
import FakeFriendWhatsAppScreen from "../components/act2/screens/FakeFriendWhatsAppScreen.jsx";

export default function Act2WhatsAppKabirApp({ phone, onBack, scenarioId, onScamReached }) {
  useEffect(() => {
    if (!scenarioId) return;
    phone.api.signal("act2.scam.reached", scenarioId);
    onScamReached?.();
  }, [phone.api, scenarioId, onScamReached]);

  return (
    <div className="relative h-full">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="absolute left-3 top-10 z-30 rounded-full bg-black/25 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/35"
        >
          ‹ Back
        </button>
      )}
      <FakeFriendWhatsAppScreen />
    </div>
  );
}
