# Architecture — Phone Scam Simulation

Inspired by **A Normal Lost Phone** / **Another Lost Phone** style gameplay: a believable phone UI where story beats unfold through apps, messages, and notifications—driven by a script rather than hard-coded navigation.

## Three phases

### Phase 1 — Static screens (current)

- Every beat from the Word script has a **fixed, polished screen** (correct apps, icons, copy).
- No story navigation; use the **Static Screen Catalog** in dev to browse all states.
- Source of truth for copy: `src/content/script.md` (aligned to the `.docx`).

### Phase 2 — Dynamic app interfaces

- Apps become interactive shells: Messages (inbox → thread), Phone (incoming call UI), Chrome (fake pages), WhatsApp, Free Fire lobby.
- State lives inside each app; transitions are still manual or catalog-driven until Phase 3.

### Phase 3 — Script-driven flow

- A markdown (or similar) file defines the full sequence: scenes, notifications, choices, branches.
- A small **engine** parses the script and drives which screen/app state to show (see `src/engine/README.md`).

## Long Lost Phone parallels

| Lost Phone pattern | Our simulation |
|--------------------|----------------|
| Lock → home → apps | `lock`, `home_*`, `drawer` |
| Notifications open apps | `home_*_notification` → Messages |
| Messages as evidence | Paytm, delivery, OTP threads |
| Browser fake sites | Chrome Paytm / Amazon pages |
| Chat apps | WhatsApp (OTP reward, gaming spam) |
| In-app / meta UI | Free Fire lobby, ban overlay, APK flow |

## Repo map

```
src/
  content/           script.md, copy, constants, static screen registry
  components/        phone chrome + shared UI
  screens/           one file per static screen (presentational)
  catalog/           Phase 1 screen browser
  engine/            Phase 2–3 (stubs + format spec)
  game/              root shell (catalog for now)
```
