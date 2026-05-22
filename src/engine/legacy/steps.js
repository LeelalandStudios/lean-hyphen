/**
 * @deprecated Phase 1 uses staticScreens.js. Kept for Phase 2/3 flow prototyping.
 */
import { PAYTM_NOTIFICATION_BODY, PAYTM_SENDER } from "../../content/constants.js";

export const STEPS = [
  { id: "lock", mode: "lock" },
  { id: "home", mode: "home" },
  { id: "drawer", mode: "drawer" },
  {
    id: "idle",
    mode: "home",
    notice:
      "The phone sits idle for 1 second. Then the notification bar flickers.",
  },
  {
    id: "paytmNotice",
    mode: "home",
    badge: true,
    notification: {
      app: "📱 Messages",
      from: PAYTM_SENDER,
      body: PAYTM_NOTIFICATION_BODY,
    },
  },
  { id: "inbox", mode: "messagesInbox" },
  { id: "paytmChat", mode: "paytmChat" },
  { id: "paytmChoice", mode: "choice" },
  { id: "paytmBad", mode: "paytmBad" },
  { id: "paytmSafe", mode: "paytmSafe" },
  { id: "redFlagChoice", mode: "redFlag" },
  { id: "friendReward", mode: "friendReward" },
  { id: "fakeLinks", mode: "fakeLinks" },
  { id: "fakeLinksBad", mode: "fakeLinksBad" },
  { id: "otpCall", mode: "otpCall" },
  { id: "otpBad", mode: "otpBad" },
  { id: "otpReward", mode: "otpReward" },
  { id: "gaming", mode: "gaming" },
  { id: "gamingBad", mode: "gamingBad" },
  { id: "end", mode: "end" },
];

const STEP_BY_ID = Object.fromEntries(STEPS.map((step) => [step.id, step]));

export function getStep(stepId) {
  return STEP_BY_ID[stepId] ?? STEPS[0];
}
