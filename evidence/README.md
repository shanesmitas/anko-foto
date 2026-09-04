# Screenshot Evidence

The `screenshots/` directory contains all 13 user-supplied full-resolution PNGs, copied without visual modification and given ASCII-safe descriptive filenames.

The complete original-to-normalized filename mapping and detailed observations are in `../research/screenshot-evidence.md`.

Evidence handling:

- Treat visible UI as `OBSERVED_SCREENSHOT` evidence.
- In the implementation registry, map directly visible facts and values to `status: observed_device`; use `publicUse: allowed` only for exactly what the image proves.
- Preserve these originals; make crops/annotations as separate files.
- Never infer hidden slider endpoints or submenus from an icon alone.
- `A 1/6` is the current automatic shutter readout, not a manual shutter limit.
- Do not imply that illustrative photography was captured by this phone unless provenance proves it.
- The screenshots do not contain an About Phone screen or Camera Version Information detail screen.
- The three high-priority requested captures and the larger set of nonblocking unknowns are listed separately in `../research/device-capability-matrix.md`; do not interpret the priority list as a complete unknowns list.
