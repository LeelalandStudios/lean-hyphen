import { STATIC_SCREENS } from "../content/staticScreens.js";

const SCREEN_BY_ID = Object.fromEntries(
  STATIC_SCREENS.map((entry) => [entry.id, entry])
);

/**
 * @param {string} screenId
 */
export function getScreenEntry(screenId) {
  return SCREEN_BY_ID[screenId] ?? null;
}

export function getAllScreenIds() {
  return STATIC_SCREENS.map((entry) => entry.id);
}
