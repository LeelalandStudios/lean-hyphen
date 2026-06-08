import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MATCH_CORRECT,
  MATCH_RESPONSES,
  MATCH_SITUATIONS,
} from "../../content/act4Challenge.js";
import { scoreMatchResponses } from "./answerScoring.js";
import ChallengeButton from "./ChallengeButton.jsx";

function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createMatchDisplayOrder() {
  const situations = shuffled(MATCH_SITUATIONS);
  let responses = shuffled(MATCH_RESPONSES);

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const hasAdjacentAnswer = situations.some(
      (situation, index) => MATCH_CORRECT[situation.id] === responses[index]?.id
    );
    if (!hasAdjacentAnswer) break;
    responses = shuffled(MATCH_RESPONSES);
  }

  return { situations, responses };
}

function PairConnector({ onUnmatch, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onUnmatch}
      aria-label="Unmatch pair"
      title="Tap to unmatch"
      className="group relative flex w-10 shrink-0 items-center justify-center self-center px-1 disabled:cursor-default"
    >
      <span className="pointer-events-none absolute inset-y-1/2 left-1 right-1 h-px -translate-y-1/2 bg-emerald-500/70 transition group-hover:bg-red-400/80 group-hover:h-0.5" />
      <span className="relative z-10 rounded-full border border-emerald-600/50 bg-slate-900 px-1 py-0.5 text-[9px] font-bold text-emerald-400/90 transition group-hover:border-red-500/50 group-hover:text-red-300">
        ↔
      </span>
    </button>
  );
}

/**
 * @param {{ active: boolean, playSessionKey?: number, onComplete: (result: object) => void }} props
 */
