# Phone Scam Education Game

Interactive phone simulation for **Money Safety & Scams — Spot the Scam: Links, OTPs & Gaming Traps**.

Inspired by **A Normal Lost Phone**–style exploration: believable phone UI, story via apps and messages, eventually driven by a markdown script.

## Run locally

```bash
cd /Users/dhruvmahajan/Documents/mobile-app/lh
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

You’ll land on the **lesson app** — sidebar with Act 1–4; **Act 3** opens the **Phone Explorer**. For the Screen Catalog (design review), add `?catalog=1`.

## Terminology

| Name | What it is |
|------|------------|
| **Phone Explorer** | Navigable phone OS in **Act 3**. `src/phone/PhoneExplorer.jsx` |
| **Lesson app** | Default shell: Act 1–4 sidebar. `src/app/LessonApp.jsx` |
| **Screen Catalog** | Dev sidebar to preview every static story screen. Entry: `/?catalog=1`. Code: `src/catalog/StaticScreenCatalog.jsx`. |
| **Phone Shell** | The physical phone frame (notch, bezel). Shared by both above. Code: `src/components/phone/PhoneShell.jsx`. |

## Build

```bash
npm run build
npm run preview
```

## Development phases

| Phase | Status | What |
|-------|--------|------|
| **1** | **Now** | Static screens + catalog; copy in `src/content/script.md` |
| **2** | Next | Dynamic Messages, Phone, Chrome, WhatsApp, Free Fire apps |
| **3** | Later | Markdown script → sequence engine (`src/engine/`) |

See `docs/ARCHITECTURE.md` and `src/engine/script-format.md`.

## Layout

```
src/
  content/       script.md, scripts.js, constants.js, staticScreens.js
  catalog/       StaticScreenCatalog (Phase 1 UI)
  screens/       One component per static screen
  components/    Phone chrome + shared UI
  engine/        Phase 2–3 specs + legacy flow from prototype
  game/          App root
docs/
  ARCHITECTURE.md
```

## Script source

Authoritative lesson copy: `src/content/script.md` (aligned to *Scam Simulation Script-Phone Version.docx*).
# lean-hyphen
