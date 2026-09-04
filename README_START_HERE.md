# Start Here

This is a complete planning-and-evidence handoff for Codex to build the Japanese-default bilingual Motorola photography companion.

## Give Codex these two things

1. The unzipped folder.
2. The entire contents of `CODEX_BUILD_PROMPT.md` as the task prompt.

Codex must work directly inside the unzipped folder. That package root becomes the `anko-foto` repository, keeping the evidence, research, planning documents, and implementation together. The prompt tells Codex to build immediately without repeating framework or information-architecture planning.

Before any edit, run:

```sh
sha256sum -c MANIFEST.sha256
```

Stop and investigate if an existing package file fails verification.

## Package map

- `CODEX_BUILD_PROMPT.md` — complete execution prompt and definition of done.
- `brief/original-project-brief.txt` — the original full product brief.
- `research/device-capability-matrix.md` — claim-by-claim evidence boundary.
- `research/screenshot-evidence.md` — exact inventory and interpretation of all 13 screenshots.
- `research/template-decision.md` — Astro/Starlight decision and alternatives.
- `research/sources.md` — research source and contradiction record.
- `planning/implementation-spec.md` — route map, content model, backlog, UX, testing, and deployment boundary.
- `planning/checkpoint.md` — compact history of decisions and unresolved evidence.
- `evidence/screenshots/` — normalized full-resolution screenshots from the physical phone.
- `evidence/README.md` — evidence-handling rules and a pointer to the complete filename mapping.
- `MANIFEST.sha256` — file integrity checksums.

## Important current boundary

The build should start now. Three high-priority captures remain requested:

1. About Phone showing the exact retail product name and current Android version.
2. The slowest manual shutter at 1×, with the slider moved away from `A`.
3. The slowest manual shutter at 0.5×, with the slider moved away from `A`.

The screenshot reading `A 1/6` is an automatic exposure value, not a verified manual endpoint. The prompt prevents Codex from turning that into an unsupported claim.

Additional nonblocking unknowns remain documented in the screenshot inventory and capability matrix, including Camera app version, Pro 0.5× behavior, fastest shutter values, ISO/WB endpoints, EV step size, RAW choices, Slow-motion fps, and unopened mode options. They must not be invented.

Use a neutral public title until the device name is verified. During implementation, create a machine-readable capability registry as the source of truth for what public recipes may use. The package otherwise contains the audience, framework, route structure, mobile UX, content contract, source hierarchy, real Japanese UI labels, screenshots, test criteria, and deployment rules needed to build v1.

Website v1 is independently releasable after local acceptance. The required local derived assets are portrait 1080 × 1920 PNGs at `public/downloads/quick-reference-ja.png` and `public/downloads/quick-reference-en.png`. The A4 portrait bilingual PDF at `public/downloads/camera-guide-bilingual.pdf` is optional and must either be produced or have a concrete omission reason recorded in `IMPLEMENTATION_CHECKLIST.md`. Complete these safe local milestones before stopping for GitHub owner, visibility, credential, or authorization information.
