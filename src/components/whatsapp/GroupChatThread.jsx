import {
  INFOGRAPHIC_FILENAME,
  INFOGRAPHIC_SRC,
} from "../../content/act1Scene2.js";

function TextBubble({ msg }) {
  return (
    <div className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-lg px-3 py-2 shadow-sm ${
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
        <p className="whitespace-pre-wrap text-sm text-[#111b21]">{msg.text}</p>
        <p className="mt-1 text-right text-[10px] text-[#667781]">{msg.time}</p>
      </div>
    </div>
  );
}

function ForwardedBubble({ msg }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[88%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
        <p className="mb-0.5 text-xs font-semibold text-[#e542a3]">{msg.sender}</p>
        <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-[#667781]">
          ↪ Forwarded
        </p>
        <div className="rounded-md border-l-4 border-[#25d366] bg-[#f0f2f5] px-2 py-1.5">
          <p className="whitespace-pre-wrap text-sm text-[#111b21]">{msg.body}</p>
        </div>
        <p className="mt-1 text-right text-[10px] text-[#667781]">{msg.time}</p>
      </div>
    </div>
  );
}

function GameLinkBubble({ msg }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] rounded-lg rounded-tl-none bg-white px-2 py-2 shadow-sm">
        <p className="mb-1 px-1 text-xs font-semibold text-[#e542a3]">{msg.sender}</p>
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
        <p className="mt-1 px-1 text-right text-[10px] text-[#667781]">{msg.time}</p>
      </div>
    </div>
  );
}

function InfographicBubble({ msg, highlightSave }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[92%] rounded-lg rounded-tl-none bg-white px-2 py-2 shadow-sm">
        <p className="mb-1 px-1 text-xs font-semibold text-[#e542a3]">
          {msg.sender}
        </p>
        <button
          type="button"
          className="block w-full overflow-hidden rounded-lg border border-[#e9edef] text-left"
        >
          <img
            src={INFOGRAPHIC_SRC}
            alt="SPOT THE SCAM infographic"
            className="max-h-40 w-full object-cover object-top"
          />
          <div className="bg-[#f0f2f5] px-2 py-2">
            <p className="text-xs font-semibold text-[#075e54]">
              📎 {INFOGRAPHIC_FILENAME}
            </p>
            <p className="text-[10px] text-[#667781]">{msg.caption}</p>
            {highlightSave && (
              <p className="mt-1 text-[10px] font-medium text-[#25d366]">
                Tap to open · Save to phone
              </p>
            )}
          </div>
        </button>
        <p className="mt-1 px-1 text-right text-[10px] text-[#667781]">
          {msg.time}
        </p>
      </div>
    </div>
  );
}

/** @param {{ messages: import("../../content/act1Scene2.js").ACT1_PAYTM_DIALOG, highlightInfographic?: boolean }} props */
export default function GroupChatThread({
  messages,
  highlightInfographic = false,
}) {
  return (
    <div className="space-y-2 p-3 pb-4">
      <p className="my-2 rounded-lg bg-[#fff9c4] px-3 py-1.5 text-center text-xs text-[#54656f] shadow-sm">
        Messages are end-to-end encrypted.
      </p>

      {messages.map((msg, index) => {
        if (msg.type === "divider") {
          return (
            <div key={index} className="my-3 flex justify-center">
              <span className="rounded-lg bg-[#e1f2f2] px-3 py-1 text-xs font-medium text-[#54656f] shadow-sm">
                {msg.label}
              </span>
            </div>
          );
        }
        if (msg.type === "forwarded") {
          return <ForwardedBubble key={index} msg={msg} />;
        }
        if (msg.type === "game_link") {
          return <GameLinkBubble key={index} msg={msg} />;
        }
        if (msg.type === "infographic") {
          return (
            <InfographicBubble
              key={index}
              msg={msg}
              highlightSave={highlightInfographic}
            />
          );
        }
        return <TextBubble key={index} msg={msg} />;
      })}
    </div>
  );
}
