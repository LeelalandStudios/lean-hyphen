/** Act 4 — Spot the Issue mini-game (link shared from friends group). */

export const SPOT_GAME_URL = "leelaland.app/spot-the-scam";
export const SPOT_GAME_TITLE = "Spot the Scam — Tap the Red Flags";

export const ACT4_GROUP_LINK_MESSAGES = [
  {
    type: "text",
    sender: "Priya",
    text: "Ok team — you've seen the scams live. Ready for a quick challenge?",
    time: "7:28 PM",
  },
  {
    type: "text",
    sender: "Zack",
    text: "yes!!",
    time: "7:28 PM",
  },
  {
    type: "game_link",
    sender: "Priya",
    title: SPOT_GAME_TITLE,
    url: SPOT_GAME_URL,
    caption: "Tap each red flag in the email or message. No score — just learn what to look for.",
    time: "7:29 PM",
  },
  {
    type: "text",
    sender: "Mei",
    text: "doing it now 👀",
    time: "7:29 PM",
  },
];

export const ACT4_GROUP_COMPLETE_MESSAGES = [
  {
    type: "text",
    sender: "You",
    text: "Done — got all the red flags in the challenge ✅",
    time: "7:35 PM",
    mine: true,
  },
  { type: "text", sender: "Aryan", text: "the sch00l zeros got me on round 1 lol", time: "7:35 PM" },
  { type: "text", sender: "Zack", text: "same", time: "7:36 PM" },
  {
    type: "text",
    sender: "Priya",
    text: "Pay attention to: scams hide in normal-looking messages. Wrong domains, fake urgency, and anyone asking for OTPs or passwords are the patterns you practiced. Keep using the real app or saved contact — not links in chat.",
    time: "7:36 PM",
  },
];

/**
 * @typedef {{ id: string, hint: string, foundLabel: string }} SpotIssue
 * @typedef {{ id: string, type: 'email'|'message'|'whatsapp', title: string, subtitle: string, instruction: string, issues: SpotIssue[], totalIssues: number }} SpotPuzzle
 */

/** @type {SpotPuzzle[]} */
export const SPOT_PUZZLES = [
  {
    id: "email",
    type: "email",
    title: "Round 1 — School fee email",
    subtitle: "Gmail",
    instruction: "Tap every red flag you can find in this email.",
    totalIssues: 3,
    issues: [
      {
        id: "sender",
        hint: "Sender address — look at the domain",
        foundLabel: "Fake sender domain (sch00l with zeros)",
      },
      {
        id: "urgency",
        hint: "Urgency language",
        foundLabel: "False deadline pressure",
      },
      {
        id: "link",
        hint: "Payment link",
        foundLabel: "Suspicious pay link",
      },
    ],
  },
  {
    id: "message",
    type: "message",
    title: "Round 2 — SMS thread",
    subtitle: "Messages",
    instruction: "Tap the problems in this text conversation.",
    totalIssues: 3,
    issues: [
      {
        id: "unknown",
        hint: "Who is texting?",
        foundLabel: "Unknown number (not saved)",
      },
      {
        id: "otp_ask",
        hint: "What are they asking for?",
        foundLabel: "Asking for your OTP",
      },
      {
        id: "pressure",
        hint: "How they push you",
        foundLabel: "Pressure / expiry threat",
      },
    ],
  },
  {
    id: "whatsapp",
    type: "whatsapp",
    title: "Round 3 — Game admin chat",
    subtitle: "WhatsApp-style DM",
    instruction: "Tap what's wrong with this “official” message.",
    totalIssues: 3,
    issues: [
      {
        id: "password",
        hint: "What they want you to send",
        foundLabel: "Asking for password",
      },
      {
        id: "verify_badge",
        hint: "Trust signals",
        foundLabel: "Fake verify badge / name",
      },
      {
        id: "verify_link",
        hint: "Link in chat",
        foundLabel: "Unofficial verify link",
      },
    ],
  },
];

export function getPuzzle(id) {
  return SPOT_PUZZLES.find((p) => p.id === id) ?? SPOT_PUZZLES[0];
}
