import { useCallback, useState } from "react";
import { ACT4_FINAL_COPY, ACT4_SHARE_TEXT } from "../../content/act4Challenge.js";

/**
 * @param {{
 *   onPlayAgain: () => void,
 *   onShowRules?: () => void,
 * }} props
 */
export default function FinalScreen({ onPlayAgain, onShowRules }) {
  const [shareNote, setShareNote] = useState("");
  const [rohanLine1, rohanLine2, rohanLine3, rohanLine4, , ...remainingLines] =
    ACT4_FINAL_COPY.lines;
  const bodyParagraphs = [
    [rohanLine1, rohanLine2, rohanLine3, rohanLine4].filter(Boolean).join(" "),
    ...remainingLines.filter(Boolean),
  ];

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Scam Smart",
          text: ACT4_SHARE_TEXT,
        });
        setShareNote("Thanks for sharing!");
        return;
      } catch {
        /* fall through */
      }
    }
    try {
      await navigator.clipboard.writeText(ACT4_SHARE_TEXT);
      setShareNote("Copied to clipboard!");
    } catch {
      setShareNote(ACT4_SHARE_TEXT);
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col justify-center overflow-y-auto bg-black px-6 py-10">
      <div className="mx-auto w-full max-w-xl text-center">
        <div className="mx-auto max-w-md space-y-5">
          {bodyParagraphs.map((line, i) => (
            <p
              key={line}
              className={
                i === 0
                  ? "text-base font-semibold leading-relaxed text-white"
                  : "text-sm leading-7 text-slate-300"
              }
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-lg font-bold leading-snug text-white">
            {ACT4_FINAL_COPY.headline}
          </p>
          <p className="mt-2 text-xl font-extrabold leading-tight text-amber-300">
            {ACT4_FINAL_COPY.subhead}
          </p>
        </div>

        <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold">
          <button
            type="button"
            onClick={onPlayAgain}
            className="text-amber-300 underline-offset-4 transition hover:text-amber-200 hover:underline"
          >
            Play again
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="text-slate-300 underline-offset-4 transition hover:text-white hover:underline"
          >
            Share with a friend
          </button>
          <button
            type="button"
            onClick={() => onShowRules?.()}
            className="text-slate-300 underline-offset-4 transition hover:text-white hover:underline"
          >
            Tell someone who needs this
          </button>
        </div>
        {shareNote && (
          <p className="mt-4 text-xs text-slate-500">{shareNote}</p>
        )}
      </div>
    </div>
  );
}
