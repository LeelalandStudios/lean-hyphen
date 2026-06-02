import {
  INFOGRAPHIC_FILENAME,
  INFOGRAPHIC_SRC,
} from "../../content/act1Scene2.js";
import { DEFAULT_SENDER_COLOR } from "../../chat/chatSchema.js";

/**
 * @param {Record<string, import("../../chat/chatSchema.js").ChatSender>} senders
 * @param {string} sender
 */
function senderColor(senders, sender) {
  return senders[sender]?.color ?? DEFAULT_SENDER_COLOR;
}

/**
 * @typedef {Object} RenderableMessage
 * @property {string} [id]
 * @property {'message'|'forwarded'|'infographic'|'link'|'divider'} type
 * @property {string} [sender]
 * @property {string} [text]
 * @property {string} [body]
 * @property {string} [from]
 * @property {string} [title]
 * @property {string} [url]
 * @property {string} [caption]
 * @property {string} [src]
 * @property {string} [filename]
 * @property {string} [label]
 * @property {string} [time]
 * @property {boolean} [mine]
 * @property {boolean} [receipts]
 */

function TextBubble({ msg, senders, receipts }) {
  const color = senderColor(senders, msg.sender ?? "");
  return (
    <div className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-lg px-3 py-2 shadow-sm ${
          msg.mine
            ? "rounded-tr-none bg-[#d9fdd3]"
            : "rounded-tl-none bg-white"
        }`}
      >
        {!msg.mine && msg.sender && (
          <p className="mb-0.5 text-xs font-semibold" style={{ color }}>
            {msg.sender}
          </p>
        )}
        <p className="whitespace-pre-wrap text-sm text-[#111b21]">{msg.text}</p>
        <div className="mt-1 flex items-center justify-end gap-1">
          {msg.time && (
            <span className="text-[10px] text-[#667781]">{msg.time}</span>
          )}
          {receipts && (
            <span className="animate-pulse text-[10px] text-[#53bdeb]">✓✓</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ForwardedBubble({ msg, senders }) {
  const color = senderColor(senders, msg.sender ?? "");
  return (
    <div className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-lg px-3 py-2 shadow-sm ${
          msg.mine
            ? "rounded-tr-none bg-[#d9fdd3]"
            : "rounded-tl-none bg-white"
        }`}
      >
        {msg.sender && (
          <p className="mb-0.5 text-xs font-semibold" style={{ color }}>
            {msg.sender}
          </p>
        )}
        <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-[#667781]">
          ↪ Forwarded
        </p>
        {msg.from && (
          <p className="mb-1 text-[10px] text-[#667781]">{msg.from}</p>
        )}
        <div className="rounded-md border-l-4 border-[#25d366] bg-[#f0f2f5] px-2 py-1.5">
          <p className="whitespace-pre-wrap text-sm text-[#111b21]">{msg.body}</p>
        </div>
        {msg.time && (
          <p className="mt-1 text-right text-[10px] text-[#667781]">{msg.time}</p>
        )}
      </div>
    </div>
  );
}

function LinkBubble({ msg, senders }) {
  const color = senderColor(senders, msg.sender ?? "");
  return (
    <div className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[92%] rounded-lg rounded-tl-none bg-white px-2 py-2 shadow-sm">
        {msg.sender && (
          <p className="mb-1 px-1 text-xs font-semibold" style={{ color }}>
            {msg.sender}
          </p>
        )}
        <div className="overflow-hidden rounded-lg border-2 border-[#25d366] bg-[#e7fce8]">
          <div className="bg-[#25d366] px-3 py-2">
            <p className="text-sm font-bold text-white">🎯 {msg.title}</p>
          </div>
          <div className="px-3 py-2">
            <p className="font-mono text-xs font-semibold text-[#075e54]">{msg.url}</p>
            {msg.caption && (
              <p className="mt-1 text-[10px] text-[#667781]">{msg.caption}</p>
            )}
            <p className="mt-2 text-[10px] font-bold uppercase text-[#25d366]">
              Tap to play →
            </p>
          </div>
        </div>
        {msg.time && (
          <p className="mt-1 px-1 text-right text-[10px] text-[#667781]">{msg.time}</p>
        )}
      </div>
    </div>
  );
}

function InfographicBubble({ msg, senders, highlightSave }) {
  const color = senderColor(senders, msg.sender ?? "");
  const src = msg.src ?? INFOGRAPHIC_SRC;
  const filename = msg.filename ?? INFOGRAPHIC_FILENAME;

  return (
    <div className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[92%] rounded-lg rounded-tl-none bg-white px-2 py-2 shadow-sm">
        {msg.sender && (
          <p className="mb-1 px-1 text-xs font-semibold" style={{ color }}>
            {msg.sender}
          </p>
        )}
        <button
          type="button"
          className="block w-full overflow-hidden rounded-lg border border-[#e9edef] text-left"
        >
          <img
            src={src}
            alt={filename}
            className="max-h-40 w-full object-cover object-top"
          />
          <div className="bg-[#f0f2f5] px-2 py-2">
            <p className="text-xs font-semibold text-[#075e54]">📎 {filename}</p>
            {msg.caption && (
              <p className="text-[10px] text-[#667781]">{msg.caption}</p>
            )}
            {highlightSave && (
              <p className="mt-1 text-[10px] font-medium text-[#25d366]">
                Tap to open · Save to phone
              </p>
            )}
          </div>
        </button>
        {msg.time && (
          <p className="mt-1 px-1 text-right text-[10px] text-[#667781]">
            {msg.time}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * @param {{
 *   msg: RenderableMessage,
 *   senders?: Record<string, import("../../chat/chatSchema.js").ChatSender>,
 *   receipts?: boolean,
 *   highlightInfographic?: boolean,
 * }} props
 */
export default function ChatBubbleRenderer({
  msg,
  senders = {},
  receipts = false,
  highlightInfographic = false,
}) {
  if (msg.type === "divider") {
    return (
      <div className="my-3 flex justify-center">
        <span className="rounded-lg bg-[#e1f2f2] px-3 py-1 text-xs font-medium text-[#54656f] shadow-sm">
          {msg.label}
        </span>
      </div>
    );
  }
  if (msg.type === "forwarded") {
    return <ForwardedBubble msg={msg} senders={senders} />;
  }
  if (msg.type === "link") {
    return <LinkBubble msg={msg} senders={senders} />;
  }
  if (msg.type === "infographic") {
    return (
      <InfographicBubble
        msg={msg}
        senders={senders}
        highlightSave={highlightInfographic}
      />
    );
  }
  return <TextBubble msg={msg} senders={senders} receipts={receipts} />;
}
