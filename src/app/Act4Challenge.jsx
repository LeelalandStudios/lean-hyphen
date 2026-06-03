import { useCallback, useEffect, useState } from "react";
import { startFinalAmbient, stopFinalAmbient } from "../utils/sound.js";
import {
  ACT4_CHALLENGE_INTRO,
  ACT4_ROUNDS,
} from "../content/act4Challenge.js";
import Act4GroupWrap from "../components/act4/Act4GroupWrap.jsx";
import BossLevelGame from "../components/act4/BossLevelGame.jsx";
import ChallengeButton from "../components/act4/ChallengeButton.jsx";
import ChallengeShell from "../components/act4/ChallengeShell.jsx";
import EmailRedFlagGame from "../components/act4/EmailRedFlagGame.jsx";
import FakeLinkGame from "../components/act4/FakeLinkGame.jsx";
import FinalRules from "../components/act4/FinalRules.jsx";
import FinalScreen from "../components/act4/FinalScreen.jsx";
import IfItHappens from "../components/act4/IfItHappens.jsx";
import MatchResponseGame from "../components/act4/MatchResponseGame.jsx";
import RealOrScamSpeedRound from "../components/act4/RealOrScamSpeedRound.jsx";
import ResultsBoard from "../components/act4/ResultsBoard.jsx";
import RoundFeedback from "../components/act4/RoundFeedback.jsx";
import RoundIntro from "../components/act4/RoundIntro.jsx";
import { statsFromRoundResults } from "../components/act4/roundStats.js";

const ROUND_GAMES = {
  "fake-link": FakeLinkGame,
  "speed-round": RealOrScamSpeedRound,
  "email-red-flags": EmailRedFlagGame,
  "response-match": MatchResponseGame,
  "boss-level": BossLevelGame,
};

/**
 * @param {{
 *   focusRoundId?: string | null,
 *   onFocusRoundChange?: (roundId: string | null) => void,
 *   roundResults?: any[],
 *   onRoundResultsChange?: (results: any[]) => void,
 * }} props
 */
