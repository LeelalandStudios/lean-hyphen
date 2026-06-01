/**
 * Split card markdown into sections (## Heading) for staged reveal.
 * @param {string} raw
 * @returns {{ id: string, title: string, markdown: string }[]}
 */
export function parseCardMarkdown(raw) {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const parts = normalized.split(/\n(?=## )/);
  return parts.map((block, index) => {
    const lines = block.trim().split("\n");
    const first = lines[0] ?? "";
    const title = first.startsWith("## ") ? first.slice(3).trim() : `Section ${index + 1}`;
    const body = first.startsWith("## ") ? lines.slice(1).join("\n").trim() : block.trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `section-${index}`;
    return { id, title, markdown: body };
  });
}
