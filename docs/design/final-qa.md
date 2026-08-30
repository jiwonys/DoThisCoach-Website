# Final website QA

Verified 2026-08-29 against the packaged static artifact in `_site/` served at `http://127.0.0.1:4174/`.

## Automated interaction and accessibility

```bash
BASE_URL=http://127.0.0.1:4174 npm run check:redesign
```

Result: `PASS production redesign: 224 assertions`.

Coverage:

- 360 × 800, 390 × 844, 768 × 1024, and 1440 × 1000.
- General, Soccer, Basketball, Pickleball, Tennis, and Volleyball at every viewport.
- Matching athlete board, workout board, benefit, accent, selected state, URL query, and all 3 App Store CTA paths.
- Selected sport control remains visibly centered inside the horizontal selector after deep links, state changes, resizing, and orientation-sized viewport changes.
- Invalid sport fallback, reloadable/shareable state, browser back history, and arbitrary-query isolation.
- Keyboard selector behavior, visible focus, mobile/tablet navigation, Escape close, FAQ operation, and no-JavaScript fallback.
- Axe serious/critical violations, console errors, failed network responses, broken images, horizontal overflow, required footer links, and reduced motion.

## Site and deployment checks

```bash
npm run build:public
npm run check:site
```

Results:

- 63 public-source HTML pages, 47 articles, and 56 sitemap URLs passed.
- `_site/` contains only public runtime files and excludes `.agents`, `docs`, prototypes, Node dependencies, virtual environments, and image-generation tooling.
- Public artifact secret scan passed.
- No runtime Google Fonts request remains; font files are self-hosted with OFL license copies.
- All `/app` redirect source files remain unchanged.

## Lighthouse mobile lab evidence

Lighthouse 12.8.2, default mobile throttling, local packaged production artifact:

- Performance: 96
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- First Contentful Paint: 1.1s
- Largest Contentful Paint: 2.7s
- Total Blocking Time: 0ms
- Cumulative Layout Shift: 0
- Speed Index: 1.1s

Full JSON: `docs/design/final/lighthouse-mobile.json`.

## Visual review

- Final desktop/mobile full-page captures and section crops are in `docs/design/final/`.
- Product screens remain readable in focused section captures.
- Impeccable detector findings were resolved where mechanical: hover contrast, evidence-label sizing, mobile small text, dropdown border/shadow overlap, and aphoristic repeated copy.
- Full-bleed section padding warnings were false positives; section children use bounded containers or explicit inline padding.
- Warm paper ground remains intentional because the user approved Field Manual and the color derives from the existing DoThis brand direction.
- Vercel Web Interface Guidelines review confirmed semantic controls, focus, reduced motion, explicit image dimensions, lazy loading, URL state, keyboard access, self-hosted critical fonts, and touch behavior.
- Independent Impeccable finish review reached `ship`. Reviewer-scored fixes resolved the generic capsule header, week-sequence eyebrow labels, and mobile active-sport visibility regression; remaining findings are clear.

## Remaining device limitation

Browser automation proves the constructed App Store URL and `ppid`. It does not prove which gallery Apple displays inside the native App Store on a physical iPhone. That remains a final device/account verification.
