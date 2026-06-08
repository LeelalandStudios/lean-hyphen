import { useCallback, useEffect, useRef, useState } from "react";
import { EMAIL_RED_FLAGS } from "../../content/act4Challenge.js";
import { scoreEmailRedFlags } from "./answerScoring.js";
import TimerBar from "./TimerBar.jsx";

function IssueButton({ found, onFound, children }) {
  return (
    <button
      type="button"
      onClick={onFound}
      disabled={found}
      className={`inline rounded-sm px-0.5 text-left transition-colors duration-150 ${
        found
          ? "cursor-default font-semibold text-red-700"
          : "cursor-pointer text-inherit focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-amber-400/50"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * @param {{ active: boolean, onComplete: (result: object) => void }} props
 */
export default function EmailRedFlagGame({ active, onComplete }) {
  const [found, setFound] = useState(() => new Set());
  const foundRef = useRef(found);
  foundRef.current = found;
  const [timerActive, setTimerActive] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (active) {
      setFound(new Set());
      setTimerActive(true);
      setDone(false);
    }
  }, [active]);

  const finish = useCallback(
    (foundSet) => {
      if (done) return;
      setDone(true);
      setTimerActive(false);
      const foundCount = foundSet.size;
      const allIds = EMAIL_RED_FLAGS.issues.map((i) => i.id);
      const missed = allIds.filter((id) => !foundSet.has(id));

      onComplete({
        roundId: "email-red-flags",
        title: "What's Wrong Here?",
        pointsEarned: scoreEmailRedFlags(foundCount),
        maxPoints: 50,
        shieldEarned: foundCount === 4,
        closeCalls: 4 - foundCount,
        correctCount: foundCount,
        totalCount: 4,
        foundIssueIds: [...foundSet],
        missedIssueIds: missed,
        summary: `Found ${foundCount} / 4 red flags.`,
        details: EMAIL_RED_FLAGS.issues.map((issue) => ({
          label: issue.label,
          ok: foundSet.has(issue.id),
          text: issue.explanation,
        })),
      });
    },
    [done, onComplete]
  );

  const onFound = useCallback(
    (issueId) => {
      if (done) return;
      setFound((prev) => {
        const next = new Set(prev);
        next.add(issueId);
        if (next.size >= 4) {
          window.setTimeout(() => finish(next), 300);
        }
        return next;
      });
    },
    [done, finish]
  );

  if (!active) return null;

  const foundCount = found.size;
  const spellingFound = found.has("spelling");

  return (
    <div className="flex flex-1 flex-col gap-3 p-4 md:p-6">
      <TimerBar
        seconds={30}
        active={timerActive && !done}
        onExpire={() => finish(foundRef.current)}
      />
      <div className="shrink-0 text-xs font-semibold text-slate-400">
        Red flags found: {foundCount} / 4
      </div>
      <p className="text-center text-[11px] text-slate-500">
        Tap anything that looks wrong in the email.
      </p>
      <div className="mx-auto w-full max-w-lg overflow-hidden rounded-xl border border-slate-600 bg-white text-slate-800 shadow-lg">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600">
          <p>
            <span className="font-semibold text-slate-800">FROM:</span>{" "}
            <IssueButton found={found.has("domain")} onFound={() => onFound("domain")}>
              {EMAIL_RED_FLAGS.from}
            </IssueButton>
          </p>
          <p className="mt-1 font-bold text-slate-900">{EMAIL_RED_FLAGS.subject}</p>
        </div>
        <div className="space-y-2 p-4 text-sm leading-relaxed text-slate-800">
          <p>Dear Customer,</p>
          <p>
            We have detected suspicious{" "}
            <IssueButton found={spellingFound} onFound={() => onFound("spelling")}>
              activty
            </IssueButton>{" "}
            in your account. Your account has been{" "}
            <IssueButton found={spellingFound} onFound={() => onFound("spelling")}>
              temporarly
            </IssueButton>{" "}
            frozen.
          </p>
          <p>
            Click here to unfreeze:{" "}
            <IssueButton found={found.has("link")} onFound={() => onFound("link")}>
              sbi-account-unfreeze-now.com/verify
            </IssueButton>
          </p>
          <p>
            You must act{" "}
            <IssueButton found={found.has("urgency")} onFound={() => onFound("urgency")}>
              within 1 hour or your account will be permanently closed
            </IssueButton>
            .
          </p>
          <p className="text-slate-600">— SBI Customer Security Team</p>
        </div>
      </div>
    </div>
  );
}
