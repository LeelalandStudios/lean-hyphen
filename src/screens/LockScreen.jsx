import { useCallback, useEffect, useRef, useState } from "react";
import { playScamNotification } from "../utils/sound.js";
import StatusBar from "../components/phone/StatusBar.jsx";
import NotificationBanner from "../components/phone/NotificationBanner.jsx";

const SWIPE_UP_THRESHOLD_PX = 56;

/**
 * @param {{
 *   onUnlock?: () => void,
 *   notification?: { app?: string, appLabel?: string, from?: string, body?: string } | null,
 * }} props
 */
export default function LockScreen({ onUnlock, notification = null }) {
  const [showNotification, setShowNotification] = useState(false);
  const swipeStartY = useRef(null);

  useEffect(() => {
    if (!notification) {
      setShowNotification(false);
      return;
    }
    const t = window.setTimeout(() => {
      setShowNotification(true);
      playScamNotification();
    }, 400);
    return () => window.clearTimeout(t);
  }, [notification]);

  const trySwipeUnlock = useCallback(
    (endClientY) => {
      if (!onUnlock || swipeStartY.current == null) return;
      const delta = swipeStartY.current - endClientY;
      swipeStartY.current = null;
      if (delta >= SWIPE_UP_THRESHOLD_PX) onUnlock();
    },
    [onUnlock]
  );

  const handlePointerDown = useCallback((clientY) => {
    swipeStartY.current = clientY;
  }, []);

  const handleTouchStart = useCallback(
    (e) => {
      handlePointerDown(e.touches[0]?.clientY ?? 0);
    },
    [handlePointerDown]
  );

  const handleTouchEnd = useCallback(
    (e) => {
      trySwipeUnlock(e.changedTouches[0]?.clientY ?? 0);
    },
    [trySwipeUnlock]
  );

  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      handlePointerDown(e.clientY);
    },
    [handlePointerDown]
  );

  const handleMouseUp = useCallback(
    (e) => {
      trySwipeUnlock(e.clientY);
    },
    [trySwipeUnlock]
  );

  const bannerData = notification
    ? {
        app: notification.appLabel ?? notification.app,
        from: notification.from,
        body: notification.body,
      }
    : null;

  const unlockHint = (
    <div className="flex flex-col items-center gap-0.5 text-center text-[11px] font-medium leading-snug">
      <span>Swipe up</span>
      <span className="text-white/60">tap to continue</span>
    </div>
  );

  return (
    <div
      className="relative h-full touch-pan-y bg-gradient-to-br from-cyan-700 via-blue-900 to-black text-white"
      onTouchStart={onUnlock ? handleTouchStart : undefined}
      onTouchEnd={onUnlock ? handleTouchEnd : undefined}
      onMouseDown={onUnlock ? handleMouseDown : undefined}
      onMouseUp={onUnlock ? handleMouseUp : undefined}
    >
      <StatusBar />
      {showNotification && bannerData && (
        <NotificationBanner data={bannerData} autoDismissMs={0} />
      )}
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="text-6xl font-light">3:47</div>
        <div className="text-lg">Saturday</div>
        {onUnlock ? (
          <button
            type="button"
            onClick={onUnlock}
            className="absolute bottom-10 rounded-full px-6 py-3 transition hover:bg-white/10 active:bg-white/15"
          >
            {unlockHint}
          </button>
        ) : (
          <div className="absolute bottom-10 px-6 py-3">{unlockHint}</div>
        )}
      </div>
    </div>
  );
}
