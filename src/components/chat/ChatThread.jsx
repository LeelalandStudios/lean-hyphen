import ChatBubbleRenderer from "./ChatBubbleRenderer.jsx";
import { beatsToMessages } from "../../chat/beatUtils.js";

export { beatsToMessages } from "../../chat/beatUtils.js";

/**
 * @typedef {import("./ChatBubbleRenderer.jsx").RenderableMessage} RenderableMessage
 */

/**
 * @param {{
 *   messages: RenderableMessage[],
 *   senders?: Record<string, import("../../chat/chatSchema.js").ChatSender>,
 *   encryptedNotice?: boolean,
 *   receiptMessageId?: string | null,
 *   receiptsVisible?: boolean,
 *   highlightInfographic?: boolean,
 *   className?: string,
 * }} props
 */
export default function ChatThread({
  messages,
  senders = {},
  encryptedNotice = true,
  receiptMessageId = null,
  receiptsVisible = false,
  highlightInfographic = false,
  className = "",
}) {
  return (
    <div className={`space-y-2 p-3 pb-4 ${className}`.trim()}>
      {encryptedNotice && (
        <p className="my-2 rounded-lg bg-[#fff9c4] px-3 py-1.5 text-center text-xs text-[#54656f] shadow-sm">
          Messages are end-to-end encrypted.
        </p>
      )}

      {messages.map((msg, index) => (
        <ChatBubbleRenderer
          key={msg.id ?? index}
          msg={msg}
          senders={senders}
          receipts={
            receiptsVisible &&
            msg.id != null &&
            msg.id === receiptMessageId
          }
          highlightInfographic={highlightInfographic}
        />
      ))}
    </div>
  );
}
