# Screenshot Evidence Inventory

**Capture date shown by filenames:** 2026-09-04  
**Device UI language:** Japanese  
**Image dimensions:** 921 × 2048 px each  
**Research evidence class:** `OBSERVED_SCREENSHOT` (maps to implementation registry `status: observed_device`)

These screenshots come from the physical phone and outrank generic Camera help when a label or visible feature differs. They show the app at one firmware/app state; avoid claiming hidden options or ranges that are not visible.

## File map and observations

| Normalized filename | Original filename | What it proves |
|---|---|---|
| `01-camera-settings-upper.png` | `Screenshot_20260904-095922_カメラ.png` | Camera Settings; inner-camera photo resolution is Standard; Watermark is Off; Google Lens is On; AI Audio submenu; H.265/HEVC “Efficient video” is Off; selfie mirroring is Off; Shooting method submenu |
| `02-camera-settings-middle.png` | `Screenshot_20260904-095925_カメラ.png` | Shooting Assistant; Quick Capture by twisting wrist twice; Keep previous mode Off; Save location Off; Storage is SD card; Camera Feedback submenu |
| `03-camera-settings-lower.png` | `Screenshot_20260904-095928_カメラ.png` | Help, Reset, and Version information entries; corroborates the middle settings section |
| `04-slow-motion-mode.png` | `Screenshot_20260904-100217_カメラ.png` | Slow motion is a primary carousel mode; capture shows 1× |
| `05-video-mode.png` | `Screenshot_20260904-100222_カメラ.png` | Video mode; visible 0.5×, 1×, 2× choices; visible FHD 30, microphone, and 9:16 controls |
| `06-photo-mode.png` | `Screenshot_20260904-100226_カメラ.png` | Photo mode; visible 0.5×, 1×, 2× choices; top controls include Google Lens-style icon, flash Off, 9:16, timer Off, and Settings |
| `07-portrait-mode.png` | `Screenshot_20260904-100229_カメラ.png` | Portrait is a primary carousel mode; top 9:16, timer Off, Settings; depth/portrait adjustment icon visible |
| `08-details-mode-grid.png` | `Screenshot_20260904-100250_カメラ.png` | Complete Details grid: Scan, Night Vision, Panorama, Maximum Pixels, Photobooth, Tilt-shift, Timelapse, Dual Capture Video |
| `09-pro-af-expanded.png` | `Screenshot_20260904-100258_カメラ.png` | Pro top bar shows flash Off, RAW, 3:4, timer Off, Settings; live histogram; AF slider with macro-to-infinity cues; bottom row AF/WB/shutter/ISO/EV; visible WB 5,933 K, `A 1/6`, ISO 200, EV 0.0 |
| `10-pro-wb-expanded.png` | `Screenshot_20260904-100302_カメラ.png` | White-balance slider with automatic and lighting/weather pictograms; current 5,933 K; does not show numeric endpoints |
| `11-pro-shutter-expanded.png` | `Screenshot_20260904-100305_カメラ.png` | Shutter slider is selected; knob is at `A`; current readout is `A 1/6`. This is an automatic reading, **not** a manual slowest-shutter endpoint |
| `12-pro-iso-expanded.png` | `Screenshot_20260904-100307_カメラ.png` | ISO slider selected at 200; endpoints are not numerically exposed |
| `13-pro-ev-expanded.png` | `Screenshot_20260904-100326_カメラ.png` | EV slider visibly spans -4 through 0.0 to +4; exact step interval is not proven |

## Exact Japanese labels safe to use

- Primary carousel: `スローモーション`, `動画`, `写真`, `ポートレート`, `プロ`, `詳細`
- Details grid: `スキャン`, `ナイトビジョン`, `パノラマ`, `最大画素`, `フォトブース`, `ティルトシフト`, `タイムラプス`, `デュアル撮影動画`
- Camera Settings: `カメラ設定`, `インカメラの写真の解像度`, `透かし`, `Google レンズ`, `AI付きオーディオ`, `効率的な動画`, `自撮りを反転`, `撮影方法`, `撮影アシスタント`, `クイック撮影`, `前回モードを保持`, `位置情報を保存`, `ストレージ`, `カメラフィードバック`, `ヘルプ`, `リセット`, `バージョン情報`
- Pro controls: `AF`, `WB`, shutter icon, `ISO`, EV icon/value

## Facts that remain unresolved

1. The retail product name and current Android version: no About Phone screen is present in this set.
2. The Camera app version: the Version Information row is visible but was not opened.
3. The slowest/fastest manual shutter endpoints at 1× and 0.5×.
4. Whether Pro mode exposes a lens selector or separate 0.5× behavior; the Pro captures do not show a lens selector.
5. ISO and WB numeric endpoints, EV step interval, RAW output choices, Slow-motion fps, and each Details-mode sub-screen.

## Publication rules for Codex

- Public recipes must be validated against the machine-readable capability registry. A visible exact fact/value may use `publicUse: allowed`; hidden options and ranges remain prohibited.
- Never convert `A 1/6` into “slowest shutter 1/6 s.”
- Use `最大画素`, not a guessed translation such as `超高解像度`, when describing the current physical UI.
- Call the visible tile `デュアル撮影動画`; do not imply a separate Dual Capture still-photo tile exists.
- 2× is a visible choice. The provisional baseline has no dedicated telephoto camera, but the physical unit's optical/digital implementation is not directly proven; call it the 2× zoom choice and do not call it a telephoto lens.
- Screenshots may be cropped and annotated for education, but do not alter labels, fabricate state, or obscure uncertainty.
