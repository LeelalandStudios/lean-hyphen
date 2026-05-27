import { validateScript } from "./parseScript.js";

/**
 * @typedef {import('./parseScript.js').ParsedScript} ParsedScript
 * @typedef {import('./parseScript.js').ScriptNode} ScriptNode
 */

/**
 * @typedef {object} RunnerState
 * @property {string} nodeId
 * @property {Record<string, string>} vars
 * @property {string | null} backdropScreenId
 * @property {Record<string, unknown> | null} backdropProps
 * @property {string[]} history
 */

/**
 * @typedef {object} RunnerView
 * @property {'screen' | 'choice' | 'end' | 'error'} mode
 * @property {string | null} screenId
 * @property {Record<string, unknown>} screenProps
 * @property {import('./parseScript.js').ScriptOption[] | null} choices
 * @property {string | null} choicePrompt
 * @property {'tap' | 'continue' | null} advance
 * @property {string | null} error
 * @property {string} nodeId
 */

export class ScriptRunner {
  /** @param {ParsedScript} script */
  constructor(script) {
    this.script = script;
    const errors = validateScript(script);
    if (errors.length > 0) {
      throw new Error(`Invalid script:\n${errors.join("\n")}`);
    }
    /** @type {RunnerState} */
    this.state = {
      nodeId: script.start,
      vars: {},
      backdropScreenId: null,
      backdropProps: null,
      history: [],
    };
    this._enterNode(script.start, { initial: true });
  }

  /** @returns {RunnerView} */
  getView() {
    const node = this.script.nodes[this.state.nodeId];
    if (!node) {
      return {
        mode: "error",
        screenId: null,
        screenProps: {},
        choices: null,
        choicePrompt: null,
        advance: null,
        error: `Unknown node "${this.state.nodeId}"`,
        nodeId: this.state.nodeId,
      };
    }

    if (node.type === "choice") {
      const screenId = node.screen ?? this.state.backdropScreenId;
      return {
        mode: "choice",
        screenId,
        screenProps: this.state.backdropProps ?? {},
        choices: node.options,
        choicePrompt: node.prompt ?? "What do you do?",
        advance: null,
        error: null,
        nodeId: node.id,
      };
    }

    if (node.type === "screen") {
      return {
        mode: "screen",
        screenId: node.screen,
        screenProps: node.props ?? {},
        choices: null,
        choicePrompt: null,
        advance:
          node.advance === "tap"
            ? "tap"
            : node.advance === "continue"
              ? "continue"
              : null,
        error: null,
        nodeId: node.id,
      };
    }

    return {
      mode: "screen",
      screenId: this.state.backdropScreenId,
      screenProps: this.state.backdropProps ?? {},
      choices: null,
      choicePrompt: null,
      advance: null,
      error: null,
      nodeId: node.id,
    };
  }

  /** User tapped to continue on a screen node. */
  advance() {
    const node = this.script.nodes[this.state.nodeId];
    if (!node || node.type !== "screen") return;
    if (node.goto) this._enterNode(node.goto);
  }

  /**
   * @param {string} optionId
   */
  choose(optionId) {
    const node = this.script.nodes[this.state.nodeId];
    if (!node || node.type !== "choice") return;

    const option =
      node.options.find((item) => item.id === optionId) ??
      node.options.find((item) => item.label === optionId) ??
      node.options[Number(optionId)];

    if (!option) return;

    if (option.set) {
      this.state.vars = { ...this.state.vars, ...option.set };
    }

    this._enterNode(option.goto);
  }

  /**
   * @param {string} nodeId
   * @param {{ initial?: boolean }} [options]
   */
  _enterNode(nodeId, options = {}) {
    if (!options.initial) {
      this.state.history.push(this.state.nodeId);
    }
    this.state.nodeId = nodeId;

    let node = this.script.nodes[nodeId];
    let guard = 0;

    while (node && guard < 32) {
      guard += 1;

      if (node.type === "set") {
        this.state.vars = { ...this.state.vars, ...node.vars };
        if (!node.goto) break;
        this.state.nodeId = node.goto;
        node = this.script.nodes[node.goto];
        continue;
      }

      if (node.type === "if") {
        const next = this._resolveIf(node) ?? node.else;
        if (!next) break;
        this.state.nodeId = next;
        node = this.script.nodes[next];
        continue;
      }

      if (node.type === "wait") {
        break;
      }

      if (node.type === "screen") {
        this.state.backdropScreenId = node.screen;
        this.state.backdropProps = node.props ?? {};
        if (node.advance === "auto" && node.goto) {
          this.state.nodeId = node.goto;
          node = this.script.nodes[node.goto];
          continue;
        }
        if (node.advance === "choice" && node.goto) {
          this.state.nodeId = node.goto;
          node = this.script.nodes[node.goto];
          continue;
        }
        break;
      }

      if (node.type === "choice") {
        if (node.screen) {
          this.state.backdropScreenId = node.screen;
        }
        break;
      }

      break;
    }
  }

  /**
   * @param {import('./parseScript.js').IfNode} node
   */
  _resolveIf(node) {
    const match = node.when.match(/^([a-zA-Z0-9_]+)\s*==\s*"?([^"]+)"?$/);
    if (!match) return node.goto;
    const [, key, expected] = match;
    return this.state.vars[key] === expected ? node.goto : null;
  }

  /**
   * After a wait node timer fires.
   */
  completeWait() {
    const node = this.script.nodes[this.state.nodeId];
    if (node?.type === "wait" && node.goto) {
      this._enterNode(node.goto);
    }
  }

  /** @returns {number | null} */
  getWaitMs() {
    const node = this.script.nodes[this.state.nodeId];
    return node?.type === "wait" ? node.ms : null;
  }

  restart() {
    this.state = {
      nodeId: this.script.start,
      vars: {},
      backdropScreenId: null,
      backdropProps: null,
      history: [],
    };
    this._enterNode(this.script.start, { initial: true });
  }
}
