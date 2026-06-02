import RoomDialogue from "../room/RoomDialogue.jsx";
import { ACT4_GROUP_WRAP_SCRIPT } from "../../content/act4Challenge.js";

/** @param {{ onComplete: () => void }} props */
export default function Act4GroupWrap({ onComplete }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-black/50" />
      <RoomDialogue
        script={ACT4_GROUP_WRAP_SCRIPT}
        onComplete={onComplete}
        finalButtonLabel="Continue →"
        header={
          <div className="text-center select-none pb-2">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/40">
              Squad Goals · 12:31 AM
            </p>
          </div>
        }
      />
    </div>
  );
}
