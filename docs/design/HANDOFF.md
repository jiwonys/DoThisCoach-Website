# DoThis marketing redesign handoff

## Athlete-facing outcome

The homepage now feels like a second athletic awakening instead of product documentation. It opens with one lethal-athlete promise, confronts dormant identity, lets the visitor choose a sport through approved athlete portraits, reveals only three real app screens, and closes with a direct command to wake up and train. General, Soccer, Basketball, Pickleball, Tennis, and Volleyball still map to the correct App Store custom product-page destination.

## Production implementation

- `index.html`: sparse Second Awakening narrative, user-approved lethal-athlete language, SEO metadata, structured data, sport selector, restrained real product proof, minimal legal/support footer, and persistent direction contract.
- `home.css`: nocturnal arena world, full-viewport pacing, premium athlete photography, Work Sans/Cormorant Garamond typography, focus/touch/reduced-motion behavior, and synchronized sport accents.
- `home.js`: fixed allowlisted sport state, synchronized portrait/emotional line/CTA routing, URL history and deep links, resize-aware selected-control visibility, keyboard navigation, and existing local analytics event pattern.
- `assets/awakening/`: 6 optimized athlete campaign portraits derived from approved App Store hero sources.
- `assets/fonts/`: self-hosted Work Sans and Cormorant Garamond WOFF2 files with OFL license copies.

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

- Production interaction/accessibility suite: 229 assertions passed.
- Existing site check: 63 HTML pages, 47 articles, and 56 sitemap URLs passed.
- Lighthouse mobile: 97 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO.
- Public artifact boundary, secret scan, self-hosted font boundary, broken-image checks, console/network checks, reduced motion, no-JavaScript fallback, and all sport/CTA mappings passed.
- Independent Impeccable reviewer final disposition: `ship`; remaining findings clear.
- Final Second Awakening browser evidence: `docs/design/awakening/`.

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
