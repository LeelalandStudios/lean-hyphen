import {
  PHONEPE_SCAM_FULL,
  PHONEPE_SCAM_SENDER,
  PHONEPE_WALLET_BALANCE,
  SCENARIO1_CHOICE_CONTEXT,
} from "../../content/scenario1.js";
import AppScreen from "../../components/phone/AppScreen.jsx";
import ScenarioChoiceFooter from "../../components/messages/ScenarioChoiceFooter.jsx";
import MessageBody from "../../components/ui/MessageBody.jsx";

/** Scam thread with PhonePe balance context + choices pinned at bottom. */
export default function MessagesPhonepeScamThreadScreen() {
  return (
    <AppScreen
      title={PHONEPE_SCAM_SENDER}
      appIcon="💬"
      footer={<ScenarioChoiceFooter />}
    >
      <div className="flex items-center justify-between gap-2 border-b border-[#5f259f]/20 bg-[#f3e8ff] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#5f259f] text-xs font-bold text-white">
            Pe
          </span>
          <div>
            <p className="text-xs font-semibold text-[#5f259f]">PhonePe wallet</p>
            <p className="text-sm font-bold text-slate-900">
              ₹{PHONEPE_WALLET_BALANCE} available
            </p>
          </div>
        </div>
        <span className="text-[10px] text-slate-500">View app →</span>
      </div>

      <div className="p-4 pb-2">
        <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-wide text-red-600">
          Unknown number
        </p>
        <div className="rounded-2xl bg-slate-100 p-4">
          <MessageBody text={PHONEPE_SCAM_FULL} />
        </div>
        <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-xs text-amber-900">
          {SCENARIO1_CHOICE_CONTEXT}
        </p>
      </div>
    </AppScreen>
  );
}
