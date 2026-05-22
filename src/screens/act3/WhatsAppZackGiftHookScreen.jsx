import { ZACK_GIFT_HOOK_MESSAGES } from "../../content/scenario1.js";
import GroupChatThread from "../../components/whatsapp/GroupChatThread.jsx";
import WhatsAppShell from "../../components/whatsapp/WhatsAppShell.jsx";

/** Scenario 1 hook — 1:1 with Zack (month end, birthday gift). */
export default function WhatsAppZackGiftHookScreen() {
  return (
    <WhatsAppShell title="Zack" subtitle="online">
      <GroupChatThread messages={ZACK_GIFT_HOOK_MESSAGES} />
      <div className="sticky bottom-0 flex items-center gap-2 border-t border-[#e9edef] bg-[#f0f2f5] px-3 py-2">
        <span className="text-xl text-[#54656f]">😊</span>
        <div className="flex-1 rounded-full bg-white px-4 py-2 text-sm text-[#667781]">
          Message
        </div>
        <span className="text-xl text-[#54656f]">🎤</span>
      </div>
    </WhatsAppShell>
  );
}
