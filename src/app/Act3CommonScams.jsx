import { useCallback, useEffect, useState } from "react";
import { ACT3_COMMON_SCAMS_RAW } from "../content/act3CommonScamsRaw.js";

function splitIntoSteps(raw) {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  /** @type {{ kind: 'intro'|'divider'|'card', title?: string, body: string }[]} */
  const steps = [];

  let current = { kind: "intro", body: "" };
  const flush = () => {
    if (current.body.trim().length === 0) return;
    steps.push({ ...current, body: current.body.trimEnd() });
    current = { kind: "intro", body: "" };
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Keep PDF pagination markers as standalone steps.
    if (/^--\s*\d+\s+of\s+\d+\s*--$/.test(trimmed)) {
      flush();
      steps.push({ kind: "divider", body: trimmed });
      continue;
    }

    // Start a new "scam card" step on the exact SCAM CARD lines.
    if (trimmed.startsWith("🃏 SCAM CARD")) {
      flush();
      current = { kind: "card", title: trimmed, body: `${line}\n` };
      continue;
    }

    // If we were in a card and we hit the next card, flush happens above.
    current.body += `${line}\n`;
  }

  flush();
  return steps;
}

function cardChrome(titleLine) {
  // Title line is kept EXACTLY as-is (rendered verbatim below); this just adds decoration.
  const lower = (titleLine ?? "").toLowerCase();
  if (lower.includes("fake links"))
    return { emoji: "🔗", accent: "from-sky-500/25 via-indigo-500/10 to-slate-950/10" };
  if (lower.includes("otp"))
    return { emoji: "🔢", accent: "from-amber-500/25 via-orange-500/10 to-slate-950/10" };
  if (lower.includes("gaming"))
    return { emoji: "🎮", accent: "from-fuchsia-500/25 via-violet-500/10 to-slate-950/10" };
  return { emoji: "🃏", accent: "from-emerald-500/25 via-emerald-500/10 to-slate-950/10" };
}

function stepLabel(step) {
  if (step.kind === "card") return step.title ?? "Scam card";
  if (step.kind === "divider") return step.body;
  const firstLine = step.body.split("\n").find((l) => l.trim().length > 0) ?? "Intro";
  // Keep this as a UI label only (not part of PDF content).
  return firstLine.length > 44 ? `${firstLine.slice(0, 44)}…` : firstLine;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function Act3CommonScams() {
  const steps = splitIntoSteps(ACT3_COMMON_SCAMS_RAW);
  const total = steps.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = steps[clamp(activeIndex, 0, Math.max(0, total - 1))] ?? null;

  useEffect(() => {
    // If content changes, keep index in bounds.
    setActiveIndex((i) => clamp(i, 0, Math.max(0, total - 1)));
  }, [total]);

  const goPrev = useCallback(() => setActiveIndex((i) => clamp(i - 1, 0, total - 1)), [total]);
  const goNext = useCallback(() => setActiveIndex((i) => clamp(i + 1, 0, total - 1)), [total]);

  return (
    <div className="flex h-full min-h-0 bg-slate-950">
      {/* Left rail */}
      <aside className="hidden w-80 shrink-0 border-r border-slate-800 bg-slate-900/60 md:flex md:flex-col">
        <div className="shrink-0 border-b border-slate-800 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">
            Act 3
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-100">
            Common scams
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Words preserved exactly from the PDF
          </p>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto p-2">
          {steps.map((s, i) => {
            const selected = i === activeIndex;
            const label = stepLabel(s);
            return (
              <button
                key={`${s.kind}-${i}-${label}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`w-full rounded-xl px-3 py-2 text-left text-xs transition ${
                  selected
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate">{label}</span>
                  <span
                    className={`shrink-0 font-mono text-[10px] ${
                      selected ? "text-emerald-100" : "text-slate-500"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-slate-800 px-5 py-4">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="font-mono">
              step {activeIndex + 1} / {total}
            </span>
            <span className="text-slate-500">Use ↑↓ + Enter</span>
          </div>
        </div>
      </aside>

      {/* Main stage */}
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0 border-b border-slate-800 bg-slate-950/60 px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                Act 3 · Common scams
              </p>
              <p className="mt-1 truncate text-sm text-slate-300">
                {active ? stepLabel(active) : "—"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={activeIndex === 0}
                className="rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs text-slate-200 disabled:opacity-40"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={activeIndex >= total - 1}
                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-900">
            <div
              className="h-full bg-emerald-500"
              style={{ width: `${total > 0 ? ((activeIndex + 1) / total) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {!active ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-300">
              No content.
            </div>
          ) : active.kind === "divider" ? (
            <div className="flex h-[60vh] items-center justify-center">
              <div className="rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 font-mono text-xs text-slate-300">
                {active.body}
              </div>
            </div>
          ) : active.kind === "card" ? (
            <section
              className={`overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br ${cardChrome(active.title).accent} shadow-2xl`}
            >
              <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-950/40 px-6 py-5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-2xl">
                  {cardChrome(active.title).emoji}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Scam card
                  </p>
                  <p className="truncate text-base font-semibold text-slate-50">
                    {active.title}
                  </p>
                </div>
              </div>
              <div className="px-6 py-5">
                <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-slate-100">
                  {active.body}
                </pre>
              </div>
            </section>
          ) : (
            <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-2xl">
              <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-slate-100">
                {active.body}
              </pre>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

