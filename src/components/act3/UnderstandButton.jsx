import { useEffect, useState } from "react";

const DEFAULT_BG = "#f1f5f9";

const TIERS = [
  { fill: "#38bdf8", bg: "#0ea5e9", border: "#0284c7" },
  { fill: "#0ea5e9", bg: "#0284c7", border: "#0369a1" },
  { fill: "#0284c7", bg: "#0369a1", border: "#075985" },
];

const FILL_MS = 1300;
const PAUSE_MS = 100;

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function animateFill(onProgress, durationMs) {
  return new Promise((resolve) => {
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      onProgress(t * 100);
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

function Stars({ count }) {
  if (count <= 0) return null;
  return (
    <span className="ml-2 inline-flex text-white drop-shadow-sm" aria-hidden>
      {"★".repeat(count)}
    </span>
  );
}

function UnderstandLabel({ stars }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap">
      <span>Understand</span>
      <Stars count={stars} />
    </span>
  );
}

/**
 * @param {{ ready: boolean, onConfirm: (stars: number) => void }} props
 */
export default function UnderstandButton({ ready, onConfirm }) {
  const [stars, setStars] = useState(0);
  const [fillPct, setFillPct] = useState(0);
  const [tierIndex, setTierIndex] = useState(0);
  const [bgColor, setBgColor] = useState(DEFAULT_BG);

  useEffect(() => {
    if (!ready) {
      setStars(0);
      setFillPct(0);
      setTierIndex(0);
      setBgColor(DEFAULT_BG);
      return undefined;
    }

    let cancelled = false;

    (async () => {
      setStars(0);
      setFillPct(0);
      setTierIndex(0);
      setBgColor(DEFAULT_BG);

      for (let i = 0; i < TIERS.length; i += 1) {
        if (cancelled) return;
        setTierIndex(i);
        setFillPct(0);
        await animateFill((p) => {
          if (!cancelled) setFillPct(p);
        }, FILL_MS);
        if (cancelled) return;

        setFillPct(100);
        await sleep(PAUSE_MS);
        if (cancelled) return;

        setBgColor(TIERS[i].bg);
        setStars(i + 1);
        setFillPct(0);
        await sleep(40);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ready]);

  const activeTier = TIERS[tierIndex] ?? TIERS[0];
  const showHose = fillPct > 0;
  const label =
    stars === 0
      ? "Understand"
      : `Understand, ${stars} ${stars === 1 ? "star" : "stars"}`;
  const onDarkBg = stars > 0;
  const borderColor = stars > 0 ? TIERS[stars - 1].border : "#cbd5e1";

  if (!ready) {
    return (
      <div className="w-full overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-2.5">
        <p className="px-4 text-center text-sm font-semibold text-slate-400">Keep reading…</p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onConfirm(stars)}
      className="group relative mx-auto block w-full max-w-[360px] overflow-hidden rounded-xl border-2 py-2.5 shadow-md transition-[box-shadow,transform,filter] duration-200 hover:brightness-[1.03] active:scale-[0.99]"
      style={{ backgroundColor: bgColor, borderColor }}
      aria-label={`${label}, ${stars} of 3 stars unlocked`}
    >
      {showHose && (
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${fillPct}%` }}
        >
          <div
            className="act3-hose-fill h-full w-[220%] min-w-full"
            style={{
              background: `linear-gradient(90deg, ${activeTier.fill} 0%, ${activeTier.fill} 38%, ${activeTier.fill}dd 62%, ${activeTier.fill} 100%)`,
            }}
          />
          <div
            className="absolute -right-6 top-1/2 h-16 w-14 -translate-y-1/2 rounded-[50%] blur-sm"
            style={{ backgroundColor: activeTier.fill }}
          />
          <div className="act3-hose-shine absolute right-0 top-0 bottom-0 w-14" />
        </div>
      )}

      <div className="relative z-10 flex min-h-6 items-center justify-center overflow-hidden px-4">
        <span
          className={`inline-flex items-center whitespace-nowrap text-base font-black ${
            onDarkBg ? "text-white drop-shadow-sm" : "text-slate-800"
          }`}
        >
          <UnderstandLabel stars={stars} />
        </span>
      </div>
    </button>
  );
}
