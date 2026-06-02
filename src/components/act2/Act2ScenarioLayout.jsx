import { useCallback, useEffect, useRef, useState } from "react";
import { playScamNotification } from "../../utils/sound.js";
import {
  ACT2_LIFECYCLE,
  matchesReachedSignal,
  pushAct2HomeNotification,
  seedAct2ScenarioPhone,
} from "../../content/act2ScenarioPhone.js";
import PhoneExplorer from "../../phone/PhoneExplorer.jsx";
import { usePhoneStore } from "../../phone/phoneStore.js";
import Act2ChoicePanel from "./Act2ChoicePanel.jsx";
import Act2OutcomePanel from "./Act2OutcomePanel.jsx";
import Act2ThoughtBubble from "./Act2ThoughtBubble.jsx";

const OUTCOME_SCROLL_DELAY_MS = 400;

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function scrollToBottom(el) {
  if (!el) return () => { };
  const start = el.scrollTop;
  const change = el.scrollHeight - el.clientHeight - start;
  if (Math.abs(change) < 1) return () => { };
  const duration = 600;
  const startTime = performance.now();
  let frameId = 0;
  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    el.scrollTop = start + change * easeInOutQuad(progress);
    if (progress < 1) frameId = requestAnimationFrame(step);
  };
  frameId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frameId);
}

