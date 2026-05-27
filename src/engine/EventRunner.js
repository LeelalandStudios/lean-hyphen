/**
 * @typedef {{ start: string, nodes: Record<string, any> }} ParsedEventScript
 */

export class EventRunner {
  /** @param {ParsedEventScript} script */
  constructor(script) {
    this.script = script;
    this.nodeId = script.start;
    this.history = [];
  }

  /** @returns {any} */
  getNode() {
    return this.script.nodes[this.nodeId] ?? null;
  }

  /** @returns {number | null} */
  getWaitMs() {
    const n = this.getNode();
    if (!n) return null;
    if (n.type === "wait") return Number(n.ms ?? n.wait ?? 0);
    return null;
  }

  /** Advance to next node (goto) */
  goto(nextId) {
    if (!nextId) return;
    this.history.push(this.nodeId);
    this.nodeId = nextId;
  }
}

