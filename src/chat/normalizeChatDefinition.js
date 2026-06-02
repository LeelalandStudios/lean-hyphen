import {
  BEAT_TYPES,
  CHAT_TYPES,
  DEFAULT_HEADER,
  DEFAULT_SENDER_COLOR,
  DEFAULT_SETTINGS,
} from "./chatSchema.js";

/** @typedef {import("./chatSchema.js").ChatDefinition} ChatDefinition */

const BEAT_TYPE_ALIASES = {
  text: "message",
  game_link: "link",
};

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @param {string} field
 * @param {number} index
 * @returns {number|undefined}
 */
function parseDelay(value, field, index) {
  if (value == null) return undefined;
  if (value === "auto") return "auto";
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) {
    throw new Error(`beats[${index}].${field} must be a non-negative number or "auto"`);
  }
  return num;
}

/**
 * @param {unknown} raw
 * @param {number} index
 * @param {Record<string, import("./chatSchema.js").ChatSender>} senders
 * @param {string} [defaultTime]
 */
function normalizeBeat(raw, index, senders, defaultTime) {
  if (!isObject(raw)) {
    throw new Error(`beats[${index}] must be an object`);
  }

  let type = String(raw.type ?? "message");
  type = BEAT_TYPE_ALIASES[type] ?? type;

  if (!BEAT_TYPES.includes(type)) {
    throw new Error(
      `beats[${index}].type "${raw.type}" is unknown. Supported: ${BEAT_TYPES.join(", ")}`
    );
  }

  const resolveSender = (sender) => {
    if (sender == null || sender === "") {
      throw new Error(`beats[${index}] requires a sender`);
    }
    const name = String(sender);
    if (!senders[name]) {
      throw new Error(`beats[${index}] references unknown sender "${name}"`);
    }
    return name;
  };

  const resolveTime = (time) => {
    if (time != null && time !== "") return String(time);
    return defaultTime;
  };

  const resolveMine = (sender, mine) => {
    if (typeof mine === "boolean") return mine;
    return Boolean(senders[sender]?.mine);
  };

  switch (type) {
    case "message": {
      const sender = resolveSender(raw.sender);
      const text = raw.text;
      if (text == null || String(text).trim() === "") {
        throw new Error(`beats[${index}] message requires non-empty text`);
      }
      return {
        type: "message",
        sender,
        text: String(text),
        time: resolveTime(raw.time),
        mine: resolveMine(sender, raw.mine),
        delayBeforeMs: parseDelay(raw.delayBeforeMs, "delayBeforeMs", index),
        delayAfterMs: parseDelay(raw.delayAfterMs, "delayAfterMs", index),
        receipts: Boolean(raw.receipts),
      };
    }
    case "typing": {
      const durationMs = Number(raw.durationMs ?? raw.ms ?? undefined);
      if (!Number.isFinite(durationMs) || durationMs < 0) {
        throw new Error(`beats[${index}] typing requires durationMs (or ms) >= 0`);
      }
      const beat = { type: "typing", durationMs };
      if (raw.sender != null && raw.sender !== "") {
        beat.sender = resolveSender(raw.sender);
      }
      return beat;
    }
    case "pause": {
      const durationMs = Number(raw.durationMs ?? raw.ms ?? undefined);
      if (!Number.isFinite(durationMs) || durationMs < 0) {
        throw new Error(`beats[${index}] pause requires durationMs (or ms) >= 0`);
      }
      return { type: "pause", durationMs };
    }
    case "readReceipts":
      return {
        type: "readReceipts",
        ...(raw.target != null && raw.target !== "" ? { target: String(raw.target) } : {}),
      };
    case "divider": {
      const label = raw.label;
      if (label == null || String(label).trim() === "") {
        throw new Error(`beats[${index}] divider requires a label`);
      }
      return { type: "divider", label: String(label) };
    }
    case "forwarded": {
      const sender = resolveSender(raw.sender);
      const body = raw.body ?? raw.text;
      if (body == null || String(body).trim() === "") {
        throw new Error(`beats[${index}] forwarded requires body text`);
      }
      return {
        type: "forwarded",
        sender,
        body: String(body),
        time: resolveTime(raw.time),
        mine: resolveMine(sender, raw.mine),
        ...(raw.from != null && raw.from !== "" ? { from: String(raw.from) } : {}),
      };
    }
    case "infographic": {
      const sender = resolveSender(raw.sender);
      return {
        type: "infographic",
        sender,
        time: resolveTime(raw.time),
        mine: resolveMine(sender, raw.mine),
        ...(raw.src != null ? { src: String(raw.src) } : {}),
        ...(raw.filename != null ? { filename: String(raw.filename) } : {}),
        ...(raw.caption != null ? { caption: String(raw.caption) } : {}),
      };
    }
    case "link": {
      const sender = resolveSender(raw.sender);
      const title = raw.title;
      const url = raw.url;
      if (title == null || String(title).trim() === "") {
        throw new Error(`beats[${index}] link requires title`);
      }
      if (url == null || String(url).trim() === "") {
        throw new Error(`beats[${index}] link requires url`);
      }
      return {
        type: "link",
        sender,
        title: String(title),
        url: String(url),
        time: resolveTime(raw.time),
        mine: resolveMine(sender, raw.mine),
        ...(raw.caption != null ? { caption: String(raw.caption) } : {}),
      };
    }
    case "choice": {
      const prompt = raw.prompt;
      if (prompt == null || String(prompt).trim() === "") {
        throw new Error(`beats[${index}] choice requires prompt`);
      }
      if (!Array.isArray(raw.options) || raw.options.length === 0) {
        throw new Error(`beats[${index}] choice requires at least one option`);
      }
      const options = raw.options.map((opt, optIndex) => {
        if (!isObject(opt)) {
          throw new Error(`beats[${index}].options[${optIndex}] must be an object`);
        }
        const id = opt.id != null ? String(opt.id) : String(opt.label ?? optIndex);
        const label = opt.label ?? opt.id;
        if (label == null || String(label).trim() === "") {
          throw new Error(`beats[${index}].options[${optIndex}] requires label`);
        }
        return { id, label: String(label) };
      });
      return { type: "choice", prompt: String(prompt), options };
    }
    default:
      throw new Error(`beats[${index}] has unsupported type "${type}"`);
  }
}

