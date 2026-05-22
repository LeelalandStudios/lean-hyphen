export default function Bubble({ children, mine = false }) {
  const alignment = mine
    ? "ml-auto bg-blue-600 text-white"
    : "mr-auto bg-white text-slate-900";

  return (
    <div className={`${alignment} max-w-[85%] rounded-2xl p-3 shadow`}>
      {children}
    </div>
  );
}
