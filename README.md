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
| `/?index=1` | **Scene index** — launch any live or legacy scene. Optional `?scene=<id>` (e.g. `live-act4-challenge`, `legacy-act2-phone-simulation`). |
| `/?catalog=1` | **Screen catalog** — browse static story frames only. |

Dev links to the scene index and screen catalog are at the bottom of the lesson sidebar.

## Lesson flow (live)

| Act | Component | Status |
|-----|-----------|--------|
| **1 — The Hook** | `Act1Hook.jsx` | Live |
| **2 — The Scenarios** | `Act2ScenarioExperience.jsx` | Live |
| **3 — Priya explains** | `Act3PriyaExplains.jsx` | Live |
| **4 — Scam Detective** | `Act4Challenge.jsx` | Live |

Design source: `src/content/script.md` (full lesson script). Implementation plans: `_stash/plans/`.

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

Five scored phone scenarios: deepfake celebrity giveaway, sextortion threat, OTP theft, fake-friend impersonation, in-game admin scam. Header tracks **shields** and **close calls**. Wrong choices can retry; good choices earn a shield.

Legacy alternative: `Act2PhoneSimulation.jsx` (older PhonePe / school-email flow) — scene index only.

---

### Act 3 — Priya explains the patterns

`src/app/Act3PriyaExplains.jsx` · `src/content/act3/`

1. **Room-style dialogue** — Squad Goals debrief (shared `RoomDialogue` pattern, no room background image).
2. **Table** — three scam cards dealt one-by-one onto the wood table (face-down), then unlocked in order.
3. **Tap a card** — expands to center; markdown sections fade in (`src/content/act3/cards/*.md`).
4. **Understand** — compact horizontal “hose” fill; label stays centered; stars are white. The button can be clicked at 0–3 stars.
5. **Progress** — the main progress rail tracks earned stars (`0/9 ★` through `9/9 ★`). Zero-star completion still unlocks the next card.
6. **Outro** — Priya names urgency as the underlying trick, Kabir sends it to Rohan, and **Test yourself →** starts Act 4.

Supporting UI: `src/components/act3/` (`Act3CardTable`, `ScamCardDeck`, `UnderstandButton`, …).

---

### Act 4 — Scam Detective (challenge round)

`src/app/Act4Challenge.jsx` · `src/content/act4Challenge.js` · `src/components/act4/`

Full-screen challenge (not inside the phone shell). Score is normalized to **200 points**; up to **5 shields** and **close calls** tracked in the HUD. No in-round retries; **Play again** on the final screen resets the run.

| Mini-game | What you do |
|-----------|-------------|
| **Spot the Fake Link** | Pick the real domain (15s timer) |
| **Real or Scam?** | Seven messages, REAL or SCAM (8s each) |
| **What's Wrong Here?** | Tap four red flags in a fake bank email (30s) |
| **What Do You Do Now?** | Match situations to responses (tap pair, tap line to unmatch) |
| **Boss level** | Typed answer; local keyword grading + model answer |

Then: **scoreboard** → **group chat wrap-up** → **5 rules** → **if it happens to you** (1930, cybercrime.gov.in) → **final screen** (share / play again).

Legacy red-flag prototype: `Act4SpotTheIssue.jsx` — scene index as `legacy-act4-spot-the-issue`.

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
| `legacy-act4-spot-the-issue` | Older three-round “tap the red flags” mini-game |
| `legacy-script-driven` | Early markdown script runner |
| `legacy-phone-runtime` | PhonePe SMS prototype |

Live registry (including `live-act4-challenge`): `src/catalog/sceneIndex.js`.

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
| **2** | Done | Live Acts 1–4: hook, v2 scenarios, pattern cards, Scam Detective challenge |
| **3** | Later | Markdown script engine for full scripted flow (`src/engine/`) |

See `docs/ARCHITECTURE.md` and `src/engine/script-format.md`.

## Repo layout

```
src/
  app/              Lesson acts (Act1Hook … Act4Challenge, LessonApp)
  catalog/          Scene index + static screen catalog
  components/
    act3/           Scam cards, Understand button, table overlay
    act4/           Challenge mini-games, scoreboard, finale screens
    room/           RoomDialogue (Act 3 + Act 4 group wrap)
    phone/          Phone chrome
    whatsapp/       WhatsApp shells and typing bubble
  content/
    act1Hook.js
    act2Scenarios.js
    act3/           Intro/outro scripts + card markdown
    act4Challenge.js
    acts.js         Sidebar metadata
    script.md       Full lesson design (Acts 1–4 in app)
    staticScreens.js
  screens/          Static / per-scenario screen components
  phone/            Phone Explorer + store
  engine/           Phase 3 specs + legacy flow
  game/             Routes (?index=1, ?catalog=1, default lesson)
_stash/plans/       Implementation plans (e.g. act4/req.md)
docs/
  ARCHITECTURE.md
```

## Script sources

| File | Role |
|------|------|
| `src/content/script.md` | **Primary** — full lesson design (Acts 1–4 implemented in the lesson app) |
| `src/content/act3/cards/*.md` | Act 3 scam card copy (parsed at build time) |
| `src/content/act4Challenge.js` | Act 4 challenge copy, rounds, scoring bands |
