import { useEffect, useState } from "react";
import { NOTIFICATION_BANNER_STAY_MS } from "../../content/constants.js";

/**
 * @param {{ data: { app?: string, from?: string, body?: string } | null, onClick?: () => void, autoDismissMs?: number, onDismiss?: () => void }} props
 */
export default function NotificationBanner({
  data,
  onClick,
  autoDismissMs = NOTIFICATION_BANNER_STAY_MS,
  onDismiss,
}) {
  const [phase, setPhase] = useState("hidden");

  useEffect(() => {
    if (!data) {
      setPhase("hidden");
      return;
    }

    setPhase("enter");
    const enterFrame = requestAnimationFrame(() => setPhase("shown"));

    let dismissTimer;
    let exitTimer;
    if (autoDismissMs > 0) {
      dismissTimer = window.setTimeout(() => {
        setPhase("exit");
        exitTimer = window.setTimeout(() => {
          setPhase("hidden");
          onDismiss?.();
        }, 320);
      }, autoDismissMs);
    }

    return () => {
      cancelAnimationFrame(enterFrame);
      if (dismissTimer) window.clearTimeout(dismissTimer);
      if (exitTimer) window.clearTimeout(exitTimer);
    };
  }, [data, autoDismissMs, onDismiss]);

  if (!data || phase === "hidden") return null;

  const appLabel = data.app ?? "Notification";
  const appIcon = appLabel.match(/^(\p{Extended_Pictographic})/u)?.[1] ?? "📱";
  const appName = appLabel.replace(/^(\p{Extended_Pictographic})\s*/u, "").trim() || appLabel;
  const preview = (data.body ?? "").replace(/\s+/g, " ").trim();

  const phaseClass =
    phase === "enter"
      ? "-translate-y-3 opacity-0 scale-[0.98]"
      : phase === "shown"
        ? "translate-y-0 opacity-100 scale-100"
        : "-translate-y-2 opacity-0 scale-[0.98]";

  const pointerClass = phase === "shown" ? "pointer-events-auto" : "pointer-events-none";

  const shellClass = `absolute left-3 right-3 top-11 z-50 transform transition-all duration-300 ease-out ${pointerClass} ${phaseClass}`;

  const inner = (
    <div className="flex gap-3 rounded-2xl border border-white/60 bg-white/95 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-md">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500 text-lg text-white shadow-sm">
        {appIcon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[11px] font-bold text-slate-600">{appName}</p>
          <span className="shrink-0 text-[10px] font-semibold text-slate-400">now</span>
        </div>
        <p className="truncate text-sm font-bold text-slate-900">{data.from}</p>
        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-slate-600">{preview}</p>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${shellClass} text-left`}>
        {inner}
      </button>
    );
  }

  return <div className={shellClass}>{inner}</div>;
}
