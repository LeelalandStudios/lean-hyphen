import { useMemo, useRef, useState } from "react";
import { INFOGRAPHIC_SRC } from "../content/act1Scene2.js";

const INFOGRAPHIC_BY_SECTION_ID = {
  links: "/act3-infographics/fake-links.png",
  otp: "/act3-infographics/otp-scams.png",
  gaming: "/act3-infographics/gaming-scams.png",
};

function Pill({ children, active, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${className} ${
        active
          ? "border-white/20 bg-white/10 text-white"
          : "border-slate-800 bg-slate-950/20 text-slate-200 hover:bg-slate-900/40"
      }`}
    >
      {children}
    </button>
  );
}

function BigIcon({ children, bg }) {
  return (
    <div
      className={`grid h-14 w-14 place-items-center rounded-3xl ${bg} text-2xl shadow-[0_14px_30px_rgba(0,0,0,0.12)]`}
    >
      {children}
    </div>
  );
}

function Card({ title, icon, accent, children }) {
  return (
    <div
      className={`rounded-[28px] border border-slate-200 bg-gradient-to-b ${accent} p-5 shadow-[0_18px_60px_rgba(12,18,28,0.14)]`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
            {title}
          </p>
        </div>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-slate-800">{children}</div>
    </div>
  );
}

function StepRow({ steps }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
      {steps.map((s, idx) => (
        <div key={s.label} className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-100 text-xl shadow-sm">
            {s.icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-extrabold text-slate-900">{s.label}</p>
            <p className="text-[11px] leading-snug text-slate-600">{s.caption}</p>
          </div>
          {idx < steps.length - 1 && (
            <div className="hidden flex-1 justify-center md:flex">
              <span className="text-slate-400">→</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FlagList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-2">
          <span className="mt-0.5">🚩</span>
          <span className="text-slate-800">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function DoList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-2">
          <span className="mt-0.5">✅</span>
          <span className="text-slate-800">{t}</span>
        </li>
      ))}
    </ul>
  );
}

const SECTIONS = [
  {
    id: "links",
    label: "Fake Links",
    emoji: "🔗",
    theme: "from-[#eef6ff] via-[#f8fbff] to-[#ffffff]",
    tabClass:
      "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100/70",
    tabActiveClass: "border-rose-300 bg-rose-100 text-rose-800",
    cardTheme: "from-[#fff7ed] to-[#ffffff]",
    cardBorder: "border-amber-300",
    headline: "Looks real. Isn’t real.",
    sub: "Scammers copy logos and make a “real-looking” website.",
    how: [
      { icon: "💬", label: "Message arrives", caption: "“Win ₹3,000!” or “Verify delivery!”" },
      { icon: "👆", label: "You tap", caption: "Because it feels urgent" },
      { icon: "🌐", label: "Fake site opens", caption: "Looks like PhonePe / school / game" },
      { icon: "🔑", label: "You type details", caption: "Login / password / OTP" },
      { icon: "🕵️", label: "They steal it", caption: "And log in instantly" },
    ],
    flags: [
      "Short links (bit.ly) or weird spelling (sch00l, amaz0n)",
      "You “won” something you never entered",
      "Countdown timers: “5 minutes left!”",
      "Asks for password / OTP / UPI PIN",
      "Unknown number or suspicious email",
    ],
    do: [
      "Don’t tap the link. Pause.",
      "Open the official app yourself (PhonePe, Gmail, game).",
      "Ask an adult if you’re unsure.",
      "Report/block the sender.",
    ],
  },
  {
    id: "otp",
    label: "OTP Scams",
    emoji: "🔢",
    theme: "from-[#eef6ff] via-[#f8fbff] to-[#ffffff]",
    tabClass:
      "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100/70",
    tabActiveClass: "border-sky-300 bg-sky-100 text-sky-800",
    cardTheme: "from-[#eff6ff] to-[#ffffff]",
    cardBorder: "border-sky-300",
    headline: "One code = one big mistake.",
    sub: "OTP is the key to your account. Never give it away.",
    how: [
      { icon: "🧑‍💻", label: "They try to log in", caption: "To YOUR account" },
      { icon: "📲", label: "OTP comes to you", caption: "Your phone receives the code" },
      { icon: "🎭", label: "They pretend", caption: "“Wrong number” / “Friend” / “Support”" },
      { icon: "📩", label: "You share OTP", caption: "You forward the code" },
      { icon: "🚪", label: "They get in", caption: "Account drained / locked" },
    ],
    flags: [
      "“I sent a code by mistake, please forward it”",
      "“Your account will be locked in 5 minutes”",
      "“Official support” asking for OTP on WhatsApp",
      "A friend’s name but unknown number",
    ],
    do: [
      "Golden rule: NEVER share an OTP with anyone.",
      "If it’s a friend, call their real saved number first.",
      "If you shared it, change password immediately and tell an adult.",
    ],
  },
  {
    id: "gaming",
    label: "Gaming Scams",
    emoji: "🎮",
    theme: "from-[#eef6ff] via-[#f8fbff] to-[#ffffff]",
    tabClass:
      "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/70",
    tabActiveClass:
      "border-emerald-300 bg-emerald-100 text-emerald-800",
    cardTheme: "from-[#f0fdf4] to-[#ffffff]",
    cardBorder: "border-emerald-300",
    headline: "They use games to rush you.",
    sub: "Free diamonds/skins/coins are bait. Admin DMs are bait.",
    how: [
      { icon: "🎁", label: "Free reward", caption: "Diamonds / Robux / skins" },
      { icon: "✅", label: "Looks official", caption: "Fake admin / fake Discord" },
      { icon: "🔐", label: "Asks login", caption: "“To gift you” or “avoid ban”" },
      { icon: "⬇️", label: "Asks download", caption: "Mods / APK / hacks" },
      { icon: "💥", label: "Account/device hit", caption: "Skins gone or malware" },
    ],
    flags: [
      "Free currency generators",
      "Any “admin” asking for password",
      "“Send money first, I’ll double it”",
      "“Download this mod for unlimited coins”",
    ],
    do: [
      "Real game companies NEVER ask for your password.",
      "Never download random APK/mods.",
      "Use the official website/app to check bans or messages.",
      "Report/block and tell an adult.",
    ],
  },
];

function ScamCardButton({ section, onClick }) {
  // (flip) animation controlled by parent via data attribute.
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-[30px] border-2 ${section.cardBorder} bg-gradient-to-b ${section.cardTheme} p-4 shadow-[0_18px_70px_rgba(12,18,28,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_90px_rgba(12,18,28,0.18)] active:translate-y-0`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
          Scam card
        </div>
        <div className="text-lg">{section.emoji}</div>
      </div>

      <div className="mt-4 rounded-3xl bg-white/70 p-4">
        <p className="text-center text-2xl font-extrabold tracking-tight text-slate-900">
          {section.label}
        </p>
        <div className="mt-4 grid place-items-center">
          <div className="grid h-24 w-24 place-items-center rounded-[28px] bg-slate-50 text-5xl shadow-inner">
            {section.emoji}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow-lg">
          <span className="text-base">🖐️</span>
          Tap to Learn
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 bg-white/20" />
      </div>
    </button>
  );
}

