import ScoreHud from "./ScoreHud.jsx";

/**
 * @param {{
 *   score: number,
 *   shields: number,
 *   closeCalls: number,
 *   children: import('react').ReactNode,
 *   showHud?: boolean,
 * }} props
 */
export default function ChallengeShell({
  score,
  shields,
  closeCalls,
  children,
  showHud = true,
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent">
      {showHud && <ScoreHud score={score} shields={shields} closeCalls={closeCalls} />}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  );
}
