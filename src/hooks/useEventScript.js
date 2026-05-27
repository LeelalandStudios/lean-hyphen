import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { parseEventScript } from "../engine/eventScript.js";
import { EventRunner } from "../engine/EventRunner.js";

/**
 * Drives the phone store by running event nodes sequentially.
 * It does NOT control navigation — the player can use the phone freely.
 *
 * @param {string} markdown
 * @param {{ phone: any }} deps
 */
export function useEventScript(markdown, deps) {
  const script = useMemo(() => parseEventScript(markdown), [markdown]);
  const runnerRef = useRef(null);
  const [tick, setTick] = useState(0);
  const bump = useCallback(() => setTick((t) => t + 1), []);

  if (!runnerRef.current) runnerRef.current = new EventRunner(script);

  useEffect(() => {
    runnerRef.current = new EventRunner(script);
    bump();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script.start]);

  const runner = runnerRef.current;
  const node = runner.getNode();

  useEffect(() => {
    if (!node) return;

    const { phone } = deps;
    if (!phone) return;

    // Wait nodes schedule themselves.
    if (node.type === "wait") return;

    if (node.type === "notify") {
      phone.api.notify({
        appId: node.appId ?? "unknown",
        appLabel: node.appLabel ?? String(node.appId ?? "App"),
        from: node.from ?? "",
        body: node.body ?? "",
      });
      runner.goto(node.goto);
      bump();
      return;
    }

    if (node.type === "sms.receive") {
      phone.api.receiveSms({
        threadId: node.threadId ?? "unknown",
        from: node.from ?? "Unknown",
        body: node.body ?? "",
      });
      if (node.notifyAppId || node.notifyBody) {
        phone.api.notify({
          appId: node.notifyAppId ?? "messages",
          appLabel: node.notifyAppLabel ?? "📱 Messages",
          from: node.notifyFrom ?? (node.from ?? "Unknown"),
          body: node.notifyBody ?? (node.body ?? ""),
        });
      }
      runner.goto(node.goto);
      bump();
      return;
    }

    if (node.type === "choice") {
      // Choice gate is opened and we pause until user selects.
      if (!phone.state.choiceGateId) {
        phone.api.openChoiceGate({
          id: node.id,
          prompt: node.prompt ?? "What do you do?",
          options: node.options ?? [],
        });
      }
      return;
    }

    if (node.type === "set") {
      phone.api.setVars(node.vars ?? {});
      runner.goto(node.goto);
      bump();
      return;
    }

    if (node.type === "if") {
      const key = String(node.when ?? "").split("==")[0]?.trim();
      const expected = String(node.when ?? "")
        .split("==")[1]
        ?.trim()
        ?.replace(/^\"|\"$/g, "");
      const actual = phone.state.vars[key];
      runner.goto(actual === expected ? node.goto : node.else);
      bump();
      return;
    }

    // Unknown/noop: just advance if it has goto.
    if (node.goto) {
      runner.goto(node.goto);
      bump();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.id, tick, deps.phone?.state.choiceGateId]);

  // Special: allow "wait_for_open" style nodes to advance based on signals.
  useEffect(() => {
    if (!node) return;
    const { phone } = deps;
    if (!phone) return;
    if (node.type !== "wait") return;
    if (node.untilSignal && phone.state.signals[node.untilSignal]) {
      runner.goto(node.goto);
      bump();
    }
  }, [node?.id, deps.phone?.state.signals, node, runner, bump, deps]);

  // Wait timer
  useEffect(() => {
    const ms = runner.getWaitMs();
    if (ms == null) return;
    if (!node || node.type !== "wait") return;
    if (!node.goto) return;
    if (node.untilSignal) return;

    const t = setTimeout(() => {
      runner.goto(node.goto);
      bump();
    }, ms);

    return () => clearTimeout(t);
  }, [node?.id, node?.goto, runner, bump, node]);

  const onChoice = useCallback(
    (optionId) => {
      const gate = deps.phone.state.choiceGate;
      const picked = gate?.options?.find((o) => o.id === optionId);
      deps.phone.api.choose(optionId);
      if (picked?.goto) runner.goto(picked.goto);
      else if (node?.goto) runner.goto(node.goto);
      bump();
    },
    [deps.phone, runner, node, bump]
  );

  return { node, onChoice };
}

