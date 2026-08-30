# Athlete Signal Split final website QA

Verified 2026-08-29 against the packaged static artifact in `_site/` served at `http://127.0.0.1:4174/`.

## Automated interaction and accessibility

```bash
BASE_URL=http://127.0.0.1:4174 npm run check:redesign
```

Result: `PASS athlete signal split: 503 assertions`.

Coverage:

- `360 × 800`, `390 × 844`, `768 × 1024`, and `1440 × 1000`.
- General, Soccer, Basketball, Pickleball, Tennis, and Volleyball at every viewport.
- Matching athlete source, emotional line, accent, selected state, URL, and all 3 App Store CTA paths.
- Deterministic mobile portrait derivatives preserve each athlete’s face, full stance, and sport equipment.
- Invalid sport fallback, reload/shareable state, browser history, arbitrary-query isolation, and legacy `#features` / `#free-preview` fragment resolution.
- Arrow keys, Home, End, roving tab index, visible focus, target sizes, reduced motion, and meaningful no-JavaScript defaults.
- Serious/critical axe violations, console errors, failed network responses, broken images, horizontal overflow, clipped headlines, fixed-header clearance, first-viewport selector/CTA visibility, and product-screen width.
- Local redirect source verifies app ID `6771322181`, every fixed custom-product-page `ppid`, JavaScript redirects, and meta-refresh fallbacks.

## Site and production artifact checks

```bash
npm run build:public
npm run check:site
```

Results:

- 63 public-source HTML pages, 47 articles, and 56 sitemap URLs passed.
- `_site/` contains only the explicit public allowlist. Prototypes, project skills, design documentation, local environments, and review artifacts are excluded.
- Public artifact secret scan passed.
- `/app` redirect source files remain unchanged.
- Direction contract and seed `fc520847` survive in `_site/index.html`.
- `git diff --check` passed.

## Lighthouse mobile lab evidence

Lighthouse `12.8.2`, default mobile throttling, local packaged production artifact:

- Performance: `98`
- Accessibility: `100`
- Best Practices: `100`
- SEO: `100`
- First Contentful Paint: `0.9s`
- Largest Contentful Paint: `2.3s`
- Total Blocking Time: `0ms`
- Cumulative Layout Shift: `0`
- Speed Index: `0.9s`
- Legible font-size audit: passed

Full JSON: `.impeccable/review/lighthouse-mobile.json`.

These are lab results, not verified real-user Core Web Vitals.

## Rendered evidence

- Main viewports: `.impeccable/review/desktop.png`, `mobile.png`, `small-mobile.png`, and `tablet.png`.
- Full pages: `.impeccable/review/desktop-full.png` and `mobile-full.png`.
- Section crops: desktop/mobile `method`, `inside`, and `closing` captures in `.impeccable/review/`.
- Sport-state crop review: `.impeccable/review/desktop-sport-states.png` and `mobile-sport-states.png`.
- Approved prototype references: `docs/design/prototypes/article-reboot/signal-split-desktop.png` and `signal-split-mobile.png`.

## Independent review

- Impeccable full review: `fix`; both listed fixes later scored resolved; final disposition `ship`.
- UI/UX review: mobile crop finding resolved; final disposition `ship`.
- Independent beauty score: `91/100`; required `≥90` ship gate passed.
- Impeccable detector ran once in degraded regex mode because its own runtime could not resolve the installed HTML/CSS parser modules. Its findings were an undercount, not a clean bill of health; Playwright, axe, manual rendered inspection, Vercel Web Interface Guidelines, and the independent finish reviewer supplied the remaining checks.
- Vercel Web Interface Guidelines were fetched from the current upstream source and applied to `index.html`, `home.css`, and `home.js`.

## Asset integrity

- Real Progress screen remains complete, upright, unmodified, and unstacked.
- Approved logo/icon remain unchanged.
- Desktop athlete portraits remain approved source derivatives.
- Mobile athlete images are deterministic responsive derivatives made only from those approved sources. Build script: `scripts/build-mobile-athlete-assets.mjs`; provenance: `assets/awakening/ASSET_MANIFEST.md` and `docs/design/asset-manifest.json`.
- No image generation occurs at runtime or during page visits.

## Remaining device limitation

Browser automation proves final App Store URLs and `ppid` values. It does not prove which gallery Apple displays inside the native App Store on a physical iPhone. That remains a device/account verification.

## Release boundary

Implementation and verification are complete locally. No deployment, publication, push, or account-setting change was performed.
