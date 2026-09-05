# Own the Court production QA

## Latest refinement — 2026-09-05

Added the real Today/Workout/Progress demonstration, clearer free-trial CTAs, sport surface textures, floodlight assemblies, and a touch/keyboard Rotate control. Logo inlays and sport-specific geometry remain intact. Four App Store CTAs are synchronized with each selected sport.

Latest packaged checks: **219 passed**, including all three screenshot selections and image decoding, Rotate/Reset, mobile navigation, six acquisition routes, history, reduced motion, and fallbacks. Site check remains 63 pages. No serious/critical axe violations in tested states.

Lighthouse 12.8.2 mobile: **91 performance / 100 accessibility / 100 best practices / 100 SEO**, LCP **2.6s**, TBT **260ms**, CLS **0.03**. These supersede the earlier performance measurements below for this refinement. Hero and product demonstration were visually inspected on desktop and mobile. Current evidence is in `.impeccable/review/own-the-court-plus/`.

The independent ship review below applies to the original court promotion. This later refinement was verified in the implementation turn; it did not receive another independent review.

Verified 2026-09-05 against the packaged static site served at http://127.0.0.1:4174/.

## Result

- User-approved Own the Court prototype promoted to the homepage.
- Two embedded DoThis logo inlays per court, facing opposite halves.
- Distinct basketball, soccer, volleyball, tennis, and pickleball equipment/markings.
- Desktop tabs: Method, Inside, Sports, Training Library, Compare, Pricing, Partners, Support.
- Native mobile navigation adds Privacy and Terms; Escape, outside click, and selecting a link close it.
- Footer preserves the existing public destinations.
- Founder pricing and free 7-day Preview remain present.

## Checks performed

- `npm run build:public`: passed; original article exercise-catalog warnings remain.
- `npm run check:site`: passed, 63 HTML pages, 47 articles, 56 sitemap URLs.
- `npm run check:redesign`: passed, 191 checks.
- Widths 360, 390 (650px short height), 768, and 1440.
- Every sport, fixed App Store destination, valid/invalid query, browser history, reload, no arbitrary query forwarding.
- Mobile menu links, keyboard dismissal, anchor navigation, footer paths.
- No script errors, horizontal overflow, or serious/critical axe violations in checked states.
- JavaScript-disabled navigation and logo fallback; blocked Three.js fallback.
- Logo assets packaged at `assets/courts/`; prototypes and generation scripts excluded from the public build.
- All existing `app/` redirect files unchanged.

## Rendered evidence

Desktop and mobile whole-page screenshots plus the mobile menu were inspected. They preserve the approved prototype composition and embedded-logo court treatment. Final screenshot copies are in `.impeccable/review/own-the-court/`.

Independent review disposition: **ship**, with no material promotion defects. A subsequent geometry-batching optimization preserves the same visual meshes and materials; the production checks passed again.

The existing design detector ran in degraded regex mode and flagged the former design documentation's tokens. Documentation was refreshed from this approved implementation; the detector result was not treated as a complete accessibility audit.

## Performance

Lighthouse 12.8.2, default mobile throttling, local production preview:

- Performance: **97**
- Accessibility: **100**
- Best practices: **100**
- SEO: **100**
- LCP: **2.6s**
- TBT: **0ms**
- CLS: **0.025**

Before static geometry batching, performance scored 70 with 1,010ms TBT. Court markings and equipment are now combined by shared material and shadow behavior. This reduced initialization work without changing the composition. These are lab measurements, not real-user Core Web Vitals.

## Scope and limits

Browser tests confirm destination URLs and custom product-page identifiers, not the native iPhone App Store gallery. The 3D scene uses the existing pinned Three.js CDN dependency; a static logo remains visible if it cannot load. Playing-area markings use sport-specific ratios, while miniature net heights are exaggerated for legibility. The founder availability limit is supplied by the user; there is no invented live counter.
