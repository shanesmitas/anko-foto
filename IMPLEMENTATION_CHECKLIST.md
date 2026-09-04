# Implementation Checklist

**Started:** 2026-09-04  
**Package root:** `/home/z/projects/photography`  
**Repository/package name:** `moto-camera-guide-jp`

## Toolchain

- [x] Package manifest verified with `sha256sum -c MANIFEST.sha256`.
- [x] Primary agent read the complete handoff and inspected all 13 physical-device screenshots.
- [x] Runtime confirmed: Node `20.20.2`, npm `10.8.2`.
- [x] Compatibility checked against npm metadata on 2026-09-04.
- [x] Reject Astro `6.0.5`/Starlight `0.38.4` after an operational check: Astro 6's CLI hard-requires Node `>=22.12.0` even though its published package metadata admitted Node 20.
- [x] Pin the verified Node 20 line: Astro `5.18.2` and Starlight `0.37.7` (peer range `astro ^5.5.0`).
- [x] Pin Undici `7.29.1` so transitive resolution remains compatible with Node 20.
- [x] Generate and retain the exact npm lockfile.

## Build

- [x] Scaffold the Astro/Starlight static site in this package root.
- [x] Implement the capability registry and evidence-derived recipe validation.
- [x] Implement Japanese root routes and path-equivalent English routes.
- [x] Implement the custom header, theme control, language switch, mobile bottom navigation, home cards, and recipe components.
- [x] Add 15 bilingual public recipes, Controls, Modes, Help, Challenges, Safety, and About/Sources.
- [x] Create annotated, non-destructive screenshot teaching views.
- [x] Add local illustrative photography with structured attribution.
- [x] Add the GitHub Pages Actions workflow and verify the `/moto-camera-guide-jp/` base path.

## Deterministic checks

- [x] `npm ci`
- [x] `npm run format:check`
- [x] `npm run lint`
- [x] `npm run check` — 0 errors, 0 warnings, 0 hints.
- [x] `npm test` — 9 evidence/data contract tests.
- [x] `npm run build` — 54 static pages with local Pagefind.
- [x] `npm run test:links` — all 54 HTML files resolve under the project base path.
- [x] `npm run test:e2e` — 16 Playwright tests.
- [x] `npm run test:a11y` — both locales and themes pass with zero Axe violations.
- [x] `npm run lighthouse` — all required pages score 100 in Performance, Accessibility, Best Practices, and SEO.

## Human acceptance

- [x] At 390 × 844, every home goal reaches first settings in one selection and within one 390 px short-scroll allowance.
- [x] All ten automated goal-to-settings flows in each locale complete within 10 seconds; representative human-style browser flows were also reviewed.
- [x] Keyboard-only navigation, focus visibility, Japanese readability, image labels, and both themes pass UI/UX review.
- [x] Outdoor readability is explicitly **pending physical-device verification** because the target phone was unavailable.

## Derived assets

- [x] Generate `public/downloads/quick-reference-ja.png` at 1080 × 1920.
- [x] Generate `public/downloads/quick-reference-en.png` at 1080 × 1920.
- [x] Generate `public/downloads/camera-guide-bilingual.pdf` — 3-page A4 portrait PDF.

## Review and release

- [x] Pre-implementation Plan Guardian: `PASS_WITH_DEVIATIONS`; checklist creation was the only outstanding operational gate.
- [x] Code Reviewer findings resolved; final verdict: `PASS`.
- [x] E2E Verifier final verdict: `PASS`; 25 locale pairs and 250 route/viewport combinations independently checked.
- [x] UI/UX Reviewer findings resolved; final verdict: `PASS`.
- [x] Post-implementation Plan Guardian verdict: `PASS`, with no remaining deviations.
- [ ] GitHub owner, visibility, credentials, and deployment authorization confirmed.
- [ ] Live GitHub Pages URL verified before reporting deployment.

## Current milestone status

- Website v1: **locally stable; deployment-ready**
- Japanese/English quick-reference images: **complete**
- Optional PDF: **complete**
- GitHub deployment: **workflow complete; external deployment not authorized**

## Known release boundaries

- Exact retail identity, physical-phone outdoor readability, and the documented camera-range unknowns remain pending physical evidence.
- A production-only `npm audit` reports three low and two high advisory paths in the pinned Node 20 Astro/Starlight toolchain. The patched Astro major requires Node 22, outside this handoff's Node 20 constraint. The published deliverable is static HTML with no Node server or untrusted build input; reassess and upgrade the toolchain when the runtime constraint changes.
