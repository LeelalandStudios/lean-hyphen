import {
  ACT1_GROUP_CHAT_FULL,
  FRIENDS_GROUP,
} from "../../content/act1Scene2.js";
import GroupChatThread from "../../components/whatsapp/GroupChatThread.jsx";
import WhatsAppShell from "../../components/whatsapp/WhatsAppShell.jsx";

/** Act 1 Scene 2 — full thread including Priya's shared infographic. */
export default function WhatsAppInfographicSharedScreen() {
  return (
    <WhatsAppShell title={FRIENDS_GROUP.title} subtitle="Priya shared a file">
      <GroupChatThread messages={ACT1_GROUP_CHAT_FULL} highlightInfographic />
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
