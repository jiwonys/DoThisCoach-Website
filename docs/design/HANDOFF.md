# DoThis marketing redesign handoff

## Athlete-facing outcome

The homepage now lets an athlete choose General, Soccer, Basketball, Pickleball, Tennis, or Volleyball and immediately see matching athlete imagery, product evidence, benefit copy, accent color, URL state, and the correct App Store custom product-page destination. The full page explains how Athlete Week becomes a workout, shows training/nutrition/progress/Coach evidence, clarifies athlete control, states verified Premium Preview behavior, and closes with the selected sport CTA.

## Production implementation

- `index.html`: semantic homepage narrative, SEO metadata, structured data, sport selector, verified product/Preview copy, FAQ, guides, legal/support footer, and persistent direction contract.
- `home.css`: approved Field Manual system, responsive layouts, self-hosted fonts, focus/touch/reduced-motion behavior, sport-state accent, and product evidence treatments.
- `home.js`: fixed allowlisted sport state, synchronized proof/copy/CTA routing, URL history and deep links, resize-aware selected-control visibility, keyboard navigation, mobile menu, and existing local analytics event pattern.
- `assets/sports/`: 12 optimized WebP derivatives from approved App Store masters.
- `assets/fonts/`: self-hosted Archivo Black and Work Sans WOFF2 files with OFL license copies.

## Build and deployment boundary

- `scripts/build-public-site.mjs` writes an explicit public allowlist to `_site/`.
- `.github/workflows/pages.yml` keeps GitHub Pages but deploys `_site/`, preventing project skills, design documentation, prototypes, local environments, and generation tooling from becoming public runtime files.
- `scripts/check-site.mjs` ignores non-public build/review directories while retaining route, metadata, sitemap, and link checks.

## Design context and provenance

- Product truth: `PRODUCT.md`
- Design system: `DESIGN.md`
- Machine-readable design extensions: `.impeccable/design.json`
- Homepage surface brief: `.impeccable/surfaces/index-html.md`
- Asset manifest: `docs/design/asset-manifest.json`
- Contact sheet: `docs/design/contact-sheet.png`
- Destination manifest: `docs/design/app-store-destinations.json`
- Reference analysis: `docs/design/reference-analysis.md`
- Tool record: `docs/design/tooling.md`
- Image gap analysis: `docs/design/image-gap-analysis.md`

No paid `gpt-image-2` request was needed. Existing approved assets covered the shipped direction.

## Verification

- Production interaction/accessibility suite: 224 assertions passed.
- Existing site check: 63 HTML pages, 47 articles, and 56 sitemap URLs passed.
- Lighthouse mobile: 96 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO.
- Public artifact boundary, secret scan, self-hosted font boundary, broken-image checks, console/network checks, reduced motion, no-JavaScript fallback, and all sport/CTA mappings passed.
- Independent Impeccable reviewer final disposition: `ship`; remaining findings clear.
- Final browser evidence: `docs/design/final/`.

## Local preview

```bash
npm run build:public
python3 -m http.server 4174 --bind 127.0.0.1 --directory _site
```

Open `http://127.0.0.1:4174/`. Append a validated state such as `?sport=tennis` to inspect a sport-specific homepage state.

## Deliberately unresolved

- Verify each `ppid` gallery on a physical iPhone/App Store account. Browser automation confirms the final URL and identifier only.
- No owner-approved founder statement was supplied, so none was fabricated.
- Premium prices and renewal terms remain unpublished until reverified and approved.

## Release status

Implementation is complete locally. Production was not deployed, published, or pushed by this task.
