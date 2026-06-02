/**
 * Split card markdown into three reading beats:
 * 1. the single-hash title through the first double-hash block,
 * 2. the next double-hash block,
 * 3. the remaining markdown through the end.
 * @param {string} raw
 * @returns {{ id: string, title: string, markdown: string }[]}
 */
export function parseCardMarkdown(raw) {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const firstTitleIndex = normalized.search(/^#(?!#)\s+/m);
  const content =
    firstTitleIndex >= 0 ? normalized.slice(firstTitleIndex).trim() : normalized;
  const h2Matches = [...content.matchAll(/^##(?!#)\s+/gm)];

  const ranges = [];
  if (h2Matches.length >= 2) {
    ranges.push([0, h2Matches[1].index]);
    if (h2Matches.length >= 3) {
      ranges.push([h2Matches[1].index, h2Matches[2].index]);
      ranges.push([h2Matches[2].index, content.length]);
    } else {
      ranges.push([h2Matches[1].index, content.length]);
    }
  } else {
    ranges.push([0, content.length]);
  }

  return ranges
    .map(([start, end], index) => buildSection(content.slice(start, end), index))
    .filter((section) => section.markdown);
}

function buildSection(block, index) {
  const markdown = block.trim();
  const heading = markdown.match(/^(#{1,2})(?!#)\s+(.+)$/m);
  const title = heading?.[2]?.trim() || `Section ${index + 1}`;
  const id =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `section-${index}`;

  return { id, title, markdown };
}
