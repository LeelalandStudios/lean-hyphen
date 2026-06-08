import { ROOM_CHARACTERS } from "../room/roomCharacters.js";

/** Small Priya guide chip for Act 2 feedback surfaces. */
export default function GuideAvatar({ label = "Priya guides you" }) {
  const priya = ROOM_CHARACTERS.priya;

  return (
    <div className="mb-3 flex items-center gap-2.5">
      <img
        src={priya.avatarSrc}
        alt={priya.name}
        className="h-9 w-9 shrink-0 rounded-xl object-cover ring-1 ring-white/10"
      />
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-400/90">
          {label}
        </p>
        <p className="text-xs text-slate-400">Your guide through this scenario</p>
      </div>
    </div>
  );
}
