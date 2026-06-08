/** @param {number} foundCount */
export function scoreEmailRedFlags(foundCount) {
  if (foundCount >= 4) return 50;
  if (foundCount === 3) return 35;
  if (foundCount === 2) return 15;
  return 0;
}

/** @param {number} correctCount */
export function scoreMatchResponses(correctCount) {
  if (correctCount >= 5) return 50;
  if (correctCount === 4) return 35;
  if (correctCount === 3) return 20;
  return 0;
}

/**
 * @param {number} score
 * @param {{ minScore: number, title: string, shieldLabel: string, copy: string }[]} bands
 */
export function getScoreBand(score, bands) {
  const sorted = [...bands].sort((a, b) => b.minScore - a.minScore);
  return sorted.find((b) => score >= b.minScore) ?? sorted[sorted.length - 1];
}
