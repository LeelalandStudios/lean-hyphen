export default function StatusBar({ dark = false, time = "11:47 PM" }) {
  const textColor = dark ? "text-slate-900" : "text-white";

  return (
    <div
      className={`absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-5 pt-3 text-xs ${textColor}`}
    >
      <span className="font-semibold">{time}</span>
      <span className="font-semibold">▴ WiFi 67%</span>
    </div>
  );
}
