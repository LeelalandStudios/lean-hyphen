/** Act 3 — Scenario 4: School email fake link (sch00l-portal.com). */

export const SCAM_EMAIL_SENDER = "Riverside Academy Fees";
export const SCAM_EMAIL_ADDRESS = "noreply@sch00l-portal.com";
export const REAL_EMAIL_SENDER = "Riverside Academy (official)";
export const REAL_EMAIL_ADDRESS = "fees@riverside-school.edu.in";

export const FAKE_DOMAIN = "sch00l-portal.com";
export const REAL_DOMAIN_HINT = "riverside-school.edu.in";

export const HOME_MAIL_NOTIFICATION = `URGENT: Term fee payment failed.
Update within 2 hours or enrollment hold.
→ ${FAKE_DOMAIN}/pay-fees`;

export const SCAM_EMAIL_SUBJECT = "URGENT — Fee payment failed (Action required)";
export const SCAM_EMAIL_BODY = `Dear Student,

Our records show your term fee payment did not go through.

Please update your payment details within 2 hours to avoid an enrollment hold.

Pay now: https://${FAKE_DOMAIN}/pay-fees

— Riverside Academy Finance Office`;

export const SCENARIO4_CHOICE_CONTEXT =
  "The email looks official. Look at the sender address — sch00l uses zeros instead of the letter o.";

export const SCENARIO4_CHOICES = [
  {
    id: "tap",
    label: "Tap Pay now — fees are urgent and I don't want a hold",
  },
  {
    id: "check",
    label: "Check the sender address and link carefully before doing anything",
  },
  {
    id: "forward",
    label: "Forward the whole email to the friends group so they see the warning",
  },
];

export const PATH_TAP_CAPTURED =
  "School portal login captured. A payment page copied your parent’s card details.";

export const OFFICIAL_COMPROMISE_EMAIL = {
  subject: "SECURITY ALERT — Student portal access compromised",
  body: `Dear Student,

Our IT team detected a login attempt on your Riverside Academy portal from an unrecognised device shortly after a payment link from an unofficial website (sch00l-portal.com — this is NOT our school domain).

Your account may have been compromised. Payment details entered on that fake site may also be at risk.

Do NOT use any fee links from earlier emails today.

Action required:
• Change your portal password immediately through the official school app only
• Tell your parents what happened
• Contact IT helpdesk: helpdesk@${REAL_DOMAIN_HINT}

— Riverside Academy IT Security`,
};

export const PATH_CHECK_DOMAIN_NOTE =
  "The domain uses zeros (00) instead of the letter o — sch00l-portal.com is NOT your real school site.";

// —— Group share by path ——

const SHARE_CHECK = `⚠️ Fake school fee email going around

Sender looked official but the domain was ${FAKE_DOMAIN} — zeros instead of "school". Real school uses ${REAL_DOMAIN_HINT}. I reported it as phishing. Always check the sender before you tap.`;

const SHARE_FORWARD = `⚠️ I forwarded a "school fees" email to the group earlier — that was a mistake

The link was fake (${FAKE_DOMAIN}). Don't click what I sent. Check sender addresses — zeros in the domain are a red flag.`;

/** @typedef {'tap'|'check'|'forward'} Scenario4Path */

export const GROUP_SHARE_BY_PATH = {
  tap: {
    shareLabel: "Share official school alert to friends group",
    sharePreview:
      "The real school just emailed you that your portal was compromised after the fake sch00l-portal link. Forward that official email so your friends see the real domain and the warning.",
    forwardedEmail: OFFICIAL_COMPROMISE_EMAIL,
    previewMessage: `↪ Forwarded from ${REAL_EMAIL_ADDRESS}\n\n${OFFICIAL_COMPROMISE_EMAIL.subject}\n\n${OFFICIAL_COMPROMISE_EMAIL.body}`,
    groupMessages: [
      {
        type: "text",
        sender: "You",
        text: "Guys — I clicked a fake fee link. The REAL school just emailed me this ↓",
        time: "7:04 PM",
        mine: true,
      },
      {
        type: "forwarded",
        sender: "You",
        body: `From: ${REAL_EMAIL_ADDRESS}\n\n${OFFICIAL_COMPROMISE_EMAIL.subject}\n\n${OFFICIAL_COMPROMISE_EMAIL.body}`,
        time: "7:04 PM",
      },
      {
        type: "text",
        sender: "Mei",
        text: "omg sch00l with zeros — that's how they got you",
        time: "7:05 PM",
      },
      { type: "text", sender: "Zack", text: "sharing this with my parents rn", time: "7:05 PM" },
      {
        type: "text",
        sender: "Priya",
        text: "Pay attention to: when something goes wrong, the real school writes from their real domain — like this one. Scammers use look-alike links (0 instead of o). If you need to warn friends, forward the official email or a screenshot — not the fake payment link.",
        time: "7:06 PM",
      },
    ],
  },
  check: {
    shareLabel: "Share to group — spotted the fake domain",
    sharePreview: "Tell the group how you caught sch00l-portal.com before paying.",
    previewMessage: SHARE_CHECK,
    groupMessages: [
      { type: "text", sender: "You", text: SHARE_CHECK, time: "7:05 PM", mine: true },
      { type: "text", sender: "Aryan", text: "good catch — I wouldn't have noticed the 00", time: "7:06 PM" },
      { type: "text", sender: "Zack", text: "forwarding this to my mom", time: "7:06 PM" },
      {
        type: "text",
        sender: "Priya",
        text: "Pay attention to: urgency + payment link + wrong domain = phishing. Zoom on the sender address before you tap. Real schools don’t threaten a 2-hour enrollment hold over email links.",
        time: "7:07 PM",
      },
    ],
  },
  forward: {
    shareLabel: "Share to group — warn them NOT to open what you forwarded",
    sharePreview: "You spread the scam email earlier — now warn everyone not to click.",
    previewMessage: SHARE_FORWARD,
    groupMessages: [
      { type: "text", sender: "You", text: SHARE_FORWARD, time: "7:05 PM", mine: true },
      { type: "text", sender: "Aryan", text: "bro I almost clicked it when you forwarded 😰", time: "7:05 PM" },
      { type: "text", sender: "Mei", text: "don't forward scam emails — screenshot the sender warning instead", time: "7:06 PM" },
      {
        type: "text",
        sender: "Priya",
        text: "Pay attention to: forwarding a phishing email spreads the trap. If you want to warn friends, send a screenshot with the fake domain circled — not the live link. Check sender addresses yourself before sharing.",
        time: "7:07 PM",
      },
    ],
  },
};
