import { useCallback, useEffect, useState } from "react";
import { BOSS_SCENARIO } from "../../content/act4Challenge.js";
import { gradeBossAnswer, scoreBossLevel } from "./answerScoring.js";
import ChallengeButton from "./ChallengeButton.jsx";
import { startBossAmbient, stopBossAmbient } from "../../utils/sound.js";

/**
 * @param {{ active: boolean, onComplete: (result: object) => void }} props
 */
export default function BossLevelGame({ active, onComplete }) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (active) {
      setAnswer("");
      setSubmitted(false);
      startBossAmbient();
      return () => {
        stopBossAmbient();
      };
    }
  }, [active]);

  const handleSubmit = useCallback(() => {
    const trimmed = answer.trim();
    if (!trimmed || submitted) return;

    const { detected, missed } = gradeBossAnswer(trimmed, BOSS_SCENARIO.concepts);
    const conceptCount = detected.length;
    const roundResult = {
      roundId: "boss-level",
      title: "The Boss Level",
      pointsEarned: scoreBossLevel(conceptCount),
      maxPoints: 30,
      shieldEarned: conceptCount >= 2,
      closeCalls: 3 - conceptCount,
      correctCount: conceptCount,
      totalCount: 3,
      answer: trimmed,
      detectedConceptIds: detected.map((d) => d.id),
      missedConceptIds: missed.map((m) => m.id),
      summary: `${conceptCount} / 3 key ideas in your answer.`,
      details: [
        ...detected.map((d) => ({ label: d.label, ok: true, text: "Detected" })),
        ...missed.map((m) => ({ label: m.label, ok: false, text: "Missed" })),
      ],
      modelAnswer: BOSS_SCENARIO.modelAnswer,
    };

    setSubmitted(true);
    onComplete(roundResult);
  }, [answer, submitted, onComplete]);

  if (!active) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-6">
      <p className="text-sm text-slate-400">{BOSS_SCENARIO.setting}</p>

      <div className="mx-auto w-full max-w-lg space-y-3">
        {BOSS_SCENARIO.messages.map((m, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-700 bg-slate-800/70 p-4"
          >
            <p className="text-xs font-bold text-red-400">
              📱 {m.app}
              {m.badge ? ` · ${m.badge}` : ""}
            </p>
            <p className="mt-1 text-xs text-slate-400">{m.sender}</p>
            <p className="mt-2 text-sm text-white">{m.body}</p>
          </div>
        ))}
      </div>

      <blockquote className="mx-auto max-w-lg border-l-2 border-amber-500/50 pl-4 text-sm italic text-slate-300">
        {BOSS_SCENARIO.thought}
      </blockquote>

      <label className="mx-auto w-full max-w-lg">
        <span className="text-sm font-semibold text-white">{BOSS_SCENARIO.question}</span>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitted}
          rows={4}
          placeholder="Write 1–2 sentences…"
          className="mt-2 w-full resize-y rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-amber-500 focus:outline-none"
        />
      </label>

      {!submitted && (
        <div className="flex justify-center">
          <ChallengeButton disabled={!answer.trim()} onClick={handleSubmit}>
            Submit answer →
          </ChallengeButton>
        </div>
      )}

    </div>
  );
}
