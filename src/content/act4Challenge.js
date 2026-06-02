/** Act 4 — Scam Detective challenge round (from script.md). */

export const ACT4_CHALLENGE_INTRO = {
  eyebrow: "SCAM DETECTIVE — LEVEL UNLOCKED",
  tagline: "You learned the patterns. Now use them under pressure.",
  bullets: [
    "Grade: Hard",
    "Time limit active",
    "No second chances",
    "Score enough points — earn the Scam Proof Badge",
  ],
  cta: "Start Challenge →",
};

export const ACT4_SCORE_BANDS = [
  {
    minScore: 150,
    title: "Scam Proof",
    shieldLabel: "5 shields",
    copy: "They won't get through you.",
  },
  {
    minScore: 100,
    title: "Sharp Eyes",
    shieldLabel: "4 shields",
    copy: "You caught most of it. Find the one that slipped and lock it down.",
  },
  {
    minScore: 60,
    title: "Getting Wired",
    shieldLabel: "3 shields",
    copy: "The patterns are starting to click. One more round and nothing gets past you.",
  },
  {
    minScore: 0,
    title: "Not Yet — But That's the Point",
    shieldLabel: "1 shield",
    copy: "This is exactly why you play here first, before it's real. Go again.",
  },
];

export const ACT4_ROUNDS = [
  {
    id: "fake-link",
    number: 1,
    title: "Spot the Fake Link",
    prompt:
      "3 phones are on screen. Each has one notification. Tap the phone/notification you trust.",
    timerSeconds: 15,
    maxPoints: 20,
    type: "fake-link",
  },
  {
    id: "speed-round",
    number: 2,
    title: "Real or Scam?",
    prompt: "7 messages flash one by one. Tap REAL or SCAM. You have 8 seconds per message.",
    timerSeconds: 8,
    maxPoints: 70,
    type: "speed-round",
  },
  {
    id: "email-red-flags",
    number: 3,
    title: "What's Wrong Here?",
    prompt: "This email is fake. Find 4 things wrong with it. Tap each one.",
    timerSeconds: 30,
    maxPoints: 40,
    type: "email-red-flags",
  },
  {
    id: "response-match",
    number: 4,
    title: "What Do You Do Now?",
    prompt: "Match each situation to the correct response. Tap a situation, then tap a response.",
    maxPoints: 40,
    type: "response-match",
  },
  {
    id: "boss-level",
    number: 5,
    title: "The Boss Level",
    prompt: "One full scenario. No hints. No second chances. This is the real test.",
    maxPoints: 30,
    type: "boss-level",
  },
];

export const FAKE_LINK_OPTIONS = [
  {
    id: "a",
    label: "A",
    display: "phonepe.com/cashback/offer22",
    domain: "phonepe.com",
    path: "/cashback/offer22",
    correct: true,
    notification: {
      appName: "PhonePe",
      title: "Cashback credited — ₹50",
      body: "Your PhonePe cashback is ready. Open the link below to claim before midnight.",
      time: "2m ago",
    },
  },
  {
    id: "b",
    label: "B",
    display: "ph0nepe-rewards.in/claim",
    domain: "ph0nepe-rewards.in",
    path: "/claim",
    correct: false,
    why: "Zero instead of 'o' — classic phishing.",
    notification: {
      appName: "PhonePe Rewards",
      title: "URGENT: Unclaimed reward",
      body: "You have ₹50 waiting. Verify your account now using the secure link below.",
      time: "now",
    },
  },
  {
    id: "c",
    label: "C",
    display: "phonepe-support-helpline.net/verify",
    domain: "phonepe-support-helpline.net",
    path: "/verify",
    correct: false,
    why: "Extra words on a fake domain — another phishing trick.",
    notification: {
      appName: "PhonePe Support",
      title: "Security alert — action required",
      body: "Unusual activity detected. Confirm your identity on our helpline portal immediately.",
      time: "1m ago",
    },
  },
];

export const FAKE_LINK_FEEDBACK = {
  correct:
    "It uses the real domain: phonepe.com. B has a zero instead of 'o'. C adds extra words to a fake domain.",
};

