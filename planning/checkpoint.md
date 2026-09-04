# Planning Checkpoint — Japanese/English Motorola Photography Guide

**Date:** 2026-09-04  
**Status:** Codex-ready handoff; implementation may begin now with three high-priority evidence requests and additional documented nonblocking unknowns

## 1. Device conclusion

- Physical regulatory model: **XT2529-3** (`OBSERVED_SCREENSHOT`).
- Best-supported retail identity: **moto g66j 5G, Japanese SIM-free 8 GB / 128 GB** (`INFERRED`, high but not final confidence).
- Why not final: the physical screenshot shows only the regulatory model, and secondary sources contradict each other about XT2529-3 versus XT2529-4.
- Resolution: one **About phone** screenshot showing product/device name supplies the evidence for a non-null `device.verifiedIdentity`; model verification and any exact-model badge are derived from that field.
- Naming decision until then: **`moto-camera-guide-jp`**.

## 2. Camera evidence summary

- Provisional g66j baseline, not yet exact-device identity: 50 MP Sony LYTIA 600 main camera, f/1.8, PDAF, Quad Pixel; 8 MP f/2.2 ultrawide; 32 MP f/2.2 front camera. These exact-model specifications may be qualified in About but do not validate exact public recipe settings until the identity is confirmed.
- View choices observed on the physical UI: 0.5×, 1×, and, in Photo/Video, 2×. Use 1× as the default starting view and describe 0.5× as extra-wide. The provisional g66j baseline lists digital zoom and no telephoto or dedicated macro camera, but the physical unit's 2× implementation remains unverified; call it the 2× zoom choice rather than an optical telephoto.
- The phone itself visibly exposes Photo, Video, Slow motion, Portrait, Pro, Scan, Night Vision, Panorama, Maximum Pixels, Photobooth, Tilt-shift, Timelapse, and Dual Capture Video. Photo/Video show 0.5×, 1×, and 2× choices.
- Pro row observed on the unit: **AF | WB | shutter | ISO | EV**.
- Values observed on the unit include WB 7,500 K, shutter 1/350, ISO 100, EV 0.0, Auto WB 6,500 K, Auto shutter 1/20, and Auto ISO 3200.
- Provisional g66j video baseline: main FHD 30/60 fps, ultrawide FHD 30 fps, and selfie FHD 30 fps; 4K is not listed. Do not present these as measurements from the physical unit while identity remains unconfirmed.
- The new Pro captures confirm RAW access, a live histogram, expanded AF/WB/shutter/ISO/EV controls, EV endpoints of -4 to +4, WB 5,933 K, ISO 200, and an automatic shutter reading of `A 1/6`. The `A` means automatic, so it does **not** settle the slowest manual shutter. Do not publish a manual shutter endpoint or promise long light trails yet.

## 3. Framework recommendation

Use **Astro + Starlight**. It wins on bilingual routing, Japanese UI, accessible static pages, image tooling, structured content, custom components, local search, GitHub Pages support, and active maintenance. Customize it enough that the mobile site feels like a photography companion, not software documentation.

Do not use Material for MkDocs for a new build: it is approaching end of life on 2026-11-05. VitePress remains a credible fallback, but would require more work for structured bilingual recipes and image handling.

## 4. Proposed site map

- **Home / ホーム**
  - What do you want to photograph? goal cards
  - Quick mode chooser
  - One-tap Help entry
- **Recipes / 撮り方**
  - Sunset
  - People
  - Movement and car lights
  - Night
  - Close-up and food
  - Landscape, 0.5×, and panorama
  - Selfie
- **Controls / 設定**
  - Camera overview (annotated actual screenshot)
  - 1× versus 0.5×
  - Pro overview
  - Shutter
  - ISO
  - EV
  - WB
  - Focus
  - Modes and video basics
- **Help / 困った時**
  - Too dark
  - Too bright
  - Moving subject blurry
  - Everything blurry
  - Noisy/grainy
  - Sunset washed out
  - Too blue/yellow
  - Focus missed
- **Challenges / ミニチャレンジ**
- **Safety / 安全に撮ろう**
- **Sources & About / このガイドについて**

Mobile persistent navigation remains four items: **Home · 撮り方 · 設定 · 困った時**. Challenges, Safety, and About are secondary links.

## 5. Homepage mobile wireframe

### Header (sticky, compact)

- Small guide title or camera icon
- Prominent `日本語 | EN`
- Theme button

### Hero

- `moto カメラ遊びガイド` (working title)
- One sentence: “撮りたいものを選ぶと、すぐに設定がわかるよ。”
- Optional small verified-model badge only after device identity is confirmed

### Primary question

- Large heading: `何を撮りたい？`
- Two-column card grid at 390–430 px; single column at 360 px if labels wrap
- First row: Sunset, Moving Cars
- Next: Night/City Lights, Portrait, Pets/Action, Flowers, Food, Landscape, Panorama, Selfie
- Every card contains one image crop, a short label, and no paragraph

### Quick mode chooser

- Horizontal, swipeable but fully keyboard-accessible cards: Photo, Night Vision, Portrait, Pro, 0.5×, Panorama
- Each answer is one line: “暗い → ナイトビジョン”

