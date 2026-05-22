import SpotTheIssuePuzzle from "../../components/act4/SpotTheIssuePuzzle.jsx";
import StatusBar from "../../components/phone/StatusBar.jsx";

/**
 * @param {{ puzzleId: string }} props
 */
export default function SpotTheIssuePuzzleScreen({ puzzleId }) {
  return (
    <div className="relative flex h-full flex-col pt-12">
      <StatusBar dark />
      <SpotTheIssuePuzzle puzzleId={puzzleId} />
    </div>
  );
}
