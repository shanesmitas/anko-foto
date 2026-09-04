# Implementation Specification

## Product definition

Build a static, mobile-first Japanese/English photography companion for the supplied Motorola phone UI. It is for a 14-year-old Japanese beginner who wants useful settings while taking a photo—not a camera-theory course.

Working repository and package name: `moto-camera-guide-jp`.

Implement directly in the package root that contains this specification, the evidence, and the manifest. Do not create a sibling project. The package root becomes the Git repository root.

Do not put an exact commercial model in the public title until About Phone verifies it. A small Sources/About note may say that the physical regulatory model is XT2529-3 and the provisional reference documentation is for moto g66j 5G.

## Technical stack

- Astro + Starlight, current stable mutually compatible versions supported by Node 20; pin exact versions in the lockfile and record the versions and verification date in `IMPLEMENTATION_CHECKLIST.md`.
- Fully static output. No server, database, accounts, API keys, forms backend, analytics, ad tech, or tracking.
- Japanese root locale at `/`; English equivalents at `/en/`.
- GitHub Pages deployment via GitHub Actions with correct `site` and `base` behavior for a project site.
- Pagefind/local search only.
- Astro content collections with schema validation for recipes and screenshot annotations.
- Responsive local images via Astro `Image`/`Picture`; do not hotlink.
- Progressive enhancement only. The guide must remain readable without client JavaScript.

## Required pages

| Japanese route | English route | Purpose |
|---|---|---|
| `/` | `/en/` | Goal-first home |
| `/recipes/` | `/en/recipes/` | All photo recipes |
| `/controls/` | `/en/controls/` | Camera and Pro controls |
| `/controls/camera-map/` | `/en/controls/camera-map/` | Annotated physical UI |
| `/controls/pro/` | `/en/controls/pro/` | AF, WB, shutter, ISO, EV, RAW, histogram |
| `/modes/` | `/en/modes/` | Photo, Video, Portrait, Details modes |
| `/help/` | `/en/help/` | Symptom-first troubleshooting |
| `/challenges/` | `/en/challenges/` | Small practice challenges |
| `/safety/` | `/en/safety/` | Road, water, privacy, and night safety |
| `/about/` | `/en/about/` | Scope, uncertainty, sources, attribution |

The language switch must preserve the equivalent route, falling back to the locale home only when no equivalent exists.

## Mobile information architecture

- Compact sticky header: guide name, prominent `日本語 | EN`, light/dark toggle.
- Persistent bottom navigation with four 48 px targets: `ホーム`, `撮り方`, `設定`, `困った時` (localized in English).
- Respect device safe-area insets; bottom navigation must never cover content.
- Secondary links: Challenges, Safety, About.
- Do not use a sidebar-first mobile layout. On desktop, Starlight navigation may expand.

## Home experience

The first meaningful question is `何を撮りたい？` / `What do you want to photograph?`.

Use large image-led cards for:

- Sunset
- Moving cars/bikes
- Night and city lights
- People/portraits
- Pets/action
- Flowers/close-up
- Food
- Landscape/wide view
- Panorama
- Selfie

Below that, show a short mode chooser: Photo, Night Vision, Portrait, Pro, 0.5×, Panorama. A user should reach usable settings within about 10 seconds.

## Capability registry

Create one machine-readable registry as the source of truth for device claims and recipe validation. Each capability entry records:

```yaml
id: pro.shutter
status: observed_device # observed_device | official_provisional | equivalent_only | inferred | unknown
publicUse: allowed # allowed | allowed_with_provisional_label | about_only | prohibited
modes: [pro]
lenses: [1x]
observedValues: [auto, 1/350]
verifiedRange: null
evidenceRefs: [device-prior-pro-values]
caveat:
  ja: "1×と0.5×の端の値は未確認。"
  en: "The 1× and 0.5× endpoints are unverified."
```

Store device identity separately:

```yaml
device:
  regulatoryModel: XT2529-3
  provisionalBaselineModel: moto g66j 5G
  verifiedIdentity: null # later: { commercialName: "...", evidenceRef: "..." }
```

