/** Lightweight markdown subset for scam card sections (no extra deps). */

function renderInline(text) {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={m.index} className="font-extrabold text-slate-900">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(
        <em key={m.index} className="text-slate-700">
          {token.slice(1, -1)}
        </em>
      );
    }
    last = m.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function Block({ block }) {
  const trimmed = block.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("# ")) {
    return (
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
        {renderInline(trimmed.slice(2))}
      </h2>
    );
  }

  if (trimmed.startsWith("## ")) {
    return (
      <h3 className="text-base font-black uppercase text-slate-900">
        {renderInline(trimmed.slice(3))}
      </h3>
    );
  }

  const lines = trimmed.split("\n");
  if (lines.every((l) => l.startsWith("- "))) {
    return (
      <ul className="space-y-2 text-sm leading-relaxed text-slate-800">
        {lines.map((line) => (
          <li key={line} className="flex gap-2">
            <span>{renderInline(line.slice(2))}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-sm leading-relaxed text-slate-800">{renderInline(trimmed)}</p>
  );
}

/**
 * @param {{ markdown: string, className?: string }} props
 */
export default function MarkdownContent({ markdown, className = "" }) {
  const blocks = markdown.split(/\n\n+/).filter((b) => b.trim());
  return (
    <div className={`space-y-3 ${className}`}>
      {blocks.map((block) => (
        <Block key={block.slice(0, 40)} block={block} />
      ))}
    </div>
  );
}
