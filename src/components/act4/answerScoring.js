/** Normalize free-text answers for keyword matching. */
export function normalizeAnswerText(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[''`]/g, "'")
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {string} text
 * @param {{ id: string, label: string, keywords: string[] }[]} concepts
 * @returns {{ detected: { id: string, label: string }[], missed: { id: string, label: string }[] }}
 */
export function gradeBossAnswer(text, concepts) {
  const normalized = normalizeAnswerText(text);
  const detected = [];
  const missed = [];

  for (const concept of concepts) {
    const hit = concept.keywords.some((kw) => normalized.includes(kw.toLowerCase()));
    if (hit) detected.push({ id: concept.id, label: concept.label });
    else missed.push({ id: concept.id, label: concept.label });
  }

  return { detected, missed };
}

/** @param {number} foundCount */
export function scoreEmailRedFlags(foundCount) {
  if (foundCount >= 4) return 40;
  if (foundCount === 3) return 25;
  if (foundCount === 2) return 10;
  return 0;
}

/** @param {number} correctCount */
export function scoreMatchResponses(correctCount) {
  if (correctCount >= 5) return 40;
  if (correctCount === 4) return 30;
  if (correctCount === 3) return 20;
  return 0;
}

/** @param {number} conceptCount */
export function scoreBossLevel(conceptCount) {
  if (conceptCount >= 3) return 30;
  if (conceptCount === 2) return 20;
  if (conceptCount === 1) return 10;
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
