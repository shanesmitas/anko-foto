# Research Sources

**Access date:** 2026-09-04

## Primary and official

| Source | Publisher | What it supports | Notes |
|---|---|---|---|
| [moto g66j 5G specifications](https://jp-jp.support.motorola.com/app/answers/detail/a_id/192473/) | Motorola Japan Support | Hardware, camera feature list, digital zoom, video resolution/frame rates | Some table labels appear malformed; reconcile with official store page |
| [moto g66j 5G product page](https://www.motorola.com/jp/ja/p/phones/moto-g/g-66-j/pmipmhu41mg) | Motorola Japan | Main sensor, ultrawide, selfie camera, Quad Pixel, automatic night/smile features | Primary product evidence |
| [moto g66j 5G product listing](https://store.motorola.co.jp/category/MOTOG/MOTO_G66J_5G.html) | Motorola official store | 50 MP f/1.8 main, 8 MP f/2.2 ultrawide, 32 MP f/2.2 front, Android 15, FHD video limits | Primary product evidence |
| [moto g66j 5G user guide](https://support.mineo.jp/contract/pdf/moto_g66j_5g_01.pdf) | Motorola, hosted by Mineo | Android 15 baseline and physical camera layout | The user guide explicitly says content is based on Android 15 |
| [Japanese Camera help: modes](https://help.motorola.com/hc/apps/camera/c100f/ja-jp/CGT1805150809.html) | Motorola | Generic current Camera app mode descriptions and mode reordering | Not proof that every listed mode is on g66j |
| [Japanese Camera help: Pro mode](https://help.motorola.com/hc/apps/camera/c100f/ja-jp/CGT1900104236.html) | Motorola | AF, WB, shutter, ISO, EV, RAW concepts and generic shutter range | Range is model-dependent; exact device endpoints remain unverified |
| [Japanese Camera help: lenses and resolution](https://help.motorola.com/hc/apps/camera/c100f/ja-jp/CG0040567548.html) | Motorola | Panorama, Dual Capture, Ultra-Res workflows | Generic app documentation; verify device UI |
| [Starlight i18n](https://starlight.astro.build/guides/i18n/) | Astro/Starlight | Locales, Japanese UI, equivalent paths, fallback content | Official documentation; updated 2026-08-13 when accessed |
| [Starlight configuration](https://starlight.astro.build/reference/configuration/) | Astro/Starlight | Static prerendering, Pagefind, component overrides, content collections | Official documentation |
| [Astro image guide](https://docs.astro.build/en/guides/images/) | Astro | Image/Picture components, responsive optimization, alt requirements | Official documentation |
| [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) | Astro | Actions deployment and `site`/`base` handling | Official documentation |
| [VitePress i18n](https://vitepress.dev/guide/i18n) | VitePress | Locale routing | Official documentation |
| [VitePress search](https://vitepress.dev/reference/default-theme-search) | VitePress | Local MiniSearch and multilingual configuration | Official documentation |
| [VitePress deployment](https://vitepress.dev/guide/deploy) | VitePress | GitHub Pages Actions workflow and base-path requirement | Official documentation |
| [Material for MkDocs language guide](https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/) | Material for MkDocs | UI translations and multi-project locale switching | Official documentation |
| [Material for MkDocs search guide](https://squidfunk.github.io/mkdocs-material/setup/setting-up-site-search/) | Material for MkDocs | Local multilingual search including Japanese | Official documentation |

## Secondary/corroborating

| Source | Publisher | What it supports | Limitation |
|---|---|---|---|
| [Moto G56 camera review](https://amateurphotographer.com/review/motorola-g56-review/) | Amateur Photographer | Equivalent hardware behavior, 12 MP-class binned output, 1× quality advantage, 0.5× low-light weakness, RAW, no dedicated macro mode | Global g56, not the exact Japanese unit |
| [Starlight releases](https://github.com/withastro/starlight/releases) | GitHub / Starlight | Active maintenance; 0.41.5 release in July 2026 | Release metadata only |
| [VitePress releases](https://github.com/vuejs/vitepress/releases) | GitHub / VitePress | Active development; v2 line currently alpha | Release metadata only |
| [Material for MkDocs releases](https://github.com/squidfunk/mkdocs-material/releases) | GitHub / Material for MkDocs | Maintenance mode and 2026-11-05 end-of-life date | Release/project notice |
| [FrequencyCheck XT2529-3 record](https://www.frequencycheck.com/models?page=396&q%5Bfrequency_bands_id_eq%5D=16&q%5Bs%5D=release_date+asc) | FrequencyCheck | Maps XT2529-3 to moto g66j 5G | Secondary database; not enough for final identity |
| [Janpara inventory record](https://www.janpara.co.jp/sale/search/detail/?ITMCODE=371909) | Janpara | Maps XT2529-3/PB810000JP to g66j 5G | Retail inventory evidence |

## Device evidence supplied by user

- `[device-regulatory-capture]` Regulatory screenshot: XT2529-3, FCC ID IHDT56AV3, Japanese certification identifiers.
- `[device-prior-pro-values]` Earlier Pro-mode screenshots: Japanese labels 写真, ポートレート, プロ, 詳細; lens controls 0.5× and 1×; control row AF, WB, shutter, ISO, EV; observed values WB 7,500 K, shutter 1/350, ISO 100, EV 0.0, Auto WB 6,500 K, Auto shutter 1/20, Auto ISO 3200.
- `[device-capture-set-2026-09-04]` New 13-screen set (2026-09-04): Photo/Video show 0.5×, 1×, 2×; primary modes include Slow motion, Video, Photo, Portrait, Pro, Details; Details grid visibly contains Scan, Night Vision, Panorama, Maximum Pixels, Photobooth, Tilt-shift, Timelapse, Dual Capture Video.
- `[device-pro-expanded-2026-09-04]` New Pro evidence: RAW control, 3:4, live histogram, expanded AF/WB/shutter/ISO/EV; WB 5,933 K; ISO 200; EV scale -4 to +4; `A 1/6` with slider on Auto. The last value is an automatic reading, not a manual shutter endpoint.
- `[device-camera-settings-2026-09-04]` Camera Settings evidence: Google Lens on; H.265/HEVC Efficient Video off; selfie mirror off; keep previous mode off; location off; storage set to SD card; Help/Reset/Version Information entries visible. These switch states are the user's current configuration, not universal defaults.

## Material contradictions and limitations

1. Secondary sources swap XT2529-3 and XT2529-4 between g66j and g66y. The phone itself must settle the retail name.
2. Motorola's g66j support specification table has visibly misplaced labels around camera rows. Cross-check clear facts against the official product/store pages.
3. Motorola's generic Camera help is broader than any one device. A listed mode is not treated as g66j-supported unless the g66j specification or device UI confirms it.
4. Exact manual shutter, ISO, and WB endpoints are not published for this unit. EV endpoints are visibly -4 and +4, but the step interval is unknown. Device screenshots/testing are authoritative.
5. No About Phone screen is present in the new screenshot set, so the retail product name and current Android version remain unverified.
