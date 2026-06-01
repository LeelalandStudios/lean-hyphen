import { useCallback, useState } from "react";
import SpotTheIssueIntroScreen from "../screens/act4/SpotTheIssueIntroScreen.jsx";
import SpotTheIssuePuzzleScreen from "../screens/act4/SpotTheIssuePuzzleScreen.jsx";
import SpotTheIssueCompleteScreen from "../screens/act4/SpotTheIssueCompleteScreen.jsx";
import { SPOT_PUZZLES } from "../content/act4SpotTheIssue.js";

const STEPS = ["intro", ...SPOT_PUZZLES.map((p) => p.id), "complete"];

/**
 * Playable Act 4 scene — intro, three puzzle rounds, completion.
 */
export default function Act4SpotTheIssue() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex] ?? "intro";

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(STEPS.length - 1, i + 1));
  }, []);

  const goPrev = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  if (step === "intro") {
    return <SpotTheIssueIntroScreen onStart={goNext} />;
  }

  if (step === "complete") {
    return <SpotTheIssueCompleteScreen onDone={goPrev} />;
  }

  const puzzleIndex = SPOT_PUZZLES.findIndex((p) => p.id === step);
  const puzzle = SPOT_PUZZLES[puzzleIndex];

  return (
    <SpotTheIssuePuzzleScreen
      puzzleId={step}
      onAllFound={goNext}
      roundLabel={`Round ${puzzleIndex + 1} of ${SPOT_PUZZLES.length}`}
      puzzleTitle={puzzle?.title}
    />
  );
}
