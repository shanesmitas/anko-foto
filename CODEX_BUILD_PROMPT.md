# Codex Build Prompt — Japanese/English Motorola Camera Companion

You are the primary Codex implementation agent. Build, test, and prepare to deploy the complete project described in this package.

## Mission

Create a polished, static, mobile-first Japanese/English photography companion for the Motorola camera UI documented here. The primary reader is a 14-year-old Japanese girl who is a curious photography beginner. She should be able to open the site while taking pictures, choose what she wants to photograph, and reach a useful starting setup in roughly 10 seconds.

This must feel like a small photography companion, not a technical manual and not developer documentation.

The canonical deliverable is a GitHub Pages website. Treat delivery as three explicit milestones:

1. Website v1 is required and independently releasable once its local acceptance checks pass.
2. Japanese and English gallery-sized quick-reference images are required after the local website is stable.
3. A concise bilingual PDF is optional. Produce it when the existing structured data and available toolchain make it practical; otherwise document the concrete reason it was omitted.

## Start here

Work in this package root. It is the `anko-foto` repository; do not create a sibling project or move the evidence elsewhere.

Before editing, run `sha256sum -c MANIFEST.sha256` and stop if an existing package file fails verification. Then read these files completely:

1. `brief/original-project-brief.txt`
2. `research/screenshot-evidence.md`
3. `research/device-capability-matrix.md`
4. `planning/implementation-spec.md`
5. `planning/checkpoint.md`
6. `research/template-decision.md`
7. `research/sources.md`
8. `evidence/README.md`

Inspect every PNG in `evidence/screenshots/`. Treat the screenshot inventory as the mapping, but verify the images yourself.

If instructions conflict, use this priority:

1. This prompt.
2. Physical screenshot evidence.
3. `planning/implementation-spec.md`.
4. `research/device-capability-matrix.md`.
5. The original brief and other research notes.

## Non-negotiable evidence boundary

The physical regulatory model is XT2529-3. The best-supported commercial identity is provisionally moto g66j 5G, but the supplied files do not contain an About Phone screen that proves the retail product name or current Android version. Therefore:

- Use `anko-foto` as the repository/package name.
- Use the neutral public guide title `anko-foto カメラガイド` / `anko-foto Camera Guide`.
- Do not display an exact-model badge or claim that this unit is definitely moto g66j 5G.
- A transparent About note may say that XT2529-3 is the physical regulatory model and moto g66j 5G documentation is the provisional official baseline.
- Provisional g66j-only specifications may appear in About only when explicitly qualified. They cannot validate exact public recipe settings until the physical retail identity is confirmed.
- Store confirmed identity in one nullable configuration field, `device.verifiedIdentity`, containing the commercial name and evidence reference. Derive model verification and any public badge from this field; changing display copy alone must not promote provisional capabilities.

The Pro screenshot shows `A 1/6`; `A` means automatic. It is not proof of the slowest manual shutter. Do not state a manual endpoint, do not encode 1/6 as the device limit, and do not promise long light trails. The 1× and 0.5× manual endpoints remain unknown.

Use the physical UI labels where they differ from generic help:

- `最大画素` for the high-resolution tile.
- `デュアル撮影動画` for the visible dual-capture tile.
- Details grid: `スキャン`, `ナイトビジョン`, `パノラマ`, `最大画素`, `フォトブース`, `ティルトシフト`, `タイムラプス`, `デュアル撮影動画`.

The screenshots confirm RAW access, a live histogram, AF/WB/shutter/ISO/EV controls, and EV endpoints -4 to +4. They do not prove EV step size, RAW-only versus RAW+JPEG, numeric ISO/WB endpoints, Pro 0.5× behavior, Slow-motion fps, or current Camera app version. Do not invent them.

## Build requirements

Use Astro + Starlight with current stable, mutually compatible versions and a committed lockfile. Produce fully static HTML.

Required constraints:

- Japanese is the root locale at `/`; English is under `/en/`.
- A prominent `日本語 | EN` switch preserves the equivalent page path.
- No backend, database, account, login, API key, analytics, ads, telemetry, remote CMS, or external runtime service.
- Pagefind/local search only.
- Images are local and optimized responsively with width/height reserved.
- Site works without client JavaScript for core reading/navigation.
- GitHub Pages deployment uses Actions and handles the project repository base path correctly.
- Do not add a PWA until the ordinary static/deployed site is stable. If time permits later, make offline caching a separate, documented phase.

Implement the information architecture and route map in `planning/implementation-spec.md`. Mobile navigation has four primary items: Home, Recipes, Controls, Help. Challenges, Safety, and About are secondary.

## Design direction

Use a photography-led, warm, clean interface: dark navy/charcoal foundation, restrained sunset amber and sky-blue accents, strong contrast, large image crops, 14–18 px rounded cards, 17–18 px body copy, comfortable Japanese line height, and 44–48 px tap targets.

