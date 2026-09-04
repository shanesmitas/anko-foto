# moto-camera-guide-jp

A bilingual, mobile-first camera learning guide built from physical-device evidence. Japanese is served at `/`; English mirrors every public route under `/en/`. The production base path is `/moto-camera-guide-jp/` for GitHub Pages.

## Run locally

Requires Node 20.20.2 (the package accepts Node 20.19.1 or newer within Node 20).

```sh
npm ci
npm run dev
```

Open `http://localhost:4321/moto-camera-guide-jp/`.

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

`.github/workflows/deploy.yml` builds a Pages artifact under the configured base path. Before any external deployment, confirm the GitHub owner, repository visibility, authenticated credentials, and explicit deployment authorization. Local completion does not imply that those external writes are authorized.

For the original handoff, evidence requests, and implementation constraints, start with `README_START_HERE.md` and `CODEX_BUILD_PROMPT.md`.
