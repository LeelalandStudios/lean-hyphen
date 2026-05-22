# Engine (Phase 2 & 3)

Not wired into the app yet. Phase 1 uses `src/catalog/StaticScreenCatalog.jsx`.

## Phase 2 — App runtime

- `AppHost` — which app is foreground (home, messages, chrome, phone, whatsapp, freefire).
- Per-app state machines (e.g. Messages: `inbox` | `thread` | `compose`).
- Shared phone services: notifications, badges, status bar.

## Phase 3 — Script runner

- Parse `src/content/script.md` (or lesson-specific variants).
- Emit events: `show_notification`, `wait`, `open_app`, `choice`, `branch`.
- Map script nodes to static screen ids or dynamic app states.

See `script-format.md` for the planned markdown shape.
