import { DRAWER_APP_ROWS } from "../content/constants.js";
import AppIcon from "../components/phone/AppIcon.jsx";
import StatusBar from "../components/phone/StatusBar.jsx";

export default function DrawerScreen({ onGoHome, onOpenApp }) {
  return (
    <div className="relative h-full bg-slate-950 p-7 pt-16 text-white">
      <StatusBar />
      <div className="text-center text-sm text-white/60">All apps</div>

      <div className="mt-8 space-y-7">
        {DRAWER_APP_ROWS.map((row, rowIndex) => (
          <div className="grid grid-cols-3 gap-6" key={rowIndex}>
            {row.map((app) => (
              <AppIcon
                key={app.id}
                emoji={app.emoji}
                label={app.label}
                onClick={onOpenApp ? () => onOpenApp(app.id) : undefined}
              />
            ))}
          </div>
        ))}
      </div>

      {onGoHome ? (
        <button
          type="button"
          onClick={onGoHome}
          className="absolute bottom-8 left-0 right-0 text-center text-xs text-white/50 hover:text-white/70"
        >
          Swipe down for home ↓
        </button>
      ) : (
        <p className="absolute bottom-8 left-0 right-0 text-center text-xs text-white/50">
          Come back to home screen
        </p>
      )}
    </div>
  );
}
