import StatusBar from "../../phone/StatusBar.jsx";

/** YouTube-style deepfake giveaway notification. */
export default function YouTubeDeepfakeScreen() {
  return (
    <div className="relative flex h-full flex-col bg-[#0f0f0f] pt-12 text-white">
      <StatusBar />
      <header className="flex shrink-0 items-center gap-2 border-b border-white/10 px-3 pb-2">
        <span className="text-lg font-bold text-red-500">▶</span>
        <span className="text-sm font-semibold">YouTube</span>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="overflow-hidden rounded-xl bg-[#212121]">
          <div className="relative aspect-video bg-gradient-to-br from-blue-900 via-slate-800 to-emerald-900">
            <div className="absolute inset-0 flex items-end justify-center bg-black/20">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-4xl">
                🏏
              </div>
            </div>
            <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              Live
            </span>
          </div>

          <div className="p-3">
            <h1 className="text-sm font-bold leading-snug">
              Giving away ₹10,000 to 100 fans RIGHT NOW — limited time only!
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 text-xs font-bold">
                VK
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">Virat Kohli Official</p>
                <p className="text-[10px] text-white/50">200 subscribers · 3 videos</p>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-white/70">
              To celebrate 100M subscribers, I&apos;m giving back to my fans. Click the
              link, register with your UPI ID, and receive ₹10,000 directly. First 100
              fans only.
            </p>
            <p className="mt-2 break-all text-[11px] font-semibold text-blue-400">
              → virat-kohli-giveaway.in/claim
            </p>
            <p className="mt-1 text-[11px] font-bold text-amber-400">
              ⏰ 87 spots left
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
