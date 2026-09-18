# Your next chapter — validation

## Build and scope

The homepage is rebuilt around an original sporting identity, genuine app screens, and optional Three.js equipment. Blender was not used. The branch starts at `840c910`; the pre-pull draft remains in stash `cf7e0066e3165a44cb571ecd1f26f5978f364757`.

`npm run build:public` completed. `npm run check:site` passed for 64 HTML pages, 47 articles, and 56 sitemap URLs. JavaScript syntax and `git diff --check` passed. The build reports that a sibling exercise catalog is unavailable; its optional catalog validation is skipped, while the site checks complete.

## Browser verification

`npm run check:redesign` runs `scripts/next-chapter-check.mjs` against the production preview at port 4193. Set `QA_URL` and `QA_DIR` to use another preview or evidence directory.

- 120 combinations: six sports × five feature views × widths 360, 390, 768, and 1440.
- Real screenshot loading, selected state, all six download links, and horizontal overflow checks.
- Monthly/yearly pricing, browser history, direct links, invalid state fallback, and unrelated query preservation.
- Mobile menu, Escape handling, FAQ, keyboard rotation, and failed screenshot loading followed by retry.
- Initial artwork and content with reduced motion, no JavaScript, data saver, and unavailable WebGL.
- Zero page errors and zero automated WCAG A/AA axe violations at the four tested widths. Automated checks are not a full accessibility conformance claim.
- Six actual redirect requests intercepted at the App Store destination and matched to the unchanged source URL, including each `ppid`; meta-refresh targets also match. Native iPhone App Store galleries were not visually verified.

Screenshots and the machine-readable browser report are in `.impeccable/review/next-chapter/`. The first screenshot round had an unpainted 360 px product image; it was replaced after explicit image decoding and scroll warming. The fresh finish review uses the valid replacement. Initial-state screenshots show the static equipment poster and activation button; opening screenshots show activated 3D.

## Performance

Lighthouse 12.8.2 on the local production build, default simulated mobile throttling: performance **96**, accessibility **100**, best practices **100**, SEO **100**; LCP **2.8 s**, total blocking time **0 ms**. See `lighthouse-summary.json` for complete settings and measurements. These are lab results, not real-user Core Web Vitals. The CLI wrote its report before a Windows Chrome temporary-directory cleanup error (`EPERM`).

The initial eager 3D implementation scored 43 for performance and blocked startup for 2,750 ms. The released approach loads the renderer only after the visitor chooses “Explore in 3D”; the page and artwork are immediately usable. Rendering stops when idle, offscreen, or in a hidden tab, and device pixel ratio is capped at 1.5.

## Asset integrity and release checks

- Coach screenshot: original 1290 × 2796; lossless WebP; exact decoded RGBA equality confirmed against the supplied source.
- Approved application icons: decoded pixels match the base commit; only provenance metadata was added.
- Provenance scan: 47 raster assets across the used asset directories, zero missing origins.
- One design detector run: 69 findings compared the replacement system against the old DESIGN.md (13 color, three font, 51 type-size, two radius findings). The documenter records the final built system; the detector was not rerun.
- Public artifact filename and secret-pattern checks found no secret-bearing configuration, private keys, source directories, or generation scripts. Provenance sidecars and original user screenshot sources stay outside the public artifact.

Deployment status and independent review conclusions are recorded separately, after completion.
