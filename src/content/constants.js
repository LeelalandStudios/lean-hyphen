import {
  PHONEPE_SCAM_NOTIFICATION,
  PHONEPE_SCAM_SENDER,
} from "./scenario1.js";
import {
  HOME_OTP_NOTIFICATION,
  UNKNOWN_OTP_SENDER,
} from "./scenario2.js";
import { FRIEND_OTP_ARTICLE } from "./newsArticle.js";
import { HOME_RAFI_NOTIFICATION, RAFI_SCAM_NUMBER } from "./scenario3.js";
import { HOME_MAIL_NOTIFICATION } from "./scenario4.js";
import { HOME_MLBB_NOTIFICATION } from "./scenario5.js";

export const PAYTM_SENDER = "+91 91234 56789";
export const OTP_SCAM_SENDER = "+91 91234 56789";
export const WHATSAPP_OTP_SENDER = "+91 93333 22211";

export const PAYTM_NOTIFICATION_BODY = `🎉 You have won ₹3,000 Paytm cash!
Claim now or offer expires in 10 minutes! 
→ bit.ly/paytm-win-now`;

export const DELIVERY_NOTIFICATION_BODY = `Your package delivery failed.
Verify address in 10 minutes or order will be cancelled.
→ amaz0n-track-help.in`;

export const OTP_SMS_NOTIFICATION_BODY = `Your SIM will stop working in 30 mins. Share OTP to upgrade to 5G.
Telecom verification pending. OTP required.
Your OTP for login is 483921. DO NOT SHARE THIS CODE.`;

/** @typedef {'default'|'whatsapp_activity'|'paytm_notice'|'phonepe_notice'|'delivery_notice'|'otp_notice'|'otp_wrong_number'|'news_notification'|'whatsapp_rafi'|'mail_school_fee'|'mlbb_admin'} HomeVariant */

export const HOME_VARIANTS = {
  default: { badge: false, notification: null, notice: null },
  whatsapp_activity: {
    badge: true,
    badgeApp: "whatsapp",
    notification: {
      app: "💬 WhatsApp",
      from: "Aryan, Mei, Zack, Priya",
      body: "Zack: Woah!! Guys, I just won ₹5,000 Paytm cash!! Should I click it?",
    },
    notice: null,
  },
  paytm_notice: {
    badge: true,
    badgeApp: "messages",
    notification: {
      app: "📱 Messages",
      from: PAYTM_SENDER,
      body: PAYTM_NOTIFICATION_BODY,
    },
    notice: null,
  },
  phonepe_notice: {
    badge: true,
    badgeApp: "messages",
    notification: {
      app: "📱 Messages",
      from: PHONEPE_SCAM_SENDER,
      body: PHONEPE_SCAM_NOTIFICATION,
    },
    notice: null,
  },
  delivery_notice: {
    badge: true,
    badgeApp: "messages",
    notification: {
      app: "📱 Messages",
      from: "Delivery",
      body: DELIVERY_NOTIFICATION_BODY,
    },
    notice: null,
  },
  otp_notice: {
    badge: true,
    badgeApp: "messages",
    notification: {
      app: "📱 Messages",
      from: OTP_SCAM_SENDER,
      body: OTP_SMS_NOTIFICATION_BODY,
    },
    notice: null,
  },
  otp_wrong_number: {
    badge: true,
    badgeApp: "messages",
    notification: {
      app: "📱 Messages",
      from: UNKNOWN_OTP_SENDER,
      body: HOME_OTP_NOTIFICATION,
    },
    notice: null,
  },
  news_notification: {
    badge: false,
    notification: {
      app: "📰 Teen Wire",
      from: "Breaking · Digital safety",
      body: `New: ${FRIEND_OTP_ARTICLE.headline.slice(0, 52)}…`,
    },
    notice: null,
  },
  whatsapp_rafi: {
    badge: true,
    badgeApp: "whatsapp",
    notification: {
      app: "💬 WhatsApp",
      from: RAFI_SCAM_NUMBER,
      body: HOME_RAFI_NOTIFICATION,
    },
    notice: null,
  },
  mail_school_fee: {
    badge: false,
    notification: {
      app: "📧 Gmail",
      from: "Riverside Academy Fees",
      body: HOME_MAIL_NOTIFICATION,
    },
    notice: null,
  },
  mlbb_admin: {
    badge: false,
    notification: {
      app: "🎮 Mobile Legends",
      from: "System",
      body: HOME_MLBB_NOTIFICATION,
    },
    notice: null,
  },
};

/**
 * Simulation apps on the home screen (4-column grid).
 * @type {{ id: string, emoji: string, label: string }[]}
 */
export const HOME_APPS = [
  { id: "whatsapp", emoji: "💬", label: "WhatsApp" },
  { id: "messages", emoji: "🗨️", label: "Messages" },
  { id: "phonepe", emoji: "📱", label: "PhonePe" },
  { id: "amazon", emoji: "📦", label: "Amazon" },
  { id: "ludo", emoji: "🎲", label: "Ludo King" },
];

/**
 * Everything else — including apps used later in the sim (Chrome, Paytm, calls).
 * @type {{ id: string, emoji: string, label: string }[][]}
 */
export const DRAWER_APP_ROWS = [
  [
    { id: "phone", emoji: "📞", label: "Call log" },
    { id: "chrome", emoji: "🌐", label: "Chrome" },
    { id: "paytm", emoji: "💙", label: "Paytm" },
  ],
  [
    { id: "freefire", emoji: "🎮", label: "Free Fire" },
    { id: "camera", emoji: "📷", label: "Camera" },
    { id: "gallery", emoji: "🖼️", label: "Gallery" },
  ],
  [
    { id: "instagram", emoji: "📸", label: "Instagram" },
    { id: "youtube", emoji: "▶️", label: "YouTube" },
    { id: "spotify", emoji: "🎵", label: "Spotify" },
  ],
  [
    { id: "mail", emoji: "📧", label: "Gmail" },
    { id: "mlbb", emoji: "🎮", label: "MLBB" },
    { id: "news", emoji: "📰", label: "News" },
  ],
];

export const RED_FLAG_OPTIONS = [
  "Unknown number",
  "Shortened link",
  "Won without entering",
];

export const FAKE_LINKS_FIELDS = [
  "Phone number",
  "OTP",
  "UPI PIN",
  "Card details",
  "Login credentials",
];

export const INBOX_DECOY_THREADS = [
  { name: "Mom", preview: "Call me when free." },
  { name: "School Group", preview: "Homework reminder." },
];