export const SPEED_ROUND_MESSAGES = [
  {
    id: "1",
    sender: "SBI (Automated)",
    icon: "📱",
    body: "Your account statement for April is ready. Log in at onlinesbi.sbi to view.",
    answer: "real",
    explanation: "onlinesbi.sbi is SBI's actual domain. No link to click, no urgency.",
  },
  {
    id: "2",
    sender: "amazon-orders@amaz0n-india.co",
    icon: "📧",
    body: "Your package is delayed. Confirm address: amazon-delivery-verify.net",
    answer: "scam",
    explanation: 'Zero in "amaz0n", fake domain, "confirm address" is a phishing hook.',
  },
  {
    id: "3",
    sender: "+91 73829 10234 (Unknown)",
    icon: "📱",
    body: "Hi, I sent an OTP to your number by mistake. Could you forward it? 6 digits, just arrived.",
    answer: "scam",
    explanation: "Classic OTP theft. OTPs only go to the real account owner.",
  },
  {
    id: "4",
    sender: "Swiggy (Automated)",
    icon: "📱",
    body: "Your order #4821 is out for delivery. Track at swiggy.com/track",
    answer: "real",
    explanation: "Real domain, no login requested, no urgency.",
  },
  {
    id: "5",
    sender: "[FREE_FIRE_ADMIN_2024]",
    icon: "🎮",
    body: "Your account has been selected for 10,000 Diamond reward. Login to claim: ff-diamonds-real.com",
    answer: "scam",
    explanation: "Fake admin name, external link, free diamonds don't exist.",
  },
  {
    id: "6",
    sender: "HDFC Bank (Automated)",
    icon: "📱",
    body: 'OTP for your transaction: 294817. Valid for 10 minutes. Do NOT share with anyone.',
    answer: "real",
    explanation:
      "Automated OTP to the account owner. No link. No request. This is what a real OTP message looks like.",
  },
  {
    id: "7",
    sender: "@cricket_virat_official_gifts",
    icon: "📱",
    body: "To celebrate my birthday I'm giving ₹5,000 to 500 fans! Claim here → virat-bday-gift.in/claim ⏰ Only 43 spots left!",
    answer: "scam",
    explanation:
      "Deepfake giveaway. New account, external link, fake urgency, asks for UPI details.",
  },
];

export const EMAIL_RED_FLAGS = {
  from: "sbi-securityteam@sbi-custservice.org",
  subject: "⚠️ Urgent: Your account has been frozen",
  body: [
    "Dear Customer,",
    "",
    "We have detected suspicious activty in your account. Your account has been temporarly frozen.",
    "",
    "Click here to unfreeze: sbi-account-unfreeze-now.com/verify",
    "",
    "You must act within 1 hour or your account will be permanently closed.",
    "",
    "— SBI Customer Security Team",
  ],
  issues: [
    {
      id: "domain",
      label: "The email domain",
      explanation: "sbi-custservice.org is not SBI's real domain (onlinesbi.sbi).",
      tapText: "sbi-securityteam@sbi-custservice.org",
    },
    {
      id: "spelling",
      label: "Spelling mistakes",
      explanation: '"activty", "temporarly" — real banks proofread.',
      tapText: "activty",
      tapText2: "temporarly",
    },
    {
      id: "link",
      label: "The link",
      explanation: "sbi-account-unfreeze-now.com is a fake phishing domain.",
      tapText: "sbi-account-unfreeze-now.com/verify",
    },
    {
      id: "urgency",
      label: "The urgency",
      explanation: '"1 hour or permanent closure" — designed to panic you.',
      tapText: "within 1 hour or your account will be permanently closed",
    },
  ],
};

export const MATCH_SITUATIONS = [
  { id: "otp", text: "You got an OTP you didn't request" },
  { id: "friend", text: "A friend texts from an unknown number asking for help urgently" },
  {
    id: "password",
    text: "You click a link and realise it was fake — you already typed your password",
  },
  { id: "prize", text: 'You receive a "You\'ve won ₹5,000" message' },
  {
    id: "threat",
    text: "Someone threatens to share AI-generated content of you unless you pay",
  },
];

export const MATCH_RESPONSES = [
  { id: "a", text: "Ignore the message. Don't reply. Don't forward." },
  { id: "b", text: "Call your friend on their real saved number before doing anything." },
  {
    id: "c",
    text: "Change your password immediately on every account that uses it. Tell a parent now.",
  },
  { id: "d", text: "Delete it. You never entered a contest. It isn't real." },
  {
    id: "e",
    text: "Tell a trusted adult immediately. Do not pay. Block and report.",
  },
];

export const MATCH_CORRECT = {
  otp: "a",
  friend: "b",
  password: "c",
  prize: "d",
  threat: "e",
};