### Bottom navigation (persistent)

- Four 48 px minimum touch targets with icon + Japanese label
- Respects safe-area inset and never covers recipe controls/content

## 6. Recipe mobile wireframe

### Above the fold

- Back to category
- Recipe title: `夕焼けの橋 — 車をくっきり撮る`
- Wide 16:9 example image, clearly labeled if illustrative
- `まずこれを試そう` panel
- Large setting chips immediately visible: `プロ` `1×` `1/350秒` `ISO A` `WB A` `AF`

### Adjustment cards

- `暗すぎる？` → move ISO higher, without naming an unverified next value
- `車がブレる？` → move shutter faster, without naming an unverified next value
- `空が白っぽい？` → reduce exposure only where EV remains active

### Learning and access

- `何が変わる？` one or two sentences
- `このボタンはどこ？` thumbnail of the actual annotated Pro screen
- Optional side-by-side result comparison that stacks vertically at 360 px
- Short safety/context tip where relevant
- Previous/next related recipe

The first usable settings should appear without scrolling past an essay.

## 7. Content model

Use one schema-validated record per recipe. Shared values prevent Japanese/English numeric drift.

```yaml
slug: sunset-bridge-freeze-cars
category: movement
difficulty: beginner
visibility: public
title:
  ja: 夕焼けの橋 — 車をくっきり撮る
  en: Sunset Bridge — Freeze the Cars
summary:
  ja: "..."
  en: "..."
settings:
  mode: pro
  lens: 1x
  shutter: 1/350
  iso: auto
  wb: auto
  focus: af
  ev: null
conditions:
  light: sunset
adjustments:
  too_dark:
    control: iso
    direction: higher
  still_blurry:
    control: shutter
    direction: faster
image:
  path: "..."
  kind: illustrative
  attribution_id: original-001
evidence_refs:
  - device-prior-pro-values
```

Rendered labels and explanations come from locale dictionaries. Numeric settings exist only once. A machine-readable capability registry validates every public control and exact value. Unresolved-range status is derived rather than asserted by an author, and draft recipes do not generate routes or search entries.

## 8. Visual direction

- Photography-led, high-contrast, clean, and warm; not cartoonish.
- Neutral dark navy/charcoal foundation with restrained sunset amber and sky-blue accents.
- Large image crops, rounded 14–18 px cards, strong labels, very limited motion.
- Japanese system-font stack; body text around 17–18 px with generous line height.
- All controls at least 44 px, preferably 48 px for persistent navigation.
- Light and dark themes; sunlight readability checked independently of aesthetic dark mode.
- Avoid dense tables in the public mobile guide; use chips and problem/solution cards.

## 9. High-priority evidence requests and remaining unknowns

The three high-priority requested captures are:

1. **設定 → デバイス情報 / 端末情報** showing product name and Android version.
2. **プロ, 1×:** open shutter control and drag fully away from `A` to the slowest manual value.
3. **プロ, 0.5×:** open shutter control and drag fully away from `A` to the slowest manual value.

Until those arrive, use the neutral title/repository name, omit a device-model badge, and exclude recipes that depend on a specific slow-shutter endpoint. The complete **詳細** screen is already captured.

Other documented, nonblocking unknowns are the Camera app version; Pro lens selection and 0.5× behavior; fastest manual shutter values; ISO and WB endpoints; EV step interval; RAW output choices; Slow-motion resolution/fps; and the detailed workflows/options inside the Details modes. These must remain absent, directional, or explicitly qualified according to the capability registry.

## 10. Implementation plan

1. Verify `MANIFEST.sha256`, work in the current package root, and record the selected Node 20-compatible Astro/Starlight versions in an implementation checklist.
2. Scaffold the pinned Astro + Starlight project with Japanese root and `/en/` locale.
3. Implement the machine-readable capability registry and derive public recipe eligibility from it.
4. Build the custom mobile shell: header, language toggle, bottom navigation, home cards, and recipe components.
5. Add schema-validated recipe data with shared bilingual text and numeric settings.
6. Annotate actual screenshots and create clearly labeled educational comparison graphics.
7. Write and review 10–15 recipes in natural Japanese first, then equivalent English.
8. Add Help, Controls, mode chooser, challenges, safety, and Sources/About.
9. Run the full automated and human acceptance contract, including JavaScript-disabled, same-origin-network, locale-parity, subpath, responsive, accessibility, and Lighthouse checks.
10. Declare website v1 locally stable, then generate the required 1080 × 1920 PNGs at `public/downloads/quick-reference-ja.png` and `public/downloads/quick-reference-en.png`. Attempt the optional A4 portrait PDF at `public/downloads/camera-guide-bilingual.pdf` and document any omission reason in `IMPLEMENTATION_CHECKLIST.md`.
11. Complete all safe local work before the GitHub authorization boundary. When owner, visibility, credentials, and authorization are available, deploy through Actions and verify the live URL.

## Decision

Proceed with **Astro + Starlight** and the proposed information architecture. Build in this package root. The capability registry—not recipe-authored confidence flags—is the implementation source of truth, and no additional planning approval is required before Codex starts the local build.
