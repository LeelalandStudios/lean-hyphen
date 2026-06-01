import { SPOT_GAME_TITLE, SPOT_GAME_URL, SPOT_PUZZLES } from "../../content/act4SpotTheIssue.js";
import StatusBar from "../../components/phone/StatusBar.jsx";

/**
 * @param {{ onStart?: () => void }} props
 */
export default function SpotTheIssueIntroScreen({ onStart }) {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-emerald-800 to-slate-950 pt-12 text-white">
      <StatusBar />
      <div className="flex flex-1 flex-col justify-center px-6">
        <p className="text-sm text-white/60">Opened from WhatsApp</p>
        <h1 className="mt-2 text-2xl font-bold">{SPOT_GAME_TITLE}</h1>
        <p className="mt-2 font-mono text-xs text-emerald-200">{SPOT_GAME_URL}</p>
        <p className="mt-6 text-sm leading-relaxed text-white/85">
          Read each email or message like it&apos;s real. Tap the parts that are red flags —
          wrong links, fake senders, OTP asks, and pressure tactics.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-white/75">
          {SPOT_PUZZLES.map((p) => (
            <li key={p.id}>• {p.title}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onStart}
          className="mt-8 w-full rounded-2xl bg-white py-4 font-bold text-emerald-900"
        >
          Start Round 1
        </button>
      </div>
    </div>
  );
}
