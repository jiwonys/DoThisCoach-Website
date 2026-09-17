# Sport coaching website release — September 17, 2026

## Change

The homepage now introduces DoThis as an AI strength coach for the sport the visitor plays. A daylight pine-and-paper visual system, actual app screenshots, sport-specific product previews, and the founder's beach volleyball story replace the earlier all-dark homepage. The page retains a seven-day schedule demonstration but shows the athlete choosing the training dose while the match date stays fixed.

The redesign preserves the six App Store redirect pages and their exact custom product-page IDs. Articles, comparisons, partner functionality, support, and legal pages are not redesigned. Existing fragment destinations `#week`, `#athlete-week`, `#features`, `#coach`, and `#free-preview` still resolve.

## Verification

- `node --check home.js`: passed.
- `npm run build:public`: passed. Public packaging excludes tooling and private development directories. The pre-existing exercise catalog lookup points to a sibling `DoThis` directory unavailable on this machine; its optional advisory exercise-name check was skipped. No article content was edited.
- `npm run check:site`: passed; 63 HTML pages, 47 articles, and 56 sitemap URLs.
- `BROWSER_CHANNEL=chrome npm run check:redesign`: 257 checks passed against the packaged public site at 360, 390, 768, and 1440px, including explicit pricing-card containment at every width.
- Coverage includes all six sport states, invalid input fallback, selected-state semantics, URL reload/history, fixed Match Day, workout-load controls, keyboard feature tabs, native menu/FAQ behavior, image failure and retry, no-JavaScript defaults, and exact App Store redirect execution. Apple responses were intercepted to verify the constructed destination, without claiming a native App Store gallery check.
- Axe: no violations at the four checked widths. Manual visual checks covered selected and hovered controls; a conflicting hover background was corrected before the final captures. The final visual review also replaced mismatched general-sport artwork with a neutral native Progress screen, removed redundant section labels, and corrected narrow pricing-card containment.
- Lighthouse 12.8.2, default mobile simulated throttling, local public artifact `/`: performance 98, accessibility 100, best practices 100, SEO 100, largest contentful paint 2.4 seconds, cumulative layout shift 0. These are lab results, not field Core Web Vitals. The report completed; Chrome launcher's subsequent Windows temporary-profile cleanup returned EPERM.
- One mechanical design scan completed. Its findings were only comparisons with the previous design tokens: colors, fonts, sizes, and radii. The finished design system is recorded separately; no second scan was used to inflate results.
- Independent finish review: ship. The reviewer reopened the final mobile and desktop evidence, confirmed the three visible fixes, and found no visible regressions. The documenter then refreshed `DESIGN.md` and `.impeccable/design.json` from the finished implementation; the sidecar contains ten actual components and passed JSON validation.
- Existing Vercel Web Interface Guidelines reviewed for semantics, focus, keyboard interaction, reduced motion, image dimensions, local font loading, and input handling. No external tracking script was added. Homepage CTA events are local `dothis:cta` events and are not presented as installs or purchases.

## Evidence and provenance

Local QA directory: `C:/Users/Jiwon/.codex/tmp/dothis-site-20260917/`. It contains original-site and reference captures at desktop/mobile sizes, alternate centered-composition captures, final viewport and section screenshots, `checks.json`, `detector.json`, and `lighthouse-mobile.json`. Section captures set the sticky header to static only during cropping; viewport captures preserve its actual behavior.

Reference observation: Subscrr pairs a direct benefit with a large product screen; the former DoThis homepage delayed product evidence below a text-heavy opening. The redesign uses its own brand, content, and assets while putting real evidence in the first desktop viewport. A centered composition was also rendered and rejected because it pushed the product evidence farther down.

Existing native screenshots and App Store boards retain their original pixels. No image or video model was used. The new social share image is a deterministic browser composition documented in `assets/social/ASSET_MANIFEST.md`. Founder copy and offer terms come from the user's supplied story; current standard prices and preview/features were checked against the live App Store listing.

## Publication

Publication uses the existing GitHub Pages workflow after the final review. Release commit and live verification are recorded in the task's completion report.
