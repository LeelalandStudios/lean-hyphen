import act1HookRaw from "./chats/act1-hook.yaml?raw";
import demoHookRaw from "./chats/demo-hook.yaml?raw";
import act3OutroRaw from "./chats/act3-outro.yaml?raw";
import act4GroupWrapRaw from "./chats/act4-group-wrap.yaml?raw";
import { parseChatFile } from "../chat/parseChatFile.js";

/**
 * Bundled chat definitions keyed by registry id.
 * Add new YAML files under src/content/chats/ and register them here.
 */
export const CHAT_DEFINITIONS = {
  "act1-hook": parseChatFile(act1HookRaw, { source: "act1-hook.yaml" }),
  "demo-hook": parseChatFile(demoHookRaw, { source: "demo-hook.yaml" }),
  "act3-outro": parseChatFile(act3OutroRaw, { source: "act3-outro.yaml" }),
  "act4-group-wrap": parseChatFile(act4GroupWrapRaw, { source: "act4-group-wrap.yaml" }),
};

/** @type {{ id: string, label: string, description: string }[]} */
export const CHAT_CATALOG = [
  {
    id: "act1-hook",
    label: "Act 1 — Squad Goals hook (full chat)",
    description:
      "Full Act 1 WhatsApp sequence: Kabir tells Rohan's PhonePe scam story through to Priya's offer to teach.",
  },
  {
    id: "demo-hook",
    label: "Demo — beat types sampler",
    description:
      "Short sample with messages, typing, pause, read receipts, forwarded, divider, and link beats.",
  },
  {
    id: "act3-outro",
    label: "Act 3 — Outro (Urgency)",
    description: "Urgency chat sequence at the end of Act 3.",
  },
  {
    id: "act4-group-wrap",
    label: "Act 4 — Group Wrap",
    description: "Squad Goals wrap up chat at the end of Act 4.",
  },
];

export const DEFAULT_CHAT_ID = "act1-hook";

/**
 * @param {string|null|undefined} chatId
 * @returns {import("../chat/chatSchema.js").ChatDefinition}
 */
export function getChatDefinition(chatId) {
  const id = chatId && CHAT_DEFINITIONS[chatId] ? chatId : DEFAULT_CHAT_ID;
  return CHAT_DEFINITIONS[id];
}
