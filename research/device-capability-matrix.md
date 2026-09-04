# XT2529-3 / moto g66j 5G Camera Capability Matrix

**Research checkpoint:** 2026-09-04 (updated after 13-screen capture set)  
**Purpose:** Evidence boundary for a Japanese/English mobile photography guide  
**Target UI:** Japanese Motorola Camera app observed on the user's physical phone

## Executive conclusion

The physical phone is **regulatory model XT2529-3**. The best-supported commercial identity is **moto g66j 5G, Japanese SIM-free 8 GB / 128 GB variant**, but this is not yet `VERIFIED_DEVICE`: the available captures do not show the retail product name, and online sources inconsistently swap XT2529-3 and XT2529-4. Several Japanese retail inventory records and a device database map XT2529-3 to g66j, while other secondary articles map g66j to XT2529-4.

**Implementation rule:** use the neutral working/repository name `moto-camera-guide-jp` and build now. Do not publish an exact-model badge or claim that this unit is “moto g66j 5G” until one screenshot of **設定 → デバイス情報 / 端末情報 (About phone)** shows the commercial product name.

The official moto g66j product and support pages are nevertheless the correct provisional capability baseline because their hardware and the observed UI match the phone: 50 MP Sony LYTIA 600 main camera, 8 MP ultrawide, 32 MP selfie camera, and a Pro control row of AF, WB, shutter, ISO, and EV.

## Confidence labels

- `VERIFIED_DEVICE` — shown by the physical unit itself. Not yet available for the retail name.
- `OBSERVED_SCREENSHOT` — visible in screenshots from this physical unit.
- `VERIFIED_OFFICIAL` — stated on a Motorola Japan page specifically for moto g66j 5G.
- `VERIFIED_EQUIVALENT_MODEL` — observed or documented for the closely related global moto g56 5G; not sufficient by itself for publication as an exact-device fact.
- `INFERRED` — reasonable interpretation but not safe to publish as settled fact.

These research labels map to the implementation registry as follows:

| Research evidence | Registry `status` | Default `publicUse` while identity is unconfirmed |
|---|---|---|
| Physical-unit capture or measurement | `observed_device` | `allowed` for the exact visible fact or value |
| Exact g66j official source | `official_provisional` | `about_only`, or `allowed_with_provisional_label` for explicitly qualified About copy |
| Closely related model | `equivalent_only` | `prohibited` for device claims and recipe validation |
| Interpretation without direct proof | `inferred` | `prohibited` |
| No evidence | `unknown` | `prohibited` |

When `device.verifiedIdentity` confirms that the physical unit matches the provisional baseline, applicable exact-model official entries may be promoted to public use. Display copy or a guessed model name must never trigger promotion.

`publicUse: allowed` may support recipes and instructions. `allowed_with_provisional_label` is limited to nonnumeric explanatory content with an adjacent qualification and cannot validate exact recipe settings. `about_only` is restricted to About/Sources. `prohibited` must not enter public output.

Implementation `evidenceRefs` must resolve to a supplied asset, a manifest entry, a stable bracketed ID in `research/sources.md`, or a canonical URL listed there.

## Device identity

| Item | Current finding | Status | Confidence | Publication rule |
|---|---|---:|---|---|
| Regulatory model | XT2529-3 | Supported | `OBSERVED_SCREENSHOT` | May be stated internally and on Sources/About |
| Commercial model | Probably moto g66j 5G | Provisional | `INFERRED` | Wait for About phone screenshot |
| Market | Japan | Supported | `OBSERVED_SCREENSHOT` | Safe |
| Original OS | Android 15 | Supported for g66j | `VERIFIED_OFFICIAL` | Do not claim this is the unit's current OS |
| Current OS | Unknown | Unknown | `INFERRED` | Read from About phone; do not infer from release/update reports |
| Camera app version | Unknown | Unknown | `INFERRED` | Read from Camera app info; record because UI/ranges may change |
| Internal platform relation | Closely related to global moto g56 5G | Supported, not identity | `VERIFIED_EQUIVALENT_MODEL` | Use g56 evidence only as explicitly labeled corroboration |

## Hardware

