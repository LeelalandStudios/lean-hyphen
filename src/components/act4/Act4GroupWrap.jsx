import { useCallback, useState } from "react";
import ScriptedChat from "../chat/ScriptedChat.jsx";
import { getChatDefinition } from "../../content/chatRegistry.js";

const ACT4_GROUP_WRAP_CHAT = getChatDefinition("act4-group-wrap");

/** @param {{ onComplete: () => void }} props */
export default function Act4GroupWrap({ onComplete }) {
  const [chatFading, setChatFading] = useState(false);

  const handleChatComplete = useCallback(() => {
    setChatFading(true);
    window.setTimeout(() => {
      onComplete?.();
    }, 700);
  }, [onComplete]);

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-black/50" />
      <div className="relative mx-auto h-full w-full max-w-lg">
        <ScriptedChat
          definition={ACT4_GROUP_WRAP_CHAT}
          onComplete={handleChatComplete}
          fading={chatFading}
          fadeDurationMs={700}
        />
      </div>
    </div>
  );
}
