/** Act 1 — The Hook (R1 Common Scams). Self-contained group + script. */

export const ACT1_HOOK_GROUP = {
  title: "🔥 Squad Goals",
  members: ["Aryan", "Diya", "Priya", "Kabir", "Meera"],
  memberCount: 5,
  time: "11:47 PM",
};

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

/** Sender accent colors (WhatsApp-style). */
export const ACT1_SENDER_COLORS = {
  Kabir: "#e542a3",
  Aryan: "#53bdeb",
  Diya: "#e542a3",
  Priya: "#25d366",
  Meera: "#8696a0",
};

/**
 * Scripted beats for the group chat phase.
 * @type {(
 *   | { type: "typing"; ms?: number }
 *   | { type: "pause"; ms?: number }
 *   | { type: "readReceipts" }
 *   | { type: "message"; sender: string; text: string; time?: string; pauseAfterMs?: number }
 * )[]}
 */
export const ACT1_HOOK_BEATS = [
  { type: "message", sender: "Kabir", text: "guys wake up" },
  { type: "message", sender: "Kabir", text: "WAKE UP RIGHT NOW" },
  { type: "message", sender: "Kabir", text: "something happened" },
  { type: "typing", ms: 1400 },
  { type: "pause", ms: 900 },
  { type: "typing", ms: 1200 },
  { type: "message", sender: "Aryan", text: "bro it's midnight what" },
  {
    type: "message",
    sender: "Kabir",
    text:
      "my cousin Rohan. he's 16. he saved up 8 months of birthday money — ₹12,000 — to buy a used laptop for his board exam prep",
  },
  { type: "message", sender: "Kabir", text: "it's gone", pauseAfterMs: 400 },
  { type: "readReceipts" },
  { type: "pause", ms: 1100 },
  { type: "message", sender: "Diya", text: "...what do you mean gone" },
  {
    type: "message",
    sender: "Kabir",
    text:
      "he got a message yesterday. said he won a cashback on PhonePe. ₹3,000. looked completely real — the logo, everything.",
  },
  {
    type: "message",
    sender: "Kabir",
    text:
      "he clicked the link. typed his details. that's it. they emptied the whole account in 4 minutes.",
  },
  {
    type: "message",
    sender: "Kabir",
    text:
      "he didn't even tell his parents until today. he thought it was his fault.",
  },
  {
    type: "message",
    sender: "Priya",
    text:
      "it wasn't his fault. they're designed to fool people. even adults fall for this.",
  },
  { type: "message", sender: "Aryan", text: "ok but how? he's not dumb" },
  {
    type: "message",
    sender: "Priya",
    text:
      "that's exactly the point. being smart has nothing to do with it. these tricks are built to bypass your brain. they use time pressure. they use fear. they use trust.",
  },
  {
    type: "message",
    sender: "Priya",
    text:
      "I can show you exactly how it works. right now. so when it comes for you — and it will — you're ready.",
  },
  {
    type: "message",
    sender: "Kabir",
    text: "do it. i want to understand what happened to him.",
  },
  { type: "message", sender: "Diya", text: "same" },
  { type: "message", sender: "Aryan", text: "let's go" },
];
