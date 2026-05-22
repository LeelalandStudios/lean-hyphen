import {
  PHONEPE_WALLET_S2_SAFE,
  SCENARIO2_CHOICE_CONTEXT,
  UNKNOWN_OTP_SENDER,
  UNKNOWN_OTP_THREAD,
} from "../../../content/scenario2.js";
import { SCENARIO2_CHOICES } from "../../../content/scenario2.js";
import AppScreen from "../../../components/phone/AppScreen.jsx";
import ScenarioChoiceFooter from "../../../components/messages/ScenarioChoiceFooter.jsx";
import Bubble from "../../../components/ui/Bubble.jsx";

export default function MessagesUnknownOtpThreadScreen() {
  return (
    <AppScreen
      title={UNKNOWN_OTP_SENDER}
      appIcon="💬"
      footer={<ScenarioChoiceFooter choices={SCENARIO2_CHOICES} />}
    >
      <div className="flex items-center gap-2 border-b border-[#5f259f]/20 bg-[#f3e8ff] px-4 py-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#5f259f] text-xs font-bold text-white">
          Pe
        </span>
        <div>
          <p className="text-xs font-semibold text-[#5f259f]">PhonePe wallet</p>
          <p className="text-sm font-bold text-slate-900">
            ₹{PHONEPE_WALLET_S2_SAFE} available
          </p>
        </div>
      </div>

      <div className="space-y-3 p-4 pb-2">
        <p className="text-center text-[10px] font-medium uppercase tracking-wide text-red-600">
          Unknown number
        </p>
        {UNKNOWN_OTP_THREAD.map((msg) => (
          <Bubble key={msg.time}>{msg.text}</Bubble>
        ))}
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-center text-xs text-amber-900">
          {SCENARIO2_CHOICE_CONTEXT}
        </p>
      </div>
    </AppScreen>
  );
}