/**
 * @param {Record<string, unknown>} rawSenders
 */
function normalizeSenders(rawSenders) {
  if (!isObject(rawSenders)) return {};

  /** @type {Record<string, import("./chatSchema.js").ChatSender>} */
  const senders = {};
  for (const [name, value] of Object.entries(rawSenders)) {
    if (!isObject(value)) {
      senders[name] = { color: DEFAULT_SENDER_COLOR };
      continue;
    }
    senders[name] = {
      ...(value.color != null ? { color: String(value.color) } : {}),
      ...(value.avatar != null ? { avatar: String(value.avatar) } : {}),
      ...(typeof value.mine === "boolean" ? { mine: value.mine } : {}),
    };
    if (!senders[name].color) senders[name].color = DEFAULT_SENDER_COLOR;
  }
  return senders;
}

/**
 * @param {unknown} raw
 * @param {{ source?: string }} [meta]
 * @returns {ChatDefinition}
 */
export function normalizeChatDefinition(raw, meta = {}) {
  if (!isObject(raw)) {
    throw new Error(
      `Chat file${meta.source ? ` (${meta.source})` : ""} must be a YAML object at the root`
    );
  }

  const id = raw.id != null ? String(raw.id) : "unnamed-chat";
  const type = raw.type != null ? String(raw.type) : "whatsapp-chat";
  if (!CHAT_TYPES.includes(type)) {
    throw new Error(
      `type "${type}" is unsupported. Supported chat types: ${CHAT_TYPES.join(", ")}`
    );
  }

  if (!isObject(raw.header)) {
    throw new Error("header is required");
  }
  const title = raw.header.title;
  if (title == null || String(title).trim() === "") {
    throw new Error("header.title is required");
  }

  /** @type {import("./chatSchema.js").ChatHeader} */
  const header = {
    ...DEFAULT_HEADER,
    title: String(title),
    ...(raw.header.subtitle != null ? { subtitle: String(raw.header.subtitle) } : {}),
    ...(raw.header.currentTime != null
      ? { currentTime: String(raw.header.currentTime) }
      : {}),
    ...(typeof raw.header.showBack === "boolean" ? { showBack: raw.header.showBack } : {}),
    ...(typeof raw.header.showMenu === "boolean" ? { showMenu: raw.header.showMenu } : {}),
  };

  const settingsRaw = isObject(raw.settings) ? raw.settings : {};
  const defaultTime =
    settingsRaw.defaultTime != null
      ? String(settingsRaw.defaultTime)
      : header.currentTime;

  /** @type {import("./chatSchema.js").ChatSettings} */
  const settings = {
    ...DEFAULT_SETTINGS,
    ...(typeof settingsRaw.autoStart === "boolean"
      ? { autoStart: settingsRaw.autoStart }
      : {}),
    ...(typeof settingsRaw.autoScroll === "boolean"
      ? { autoScroll: settingsRaw.autoScroll }
      : {}),
    ...(typeof settingsRaw.fastForward === "boolean"
      ? { fastForward: settingsRaw.fastForward }
      : {}),
    ...(settingsRaw.defaultMessageDelayMs != null
      ? {
          defaultMessageDelayMs: parseDelay(
            settingsRaw.defaultMessageDelayMs,
            "defaultMessageDelayMs",
            -1
          ) ?? "auto",
        }
      : {}),
    ...(settingsRaw.defaultTypingMs != null
      ? { defaultTypingMs: Number(settingsRaw.defaultTypingMs) }
      : {}),
    ...(defaultTime != null ? { defaultTime } : {}),
    ...(typeof settingsRaw.encryptedNotice === "boolean"
      ? { encryptedNotice: settingsRaw.encryptedNotice }
      : {}),
    ...(typeof settingsRaw.inputBar === "boolean"
      ? { inputBar: settingsRaw.inputBar }
      : {}),
  };

  const senders = normalizeSenders(raw.senders);
  if (!Array.isArray(raw.beats)) {
    throw new Error("beats must be an array");
  }

  const beats = raw.beats.map((beat, index) =>
    normalizeBeat(beat, index, senders, settings.defaultTime)
  );

  return { id, type, header, settings, senders, beats };
}
