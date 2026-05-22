import { WHATSAPP_INBOX } from "../../content/whatsappConversations.js";
import ChatListItem from "../../components/whatsapp/ChatListItem.jsx";
import WhatsAppShell from "../../components/whatsapp/WhatsAppShell.jsx";

export default function WhatsAppInboxScreen() {
  const [friendsGroup, ...otherChats] = WHATSAPP_INBOX;

  return (
    <WhatsAppShell title="WhatsApp" showSearch>
      <div className="bg-white">
        <ChatListItem chat={friendsGroup} pinned />
        {otherChats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </div>
    </WhatsAppShell>
  );
}
