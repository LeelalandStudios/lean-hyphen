import { useCallback, useState } from "react";
import { ACT4_FINAL_COPY, ACT4_SHARE_TEXT } from "../../content/act4Challenge.js";
import ChallengeButton from "./ChallengeButton.jsx";

/**
 * @param {{
 *   onPlayAgain: () => void,
 *   onShowRules?: () => void,
 * }} props
 */
export default function FinalScreen({ onPlayAgain, onShowRules }) {
  const [shareNote, setShareNote] = useState("");

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
    <div className="flex flex-1 flex-col overflow-y-auto bg-black px-6 py-10">
      <div className="mx-auto w-full max-w-lg text-center">
        {ACT4_FINAL_COPY.lines.map((line, i) =>
          line === "" ? (
            <div key={i} className="h-4" />
          ) : (
            <p key={i} className="text-sm leading-relaxed text-slate-300">
              {line}
            </p>
          )
        )}
        <p className="mt-10 text-lg font-bold text-white">{ACT4_FINAL_COPY.headline}</p>
        <p className="mt-2 text-base font-semibold text-amber-400">{ACT4_FINAL_COPY.subhead}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ChallengeButton onClick={onPlayAgain}>Play again</ChallengeButton>
          <ChallengeButton variant="secondary" onClick={handleShare}>
            Share with a friend
          </ChallengeButton>
          <ChallengeButton
            variant="secondary"
            onClick={() => onShowRules?.()}
          >
            Tell someone who needs this
          </ChallengeButton>
        </div>
        {shareNote && (
          <p className="mt-4 text-xs text-slate-500">{shareNote}</p>
        )}
      </div>
    </div>
  );
}
