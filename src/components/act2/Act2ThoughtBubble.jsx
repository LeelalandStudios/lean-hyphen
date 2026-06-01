export default function Act2ThoughtBubble({ lines }) {
  if (!lines?.length) return null;

  return (
    <aside className="rounded-2xl border border-slate-700/80 bg-slate-800/60 p-4 shadow-lg">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-500">
        Internal thought
      </p>
      <div className="space-y-2 text-sm italic leading-relaxed text-slate-300">
        {lines.map((line, i) => (
          <p key={i}>&ldquo;{line}&rdquo;</p>
        ))}
      </div>
    </aside>
  );
}
