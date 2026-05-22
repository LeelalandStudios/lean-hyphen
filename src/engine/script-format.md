# Planned script format (Phase 3)

Lessons would be authored as markdown with fenced blocks or frontmatter. Example sketch:

```markdown
# Act 1 — Paytm trap

## scene lock
type: lock

## scene home_intro
type: home
variant: default

## scene home_paytm
type: home
variant: paytm_notice
notification:
  app: Messages
  from: +91 91234 56789
  body: |
    🎉 You have won ₹3,000 Paytm cash!
badge: messages

## choice paytm_link
type: overlay
prompt: should I tap it or not
options:
  - label: Tap the link
    goto: chrome_paytm_captured
  - label: Do not tap it
    goto: messages_delete_confirm
```

The runner would:

1. Parse scenes and edges.
2. Resolve `type` → screen component or app state.
3. Execute `wait`, `notification`, `choice` steps in order.

This file is a design stub only; the parser is not implemented yet.
