import StatusBar from "../../components/phone/StatusBar.jsx";

export default function ChromeApp({ onBack }) {
  return (
    <div className="relative flex h-full flex-col bg-white pt-12 text-slate-900">
      <StatusBar dark />
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 px-3 py-2">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-slate-500"
            aria-label="Back"
          >
            ‹
          </button>
        ) : (
          <span className="text-slate-400">‹</span>
        )}
        <div className="flex flex-1 items-center rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-500">
          Search or type URL
        </div>
        <span className="text-lg">⋮</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            ["📱", "PhonePe"],
            ["💬", "WhatsApp"],
            ["📧", "Gmail"],
            ["📰", "News"],
          ].map(([icon, label]) => (
            <div key={label} className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-xl">
                {icon}
              </div>
              <p className="mt-1 text-[10px] text-slate-600">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400">New tab</p>
      </div>
    </div>
  );
}
