import AppScreen from "../../components/phone/AppScreen.jsx";

const RECENT_CALLS = [
  { name: "Mom", number: "+91 98765 43210", time: "Yesterday", type: "incoming" },
  { name: "School Office", number: "+91 11 2345 6789", time: "Mon", type: "missed" },
  { name: "Unknown", number: "+91 93333 22211", time: "Sun", type: "missed" },
];

export default function PhoneApp({ onBack }) {
  return (
    <AppScreen title="Call log" appIcon="📞" onBack={onBack}>
      <div className="divide-y divide-slate-100">
        {RECENT_CALLS.map((call) => (
          <div key={call.number} className="flex items-center gap-4 p-4">
            <span className="text-xl">{call.type === "missed" ? "📵" : "📲"}</span>
            <div className="min-w-0 flex-1">
              <p
                className={`font-semibold ${call.type === "missed" ? "text-red-600" : "text-slate-900"}`}
              >
                {call.name}
              </p>
              <p className="text-sm text-slate-500">{call.number}</p>
            </div>
            <span className="text-xs text-slate-400">{call.time}</span>
          </div>
        ))}
      </div>
    </AppScreen>
  );
}
