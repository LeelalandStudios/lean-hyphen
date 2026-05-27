# Architecture — Phone Scam Simulation

Inspired by **A Normal Lost Phone** / **Another Lost Phone** style gameplay: a believable phone UI where story beats unfold through apps, messages, and notifications—driven by a script rather than hard-coded navigation.

## Terminology

| Name | Role |
|------|------|
| **Phone Explorer** | The live, navigable phone OS the player uses: lock → home → apps. Default app entry. `src/phone/PhoneExplorer.jsx` |
| **Screen Catalog** | Dev tool: sidebar + preview of every static story screen. `/?catalog=1` · `src/catalog/StaticScreenCatalog.jsx` |
| **Phone Shell** | Shared phone bezel/frame component. `src/components/phone/PhoneShell.jsx` |

## Three phases

### Phase 1 — Static screens (current)

- Every beat from the Word script has a **fixed, polished screen** (correct apps, icons, copy).
- No story navigation; use the **Static Screen Catalog** in dev to browse all states.
- Source of truth for copy: `src/content/script.md` (aligned to the `.docx`).

### Phase 2 — Dynamic app interfaces (Phone Explorer)

- **Phone Explorer** is the default interface: interactive shells for Messages (inbox → thread), Phone, Chrome, WhatsApp, Free Fire lobby, etc.
- State lives inside each app; story scripts will drive events on top of the Explorer later (Phase 3).

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
  catalog/           Screen Catalog (static screen browser)
  phone/             Phone Explorer + app registry + phoneStore
  engine/            Phase 3 script runners
  game/              App root (Phone Explorer by default)
```
