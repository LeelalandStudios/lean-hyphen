import { RENDERABLE_BEAT_TYPES } from "./chatSchema.js";

/**
 * @typedef {import("../components/chat/ChatBubbleRenderer.jsx").RenderableMessage} RenderableMessage
 */

/**
 * @param {import("./chatSchema.js").ChatBeat} beat
 * @returns {RenderableMessage | null}
 */
export function beatToRenderable(beat) {
  if (!RENDERABLE_BEAT_TYPES.has(beat.type)) return null;
  return { ...beat };
}

/**
 * @param {import("./chatSchema.js").ChatBeat[]} beats
 * @returns {RenderableMessage[]}
 */
export function beatsToMessages(beats) {
  return beats
    .map((beat, index) => {
      const renderable = beatToRenderable(beat);
      if (!renderable) return null;
      return { ...renderable, id: `static-${index}` };
    })
    .filter(Boolean);
}

/**
 * @param {import("./chatSchema.js").ChatBeat} beat
 * @param {number} index
 * @param {string} [defaultTime]
 * @returns {RenderableMessage | null}
 */
export function beatToMessage(beat, index, defaultTime) {
  const renderable = beatToRenderable(beat);
  if (!renderable) return null;
  return {
    ...renderable,
    id: `msg-${index}`,
    time: renderable.time ?? defaultTime,
  };
}
