import { useEffect, useRef, useState } from "react";

/**
 * @param {{
 *   seconds: number,
 *   active: boolean,
 *   onExpire?: () => void,
 *   label?: string,
 * }} props
 */
export default function TimerBar({ seconds, active, onExpire, label = "Time left" }) {
  const [remaining, setRemaining] = useState(seconds);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!active) return;
    expiredRef.current = false;
    setRemaining(seconds);
  }, [active, seconds]);

  useEffect(() => {
    if (!active) return undefined;

    const id = window.setInterval(() => {
      setRemaining((r) => {
        const next = r - 1;
        if (next <= 0 && !expiredRef.current) {
          expiredRef.current = true;
          window.setTimeout(() => onExpireRef.current?.(), 0);
          return 0;
        }
        return Math.max(0, next);
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [active, seconds]);

  const pct = seconds > 0 ? (remaining / seconds) * 100 : 0;
  const urgent = remaining <= 4;
  const critical = remaining <= 2;

  return (
    <div className="shrink-0" role="timer" aria-live="polite">
      <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>{label}</span>
        <span className={critical ? "text-red-400" : urgent ? "text-amber-400" : "text-slate-300"}>
          {remaining}s
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            critical ? "bg-red-500" : urgent ? "bg-amber-500" : "bg-emerald-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