| Feature | Exact-device support | Japanese label / English term | Location or use | Lens/mode | Range/options | Confidence | Caveat |
|---|---|---|---|---|---|---|---|
| Main rear camera | Provisionally supported | メインカメラ / Main camera | 1× selector | Rear; Photo/Pro and other modes | 50 MP, Sony LYTIA 600, f/1.8, 0.8 µm pixels, Quad Pixel 1.6 µm, PDAF | `VERIFIED_OFFICIAL` | Applies once g66j identity is device-verified |
| Ultrawide rear camera | Provisionally supported and visible | 超広角 / Ultrawide | 0.5× selector | Rear; supported modes | 8 MP, f/2.2 | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | Exact mode availability by lens still needs device testing |
| Selfie camera | Provisionally supported | インカメラ / Front camera | Camera-switch control | Front-facing modes | 32 MP, f/2.2 | `VERIFIED_OFFICIAL` | Motorola's support table has mislabeled rows; the official store gives the clear value |
| Rear autofocus | Supported on main camera | AF / Autofocus | Pro AF control; tap-to-focus in automatic modes | 1× main | PDAF | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | Ultrawide AF is not established |
| Flash | Supported | フラッシュ / LED flash | Top controls/settings | Rear | Auto / On / Off in current generic camera help | `VERIFIED_OFFICIAL` | Verify exact UI icons on device |
| Aperture | Fixed, not user-adjustable | 絞り / Aperture | Not a control | Main f/1.8; ultrawide f/2.2; selfie f/2.2 | Fixed | `VERIFIED_OFFICIAL` | Do not teach aperture as an adjustable exposure control |
| Optical/native focal choices | 0.5× and 1× | レンズ / Lens | Viewfinder selector | Rear | 0.5× ultrawide; 1× main | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | No telephoto camera is listed |
| Digital zoom | Supported | 高精細デジタルズーム / Digital zoom | Pinch/zoom control | Rear | Up to 8× | `VERIFIED_OFFICIAL` | 2× and above are not a dedicated optical telephoto lens |
| Dedicated macro camera | Not present in the two-camera hardware list | マクロカメラ / Macro camera | N/A | N/A | None | `VERIFIED_OFFICIAL` | “Macro” on the AF slider means near focus, not a third macro lens |
| Close-up method | Use 1× main camera at a suitable distance | 近接撮影 / Close-up | Photo or Pro focus | Prefer 1× | Exact minimum focus distance unknown | `VERIFIED_EQUIVALENT_MODEL` | 0.5× has poorer close-focus behavior in g56 testing; verify on this unit |
| Default pixel binning | Quad Pixel output, approximately 12.5 MP nominal | クアッドピクセル / Quad Pixel | Normal Photo/Pro | Main | Four 0.8 µm pixels combined to effective 1.6 µm | `VERIFIED_OFFICIAL` + `VERIFIED_EQUIVALENT_MODEL` | Exact saved dimensions should be checked from one photo |
| High-resolution capture | Supported and observed | 最大画素 / Maximum resolution | 詳細 | Main rear | Full 50 MP class | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | Exact saved dimensions remain unmeasured |
| OIS | Not listed; likely absent | 光学式手ぶれ補正 / OIS | N/A | Main | Unknown/likely none | `VERIFIED_EQUIVALENT_MODEL` | Do not state “no OIS” publicly until device or exact specification confirms it |

## Photo modes and camera features

| Feature | Support conclusion | Japanese UI label | Where to find it | Lens/camera | Confidence | Firmware/UI caveat |
|---|---|---|---|---|---|---|
| Photo | Supported and observed | 写真 | Bottom mode carousel | Rear/front | `OBSERVED_SCREENSHOT` | Core mode |
| Pro | Supported and observed | プロ | Bottom mode carousel | Rear; front support is listed by Motorola | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | Captures show AF/WB/shutter/ISO/EV, RAW icon, 3:4, and histogram; lens-specific limits remain unknown |
| Portrait | Supported and observed | ポートレート | Bottom carousel or 詳細 | Rear/front | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | Equivalent-model testing says rear Portrait uses the main camera |
| Night Vision | Supported and observed | ナイトビジョン | 詳細; may trigger automatically | Rear/front | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | Motorola also lists 自動ナイトビジョン for 8 GB/12 GB variants |
| Panorama | Supported and observed | パノラマ | 詳細 | Rear | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | Exact operation was not opened |
| Ultra-Res | Supported and observed | 最大画素 | 詳細 | Main rear | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | The physical UI says 最大画素, not 超高解像度; output dimensions remain unmeasured |
| Scan | Supported and observed | スキャン | 詳細 | Rear | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | Exact operation was not opened |
| Google Lens | Supported | Google レンズ | Viewfinder/top controls or mode area | Rear | `VERIFIED_OFFICIAL` | Verify icon placement |
| Dual Capture video | Supported and observed | デュアル撮影動画 | 詳細 | Rear + front | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | Available layouts/combinations were not opened; no separate still-photo tile is visible |
| Timelapse / Hyperlapse | Supported and observed as Timelapse | タイムラプス | 詳細 | Rear | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | Exact speed options were not opened |
| Automatic smile capture | Supported | 自動スマイルキャプチャ | Camera settings | Rear/front | `VERIFIED_OFFICIAL` | Verify default and exact menu path |
| Gesture selfie | Supported | ジェスチャー自撮り | Selfie settings | Front | `VERIFIED_OFFICIAL` | Equivalent-model testing describes palm activation and a 3-second timer |
| Face retouch | Supported | フェイスレタッチ | Relevant photo/video settings | Rear/front | `VERIFIED_OFFICIAL` | Use neutral, optional language suitable for a young reader |
| Selfie photo mirror | Supported | セルフィーフォトミラー | Selfie settings | Front photo | `VERIFIED_OFFICIAL` | Verify default behavior |
| Selfie video mirror | Supported | セルフィービデオミラー | Selfie video settings | Front video | `VERIFIED_OFFICIAL` | Verify default behavior |
| Photobooth | Supported and observed | フォトブース | 詳細 | Front | `VERIFIED_OFFICIAL` + `OBSERVED_SCREENSHOT` | Exact operation was not opened |
| Spot Color | Not established for g66j | スポットカラー | Generic Camera help lists it | Unknown | `INFERRED` | Do not include in v1 until 詳細 screen confirms it |
| Tilt-Shift | Supported and observed | ティルトシフト | 詳細 | Rear | `OBSERVED_SCREENSHOT` | Exact adjustment workflow was not opened |
| Long Exposure mode | Not established and absent from g66j official feature list | 長時間露光 | Generic app help only | Unknown | `INFERRED` | Do not assume; native Pro exposure is currently the relevant path |
| Slow motion | Supported and observed | スローモーション | Primary bottom carousel | Rear | `OBSERVED_SCREENSHOT` | Capture shows 1×; resolution/frame-rate options were not opened |

