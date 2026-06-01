import { useCallback, useEffect, useRef, useState } from "react";
import { SPEED_ROUND_MESSAGES } from "../../content/act4Challenge.js";
import TimerBar from "./TimerBar.jsx";
import ChallengeButton from "./ChallengeButton.jsx";

const REVEAL_MS = 1100;

/**
 * @param {{ active: boolean, onComplete: (result: object) => void }} props
 */
export default function RealOrScamSpeedRound({ active, onComplete }) {
  const [itemIndex, setItemIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [phase, setPhase] = useState("question");
  const [timerActive, setTimerActive] = useState(false);
  const [locked, setLocked] = useState(false);
  const finishedRef = useRef(false);

  const msg = SPEED_ROUND_MESSAGES[itemIndex];

  useEffect(() => {
    if (active) {
      setItemIndex(0);
      setAnswers([]);
      setPhase("question");
      setTimerActive(true);
      setLocked(false);
      finishedRef.current = false;
    }
  }, [active]);

  const emitFinal = useCallback(
    (allAnswers) => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      const correctCount = allAnswers.filter((a) => a.correct).length;
      const totalCount = SPEED_ROUND_MESSAGES.length;
      onComplete({
        roundId: "speed-round",
        title: "Real or Scam?",
        pointsEarned: correctCount * 10,
        maxPoints: 70,
        shieldEarned: correctCount >= 6,
        closeCalls: totalCount - correctCount,
        correctCount,
        totalCount,
        summary: `${correctCount} / ${totalCount} correct.`,
        details: allAnswers.map((a) => ({
          label: a.sender,
          ok: a.correct,
          text: a.explanation,
        })),
      });
    },
    [onComplete]
  );

  const recordAnswer = useCallback(
    (choice, timedOut = false) => {
      if (locked || phase !== "question" || !msg) return;
      setLocked(true);
      setTimerActive(false);

      const correct = timedOut ? false : choice === msg.answer;
      const entry = {
        id: msg.id,
        sender: msg.sender,
        choice: timedOut ? "timeout" : choice,
        correct,
        explanation: msg.explanation,
      };

      const nextAnswers = [...answers, entry];
      setAnswers(nextAnswers);
      setPhase("reveal");

      window.setTimeout(() => {
        setLocked(false);
        if (itemIndex >= SPEED_ROUND_MESSAGES.length - 1) {
          emitFinal(nextAnswers);
          return;
        }
        setItemIndex((i) => i + 1);
        setPhase("question");
        setTimerActive(true);
      }, REVEAL_MS);
    },
    [locked, phase, msg, answers, itemIndex, emitFinal]
  );

  if (!active || !msg) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>
          Message {itemIndex + 1} / {SPEED_ROUND_MESSAGES.length}
        </span>
      </div>

      {phase === "question" && (
        <TimerBar
          seconds={8}
          active={timerActive && !locked}
          onExpire={() => recordAnswer(null, true)}
        />
      )}

      <div className="mx-auto w-full max-w-lg rounded-xl border border-slate-700 bg-slate-800/60 p-4">
        <p className="text-xs font-bold text-slate-400">
          {msg.icon} {msg.sender}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white">{msg.body}</p>
      </div>

      {phase === "reveal" && answers[answers.length - 1] && (
        <p
          className={`text-center text-sm font-semibold ${
            answers[answers.length - 1].correct ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {answers[answers.length - 1].correct ? "Correct" : "Missed"} —{" "}
          {msg.explanation}
        </p>
      )}

      {phase === "question" && (
        <div className="mx-auto flex w-full max-w-lg gap-3">
          <ChallengeButton
            variant="success"
            className="flex-1"
            disabled={locked}
            onClick={() => recordAnswer("real")}
          >
            REAL
          </ChallengeButton>
          <ChallengeButton
            variant="danger"
            className="flex-1"
            disabled={locked}
            onClick={() => recordAnswer("scam")}
          >
            SCAM
          </ChallengeButton>
        </div>
      )}
    </div>
  );
}
