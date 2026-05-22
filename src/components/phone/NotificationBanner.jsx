export default function NotificationBanner({ data }) {
  if (!data) return null;

  return (
    <div className="absolute left-4 right-4 top-12 z-40 rounded-3xl bg-white/95 p-4 text-slate-900 shadow-xl">
      <div className="text-xs font-bold text-slate-500">{data.app}</div>
      <div className="font-semibold">{data.from}</div>
      <pre className="mt-1 whitespace-pre-wrap font-sans text-sm">{data.body}</pre>
    </div>
  );
}
