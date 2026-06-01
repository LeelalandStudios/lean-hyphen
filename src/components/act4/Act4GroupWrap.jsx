import RoomDialogue from "../room/RoomDialogue.jsx";
import { ACT4_GROUP_WRAP_SCRIPT } from "../../content/act4Challenge.js";

/** @param {{ onComplete: () => void }} props */
export default function Act4GroupWrap({ onComplete }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-black/50" />
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-8">
        <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/40">
          Squad Goals · 12:31 AM
        </p>
      </div>
      <RoomDialogue
        script={ACT4_GROUP_WRAP_SCRIPT}
        onComplete={onComplete}
        finalButtonLabel="Continue →"
      />
    </div>
  );
}
