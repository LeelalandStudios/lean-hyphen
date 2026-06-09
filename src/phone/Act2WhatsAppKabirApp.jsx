import { useEffect, useState } from "react";
import WhatsAppShell from "../components/whatsapp/WhatsAppShell.jsx";
import ChatListItem from "../components/whatsapp/ChatListItem.jsx";
import FakeFriendWhatsAppScreen from "../components/act2/screens/FakeFriendWhatsAppScreen.jsx";
import { triggerAct2Choice } from "../content/act2ChoiceTrigger.js";

function RealKabirChatScreen({ onBack, onCall }) {
  return (
    <WhatsAppShell
      title="Kabir (Saved)"
      subtitle="online"
      onBack={onBack}
      headerAction={
        <button
          type="button"
          onClick={onCall}
          className="p-1 text-[#25d366] hover:text-[#20bd5a] active:scale-95 shrink-0 mr-1 cursor-pointer"
          aria-label="Call Kabir"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.56 11.56 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z" />
          </svg>
        </button>
      }
    >
      <div className="p-3 space-y-3">
        <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
          <p className="text-[13px] text-[#111b21]">Bro game tonight?</p>
          <p className="mt-1 text-right text-[10px] text-[#667781]">Yesterday</p>
        </div>
        <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 py-2 shadow-sm">
          <p className="text-[13px] text-[#111b21]">Yeah down after dinner</p>
          <p className="mt-1 text-right text-[10px] text-[#667781]">Yesterday</p>
        </div>
      </div>
    </WhatsAppShell>
  );
}

function WhatsAppChatsList({ onBack, onSelectChat }) {
  const CHATS = [
    {
      id: "unknown",
      title: "+91 90000 11234",
      time: "3:52 PM",
      preview: "hey it's kabir!! borrowing my neighbour's...",
      unread: 1,
      type: "direct"
    },
    {
      id: "kabir-saved",
      title: "Kabir (Saved)",
      time: "Yesterday",
      preview: "Bro game tonight?",
      unread: 0,
      type: "direct"
    },
    {
      id: "friends-group",
      title: "School Group",
      time: "Monday",
      preview: "Aryan: Garena lobby is open",
      unread: 0,
      type: "group",
      members: ["Aryan", "Diya", "Kabir", "You"]
    }
  ];

  return (
    <WhatsAppShell title="WhatsApp" showSearch onBack={onBack}>
      <div className="bg-white">
        {CHATS.map((chat, index) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            pinned={index === 0}
            onClick={() => onSelectChat(chat.id)}
          />
        ))}
      </div>
    </WhatsAppShell>
  );
}

export default function Act2WhatsAppKabirApp({ phone, onBack, scenarioId, onScamReached }) {
  const [route, setRoute] = useState("chat-unknown");

  useEffect(() => {
    if (!scenarioId) return;
    phone.api.signal("act2.scam.reached", scenarioId);
    onScamReached?.();
  }, [phone.api, scenarioId, onScamReached]);

  if (route === "chat-unknown") {
    return (
      <FakeFriendWhatsAppScreen
        phone={phone}
        onBack={() => setRoute("chat-list")}
      />
    );
  }

  if (route === "chat-list") {
    return (
      <WhatsAppChatsList
        onBack={onBack}
        onSelectChat={(id) => {
          if (id === "unknown") setRoute("chat-unknown");
          else if (id === "kabir-saved") setRoute("chat-real");
        }}
      />
    );
  }

  if (route === "chat-real") {
    return (
      <RealKabirChatScreen
        onBack={() => setRoute("chat-list")}
        onCall={() => triggerAct2Choice(phone, "call")}
      />
    );
  }

  return null;
}
