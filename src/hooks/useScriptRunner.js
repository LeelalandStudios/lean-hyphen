import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { parseScript } from "../engine/parseScript.js";
import { ScriptRunner } from "../engine/ScriptRunner.js";

/**
 * @param {string} markdown
 */
export function useScriptRunner(markdown) {
  const script = useMemo(() => parseScript(markdown), [markdown]);
  const [runner, setRunner] = useState(() => new ScriptRunner(script));
  const [tick, setTick] = useState(0);
  const waitRef = useRef(null);

  useEffect(() => {
    setRunner(new ScriptRunner(script));
    setTick((value) => value + 1);
  }, [script]);

  const view = useMemo(() => runner.getView(), [runner, tick]);

  const bump = useCallback(() => setTick((value) => value + 1), []);

  useEffect(() => {
    if (waitRef.current) {
      clearTimeout(waitRef.current);
      waitRef.current = null;
    }

    const ms = runner.getWaitMs();
    if (ms == null) return;

    waitRef.current = setTimeout(() => {
      runner.completeWait();
      bump();
    }, ms);

    return () => {
      if (waitRef.current) clearTimeout(waitRef.current);
    };
  }, [runner, view.nodeId, bump]);

  const advance = useCallback(() => {
    runner.advance();
    bump();
  }, [runner, bump]);

  const choose = useCallback(
    (optionId) => {
      runner.choose(optionId);
      bump();
    },
    [runner, bump]
  );

  const restart = useCallback(() => {
    runner.restart();
    bump();
  }, [runner, bump]);

  return {
    view,
    vars: runner.state.vars,
    advance,
    choose,
    restart,
    history: runner.state.history,
  };
}
