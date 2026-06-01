import { ACT4_RULES } from "../../content/act4Challenge.js";
import ChallengeButton from "./ChallengeButton.jsx";

/** @param {{ onContinue: () => void }} props */
export default function FinalRules({ onContinue }) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
      <div className="mx-auto w-full max-w-lg">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
          🛡️ The 5 rules — lock these in
        </p>
        <ul className="mt-6 space-y-4">
          {ACT4_RULES.map((rule, i) => (
            <li
              key={rule.id}
              className="rounded-xl border border-slate-700 bg-slate-800/50 p-4"
            >
              <p className="text-xs font-bold uppercase text-amber-400/90">
                {i + 1}. {rule.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">{rule.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-end">
          <ChallengeButton onClick={onContinue}>What if it happens to me? →</ChallengeButton>
        </div>
      </div>
    </div>
  );
}
