import {
  ACT1_CASUAL_MESSAGES,
  FRIENDS_GROUP,
} from "../../content/act1Scene2.js";
import GroupChatThread from "../../components/whatsapp/GroupChatThread.jsx";
import WhatsAppShell from "../../components/whatsapp/WhatsAppShell.jsx";

/** Group chat as it was before Zack forwards the Paytm message. */
export default function WhatsAppGroupCasualScreen() {
  return (
    <WhatsAppShell title={FRIENDS_GROUP.title} subtitle="4 members · online">
      <GroupChatThread messages={ACT1_CASUAL_MESSAGES} />
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
