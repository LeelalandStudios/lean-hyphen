import { useMemo, useState } from "react";

const BACKGROUND_SRC = "/act1-room.png";

const CHARACTERS = {
  aryan: { id: "aryan", name: "Aryan", hue: 210, avatarSrc: "/avatars/aryan.png" },
  diya: { id: "diya", name: "Diya", hue: 330, avatarSrc: "/avatars/diya.png" },
  kabir: { id: "kabir", name: "Kabir", hue: 35, avatarSrc: "/avatars/kabir.png" },
  priya: { id: "priya", name: "Priya", hue: 140, avatarSrc: "/avatars/priya.png" },
};

// Act 1 dialogue (verbatim from the PDF)
const SCRIPT = [
  {
    speaker: "kabir",
    type: "text",
    text: "guys guys LOOK at this",
  },
  {
    speaker: "kabir",
    type: "forwarded",
    from: "📱 +91 98765 43210 (Unknown)",
    body:
      "🎮 You've been selected for the Free Fire Diamond Giveaway! Claim 10,000 free Diamonds\nbefore it expires.\n→ bit.ly/ff-d1amonds-free\n⏰ Offer ends in 10 minutes.",
  },
  {
    speaker: "aryan",
    type: "text",
    text: "YOO 10k diamonds!! tap it fast before it expires",
  },
  {
    speaker: "kabir",
    type: "text",
    text: "should i just click it quick??",
  },
  {
    speaker: "diya",
    type: "text",
    text: "...wait. something feels off",
  },
  {
    speaker: "priya",
    type: "text",
    text: "Kabir don't tap it.",
  },
  {
    speaker: "kabir",
    type: "text",
    text: "why not?? free diamonds bro",
  },
  {
    speaker: "priya",
    type: "text",
    text:
      "because I've seen how this ends. this is one of three scam tricks that show up constantly.\nyou're about to face all of them. let's see if you can spot them before they get you.",
  },
  {
    speaker: "priya",
    type: "cta",
    text: "Let's go",
    label: "Let's go 💥",
  },
];

function Avatar({ id, active }) {
  const c = CHARACTERS[id];
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`relative grid h-12 w-12 place-items-center rounded-2xl shadow-lg transition ${
          active ? "scale-105 ring-4 ring-white/40" : "opacity-80"
        }`}
      >
        <img
          src={c.avatarSrc}
          alt={c.name}
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>
      <span className={`text-[11px] font-semibold ${active ? "text-white" : "text-white/80"}`}>
        {c.name}
      </span>
    </div>
  );
}

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

function DialogueBox({ speakerId, line, onNext, isLast, onRestart }) {
  const c = CHARACTERS[speakerId];

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

      <div className="mt-4 flex items-center justify-between gap-3">
        <span />
        {isLast ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRestart}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-extrabold text-white hover:bg-white/15"
            >
              Replay
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-full bg-emerald-500 px-5 py-2 text-xs font-extrabold text-slate-950 hover:bg-emerald-400"
            >
              {line.type === "cta" ? line.label : "Continue →"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="rounded-full bg-white px-5 py-2 text-xs font-extrabold text-slate-950 hover:bg-slate-100"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

export default function Act1RoomChat({ onComplete }) {
  const [idx, setIdx] = useState(0);
  const line = SCRIPT[idx] ?? SCRIPT[0];
  const isLast = idx >= SCRIPT.length - 1;

  const activeSpeaker = line.speaker;

  const characterOrder = useMemo(() => ["aryan", "diya", "kabir", "priya"], []);

  return (
    <div className="relative h-full overflow-hidden">
      <img
        src={BACKGROUND_SRC}
        alt="Friends in a room"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/55" />

      {/* Dialogue UI */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center p-5">
        <DialogueBox
          speakerId={activeSpeaker}
          line={line}
          isLast={isLast}
          onRestart={() => setIdx(0)}
          onNext={() => {
            if (isLast) {
              onComplete?.();
              return;
            }
            setIdx((v) => Math.min(SCRIPT.length - 1, v + 1));
          }}
        />
      </div>
    </div>
  );
}

