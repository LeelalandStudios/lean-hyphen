import StatusBar from "../components/phone/StatusBar.jsx";

export default function LockScreen({ onUnlock }) {
  return (
    <div className="relative h-full bg-gradient-to-br from-cyan-700 via-blue-900 to-black text-white">
      <StatusBar />
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="text-6xl font-light">3:47</div>
        <div className="text-lg">Saturday</div>
        {onUnlock ? (
          <button
            type="button"
            onClick={onUnlock}
            className="absolute bottom-16 rounded-full bg-white/20 px-8 py-3 text-sm backdrop-blur hover:bg-white/30 active:bg-white/40"
          >
            Swipe up to unlock ↑
          </button>
        ) : (
          <div className="absolute bottom-16 rounded-full bg-white/20 px-8 py-3 text-sm backdrop-blur">
            Swipe up to unlock
          </div>
        )}
      </div>
    </div>
  );
}
