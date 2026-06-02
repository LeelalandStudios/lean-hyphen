/** Phone flow helpers for Act 2 notification-first scenarios. */

/**
 * @typedef {{ type: string, threadId?: string, emailId?: string, appId?: string, scenarioId?: string }} Act2ReachedSignal
 */

export const ACT2_LIFECYCLE = {
  LOCKED_WAITING: "locked_waiting_notification",
  LOCK_NOTIFICATION: "notification_visible_on_lock",
  UNLOCKED_HOME: "unlocked_home_ready",
  APP_OPENED: "app_opened",
  SCAM_REACHED: "scam_reached",
  THOUGHT_PENDING: "thought_pending",
  THOUGHT_TYPING: "thought_typing",
  CHOICES_VISIBLE: "choices_visible",
  CHOICE_RESOLVED: "choice_resolved",
  FEEDBACK_VISIBLE: "feedback_visible",
  COMPLETE: "complete",
};

/**
 * @param {Record<string, string>} signals
 * @param {Act2ReachedSignal | undefined} reachedSignal
 */
export function matchesReachedSignal(signals, reachedSignal) {
  if (!reachedSignal?.type) return false;
  const value = signals[reachedSignal.type];
  if (!value) return false;
  if (reachedSignal.threadId != null) return value === reachedSignal.threadId;
  if (reachedSignal.emailId != null) return value === reachedSignal.emailId;
  if (reachedSignal.appId != null) return value === reachedSignal.appId;
  if (reachedSignal.scenarioId != null) return value === reachedSignal.scenarioId;
  return true;
}

/**
 * @param {import('./phoneStore.js').ReturnType<typeof import('./phoneStore.js').usePhoneStore>} phone
 * @param {import('./act2Scenarios.js').typeof import('./act2Scenarios.js').ACT2_SCENARIOS[number]} scenario
 */
export function seedAct2ScenarioPhone(phone, scenario) {
  phone.api.closeChoiceGate();
  phone.api.clearNotifications();
  phone.api.clearSignals();
  phone.api.setVars({ act2_active_scenario: scenario.id });

  const timers = [];

  for (const event of scenario.seedEvents ?? []) {
    if (event.type === "sms.receive") {
      phone.api.receiveSms({
        threadId: event.threadId,
        from: event.from,
        body: event.body,
      });
    }
  }

  if (scenario.seedEventsDelayed?.length) {
    for (const batch of scenario.seedEventsDelayed) {
      const t = window.setTimeout(() => {
        for (const event of batch.events) {
          if (event.type === "sms.receive") {
            phone.api.receiveSms({
              threadId: event.threadId,
              from: event.from,
              body: event.body,
            });
          }
        }
        if (batch.notify) {
          phone.api.notify(batch.notify);
        }
      }, batch.delayMs ?? 650);
      timers.push(t);
    }
  }
  return timers;
}

/**
 * @param {import('./phoneStore.js').ReturnType<typeof import('./phoneStore.js').usePhoneStore>} phone
 * @param {import('./act2Scenarios.js').typeof import('./act2Scenarios.js').ACT2_SCENARIOS[number]} scenario
 */
export function pushAct2HomeNotification(phone, scenario) {
  const n = scenario.lockNotification;
  if (!n) return;
  phone.api.notify({
    appId: n.appId,
    appLabel: n.appLabel,
    from: n.from,
    body: n.body,
    silent: true,
  });
}
