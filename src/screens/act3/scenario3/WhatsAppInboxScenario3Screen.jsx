import {
  RAFI_INBOX_CHAT,
  RAFI_SAVED_INBOX_DECOY,
} from "../../../content/scenario3.js";
import { FRIENDS_GROUP } from "../../../content/act1Scene2.js";
import ChatListItem from "../../../components/whatsapp/ChatListItem.jsx";
import WhatsAppShell from "../../../components/whatsapp/WhatsAppShell.jsx";

export default function WhatsAppInboxScenario3Screen() {
  return (
    <WhatsAppShell title="WhatsApp" showSearch>
      <div className="bg-white">
        <ChatListItem chat={RAFI_INBOX_CHAT} />
        <p className="px-4 pb-1 text-[10px] font-medium text-amber-700">
          ↑ Not in your contacts — different from saved {RAFI_SAVED_INBOX_DECOY.title}
        </p>
        <ChatListItem chat={FRIENDS_GROUP} pinned />
        <ChatListItem chat={RAFI_SAVED_INBOX_DECOY} />
      </div>
    </WhatsAppShell>
  );
}
