/** Zomato mini challenge — after Scenario 1, group orders food. */

export const ZOMATO_SCAM_FORWARD = `You have received a FREE ₹500 Zomato voucher!
Verify your card to claim:
→ zomato-rewards-offer.in`;

/** Group chat — planning to order food. */
export const ZOMATO_FOOD_PLANNING_MESSAGES = [
  { type: "text", sender: "Zack", text: "Ok I'm starving. Zomato?", time: "5:10 PM" },
  { type: "text", sender: "Aryan", text: "yes biryani pls", time: "5:10 PM" },
  { type: "text", sender: "Mei", text: "I'm in if we split", time: "5:11 PM" },
  {
    type: "text",
    sender: "You",
    text: "Same — let's order before it gets too expensive",
    time: "5:11 PM",
    mine: true,
  },
];

/** Aryan forwards the voucher scam into the group. */
export const ZOMATO_ARYAN_FORWARD_MESSAGES = [
  ...ZOMATO_FOOD_PLANNING_MESSAGES,
  {
    type: "divider",
    label: "5:12 PM",
  },
  {
    type: "forwarded",
    sender: "Aryan",
    body: ZOMATO_SCAM_FORWARD,
    time: "5:12 PM",
  },
  {
    type: "text",
    sender: "Aryan",
    text: "Wait guys — ₹500 off food 👀 should we use this?",
    time: "5:12 PM",
  },
];

export const ZOMATO_SINGLE_CHOICE = {
  id: "ignore_warn",
  label: "Ignore it and tell the group we can't get scammed again",
};

/** After the player warns the group. */
export const ZOMATO_SAFE_GROUP_MESSAGES = [
  ...ZOMATO_ARYAN_FORWARD_MESSAGES,
  {
    type: "text",
    sender: "You",
    text: "Guys — don't click that. Same scam pattern as before. We can't fall for this again.",
    time: "5:13 PM",
    mine: true,
  },
  {
    type: "text",
    sender: "Mei",
    text: "Yeah — unknown link, free voucher… no thanks",
    time: "5:13 PM",
  },
  {
    type: "text",
    sender: "Aryan",
    text: "ok ok you're right 😅 my bad",
    time: "5:14 PM",
  },
  {
    type: "text",
    sender: "Priya",
    text: "Different company, same trick. You spotted the pattern, not just the logo.",
    time: "5:14 PM",
  },
];
