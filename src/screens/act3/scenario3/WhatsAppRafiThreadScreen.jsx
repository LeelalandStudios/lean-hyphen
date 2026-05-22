import {
  RAFI_SCAM_NUMBER,
  RAFI_THREAD,
  SCENARIO3_CHOICE_CONTEXT,
  SCENARIO3_CHOICES,
} from "../../../content/scenario3.js";
import GroupChatThread from "../../../components/whatsapp/GroupChatThread.jsx";
import ScenarioChoiceFooter from "../../../components/messages/ScenarioChoiceFooter.jsx";
import WhatsAppShell from "../../../components/whatsapp/WhatsAppShell.jsx";

export default function WhatsAppRafiThreadScreen() {
  const messages = RAFI_THREAD.map((m) => ({
    type: "text",
    sender: m.sender,
    text: m.text,
    time: m.time,
  }));

  return (
    <WhatsAppShell title={RAFI_SCAM_NUMBER} subtitle="not in your contacts">
      <div className="border-b border-amber-200 bg-amber-50 px-3 py-2 text-center text-[10px] font-semibold text-amber-900">
        Unknown number — not saved as Rafi
      </div>
      <GroupChatThread messages={messages} />
      <p className="mx-3 mb-2 rounded-xl bg-[#fff9c4] px-3 py-2 text-center text-xs text-[#54656f]">
        {SCENARIO3_CHOICE_CONTEXT}
      </p>
      <ScenarioChoiceFooter choices={SCENARIO3_CHOICES} />
    </WhatsAppShell>
  );
}
