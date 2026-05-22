import { PHONEPE_WALLET_BALANCE } from "./scenario1.js";

/** Wallet after Scenario 1 — unchanged on safe path. */
export const PHONEPE_WALLET_S2_SAFE = PHONEPE_WALLET_BALANCE;

/** Partial loss after sharing OTP (₹153 gone). */
export const PHONEPE_WALLET_S2_STOLEN = 47;
export const PHONEPE_DEBIT_AMOUNT = 153;

export const PAYTM_OTP_SENDER = "Paytm";
export const UNKNOWN_OTP_SENDER = "+91 90000 12345";

export const PAYTM_OTP_CODE = "847291";

export const PAYTM_OTP_MESSAGE = `Your Paytm verification code is: ${PAYTM_OTP_CODE}.
DO NOT SHARE THIS CODE WITH ANYONE.`;

export const HOME_OTP_NOTIFICATION = `Sorry yaar, I think I used your number by mistake.
Did you get a 6-digit OTP? Please send it.`;

export const UNKNOWN_OTP_THREAD = [
  {
    sender: UNKNOWN_OTP_SENDER,
    text: "Sorry yaar, I think I used your number by mistake while signing up.",
    time: "5:22 PM",
  },
  {
    sender: UNKNOWN_OTP_SENDER,
    text: "Did you get a 6-digit OTP? Please send it, I need to get into my account.",
    time: "5:22 PM",
  },
  {
    sender: UNKNOWN_OTP_SENDER,
    text: "Please do it fast — I'm stuck on the login screen.",
    time: "5:23 PM",
  },
];

export const SCENARIO2_CHOICE_CONTEXT =
  "You weren't logging into Paytm. Someone else is asking for the code that was sent to YOUR phone.";

export const SCENARIO2_CHOICES = [
  {
    id: "forward",
    label: "Send them the OTP — looks like an honest mistake",
  },
  {
    id: "ignore",
    label: "Ignore both messages — do not share the OTP",
  },
  {
    id: "ask",
    label: "Ask why they need it, then decide",
  },
];

// —— Path B (ignore) ——

export const PATH_B_EXTRA_STRANGER = [
  {
    sender: UNKNOWN_OTP_SENDER,
    text: "Hello?? The code expires in 5 minutes.",
    time: "5:24 PM",
  },
  {
    sender: UNKNOWN_OTP_SENDER,
    text: "Your account will be locked if I can't sign in — please help",
    time: "5:25 PM",
  },
];

export const PATH_B_GROUP_MESSAGES = [
  { type: "text", sender: "Mei", text: "Wait did anyone get a random Paytm OTP?", time: "5:26 PM" },
  {
    type: "text",
    sender: "You",
    text: "Yeah. Some unknown number is begging for it. Don't send — it's a scam.",
    time: "5:26 PM",
    mine: true,
  },
  { type: "text", sender: "Zack", text: "good call", time: "5:27 PM" },
  {
    type: "text",
    sender: "Priya",
    text: "Pay attention to: Paytm itself said DO NOT SHARE. OTPs are only for you. A 'wrong number' or urgent story is how scammers get into your wallet — never forward a code.",
    time: "5:27 PM",
  },
];

// —— Path wrong (forward / ask → share) ——

export const PATH_WRONG_YOU_REPLY = {
  sender: "You",
  text: `Here: ${PAYTM_OTP_CODE}`,
  time: "5:24 PM",
  mine: true,
};

export const PATH_WRONG_GROUP_MESSAGES = [
  {
    type: "text",
    sender: "You",
    text: "Guys… I think I messed up. I sent someone the Paytm OTP. My balance just dropped.",
    time: "5:28 PM",
    mine: true,
  },
  { type: "text", sender: "Zack", text: "bro NO 😰", time: "5:28 PM" },
  { type: "text", sender: "Mei", text: "How much did you lose?", time: "5:29 PM" },
  {
    type: "text",
    sender: "You",
    text: `Only ₹${PHONEPE_WALLET_S2_STOLEN} left. ₹${PHONEPE_DEBIT_AMOUNT} gone.`,
    time: "5:29 PM",
    mine: true,
  },
  {
    type: "text",
    sender: "Priya",
    text: "Pay attention to: the Paytm message warned you not to share. Anyone asking for your OTP — stranger, 'support', even a sad story — is trying to log into YOUR account. The code is never for someone else's signup.",
    time: "5:30 PM",
  },
];
