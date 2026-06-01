/**
 * @param {{
 *   children: import('react').ReactNode,
 *   onClick?: () => void,
 *   variant?: 'primary' | 'secondary' | 'danger' | 'success',
 *   disabled?: boolean,
 *   className?: string,
 *   type?: 'button' | 'submit',
 * }} props
 */
export default function ChallengeButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
}) {
  const variants = {
    primary:
      "bg-amber-400 text-slate-950 hover:bg-amber-300 disabled:bg-slate-700 disabled:text-slate-500",
    secondary:
      "border border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700 disabled:opacity-50",
    danger: "bg-red-600 text-white hover:bg-red-500 disabled:opacity-50",
    success: "bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-5 py-3 text-sm font-bold transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
