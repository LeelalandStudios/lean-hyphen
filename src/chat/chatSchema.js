/** @typedef {'whatsapp-chat'} ChatType */

/**
 * @typedef {Object} ChatHeader
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} [currentTime]
 * @property {boolean} [showBack]
 * @property {boolean} [showMenu]
 */

/**
 * @typedef {Object} ChatSettings
 * @property {boolean} autoStart
 * @property {boolean} autoScroll
 * @property {boolean} fastForward
 * @property {number|'auto'} defaultMessageDelayMs
 * @property {number} defaultTypingMs
 * @property {string} [defaultTime]
 * @property {boolean} encryptedNotice
 * @property {boolean} inputBar
 */

/**
 * @typedef {Object} ChatSender
 * @property {string} [color]
 * @property {string} [avatar]
 * @property {boolean} [mine]
 */

/**
 * @typedef {Object} MessageBeat
 * @property {'message'} type
 * @property {string} sender
 * @property {string} text
 * @property {string} [time]
 * @property {boolean} [mine]
 * @property {number} [delayBeforeMs]
 * @property {number|'auto'} [delayAfterMs]
 * @property {boolean} [receipts]
 */

/**
 * @typedef {Object} TypingBeat
 * @property {'typing'} type
 * @property {string} [sender]
 * @property {number} durationMs
 */

/**
 * @typedef {Object} PauseBeat
 * @property {'pause'} type
 * @property {number} durationMs
 */

/**
 * @typedef {Object} ReadReceiptsBeat
 * @property {'readReceipts'} type
 * @property {string} [target]
 */

/**
 * @typedef {Object} DividerBeat
 * @property {'divider'} type
 * @property {string} label
 */

/**
 * @typedef {Object} ForwardedBeat
 * @property {'forwarded'} type
 * @property {string} sender
 * @property {string} [from]
 * @property {string} body
 * @property {string} [time]
 * @property {boolean} [mine]
 */

/**
 * @typedef {Object} InfographicBeat
 * @property {'infographic'} type
 * @property {string} sender
 * @property {string} [src]
 * @property {string} [filename]
 * @property {string} [caption]
 * @property {string} [time]
 * @property {boolean} [mine]
 */

/**
 * @typedef {Object} LinkBeat
 * @property {'link'} type
 * @property {string} sender
 * @property {string} title
 * @property {string} url
 * @property {string} [caption]
 * @property {string} [time]
 * @property {boolean} [mine]
 */

/**
 * @typedef {Object} ChoiceBeat
 * @property {'choice'} type
 * @property {string} prompt
 * @property {{ id: string, label: string }[]} options
 */

/** @typedef {MessageBeat | TypingBeat | PauseBeat | ReadReceiptsBeat | DividerBeat | ForwardedBeat | InfographicBeat | LinkBeat | ChoiceBeat} ChatBeat */

/**
 * @typedef {Object} ChatDefinition
 * @property {string} id
 * @property {ChatType} type
 * @property {ChatHeader} header
 * @property {ChatSettings} settings
 * @property {Record<string, ChatSender>} senders
 * @property {ChatBeat[]} beats
 */

export const CHAT_TYPES = ["whatsapp-chat"];

export const BEAT_TYPES = [
  "message",
  "typing",
  "pause",
  "readReceipts",
  "divider",
  "forwarded",
  "infographic",
  "link",
  "choice",
];

/** Beat types that render as visible bubbles in the thread. */
export const RENDERABLE_BEAT_TYPES = new Set([
  "message",
  "divider",
  "forwarded",
  "infographic",
  "link",
]);

export const DEFAULT_SETTINGS = {
  autoStart: true,
  autoScroll: true,
  fastForward: true,
  defaultMessageDelayMs: "auto",
  defaultTypingMs: 1200,
  defaultTime: undefined,
  encryptedNotice: true,
  inputBar: true,
};

export const DEFAULT_HEADER = {
  title: "",
  subtitle: undefined,
  currentTime: undefined,
  showBack: false,
  showMenu: true,
};

export const DEFAULT_SENDER_COLOR = "#e542a3";