export const BOSS_SCENARIO = {
  setting: "Late evening. You're studying. Two messages arrive.",
  messages: [
    {
      app: "YouTube",
      sender: "MS Dhoni Fans Official",
      badge: "LIVE",
      body: "Surprise! Giving ₹8,000 to 200 subscribers RIGHT NOW to celebrate retirement anniversary!",
    },
    {
      app: "Unknown",
      sender: "+91 94827 10293",
      body: "Bro did you see this Dhoni giveaway?? I already registered and it's asking for a friend referral — use my link and we BOTH get extra. hurry only 12 spots → dhoni-fan-gift.in/refer",
    },
  ],
  thought:
    "Two messages at once. A 'friend' I don't recognise pushing the same link. A countdown. Something about this feels coordinated.",
  question: "What are the red flags here and what do you do?",
  modelAnswer:
    "This is a coordinated scam — a deepfake celebrity giveaway backed by a fake 'friend' account to create extra pressure and urgency. Red flags: unknown YouTube channel, external link, unknown number pushing the same link, countdown timer, UPI registration. You ignore both messages, check the real Dhoni channel directly, and report both accounts.",
  concepts: [
    {
      id: "fake-celebrity",
      label: "Fake celebrity / deepfake giveaway",
      keywords: [
        "deepfake",
        "fake channel",
        "fake celebrity",
        "fake giveaway",
        "celebrity scam",
        "dhoni scam",
        "coordinated",
        "coordinated scam",
        "fake youtube",
        "unknown channel",
      ],
    },
    {
      id: "dont-click",
      label: "Do not click the link",
      keywords: [
        "don't click",
        "do not click",
        "not click",
        "ignore",
        "avoid link",
        "don't open",
        "dont click",
        "ignore both",
        "don't register",
      ],
    },
    {
      id: "verify-report",
      label: "Verify directly / report",
      keywords: [
        "official channel",
        "verify",
        "check directly",
        "real channel",
        "report",
        "block",
        "tell parent",
        "trusted adult",
      ],
    },
  ],
};

export const ACT4_GROUP_WRAP_SCRIPT = [
  {
    speaker: "kabir",
    type: "text",
    text: "ok. I get it now. Rohan didn't do anything wrong. they built the whole thing to catch him.",
  },
  {
    speaker: "priya",
    type: "text",
    text: "exactly. and now you know the build.",
  },
  {
    speaker: "aryan",
    type: "text",
    text: "i failed the speed round lol. the deepfake one got me",
  },
  {
    speaker: "diya",
    type: "text",
    text: "i found all 4 things in the email 👀",
  },
  {
    speaker: "priya",
    type: "text",
    text: "here. the 5 things you keep. forever.",
  },
];

export const ACT4_RULES = [
  {
    id: "links",
    title: "Links",
    text: "Links in messages → ignore. Go to the official app yourself.",
  },
  {
    id: "otp",
    title: "OTP",
    text: "OTP is for your eyes only. No one — ever — has a valid reason to ask for it.",
  },
  {
    id: "password",
    title: "Passwords",
    text: "No company, admin, or support team needs your password. If they ask, they're not real.",
  },
  {
    id: "deepfake",
    title: "Deepfakes",
    text: "Deepfake videos look and sound real. Check the channel age. Real celebrities don't do UPI giveaways.",
  },
  {
    id: "urgency",
    title: "Urgency",
    text: "When something feels urgent and you didn't start it — that feeling is the warning. Stop. Think. Then decide.",
  },
];

export const ACT4_HELP_STEPS = [
  "Tell a parent or trusted adult immediately — not tomorrow, now.",
  "Don't delete any messages — they're evidence.",
  "Report the number or account on the platform.",
  "If you shared a password — change it on every account that uses it, right now.",
  "If someone is threatening you — you have done nothing wrong. Tell an adult. Do not pay.",
];

export const ACT4_FINAL_COPY = {
  lines: [
    "Rohan lost ₹12,000.",
    "Eight months of saving.",
    "He didn't do anything wrong.",
    "He just didn't know what you know now.",
    "",
    "Scammers study teenagers. They know what you love — your game account, your Instagram, your money, your reputation. They build the exact message designed to catch you mid-thought, mid-match, mid-panic.",
    "",
    "AI has made their fakes look more real than ever. But you've now been inside it. You know what fake urgency feels like. You've seen how every trick is built.",
    "",
    "That knowledge doesn't expire. Use it.",
  ],
  headline: "You are not just someone who knows about scams.",
  subhead: "You are someone who cannot be scammed.",
};

export const ACT4_SHARE_TEXT =
  "I just played Scam Smart. The big rule: when something feels urgent and you didn't start it, stop and verify.";
