# WebGL and Page Performance Budget

## Release budgets

### Page experience

| Metric | Desktop budget | Mobile budget |
| --- | ---: | ---: |
| Lighthouse Performance | ≥95 | ≥90 |
| Lighthouse Accessibility | 100 | 100 |
| Lighthouse Best Practices | 100 | 100 |
| Lighthouse SEO | 100 | 100 |
| Largest Contentful Paint | ≤1.5 s | ≤3.5 s |
| Total Blocking Time | ≤100 ms | ≤100 ms |
| Cumulative Layout Shift | ≤0.02 | ≤0.02 |
| Initial JavaScript, gzip | ≤90 KB | ≤90 KB |
| Initial transferred page weight | ≤650 KB | ≤550 KB |

### WebGL scene

| Metric | Desktop budget | Mobile budget |
| --- | ---: | ---: |
| Sustained frame rate | approximately 60 FPS on a reasonable modern laptop | at least 30 FPS on a modern iPhone |
| Device-pixel ratio | adaptive, maximum 1.55 | adaptive, maximum 1.2 |
| Draw calls | ≤20 | ≤12 |
| Triangles | ≤35,000 | ≤15,000 |
| Loaded WebGL textures | ≤3 | ≤3 |
| Texture edge | ≤2048 px | ≤1400 px |
| Shadows | 0 dynamic shadows | 0 dynamic shadows |
| Postprocessing passes | 0–2 | 0–1 |
| Additional render targets | ≤1 | 0 |

## Measured production result

The production build was measured from the built `dist` artifact with Lighthouse and Playwright on August 15, 2026.

| Metric | Desktop | Mobile |
| --- | ---: | ---: |
| Lighthouse Performance | 100 | 91 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 0.4 s | 2.0 s |
| Largest Contentful Paint | 0.7 s | 3.3 s |
| Total Blocking Time | 10 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 0.6 s | 2.0 s |
| Total transferred weight | 501 KiB | 447 KiB |

The first mobile implementation compiled WebGL during the hero and produced 6,810 ms of throttled Total Blocking Time. The release architecture now presents a real-product CSS/DOM material immediately and mounts WebGL only when the Adaptive Day chapter approaches the mobile viewport. This raised mobile Performance from 59 to 91 and removed the blocking time.

## Built asset profile

- Semantic homepage HTML: 22.74 KB raw / 6.17 KB gzip.
- Homepage CSS: 26.63 KB raw / 6.53 KB gzip.
- Initial controller: approximately 2.25 KB gzip.
- GSAP and Lenis motion chunk: 50.83 KB gzip.
- Deferred React/R3F runtime: 63.31 KB gzip.
- Deferred WebGL engine chunk: 238.51 KB gzip.
- Deferred scene module: 3.03 KB gzip.
- Responsive favicon: 34.26 KB, reduced from the 400.18 KB source logo.
- WebGL textures: two existing 640 × 1391 product screenshots, approximately 104 KB combined.
- No downloaded 3D models, video backgrounds, postprocessing, shadows, physics engine, or extra render targets.

The WebGL engine is deliberately a separate dynamic import. Vite module preload is disabled so the browser does not fetch the R3F/Three.js payload before the deferred mount decision.

## Scene profile

The selected scene uses one displaced woven plane, one product plane, and six low-segment anchor meshes:

- measured draw calls: 6 desktop / 4 mobile;
- measured triangles: 14,882 desktop / 4,354 mobile;
- measured GPU textures: 3 desktop / 3 mobile;
- measured headless frame sample: 101.6 FPS desktop with a 16.70 ms p95 frame, and 120.5 FPS mobile with a 9.50 ms p95 frame;
- primary desktop weave: 104 × 70 segments, approximately 14,560 plane triangles;
- primary mobile weave: 56 × 38 segments, approximately 4,256 plane triangles;
- dynamic lights: two point lights plus one ambient light;
- postprocessing passes: 0;
- shadow maps: 0;
- render targets: 0.

The measurements were collected in headless Chromium on an Apple M3 Pro and show ample margin against the desktop and mobile budgets. Physical-device thermal and battery testing remains the authoritative final validation for sustained mobile sessions.

## Adaptive quality and resilience

- `PerformanceMonitor` lowers DPR to `1` and reduces pointer pressure after sustained decline.
- Desktop WebGL loads during idle time; mobile WebGL loads near the Adaptive Day chapter.
- Rendering stops when the document becomes hidden.
- `webglcontextlost` immediately reveals the static fallback; restoration removes the failure state.
- WebGL initialization and React errors leave all semantic copy, navigation, screenshots, interactions, and App Store CTAs available.
- `prefers-reduced-motion` never mounts WebGL, removes the sticky choreography, and presents the final semantic states directly.

## Ongoing release checks

Every material homepage change should repeat:

1. the four-viewport Playwright screenshot matrix;
2. mobile and desktop Lighthouse runs against the production artifact;
3. draw-call and triangle inspection using `?perf=1`;
4. reduced-motion, JavaScript-disabled, and WebGL-failure checks;
5. at least one physical current iPhone and one older supported iPhone pass before a major visual release.
