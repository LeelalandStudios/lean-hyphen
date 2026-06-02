import { useCallback, useEffect, useRef, useState } from "react";
import { beatToMessage } from "./beatUtils.js";
import { playNotification } from "../utils/sound.js";
import { resolveMessageDelayAfter } from "./computeAutoDelay.js";
import { RENDERABLE_BEAT_TYPES } from "./chatSchema.js";

/** @typedef {import("../chatSchema.js").ChatDefinition} ChatDefinition */
/** @typedef {import("../components/chat/ChatBubbleRenderer.jsx").RenderableMessage} RenderableMessage */

const SCROLL_BOTTOM_THRESHOLD = 48;

function isAtBottom(el) {
  return el.scrollHeight - el.scrollTop - el.clientHeight <= SCROLL_BOTTOM_THRESHOLD;
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function scaledMs(ms, speed) {
  return Math.max(1, ms / speed);
}

async function scaledWait(ms, speedRef) {
  await wait(scaledMs(ms, speedRef.current));
}

/**
 * @param {ChatDefinition} definition
 * @param {{ autoStart?: boolean, onComplete?: () => void, speedRef?: React.MutableRefObject<number> }} [options]
 */
export function useChatTimeline(definition, options = {}) {
  const { autoStart = definition.settings.autoStart, onComplete, speedRef: externalSpeedRef } =
    options;
  const { beats, settings } = definition;
  const defaultTime = settings.defaultTime;

  const [started, setStarted] = useState(autoStart);
  const [beatIndex, setBeatIndex] = useState(0);
  const [messages, setMessages] = useState(/** @type {RenderableMessage[]} */ ([]));
  const [typing, setTyping] = useState(false);
  const [receiptMessageId, setReceiptMessageId] = useState(/** @type {string|null} */ (null));
  const [receiptsVisible, setReceiptsVisible] = useState(false);
  const [scrollPaused, setScrollPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [internalSpeed, setInternalSpeed] = useState(1);

  const internalSpeedRef = useRef(1);
  const speedRef = externalSpeedRef ?? internalSpeedRef;
  if (!externalSpeedRef) {
    internalSpeedRef.current = internalSpeed;
  }

  const speedMultiplier = externalSpeedRef ? externalSpeedRef.current : internalSpeed;  const scrollRef = useRef(/** @type {HTMLDivElement|null} */ (null));
  const messagesRef = useRef(messages);
  const beatRunning = useRef(false);
  const mountedRef = useRef(true);
  const scrollPausedRef = useRef(false);
  const programmaticScrollRef = useRef(false);
  const lastAutoScrollTopRef = useRef(0);
  const skipRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  messagesRef.current = messages;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const scrollToBottom = useCallback((force = false) => {
    if (!settings.autoScroll) return;
    if (!force && scrollPausedRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    programmaticScrollRef.current = true;
    el.scrollTop = el.scrollHeight;
    lastAutoScrollTopRef.current = el.scrollTop;
    requestAnimationFrame(() => {
      programmaticScrollRef.current = false;
    });
  }, [settings.autoScroll]);

  const pauseFollowing = useCallback(() => {
    if (scrollPausedRef.current) return;
    scrollPausedRef.current = true;
    setScrollPaused(true);
    programmaticScrollRef.current = false;
  }, []);

  const setFollowing = useCallback(
    (following) => {
      scrollPausedRef.current = !following;
      setScrollPaused(!following);
      if (following) scrollToBottom(true);
    },
    [scrollToBottom]
  );

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (el.scrollTop < lastAutoScrollTopRef.current - 8) {
      pauseFollowing();
      return;
    }

    if (programmaticScrollRef.current) return;

    if (isAtBottom(el)) {
      if (scrollPausedRef.current) setFollowing(true);
    } else if (!scrollPausedRef.current) {
      pauseFollowing();
    }
  }, [setFollowing, pauseFollowing]);

  const resumeFollowing = useCallback(() => {
    setFollowing(true);
  }, [setFollowing]);

  useEffect(() => {
    if (!started) return;
    scrollToBottom();
  }, [messages, typing, scrollToBottom, started]);

  const waitUntilFollowing = useCallback(async () => {
    while (scrollPausedRef.current && mountedRef.current && !skipRef.current) {
      await scaledWait(80, speedRef);
    }
  }, []);

  scrollPausedRef.current = scrollPaused;

  const bumpSpeed = useCallback(() => {
    if (externalSpeedRef) return;
    setInternalSpeed((m) => m * 2);
  }, [externalSpeedRef]);

  const resetSpeed = useCallback(() => {
    if (externalSpeedRef) return;
    setInternalSpeed(1);
  }, [externalSpeedRef]);

  const skipToEnd = useCallback((options = {}) => {
    const invokeComplete = options.invokeComplete !== false;
    skipRef.current = true;
    beatRunning.current = false;
    scrollPausedRef.current = false;
    setTyping(false);
    setScrollPaused(false);

    /** @type {RenderableMessage[]} */
    const allMessages = [];
    let receiptTarget = null;

    beats.forEach((beat, index) => {
      const msg = beatToMessage(beat, index, defaultTime);
      if (msg) allMessages.push(msg);
      if (beat.type === "readReceipts") {
        receiptTarget = beat.target;
      }
    });

    let receiptId = null;
    if (receiptTarget) {
      const match = allMessages.find(
        (m) =>
          m.text === receiptTarget ||
          m.body === receiptTarget ||
          (m.text != null && m.text.includes(receiptTarget))
      );
      receiptId = match?.id ?? null;
    } else {
      const withReceipts = beats.findIndex(
        (b, i) =>
          b.type === "message" &&
          b.receipts &&
          allMessages.some((m) => m.id === `msg-${i}`)
      );
      if (withReceipts >= 0) receiptId = `msg-${withReceipts}`;
    }

    setReceiptMessageId(receiptId);
    setReceiptsVisible(Boolean(receiptId));
    setMessages(allMessages);
    setBeatIndex(beats.length);
    setIsComplete(true);
    if (invokeComplete) {
      onCompleteRef.current?.();
    }

    window.setTimeout(() => {
      skipRef.current = false;
    }, 0);
  }, [beats, defaultTime]);

  const runBeat = useCallback(
    async (index) => {
      if (beatRunning.current || skipRef.current || !started) return;
      beatRunning.current = true;

      await waitUntilFollowing();
      if (!mountedRef.current || skipRef.current) {
        beatRunning.current = false;
        return;
      }

      const beat = beats[index];
      if (!beat) {
        beatRunning.current = false;
        setIsComplete(true);
        onCompleteRef.current?.();
        return;
      }

      if (beat.type === "typing" || beat.type === "pause") {
        setTyping(true);
        const duration =
          beat.type === "typing"
            ? beat.durationMs ?? settings.defaultTypingMs
            : beat.durationMs;
        await scaledWait(duration, speedRef);
        if (!mountedRef.current || skipRef.current) return;
        setTyping(false);
        await waitUntilFollowing();
        if (!mountedRef.current || skipRef.current) return;
        beatRunning.current = false;
        setBeatIndex(index + 1);
        return;
      }

      if (beat.type === "readReceipts") {
        let targetId = null;
        if (beat.target) {
          const match = messagesRef.current.find(
            (m) =>
              m.text === beat.target ||
              m.body === beat.target ||
              (m.text != null && m.text.includes(beat.target))
          );
          targetId = match?.id ?? null;
        } else {
          const prev = messagesRef.current[messagesRef.current.length - 1];
          targetId = prev?.id ?? null;
        }
        if (targetId) {
          setReceiptMessageId(targetId);
          await scaledWait(450, speedRef);
          if (!mountedRef.current || skipRef.current) return;
          setReceiptsVisible(true);
          await scaledWait(2000, speedRef);
        }
        if (!mountedRef.current || skipRef.current) return;
        await waitUntilFollowing();
        if (!mountedRef.current || skipRef.current) return;
        beatRunning.current = false;
        setBeatIndex(index + 1);
        return;
      }

      if (RENDERABLE_BEAT_TYPES.has(beat.type)) {
        if (beat.type === "message" && beat.delayBeforeMs) {
          await scaledWait(beat.delayBeforeMs, speedRef);
          if (!mountedRef.current || skipRef.current) return;
        }

        const msg = beatToMessage(beat, index, defaultTime);
        if (msg) {
          setMessages((prev) => [...prev, msg]);
          if (beat.type === "message") {
            playNotification();
          }
          if (beat.type === "message" && beat.receipts) {
            setReceiptMessageId(msg.id ?? null);
          }
        }

        if (beat.type === "message") {
          const delay = resolveMessageDelayAfter(
            beat.text,
            beat.delayAfterMs,
            settings.defaultMessageDelayMs
          );
          await scaledWait(delay, speedRef);
        } else {
          await scaledWait(1200, speedRef);
        }

        if (!mountedRef.current || skipRef.current) return;
        await waitUntilFollowing();
        if (!mountedRef.current || skipRef.current) return;
        beatRunning.current = false;
        setBeatIndex(index + 1);
        return;
      }

      beatRunning.current = false;
      setBeatIndex(index + 1);
    },
    [beats, defaultTime, settings.defaultMessageDelayMs, settings.defaultTypingMs, started, waitUntilFollowing]
  );

  useEffect(() => {
    if (!started || beatRunning.current || skipRef.current) return;
    void runBeat(beatIndex);
  }, [started, beatIndex, runBeat]);

  useEffect(() => {
    if (!started) return;
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY < 0) pauseFollowing();
    };

    let touchY = 0;
    const onTouchStart = (e) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      const y = e.touches[0]?.clientY ?? touchY;
      if (y > touchY + 8) pauseFollowing();
      touchY = y;
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [started, pauseFollowing]);

  const start = useCallback(() => setStarted(true), []);

  return {
    started,
    start,
    messages,
    typing,
    receiptMessageId,
    receiptsVisible,
    scrollPaused,
    isComplete,
    speedMultiplier,
    scrollRef,
    handleScroll,
    resumeFollowing,
    bumpSpeed,
    resetSpeed,
    skipToEnd,
  };
}
