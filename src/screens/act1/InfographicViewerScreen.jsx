import {
  INFOGRAPHIC_FILENAME,
  INFOGRAPHIC_SRC,
} from "../../content/act1Scene2.js";
import StatusBar from "../../components/phone/StatusBar.jsx";

/** Full-screen infographic viewer inside the phone (static). */
export default function InfographicViewerScreen() {
  return (
    <div className="relative flex h-full flex-col bg-[#1a1a2e] pt-12 text-white">
      <StatusBar />
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="text-sm text-white/70">‹ Back to chat</span>
        <span className="text-sm font-semibold">SPOT THE SCAM!</span>
        <span className="text-lg">⋮</span>
      </header>

      <div className="flex-1 overflow-y-auto p-3">
        <img
          src={INFOGRAPHIC_SRC}
          alt="Spot the Scam educational infographic"
          className="w-full rounded-lg shadow-2xl"
        />
      </div>

      <footer className="space-y-2 border-t border-white/10 bg-black/40 p-4">
        <button
          type="button"
          className="w-full rounded-xl bg-[#25d366] py-3 font-semibold text-white"
        >
          Save to phone
        </button>
        <p className="text-center text-[10px] text-white/50">
          {INFOGRAPHIC_FILENAME} · Downloads folder (static)
        </p>
      </footer>
    </div>
  );
}
