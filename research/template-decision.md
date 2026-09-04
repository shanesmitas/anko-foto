# Static-Site Framework Decision

**Decision date:** 2026-09-04  
**Decision:** Use **Astro + Starlight**, with a customized photography-guide shell rather than the default documentation appearance.

## Direct recommendation

Astro + Starlight is the strongest fit because it combines built-in multilingual routing and Japanese UI strings, static output, Markdown/MDX, schema-backed content collections, local Pagefind search, responsive image tooling, accessible defaults, and an official GitHub Pages deployment path. It is also actively maintained; Starlight 0.41.5 was released in July 2026.

The important design choice is to treat Starlight as the accessible content/navigation foundation, not the finished visual design. Override the header and mobile navigation, use a custom home page and recipe components, and keep the phone experience card-first.

## Comparison

| Criterion | Astro + Starlight | VitePress | Material for MkDocs |
|---|---|---|---|
| Japanese/English i18n | Built-in locales, root locale, fallback pages, Japanese UI strings | Locale routing supported; more UI/search translation configuration is manual | 60+ UI languages, but multilingual sites are commonly separate builds linked by selector |
| Equivalent-page switching | Same filenames associate translations; suitable for same-page switch | Can configure locale links/routes | Supported when separate language projects use matching paths |
| Mobile navigation | Accessible mobile menu baseline; should be overridden for bottom navigation | Good default responsive docs theme | Mature responsive docs navigation |
| Accessibility | Explicit project goal; recent release fixed keyboard focus trapping in mobile menu | Solid semantic base, but custom Vue theme work adds QA burden | Mature, but customization must preserve accessible behavior |
| GitHub Pages | Official Astro guide and Actions path; `site`/`base` documented | Official example workflow; `base` must be configured | Straightforward deployment, commonly via `mkdocs gh-deploy` or Actions |
| Image optimization | Strong built-in `Image`/`Picture`, responsive images, Markdown processing, enforced alt text in components | No equally integrated first-party authoring flow; typically Vite plugins/manual handling | Primarily theme/plugin/manual pipeline |
| Performance | Static HTML by default; component JavaScript can be opt-in | Fast static output, but Vue-powered customization can increase client JS | Fast static docs output |
| Visual customization | Custom Astro components, CSS, and Starlight component overrides; best fit for recipe cards and annotated UI | Flexible via Vue/theme extension, but more custom theme work | Customizable with overrides, but strongest visual identity remains documentation-oriented |
| Markdown/MDX authoring | Markdown and MDX; Astro components in MDX | Markdown plus Vue components | Markdown and Python extensions; no MDX |
| Structured content | Astro content collections and schemas are first class | Possible with data loading/build code, less direct for this case | YAML/frontmatter works; validation requires additional setup |
| Search | Pagefind enabled by default and fully local/static | Local MiniSearch is available | Local multilingual search, including Japanese support |
| Maintenance/community | Active project and frequent 2026 releases | Active, though the current v2 line is still pre-release | In maintenance mode; scheduled end of life on 2026-11-05 |
| Risk for this project | Moderate customization needed to avoid “developer docs” feel | Higher design-system and i18n plumbing burden | Unacceptable lifecycle risk for a new project in September 2026 |

## Why the alternatives lose

### VitePress

VitePress is capable and actively developed. It supports locale-based routing, local in-browser search, and GitHub Pages. It loses narrowly because this project is image-heavy and needs a simple structured recipe model, responsive images, bilingual equivalence, and custom card components. Astro/Starlight provides more of that directly with less Vue/theme work. VitePress v2 is also still on alpha releases as of this checkpoint.

### Material for MkDocs

Material has excellent navigation and multilingual search. It would be quick for a conventional manual. It is not appropriate for a new long-lived build now because its maintainers have placed it in maintenance mode and scheduled end of life for **2026-11-05**. Its usual multilingual architecture—one project/build per language—is also less elegant for this tightly paired Japanese/English guide.

## Recommended architecture

- **Framework:** Astro + Starlight.
- **Output:** fully static, prerendered HTML.
- **Locales:** Japanese as root (`/`), English under `/en/`.
- **Content:** Starlight Markdown/MDX for controls, troubleshooting, safety, and Sources/About.
- **Recipes:** one schema-validated Astro content collection/data record per recipe with shared numeric settings and separate Japanese/English text fields.
- **Language switch:** custom prominent `日本語 | EN` control that computes the equivalent route; do not place both translations on one mobile page.
- **Home:** custom Astro page built from large photo-goal cards.
- **Recipe UI:** reusable `RecipeHero`, `SettingsChips`, `FixIt`, `WhatChanges`, and `IllustrativeExample` components.
- **Navigation:** bottom navigation on mobile; compact header with language/theme controls; normal richer navigation on desktop.
- **Search:** retain Pagefind, but visually subordinate it to goal cards and troubleshooting.
- **Images:** keep local assets in `src/assets`; generate responsive sizes and WebP/AVIF through Astro; require alt text and attribution metadata.
- **Deployment:** GitHub Actions with correct `site` and repository `base`; test built output under the subpath before deployment.
- **PWA:** postpone manifest/offline cache until the ordinary GitHub Pages build is stable.

## Guardrails

1. Do not start from a heavily branded third-party template; start from current Starlight and a small custom visual layer.
2. Avoid a sidebar-first mobile experience. On mobile, recipes and bottom navigation are primary.
3. Keep numerical camera settings in one data record so Japanese and English cannot drift.
4. Pin framework versions and use the official upgrade path; do not adopt a community i18n or PWA plugin unless core functionality proves insufficient.
5. Leave analytics absent by default.

## Sources

- [Starlight internationalization guide](https://starlight.astro.build/guides/i18n/)
- [Starlight configuration reference](https://starlight.astro.build/reference/configuration/)
- [Starlight component overrides](https://starlight.astro.build/guides/overriding-components/)
- [Starlight site search](https://starlight.astro.build/guides/site-search/)
- [Astro image guide](https://docs.astro.build/en/guides/images/)
- [Astro deployment to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Starlight releases](https://github.com/withastro/starlight/releases)
- [VitePress internationalization](https://vitepress.dev/guide/i18n)
- [VitePress local search](https://vitepress.dev/reference/default-theme-search)
- [VitePress deployment](https://vitepress.dev/guide/deploy)
- [VitePress releases](https://github.com/vuejs/vitepress/releases)
- [Material for MkDocs language guide](https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/)
- [Material for MkDocs search guide](https://squidfunk.github.io/mkdocs-material/setup/setting-up-site-search/)
- [Material for MkDocs releases and end-of-life notice](https://github.com/squidfunk/mkdocs-material/releases)

