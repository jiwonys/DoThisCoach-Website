# Full homepage QA — September 17, 2026

## Scope and selection

The user selected A, Film first, and authorized the complete homepage build. The built candidate is served from `_site` at http://127.0.0.1:4339/. Source preview remains on port4338. No GitHub push or website publication occurred. The previous uncommitted homepage and design records were copied to `docs/design/beyond-the-court/pre-full-homepage/` before replacement.

## Implemented coverage

The selected hero leads into the off-court proposition, six-sport selector, five actual app views, secondary training film, three onboarding steps, exact Preview/Founding200 offer, monthly/yearly controls, six FAQ disclosures, training-library/compare/partner navigation, closing action, and legal/support/footage links. Existing `/app` routes, identifiers and query-forwarding behavior are unchanged. No article or comparison layout was redesigned.

The page remains useful without JavaScript: headline, normal links, product example, monthly offer, native FAQ, and native navigation remain; inactive scripted selectors and video controls are hidden. Video is muted, uses posters, pauses offscreen/when hidden, respects reduced motion and save-data, and supports manual playback/retry. Hero and training controls are text-only, so icon state cannot contradict their action labels.

## Verification results

- Public build passed. Site check passed across 64 HTML pages, 47 articles and 56 sitemap URLs. The emitted homepage retains its direction-contract comment.
- 163 Chromium production-preview checks passed: 120 sport/feature/width combinations, 360/390/768/1440 widths, complete sections, matching screenshots, correct acquisition routes, selected states, monthly/yearly prices, menu/Escape, native FAQ, invalid state, history, reload, page attribution preservation, keyboard skip link, offscreen pause, reduced motion, and no-JavaScript fallback.
- axe reported zero violations at all four checked widths. This is not a complete accessibility certification.
- WebKit with iPhone 15 emulation passed 38 checks: actual muted playback/manual pause/play, all six sports and five features, billing, menu/Escape, FAQ, reduced motion and no page errors. This is engine emulation, not a physical iPhone certification.
- Separate browser checks verified save-data makes no automatic video request, manual playback can opt in, media failure preserves the poster, and retry succeeds after transport recovers.
- All six built `/app` pages emitted the original app ID and sport-specific ppid in browser tests. Destination loading was intercepted only in the test; native App Store gallery appearance remains unverified.
- Lighthouse 12.8.2 on the local production preview, simulated mobile defaults: performance98, accessibility100, best practices100, SEO100. One lab measurement, not field Core Web Vitals. The last markup correction removed only a decorative playback icon and preserved the measured loading behavior.
- Asset scan: four new shipping JPEG posters, zero missing provenance. Original stock masters and provider-page captures remain local; they are not in the public artifact. The public builder omits retired center-court and next-game/film experiments. Packaged site size is approximately11MB; only the selected hero clip loads initially, and below-fold media waits for visibility.
- Public text assets were checked for provider-key patterns and secret-bearing env files; none found. No image/video generation happens on page visits or builds. No new analytics provider was introduced.

## Issues found and resolved

The first Lighthouse pass exposed an overly broad sport selector applying aria-pressed to body and a jump link label that omitted its visible text. Both were repaired. The first scrolled pricing captures showed the offscreen skip link due to fixed-element capture behavior; the link now uses a clipped focus-only pattern and final captures are clean. A clearer gym poster was extracted from the same licensed source at second6.

The independent finish review identified a static pause icon beside the Play label. The icon was removed consistently. A malformed intermediate local edit was caught by formatting/capture checks, restored before handoff, and never deployed. Complete-section assertions were added; the full Chromium checks passed after restoration. The same hero captures were refreshed for the reviewer's verdict. See `FINISH_REVIEW.md` for its precise scope. Root DESIGN, sidecar and surface briefs were replaced by the shipped documenter after the final implementation correction. The reviewer verified the documentation and marked both listed findings resolved; its ship verdict covers those fixes, not a new whole-site certification.

The design detector ran once in degraded parser mode. Alias font warnings refer to the same self-hosted Archivo Black and Work Sans. Palette warnings compare against the prior root record; the selected dark/emerald direction was explicit. Repeated no-payment wording carries verified product terms, not invented proof. Detector output is not claimed as a complete contrast audit.

## Evidence and reproduction

- `browser-qa.txt`, `webkit-qa.txt`, `media-fallback-qa.txt`, `route-qa.txt`.
- `lighthouse-mobile.json` preserves the first pass; `lighthouse-mobile-final.json` is the corrected measurement.
- `output/playwright/beyond-the-court-full/`: full, hero and pricing captures at four widths, plus practice details.
- `scripts/beyond-court-browser-check.js`: shared browser assertions. `BASE_URL=http://127.0.0.1:4339 npm run check:redesign` runs the same checks using the existing CI wrapper.
- Build: `npm run build:public`; source audit: `npm run check:site`; preview: `PORT=4339 PREVIEW_DIR=_site node scripts/serve-preview.mjs`.

Publication requires separate user approval under website AGENTS.md. Test results do not claim production deployment, measured conversions, guaranteed athletic outcomes, or all-browser/device coverage.
