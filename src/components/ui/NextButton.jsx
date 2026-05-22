export default function NextButton({ onClick, label = "Continue" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white shadow-xl"
    >
      {label}
    </button>
  );
}
