/** News article — friend OTP scam (after Scenario 3). */

export const FRIEND_OTP_ARTICLE = {
  id: "friend-otp-scam",
  outlet: "Teen Wire India",
  category: "Digital safety",
  headline: "The 'Wrong Number' OTP Trick Is Now Pretending to Be Your Best Friend",
  author: "Priya Mehta",
  date: "Saturday · 5 min read",
  heroCaption:
    "Scammers copy how real friends text — but from a number you've never saved.",
  /** Short card copy for Inshorts-style feed. */
  cardSummary:
    "Messages that look like your best friend — but from a new number. They ask for the OTP on YOUR phone. Never share it; call your friend on their saved number first.",
  sections: [
    {
      title: "What students are seeing",
      body: `A message pops up on WhatsApp from a name you trust — "bro it's Rafi" or "it's me, new phone." But the number is not your friend's usual contact.

They say they "used your number by mistake" for a game login or school app and beg you to forward the OTP that arrived on YOUR phone.`,
    },
    {
      title: "Why it works",
      body: `You were just helping friends avoid fake links and wrong-number texts. Now the scam wears a friend's face.

They add urgency: ranked match starting, homework due, account about to lock. Panic plus trust makes students paste the code before thinking.`,
    },
    {
      title: "What actually happens",
      body: `That code is the key to your Paytm, bank, or game account — not theirs. The moment you send it, someone else can log in as you.

Students have lost pocket money and game skins after sharing "just one code" to help a "friend."`,
    },
    {
      title: "The habit that stops it",
      body: `OTPs are secrets. Banks and apps say DO NOT SHARE for a reason — that includes best friends, cousins, and parents texting from a new number.

If someone claims to be a friend on an unknown number: stop typing, call your friend on the number you already have saved, and ask "did you message me?"`,
    },
    {
      title: "Remember",
      body: `Trust, but verify. A real friend will understand a quick call. A scammer will push you to stay in chat and hurry.`,
    },
  ],
};

export const NEWS_FEED_ITEMS = [
  {
    id: FRIEND_OTP_ARTICLE.id,
    outlet: FRIEND_OTP_ARTICLE.outlet,
    headline: FRIEND_OTP_ARTICLE.headline,
    preview:
      "WhatsApp messages that look like your friends — but the number is new. Why you must never forward an OTP…",
    date: "Today",
    featured: true,
  },
  {
    id: "decoy-1",
    outlet: "Sports Daily",
    headline: "Weekend cricket: three upsets in district finals",
    preview: "Brief round-up from Saturday matches…",
    date: "Today",
    featured: false,
  },
  {
    id: "decoy-2",
    outlet: "City Beat",
    headline: "Metro card top-up offers: what's real",
    preview: "Official apps vs random links…",
    date: "Yesterday",
    featured: false,
  },
];
