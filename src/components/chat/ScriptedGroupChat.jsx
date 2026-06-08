import { useCallback, useEffect, useRef, useState } from "react";
import GroupChatThread from "../whatsapp/GroupChatThread.jsx";
import WhatsAppShell from "../whatsapp/WhatsAppShell.jsx";
import { ROOM_CHARACTERS } from "../room/roomCharacters.js";
import { playVoiceoverForText, stopVoiceover } from "../../utils/voiceover.js";

const GROUP_TITLE = "🔥 Squad Goals";

function lineToMessage(line, time) {
  const name = ROOM_CHARACTERS[line.speaker]?.name ?? line.speaker;
  return {
    sender: name.charAt(0).toUpperCase() + name.slice(1),
    text: line.text,
    time,
  };
}

/**
 * Sequential Squad Goals group chat (WhatsApp-style).
 * @param {{
 *   script: { speaker: string, type?: string, text: string, label?: string }[],
 *   subtitle?: string,
 *   timeLabel?: string,
 *   onComplete?: () => void,
 *   finalButtonLabel?: string,
 *   header?: import("react").ReactNode,
 * }} props
 */
export default function ScriptedGroupChat({
  script,
  subtitle = "5 members",
  timeLabel = "12:14 AM",
  onComplete,
  finalButtonLabel = "Continue →",
  header,
}) {
  const lines = script.filter((line) => line.type !== "cta");
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    setVisibleCount(0);
    setTyping(false);
    setDone(false);
  }, [script]);

  useEffect(() => {
    if (visibleCount >= lines.length) {
      setDone(true);
      return;
    }

    setTyping(true);
    const typingMs = Math.min(1800, 600 + (lines[visibleCount]?.text?.length ?? 0) * 8);
    const timerId = window.setTimeout(() => {
      setTyping(false);
      setVisibleCount((count) => count + 1);
    }, typingMs);

    return () => window.clearTimeout(timerId);
  }, [visibleCount, lines]);

  useEffect(() => {
    if (typing || visibleCount === 0 || visibleCount > lines.length) return;
    const line = lines[visibleCount - 1];
    if (line?.text) playVoiceoverForText(line.text);
    return () => stopVoiceover();
  }, [visibleCount, typing, lines]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [visibleCount, typing]);

  const messages = lines
    .slice(0, visibleCount)
    .map((line) => lineToMessage(line, timeLabel));

  const handleComplete = useCallback(() => {
    stopVoiceover();
    onComplete?.();
  }, [onComplete]);

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {header}
      <div className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col px-3 pb-4 pt-2">
        <div className="min-h-0 flex-1 overflow-hidden rounded-[2rem] border-[6px] border-black shadow-2xl">
          <WhatsAppShell title={GROUP_TITLE} subtitle={subtitle} bodyRef={bodyRef}>
            <GroupChatThread messages={messages} />
            {typing && (
              <div className="px-3 pb-3">
                <div className="inline-flex items-center gap-1 rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-[#667781]"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </WhatsAppShell>
        </div>

        {done && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleComplete}
              className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-extrabold text-slate-950 shadow-lg transition hover:bg-emerald-400"
            >
              {finalButtonLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
