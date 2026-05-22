import { FRIEND_OTP_ARTICLE } from "../../content/newsArticle.js";
import StatusBar from "../../components/phone/StatusBar.jsx";

/** Full article — Inshorts “read more” style (static). */
export default function NewsArticleScreen() {
  const article = FRIEND_OTP_ARTICLE;

  return (
    <div className="relative flex h-full flex-col bg-white pt-12 text-slate-900">
      <StatusBar dark />
      <header className="shrink-0 border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#c41200] text-xs font-black text-white">
            TW
          </span>
          <div>
            <p className="text-xs font-bold">{article.outlet}</p>
            <p className="text-[10px] text-slate-500">{article.category}</p>
          </div>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8">
        <p className="pt-3 text-xs text-slate-500">
          {article.author} · {article.date}
        </p>
        <h1 className="mt-2 text-2xl font-bold leading-tight">{article.headline}</h1>
        <p className="mt-3 text-sm font-medium text-slate-600">
          {article.heroCaption}
        </p>

        <div className="my-5 h-40 rounded-2xl bg-gradient-to-br from-slate-200 to-amber-100" />

        {article.sections.map((section) => (
          <section key={section.title} className="mb-5">
            <h2 className="text-sm font-bold">{section.title}</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
