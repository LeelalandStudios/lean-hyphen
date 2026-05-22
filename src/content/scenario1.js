/** Act 3 — Scenario 1: PhonePe Cashback Trap (through choice only). */

/** Matches Zack hook — player wallet before the scam message. */
export const PHONEPE_WALLET_BALANCE = 200;

export const PHONEPE_SCAM_SENDER = "+91 91234 56789";

export const PHONEPE_SCAM_NOTIFICATION = `🎉 You have won ₹3,000 PhonePe cashback!
Claim now or offer expires in 5 minutes!
→ bit.ly/phonepe-bonus-3000`;

export const PHONEPE_SCAM_FULL = `${PHONEPE_SCAM_SENDER}
${PHONEPE_SCAM_NOTIFICATION}`;

/** 1:1 WhatsApp hook — Zack, month end & birthday gift pressure. */
export const ZACK_GIFT_HOOK_MESSAGES = [
  { sender: "You", text: "Month end again… I'm literally at ₹200.", time: "4:02 PM", mine: true },
  {
    sender: "Zack",
    text: "Same bro 😩 Priya's asking what we're doing for her gf's birthday next week.",
    time: "4:03 PM",
  },
  {
    sender: "You",
    text: "I haven't even thought about a gift. No way I can afford anything nice.",
    time: "4:03 PM",
    mine: true,
  },
  {
    sender: "Zack",
    text: "Yeah this sucks. Anyway — scroll reels or something lol",
    time: "4:04 PM",
  },
];

export const SCENARIO1_CHOICE_CONTEXT =
  "You're low on pocket money this month. ₹3,000 sounds perfect. You never entered any offer, but the timer says 5 minutes.";

export const SCENARIO1_CHOICES = [
  {
    id: "tap",
    label: "Tap the link quickly and claim ₹3,000",
  },
  {
    id: "ignore",
    label: "Ignore and delete the message from this unknown number",
  },
  {
    id: "forward",
    label: "Forward it to friends so they can claim too",
  },
];

// —— Path A outcomes ——

export const PATH_A_GROUP_MESSAGES = [
  {
    type: "text",
    sender: "You",
    text: "Guys… I think I lost my money. That PhonePe link was fake.",
    time: "4:55 PM",
    mine: true,
  },
  { type: "text", sender: "Zack", text: "bro WHAT 😰", time: "4:55 PM" },
  { type: "text", sender: "Mei", text: "Are you serious??", time: "4:56 PM" },
  {
    type: "text",
    sender: "Priya",
    text: "Pay attention to: unknown numbers, shortened links like bit.ly, “you won” prizes you never entered, and login pages that are not the real PhonePe app. Before you tap, ask who sent it and whether you signed up for anything.",
    time: "4:57 PM",
  },
];

// —— Path B outcomes ——

export const PATH_B_GROUP_MESSAGES = [
  {
    type: "text",
    sender: "Zack",
    text: "Guys I lost ₹3,000… I clicked that PhonePe cashback link. It's gone.",
    time: "4:52 PM",
  },
  { type: "text", sender: "Aryan", text: "no way 😨", time: "4:52 PM" },
  { type: "text", sender: "Mei", text: "Zack are you okay", time: "4:53 PM" },
  {
    type: "text",
    sender: "Priya",
    text: "Notice the pattern in Zack's message: unknown sender, fake prize, short link, hurry timer. Even if you delete a scam SMS on your phone, friends can still get hit. Always check who sent it and whether the link matches the real app.",
    time: "4:54 PM",
  },
];

// —— Path C outcomes ——

export const PATH_C_GROUP_MESSAGES = [
  {
    type: "forwarded",
    sender: "You",
    body: PHONEPE_SCAM_NOTIFICATION,
    time: "4:50 PM",
  },
  {
    type: "text",
    sender: "Aryan",
    text: "I clicked it because YOU forwarded it!!!",
    time: "4:51 PM",
  },
  {
    type: "text",
    sender: "Aryan",
    text: "I lost ₹3,000. Thanks a lot.",
    time: "4:51 PM",
  },
  {
    type: "text",
    sender: "Mei",
    text: "Why would you send that to the group",
    time: "4:52 PM",
  },
  {
    type: "text",
    sender: "Zack",
    text: "bro that is not cool",
    time: "4:52 PM",
  },
  {
    type: "text",
    sender: "Priya",
    text: "Pay attention to: never forward “you won money” messages. Forwarding spreads the trap. If something looks like a prize link, tell friends not to click — do not share the link itself.",
    time: "4:53 PM",
  },
];
