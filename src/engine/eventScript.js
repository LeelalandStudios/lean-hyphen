const NODE_HEADING = /^##\s+([a-zA-Z0-9_-]+)\s*$/gm;

/**
 * Supported nodes:
 * - wait: { type: 'wait', ms, goto }
 * - notify: { type: 'notify', appId, appLabel, from, body, goto? }
 * - sms.receive: { type: 'sms.receive', threadId, from, body, notify?: {...}, goto? }
 * - choice: { type: 'choice', prompt, options[{id,label,set?,goto?}], goto? } (goto is optional; options can include goto)
 * - set: { type: 'set', vars, goto }
 * - if: { type: 'if', when, goto, else }
 */

function parseScalar(raw) {
  const v = raw.trim();
  if (v === "true") return true;
  if (v === "false") return false;
  if (/^-?\d+$/.test(v)) return Number(v);
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  )
    return v.slice(1, -1);
  return v;
}

function parseFrontmatter(lines) {
  let start = null;
  const trimmed = lines.map((l) => l.trim());
  const open = trimmed.findIndex((l) => l === "---");
  if (open === -1) return { start, rest: lines };
  const end = trimmed.findIndex((l, idx) => idx > open && l === "---");
  if (end === -1) return { start, rest: lines };
  for (let i = open + 1; i < end; i++) {
    const m = lines[i].match(/^start:\s*(.+)$/);
    if (m) start = m[1].trim();
  }
  return { start, rest: lines.slice(end + 1) };
}

/**
 * @param {string} markdown
 */
export function parseEventScript(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const { start, rest } = parseFrontmatter(lines);
  const body = rest.join("\n");
  const headings = [...body.matchAll(NODE_HEADING)];
  const nodes = {};

  for (let h = 0; h < headings.length; h++) {
    const id = headings[h][1];
    const chunkStart = headings[h].index + headings[h][0].length;
    const chunkEnd = headings[h + 1]?.index ?? body.length;
    const chunk = body.slice(chunkStart, chunkEnd);
    const chunkLines = chunk.trim().split("\n");

    const node = { id };
    /** @type {any[]} */
    let options = null;
    let inOptions = false;
    let inSet = false;
    let currentOption = null;

    for (let i = 0; i < chunkLines.length; i++) {
      const line = chunkLines[i];
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      if (inSet) {
        const m = line.match(/^\s{4,}([a-zA-Z0-9_]+):\s*(.+)$/);
        if (m && currentOption) {
          currentOption.set ??= {};
          currentOption.set[m[1]] = String(parseScalar(m[2]));
          continue;
        }
        inSet = false;
      }

      if (inOptions) {
        const startOpt = line.match(/^\s*-\s*(.+)$/);
        if (startOpt) {
          currentOption = { id: "", label: "", goto: undefined, set: undefined };
          options.push(currentOption);
          // allow "- id: tap"
          const inline = startOpt[1].trim().match(/^([^:]+):\s*(.*)$/);
          if (inline) {
            const k = inline[1].trim();
            const v = inline[2].trim();
            if (k === "id") currentOption.id = String(parseScalar(v));
            else if (k === "label") currentOption.label = String(parseScalar(v));
            else if (k === "goto") currentOption.goto = String(parseScalar(v));
          } else {
            currentOption.label = String(parseScalar(startOpt[1]));
          }
          continue;
        }

        const optField = line.match(/^\s{2,}([a-zA-Z0-9_]+):\s*(.*)$/);
        if (optField && currentOption) {
          const k = optField[1];
          const v = optField[2];
          if (k === "set") {
            inSet = true;
            currentOption.set = {};
            continue;
          }
          if (k === "id") currentOption.id = String(parseScalar(v));
          else if (k === "label") currentOption.label = String(parseScalar(v));
          else if (k === "goto") currentOption.goto = String(parseScalar(v));
          continue;
        }

        inOptions = false;
      }

      if (trimmed === "options:") {
        inOptions = true;
        options = [];
        node.options = options;
        continue;
      }

      const kv = trimmed.match(/^([a-zA-Z0-9_.]+):\s*(.*)$/);
      if (!kv) continue;
      const key = kv[1];
      const value = kv[2];
      node[key] = value ? parseScalar(value) : true;
    }

    if (!node.type) node.type = "noop";
    nodes[id] = node;
  }

  const startId = start ?? headings[0]?.[1] ?? null;
  if (!startId || !nodes[startId]) {
    throw new Error(`Script start node "${startId ?? "(none)"}" was not found.`);
  }

  return { start: startId, nodes };
}