It must be age-respectful, not childish. Avoid dense public-facing tables and long theory introductions. Put the first usable settings above explanatory prose. Support light and dark themes, outdoor readability, visible keyboard focus, and reduced motion.

On mobile, do not let Starlight feel sidebar-first. Build a custom home, recipe-card system, compact sticky header, and safe-area-aware bottom navigation. Keep Starlight’s strengths for content, localization, search, accessibility, and desktop navigation.

## Content architecture

Create a machine-readable capability registry and schema-validated structured recipe data. Each recipe has one canonical set of numeric/enum settings and sibling Japanese/English text. Locale pages must render from the same settings record so numbers cannot drift.

Every capability entry must record:

- `status`: `observed_device`, `official_provisional`, `equivalent_only`, `inferred`, or `unknown`.
- `publicUse`: `allowed`, `allowed_with_provisional_label`, `about_only`, or `prohibited`.
- The relevant modes, lenses, controls, exact observed or verified values/ranges, evidence references, and caveats.

Apply `publicUse` consistently: `allowed` may support public recipes and instructional content; `allowed_with_provisional_label` may support nonnumeric public explanatory content only when an adjacent qualification is rendered; `about_only` may appear only in About/Sources; and `prohibited` must not enter public output. Exact recipe settings always require `allowed`.

Recipe records must include `visibility: public | draft`, attribution, and evidence references. Every evidence reference must resolve to a supplied asset, manifest entry, a stable bracketed ID in `research/sources.md`, or a canonical URL listed there. Public recipe controls and values must resolve to registry entries with `publicUse: allowed`. Exact values absent from an observed-device set or an exact-model-verified set must fail validation. When an endpoint or next selectable value is unknown, use nonnumeric directional guidance such as “move shutter faster.” Draft recipes may contain experiments, but must not generate routes or search entries.

Create reusable components equivalent to:

- `RecipeHero`
- `SettingsChips`
- `TryThisFirst`
- `FixIt`
- `WhatChanges`
- `CameraCallout`
- `IllustrativeExample`
- `ModeChooser`
- `LanguageSwitch`
- mobile `BottomNav`

Add a build-time rule that prevents public recipes from using unsupported controls, values, or unresolved device ranges. The validator must derive this result from the capability registry; authors must not be able to bypass it with a manually maintained range-status flag.

Ship 10–15 recipes based on the backlog in `planning/implementation-spec.md`. It is acceptable to use Photo, Portrait, Night Vision, Panorama, Maximum Pixels, Timelapse, Slow motion, Scan, Tilt-shift, and cautious Pro starting points that use only validated settings and do not depend on unknown endpoints.

For Pro recipes, explain cause and effect precisely:

- Faster shutter: less light, darker image, less motion blur.
- Slower shutter: more light, brighter image, more motion blur and camera-shake risk.
- Higher ISO: brighter but noisier.
- Lower ISO: cleaner but darker unless more light or a slower shutter compensates.
- EV changes automatic exposure; do not promise EV availability after both shutter and ISO are manual.
- Aperture is absent from the observed Pro controls and must not be taught as a user control. Do not publish exact f-numbers until the retail identity is verified.

Describe 0.5× as the extra-wide view and recommend 1× as the default starting view. A visible 2× choice exists, but its optical/digital implementation is not verified on this physical unit; call it the 2× zoom choice and do not call it a telephoto lens. Explain that the AF flower icon indicates the close-focus end of the focus control, not proof of a separate macro camera.

Use natural Japanese first, then equivalent—not literal or awkward—English. Keep sentences short and direct. Every specialized term should have an everyday explanation.

## Screenshots and imagery

Retain the full normalized PNGs in the repository as evidence. Create non-destructive crops and annotation overlays for the public guide. At minimum, make annotated teaching views for:

- Photo mode: top controls, 0.5×/1×/2×, carousel, shutter.
- Details grid: what each visible tile does.
- Pro mode: AF, WB, shutter, ISO, EV, RAW, histogram.

Use numbered callouts and short bilingual legends. Never fabricate a UI state or silently edit a label. Crop tightly enough that incidental background/hand content is not distracting.

For example photography, use only user-supplied, original, generated, or clearly reusable/licensed assets. Record attribution in structured metadata and label images `イメージ` / `Illustrative` when they were not taken on this phone. Do not imply sample quality is a result from the device unless it is proven.

## Required implementation sequence

