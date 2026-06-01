import SpotTheIssuePuzzle from "../../components/act4/SpotTheIssuePuzzle.jsx";
import StatusBar from "../../components/phone/StatusBar.jsx";

/**
 * @param {{ puzzleId: string, onAllFound?: () => void, roundLabel?: string, puzzleTitle?: string }} props
 */
export default function SpotTheIssuePuzzleScreen({
  puzzleId,
  onAllFound,
  roundLabel,
  puzzleTitle,
}) {
  return (
    <div className="relative flex h-full flex-col pt-12">
      <StatusBar dark />
      {(roundLabel || puzzleTitle) && (
        <div className="shrink-0 border-b border-slate-800 bg-slate-950 px-4 py-2 text-center">
          {roundLabel && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
              {roundLabel}
            </p>
          )}
          {puzzleTitle && <p className="text-xs text-slate-400">{puzzleTitle}</p>}
        </div>
      )}
      <SpotTheIssuePuzzle puzzleId={puzzleId} onAllFound={onAllFound} />
    </div>
  );
}
