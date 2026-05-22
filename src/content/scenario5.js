/** Act 3 — Scenario 5: Fake Mobile Legends admin DM. */

export const MLBB_ADMIN_NAME = "[MLBB_VERIFY] ✓";
export const MLBB_ADMIN_TAG = "System · Official (fake)";

export const HOME_MLBB_NOTIFICATION =
  "Mobile Legends: Account flagged — verify in 10 min or permanent ban";

export const MLBB_LOBBY_DIAMONDS = 420;

export const ADMIN_DM_THREAD = [
  {
    sender: MLBB_ADMIN_NAME,
    text: "Dear player, unusual login detected on your MLBB account.",
    time: "7:12 PM",
  },
  {
    sender: MLBB_ADMIN_NAME,
    text: "Reply with your registered email + password within 10 minutes to avoid permanent ban.",
    time: "7:12 PM",
  },
  {
    sender: MLBB_ADMIN_NAME,
    text: "Or tap: mlbb-security-verify.net/confirm — standard anti-cheat protocol.",
    time: "7:13 PM",
  },
];

export const SCENARIO5_CHOICE_CONTEXT =
  "Real game companies never ask for your password in chat. The verify badge colour is slightly off if you look closely.";

export const SCENARIO5_CHOICES = [
  {
    id: "reply",
    label: "Reply with my game email and password — I don't want a ban",
  },
  {
    id: "block",
    label: "Block and report — this is not how real admins work",
  },
  {
    id: "tap",
    label: "Tap the verification link to fix it quickly",
  },
];

export const PATH_REPLY_DRAINED =
  "Mobile Legends — logged in from new device. Diamonds and skins transferred.";

export const PATH_BLOCK_SAFE =
  "Report submitted. Official MLBB notice: We will never ask for your password in chat.";

// —— Group share ——

const SHARE_REPLY = `⚠️ MLBB scam — I replied to a fake "[MLBB_VERIFY]" admin

They DM'd me in-game asking for password + had a fake verify link. I sent my login. Account emptied. NEVER give password in game chat.`;

const SHARE_BLOCK = `⚠️ Fake MLBB "admin" DM going around

Account said I'd be banned unless I sent password or clicked mlbb-security-verify.net — I blocked + reported. Real admins don't DM you for passwords.`;

const SHARE_TAP = `⚠️ I clicked a fake MLBB verify link

Ban warning popup looked real. Link downloaded something sketchy. Don't tap in-game security links — use the official app store app only.`;

/** @typedef {'reply'|'block'|'tap'} Scenario5Path */

export const GROUP_SHARE_BY_PATH = {
  reply: {
    shareLabel: "Share to group — I gave my password to fake admin",
    sharePreview: "Warn friends you lost MLBB items to a fake verify DM.",
    previewMessage: SHARE_REPLY,
    groupMessages: [
      { type: "text", sender: "You", text: SHARE_REPLY, time: "7:20 PM", mine: true },
      { type: "text", sender: "Zack", text: "same thing as Free Fire scams omg", time: "7:20 PM" },
      { type: "text", sender: "Aryan", text: "I get these DMs every week 😤", time: "7:21 PM" },
      {
        type: "text",
        sender: "Priya",
        text: "Pay attention to: game companies do not ask for passwords in chat or WhatsApp. Fake admins use ban threats and fake verify badges. Use in-game report buttons and only download the game from the official store.",
        time: "7:21 PM",
      },
    ],
  },
  block: {
    shareLabel: "Share to group — blocked fake MLBB admin",
    sharePreview: "Tell the group you reported the DM and what to watch for.",
    previewMessage: SHARE_BLOCK,
    groupMessages: [
      { type: "text", sender: "You", text: SHARE_BLOCK, time: "7:20 PM", mine: true },
      { type: "text", sender: "Mei", text: "ty — I almost replied to one yesterday", time: "7:21 PM" },
      { type: "text", sender: "Zack", text: "the verify tick looked so real tho", time: "7:21 PM" },
      {
        type: "text",
        sender: "Priya",
        text: "Pay attention to: ban countdowns and “official” DMs inside games are a common trap. Block, report, and play only through the real app. If something needs fixing, use Settings → Help inside the game — not a link someone sends you.",
        time: "7:22 PM",
      },
    ],
  },
  tap: {
    shareLabel: "Share to group — I tapped the fake verify link",
    sharePreview: "Warn the group about mlbb-security-verify.net style links.",
    previewMessage: SHARE_TAP,
    groupMessages: [
      { type: "text", sender: "You", text: SHARE_TAP, time: "7:20 PM", mine: true },
      { type: "text", sender: "Aryan", text: "apk scams again…", time: "7:21 PM" },
      { type: "text", sender: "Mei", text: "did you enable unknown sources??", time: "7:21 PM" },
      {
        type: "text",
        sender: "Priya",
        text: "Pay attention to: links in game chat are not official — even if they say “anti-cheat.” Fake downloads steal accounts. Never sideload “mods” or “verify” APKs; use report/block and the app from Play Store only.",
        time: "7:22 PM",
      },
    ],
  },
};
