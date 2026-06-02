import { describe, it, expect } from "vitest";
import { parseChatFile, tryParseChatFile } from "./parseChatFile.js";
import { normalizeChatDefinition } from "./normalizeChatDefinition.js";

const SAMPLE_YAML = `
id: test-chat
type: whatsapp-chat
header:
  title: Squad Goals
  currentTime: 11:47 PM
senders:
  Kabir:
    color: "#e542a3"
beats:
  - type: message
    sender: Kabir
    text: hello
  - type: typing
    durationMs: 1000
  - type: pause
    ms: 500
  - type: divider
    label: Today
  - type: forwarded
    sender: Kabir
    body: forwarded text
  - type: link
    sender: Kabir
    title: Game
    url: example.com
`;

describe("parseChatFile", () => {
  it("parses YAML into a normalized chat definition", () => {
    const chat = parseChatFile(SAMPLE_YAML);
    expect(chat.id).toBe("test-chat");
    expect(chat.type).toBe("whatsapp-chat");
    expect(chat.header.title).toBe("Squad Goals");
    expect(chat.header.currentTime).toBe("11:47 PM");
    expect(chat.senders.Kabir.color).toBe("#e542a3");
    expect(chat.beats).toHaveLength(6);
    expect(chat.beats[0]).toMatchObject({ type: "message", sender: "Kabir", text: "hello" });
    expect(chat.beats[1]).toMatchObject({ type: "typing", durationMs: 1000 });
    expect(chat.beats[2]).toMatchObject({ type: "pause", durationMs: 500 });
  });

  it("parses markdown frontmatter wrapper", () => {
    const wrapped = `---
id: md-chat
type: whatsapp-chat
header:
  title: From Markdown
senders:
  Priya:
    color: "#25d366"
beats:
  - sender: Priya
    text: hi from md
---
## beats
- ignored shorthand for now
`;
    const chat = parseChatFile(wrapped);
    expect(chat.id).toBe("md-chat");
    expect(chat.beats[0]).toMatchObject({ type: "message", sender: "Priya", text: "hi from md" });
  });

  it("applies default settings", () => {
    const chat = parseChatFile(SAMPLE_YAML);
    expect(chat.settings.autoStart).toBe(true);
    expect(chat.settings.defaultMessageDelayMs).toBe("auto");
    expect(chat.settings.encryptedNotice).toBe(true);
  });

  it("reports unknown beat types", () => {
    const bad = `
id: bad
type: whatsapp-chat
header:
  title: Test
senders:
  Kabir: {}
beats:
  - type: explode
    sender: Kabir
`;
    const result = tryParseChatFile(bad);
    expect(result.definition).toBeNull();
    expect(result.errors[0]).toMatch(/unknown/i);
  });

  it("requires header title", () => {
    const bad = `
id: bad
type: whatsapp-chat
header: {}
senders:
  Kabir: {}
beats: []
`;
    expect(() => parseChatFile(bad)).toThrow(/header.title/i);
  });

  it("requires known sender on message beats", () => {
    const bad = `
id: bad
type: whatsapp-chat
header:
  title: Test
senders:
  Kabir: {}
beats:
  - type: message
    sender: Unknown
    text: hi
`;
    expect(() => parseChatFile(bad)).toThrow(/unknown sender/i);
  });

  it("normalizes game_link alias to link", () => {
    const chat = normalizeChatDefinition({
      id: "x",
      type: "whatsapp-chat",
      header: { title: "T" },
      senders: { A: { color: "#000" } },
      beats: [{ type: "game_link", sender: "A", title: "T", url: "u" }],
    });
    expect(chat.beats[0].type).toBe("link");
  });
});
