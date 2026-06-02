/** @param {object[]} results */
export function statsFromRoundResults(results) {
  let score = 0;
  let shields = 0;
  let closeCalls = 0;
  for (const r of results) {
    score += r.pointsEarned ?? 0;
    if (r.shieldEarned) shields += 1;
    closeCalls += r.closeCalls ?? 0;
  }
  return { score, shields, closeCalls };
}
