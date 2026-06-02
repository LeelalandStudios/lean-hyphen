import { useEffect } from "react";
import { getAct2ScreenComponent } from "../components/act2/screens/ScenarioScreenRegistry.jsx";

/**
 * Renders an Act 2 scam screen inside the phone shell and signals when visible.
 */
export default function Act2ScamApp({ phone, onBack, screenType, scenarioId, onScamReached }) {
  const Screen = getAct2ScreenComponent(screenType);

  useEffect(() => {
    if (!scenarioId) return;
    phone.api.signal("act2.scam.reached", scenarioId);
    onScamReached?.();
  }, [phone.api, scenarioId, onScamReached]);

  return (
    <div className="relative h-full overflow-hidden">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="absolute left-3 top-12 z-30 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/50"
        >
          ‹ Back
        </button>
      )}
      <Screen scenario={{ id: scenarioId }} />
    </div>
  );
}