export default function Act3KidsInfographic() {
  const [tab, setTab] = useState("menu"); // 'menu' | section id
  const [flippingId, setFlippingId] = useState(null);
  const flipTimeoutRef = useRef(null);

  const active = useMemo(
    () => SECTIONS.find((s) => s.id === tab) ?? SECTIONS[0],
    [tab]
  );

  function goToSectionWithFlip(sectionId) {
    // If already flipping, ignore.
    if (flippingId) return;
    setFlippingId(sectionId);
    if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    flipTimeoutRef.current = setTimeout(() => {
      setTab(sectionId);
      setFlippingId(null);
    }, 520);
  }

  return (
    <div
      className={`relative h-full overflow-hidden bg-gradient-to-b ${
        tab === "menu" ? "from-[#eef6ff] via-[#f8fbff] to-[#ffffff]" : active.theme
      }`}
    >
      {/* Backgrounds */}
      {tab === "menu" ? (
        // Wooden table (gradient texture; no external assets)
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                // base tone
                "linear-gradient(180deg, #7b4b2a 0%, #6a3f23 35%, #5b341d 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-70 mix-blend-overlay"
            style={{
              background:
                // grain lines
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.02) 6px, rgba(0,0,0,0.08) 12px, rgba(255,255,255,0.03) 18px)",
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                // subtle knots / variation
                "radial-gradient(1200px 700px at 20% 30%, rgba(255,220,180,0.22), transparent 55%), radial-gradient(900px 600px at 80% 70%, rgba(0,0,0,0.18), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </div>
      ) : (
        // Wooden table stays behind the learn card too (so it feels like one scene)
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #7b4b2a 0%, #6a3f23 35%, #5b341d 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-70 mix-blend-overlay"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.02) 6px, rgba(0,0,0,0.08) 12px, rgba(255,255,255,0.03) 18px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </div>
      )}

      <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden p-6">
        {tab !== "menu" && (
          <button
            type="button"
            onClick={() => setTab("menu")}
            className="relative z-10 mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-sm font-extrabold text-white shadow-lg backdrop-blur hover:bg-black/35"
          >
            ← Back
          </button>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto">
          {tab === "menu" ? (
            <div className="relative overflow-visible pt-10 pb-14">
              {/* Soft “table spotlight” behind the cards */}
              <div className="pointer-events-none absolute left-1/2 top-6 h-[520px] w-[940px] -translate-x-1/2 rounded-[80px] bg-black/10 blur-3xl md:block" />

              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                {SECTIONS.map((s, idx) => (
                  <div
                    key={s.id}
                    className={
                      idx === 0
                        ? "md:rotate-[-4deg]"
                        : idx === 1
                          ? "md:translate-y-2"
                          : "md:rotate-[4deg]"
                    }
                    style={{ perspective: "1200px" }}
                  >
                    <div
                      className="relative"
                      style={{
                        transformStyle: "preserve-3d",
                        transition: "transform 520ms cubic-bezier(.2,.8,.2,1)",
                        transform:
                          flippingId === s.id ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      {/* Front */}
                      <div style={{ backfaceVisibility: "hidden" }}>
                        <ScamCardButton
                          section={s}
                          onClick={() => goToSectionWithFlip(s.id)}
                        />
                      </div>

                      {/* Back (briefly visible during flip) */}
                      <div
                        className={`absolute inset-0 rounded-[30px] border-2 ${s.cardBorder} bg-white shadow-[0_18px_70px_rgba(12,18,28,0.14)]`}
                        style={{
                          transform: "rotateY(180deg)",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <div className="flex h-full items-center justify-center p-6 text-center">
                          <div>
                            <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-slate-100 text-3xl">
                              {s.emoji}
                            </div>
                            <p className="mt-4 text-sm font-extrabold text-slate-900">
                              Flipping…
                            </p>
                            <p className="mt-1 text-xs text-slate-600">
                              Tap to learn
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-center text-[11px] font-semibold text-white/80 drop-shadow">
                Tap a card to learn
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-center pt-4 pb-10">
                <div
                  className="w-full max-w-[520px]"
                  style={{ perspective: "1400px" }}
                >
                  <div
                    className="relative w-full overflow-hidden rounded-[34px] border-2 border-slate-200 bg-white shadow-[0_26px_120px_rgba(12,18,28,0.22)]"
                    style={{
                      transform: "rotateX(2deg)",
                      transformOrigin: "center",
                    }}
                  >
                    <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-slate-100 text-2xl">
                            {active.emoji}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                              Scam card
                            </p>
                            <p className="truncate text-xl font-extrabold text-slate-950">
                              {active.label}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 rounded-full bg-slate-900 px-4 py-2 text-xs font-extrabold text-white">
                          Tap to Learn
                        </div>
                      </div>
                    </div>

                    {/* Card body scrolls INSIDE the card */}
                    <div className="h-[560px] overflow-y-auto px-6 py-5">
                      <img
                        src={INFOGRAPHIC_BY_SECTION_ID[active.id]}
                        alt={`${active.label} infographic`}
                        className="w-full rounded-2xl border border-slate-200 bg-white object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

