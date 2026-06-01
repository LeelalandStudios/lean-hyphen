import Act1Hook from "../app/Act1Hook.jsx";
import Act1RoomChat from "../app/Act1RoomChat.jsx";
import Act2ScenarioExperience from "../app/Act2ScenarioExperience.jsx";
import Act2PhoneSimulation from "../app/Act2PhoneSimulation.jsx";
import Act3PriyaExplains from "../app/Act3PriyaExplains.jsx";
import Act3KidsInfographic from "../app/Act3KidsInfographic.jsx";
import Act3CommonScams from "../app/Act3CommonScams.jsx";
import Act3Infographic from "../app/Act3Infographic.jsx";
import Act4Challenge from "../app/Act4Challenge.jsx";
import Act4SpotTheIssue from "../app/Act4SpotTheIssue.jsx";
import ScriptDrivenGame from "../game/ScriptDrivenGame.jsx";
import PhoneRuntime from "../game/PhoneRuntime.jsx";

/** @typedef {'live'|'legacy'} SceneStatus */

/**
 * @typedef {Object} SceneEntry
 * @property {string} id
 * @property {string} label
 * @property {SceneStatus} status
 * @property {number|null} act
 * @property {string} summary
 * @property {string} source
 * @property {string|null} [supersededBy]
 * @property {string|null} [supersedes]
 * @property {import('react').ComponentType<any>} [Component]
 * @property {Record<string, unknown>} [props]
 * @property {boolean} [planned]
 */

/**
 * @typedef {Object} SceneSection
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {SceneEntry[]} scenes
 */

const noop = () => {};

