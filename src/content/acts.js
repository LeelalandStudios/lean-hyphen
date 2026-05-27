/** Act metadata for the lesson web app sidebar. */

export const ACTS = [
  {
    id: "act1",
    number: 1,
    title: "Act 1",
    subtitle: "Story & setup",
    summary:
      "Meet the friends group on WhatsApp. Zack shares a Paytm cash scam; Priya warns the group and shares the SPOT THE SCAM! infographic.",
    beats: [
      "Lock screen → home → explore the phone",
      "Friends group chat — Paytm scam arrives",
      "Priya shares the infographic; save it to your phone",
    ],
  },
  {
    id: "act2",
    number: 2,
    title: "Act 2",
    subtitle: "Phone simulation",
    summary:
      "Use the Phone Explorer to live through five scam scenarios: PhonePe links, wrong-number OTPs, fake friends, school email, and fake game admins.",
    beats: [
      "Scenario 1 — PhonePe cashback trap",
      "Scenario 2 — Wrong-number OTP",
      "Scenario 3 — Fake friend (Rafi) + Free Fire",
      "Scenario 4 — School email fake link",
      "Scenario 5 — Fake MLBB admin",
    ],
  },
  {
    id: "act3",
    number: 3,
    title: "Act 3",
    subtitle: "Infographics",
    summary:
      "A kid-friendly infographic: Fake Links, OTP Scams, and Gaming Scams — how they work, red flags, and what to do.",
    beats: [
      "Fake Links — Looks real, isn’t real",
      "OTP Scams — Never share the code",
      "Gaming Scams — Free skins are bait",
    ],
  },
  {
    id: "act4",
    number: 4,
    title: "Act 4",
    subtitle: "Spot the Issue",
    summary:
      "Priya shares leelaland.app/spot-the-scam in the group. Tap the red flags in three rounds: fake email, OTP SMS, and fake game admin.",
    beats: [
      "Open the challenge from WhatsApp",
      "Round 1 — fake school email",
      "Round 2 — OTP SMS",
      "Round 3 — fake game admin",
      "Return to the group — Priya concludes",
    ],
    comingSoon: true,
  },
];

export const DEFAULT_ACT_ID = "act1";