export default function Act4Challenge({
  focusRoundId,
  onFocusRoundChange,
  roundResults: roundResultsProp = [],
  onRoundResultsChange,
}) {
  const [stage, setStage] = useState("intro");
  const [roundIndex, setRoundIndex] = useState(0);
  const [roundPhase, setRoundPhase] = useState("rules");
  const [score, setScore] = useState(0);
  const [shields, setShields] = useState(0);
  const [closeCalls, setCloseCalls] = useState(0);
  const [localRoundResults, setLocalRoundResults] = useState([]);
  const roundResults = onRoundResultsChange ? roundResultsProp : localRoundResults;
  const setRoundResults = onRoundResultsChange || setLocalRoundResults;
  const [feedbackResult, setFeedbackResult] = useState(null);

  const applyResults = useCallback((results) => {
    const stats = statsFromRoundResults(results);
    setScore(stats.score);
    setShields(stats.shields);
    setCloseCalls(stats.closeCalls);
    setRoundResults(results);
  }, [setRoundResults]);

  useEffect(() => {
    const stats = statsFromRoundResults(roundResults);
    setScore(stats.score);
    setShields(stats.shields);
    setCloseCalls(stats.closeCalls);
  }, [roundResults]);

  const resetRun = useCallback(() => {
    setStage("intro");
    setRoundIndex(0);
    setRoundPhase("rules");
    setScore(0);
    setShields(0);
    setCloseCalls(0);
    setRoundResults([]);
    setFeedbackResult(null);
    onFocusRoundChange?.(null);
  }, [onFocusRoundChange, setRoundResults]);

  const startChallenge = useCallback(() => {
    setRoundIndex(0);
    setRoundPhase("rules");
    setScore(0);
    setShields(0);
    setCloseCalls(0);
    setRoundResults([]);
    setFeedbackResult(null);
    setStage("round");
    onFocusRoundChange?.(ACT4_ROUNDS[0]?.id ?? null);
  }, [onFocusRoundChange, setRoundResults]);

  const goToPhase = useCallback(
    (phaseId) => {
      const roundIdx = ACT4_ROUNDS.findIndex((r) => r.id === phaseId);
      if (roundIdx >= 0) {
        setRoundIndex(roundIdx);
        setRoundPhase("rules");
        setFeedbackResult(null);
        setStage("round");
        onFocusRoundChange?.(phaseId);
      } else {
        setStage(phaseId);
        onFocusRoundChange?.(phaseId);
      }
    },
    [onFocusRoundChange]
  );

  useEffect(() => {
    if (!focusRoundId) return;
    goToPhase(focusRoundId);
  }, [focusRoundId, goToPhase]);

  useEffect(() => {
    const isFinalSummary = ["group", "rules", "help", "final"].includes(stage);
    if (isFinalSummary) {
      startFinalAmbient();
      return () => {
        stopFinalAmbient();
      };
    }
  }, [stage]);

  const handleRoundComplete = useCallback((result) => {
    setRoundResults((prev) => {
      const existsIdx = prev.findIndex((r) => r.roundId === result.roundId);
      let next;
      if (existsIdx !== -1) {
        next = [...prev];
        next[existsIdx] = result;
      } else {
        next = [...prev, result];
      }
      const stats = statsFromRoundResults(next);
      setScore(stats.score);
      setShields(stats.shields);
      setCloseCalls(stats.closeCalls);
      return next;
    });
    setFeedbackResult(result);
    setRoundPhase("rules");
    setStage("feedback");
  }, [setRoundResults]);

  const handleRetryRound = useCallback(() => {
    if (!feedbackResult) return;
    setRoundResults((prev) => {
      const next = prev.slice(0, -1);
      const stats = statsFromRoundResults(next);
      setScore(stats.score);
      setShields(stats.shields);
      setCloseCalls(stats.closeCalls);
      return next;
    });
    setFeedbackResult(null);
    setRoundPhase("rules");
    setStage("round");
  }, [feedbackResult, setRoundResults]);

  const handleFeedbackNext = useCallback(() => {
    if (roundIndex >= ACT4_ROUNDS.length - 1) {
      setFeedbackResult(null);
      setStage("results");
      onFocusRoundChange?.(null);
      return;
    }
    const nextIndex = roundIndex + 1;
    setRoundIndex(nextIndex);
    setFeedbackResult(null);
    setRoundPhase("rules");
    setStage("round");
    onFocusRoundChange?.(ACT4_ROUNDS[nextIndex]?.id ?? null);
  }, [roundIndex, onFocusRoundChange]);

  if (stage === "intro") {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
          <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.25em] text-amber-400">
            {ACT4_CHALLENGE_INTRO.eyebrow}
          </p>
          <p className="mt-4 max-w-md text-center text-lg font-medium text-slate-200">
            {ACT4_CHALLENGE_INTRO.tagline}
          </p>
          <ul className="mt-6 space-y-2 text-center text-xs text-slate-500">
            {ACT4_CHALLENGE_INTRO.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <ChallengeButton className="mt-10" onClick={startChallenge}>
            {ACT4_CHALLENGE_INTRO.cta}
          </ChallengeButton>
        </div>
      </div>
    );
  }

  if (stage === "group") {
    return <Act4GroupWrap onComplete={() => setStage("rules")} />;
  }

  if (stage === "final") {
    return (
      <FinalScreen
        onPlayAgain={resetRun}
        onShowRules={() => setStage("rules")}
      />
    );
  }

  const currentRound = ACT4_ROUNDS[roundIndex];
  const GameComponent = currentRound ? ROUND_GAMES[currentRound.type] : null;
  const showHud = stage === "round" || stage === "feedback" || stage === "results";

  let body = null;

  if (stage === "feedback" && feedbackResult) {
    body = (
      <RoundFeedback
        result={feedbackResult}
        onRetry={handleRetryRound}
        onNext={handleFeedbackNext}
        nextLabel={
          roundIndex >= ACT4_ROUNDS.length - 1 ? "See results →" : "Next →"
        }
      />
    );
  } else if (stage === "results") {
    body = (
      <ResultsBoard
        score={score}
        shields={shields}
        closeCalls={closeCalls}
        roundResults={roundResults}
        onContinue={() => setStage("group")}
      />
    );
  } else if (stage === "rules") {
    body = <FinalRules onContinue={() => setStage("help")} />;
  } else if (stage === "help") {
    body = <IfItHappens onContinue={() => setStage("final")} />;
  } else if (stage === "round" && currentRound) {
    if (roundPhase === "rules") {
      body = (
        <RoundIntro
          roundNumber={currentRound.number}
          title={currentRound.title}
          prompt={currentRound.prompt}
          timerLabel={
            currentRound.timerSeconds
              ? `${currentRound.timerSeconds} seconds`
              : undefined
          }
          onBegin={() => setRoundPhase("play")}
        />
      );
    } else if (GameComponent) {
      body = (
        <GameComponent
          key={`${currentRound.id}-${roundResults.length}`}
          active={roundPhase === "play"}
          onComplete={handleRoundComplete}
        />
      );
    }
  }

  return (
    <ChallengeShell
      score={score}
      shields={shields}
      closeCalls={closeCalls}
      showHud={showHud}
    >
      {body}
    </ChallengeShell>
  );
}
