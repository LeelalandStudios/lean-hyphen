export default function AppIcon({ emoji, label, badge, badgeCount = 1, badgePulse, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center gap-1 text-white"
    >
      <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/20 text-2xl shadow-lg backdrop-blur">
        {emoji}
        {badge && (
          <span
            className={`absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-xs font-bold ${
              badgePulse ? "animate-[badgeBlink_1.2s_ease-in-out_infinite]" : ""
            }`}
          >
            {badgeCount}
          </span>
        )}
      </div>
      <span className="text-[11px] leading-tight drop-shadow">{label}</span>
    </button>
  );
}
