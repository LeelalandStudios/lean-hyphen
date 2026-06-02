/** Act 1 — The Hook (R1 Common Scams). Story framing + black-screen intrusion. Chat beats live in act1-hook.yaml. */

export const ACT1_TRANSITION_A =
  "What happened to Rohan happens to thousands of students every week. Now you're going to walk through it yourself — and learn to spot it in real time.";

export const ACT1_TRANSITION_B =
  "5 messages are waiting for you. Some are fine. Some will try to take everything. Can you tell the difference?";

export const ACT1_CTA_LABEL = "Find out →";

/** Black-screen opening — fake payment alert before WhatsApp opens. */
export const ACT1_INTRUSION = {
  from: "PhonePe Risk & Verification",
  subtitle: "Unknown sender",
  text:
    "Security review initiated on your linked bank account. ₹3,000 cashback settlement is pending due to incomplete verification. Complete before 11:59 PM to avoid UPI restriction.",
  delayBeforeNotifyMs: 1100,
  charMs: 24,
};