export default function Act2ScenarioLayout({
  scenario,
  selectedChoiceId,
  outcomeVisible,
  outcome,
  isLastScenario,
  onChoose,
  onRetry,
  onNext,
}) {
  const phone = usePhoneStore();
  const [lifecycle, setLifecycle] = useState(ACT2_LIFECYCLE.LOCKED_WAITING);
  const [phoneSessionKey, setPhoneSessionKey] = useState(0);
  const [thoughtComplete, setThoughtComplete] = useState(false);
  const [scamReached, setScamReached] = useState(false);
  const layoutScrollRef = useRef(null);
  const sidePanelRef = useRef(null);
  const thoughtFlowStartedRef = useRef(false);
  const phoneApi = phone.api;

  const showAnimatedThought =
    !outcomeVisible && lifecycle === ACT2_LIFECYCLE.THOUGHT_TYPING && !thoughtComplete;

  const showStaticThought = !outcomeVisible && thoughtComplete;

  const showChoices =
    !outcomeVisible && thoughtComplete && lifecycle === ACT2_LIFECYCLE.CHOICES_VISIBLE;

  const lockNotification = scenario.lockNotification
    ? {
      app: scenario.lockNotification.appLabel,
      from: scenario.lockNotification.from,
      body: scenario.lockNotification.body,
    }
    : null;

  const seedTimersRef = useRef([]);

  const resetScenarioFlow = useCallback(() => {
    seedTimersRef.current.forEach((t) => window.clearTimeout(t));
    seedTimersRef.current = seedAct2ScenarioPhone({ api: phoneApi }, scenario);
    setLifecycle(ACT2_LIFECYCLE.LOCKED_WAITING);
    setThoughtComplete(false);
    setScamReached(false);
    thoughtFlowStartedRef.current = false;
    setPhoneSessionKey((k) => k + 1);
  }, [phoneApi, scenario]);

  useEffect(() => {
    resetScenarioFlow();
    return () => {
      seedTimersRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, [scenario.id, resetScenarioFlow]);

  const beginThoughtFlow = useCallback(() => {
    if (outcomeVisible || thoughtFlowStartedRef.current) return;
    thoughtFlowStartedRef.current = true;
    setScamReached(true);
    setLifecycle(ACT2_LIFECYCLE.THOUGHT_TYPING);
    requestAnimationFrame(() => {
      sidePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }, [outcomeVisible]);

  useEffect(() => {
    if (outcomeVisible || thoughtFlowStartedRef.current) return;
    if (!matchesReachedSignal(phone.state.signals, scenario.reachedSignal)) return;
    beginThoughtFlow();
  }, [phone.state.signals, scenario.reachedSignal, outcomeVisible, beginThoughtFlow]);

  const handleUnlock = useCallback(() => {
    pushAct2HomeNotification({ api: phoneApi }, scenario);
    setLifecycle(ACT2_LIFECYCLE.UNLOCKED_HOME_READY);
  }, [phoneApi, scenario]);

  const handleThoughtComplete = useCallback(() => {
    setThoughtComplete(true);
    setLifecycle(ACT2_LIFECYCLE.CHOICES_VISIBLE);
  }, []);

  useEffect(() => {
    if (!outcomeVisible) return;
    const t = window.setTimeout(() => {
      scrollToBottom(layoutScrollRef.current);
    }, OUTCOME_SCROLL_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [outcomeVisible, outcome]);

  useEffect(() => {
    if (!showChoices) return;
    const t = window.setTimeout(() => scrollToBottom(layoutScrollRef.current), 200);
    return () => window.clearTimeout(t);
  }, [showChoices]);

  const handleRetry = useCallback(() => {
    onRetry();
    resetScenarioFlow();
  }, [onRetry, resetScenarioFlow]);

  const handleNext = useCallback(() => {
    phoneApi.closeChoiceGate();
    phoneApi.clearNotifications();
    onNext();
  }, [onNext, phoneApi]);

  const openAppFromNotification = useCallback(
    (banner) => {
      phoneApi.clearNotifications();
      if (scenario.targetAppId === "messages" && scenario.targetThreadId) {
        phoneApi.signal("open_messages_thread", scenario.targetThreadId);
      }
      void banner;
      setLifecycle(ACT2_LIFECYCLE.APP_OPENED);
    },
    [phoneApi, scenario.targetAppId, scenario.targetThreadId]
  );

  return (
    <div
      ref={layoutScrollRef}
      className="mx-auto h-full min-h-0 w-full max-w-6xl overflow-y-auto px-3 py-4 sm:px-4 lg:px-6"
    >
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-center lg:gap-8">
        <div className="mx-auto flex shrink-0 justify-center">
          <PhoneExplorer
            embedded
            phone={phone}
            phoneSessionKey={phoneSessionKey}
            lockNotification={lockNotification}
            badgeApp={scenario.targetAppId}
            scenarioThreadId={scenario.targetThreadId}
            onUnlocked={handleUnlock}
            onNotificationOpened={openAppFromNotification}
            onScamReached={beginThoughtFlow}
          />
        </div>

        <div
          ref={sidePanelRef}
          className="flex w-full min-w-0 max-w-md flex-col gap-3 lg:w-[min(100%,28rem)]"
        >
          {!scamReached && !outcomeVisible && (
            <p className="rounded-2xl border border-slate-700/60 bg-slate-800/40 px-4 py-3 text-sm text-slate-400">
              Unlock the phone and open the notification or app to start.
            </p>
          )}

          {showAnimatedThought && (
            <Act2ThoughtBubble
              lines={scenario.thought}
              onComplete={handleThoughtComplete}
            />
          )}

          {showStaticThought && (
            <aside className="rounded-2xl border border-slate-700/80 bg-slate-800/60 p-4 shadow-lg">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                Internal thought
              </p>
              <div className="space-y-2 text-sm italic leading-relaxed text-slate-300">
                {scenario.thought.map((line, i) => (
                  <p key={i}>&ldquo;{line}&rdquo;</p>
                ))}
              </div>
            </aside>
          )}

          {showChoices && (
            <Act2ChoicePanel
              prompt={scenario.choicePrompt}
              choices={scenario.choices}
              selectedChoiceId={selectedChoiceId}
              disabled={Boolean(selectedChoiceId)}
              onChoose={onChoose}
            />
          )}

          {outcomeVisible && outcome && (
            <Act2OutcomePanel
              outcome={outcome}
              isLastScenario={isLastScenario}
              onRetry={handleRetry}
              onNext={handleNext}
            />
          )}
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-md shrink-0 border-t border-slate-800/80 pt-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-wide text-amber-400/90">
          ⚡ Scenario {scenario.number}
        </p>
        <h2 className="text-base font-bold leading-tight text-white sm:text-lg">
          {scenario.title}
        </h2>
      </div>
    </div>
  );
}
