import { FRIEND_OTP_ARTICLE } from "./newsArticle.js";

export const RAFI_SCAM_NUMBER = "+91 98765 43210";
export const RAFI_SAVED_CONTACT = "Rafi";

export const HOME_RAFI_NOTIFICATION =
  "Rafi: bro it's me — new phone 😭 did you get a Free Fire OTP? send fast ranked starting";

export const RAFI_INBOX_CHAT = {
  id: "rafi-scam",
  type: "direct",
  title: RAFI_SCAM_NUMBER,
  preview: "bro new phone… did you get OTP for Free Fire?",
  time: "6:08 PM",
  unread: 2,
};

export const RAFI_SAVED_INBOX_DECOY = {
  id: "rafi-saved",
  type: "direct",
  title: RAFI_SAVED_CONTACT,
  preview: "see you at tuition tomorrow",
  time: "Yesterday",
  unread: 0,
};

export const FREE_FIRE_OTP_CODE = "629184";
export const FREE_FIRE_OTP_SENDER = "Free Fire";

export const FREE_FIRE_OTP_MESSAGE = `Your Free Fire login code is ${FREE_FIRE_OTP_CODE}.
DO NOT SHARE. Valid for 10 minutes.`;

export const RAFI_THREAD = [
  {
    sender: RAFI_SCAM_NUMBER,
    text: "bro it's Rafi — new phone 😭 saved contacts didn't transfer",
    time: "6:07 PM",
  },
  {
    sender: RAFI_SCAM_NUMBER,
    text: "I used YOUR number by mistake for Free Fire login. Did you get a 6-digit OTP?",
    time: "6:07 PM",
  },
  {
    sender: RAFI_SCAM_NUMBER,
    text: "Please paste it here — ranked match starts in 3 mins I'm stuck on login screen",
    time: "6:08 PM",
  },
];

export const SCENARIO3_CHOICE_CONTEXT =
  "The number is not saved as Rafi. The OTP in Messages is for YOUR Free Fire account — not his signup mistake.";

export const SCENARIO3_CHOICES = [
  {
    id: "send",
    label: "Send the OTP in chat — sounds like Rafi and he's panicking",
  },
  {
    id: "call",
    label: "Call Rafi on the number already saved in contacts",
  },
  {
    id: "ignore",
    label: "Ignore the chat and hope it sorts itself out",
  },
];

export const PATH_CALL_VERIFIED_TEXT = {
  title: "Rafi · saved contact",
  body: `"No bro, I didn't message you. My phone is fine — same number as always. Someone's pretending to be me."`,
  hint: "You didn't share the code. The WhatsApp chat was a scammer.",
};

export const PATH_SEND_YOU_REPLY = {
  sender: "You",
  text: FREE_FIRE_OTP_CODE,
  time: "6:09 PM",
  mine: true,
};

export const PATH_SEND_FF_NOTICE =
  "Free Fire — logged in from new device. Diamonds and skins transferred.";

export const PATH_IGNORE_EXTRA = [
  {
    sender: RAFI_SCAM_NUMBER,
    text: "HELLO?? code expiring — my squad is waiting",
    time: "6:10 PM",
  },
  {
    sender: RAFI_SCAM_NUMBER,
    text: "bro please don't leave me on read — account will lock",
    time: "6:11 PM",
  },
];

const SHARE_TEXT_CALL = `📰 Teen Wire — sharing because it just happened to me

Someone messaged as "Rafi" from ${RAFI_SCAM_NUMBER} — NOT his saved number. I called ${RAFI_SAVED_CONTACT} on his real contact first. He said he never texted.

Article: ${FRIEND_OTP_ARTICLE.headline}`;

const SHARE_TEXT_SEND = `📰 Teen Wire — please read

I thought ${RAFI_SAVED_CONTACT} was texting from a new phone. I sent my Free Fire OTP. Account drained.

${FRIEND_OTP_ARTICLE.headline} — don't do what I did.`;

const SHARE_TEXT_IGNORE = `📰 Teen Wire

Got WhatsApp from a "new number Rafi" begging for my Free Fire OTP. I didn't send it but I didn't call him either — still freaky.

${FRIEND_OTP_ARTICLE.headline}`;

/** @typedef {'call'|'send'|'ignore'} Scenario3Path */

/** News share + group debrief keyed by Scenario 3 path. */
export const NEWS_SHARE_BY_PATH = {
  call: {
    shareLabel: "Share to group — I called Rafi first, then read this",
    sharePreview: `Guys — someone pretended to be Rafi on a new number. I called him on his real contact first. This Teen Wire piece explains it.`,
    groupMessages: [
      {
        type: "text",
        sender: "You",
        text: SHARE_TEXT_CALL,
        time: "6:25 PM",
        mine: true,
      },
      { type: "text", sender: "Mei", text: "Wait WHAT — a fake Rafi??", time: "6:25 PM" },
      { type: "text", sender: "Zack", text: "smart that you called first", time: "6:26 PM" },
      { type: "text", sender: "Aryan", text: "I would've just replied in chat ngl", time: "6:26 PM" },
      {
        type: "text",
        sender: "Priya",
        text: "Pay attention to: a familiar name on an unknown number is still a stranger. Calling the saved contact is how you verify. OTPs are only for your account — never paste them in WhatsApp to 'help' a friend.",
        time: "6:27 PM",
      },
    ],
  },
  send: {
    shareLabel: "Share to group — I messed up, read this so you don't",
    sharePreview: `I got tricked by a fake Rafi and lost my Free Fire stuff. Please read this Teen Wire article.`,
    groupMessages: [
      {
        type: "text",
        sender: "You",
        text: SHARE_TEXT_SEND,
        time: "6:25 PM",
        mine: true,
      },
      { type: "text", sender: "Zack", text: "NOOO bro 😰", time: "6:25 PM" },
      {
        type: "text",
        sender: "Mei",
        text: "Same thing as the Paytm OTP scam but with a friend's name…",
        time: "6:26 PM",
      },
      {
        type: "text",
        sender: "Priya",
        text: "Pay attention to: scammers copy how real friends text. The code was for YOUR game account. Sharing it let someone else log in as you. Next time — stop typing, call your friend on the number you already have saved.",
        time: "6:27 PM",
      },
    ],
  },
  ignore: {
    shareLabel: "Share to group — I ignored it but almost fell for it",
    sharePreview: `Almost got scammed by someone saying they were Rafi on a new number. Sharing the article so we all know the pattern.`,
    groupMessages: [
      {
        type: "text",
        sender: "You",
        text: SHARE_TEXT_IGNORE,
        time: "6:25 PM",
        mine: true,
      },
      {
        type: "text",
        sender: "Aryan",
        text: "ignoring is better than sending the code at least",
        time: "6:26 PM",
      },
      {
        type: "text",
        sender: "Mei",
        text: "but you should still call Rafi on his old number to check",
        time: "6:26 PM",
      },
      {
        type: "text",
        sender: "Priya",
        text: "Pay attention to: ignoring the chat without verifying can still leave you unsure. The habit that stops this: call your friend on their saved number and ask 'did you message me?' — then share what you learned so the group stays sharp.",
        time: "6:27 PM",
      },
    ],
  },
};