export default function MatchResponseGame({ active, playSessionKey = 0, onComplete }) {
  const [selectedSituationId, setSelectedSituationId] = useState(null);
  const [matches, setMatches] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(createMatchDisplayOrder);

  useEffect(() => {
    if (active) {
      setSelectedSituationId(null);
      setMatches({});
      setSubmitted(false);
      setDisplayOrder(createMatchDisplayOrder());
    }
  }, [active, playSessionKey]);

  const displaySituations = displayOrder.situations;
  const displayResponses = displayOrder.responses;

  const matchedSituationIds = useMemo(
    () => displaySituations.filter((s) => matches[s.id]).map((s) => s.id),
    [displaySituations, matches]
  );

  const unmatchedSituations = useMemo(
    () => displaySituations.filter((s) => !matches[s.id]),
    [displaySituations, matches]
  );

  const unmatchedResponses = useMemo(
    () => displayResponses.filter((r) => !Object.values(matches).includes(r.id)),
    [displayResponses, matches]
  );

  const clearMatch = useCallback(
    (sitId) => {
      if (submitted) return;
      setMatches((prev) => {
        const next = { ...prev };
        delete next[sitId];
        return next;
      });
      if (selectedSituationId === sitId) setSelectedSituationId(null);
    },
    [submitted, selectedSituationId]
  );

  const handleSituationClick = useCallback(
    (sitId) => {
      if (submitted) return;
      setSelectedSituationId((prev) => (prev === sitId ? null : sitId));
    },
    [submitted]
  );

  const handleResponseClick = useCallback(
    (responseId) => {
      if (submitted || !selectedSituationId) return;

      setMatches((prev) => {
        const next = { ...prev };
        for (const [sitId, respId] of Object.entries(next)) {
          if (respId === responseId) delete next[sitId];
        }
        next[selectedSituationId] = responseId;
        return next;
      });
      setSelectedSituationId(null);
    },
    [submitted, selectedSituationId]
  );

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    const allMatched = MATCH_SITUATIONS.every((s) => matches[s.id]);
    if (!allMatched) return;

    setSubmitted(true);
    let correctCount = 0;
    const details = MATCH_SITUATIONS.map((sit) => {
      const picked = matches[sit.id];
      const expected = MATCH_CORRECT[sit.id];
      const ok = picked === expected;
      if (ok) correctCount += 1;
      const resp = MATCH_RESPONSES.find((r) => r.id === expected);
      return {
        label: sit.text,
        ok,
        text: ok ? "Correct" : `Should be: ${resp?.text ?? expected}`,
      };
    });

    onComplete({
      roundId: "response-match",
      title: "What Do You Do Now?",
      pointsEarned: scoreMatchResponses(correctCount),
      maxPoints: 50,
      shieldEarned: correctCount >= 4,
      closeCalls: 5 - correctCount,
      correctCount,
      totalCount: 5,
      matches,
      summary: `${correctCount} / 5 matches correct.`,
      details,
    });
  }, [submitted, matches, onComplete]);

  if (!active) return null;

  const allMatched = MATCH_SITUATIONS.every((s) => matches[s.id]);

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-6">
      <p className="text-center text-xs text-slate-400">
        Tap a situation, then a response. Tap the line between a pair to unmatch.
      </p>

      {matchedSituationIds.length > 0 && (
        <div className="mx-auto w-full max-w-3xl space-y-2">
          {matchedSituationIds.map((sitId) => {
            const sit = MATCH_SITUATIONS.find((s) => s.id === sitId);
            const respId = matches[sitId];
            const resp = MATCH_RESPONSES.find((r) => r.id === respId);
            const sitNum = displaySituations.findIndex((s) => s.id === sitId) + 1;
            if (!sit || !resp) return null;

            return (
              <div
                key={sitId}
                className="flex items-stretch gap-0 rounded-lg border border-emerald-800/35 bg-emerald-950/15"
              >
                <div className="min-w-0 flex-1 p-3 text-sm text-slate-200">
                  <span className="font-bold text-amber-400">{sitNum}.</span> {sit.text}
                </div>
                <PairConnector
                  onUnmatch={() => clearMatch(sitId)}
                  disabled={submitted}
                />
                <div className="min-w-0 flex-1 p-3 text-sm text-slate-200">
                  <span className="font-bold text-amber-400">{respId.toUpperCase()}.</span>{" "}
                  {resp.text}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {(unmatchedSituations.length > 0 || unmatchedResponses.length > 0) && (
        <div className="mx-auto grid w-full max-w-3xl gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Situations
            </p>
            {unmatchedSituations.map((sit) => {
              const i = displaySituations.findIndex((s) => s.id === sit.id);
              const selected = selectedSituationId === sit.id;
              return (
                <button
                  key={sit.id}
                  type="button"
                  disabled={submitted}
                  onClick={() => handleSituationClick(sit.id)}
                  className={`w-full rounded-lg border p-3 text-left text-sm transition ${
                    selected
                      ? "border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/30"
                      : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                  }`}
                >
                  <span className="font-bold text-amber-400">{i + 1}.</span> {sit.text}
                  {selected && (
                    <p className="mt-1 text-xs text-amber-400/80">Tap a response →</p>
                  )}
                </button>
              );
            })}
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Responses
            </p>
            {unmatchedResponses.map((resp) => (
              <button
                key={resp.id}
                type="button"
                disabled={submitted || !selectedSituationId}
                onClick={() => handleResponseClick(resp.id)}
                className={`w-full rounded-lg border p-3 text-left text-sm transition ${
                  selectedSituationId
                    ? "border-slate-700 bg-slate-800/50 hover:border-amber-500/40"
                    : "border-slate-700 bg-slate-800/50 opacity-60"
                }`}
              >
                <span className="font-bold text-amber-400">{resp.id.toUpperCase()}.</span>{" "}
                {resp.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {!submitted && (
        <div className="flex justify-center pb-4">
          <ChallengeButton disabled={!allMatched} onClick={handleSubmit}>
            Submit matches →
          </ChallengeButton>
        </div>
      )}
    </div>
  );
}
