import { useCallback, useEffect, useRef } from "react";
import PhoneShell from "../phone/PhoneShell.jsx";
import Act2ThoughtBubble from "./Act2ThoughtBubble.jsx";
import Act2ChoicePanel from "./Act2ChoicePanel.jsx";
import Act2OutcomePanel from "./Act2OutcomePanel.jsx";

const DEFAULT_READ_DELAY_MS = 3500;
const OUTCOME_SCROLL_DELAY_MS = 400;
/** Scroll animation speed (0.7 = 70% of baseline — slower, easier to follow). */
const SCROLL_SPEED = 0.7;
const SCROLL_MS_PER_PX = 1.2;
const SCROLL_MIN_DURATION_MS = 550;
const SCROLL_MAX_DURATION_MS = 1400;

/** Extra time for in-screen animations before scrolling to choices. */
const READ_DELAY_BY_SCREEN = {
  "otp-messages": 4800,
};

function getReadDelayMs(screenType) {
  return READ_DELAY_BY_SCREEN[screenType] ?? DEFAULT_READ_DELAY_MS;
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function scrollDurationMs(distance) {
  const raw = distance * SCROLL_MS_PER_PX;
  const clamped = Math.min(SCROLL_MAX_DURATION_MS, Math.max(SCROLL_MIN_DURATION_MS, raw));
  return clamped / SCROLL_SPEED;
}

function animateScrollTo(el, top) {
  if (!el) return () => {};

  const start = el.scrollTop;
  const change = top - start;
  if (Math.abs(change) < 1) {
    el.scrollTop = top;
    return () => {};
  }

  const duration = scrollDurationMs(Math.abs(change));
  const startTime = performance.now();
  let frameId = 0;

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    el.scrollTop = start + change * easeInOutQuad(progress);
    if (progress < 1) {
      frameId = requestAnimationFrame(step);
    }
  };

  frameId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frameId);
}

function scrollToBottom(el) {
  if (!el) return () => {};
  return animateScrollTo(el, el.scrollHeight);
}

export default function Act2ScenarioLayout({
  scenario,
  ScreenComponent,
  selectedChoiceId,
  outcomeVisible,
  outcome,
  isLastScenario,
  onChoose,
  onRetry,
  onNext,
}) {
  const layoutScrollRef = useRef(null);
  const sideScrollRef = useRef(null);
  const cancelScrollRef = useRef(() => {});

  const scrollAllToBottom = useCallback(() => {
    cancelScrollRef.current();
    const cancelLayout = scrollToBottom(layoutScrollRef.current);
    const cancelSide = scrollToBottom(sideScrollRef.current);
    cancelScrollRef.current = () => {
      cancelLayout();
      cancelSide();
    };
  }, []);

  const scrollAllToTop = useCallback(() => {
    layoutScrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
    sideScrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (outcomeVisible) {
      const t = window.setTimeout(() => scrollAllToBottom(), OUTCOME_SCROLL_DELAY_MS);
      return () => {
        window.clearTimeout(t);
        cancelScrollRef.current();
      };
    }

    scrollAllToTop();
    const t = window.setTimeout(
      () => scrollAllToBottom(),
      getReadDelayMs(scenario.screenType)
    );
    return () => {
      window.clearTimeout(t);
      cancelScrollRef.current();
    };
  }, [scenario.id, scenario.screenType, outcomeVisible, scrollAllToBottom, scrollAllToTop]);

  return (
    <div
      ref={layoutScrollRef}
      className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col gap-4 overflow-y-auto p-4 lg:flex-row lg:items-start lg:overflow-hidden lg:p-6"
    >
      <div className="flex shrink-0 justify-center lg:flex-1 lg:justify-end lg:pr-4">
        <PhoneShell>
          <ScreenComponent scenario={scenario} />
        </PhoneShell>
      </div>

      <div
        ref={sideScrollRef}
        className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 lg:max-w-md lg:overflow-y-auto lg:pt-8"
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-amber-400/90">
            ⚡ Scenario {scenario.number}
          </p>
          <h2 className="text-xl font-bold text-white">{scenario.title}</h2>
          <p className="text-sm text-slate-400">{scenario.subtitle}</p>
        </div>

        {!outcomeVisible && (
          <>
            <Act2ThoughtBubble lines={scenario.thought} />
            <Act2ChoicePanel
              prompt={scenario.choicePrompt}
              choices={scenario.choices}
              selectedChoiceId={selectedChoiceId}
              disabled={false}
              onChoose={onChoose}
            />
          </>
        )}

        {outcomeVisible && outcome && (
          <Act2OutcomePanel
            outcome={outcome}
            isLastScenario={isLastScenario}
            onRetry={onRetry}
            onNext={onNext}
          />
        )}
      </div>
    </div>
  );
}
