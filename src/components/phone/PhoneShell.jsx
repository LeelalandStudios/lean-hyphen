/** Fixed-size phone frame for previews (content scrolls inside screens). */
export default function PhoneShell({ children }) {
  return (
    <div className="relative h-[760px] w-[380px] shrink-0 overflow-hidden rounded-[3rem] border-[10px] border-black bg-slate-900 shadow-2xl">
      <div className="absolute left-1/2 top-2 z-50 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />
      <div className="h-full overflow-hidden">{children}</div>
    </div>
  );
}
