import { useEffect, useMemo, useRef, useState } from "react";
import { getPuzzle } from "../../content/act4SpotTheIssue.js";

function IssueButton({ issueId, found, onFound, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={() => onFound(issueId)}
      disabled={found}
      className={`rounded px-0.5 text-left transition ${
        found
          ? "bg-emerald-200 font-semibold text-emerald-900 ring-2 ring-emerald-500"
          : "cursor-pointer bg-amber-100/80 text-inherit underline decoration-dotted decoration-amber-600 hover:bg-amber-200"
      } ${className}`}
    >
      {children}
    </button>
  );
}

function ProgressBar({ found, total }) {
  return (
    <div className="shrink-0 border-b border-slate-200 bg-slate-50 px-4 py-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>Red flags found</span>
        <span>
          {found}/{total}
        </span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${total ? (found / total) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
}

function EmailPuzzleBody({ found, onFound }) {
  return (
    <div className="p-4 text-sm leading-relaxed text-slate-700">
      <p className="text-xs text-slate-500">
        From: Riverside Academy Fees &lt;
        <IssueButton issueId="sender" found={found.has("sender")} onFound={onFound}>
          noreply@sch00l-portal.com
        </IssueButton>
        &gt;
      </p>
      <h2 className="mt-3 text-base font-bold text-slate-900">
        URGENT — Fee payment failed (Action required)
      </h2>
      <p className="mt-3">Dear Student,</p>
      <p className="mt-2">
        Our records show your term fee payment did not go through. Please update within{" "}
        <IssueButton issueId="urgency" found={found.has("urgency")} onFound={onFound}>
          2 hours to avoid an enrollment hold
        </IssueButton>
        .
      </p>
      <p className="mt-2">
        Pay now:{" "}
        <IssueButton issueId="link" found={found.has("link")} onFound={onFound}>
          https://sch00l-portal.com/pay-fees
        </IssueButton>
      </p>
    </div>
  );
}

function MessagePuzzleBody({ found, onFound }) {
  return (
    <div className="space-y-3 p-4">
      <p className="text-center text-[10px] font-medium uppercase text-red-600">
        <IssueButton issueId="unknown" found={found.has("unknown")} onFound={onFound}>
          +91 90000 12345
        </IssueButton>{" "}
        · Unknown
      </p>
      <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm">
        Sorry yaar, I think I used your number by mistake while signing up. Did you get a
        6-digit{" "}
        <IssueButton issueId="otp_ask" found={found.has("otp_ask")} onFound={onFound}>
          OTP? Please send it
        </IssueButton>
        , I need to get into my account.
      </div>
      <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm">
        <IssueButton issueId="pressure" found={found.has("pressure")} onFound={onFound}>
          Hello?? The code expires in 5 minutes. Your account will be locked
        </IssueButton>{" "}
        if I can&apos;t sign in — please help
      </div>
    </div>
  );
}

function WhatsappPuzzleBody({ found, onFound }) {
  return (
    <div className="space-y-3 p-4">
      <p className="text-xs font-bold text-amber-400">
        <IssueButton
          issueId="verify_badge"
          found={found.has("verify_badge")}
          onFound={onFound}
          className="text-amber-400"
        >
          [MLBB_VERIFY] ✓
        </IssueButton>{" "}
        System
      </p>
      <div className="max-w-[90%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm text-slate-800 shadow-sm">
        Unusual login detected. Reply with your registered email +{" "}
        <IssueButton issueId="password" found={found.has("password")} onFound={onFound}>
          password within 10 minutes
        </IssueButton>{" "}
        to avoid permanent ban.
      </div>
      <div className="max-w-[90%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm text-slate-800 shadow-sm">
        Or tap:{" "}
        <IssueButton issueId="verify_link" found={found.has("verify_link")} onFound={onFound}>
          mlbb-security-verify.net/confirm
        </IssueButton>
      </div>
    </div>
  );
}

/**
 * @param {{ puzzleId: string, onAllFound?: () => void }} props
 */
export default function SpotTheIssuePuzzle({ puzzleId, onAllFound }) {
  const puzzle = getPuzzle(puzzleId);
  const [found, setFound] = useState(() => new Set());
  const [lastFound, setLastFound] = useState(null);

  const issueMap = useMemo(
    () => Object.fromEntries(puzzle.issues.map((i) => [i.id, i])),
    [puzzle.issues]
  );

  const onFound = (issueId) => {
    if (found.has(issueId)) return;
    setFound((prev) => new Set([...prev, issueId]));
    setLastFound(issueId);
  };

  const complete = found.size >= puzzle.totalIssues;
  const firedComplete = useRef(false);

  useEffect(() => {
    firedComplete.current = false;
  }, [puzzleId]);

  useEffect(() => {
    if (!complete || !onAllFound || firedComplete.current) return;
    firedComplete.current = true;
    const id = window.setTimeout(onAllFound, 900);
    return () => window.clearTimeout(id);
  }, [complete, onAllFound]);

  const shellClass =
    puzzle.type === "whatsapp"
      ? "bg-gradient-to-b from-indigo-950 to-slate-900 text-white"
      : "bg-white text-slate-900";

  return (
    <div className={`relative flex h-full flex-col ${shellClass}`}>
      <header className="shrink-0 border-b border-slate-200/20 px-4 py-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
          {puzzle.title}
        </p>
        <p className="text-xs text-slate-500">{puzzle.subtitle}</p>
        <p className="mt-1 text-sm font-medium">{puzzle.instruction}</p>
      </header>

      <ProgressBar found={found.size} total={puzzle.totalIssues} />

      <div className="min-h-0 flex-1 overflow-y-auto">
        {puzzle.type === "email" && <EmailPuzzleBody found={found} onFound={onFound} />}
        {puzzle.type === "message" && <MessagePuzzleBody found={found} onFound={onFound} />}
        {puzzle.type === "whatsapp" && (
          <WhatsappPuzzleBody found={found} onFound={onFound} />
        )}
      </div>

      {lastFound && issueMap[lastFound] && (
        <p className="shrink-0 border-t border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-xs font-medium text-emerald-800">
          ✓ {issueMap[lastFound].foundLabel}
        </p>
      )}

      {complete && (
        <div className="shrink-0 border-t border-emerald-300 bg-emerald-600 px-4 py-4 text-center text-sm font-semibold text-white">
          All red flags found — nice eye!
        </div>
      )}
    </div>
  );
}
