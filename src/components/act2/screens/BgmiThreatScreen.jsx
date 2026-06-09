import StatusBar from "../../phone/StatusBar.jsx";
import { triggerAct2Choice } from "../../../content/act2ChoiceTrigger.js";

/** BGMI in-game inbox threat mid-match. */
export default function BgmiThreatScreen({ phone }) {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-slate-800 via-slate-900 to-black pt-12 text-white">
      <StatusBar />

      <div className="shrink-0 px-3 pb-2">
        <div className="flex items-center justify-between rounded-lg bg-black/40 px-3 py-2 text-[10px]">
          <span className="text-emerald-400">● Squad alive (3/4)</span>
          <span className="font-mono text-amber-300">⏱ 04:23</span>
          <span className="text-white/60">Zone 2 closing</span>
        </div>
      </div>

      <div className="min-h-0 flex-1 p-3">
        <div className="rounded-xl border border-red-500/50 bg-red-950/60 p-4 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase">
              Inbox
            </span>
            <span className="text-xs font-bold text-red-200">[BGMI_SECURITY_OFFICIAL]</span>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-red-50/90">
            Urgent: Our system has detected third-party software linked to your UID. As
            per policy, your account will be permanently banned in{" "}
            <span className="font-bold text-amber-300">15 minutes</span> unless you
            verify your identity. Reply with your email and password to the security
            team immediately.
          </p>
          <p className="mt-2 text-[11px] text-red-200/70">
            — Krafton Verification Team
          </p>
        </div>

        {phone ? (
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => triggerAct2Choice(phone, "both")}
              className="flex-1 rounded-lg bg-red-600 px-3 py-2.5 text-xs font-bold text-white"
            >
              Send Details
            </button>
            <button
              type="button"
              onClick={() => triggerAct2Choice(phone, "report")}
              className="flex-1 rounded-lg border border-emerald-500/50 bg-emerald-950/40 px-3 py-2.5 text-xs font-bold text-emerald-300"
            >
              Report Account
            </button>
          </div>
        ) : (
          <div className="mt-3 rounded-lg border border-white/10 bg-black/30 p-3 text-center text-[10px] text-white/40">
            Match in progress — tap inbox to respond
          </div>
        )}
      </div>
    </div>
  );
}
