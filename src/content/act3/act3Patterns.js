import deepfakesMd from "./cards/deepfakes.md?raw";
import otpMd from "./cards/otp.md?raw";
import gamingSocialMd from "./cards/gaming-social.md?raw";
import { parseCardMarkdown } from "./parseCardMarkdown.js";

/** Intro — back to Squad Goals, 12:14 AM (script_v2 Act 3). */
export const ACT3_INTRO_SCRIPT = [
  {
    speaker: "priya",
    type: "text",
    text: "ok. you just walked through 5 scenarios. real ones. messages that get sent to thousands of students every single day.",
  },
  {
    speaker: "priya",
    type: "text",
    text: "some of you got all of them. some didn't. both are fine. that's what this is for — so it happens here first.",
  },
  {
    speaker: "priya",
    type: "text",
    text: "now let me show you the patterns underneath all of it. once you see them, you'll never unsee them.",
  },
  {
    speaker: "priya",
    type: "cta",
    text: "Here come the scam cards — tap through each one.",
    label: "Show me the cards →",
  },
];

/** Outro — urgency + Rohan (script_v2 Act 3). */
export const ACT3_OUTRO_SCRIPT = [
  {
    speaker: "priya",
    type: "text",
    text: "one thing is underneath all of this. every single scenario.",
  },
  {
    speaker: "priya",
    type: "text",
    text: "urgency.",
  },
  {
    speaker: "priya",
    type: "text",
    text: '"5 minutes." "87 spots left." "Permanent ban." "Quick bro." "2 hours or we send it."',
  },
  {
    speaker: "priya",
    type: "text",
    text: "that feeling of rush — the slight panic in your chest — that is not a reason to act faster. that is the warning. that feeling IS the trick.",
  },
  {
    speaker: "priya",
    type: "text",
    text: "whenever something feels urgent and you didn't start it — stop completely. that pause is your defence.",
  },
  {
    speaker: "kabir",
    type: "text",
    text: "i'm sending this to Rohan",
  },
  {
    speaker: "priya",
    type: "text",
    text: "yeah. send it.",
  },
];

export const ACT3_CARDS = [
  {
    id: "deepfakes",
    emoji: "🤖",
    label: "Deepfakes & AI",
    accent: "border-violet-300 bg-gradient-to-b from-violet-100 to-white",
    accentLocked: "border-slate-600/50 bg-slate-800/40",
    accentDone: "border-emerald-400/60 bg-emerald-950/30",
    sections: parseCardMarkdown(deepfakesMd),
  },
  {
    id: "otp",
    emoji: "🔢",
    label: "OTP Scams",
    accent: "border-sky-300 bg-gradient-to-b from-sky-100 to-white",
    accentLocked: "border-slate-600/50 bg-slate-800/40",
    accentDone: "border-emerald-400/60 bg-emerald-950/30",
    sections: parseCardMarkdown(otpMd),
  },
  {
    id: "gaming-social",
    emoji: "🎮",
    label: "Gaming & Social",
    accent: "border-emerald-300 bg-gradient-to-b from-emerald-100 to-white",
    accentLocked: "border-slate-600/50 bg-slate-800/40",
    accentDone: "border-emerald-400/60 bg-emerald-950/30",
    sections: parseCardMarkdown(gamingSocialMd),
  },
];
