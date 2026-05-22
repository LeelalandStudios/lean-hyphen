import {
  FRIENDS_GROUP,
  FRIENDS_GROUP_MESSAGES,
} from "../../content/whatsappConversations.js";
import WhatsAppShell from "../../components/whatsapp/WhatsAppShell.jsx";

export default function WhatsAppGroupChatScreen() {
  return (
    <WhatsAppShell
      title={FRIENDS_GROUP.title}
      subtitle={`Aryan, Mei, Zack, Priya`}
    >
      <div className="space-y-2 p-3 pb-8">
        <p className="my-2 rounded-lg bg-[#fff9c4] px-3 py-1.5 text-center text-xs text-[#54656f] shadow-sm">
          Messages are end-to-end encrypted. Only people in this chat can read
          them.
        </p>

        {FRIENDS_GROUP_MESSAGES.map((msg) => (
          <div
            key={`${msg.sender}-${msg.time}`}
            className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 shadow-sm ${
                msg.mine
                  ? "rounded-tr-none bg-[#d9fdd3]"
                  : "rounded-tl-none bg-white"
              }`}
            >
              {!msg.mine && (
                <p className="mb-0.5 text-xs font-semibold text-[#e542a3]">
                  {msg.sender}
                </p>
              )}
              <p className="text-sm text-[#111b21]">{msg.text}</p>
              <p className="mt-1 text-right text-[10px] text-[#667781]">
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

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
