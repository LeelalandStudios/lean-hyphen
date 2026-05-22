import SingleChoiceFooter from "./SingleChoiceFooter.jsx";
import StatusBar from "../phone/StatusBar.jsx";

/**
 * Debrief — preview sharing a warning to the friends group.
 * @param {{ heading: string, subtitle: string, shareLabel: string, sharePreview: string, previewMessage: string }} props
 */
export default function GroupSharePromptScreen({
  heading,
  subtitle,
  shareLabel,
  sharePreview,
  previewMessage,
}) {
  return (
    <div className="relative flex h-full flex-col bg-white pt-12 text-slate-900">
      <StatusBar dark />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[#075e54]">
          {heading}
        </p>
        <h1 className="mt-2 text-lg font-bold leading-snug">{subtitle}</h1>
        <p className="mt-4 text-sm text-slate-600">{sharePreview}</p>
        <div className="mt-4 rounded-2xl border border-[#25d366]/30 bg-[#e7fce8] p-4">
          <p className="text-xs font-semibold text-[#075e54]">
            Preview — message to friends group
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-[#111b21]">
            {previewMessage}
          </p>
        </div>
      </div>
      <SingleChoiceFooter label={shareLabel} />
    </div>
  );
}