/** @type {SceneSection[]} */
export const SCENE_SECTIONS = [
  {
    id: "live",
    title: "Live",
    description: "Scenes wired into the lesson app today.",
    scenes: [
      {
        id: "live-act1-hook",
        label: "Act 1 — The Hook (Rohan story)",
        status: "live",
        act: 1,
        summary:
          "Black screen → WhatsApp Squad Goals at 11:47 PM. Kabir tells Rohan's ₹12,000 PhonePe scam story; transition to 5 waiting messages.",
        source: "src/app/Act1Hook.jsx · src/content/act1Hook.js",
        supersedes: "legacy-act1-room-chat",
        Component: Act1Hook,
        props: { onComplete: noop },
      },
      {
        id: "live-act2-scenarios",
        label: "Act 2 — The Scenarios (5 scored)",
        status: "live",
        act: 2,
        summary:
          "Scored phone scenarios: deepfake giveaway, sextortion threat, OTP theft, fake friend, BGMI admin. Shields and close calls.",
        source: "src/app/Act2ScenarioExperience.jsx · src/content/act2Scenarios.js",
        supersedes: "legacy-act2-phone-simulation",
        Component: Act2ScenarioExperience,
        props: { onComplete: noop },
      },
      {
        id: "live-act3-priya-explains",
        label: "Act 3 — Priya explains the patterns",
        status: "live",
        act: 3,
        summary:
          "Room-style group debrief, three sequential scam cards (markdown sections), urgency outro, handoff to Act 4.",
        source: "src/app/Act3PriyaExplains.jsx · src/content/act3/",
        supersedes: "legacy-act3-kids-infographic",
        Component: Act3PriyaExplains,
        props: { onComplete: noop },
      },
      {
        id: "live-act4-challenge",
        label: "Act 4 — Scam Detective challenge",
        status: "live",
        act: 4,
        summary:
          "Timed challenge: fake link, speed round, email red flags, response matching, boss level, scoreboard, group wrap, 5 rules, safety help.",
        source: "src/app/Act4Challenge.jsx · src/content/act4Challenge.js",
        supersedes: "legacy-act4-spot-the-issue",
        Component: Act4Challenge,
      },
    ],
  },
  {
    id: "legacy",
    title: "Legacy",
    description: "Preserved earlier implementations. Kept in the index when live scenes are replaced.",
    scenes: [
      {
        id: "legacy-act1-room-chat",
        label: "Act 1 — Room chat (Free Fire hook)",
        status: "legacy",
        act: 1,
        summary:
          "Visual-novel room scene. Kabir forwards a Free Fire giveaway; Priya warns and sends the player into the scenarios.",
        source: "src/app/Act1RoomChat.jsx",
        supersededBy: "live-act1-hook",
        Component: Act1RoomChat,
        props: { onComplete: noop },
      },
      {
        id: "legacy-act2-phone-simulation",
        label: "Act 2 — Phone simulation (5 scenarios)",
        status: "legacy",
        act: 2,
        summary:
          "Interactive phone explorer with timed scenarios: PhonePe link, school email, OTP theft, fake friend, fake MLBB admin.",
        source: "src/app/Act2PhoneSimulation.jsx",
        supersededBy: "live-act2-scenarios",
        Component: Act2PhoneSimulation,
      },
      {
        id: "legacy-script-driven",
        label: "Script-driven flow (Act 1 + Scenario 1)",
        status: "legacy",
        act: null,
        summary:
          "Markdown script runner through lock → home → WhatsApp Paytm hook → infographic → PhonePe scenario 1 (three branches). Ends after path debriefs.",
        source: "src/game/ScriptDrivenGame.jsx · src/content/game.script.md",
        Component: ScriptDrivenGame,
      },
      {
        id: "legacy-act3-kids-infographic",
        label: "Act 3 — Kids infographic (flip + PNG)",
        status: "legacy",
        act: 3,
        summary:
          "Wooden-table flip cards revealing PNG infographics for fake links, OTP, and gaming scams.",
        source: "src/app/Act3KidsInfographic.jsx",
        supersededBy: "live-act3-priya-explains",
        Component: Act3KidsInfographic,
      },
      {
        id: "legacy-act3-common-scams",
        label: "Act 3 — Common scams (step-through)",
        status: "legacy",
        act: 3,
        summary:
          "Priya explains three scam cards. Verbatim PDF copy, stepped with prev/next navigation.",
        source: "src/app/Act3CommonScams.jsx",
        Component: Act3CommonScams,
      },
      {
        id: "legacy-act3-infographic",
        label: "Act 3 — Common scams (tabbed layout)",
        status: "legacy",
        act: 3,
        summary:
          "Alternative Act 3 layout: intro + three tabs with parsed card sections (how it works, red flags, examples).",
        source: "src/app/Act3Infographic.jsx",
        Component: Act3Infographic,
      },
      {
        id: "legacy-act4-spot-the-issue",
        label: "Act 4 — Spot the Issue",
        status: "legacy",
        act: 4,
        summary:
          "Tap-the-red-flags mini-game: intro → three puzzle rounds → completion screen.",
        source: "src/app/Act4SpotTheIssue.jsx",
        supersededBy: "live-act4-challenge",
        Component: Act4SpotTheIssue,
      },
      {
        id: "legacy-phone-runtime",
        label: "Phone runtime prototype (Scenario 1 SMS)",
        status: "legacy",
        act: null,
        summary:
          "Event-driven phone shell: free navigation plus injected PhonePe SMS and a choice gate. Prototype only.",
        source: "src/game/PhoneRuntime.jsx · src/content/game.events.md",
        Component: PhoneRuntime,
      },
    ],
  },
];

/** @type {SceneEntry[]} */
export const SCENE_INDEX = SCENE_SECTIONS.flatMap((section) =>
  section.scenes.filter((s) => s.Component)
);

/** @type {Record<string, SceneEntry>} */
export const SCENE_BY_ID = Object.fromEntries(
  SCENE_SECTIONS.flatMap((section) => section.scenes).map((scene) => [scene.id, scene])
);

export const DEFAULT_SCENE_ID = "live-act1-hook";

/**
 * @param {string|null|undefined} sceneId
 * @returns {SceneEntry|null}
 */
export function getPlayableScene(sceneId) {
  const entry = sceneId ? SCENE_BY_ID[sceneId] : null;
  if (!entry || !entry.Component || entry.planned) return null;
  return entry;
}

/**
 * @param {string|null|undefined} sceneId
 * @returns {string}
 */
export function resolveSceneId(sceneId) {
  if (sceneId && SCENE_BY_ID[sceneId]) return sceneId;
  return DEFAULT_SCENE_ID;
}
