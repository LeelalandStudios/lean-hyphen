/**
 * Reading-time pause after a message when delayAfterMs is "auto".
 * @param {string} text
 * @returns {number}
 */
export function computeAutoDelayAfter(text) {
  const len = text.length;
  const byReading = 900 + len * 45;
  if (len < 24) return Math.max(1400, byReading);
  if (len < 70) return Math.max(2200, byReading);
  if (len < 140) return Math.max(3500, byReading);
  return Math.max(5000, byReading);
}

/**
 * @param {string} text
 * @param {number|'auto'|undefined} overrideMs
 * @param {number|'auto'} defaultDelay
 * @returns {number}
 */
export function resolveMessageDelayAfter(text, overrideMs, defaultDelay = "auto") {
  if (typeof overrideMs === "number") return overrideMs;
  if (overrideMs === "auto" || defaultDelay === "auto") {
    return computeAutoDelayAfter(text);
  }
  return defaultDelay;
}
