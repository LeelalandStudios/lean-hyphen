import AppScreen from "../../components/phone/AppScreen.jsx";

export default function GenericShellApp({ title, emoji, tagline, tiles = [], onBack }) {
  return (
    <AppScreen title={title} appIcon={emoji} onBack={onBack}>
      <div className="p-6">
        {tagline && (
          <p className="mb-6 text-center text-sm text-slate-500">{tagline}</p>
        )}
        {tiles.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {tiles.map(([icon, label]) => (
              <div
                key={label}
                className="rounded-2xl bg-slate-50 py-4 text-center text-xs text-slate-700"
              >
                <div className="text-2xl">{icon}</div>
                <div className="mt-2 font-medium">{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppScreen>
  );
}
