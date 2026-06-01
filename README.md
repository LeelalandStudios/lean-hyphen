# Phone Scam Education Game

Interactive lesson for **Money Safety & Scams — Spot the Scam: Links, OTPs & Gaming Traps** (grades 7–8).

Inspired by **A Normal Lost Phone**–style exploration: believable phone UI, story through apps and messages, with acts wired in a sidebar lesson app.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Entry points

| URL | What you get |
|-----|----------------|
| `/` | **Lesson app** — sidebar Acts 1–4 (`src/app/LessonApp.jsx`). Completing an act advances to the next (`?act=act2`, etc.). |
| `/?index=1` | **Scene index** — launch any live or legacy scene. Optional `?scene=<id>` (e.g. `live-act3-priya-explains`, `legacy-act2-phone-simulation`). |
| `/?catalog=1` | **Screen catalog** — browse static story frames only. |

Dev links to the scene index and screen catalog are at the bottom of the lesson sidebar.

## Lesson flow (live)

| Act | Component | Status |
|-----|-----------|--------|
| **1 — The Hook** | `Act1Hook.jsx` | Live |
| **2 — The Scenarios** | `Act2ScenarioExperience.jsx` | Live |
| **3 — Priya explains** | `Act3PriyaExplains.jsx` | Live |
| **4 — Spot the Issue** | `Act4SpotTheIssue.jsx` | Placeholder in lesson app; playable via scene index |

Design target for Acts 1–4: `src/content/script_v2.md`. Older notes: `src/content/script.md`.

---

### Act 1 — The Hook

`src/app/Act1Hook.jsx` · `src/content/act1Hook.js`

1. **Black screen** — tap to continue; fake PhonePe security alert types in.
2. **Tap the alert** — **🔥 Squad Goals** WhatsApp at 11:47 PM; Kabir’s story about cousin Rohan (₹12,000 PhonePe scam) auto-advances.
3. **Transition** — chat fades; framing copy (tap).
4. **Hook screen** — phone preview with Messages badge; **Find out →** starts Act 2.

**Fast forward** (top-right on every Act 1 screen): single click = faster delays/typing (1× → 2× → 4× …); double click = skip to end of chat; long press (~0.6s) = reset to 1×.

---

### Act 2 — The Scenarios

`src/app/Act2ScenarioExperience.jsx` · `src/content/act2Scenarios.js`

Five scored phone scenarios aligned with `script_v2`: deepfake celebrity giveaway, sextortion threat, OTP theft, fake-friend impersonation, in-game admin scam. Header tracks **shields** and **close calls**. Wrong choices can retry; good choices earn a shield.

Legacy alternative: `Act2PhoneSimulation.jsx` (older PhonePe / school-email flow) — scene index only.

---

### Act 3 — Priya explains the patterns

`src/app/Act3PriyaExplains.jsx` · `src/content/act3/`

1. **Room-style dialogue** — Squad Goals debrief (same bottom dialogue pattern as legacy `Act1RoomChat.jsx`, no room background image).
2. **Table** — three scam cards dealt one-by-one onto the wood table (face-down), then unlocked in order.
3. **Tap a card** — expands to center; markdown sections fade in (`src/content/act3/cards/*.md`).
4. **Understand** — compact horizontal “hose” fill using blue shades; label stays centered; stars are white. The button can be clicked at 0–3 stars. More stars add more progress.
5. **Progress** — the main progress rail tracks earned stars (`0/9 ★` through `9/9 ★`), not just completed cards. Zero-star completion still unlocks the next card.
6. **Outro** — after all cards are completed, Act 3 enters the group-chat ending sequence under **The pattern**. Priya names urgency as the underlying trick, Kabir sends it to Rohan, and **Test yourself →** goes to Act 4.

Temporary dev control: while on the scam-card table, the top-right **Dev: ending** button skips directly to the Act 3 ending sequence for review.

Supporting UI: `src/components/act3/` (`Act3CardTable`, `ScamCardDeck`, `UnderstandButton`, …).

---

### Act 4 — Spot the Issue

`src/app/Act4SpotTheIssue.jsx` — tap red flags in three rounds (email, OTP SMS, fake game admin). Wired in the lesson sidebar as coming soon; fully playable from `/?index=1` → **legacy-act4-spot-the-issue**.

---

## Legacy scenes (scene index)

Preserved for comparison and reuse:

| ID | What |
|----|------|
| `legacy-act1-room-chat` | Free Fire giveaway room chat hook |
| `legacy-act2-phone-simulation` | Phone Explorer + 5 older scenarios |
| `legacy-act3-kids-infographic` | Flip cards + PNG infographics |
| `legacy-act3-common-scams` | PDF step-through |
| `legacy-act3-infographic` | Tabbed card layout |
| `legacy-act4-spot-the-issue` | Red-flag mini-game |
| `legacy-script-driven` | Early markdown script runner |
| `legacy-phone-runtime` | PhonePe SMS prototype |

Registry: `src/catalog/sceneIndex.js`.

## Terminology

| Name | What it is |
|------|------------|
| **Lesson app** | Default shell with Act 1–4 sidebar. `src/app/LessonApp.jsx` |
| **Phone Explorer** | Navigable phone OS (legacy Act 2). `src/phone/PhoneExplorer.jsx` |
| **Scene index** | Dev browser for live + legacy scenes. `/?index=1` · `src/catalog/SceneIndex.jsx` |
| **Screen catalog** | Static story frames. `/?catalog=1` · `src/catalog/StaticScreenCatalog.jsx` |
| **Phone Shell** | Shared phone bezel. `src/components/phone/PhoneShell.jsx` |

## Build

```bash
npm run build
npm run preview
```

## Development phases

| Phase | Status | What |
|-------|--------|------|
| **1** | Done | Static screen catalog + lesson acts |
| **2** | **Now** | Live Acts 1–3, Act 2 v2 scenarios, Act 3 pattern cards |
| **3** | Later | Markdown script engine for full `script_v2` flow (`src/engine/`) |

See `docs/ARCHITECTURE.md` and `src/engine/script-format.md`.

## Repo layout

```
src/
  app/              Lesson acts (Act1Hook, Act2ScenarioExperience, Act3PriyaExplains, …)
  catalog/          Scene index + static screen catalog
  components/
    act3/           Scam cards, Understand button, table overlay
    room/           RoomDialogue (shared with legacy Act 1 room)
    phone/          Phone chrome
  content/
    act1Hook.js
    act2Scenarios.js
    act3/           Intro/outro scripts + card markdown
    acts.js         Sidebar metadata
    script_v2.md    Primary lesson design
    script.md       Older outline
    staticScreens.js
  screens/          Static / per-scenario screen components
  phone/            Phone Explorer + store
  engine/           Phase 3 specs + legacy flow
  game/             Routes (?index=1, ?catalog=1, default lesson)
docs/
  ARCHITECTURE.md
```

## Script sources

| File | Role |
|------|------|
| `src/content/script_v2.md` | **Primary** — full lesson design (Acts 1–5 in doc; app implements 1–4) |
| `src/content/script.md` | Short outline + catalog alignment |
| `src/content/act3/cards/*.md` | Act 3 scam card copy (parsed at build time) |
