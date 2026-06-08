import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import WhatsAppShell from "../whatsapp/WhatsAppShell.jsx";
import WhatsAppTypingBubble from "../whatsapp/WhatsAppTypingBubble.jsx";
import ChatThread from "./ChatThread.jsx";
import { useChatTimeline } from "../../chat/useChatTimeline.js";
import { beatsToMessages } from "../../chat/beatUtils.js";

/** @typedef {import("../../chat/chatSchema.js").ChatDefinition} ChatDefinition */

function ChatInputBar() {
  return (
    <div className="flex shrink-0 items-center gap-2 border-t border-[#e9edef] bg-[#f0f2f5] px-3 py-2">
      <span className="text-xl text-[#54656f]">😊</span>
      <div className="flex-1 rounded-full bg-white px-4 py-2 text-sm text-[#667781]">
        Message
      </div>
      <span className="text-xl text-[#54656f]">🎤</span>
    </div>
  );
}

function FastForwardControl({ speed, enabled, onSingleClick, onDoubleClick, onResetSpeed }) {
  const clickTimerRef = useRef(null);
  const clickCountRef = useRef(0);
  const longPressTimerRef = useRef(null);
  const longPressTriggeredRef = useRef(false);

  const clearLongPress = useCallback(() => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const startLongPress = useCallback(() => {
    longPressTriggeredRef.current = false;
    clearLongPress();
    longPressTimerRef.current = window.setTimeout(() => {
      longPressTriggeredRef.current = true;
      clickCountRef.current = 0;
      if (clickTimerRef.current) {
        window.clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
      }
      onResetSpeed();
    }, 600);
  }, [clearLongPress, onResetSpeed]);

  if (!enabled) return null;

  const handleClick = () => {
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      return;
    }

    clickCountRef.current += 1;
    if (clickTimerRef.current) window.clearTimeout(clickTimerRef.current);
    clickTimerRef.current = window.setTimeout(() => {
      if (clickCountRef.current === 1) onSingleClick();
      else if (clickCountRef.current >= 2) onDoubleClick();
      clickCountRef.current = 0;
      clickTimerRef.current = null;
    }, 280);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={startLongPress}
      onMouseUp={clearLongPress}
      onMouseLeave={clearLongPress}
      onTouchStart={startLongPress}
      onTouchEnd={clearLongPress}
      onTouchCancel={clearLongPress}
      className="absolute right-3 top-3 z-[100] rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/70 backdrop-blur hover:bg-black/80 hover:text-white"
      title={speed > 1 ? "Hold to reset speed" : undefined}
    >
      {speed > 1 ? `${speed}× speed` : "Fast forward ▶▶"}
    </button>
  );
}

/**
 * Build WhatsApp header subtitle from chat definition.
 * @param {ChatDefinition['header']} header
 */
function buildSubtitle(header) {
  if (header.subtitle && header.currentTime) {
    return `${header.subtitle} · ${header.currentTime}`;
  }
  return header.subtitle ?? header.currentTime ?? undefined;
}

/**
 * @typedef {Object} ScriptedChatHandle
 * @property {(options?: { invokeComplete?: boolean }) => void} skipToEnd
 */

/**
 * @param {{
 *   definition: ChatDefinition,
 *   mode?: 'scripted' | 'static',
 *   onComplete?: () => void,
 *   className?: string,
 *   speedRef?: React.MutableRefObject<number>,
 *   speedMultiplier?: number,
 *   showFastForward?: boolean,
 *   fading?: boolean,
 *   fadeDurationMs?: number,
 * }} props
 * @param {React.Ref<ScriptedChatHandle>} ref
 */
function ScriptedChat(
  {
    definition,
    mode = "scripted",
    onComplete,
    className = "",
    speedRef,
    speedMultiplier: externalSpeed,
    showFastForward,
    fading = false,
    fadeDurationMs = 700,
  },
  ref
) {
  const timeline = useChatTimeline(definition, {
    autoStart: mode === "scripted" && definition.settings.autoStart,
    onComplete,
    speedRef,
  });

  const {
    started,
    start,
    messages,
    typing,
    receiptMessageId,
    receiptsVisible,
    scrollPaused,
    speedMultiplier: internalSpeed,
    scrollRef,
    handleScroll,
    resumeFollowing,
    bumpSpeed,
    resetSpeed,
    skipToEnd,
  } = timeline;

  useImperativeHandle(ref, () => ({ skipToEnd }), [skipToEnd]);

  const speedMultiplier = externalSpeed ?? internalSpeed;
  const staticMessages =
    mode === "static" ? beatsToMessages(definition.beats) : messages;

  const showStartOverlay = mode === "scripted" && !started && !definition.settings.autoStart;
  const fastForwardEnabled =
    showFastForward ?? (mode === "scripted" && definition.settings.fastForward);

  return (
    <div
      className={`relative h-full w-full transition-opacity ${className}`.trim()}
      style={{
        opacity: fading ? 0 : 1,
        transitionDuration: `${fadeDurationMs}ms`,
      }}
    >
      <WhatsAppShell
        title={definition.header.title}
        subtitle={buildSubtitle(definition.header)}
        time={definition.header.currentTime}
        bodyRef={scrollRef}
        onBodyScroll={mode === "scripted" ? handleScroll : undefined}
        footer={definition.settings.inputBar ? <ChatInputBar /> : undefined}
      >
        <div
          className="min-h-full"
          style={{
            backgroundColor: "#e5ddd5",
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.04) 0%, transparent 40%)",
          }}
        >
          <ChatThread
            messages={staticMessages}
            senders={definition.senders}
            encryptedNotice={definition.settings.encryptedNotice}
            receiptMessageId={receiptMessageId}
            receiptsVisible={receiptsVisible}
            className="px-2 py-3"
          />

          {mode === "scripted" && typing && (
            <div className="px-2 pb-3">
              <WhatsAppTypingBubble speed={speedMultiplier} />
            </div>
          )}
        </div>
      </WhatsAppShell>

      {mode === "scripted" && scrollPaused && (
        <button
          type="button"
          onClick={resumeFollowing}
          className="absolute inset-x-0 bottom-16 z-10 flex justify-center"
        >
          <span className="rounded-full bg-black/70 px-4 py-1.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur">
            Tap to continue
          </span>
        </button>
      )}

      {showStartOverlay && (
        <button
          type="button"
          onClick={start}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/40"
        >
          <span className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-[#075e54] shadow-lg">
            Start chat
          </span>
        </button>
      )}

      {fastForwardEnabled && (
        <FastForwardControl
          speed={speedMultiplier}
          enabled
          onSingleClick={bumpSpeed}
          onDoubleClick={() => skipToEnd()}
          onResetSpeed={resetSpeed}
        />
      )}
    </div>
  );
}

export default forwardRef(ScriptedChat);
