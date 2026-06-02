import YAML from "yaml";
import { normalizeChatDefinition } from "./normalizeChatDefinition.js";

/** @typedef {import("./chatSchema.js").ChatDefinition} ChatDefinition */

/**
 * @param {string} raw
 * @returns {{ yamlText: string, format: 'yaml' | 'markdown' }}
 */
function extractYamlText(raw) {
  const trimmed = raw.replace(/^\uFEFF/, "").trim();
  if (!trimmed.startsWith("---")) {
    return { yamlText: trimmed, format: "yaml" };
  }

  const end = trimmed.indexOf("\n---", 3);
  if (end === -1) {
    return { yamlText: trimmed, format: "yaml" };
  }

  return {
    yamlText: trimmed.slice(4, end).trim(),
    format: "markdown",
  };
}

/**
 * Parse a YAML (or Markdown-frontmatter) chat file into a normalized definition.
 * @param {string} raw
 * @param {{ source?: string }} [meta]
 * @returns {ChatDefinition}
 */
export function parseChatFile(raw, meta = {}) {
  const { yamlText, format } = extractYamlText(raw);

  let parsed;
  try {
    parsed = YAML.parse(yamlText);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Could not parse ${format === "markdown" ? "Markdown frontmatter" : "YAML"}${meta.source ? ` in ${meta.source}` : ""}: ${detail}`
    );
  }

  if (parsed == null) {
    throw new Error(
      `Chat file${meta.source ? ` (${meta.source})` : ""} is empty`
    );
  }

  return normalizeChatDefinition(parsed, meta);
}

/**
 * @param {string} raw
 * @param {{ source?: string }} [meta]
 * @returns {{ definition: ChatDefinition | null, errors: string[] }}
 */
export function tryParseChatFile(raw, meta = {}) {
  try {
    return { definition: parseChatFile(raw, meta), errors: [] };
  } catch (error) {
    return {
      definition: null,
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}
