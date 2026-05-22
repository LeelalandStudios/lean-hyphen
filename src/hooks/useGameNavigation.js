import { useCallback, useMemo, useState } from "react";
/** @deprecated Phase 1 uses StaticScreenCatalog. For flow experiments only. */
import { getStep } from "../engine/legacy/steps.js";

const INITIAL_STEP_ID = "lock";

export function useGameNavigation(initialStepId = INITIAL_STEP_ID) {
  const [stepId, setStepId] = useState(initialStepId);
  const step = useMemo(() => getStep(stepId), [stepId]);
  const go = useCallback((nextStepId) => setStepId(nextStepId), []);

  return { stepId, step, go };
}
