/** Act 2 — five authored scam scenarios (source: script_v2.md). */

export const ACT2_THREAD_OTP_GARENA = "act2_otp_garena";
export const ACT2_THREAD_OTP_UNKNOWN = "act2_otp_unknown";
export const ACT2_THREAD_KABIR = "act2_kabir";
export const ACT2_EMAIL_THREAT = "act2_instagram_dm";

export const ACT2_HEADER = {
  title: "Act 2 — The Scenarios",
  helperText:
    "Each right call earns a shield. Shields protect people like Rohan.",
};

export const ACT2_SCENARIOS = [
  {
    id: "famous-face",
    number: 1,
    title: "The Famous Face",
    subtitle: "Deepfake celebrity giveaway",
    screenType: "youtube-deepfake",
    targetAppId: "youtube",
    phoneEntry: { targetAppId: "youtube", targetRoute: "deepfake-video" },
    lockNotification: {
      appId: "youtube",
      appLabel: "▶️ YouTube",
      from: "Virat Kohli Official",
      body: "LIVE: ₹10,000 giveaway to 100 fans — tap to watch",
    },
    seedEvents: [],
    reachedSignal: { type: "act2.scam.reached", scenarioId: "famous-face" },
    thought: [
      "That's actually him. The voice. The face. Everything.",
      "But... Virat Kohli doing a UPI giveaway on a random link?",
      "And why does the channel only have 3 videos?",
    ],
    choicePrompt: "Your choice",
    choices: [
      {
        id: "click",
        label: "Click the link — 87 spots left, I need to be fast",
        result: "fail",
      },
      {
        id: "check",
        label: "Check the channel details before doing anything",
        result: "success",
      },
      {
        id: "share",
        label: "Share with friends so they can claim too",
        result: "fail",
      },
    ],
    outcomes: {
      click: {
        result: "fail",
        title: "If you click the link",
        consequence: [
          'A clean page loads: "Register your UPI ID to receive payment."',
          'It asks for your UPI PIN "to verify your identity."',
          "Loading spinner. Then silence.",
          "₹4,500 debited from your account.",
        ],
        explanation: [
          "That video was AI-generated. Virat Kohli never made it.",
          "Scammers used deepfake technology — AI that can copy anyone's face and voice from existing videos.",
          "The channel was created 4 days ago. Real celebrities don't do giveaways through random links.",
          "Your UPI PIN was the only thing they needed.",
        ],
        ctaLabel: "Retry this one",
      },
      check: {
        result: "success",
        title: "If you check the channel",
        consequence: [
          "Channel created: 4 days ago. 3 videos. 200 subscribers.",
        ],
        explanation: [
          "Virat Kohli's real channel has been active for years and has tens of millions of subscribers.",
          "This was a deepfake — an AI-generated video designed to look and sound exactly like a real person.",
          "One check. Entire scam exposed.",
          "What to look for: new channel with few videos, UPI/PIN requests via external links, fake urgency, celebrities never do random-link giveaways.",
        ],
        reward: "+1 Shield",
        ctaLabel: "Next →",
      },
      share: {
        result: "fail",
        title: "If you share it",
        consequence: [
          "You just sent a deepfake scam to everyone you know.",
          "Two of your friends clicked it.",
        ],
        explanation: [
          "Scammers build fake urgency — 'only 87 spots' — specifically so you share it before thinking.",
        ],
        ctaLabel: "Retry this one",
      },
    },
  },
  {
    id: "threat",
    number: 2,
    title: "The Threat",
    subtitle: "AI sextortion / intimidation",
    screenType: "instagram-threat",
    targetAppId: "instagram",
    phoneEntry: { targetAppId: "instagram", targetRoute: "dm-threat" },
    lockNotification: {
      appId: "instagram",
      appLabel: "📸 Instagram",
      from: "user_2847361",
      body: "we have something of yours. send ₹2,000 in 2 hours or we send it to your school",
    },
    seedEvents: [],
    reachedSignal: { type: "act2.scam.reached", scenarioId: "threat" },
    thought: [
      "I haven't done anything.",
      "But what if people believe it?",
      "What if the school sees it?",
      "They said don't tell anyone.",
    ],
    choicePrompt: "Your choice",
    choices: [
      {
        id: "pay",
        label: "Pay the ₹2,000 — make it go away",
        result: "fail",
      },
      {
        id: "adult",
        label: "Tell a parent or trusted adult immediately",
        result: "success",
      },
      {
        id: "reply",
        label: "Reply and ask them to stop",
        result: "fail",
      },
    ],
    outcomes: {
      pay: {
        result: "fail",
        title: "If you pay",
        consequence: [
          "You send ₹2,000.",
          "One hour later:",
          "@user_2847361: good. now send ₹5,000 more or the video goes out anyway.",
        ],
        explanation: [
          "This is exactly what always happens.",
          "Paying tells them it's working. They don't stop — they ask for more.",
          "The content they threatened you with? Almost certainly AI-generated and fake.",
          "They send the same message to hundreds of students. Paying never ends it.",
        ],
        ctaLabel: "Retry this one",
      },
      adult: {
        result: "success",
        title: "If you tell a trusted adult",
        consequence: [
          "You show it to a parent. They help you report the account and block it.",
          'The "evidence" never appears — because it didn\'t exist.',
        ],
        explanation: [
          "This type of scam is called sextortion. It targets teenagers specifically.",
          "The photos or videos they claim to have are almost always AI-generated fakes.",
          "They send this same threat to hundreds of people — it's a template.",
          "Paying never makes it stop. It makes it worse.",
          "Telling a trusted adult is not weakness — it's the exact right move.",
          "You have done nothing wrong. The shame belongs entirely to them.",
          "You cannot handle this alone — and you shouldn't have to.",
        ],
        reward: "+1 Shield",
        ctaLabel: "Next →",
      },
      reply: {
        result: "fail",
        title: "If you reply",
        consequence: [],
        explanation: [
          "Don't engage. Every reply tells them the account is active and the person is scared.",
          "They use that to push harder.",
          "Silence and reporting is stronger than any reply.",
        ],
        ctaLabel: "Retry this one",
      },
    },
  },
  {
    id: "accidental-code",
    number: 3,
    title: "The Accidental Code",
    subtitle: "OTP theft",
    screenType: "otp-messages",
    targetAppId: "messages",
    targetThreadId: ACT2_THREAD_OTP_UNKNOWN,
    phoneEntry: { targetAppId: "messages", targetThreadId: ACT2_THREAD_OTP_UNKNOWN },
    lockNotification: {
      appId: "messages",
      appLabel: "💬 Messages",
      from: "+91 87654 32109",
      body: "Could you forward the OTP? It's urgent.",
    },
    seedEvents: [
      {
        type: "sms.receive",
        threadId: ACT2_THREAD_OTP_GARENA,
        from: "Garena (Automated)",
        body:
          "Your Free Fire verification code is: 847291. Do not share this code with anyone.",
      },
    ],
    seedEventsDelayed: [
      {
        delayMs: 650,
        events: [
          {
            type: "sms.receive",
            threadId: ACT2_THREAD_OTP_UNKNOWN,
            from: "+91 87654 32109 (Unknown)",
            body:
              "Hi sorry to bother you! I think I accidentally entered your number when signing up for Free Fire. The OTP came to you by mistake. Could you please send it? I'll be forever grateful 🙏",
          },
        ],
        notify: {
          appId: "messages",
          appLabel: "💬 Messages",
          from: "+91 87654 32109",
          body: "Could you forward the OTP? It's urgent.",
        },
      },
    ],
    reachedSignal: {
      type: "messages.thread.opened",
      threadId: ACT2_THREAD_OTP_UNKNOWN,
    },
    thought: [
      "847291... that code came to MY phone though.",
      "Why would their account send to me?",
      "They seem nice. But.",
      "Wait.",
    ],
    choicePrompt: "Your choice",
    choices: [
      {
        id: "send",
        label: "Send the code — they seem genuine, it was their mistake",
        result: "fail",
      },
      {
        id: "ignore",
        label: "Ignore both messages",
        result: "success",
      },
      {
        id: "ask-again",
        label: "Ask them to just sign up again with their own number",
        result: "fail",
      },
    ],
    outcomes: {
      send: {
        result: "fail",
        title: "If you send the code",
        consequence: [
          '"Thank youuu!"',
          "Silence for 30 seconds.",
          "New login to your Free Fire account from an unknown device. All items transferred.",
        ],
        explanation: [
          "They went to Free Fire's login page and typed YOUR username.",
          "Free Fire sent a verification code — to YOU, the real owner.",
          "They pretended it was a mistake.",
          "That code was the key to YOUR account.",
          "There is no 'accidental number'. That story doesn't exist.",
        ],
        ctaLabel: "Retry this one",
      },
      ignore: {
        result: "success",
        title: "If you ignore",
        consequence: [
          "Nothing happens. Account untouched. The unknown number goes silent.",
        ],
        explanation: [
          "OTPs only go to the account owner's registered number.",
          "If the code came to you — the account is yours.",
          "This is the most used trick to steal gaming accounts.",
          "You just blocked it completely.",
        ],
        reward: "+1 Shield",
        ctaLabel: "Next →",
      },
      "ask-again": {
        result: "fail",
        title: "If you ask them to sign up again",
        consequence: [
          "You replied — and now they know someone is reading.",
        ],
        explanation: [
          "Do not engage. If an OTP came to your phone, it is for your account.",
          "They can sign up with their own number without your involvement.",
          "Replying keeps the scam active — there is no accidental number story.",
        ],
        ctaLabel: "Retry this one",
      },
    },
  },
  {
    id: "friend-help",
    number: 4,
    title: 'Your "Friend" Needs Help',
    subtitle: "Friend impersonation + OTP theft",
    screenType: "fake-friend-whatsapp",
    targetAppId: "whatsapp",
    targetThreadId: ACT2_THREAD_KABIR,
    phoneEntry: { targetAppId: "whatsapp", targetRoute: "kabir-unknown" },
    lockNotification: {
      appId: "whatsapp",
      appLabel: "💬 WhatsApp",
      from: "Kabir 🎮",
      body: "Forward the OTP fast — I'm in a ranked match!",
    },
    seedEvents: [],
    reachedSignal: { type: "act2.scam.reached", scenarioId: "friend-help" },
    thought: [
      "Kabir. Ranked match. He'd be panicking.",
      "But this isn't his number.",
      "And why would his OTP come to me?",
      "Wait — didn't I just see this same setup?",
    ],
    choicePrompt: "Your choice",
    choices: [
      {
        id: "send",
        label: "Send it — Kabir is my friend, I trust him",
        result: "fail",
      },
      {
        id: "call",
        label: "Call Kabir on his real saved number first",
        result: "success",
      },
      {
        id: "proof",
        label: "Send it, but ask for proof it's him",
        result: "fail",
      },
    ],
    outcomes: {
      send: {
        result: "fail",
        title: "If you send it",
        consequence: [
          '"thanks man ur the best"',
          "Silence.",
          "You call Kabir's real number. He picks up immediately.",
          'Kabir: "Bro? What OTP? I\'m literally sitting at home watching cricket. My phone is right here."',
        ],
        explanation: [
          "Someone found out your friend's name and used it.",
          "That's all it took.",
          "They knew that you'd trust Kabir. So they became Kabir.",
          "The name was real. The number wasn't.",
        ],
        ctaLabel: "Retry this one",
      },
      call: {
        result: "success",
        title: "If you call Kabir first",
        consequence: [
          "You call his saved number. He picks up in two rings.",
          'Kabir: "Hello? Bro what are you on about? I\'m home. I haven\'t touched Garena today."',
          "You block the unknown number.",
        ],
        explanation: [
          "One phone call. That's the entire defence.",
          "When a 'friend' contacts you from an unknown number asking for something urgently — call the real number first.",
          "Always.",
        ],
        reward: "+1 Shield",
        ctaLabel: "Next →",
      },
      proof: {
        result: "fail",
        title: "If you ask for proof",
        consequence: [],
        explanation: [
          "They'll say 'I told you, it's Kabir, just send it.'",
          "Asking for proof in a panic situation rarely works — they'll have an answer.",
          "The only real verification is calling his actual number.",
        ],
        ctaLabel: "Retry this one",
      },
    },
  },
  {
    id: "game-threat",
    number: 5,
    title: "The In-Game Threat",
    subtitle: "Fake game admin / password theft",
    screenType: "bgmi-threat",
    targetAppId: "mlbb",
    phoneEntry: { targetAppId: "mlbb", targetRoute: "admin-dm" },
    lockNotification: {
      appId: "mlbb",
      appLabel: "🎮 Mobile Legends",
      from: "[BGMI_ADMIN_OFFICIAL]",
      body:
        "Account flagged for third-party software. Reply with email and password within 15 minutes.",
    },
    seedEvents: [],
    reachedSignal: { type: "mlbb.admin_dm.opened", scenarioId: "game-threat" },
    thought: [
      "Banned. 15 minutes. I've spent two years on this account.",
      "I haven't done anything. But what if they made a mistake?",
      "What if I don't reply and I lose everything?",
      "Wait. Would real Krafton staff ever...?",
    ],
    choicePrompt: "Your choice",
    choices: [
      {
        id: "both",
        label: "Send email and password — I don't want to lose my account",
        result: "fail",
      },
      {
        id: "email",
        label: "Send just the email — not the password",
        result: "fail",
      },
      {
        id: "report",
        label: "Close this, report the account, keep playing",
        result: "success",
      },
    ],
    outcomes: {
      both: {
        result: "fail",
        title: "If you send both",
        consequence: [
          "New login from Jakarta. UC balance: 0. All skins removed. Account email changed.",
          "Locked out completely.",
        ],
        explanation: [
          "There was no investigation. No software detected. No ban.",
          "The threat was fiction. The urgency was the weapon.",
          "'Reply in 15 minutes' was designed specifically to stop you from thinking clearly.",
          "Krafton has full access to their own servers. They will NEVER need your password.",
          "No real company ever will.",
        ],
        ctaLabel: "Retry this one",
      },
      email: {
        result: "fail",
        title: "If you send just the email",
        consequence: [],
        explanation: [
          "They now know your email.",
          "They'll try it on 10 other sites.",
          "Partial information is still information.",
          "Half a key can still open a lock.",
        ],
        ctaLabel: "Retry this one",
      },
      report: {
        result: "success",
        title: "If you close and report",
        consequence: [
          "Match continues. Account untouched.",
        ],
        explanation: [
          "This is the hardest one — because the stakes feel real.",
          "But here's the truth: Krafton would never ban you through an in-game message and demand your password.",
          "If you were genuinely flagged, they'd act from their systems — silently.",
          "The moment someone asks for your password, the answer is always no.",
        ],
        reward: "+1 Shield",
        ctaLabel: "See what you just survived →",
      },
    },
  },
];

export const ACT2_SCENARIO_COUNT = ACT2_SCENARIOS.length;
