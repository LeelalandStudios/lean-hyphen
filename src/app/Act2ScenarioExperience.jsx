import { useCallback, useEffect, useState } from "react";
import { playCorrect, playIncorrect } from "../utils/sound.js";
import {
  ACT2_SCENARIOS,
  ACT2_SCENARIO_COUNT,
} from "../content/act2Scenarios.js";
import Act2ProgressHeader from "../components/act2/Act2ProgressHeader.jsx";
import Act2ScenarioLayout from "../components/act2/Act2ScenarioLayout.jsx";
/**
 * Act 2 — scored five-scenario phone experience (notification-first flow).
 * @param {{ onComplete?: () => void, focusScenarioId?: string | null, onFocusScenarioChange?: (id: string) => void }} props
 */
export default function Act2ScenarioExperience({
  onComplete,
  focusScenarioId,
  onFocusScenarioChange,
  completedScenarioIds: completedScenarioIdsProp = [],
  onCompletedScenarioIdsChange,
}) {
  const [scenarioIndex, setScenarioIndex] = useState(() => {
    if (focusScenarioId) {
      const idx = ACT2_SCENARIOS.findIndex((s) => s.id === focusScenarioId);
      if (idx !== -1) return idx;
    }
    return 0;
  });
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [outcomeVisible, setOutcomeVisible] = useState(false);
  const [closeCalls, setCloseCalls] = useState(0);
  const [localCompletedScenarioIds, setLocalCompletedScenarioIds] = useState([]);
  const completedScenarioIds = onCompletedScenarioIdsChange ? completedScenarioIdsProp : localCompletedScenarioIds;
  const setCompletedScenarioIds = onCompletedScenarioIdsChange || setLocalCompletedScenarioIds;
  const shieldCount = completedScenarioIds.length;

  useEffect(() => {
    if (!focusScenarioId) return;
    const idx = ACT2_SCENARIOS.findIndex((s) => s.id === focusScenarioId);
    if (idx !== -1 && idx !== scenarioIndex) {
      setScenarioIndex(idx);
      setSelectedChoiceId(null);
      setOutcomeVisible(false);
    }
  }, [focusScenarioId, scenarioIndex]);

  const scenario = ACT2_SCENARIOS[scenarioIndex];
  const selectedChoice = scenario?.choices.find((c) => c.id === selectedChoiceId);
  const outcome = selectedChoice ? scenario.outcomes[selectedChoice.id] : null;
  const isLastScenario = scenarioIndex >= ACT2_SCENARIO_COUNT - 1;

  const handleChoose = useCallback(
    (choiceId) => {
      if (outcomeVisible || selectedChoiceId || !scenario) return;

      const choice = scenario.choices.find((c) => c.id === choiceId);
      if (!choice) return;

      setSelectedChoiceId(choiceId);

      if (choice.result === "fail") {
        setCloseCalls((n) => n + 1);
        playIncorrect();
      } else {
        setOutcomeVisible(true);
        if (!completedScenarioIds.includes(scenario.id)) {
          setCompletedScenarioIds((prev) => [...prev, scenario.id]);
        }
        playCorrect();
      }
    },
    [outcomeVisible, selectedChoiceId, scenario, completedScenarioIds]
  );

  const handleConsequenceComplete = useCallback(() => {
    setOutcomeVisible(true);
  }, []);

  const handleRetry = useCallback(() => {
    setSelectedChoiceId(null);
    setOutcomeVisible(false);
  }, []);

  const handleNext = useCallback(() => {
    if (isLastScenario) {
      onComplete?.();
      return;
    }
    const nextIdx = scenarioIndex + 1;
    setScenarioIndex(nextIdx);
    setSelectedChoiceId(null);
    setOutcomeVisible(false);
    const nextScenario = ACT2_SCENARIOS[nextIdx];
    if (nextScenario) {
      onFocusScenarioChange?.(nextScenario.id);
    }
  }, [isLastScenario, onComplete, scenarioIndex, onFocusScenarioChange]);

  if (!scenario) {
    return null;
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-transparent">
      <Act2ProgressHeader
        scenarioNumber={scenario.number}
        scenarioCount={ACT2_SCENARIO_COUNT}
        shieldCount={shieldCount}
        closeCalls={closeCalls}
      />
      <div className="min-h-0 flex-1 overflow-hidden">
        <Act2ScenarioLayout
          key={scenario.id}
          scenario={scenario}
          selectedChoiceId={selectedChoiceId}
          outcomeVisible={outcomeVisible}
          outcome={outcome}
          isLastScenario={isLastScenario}
          onChoose={handleChoose}
          onConsequenceComplete={handleConsequenceComplete}
          onRetry={handleRetry}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
