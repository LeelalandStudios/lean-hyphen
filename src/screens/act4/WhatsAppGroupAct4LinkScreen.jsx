import { ACT4_GROUP_LINK_MESSAGES } from "../../content/act4SpotTheIssue.js";
import GroupChatThread from "../../components/whatsapp/GroupChatThread.jsx";
import WhatsAppShell from "../../components/whatsapp/WhatsAppShell.jsx";
import { FRIENDS_GROUP } from "../../content/act1Scene2.js";

/** Friends group — Priya shares Spot the Scam challenge link. */
export default function WhatsAppGroupAct4LinkScreen() {
  return (
    <WhatsAppShell title={FRIENDS_GROUP.title} subtitle="Spot the Scam challenge">
      <GroupChatThread messages={ACT4_GROUP_LINK_MESSAGES} />
      <p className="mx-3 mb-4 rounded-xl bg-[#e7fce8] px-3 py-2 text-center text-xs text-[#075e54]">
        Tap the green challenge link above to open the game.
      </p>
    </WhatsAppShell>
  );
}
