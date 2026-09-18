# Photographic editorial — release validation

This revision supersedes the rejected lime/blue and 3D proposal. No 3D models, renderer, canvas, or direct Three.js/esbuild dependencies remain. Blender was never used. Hero photography uses existing licensed human-shot footage stills.

## Functional checks

`npm run check:redesign` tests the production build at port 4193. `QA_URL` and `QA_DIR` override the server and evidence directory. Evidence is in `.impeccable/review/editorial/`.

- 120 combinations: six sports × five app features × 360, 390, 768, and 1440 px widths.
- Each sport updates its nearby heading and genuine workout screenshot without moving the page. The changed heading stays in the viewport beside the controls.
- Preview disclosure remains within 14 px of its primary button; actual CSS gap is 10 px.
- All six download buttons follow the selected sport. Billing, history, direct links, invalid input, unrelated query preservation, menus, FAQ, and failed screenshot retry pass.
- No horizontal overflow or page errors; no canvas element. Meaningful photography, app evidence, and download action remain with JavaScript disabled or reduced motion enabled.
- Zero automated axe WCAG A/AA violations at all four widths. This is not a complete accessibility conformance claim.
- Six actual intercepted App Store requests match their unchanged source URLs and custom-page identifiers, including meta-refresh fallbacks. Native iPhone App Store galleries were not visually verified; see redirect-check.json.

## Build, performance, and integrity

`npm run build:public` and JavaScript syntax checks pass. `npm run check:site` reports 64 HTML pages, 47 articles, and 56 sitemap URLs. The optional sibling exercise catalog is absent and its catalog validation is skipped, as reported by the existing build.

Lighthouse 12.8.2, local production preview, simulated mobile throttling: performance **91**, accessibility **100**, best practices **100**, SEO **100**. Full settings and metrics are in lighthouse-summary.json. These are lab measurements, not real-user Core Web Vitals.

The supplied Coach screenshot is lossless WebP at its original 1290 × 2796 resolution. Decoded RGBA pixels match the original exactly. Approved logo pixels also match the base commit; only provenance metadata was added. The used asset directories contain 41 rasters with zero missing provenance entries. Public output excludes source screenshots, design documentation, and provenance sidecars; checks found no secret-bearing configuration or private-key patterns.

The revision's one design detector run reported 83 differences against the superseded DESIGN.md: ten colors, three fonts, 66 type sizes, and four radii. The mandatory documenter records the actual new world after review; no repeated detector loop is used.

## Repository and release

Work begins at 840c910 on codex/you-can-too-20260918. The user's pre-pull work remains in stash cf7e0066e3165a44cb571ecd1f26f5978f364757. App routing, legal/support/library destinations, and product facts remain intact. The final independent review and live deployment verification are recorded separately after completion.
