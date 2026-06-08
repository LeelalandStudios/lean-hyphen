import GuideAvatar from "../components/act2/GuideAvatar.jsx";
import RoomDialogue from "../components/room/RoomDialogue.jsx";
import { ACT3_OUTRO_SCRIPT } from "../content/act3/act3Patterns.js";

const noop = () => {};

/** Legacy preservation of the pre-chat Act 3 urgency outro. */
export default function Act3UrgencyOutroLegacy({ onComplete = noop }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-black/60" />
      <RoomDialogue
        script={ACT3_OUTRO_SCRIPT}
        finalButtonLabel="Test yourself →"
        onComplete={onComplete}
        header={
          <>
            <div className="mx-auto w-full max-w-3xl px-4">
              <GuideAvatar label="Priya guides you" />
            </div>
            <div className="text-center select-none pb-2">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/50">
                🔥 Squad Goals
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-white">
                The pattern
              </h2>
            </div>
          </>
        }
      />
    </div>
  );
}
