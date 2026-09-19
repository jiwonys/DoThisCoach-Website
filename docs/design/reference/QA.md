# Homepage validation

Production build and site check passed: 64 HTML pages, 47 articles, 56 sitemap URLs. Browser checks passed at widths 360, 390, 768, and 1440 pixels: no horizontal overflow, no console errors, and zero axe WCAG A/AA findings. Tested keyboard skip link, native FAQ and pricing disclosures, 10px spacing below the hero button, sport query routing and invalid fallback, preserved attribution query, CTA analytics event, support/legal/library routes, reduced motion, and no-JavaScript defaults. The original Coach image decoded pixels remain equal to the supplied PNG.

All six acquisition routes retained their exact App Store ppid identifiers, verified through browser redirect interception. Actual iPhone App Store gallery display was not tested.

Lighthouse 12.8.2, default mobile simulated throttling, production preview: performance 100, accessibility 100, best practices 100, SEO 100; FCP 0.8s, LCP 1.6s, TBT 0ms, CLS 0. Lab measurements only. The audit report completed, then the CLI exited 1 on Windows temporary-directory cleanup with EPERM. This was a cleanup error, not an audit failure.

Asset provenance scan: 37 rasters, none missing provenance. Only the approved logo and two authentic app screens appear in the homepage. The social preview is a deterministic browser capture of the opening.

Fresh independent visual review: ship, no blocking fixes. DESIGN.md/sidecar are refreshed after that review. Detector findings against the rejected prior design are superseded by the user-selected reference adaptation. The optional sibling exercise catalog was absent during article generation; catalog validation was skipped, and site validation passed.

Screenshots and detailed browser/Lighthouse evidence: .impeccable/review/reference/. No new runtime dependencies or generated imagery.
