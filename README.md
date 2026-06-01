# Phone Scam Education Game

Interactive phone simulation for **Money Safety & Scams — Spot the Scam: Links, OTPs & Gaming Traps**.

Inspired by **A Normal Lost Phone**–style exploration: believable phone UI, story via apps and messages, eventually driven by a markdown script.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Default app vs dev entry points

| URL | What you get |
|-----|----------------|
| `/` | **Lesson app** — sidebar with Act 1–4 (`src/app/LessonApp.jsx`) |
| **`/?index=1`** | **Scene index** — browse and launch every playable scene (live + legacy). Use this to jump straight to Act 1, Act 2, legacy room chat, etc. Code: `src/catalog/SceneIndex.jsx`, registry: `src/catalog/sceneIndex.js`. |
| `/?catalog=1` | **Screen catalog** — static story frames only (`src/catalog/StaticScreenCatalog.jsx`) |

Links to the scene index and screen catalog also appear at the bottom of the lesson sidebar.

## Act 1 — The Hook

Live implementation: `src/app/Act1Hook.jsx` + `src/content/act1Hook.js`.

1. **Black screen** — tap to continue; fake PhonePe security alert types in (notification + typing sounds).
2. **Tap the alert** — opens **🔥 Squad Goals** WhatsApp at 11:47 PM; Kabir's story about Rohan auto-advances.
3. **Transition copy** — chat fades; Rohan framing text (tap).
4. **Hook screen** — responsive phone preview (cropped to half-frame on small windows, full phone when there's room) with blinking Messages badge; **Find out →** starts Act 2.

### Fast forward (Act 1 only)

Dev control — top-right **Fast forward ▶▶** on every Act 1 screen:

| Action | Effect |
|--------|--------|
| **Single click** | Double speed (1× → 2× → 4× …) for delays, typing, and animations |
| **Double click** | Skip to end of the group chat (all messages shown, transition copy) |
| **Long press** (~0.6s) | Reset speed to 1× |

When speed is above 1×, the button label shows e.g. `4× speed`.

## Terminology

| Name | What it is |
|------|------------|
| **Phone Explorer** | Navigable phone OS in **Act 2+**. `src/phone/PhoneExplorer.jsx` |
| **Lesson app** | Default shell: Act 1–4 sidebar. `src/app/LessonApp.jsx` |
| **Scene index** | Dev browser for playable scenes (live + legacy). Entry: **`/?index=1`**. Optional `?scene=<id>` deep-link (e.g. `legacy-act1-room-chat`). Code: `src/catalog/SceneIndex.jsx` + `src/catalog/sceneIndex.js`. |
| **Screen catalog** | Dev browser for individual static story frames. Entry: `/?catalog=1`. Code: `src/catalog/StaticScreenCatalog.jsx`. |
| **Phone Shell** | The physical phone frame (notch, bezel). Shared by both above. Code: `src/components/phone/PhoneShell.jsx`. |

## Build

```bash
npm run build
npm run preview
```

## Development phases

| Phase | Status | What |
|-------|--------|------|
| **1** | Done | Static screen catalog + lesson acts |
| **2** | **Now** | Live Act 1 hook, Act 2 phone scenarios, scene index |
| **3** | Later | Markdown script → sequence engine (`src/engine/`) |

See `docs/ARCHITECTURE.md` and `src/engine/script-format.md`.

## Layout

```
src/
  app/           Lesson acts (Act1Hook, Act2PhoneSimulation, …)
  catalog/       Scene index + static screen catalog
  content/       act1Hook.js, acts.js, script.md, staticScreens.js, …
  screens/       Static / shared screen components
  components/    Phone chrome + WhatsApp shell
  engine/        Phase 3 specs + legacy flow from prototype
  game/          App root (routes ?index=1, ?catalog=1, default lesson)
docs/
  ARCHITECTURE.md
```

## Script source

Authoritative lesson copy: `src/content/script.md` (aligned to *Scam Simulation Script-Phone Version.docx* and `_stash/data/R1 Common Scams.md` for Act 1).
