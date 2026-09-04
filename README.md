# anko-foto

A bilingual, mobile-first camera learning guide built from physical-device evidence. Japanese is served at `/`; English mirrors every public route under `/en/`. The production base path is `/anko-foto/` for GitHub Pages.

## Run locally

Requires Node 20.20.2 (the package accepts Node 20.19.1 or newer within Node 20).

```sh
npm ci
npm run dev
```

Open `http://localhost:4321/anko-foto/`.

## Validate

```sh
npm run format:check
npm run lint
npm run check
npm test
npm run build
npm run test:links
npm run test:e2e
npm run test:a11y
npm run lighthouse
```

Use `npm run generate:derived` after a successful build to regenerate the two 1080×1920 quick-reference PNGs and bilingual A4 PDF. Run the build once more afterward so the generated downloads are copied to `dist/`.

## Evidence contract

- `src/data/capabilities.ts` is the source of truth for observed, provisional, inferred, equivalent-only, and unknown capabilities.
- When retail identity evidence arrives, update only `device.verifiedIdentity` in that registry with `commercialName` and `evidenceRef`; display-label edits cannot promote capabilities.
- `src/data/recipes.ts` contains one shared bilingual recipe record per slug.
- Exact public settings must resolve to a capability with `publicUse: allowed` and an observed or exact-model-verified value.
- Draft recipes are excluded from both locale route generators and Pagefind.
- `evidence/screenshots/` remains unchanged; teaching views import those source files without destructive edits.
- Generated example photos are always marked `イメージ` / `Illustrative`; see `assets/ATTRIBUTION.md`.

## Deployment boundary

`.github/workflows/deploy.yml` deploys pushes to `master` as a Pages artifact under `/anko-foto/`. Deployment to the public repository `shanesmitas/anko-foto` was explicitly authorized on 2026-09-04 and uses authenticated admin access. The live site is `https://shanesmitas.github.io/anko-foto/`.

For the original handoff, evidence requests, and implementation constraints, start with `README_START_HERE.md` and `CODEX_BUILD_PROMPT.md`.
