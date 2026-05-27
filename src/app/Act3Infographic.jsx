import { useMemo, useState } from "react";
import { ACT3_COMMON_SCAMS_RAW } from "../content/act3CommonScamsRaw.js";

function extractBetween(raw, startNeedle, endNeedle) {
  const start = raw.indexOf(startNeedle);
  if (start === -1) return "";
  const from = start;
  const end = endNeedle ? raw.indexOf(endNeedle, from + startNeedle.length) : -1;
  if (end === -1) return raw.slice(from).trimEnd();
  return raw.slice(from, end).trimEnd();
}

function sectionFromCard(cardText, header) {
  const idx = cardText.indexOf(header);
  if (idx === -1) return "";
  return cardText.slice(idx).trimEnd();
}

function blockBetween(cardText, startHeader, endHeaders) {
  const start = cardText.indexOf(startHeader);
  if (start === -1) return "";
  const from = start;
  let end = -1;
  for (const h of endHeaders) {
    const pos = cardText.indexOf(h, from + startHeader.length);
    if (pos !== -1 && (end === -1 || pos < end)) end = pos;
  }
  if (end === -1) return cardText.slice(from).trimEnd();
  return cardText.slice(from, end).trimEnd();
}

function Panel({ title, children, accentClass }) {
  return (
    <div className={`rounded-3xl border border-slate-800 bg-slate-950/30 shadow-2xl ${accentClass ?? ""}`}>
      <div className="border-b border-slate-800 px-5 py-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-200">{title}</p>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function Raw({ text }) {
  return (
    <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-slate-100">
      {text}
    </pre>
  );
}

const TABS = [
  { id: "links", label: "FAKE LINKS", emoji: "🔗", theme: "from-sky-500/15 via-indigo-500/10 to-slate-950/40" },
  { id: "otp", label: "OTP SCAMS", emoji: "🔢", theme: "from-amber-500/15 via-orange-500/10 to-slate-950/40" },
  { id: "gaming", label: "GAMING SCAMS", emoji: "🎮", theme: "from-fuchsia-500/15 via-violet-500/10 to-slate-950/40" },
];

export default function Act3Infographic() {
  const [tab, setTab] = useState("links");

  const { intro, links, otp, gaming, outro } = useMemo(() => {
    const raw = ACT3_COMMON_SCAMS_RAW;

    const linksCard = extractBetween(raw, "🃏 SCAM CARD 1 — Fake Links", "-- 7 of 10 --");
    const otpCard = extractBetween(raw, "🃏 SCAM CARD 2 — OTP Scams", "🃏 SCAM CARD 3 — Gaming Scams");
    const gamingCard = extractBetween(raw, "🃏 SCAM CARD 3 — Gaming Scams", "[Button:] \"What's next? →\"");

    const introText = extractBetween(raw, "ACT 3 — AFTER ALL 5 SCENARIOS (Priya Explains)", "🃏 SCAM CARD 1 — Fake Links");
    const outroText = extractBetween(raw, "SCREEN: Priya on screen again.", null);

    return {
      intro: introText.trimEnd(),
      links: linksCard.trimEnd(),
      otp: otpCard.trimEnd(),
      gaming: gamingCard.trimEnd(),
      outro: outroText.trimEnd(),
    };
  }, []);

  const active = tab === "links" ? links : tab === "otp" ? otp : gaming;
  const theme = TABS.find((t) => t.id === tab)?.theme ?? TABS[0].theme;

  const howItWorks = useMemo(() => {
    if (!active) return "";
    // headings differ slightly by card
    const header = tab === "links" ? "HOW IT WORKS (text on card):" : "HOW IT WORKS:";
    return blockBetween(active, header, ["RED FLAGS", "EXAMPLE", "WHAT TO DO", "[Auto-advance"]);
  }, [active, tab]);

  const redFlags = useMemo(() => {
    if (!active) return "";
    const header = tab === "links" ? "RED FLAGS — illustrated on card with icons:" : "RED FLAGS:";
    return blockBetween(active, header, ["EXAMPLE", "WHAT TO DO", "[Auto-advance", "🟡 GOLDEN RULE"]);
  }, [active, tab]);

  const example = useMemo(() => {
    if (!active) return "";
    const header = tab === "links" ? "EXAMPLE shown on card:" : "EXAMPLE:";
    return blockBetween(active, header, ["WHAT TO DO", "🟡 GOLDEN RULE", "[Auto-advance", "SCREEN: Priya"]);
  }, [active, tab]);

  const whatToDo = useMemo(() => {
    if (!active) return "";
    if (tab === "otp") {
      return blockBetween(active, "🟡 GOLDEN RULE (highlighted box):", ["[Auto-advance", "🃏 SCAM CARD 3"]);
    }
    return blockBetween(active, "WHAT TO DO:", ["[Auto-advance", "SCREEN: Priya"]);
  }, [active, tab]);

  return (
    <div className={`h-full overflow-hidden bg-gradient-to-b ${theme}`}>
      <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden p-6">
        <header className="shrink-0 rounded-3xl border border-slate-800 bg-slate-950/40 px-6 py-5 shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">
            Act 3 · Common scams
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-50">
                SPOT THE SCAM
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Priya breaks down the 3 tricks scammers use
              </p>
            </div>
            <p className="text-xs text-slate-400">
              Text kept exactly as in the PDF
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {TABS.map((t) => {
              const selected = t.id === tab;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                    selected
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-slate-800 bg-slate-950/30 text-slate-300 hover:bg-slate-900/40"
                  }`}
                >
                  <span className="text-lg">{t.emoji}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        <div className="mt-5 min-h-0 flex-1 overflow-hidden">
          <div className="grid h-full grid-cols-1 gap-4 overflow-hidden lg:grid-cols-12">
            <div className="min-h-0 overflow-y-auto lg:col-span-4">
              <Panel title="PRIYA (INTRO)">
                <Raw text={intro} />
              </Panel>

              <div className="mt-4">
                <Panel title="CARD TEXT (VERBATIM)">
                  <Raw text={active} />
                </Panel>
              </div>
            </div>

            <div className="min-h-0 overflow-y-auto lg:col-span-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Panel title="HOW IT WORKS">
                  <Raw text={howItWorks} />
                </Panel>
                <Panel title="RED FLAGS">
                  <Raw text={redFlags} />
                </Panel>
                <Panel title="EXAMPLE">
                  <Raw text={example} />
                </Panel>
                <Panel title={tab === "otp" ? "GOLDEN RULE" : "WHAT TO DO"}>
                  <Raw text={whatToDo} />
                </Panel>
              </div>

              <div className="mt-4">
                <Panel title="PRIYA (OUTRO)">
                  <Raw text={outro} />
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

