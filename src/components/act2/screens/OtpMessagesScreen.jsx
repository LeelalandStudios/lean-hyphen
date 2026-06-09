import { useEffect, useState } from "react";
import StatusBar from "../../phone/StatusBar.jsx";
import { triggerAct2Choice } from "../../../content/act2ChoiceTrigger.js";

/** Two back-to-back OTP messages (Garena + unknown number). */
export default function OtpMessagesScreen({ phone }) {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowSecond(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative flex h-full flex-col bg-white pt-12 text-slate-900">
      <StatusBar dark />
      <header className="shrink-0 border-b border-slate-200 px-4 pb-3">
        <h1 className="text-lg font-bold">Messages</h1>
      </header>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-emerald-700">Garena (Automated)</p>
            <span className="text-[10px] text-slate-400">now</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed">
            Your Free Fire verification code is:{" "}
            <span className="font-mono font-bold">847291</span>. Do not share this code
            with anyone.
          </p>
        </div>

        {showSecond && (
          <div className="animate-[fadeIn_0.4s_ease-out] rounded-2xl border border-amber-200 bg-amber-50 p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-amber-900">+91 87654 32109</p>
              <span className="text-[10px] text-amber-700/70">Unknown</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-amber-950">
              Hi sorry to bother you! I think I accidentally entered your number when
              signing up for Free Fire. The OTP came to you by mistake. Could you please
              send it? I&apos;ll be forever grateful 🙏 It&apos;s urgent I finish setup
            </p>
          </div>
        )}
      </div>

      {phone && (
        <div className="shrink-0 flex gap-2 border-t border-slate-200 bg-white p-3">
          <button
            type="button"
            onClick={() => triggerAct2Choice(phone, "send")}
            className="flex-1 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-bold text-white"
          >
            Forward OTP
          </button>
          <button
            type="button"
            onClick={() => triggerAct2Choice(phone, "ignore")}
            className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700"
          >
            Ignore
          </button>
        </div>
      )}
    </div>
  );
}