## Pro controls

| Control | Support conclusion | Observed/official options | Location | Lens/camera | Confidence | Required verification |
|---|---|---|---|---|---|---|
| AF/manual focus | Supported | Expanded near-to-infinity slider observed, with macro flower and infinity icons | Leftmost in `AF | WB | Shutter | ISO | EV` | Rear; not front per generic help | `OBSERVED_SCREENSHOT` + `VERIFIED_OFFICIAL` | Lens identity is not visible in the new Pro captures; test 0.5× availability |
| White balance | Supported | Manual 7,500 K observed previously; 5,933 K observed in new captures; Auto 6,500 K observed previously; expanded warm/cool slider visible | Between AF and shutter | Pro | `OBSERVED_SCREENSHOT` | Endpoints are unknown; do not assume a minimum |
| Shutter speed | Supported | Manual 1/350 observed previously; Auto 1/20 observed previously; current automatic readout `A 1/6` observed in new captures | Between WB and ISO | Pro | `OBSERVED_SCREENSHOT` | `A 1/6` is an automatic exposure reading, not a proven manual endpoint. Determine endpoints separately on 1× and 0.5× |
| Generic shutter range | Model-dependent official guidance says 1/6000 s to 1/6 s **or** 1/4 s | Not safe as exact device range | Pro | Varies by sensor/device | `INFERRED` | Device slider endpoints control all recipes |
| ISO | Supported | ISO 100 and Auto ISO 3200 observed previously; ISO 200 and its expanded slider observed in the new set | Between shutter and EV | Pro | `OBSERVED_SCREENSHOT` | Endpoints on 1× and 0.5× remain unknown |
| Exposure compensation | Supported | Expanded scale visibly runs from -4 through 0.0 to +4 | Rightmost control | Pro when exposure remains automatic | `OBSERVED_SCREENSHOT` + `VERIFIED_OFFICIAL` | Step size and behavior when shutter/ISO are both manual remain unverified |
| RAW/DNG | Supported in the physical Pro UI | RAW top-bar control visible; exact output choices were not opened | Top format control in Pro | Pro; capture also shows 3:4 | `OBSERVED_SCREENSHOT` | Do not claim RAW-only versus RAW+JPEG until the selector is opened |
| Metering | Not documented or observed | None | Unknown | Unknown | `INFERRED` | Exclude unless device screen shows it |
| Histogram | Supported and observed | Live histogram | Upper-right of Pro viewfinder | Pro | `OBSERVED_SCREENSHOT` | Explain as optional; keep beginner flow usable without it |
| Focus peaking | Not documented or observed | None | Unknown | Unknown | `INFERRED` | Exclude unless device screen shows it |
| Saved presets | No evidence of custom Pro presets | None | Unknown | Pro | `INFERRED` | Do not promise preset saving; mode order can be customized instead |

### Wording warning: shutter explanation

