/**
 * Parse game.script.md into a node graph.
 *
 * Format: see src/engine/script-format.md
 */

const NODE_HEADING = /^##\s+([a-zA-Z0-9_-]+)\s*$/gm;

/**
 * @typedef {object} ScriptOption
 * @property {string} [id]
 * @property {string} label
 * @property {string} goto
 * @property {Record<string, string>} [set]
 */

/**
 * @typedef {object} ScriptNodeBase
 * @property {string} id
 */

/**
 * @typedef {ScriptNodeBase & { type: 'screen', screen: string, props?: Record<string, unknown>, advance?: 'tap' | 'continue' | 'auto' | 'choice', goto?: string }} ScreenNode
 */

/**
 * @typedef {ScriptNodeBase & { type: 'wait', ms: number, goto: string }} WaitNode
 */

/**
 * @typedef {ScriptNodeBase & { type: 'choice', screen?: string, prompt?: string, options: ScriptOption[] }} ChoiceNode
 */

/**
 * @typedef {ScriptNodeBase & { type: 'set', vars: Record<string, string>, goto: string }} SetNode
 */

/**
 * @typedef {ScriptNodeBase & { type: 'if', when: string, goto: string, else?: string }} IfNode
 */

/** @typedef {ScreenNode | WaitNode | ChoiceNode | SetNode | IfNode} ScriptNode */

/**
 * @typedef {object} ParsedScript
 * @property {string} start
 * @property {Record<string, ScriptNode>} nodes
 */

function parseFrontmatter(lines) {
  let start = "lock";
  const trimmed = lines.map((line) => line.trim());
  const open = trimmed.findIndex((line) => line === "---");
  if (open === -1) return { start, rest: lines };

  const end = trimmed.findIndex((line, index) => index > open && line === "---");
  if (end === -1) return { start, rest: lines };

  for (let i = open + 1; i < end; i++) {
    const match = lines[i].match(/^start:\s*(.+)$/);
    if (match) start = match[1].trim();
  }

  return { start, rest: lines.slice(end + 1) };
}

