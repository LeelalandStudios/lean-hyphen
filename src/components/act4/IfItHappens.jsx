import { ACT4_HELP_STEPS } from "../../content/act4Challenge.js";
import ChallengeButton from "./ChallengeButton.jsx";

/** @param {{ onContinue: () => void }} props */
export default function IfItHappens({ onContinue }) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
      <div className="mx-auto w-full max-w-lg">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-400/90">
          🆘 If it happens to you
        </p>
        <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-200">
          {ACT4_HELP_STEPS.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-bold text-emerald-400">{i + 1}.</span>
              <span className={step.includes("nothing wrong") ? "font-semibold text-white" : ""}>
                {step}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-xl border border-slate-600 bg-slate-800/60 p-4 text-center">
          <p className="text-sm font-bold text-white">National Cyber Crime Helpline: 1930</p>
          <p className="mt-1 text-sm text-emerald-400">cybercrime.gov.in</p>
        </div>
        <div className="mt-8 flex justify-end">
          <ChallengeButton onClick={onContinue}>Finish →</ChallengeButton>
        </div>
      </div>
    </div>
  );
}
