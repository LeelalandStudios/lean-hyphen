import { useMemo, useState } from "react";
import WhatsAppShell from "../components/whatsapp/WhatsAppShell.jsx";
import ChatListItem from "../components/whatsapp/ChatListItem.jsx";
import GroupChatThread from "../components/whatsapp/GroupChatThread.jsx";
import {
  FRIENDS_GROUP,
  WHATSAPP_OTHER_CHATS,
} from "../content/whatsappConversations.js";
import { ACT1_GROUP_CHAT_FULL } from "../content/act1Scene2.js";

const INBOX = [FRIENDS_GROUP, ...WHATSAPP_OTHER_CHATS];

export default function WhatsAppApp({ onBackToHome }) {
  const [activeChatId, setActiveChatId] = useState(null);

  const activeChat = useMemo(() => {
    if (!activeChatId) return null;
    return INBOX.find((c) => c.id === activeChatId) ?? null;
  }, [activeChatId]);

  if (activeChat && activeChat.type === "group") {
    // For now, only the friends group thread is implemented as a real thread UI.
    const messages = activeChat.id === FRIENDS_GROUP.id ? ACT1_GROUP_CHAT_FULL : [];

    return (
      <div className="relative h-full">
        <WhatsAppShell
          title={activeChat.title}
          subtitle="Aryan, Diya, Kabir, Priya"
          showSearch={false}
          onBack={() => setActiveChatId(null)}
        >
          <GroupChatThread messages={messages} highlightInfographic />
        </WhatsAppShell>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <WhatsAppShell title="WhatsApp" showSearch onBack={onBackToHome}>
        <div className="bg-white">
          {INBOX.map((chat, index) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              pinned={index === 0}
              onClick={() => {
                if (chat.type === "group") setActiveChatId(chat.id);
              }}
            />
          ))}
        </div>
      </WhatsAppShell>
    </div>
  );
}

