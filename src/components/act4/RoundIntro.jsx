import ChallengeButton from "./ChallengeButton.jsx";

/**
 * @param {{
 *   roundNumber: number,
 *   title: string,
 *   prompt: string,
 *   timerLabel?: string,
 *   onBegin: () => void,
 * }} props
 */
export default function RoundIntro({ roundNumber, title, prompt, timerLabel, onBegin }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-amber-400/80">
        Mini-game {roundNumber}
      </p>
      <h2 className="mt-3 text-center text-2xl font-extrabold text-white">{title}</h2>
      <p className="mt-4 max-w-md text-center text-sm leading-relaxed text-slate-300">
        {prompt}
      </p>
      {timerLabel && (
        <p className="mt-3 text-center text-xs font-semibold text-amber-400/90">
          Timer: {timerLabel}
        </p>
      )}
      <ChallengeButton className="mt-8" onClick={onBegin}>
        Begin →
      </ChallengeButton>
    </div>
  );
}
