import { useCallback, useEffect, useState } from "react";
import { FAKE_LINK_FEEDBACK, FAKE_LINK_OPTIONS } from "../../content/act4Challenge.js";
import TimerBar from "./TimerBar.jsx";

function PhoneOption({ option, locked, onSelect }) {
  const n = option.notification;

  return (
    <div className="shrink-0 w-[min(100vw-2rem,300px)]">
      <div className="rounded-[2.25rem] border-[8px] border-black bg-slate-950 p-0 shadow-2xl">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-indigo-800 via-violet-800 to-slate-950">
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-3 w-[4.5rem] -translate-x-1/2 rounded-full bg-black" />

          <div className="relative z-10 flex h-full min-h-0 flex-col px-3 pb-4 pt-9">
            <div className="pointer-events-none flex shrink-0 items-center justify-between text-[11px] font-semibold text-white/80">
              <span>11:47</span>
              <span className="tracking-wide">5G ▰▰▰</span>
            </div>

            <p className="pointer-events-none mt-4 shrink-0 text-center text-[10px] font-bold uppercase tracking-wider text-white/50">
              Phone {option.label}
            </p>

            <div className="mt-3 shrink-0">
              <button
                type="button"
                disabled={locked}
                onClick={() => onSelect(option.id)}
                aria-label={`Notification ${option.label}: ${option.display}`}
                className="group w-full rounded-2xl border-2 border-transparent bg-white p-3 text-left text-slate-950 shadow-lg transition enabled:cursor-pointer enabled:hover:border-amber-400 enabled:hover:bg-amber-50 enabled:hover:shadow-[0_0_0_3px_rgba(251,191,36,0.35)] enabled:hover:ring-2 enabled:hover:ring-amber-400/50 focus:outline-none focus-visible:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 disabled:cursor-default disabled:opacity-70"
              >
                <div className="flex items-start gap-2.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#5f259f] text-lg text-white">
                    Pe
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-slate-800">{n.appName}</p>
                      <span className="shrink-0 text-[11px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="mt-1 text-sm font-bold leading-snug text-slate-950">
                      {n.title}
                    </p>
                  </div>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-slate-600">{n.body}</p>

                <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 transition group-hover:border-amber-300 group-hover:bg-amber-100/60">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Link in notification
                  </p>
                  <p className="mt-1 break-all font-mono text-[11px] leading-relaxed">
                    <span className="font-bold text-emerald-800">{option.domain}</span>
                    <span className="text-slate-600">{option.path}</span>
                  </p>
                </div>
              </button>
            </div>

            <div className="pointer-events-none mt-auto flex shrink-0 justify-center pt-4">
              <span className="h-1 w-24 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{ active: boolean, onComplete: (result: object) => void }} props
 */
export default function FakeLinkGame({ active, onComplete }) {
  const [locked, setLocked] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (active) {
      setLocked(false);
      setTimerActive(true);
    }
  }, [active]);

  const finish = useCallback(
    (selectedId, timedOut = false) => {
      if (locked) return;
      setLocked(true);
      setTimerActive(false);

      const correct = FAKE_LINK_OPTIONS.find((o) => o.correct);
      const selected = FAKE_LINK_OPTIONS.find((o) => o.id === selectedId);
      const selectedCorrect = !timedOut && selected?.correct === true;

      onComplete({
        roundId: "fake-link",
        title: "Spot the Fake Link",
        pointsEarned: selectedCorrect ? 30 : 0,
        maxPoints: 30,
        shieldEarned: selectedCorrect,
        closeCalls: selectedCorrect ? 0 : 1,
        correctCount: selectedCorrect ? 1 : 0,
        totalCount: 1,
        summary: selectedCorrect
          ? FAKE_LINK_FEEDBACK.correct
          : timedOut
            ? "Time ran out — the real link was phonepe.com."
            : `Wrong — ${selected?.why ?? "That domain was fake."} The real link was ${correct?.display}.`,
        details: FAKE_LINK_OPTIONS.map((o) => ({
          label: `Phone ${o.label}`,
          ok: o.correct,
          text: o.correct ? "Real domain" : o.why,
        })),
      });
    },
    [locked, onComplete]
  );

  if (!active) return null;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 md:p-6">
      <TimerBar
        seconds={15}
        active={timerActive && !locked}
        onExpire={() => finish(null, true)}
      />
      <p className="shrink-0 text-center text-sm text-slate-400">
        Tap the notification with the real domain
      </p>
      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto pb-2">
        <div className="mx-auto flex w-max max-w-full justify-center gap-6 px-2 py-2">
          {FAKE_LINK_OPTIONS.map((opt) => (
            <PhoneOption
              key={opt.id}
              option={opt}
              locked={locked}
              onSelect={finish}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
