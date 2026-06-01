import { useState } from "react";
import { ROOM_CHARACTERS } from "./roomCharacters.js";

function ForwardedCard({ from, body }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10">
      <div className="flex items-center justify-between bg-black/20 px-4 py-2">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-white/80">
          Forwarded message
        </p>
        <span className="text-xs text-white/70">↪</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs font-semibold text-white/90">{from}</p>
        <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-snug text-white">
          {body}
        </pre>
      </div>
    </div>
  );
}

function DialogueBox({ speakerId, line, onNext, isLast, nextLabel }) {
  const c = ROOM_CHARACTERS[speakerId] ?? ROOM_CHARACTERS.priya;

  return (
    <div className="pointer-events-auto w-full max-w-3xl rounded-[28px] border border-white/25 bg-black/45 p-4 shadow-2xl backdrop-blur">
      <div className="flex items-start gap-3">
        <img
          src={c.avatarSrc}
          alt={c.name}
          className="h-12 w-12 shrink-0 rounded-2xl object-cover shadow-lg"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold uppercase tracking-wider text-white/80">
            {c.name}
          </p>
          {line.type === "forwarded" ? (
            <div className="mt-2">
              <ForwardedCard from={line.from} body={line.body} />
            </div>
          ) : (
            <p className="mt-1 text-base leading-snug text-white">{line.text}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-white px-5 py-2 text-xs font-extrabold text-slate-950 hover:bg-slate-100"
        >
          {nextLabel ?? (line.type === "cta" ? line.label : "Next →")}
        </button>
      </div>
    </div>
  );
}

/**
 * Visual-novel dialogue strip (same pattern as legacy Act 1 room chat).
 * @param {{
 *   script: { speaker: string, type?: string, text?: string, from?: string, body?: string, label?: string }[],
 *   onComplete: () => void,
 *   finalButtonLabel?: string,
 * }} props
 */
export default function RoomDialogue({ script, onComplete, finalButtonLabel }) {
  const [idx, setIdx] = useState(0);
  const line = script[idx] ?? script[0];
  const isLast = idx >= script.length - 1;

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center p-5">
      <DialogueBox
        speakerId={line.speaker}
        line={line}
        isLast={isLast}
        nextLabel={isLast ? finalButtonLabel : undefined}
        onNext={() => {
          if (isLast) {
            onComplete();
            return;
          }
          setIdx((v) => Math.min(script.length - 1, v + 1));
        }}
      />
    </div>
  );
}

// useState import - I forgot to add import!