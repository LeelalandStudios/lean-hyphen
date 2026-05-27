import { FRIEND_OTP_ARTICLE, NEWS_FEED_ITEMS } from "../../content/newsArticle.js";
import InshortsCard from "../../components/news/InshortsCard.jsx";
import StatusBar from "../../components/phone/StatusBar.jsx";

/** Inshorts-style vertical news cards (static). */
export default function NewsFeedScreen({ onBack }) {
  const featured = NEWS_FEED_ITEMS.find((item) => item.featured);
  const next = NEWS_FEED_ITEMS.find((item) => !item.featured);

  return (
    <div className="relative flex h-full flex-col bg-neutral-900 pt-12">
      <StatusBar />

      <div className="flex shrink-0 items-center justify-between px-4 py-2 text-white">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="mr-1 rounded-full bg-white/10 px-2 py-1 text-sm"
              aria-label="Back"
            >
              ‹
            </button>
          )}
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[#c41200] text-[10px] font-black">
            in
          </span>
          <span className="text-sm font-semibold">Shorts</span>
        </div>
        <span className="text-xs text-white/60">My Feed</span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden px-3 pb-4 pt-2">
        {next && (
          <div className="absolute inset-x-3 bottom-2 top-8 z-0">
            <InshortsCard
              outlet={next.outlet}
              category="Sports"
              headline={next.headline}
              summary={next.preview}
              date={next.date}
            />
          </div>
        )}

        {featured && (
          <div className="relative z-10 h-full">
            <InshortsCard
              outlet={featured.outlet}
              category={FRIEND_OTP_ARTICLE.category}
              headline={featured.headline}
              summary={FRIEND_OTP_ARTICLE.cardSummary}
              date={featured.date}
              featured
            />
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-white/10 bg-neutral-900 px-4 py-3 text-center">
        <p className="text-[10px] font-medium uppercase tracking-widest text-white/50">
          Swipe up for next story
        </p>
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/30" />
      </div>
    </div>
  );
}