function parseScalarValue(raw) {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+$/.test(value)) return Number(value);
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseInlineMap(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * @param {string} markdown
 * @returns {ParsedScript}
 */
export function parseScript(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const { start, rest } = parseFrontmatter(lines);
  const body = rest.join("\n");

  /** @type {Record<string, ScriptNode>} */
  const nodes = {};
  const headings = [...body.matchAll(NODE_HEADING)];

  for (let h = 0; h < headings.length; h++) {
    const id = headings[h][1];
    const chunkStart = headings[h].index + headings[h][0].length;
    const chunkEnd = headings[h + 1]?.index ?? body.length;
    const chunk = body.slice(chunkStart, chunkEnd);
    const chunkLines = chunk.trim().split("\n");
    /** @type {Record<string, unknown>} */
    const fields = {};
    /** @type {ScriptOption[]} */
    const options = [];
    /** @type {Record<string, string>} */
    let optionSet = null;
    /** @type {ScriptOption | null} */
    let currentOption = null;
    let inOptions = false;
    let inProps = false;
    let inOptionSet = false;

    for (let i = 0; i < chunkLines.length; i++) {
      const line = chunkLines[i];
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      if (inOptionSet) {
        const setMatch = line.match(/^\s{4,}([a-zA-Z0-9_]+):\s*(.+)$/);
        if (setMatch && currentOption) {
          currentOption.set ??= {};
          currentOption.set[setMatch[1]] = parseScalarValue(setMatch[2]);
          continue;
        }
        inOptionSet = false;
      }

      if (inProps) {
        const propMatch = line.match(/^\s{2,}([a-zA-Z0-9_]+):\s*(.+)$/);
        if (propMatch) {
          fields.props ??= {};
          fields.props[propMatch[1]] = parseScalarValue(propMatch[2]);
          continue;
        }
        inProps = false;
      }

      if (inOptions) {
        const optionStart = line.match(/^\s*-\s*(.+)$/);
        if (optionStart) {
          currentOption = { label: "", goto: "" };
          options.push(currentOption);
          const restOfLine = optionStart[1].trim();
          const inline = restOfLine.match(/^([^:]+):\s*(.+)$/);
          if (inline) {
            applyOptionField(currentOption, inline[1], inline[2]);
          } else {
            currentOption.label = parseScalarValue(restOfLine);
          }
          continue;
        }

        const optionField = line.match(/^\s{2,}([a-zA-Z0-9_]+):\s*(.*)$/);
        if (optionField && currentOption) {
          if (optionField[1] === "set") {
            inOptionSet = true;
            currentOption.set = {};
            continue;
          }
          applyOptionField(currentOption, optionField[1], optionField[2]);
          continue;
        }

        inOptions = false;
      }

      if (trimmed === "options:") {
        inOptions = true;
        continue;
      }

      if (trimmed === "props:") {
        inProps = true;
        fields.props ??= {};
        continue;
      }

      if (trimmed.startsWith("screen:")) {
        const screenId = trimmed.slice("screen:".length).trim();
        if (screenId) fields.screen = parseScalarValue(screenId);
        continue;
      }

      const kv = trimmed.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
      if (!kv) continue;

      const key = kv[1];
      const value = kv[2];

      if (key === "props" && value) {
        const parsed = parseInlineMap(value);
        if (parsed) fields.props = parsed;
        continue;
      }

      if (key === "set" && value) {
        const parsed = parseInlineMap(value);
        if (parsed) fields.vars = parsed;
        continue;
      }

      fields[key] = value ? parseScalarValue(value) : true;
    }

    /** @type {ScriptNode} */
    const node = buildNode(id, fields, options);
    nodes[id] = node;
  }

  if (!nodes[start]) {
    throw new Error(`Script start node "${start}" was not found.`);
  }

  return { start, nodes };
}

/**
 * @param {ScriptOption} option
 * @param {string} key
 * @param {string} raw
 */
function applyOptionField(option, key, raw) {
  if (key === "label") option.label = String(parseScalarValue(raw));
  else if (key === "goto") option.goto = String(parseScalarValue(raw));
  else if (key === "id") option.id = String(parseScalarValue(raw));
  else if (key === "set") option.set = parseInlineMap(raw) ?? {};
}

/**
 * @param {string} id
 * @param {Record<string, unknown>} fields
 * @param {ScriptOption[]} options
 * @returns {ScriptNode}
 */
function buildNode(id, fields, options) {
  const explicitType = fields.type ? String(fields.type) : null;

  if (explicitType === "choice" || options.length > 0) {
    return {
      id,
      type: "choice",
      screen: fields.screen ? String(fields.screen) : undefined,
      prompt: fields.prompt ? String(fields.prompt) : undefined,
      options,
    };
  }

  if (explicitType === "wait" || typeof fields.wait === "number") {
    return {
      id,
      type: "wait",
      ms: Number(fields.wait ?? fields.ms ?? 1000),
      goto: String(fields.goto ?? ""),
    };
  }

  if (explicitType === "set" || fields.vars) {
    return {
      id,
      type: "set",
      vars: /** @type {Record<string, string>} */ (fields.vars ?? {}),
      goto: String(fields.goto ?? ""),
    };
  }

  if (explicitType === "if" || fields.when) {
    return {
      id,
      type: "if",
      when: String(fields.when ?? ""),
      goto: String(fields.goto ?? ""),
      else: fields.else ? String(fields.else) : undefined,
    };
  }

  const goto = fields.goto ? String(fields.goto) : undefined;
  const advanceField = fields.advance ? String(fields.advance) : null;

  return {
    id,
    type: "screen",
    screen: String(fields.screen ?? id),
    props: fields.props ? /** @type {Record<string, unknown>} */ (fields.props) : undefined,
    advance: goto
      ? /** @type {'tap' | 'continue' | 'auto' | 'choice'} */ (
          advanceField ?? "continue"
        )
      : advanceField
        ? /** @type {'tap' | 'continue' | 'auto' | 'choice'} */ (advanceField)
        : undefined,
    goto,
  };
}

/**
 * @param {ParsedScript} script
 * @returns {string[]}
 */
export function validateScript(script) {
  const errors = [];

  for (const node of Object.values(script.nodes)) {
    if (node.type === "screen" && node.goto && node.advance === "choice") {
      const next = script.nodes[node.goto];
      if (!next || next.type !== "choice") {
        errors.push(
          `Node "${node.id}" uses advance: choice but "${node.goto}" is not a choice node.`
        );
      }
    }

    if (node.type === "wait" && !node.goto) {
      errors.push(`Wait node "${node.id}" is missing goto.`);
    }

    if (node.type === "choice") {
      for (const option of node.options) {
        if (!option.label) errors.push(`Choice in "${node.id}" has an option without label.`);
        if (!option.goto) errors.push(`Choice in "${node.id}" has an option without goto.`);
        else if (!script.nodes[option.goto]) {
          errors.push(`Choice in "${node.id}" points to unknown node "${option.goto}".`);
        }
      }
    }

    if (node.type === "screen" && node.goto && !script.nodes[node.goto]) {
      errors.push(`Screen "${node.id}" points to unknown goto "${node.goto}".`);
    }
  }

  return errors;
}
