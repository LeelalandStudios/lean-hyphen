import { FRIEND_OTP_ARTICLE } from "../../../content/newsArticle.js";
import { NEWS_SHARE_BY_PATH } from "../../../content/scenario3.js";
import SingleChoiceFooter from "../../../components/whatsapp/SingleChoiceFooter.jsx";
import StatusBar from "../../../components/phone/StatusBar.jsx";

/**
 * After reading the article — share to group (wording matches S3 path).
 * @param {{ path: keyof typeof NEWS_SHARE_BY_PATH }} props
 */
export default function NewsArticleShareScreen({ path }) {
  const share = NEWS_SHARE_BY_PATH[path];

  return (
    <div className="relative flex h-full flex-col bg-white pt-12 text-slate-900">
      <StatusBar dark />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        <p className="text-xs font-bold text-[#c41200]">{FRIEND_OTP_ARTICLE.outlet}</p>
        <h1 className="mt-2 text-lg font-bold leading-snug">
          {FRIEND_OTP_ARTICLE.headline}
        </h1>
        <p className="mt-4 text-sm text-slate-600">{share.sharePreview}</p>
        <div className="mt-4 rounded-2xl border border-[#25d366]/30 bg-[#e7fce8] p-4">
          <p className="text-xs font-semibold text-[#075e54]">Preview — message to friends group</p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-[#111b21]">
            {share.groupMessages[0].text}
          </p>
        </div>
      </div>
      <SingleChoiceFooter label={share.shareLabel} />
    </div>
  );
}
