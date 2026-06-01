import { SPOT_PUZZLES } from "../../content/act4SpotTheIssue.js";
import StatusBar from "../../components/phone/StatusBar.jsx";

/**
 * @param {{ onDone?: () => void }} props
 */
export default function SpotTheIssueCompleteScreen({ onDone }) {
  return (
    <div className="relative flex h-full flex-col bg-emerald-950 pt-12 text-center text-white">
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <span className="text-5xl">🎯</span>
        <h1 className="mt-4 text-2xl font-bold">Challenge complete</h1>
        <p className="mt-3 text-sm text-white/75">
          You spotted red flags in all {SPOT_PUZZLES.length} rounds. Head back to the
          group chat to wrap up with Priya.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="mt-8 rounded-2xl bg-white px-8 py-3 font-bold text-emerald-950"
        >
          {onDone ? "Review last round" : "Back to WhatsApp"}
        </button>
      </div>
    </div>
  );
}