Derive model verification and any exact-model badge from `device.verifiedIdentity`. If the confirmed model matches the provisional baseline, validation may promote applicable exact-model official capabilities; changing display copy alone must never promote them. Provisional g66j-only facts may appear in About with explicit qualification, but cannot validate an exact public recipe setting while `verifiedIdentity` is null.

`publicUse` has these exact semantics:

- `allowed`: may support public recipes and instructional content.
- `allowed_with_provisional_label`: may support nonnumeric explanatory content only when an adjacent qualification is rendered; it never validates an exact recipe setting.
- `about_only`: may appear only in About/Sources.
- `prohibited`: must not enter public output.

## Recipe content model

Keep numeric/enum settings in one shared record; Japanese and English text are sibling fields. Do not duplicate numeric settings across locale files.

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
  - symptom: too_dark
    control: iso
    direction: higher
  - symptom: still_blurry
    control: shutter
    direction: faster
image:
  path: "..."
  evidence_kind: illustrative
  attribution_id: original-001
evidence_refs:
  - device-prior-pro-values
```

Every evidence reference must resolve to a supplied asset, manifest entry, stable bracketed ID in `research/sources.md`, or a canonical URL listed there. Public recipe controls and exact values must resolve to registry entries with `publicUse: allowed`. Reject exact values absent from an observed-device set or an exact-model-verified set. Derive unresolved-range status from the registry; do not accept an author-controlled bypass flag. Directional adjustments such as `faster`, `slower`, `higher`, or `lower` are permitted when the control is observed but the next value or endpoint is unknown. Draft recipes may retain experimental values, but must not generate public routes or Pagefind entries.

## Initial content backlog

Ship 10–15 concise recipes. Prefer robust automatic or verified settings where exact endpoints are unknown.

1. Everyday photo: point, tap, hold steady.
2. 0.5× landscape/room: edge-distortion warning and level framing.
3. 1× sunset: tap bright sky, modest negative EV in auto mode.
4. Portrait: subject distance, background separation, edge-error fix.
5. Night Vision handheld: brace, hold after shutter, avoid moving subjects.
6. Moving subject: Pro 1× starting point using the observed 1/350 shutter value with automatic ISO/WB/AF; if blurred, move the shutter control faster without naming an unverified next value. Label this as a starting point, not guaranteed exposure.
7. Close-up flower/food: use 1×, add light, move back until focus locks; explain that the AF flower icon is a focus position, not a dedicated macro lens.
8. Panorama: sweep slowly, keep guide level, avoid nearby moving subjects.
9. Maximum Pixels: good light, steady subject, larger file.
10. Timelapse: stable support, battery, safe placement.
11. Slow motion: bright light, short clips, unverified fps omitted.
12. Selfie: lens cleanliness, optional mirror setting explained neutrally.
13. Tilt-shift: miniature effect with a high viewpoint.
14. Scan: flat light, parallel phone, crop check.
15. Video basics: the observed FHD 30 setting as the default; mention FHD 60 only after the exact physical model or selector is verified.

Do not ship a “long light trails” recipe until the physical 1×/0.5× manual shutter endpoints are verified. A general motion-streak experiment may exist only if it avoids claiming a duration or guaranteed result.

## Recipe page order

1. Title and one-line goal.
2. 16:9 example image, marked `イメージ` / `Illustrative` when not shot on this phone.
3. `まずこれを試そう` / `Try this first` settings panel.
4. One-change troubleshooting cards: too dark, too bright, still blurry, color looks wrong.
5. One or two sentences explaining what changed.
6. `このボタンはどこ？` / `Where is this control?` annotated screenshot crop.
7. Safety/context tip where relevant.
8. Related recipe links.

No essay may appear before the first usable settings.

## Visual system

- Photography-led, warm, high-contrast, clean, and age-respectful; not childish and not a software-docs aesthetic.
- Dark navy/charcoal foundation with restrained sunset amber and sky-blue accents.
- Rounded 14–18 px cards; body text 17–18 px with generous Japanese line height.
- Minimum 44 px controls, preferably 48 px for navigation.
- Light and dark themes; test outdoor readability.
- Use chips and cards, not dense tables, in public mobile pages.
- Reduced-motion preference honored; animation is optional and subtle.
- WCAG AA color contrast, visible focus, logical headings, meaningful alt text.

## Screenshot usage

- Import the 13 normalized screenshots from `evidence/screenshots/`.
- Create non-destructive crops/overlays in source-controlled assets; retain the full originals.
- Use numbered callouts and short bilingual legends for the Photo screen, Details grid, and Pro row.
- Do not edit the UI state or fabricate missing controls.
- The visible background/hand is incidental. Crop tightly enough that the camera UI is the subject.

## Evidence and editorial rules

Evidence precedence:

1. Physical screenshot/device measurement.
2. Motorola Japan exact-model sources.
3. Japanese carrier/manual sources for that model.
4. Motorola generic Camera help.
5. Explicitly labeled equivalent-model evidence.
6. Other secondary sources.

Every factual control/mode claim must map to the capability matrix. Do not expose internal confidence codes in beginner recipes, but include a readable “What we verified” section in About.

Only `observed_device` capabilities with `publicUse: allowed`, or capabilities promoted after exact identity verification, may validate exact settings in public recipes. `official_provisional` facts may be stated only with their required qualification. `equivalent_only`, `inferred`, and `unknown` entries remain internal or are discussed transparently as limitations in About.

Current hard boundaries:

- Exact commercial name is unresolved; no exact-model title/badge.
- `A 1/6` is an automatic reading, not a manual endpoint.
- EV range is visibly -4 to +4, but step size is unknown.
- RAW exists, but RAW-only versus RAW+JPEG is unknown.
- 2× is visible in Photo/Video, but its optical/digital implementation is not verified on this physical unit. Call it the 2× zoom choice and do not call it a telephoto lens.
- Use physical labels `最大画素` and `デュアル撮影動画`.

## Testing and acceptance

- `npm ci`, format check, lint, Astro/type/schema checks, unit tests, production build, and link check all pass.
- Run a bilingual-route parity test: each published Japanese page has an English equivalent and vice versa.
- Validate all recipe enums/numbers and screenshot references at build time.
- Build and serve under `/moto-camera-guide-jp/`; tests must reject internal links or assets that incorrectly assume `/`.
- At 360, 390, 430, 768, and 1280 px, use browser tests to check navigation, focus order, horizontal overflow, reserved image dimensions/layout shift, and bottom-nav overlap.
- Repeat representative reading and navigation with JavaScript disabled; core content and links must remain usable.
- Record browser requests and fail on runtime requests outside the deployed same-origin site.
- Run automated accessibility checks in both themes and both locales, including accessible names, heading structure, focus visibility, and reduced-motion behavior.
- Run Lighthouse on both locale homes and representative Recipe, Controls, and Help pages. Require at least 90 for Performance, Accessibility, Best Practices, and SEO, documenting any justified exception.
- At a 390 × 844 px viewport, manually confirm every home goal reaches first settings in one selection and the settings panel enters the viewport by `scrollY <= 390` CSS pixels. Time three representative flows; each must complete within roughly 10 seconds.
- Manually check keyboard-only operation, Japanese readability, illustrative labels, and both theme contrast. Test outdoor readability on the target phone when available; otherwise record it as pending physical-device verification.

## Milestones and deployment boundary

1. **Website v1:** required and independently releasable after all local website acceptance checks pass.
2. **Derived images:** `public/downloads/quick-reference-ja.png` and `public/downloads/quick-reference-en.png` are required after local website stability. Each is a portrait 1080 × 1920 PNG generated from canonical recipe data, with safe margins, readable type, and no unsupported exact values.
3. **PDF:** `public/downloads/camera-guide-bilingual.pdf` is an optional A4 portrait bilingual PDF. Produce it from the same canonical data when practical; otherwise record the concrete toolchain, quality, or scope reason for omission in `IMPLEMENTATION_CHECKLIST.md`.

Complete all safe local milestones before stopping for an external-write decision. If authenticated GitHub access, intended owner, repository visibility, and user authorization are available, create or update the repository and deploy with Actions. Otherwise leave a complete deployment-ready repository and ask one concise question. Do not claim a live deployment without verifying the final URL.
