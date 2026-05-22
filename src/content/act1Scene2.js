import {
  FRIENDS_GROUP,
  FRIENDS_GROUP_MESSAGES,
} from "./whatsappConversations.js";

export { FRIENDS_GROUP };

/** Earlier group banter before the Paytm message arrives. */
export const ACT1_CASUAL_MESSAGES = FRIENDS_GROUP_MESSAGES.map((m) => ({
  type: "text",
  sender: m.sender,
  text: m.text,
  time: m.time,
  ...(m.mine ? { mine: true } : {}),
}));

/** Visual break between older chat and the new scam beat. */
export const ACT1_NEW_MESSAGES_DIVIDER = {
  type: "divider",
  label: "3:48 PM",
};

/** Zack's forwarded Paytm scam SMS (shown inside forwarded bubble). */
export const FORWARDED_PAYTM_SCAM = `🎉 You have won ₹5,000 Paytm cash!!
Claim now or offer expires in 10 minutes!
→ bit.ly/paytm-win-now`;

export const INFOGRAPHIC_FILENAME = "Spot_the_Scam_Guide.png";
export const INFOGRAPHIC_SRC = "/spot-the-scam-infographic.png";

/**
 * Act 1 Scene 2 — group chat beats after Scene 1 homescreen.
 * @type {(
 *   | { type: "forwarded"; sender: string; body: string; time: string }
 *   | { type: "text"; sender: string; text: string; time: string; mine?: boolean }
 *   | { type: "infographic"; sender: string; caption: string; time: string }
 *   | { type: "divider"; label: string }
 * )[]}
 */
const ACT1_PAYTM_ARC = [
  {
    type: "forwarded",
    sender: "Zack",
    body: FORWARDED_PAYTM_SCAM,
    time: "3:48 PM",
  },
  {
    type: "text",
    sender: "Zack",
    text: "Woah!! Guys, I just won ₹5,000 Paytm cash!! Should I click it?",
    time: "3:48 PM",
  },
  {
    type: "text",
    sender: "Aryan",
    text: "Bro that's so much — just click it before it expires!",
    time: "3:49 PM",
  },
  {
    type: "text",
    sender: "Mei",
    text: "Wait… something feels off.",
    time: "3:49 PM",
  },
  {
    type: "text",
    sender: "Priya",
    text: "WAIT. Don't click that. I think this is a scam. Let me show you what these messages really are.",
    time: "3:50 PM",
  },
  {
    type: "infographic",
    sender: "Priya",
    caption: "SPOT THE SCAM! — save this & read with your parents",
    time: "3:50 PM",
  },
];

/** Casual history + Paytm scam dialog (no infographic yet). */
export const ACT1_GROUP_CHAT_PAYTM_DIALOG = [
  ...ACT1_CASUAL_MESSAGES,
  ACT1_NEW_MESSAGES_DIVIDER,
  ...ACT1_PAYTM_ARC.filter((m) => m.type !== "infographic"),
];

/** Full thread including Priya's infographic share. */
export const ACT1_GROUP_CHAT_FULL = [
  ...ACT1_CASUAL_MESSAGES,
  ACT1_NEW_MESSAGES_DIVIDER,
  ...ACT1_PAYTM_ARC,
];

/** @deprecated Use ACT1_GROUP_CHAT_FULL or ACT1_GROUP_CHAT_PAYTM_DIALOG */
export const ACT1_PAYTM_DIALOG = ACT1_PAYTM_ARC;