Motorola's current Camera help describes the *result* of choosing a faster or slower shutter, not how to fix an existing dark or bright photo. That phrasing can be misread in a troubleshooting guide. Use an explicit cause-and-effect formulation and validate it in-device:

- Faster shutter → less light, darker exposure, less motion blur.
- Slower shutter → more light, brighter exposure, more motion blur and camera-shake risk.

## Video

| Feature | Exact-device conclusion | Lens/camera | Options | Confidence | Caveat |
|---|---|---|---|---|---|
| Standard video | Supported | Main rear | FHD 30/60 fps | `VERIFIED_OFFICIAL` | No official 4K option listed |
| Ultrawide video | Supported | 0.5× rear | FHD 30 fps | `VERIFIED_OFFICIAL` | 60 fps not listed |
| Selfie video | Supported | Front | FHD 30 fps | `VERIFIED_OFFICIAL` | Verify exact resolution selector UI |
| Dual Capture video | Supported | Rear + front | Layout/options unknown | `VERIFIED_OFFICIAL` | Check 詳細 screen |
| Timelapse/Hyperlapse | Supported | Rear | Speed options unknown | `VERIFIED_OFFICIAL` | Check device |
| Video stabilization | Not established | Rear | Unknown | `INFERRED` | Do not make promises until device/menu test |
| Slow motion | Supported and observed | Rear, 1× shown | Resolution/frame-rate options unknown | `OBSERVED_SCREENSHOT` | Do not invent fps values until opened on-device |

## Implications for the guide

1. Teach a **five-control phone framework**: shutter, ISO, EV, WB, and focus. Do not present aperture as adjustable.
2. Use **1× as the default starting view** and describe 0.5× as extra-wide. Do not publish exact sensor or aperture specifications until identity is confirmed.
3. The physical UI proves a 2× zoom choice, but not its optical/digital implementation. Do not call it a telephoto lens. Keep the g66j digital-zoom specification qualified as provisional until identity is confirmed.
4. For close-ups, teach the 1× main camera and distance/light—not a nonexistent dedicated macro lens.
5. Do not promise true long light trails. Generic Motorola help mentions 1/6 or 1/4 second as model-dependent examples, but `A 1/6` in the supplied screenshot is only a current automatic reading. Exact per-lens manual endpoints must come from the phone.
6. Public exact numeric settings must be values observed on the physical unit or values verified for the confirmed exact model. Other exact values stay in draft. When a control is observed but its next value or endpoint is unknown, public guidance may say to move it faster/slower or higher/lower without naming a target.
7. Use the actual UI label **詳細** from the screenshot even where Motorola's generic help says **その他**.

## High-priority requested captures and remaining evidence

The three high-priority requested captures are:

1. **About phone screenshot** showing device/product name and Android version.
2. **Pro, 1×, shutter expanded and dragged fully to the slowest manual value** (not the `A` position).
3. **Pro, 0.5×, shutter expanded and dragged fully to the slowest manual value** (not the `A` position).

The complete **詳細** screen is now captured. Build the site shell and all content that does not depend on those requested captures or the other unknowns below.

Other nonblocking evidence to collect later:

- Camera app version screen.
- RAW selector opened, showing whether JPEG/RAW/RAW+JPEG is offered.
- ISO slider at its low and high endpoints on 1× and 0.5×.
- WB slider at its low and high endpoints.
- EV step size. The visible endpoints are now confirmed as -4 and +4.
- Fastest manual shutter values and confirmation of Pro lens selection/0.5× behavior.
- Slow-motion resolution/frame-rate choices and the detailed workflows/options inside each Details mode.

## Principal sources

- [Motorola Japan: moto g66j 5G specifications](https://jp-jp.support.motorola.com/app/answers/detail/a_id/192473/)
- [Motorola Japan: moto g66j 5G product page](https://www.motorola.com/jp/ja/p/phones/moto-g/g-66-j/pmipmhu41mg)
- [Motorola: current Japanese Camera help — Pro mode](https://help.motorola.com/hc/apps/camera/c100f/ja-jp/CGT1900104236.html)
- [Motorola: current Japanese Camera help — modes](https://help.motorola.com/hc/apps/camera/c100f/ja-jp/CGT1805150809.html)
- [Motorola: current Japanese Camera help — lenses and resolution](https://help.motorola.com/hc/apps/camera/c100f/ja-jp/CG0040567548.html)
- [Mineo-hosted Motorola moto g66j 5G user guide (Android 15 baseline)](https://support.mineo.jp/contract/pdf/moto_g66j_5g_01.pdf)
- [Amateur Photographer: global moto g56 camera review](https://amateurphotographer.com/review/motorola-g56-review/) — equivalent-model evidence only
- User screenshots of XT2529-3 regulatory information and Japanese Camera Pro UI.
