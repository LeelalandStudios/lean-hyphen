/**
 * Inshorts-style story card — full-height swipeable look (static).
 * @param {{ outlet: string, category: string, headline: string, summary: string, date: string, featured?: boolean }} props
 */
export default function InshortsCard({
  outlet,
  category,
  headline,
  summary,
  date,
  featured = false,
}) {
  return (
    <article
      className={`relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl ${
        featured ? "z-10" : "scale-[0.97] opacity-80"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#c41200] text-xs font-black text-white">
            TW
          </span>
          <div>
            <p className="text-xs font-bold text-slate-900">{outlet}</p>
            <p className="text-[10px] text-slate-500">{date}</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
          {category}
        </span>
      </div>

      <div className="mx-4 flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-300 via-slate-200 to-amber-100">
        <div className="flex h-full min-h-[220px] flex-col items-center justify-center p-6 text-center">
          <span className="text-5xl">📱</span>
          <p className="mt-3 max-w-[240px] text-sm font-medium text-slate-700">
            WhatsApp on a new number — not your friend's saved contact
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-t from-white via-white to-transparent px-4 pb-5 pt-2">
        <h2 className="text-xl font-bold leading-snug text-slate-900">{headline}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{summary}</p>
        {featured && (
          <p className="mt-4 text-center text-xs font-bold uppercase tracking-wide text-[#c41200]">
            Tap READ MORE for full story
          </p>
        )}
      </div>
    </article>
  );
}