1. Verify the manifest, inspect the package, and create `IMPLEMENTATION_CHECKLIST.md` in this repository. Record the selected Node, Astro, and Starlight versions and the date they were checked.
2. Scaffold the Astro/Starlight project and pin dependencies.
3. Implement locales, equivalent-route language switching, custom mobile shell, and GitHub Pages base-path handling.
4. Implement schemas and reusable UI components.
5. Import and annotate screenshots.
6. Write the bilingual pages and recipes.
7. Add About/Sources with transparent evidence language and asset attribution.
8. Add schema, route-parity, link, component, and deployment-path tests.
9. Run format/lint/type/test/build/link checks.
10. Run the automated and human acceptance contract below.
11. Once the local website is stable, generate `public/downloads/quick-reference-ja.png` and `public/downloads/quick-reference-en.png` from the same recipe data. Each must be a portrait 1080 × 1920 PNG suitable for a phone gallery, with safe margins, readable type, and no unsupported exact values. Attempt an A4 portrait PDF at `public/downloads/camera-guide-bilingual.pdf` from the same data; if it is not practical, record the concrete omission reason in `IMPLEMENTATION_CHECKLIST.md`.
12. Complete every other safe local deliverable before the external-write boundary. If GitHub authorization, owner, and repository visibility are available, create/update the repository, deploy through Actions, and verify the live URL. Otherwise leave a deployment-ready repository and ask one concise question.

Do not pause for another high-level framework or information-architecture approval. Those decisions are complete. Only ask the user when an authorization-bound external action or a truly product-changing ambiguity blocks the next safe action.

## Review workflow

If subagents/reviewer agents are available, use the reviewer definitions in `/home/z/projects/codex/.codex/agents` when accessible. The primary Codex agent alone edits application code, tests, configuration, product specifications, and documentation. `code-explorer`, `plan-guardian`, and `code-reviewer` are read-only. `e2e-verifier` and `ui-ux-reviewer` may create disposable verification artifacts only; they must not modify product files.

Use this sequence for substantial work:

1. Plan Guardian reviews this handoff and the implementation checklist before scaffolding.
2. Primary Codex resolves valid plan findings and scaffolds the project.
3. Code Explorer maps the scaffolded paths, reusable pieces, and cross-cutting risks before substantial implementation.
4. Primary Codex implements and runs the initial deterministic checks.
5. Code Reviewer inspects the diff for defects, accessibility, security/privacy, contracts, and maintainability.
6. E2E Verifier checks the built site, routes, language parity, and GitHub Pages subpath.
7. UI/UX Reviewer checks the mobile experience and visual consistency.
8. Primary Codex makes all resulting fixes and reruns verification.
9. Plan Guardian performs a post-implementation conformance review and returns `PASS`, `PASS_WITH_DEVIATIONS`, or `BLOCKED`.

Do not delegate reading or interpreting this prompt; the primary agent must read the full package itself.

## Acceptance contract

Automated checks must:

- Run install, format check, lint, Astro/type/schema checks, unit tests, production build, and link validation.
- Prove Japanese/English route parity and path-preserving language switching for every generated route.
- Build and serve under `/anko-foto/`; reject root-relative internal links or assets that omit the configured base.
- Use browser tests at 360, 390, 430, 768, and 1280 px to check navigation, focus order, horizontal overflow, reserved image dimensions/layout shift, and bottom-navigation overlap.
- Repeat representative reading and navigation with JavaScript disabled.
- Record browser requests and fail on runtime requests outside the deployed same-origin site.
- Run automated accessibility checks in both themes and both locales.
- Run Lighthouse on both locale homes and representative Recipe, Controls, and Help pages. Require at least 90 in Performance, Accessibility, Best Practices, and SEO, documenting any justified exception.

Human acceptance must:

- At a 390 × 844 px viewport, confirm every home goal reaches its first settings in one selection and the settings panel enters the viewport by `scrollY <= 390` CSS pixels.
- Time three representative goal-to-settings flows and confirm each completes within roughly 10 seconds.
- Check keyboard-only operation, visible focus, Japanese readability, illustrative-image labels, and light/dark contrast.
- Check outdoor readability on the target phone when available; otherwise record it explicitly as pending physical-device verification.

## Definition of done

The task is complete only when:

- The full bilingual static site exists and production-builds cleanly.
- Every public feature claim is within the evidence boundary.
- Every published Japanese page has a path-preserving English equivalent.
- The user can reach a recipe’s first settings in about 10 seconds.
- Mobile layouts are polished at the specified widths and the bottom navigation never obscures content.
- Accessibility and local/static operation have been checked.
- Sources, attribution, uncertainty, and exact-device limitations are transparent.
- The GitHub Pages workflow is present and tested under a project base path.
- The two required quick-reference images have been generated from the canonical data.
- The optional PDF has either been generated or has a documented, concrete omission reason.
- A live URL is reported only if deployment was actually authorized and verified.
- The handoff explains commands, repository structure, tests, known unknowns, and the exact config field to update once the retail model is confirmed.

Begin by reading the package and inspecting the screenshots. Then implement autonomously within these boundaries.
