import { describe, it, expect } from "vitest";
import { parseScript, validateScript } from "./parseScript.js";

const SAMPLE = `
---
start: intro
---

## intro
screen: lock
advance: tap
goto: home

## home
screen: home_default
advance: continue
goto: pick

## pick
type: choice
prompt: Choose
options:
  - id: a
    label: Path A
    goto: end_a
    set:
      path: A

## end_a
screen: drawer
`;

describe("parseScript", () => {
  it("parses frontmatter and nodes", () => {
    const script = parseScript(SAMPLE);
    expect(script.start).toBe("intro");
    expect(script.nodes.intro.type).toBe("screen");
    expect(script.nodes.intro.screen).toBe("lock"); // screen: lock in script body
    expect(script.nodes.pick.type).toBe("choice");
    expect(script.nodes.pick.options[0].goto).toBe("end_a");
    expect(script.nodes.pick.options[0].set).toEqual({ path: "A" });
  });

  it("validates gotos", () => {
    const script = parseScript(SAMPLE);
    expect(validateScript(script)).toEqual([]);
  });
});
