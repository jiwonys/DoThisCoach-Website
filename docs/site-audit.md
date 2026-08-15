# DoThis Website Audit

**Audit date:** August 15, 2026

**Production URL:** https://dothiscoach.com

**Pages repository:** `jiwonys/DoThisCoach-Website`

**Pages branch:** `main`
**Current production commit:** `790a93a` (`Disclose TikTok advertising measurement`)

## Executive summary

The current website is a functioning, fast, static GitHub Pages site. It communicates the product accurately, exposes a clear App Store path, preserves legal and support content, and has a useful ten-article SEO library. The live homepage exactly matches the local `index.html` audited in this repository.

The site is not currently an immersive product experience. Its visual language is a familiar light SaaS pattern: centered pill navigation, soft green/cyan gradients, rounded cards, repeated grids, static phone screenshots, and uniform reveal behavior. The page explains individual features but does not make the core DoThis promise—shared context changing what the athlete should do next—feel like a connected system.

The correct transformation is not a framework rewrite. Keep GitHub Pages, the custom domain, static legal/support/article routes, existing product truth, and semantic content. Add a bundled, progressively enhanced homepage experience that can support React Three Fiber while leaving article and legal reading paths lightweight. WebGL must never become the only carrier of product meaning.

## Repository and source state

### Pages repository

- Path: `/Users/jiwonkim/Desktop/DoThis/DoThisCoach-Website`
- Remote: `https://github.com/jiwonys/DoThisCoach-Website.git`
- Branch: `main`
- Local `HEAD` matched `origin/main` at audit start.
- No tracked production modifications existed at audit start.
- Existing untracked files were limited to `.playwright-cli/`, `output/`, and `marketing/google-ads/app-launch-2026-07/.DS_Store`.
- Those files were not deleted or incorporated into production during Phase 1.

### App repository

- Path: `/Users/jiwonkim/Desktop/DoThis/DoThis`
- Remote: `https://github.com/jiwonys/DoThis.git`
- The app repository is heavily dirty with active mobile/backend work.
- Website work must remain isolated in the Pages repository. No app changes are required for the website rebuild unless new verified screenshots are intentionally exported later.

## Current stack

| Area | Current implementation |
| --- | --- |
| Application model | Static multi-page site |
| Framework | None |
| Build tooling | None for homepage; Node scripts generate articles |
| Runtime JavaScript | One vanilla `script.js` plus a small article CTA script |
| Styling | One global `styles.css` plus `articles/article.css` |
| Package dependencies | None declared |
| Hosting | GitHub Pages |
| Custom domain | `dothiscoach.com` through `CNAME` |
| Deployment | GitHub Actions on every push to `main` |
| Homepage rendering | Semantic static HTML with progressive vanilla-JS interactions |
| Article rendering | Generated static HTML from `scripts/article-content.mjs` |
| WebGL / Three.js | Not present |
| Analytics provider | None on the website |

### Deployment behavior

`.github/workflows/pages.yml` checks out the repository and uploads `path: .` as the Pages artifact. This preserves the current route structure, but it also makes every tracked repository file eligible for publication instead of deploying a deliberately built output directory.

The repository contains about **24.37 MiB** of tracked content. About **23.02 MiB** is in `marketing/`, primarily advertising source images and masters that are unrelated to the website runtime. A production asset build should eventually upload an explicit output directory so source assets, scripts, and campaign files are not published as part of the site.

GitHub Pages and the custom domain should remain. The deployment artifact boundary should change only when the homepage build pipeline is introduced and verified.

## Route inventory

All audited production routes returned HTTP 200.

### Primary routes

| Route | Purpose | Current treatment | Preserve |
| --- | --- | --- | --- |
| `/` | Marketing homepage | Full product overview and conversion | Yes; radical experience redesign allowed |
| `/articles/` | Training library | Lightweight semantic index | Yes; remain non-WebGL |
| `/privacy.html` | Privacy policy | Static legal document | Exact commitments and URL |
| `/terms.html` | Terms of Use | Static legal document | Exact commitments and URL |
| `/support.html` | Support and account guidance | Static support page | URL, contact details, deletion guidance |
| `/robots.txt` | Crawl policy | Allows crawling and points to sitemap | Yes |
| `/sitemap.xml` | Search discovery | Lists 15 URLs | Yes; regenerate safely when routes change |
| `/feed.xml` | Training-library RSS | Generated static RSS | Yes |

### Article routes

Ten article URLs exist and must remain stable:

1. `/articles/beginner-gym-workout-plan-3-day/`
2. `/articles/full-body-dumbbell-workout/`
3. `/articles/upper-lower-workout-split/`
4. `/articles/push-pull-legs-routine/`
5. `/articles/strength-training-weight-loss-preserve-muscle/`
6. `/articles/body-recomposition-workout-plan/`
7. `/articles/progressive-overload-guide/`
8. `/articles/30-minute-workout-busy-professionals/`
9. `/articles/volleyball-strength-conditioning-workout/`
10. `/articles/knee-friendly-lower-body-workout/`

`npm run check:site` passed with 15 HTML pages, 10 articles, and 15 sitemap URLs.

## Current homepage architecture

`index.html` contains 534 lines and is one semantic document. Major sections are:

1. Sticky global navigation
2. Hero with two real app screenshots
3. Seven-day Premium Preview explanation
4. Six-feature card grid
5. Three Coach workflow examples
6. Interactive product screenshot switcher
7. Four-step “How it works” section
8. Three human/product visual panels
9. Daily rhythm strip
10. Article previews
11. Pricing and Preview terms
12. Partnerships
13. Safety disclaimer
14. Semantic footer

The current JavaScript supplies:

- sticky-header state;
- active navigation state;
- intersection reveals;
- CTA ripple effects;
- feature filtering;
- three Coach scenario tabs;
- six screenshot tabs with keyboard arrow support;
- pointer tilt on feature cards;
- ambient pointer parallax;
- counter and old phone-mockup logic.

## Product truth and conversion content

### Product model already represented

The homepage accurately names the six connected areas:

- Today
- Workout
- Food
- Coach
- Goals
- Progress

It also already contains the strongest product-story seed for the rebuild:

> “I have volleyball tonight at 7:00 PM.”

That scenario connects a planned lower-body lift, sport load, recovery, fueling, and a practical Coach recommendation. It should become the central experiential demonstration rather than remain a three-card workflow.

### Factual claims that must remain accurate

- Every account receives one seven-day Premium Preview.
- No payment method is required to start the Preview.
- The Preview does not become a paid subscription automatically.
- Users decide whether to subscribe after the Preview.
- New AI work and private cloud backup require Premium after the Preview.
- Existing local workouts, logs, weigh-ins, goals, and progress remain on the device after the Preview.
- Paid subscription pricing and renewal terms are shown by Apple.
- DoThis provides general wellness and educational guidance, not medical advice, diagnosis, treatment, or rehabilitation.

No user counts, ratings, testimonials, outcome guarantees, clinical endorsements, or performance statistics exist. None may be invented during the redesign.

### App Store conversion path

The canonical App Store URL is:

`https://apps.apple.com/us/app/dothis-ai-fitness-coach/id6771322181`

The homepage currently exposes four App Store links. The article index exposes one, and generated articles include header, mid-article, and end-of-article CTAs. The rebuild must preserve a clearly available primary CTA throughout major homepage chapters without turning it into a constant visual obstruction.

## SEO and structured data

### Strengths

- Homepage has a unique title and description.
- Homepage has a canonical URL.
- Homepage includes Open Graph metadata.
- Homepage includes `Organization` and `SoftwareApplication` JSON-LD.
- Article index has canonical, Open Graph, and `ItemList` structured data.
- Every article has unique metadata, canonical URL, `Article` JSON-LD, and `BreadcrumbList` JSON-LD.
- Articles provide complete useful content before asking for a download.
- `robots.txt`, sitemap, and RSS are present and live.
- `scripts/check-site.mjs` validates titles, descriptions, canonical coverage for the homepage/articles, JSON-LD parsing, local references, sitemap targets, article count, and RSS presence.
- Current live Lighthouse SEO score is 100 on desktop and mobile.

### Gaps and cautions

- Privacy, terms, and support pages do not currently declare canonical URLs or Open Graph metadata.
- The homepage Open Graph image is the 1080 × 1080 logo, not a purpose-built share image.
- Article Open Graph images are SVG; prior QA already notes that some social crawlers prefer raster images.
- Article generator output is minified into very long lines, which is valid but harder to review manually.
- Search Console submission remains a documented manual step.

The redesign must not move article copy into client-only rendering or delay indexable content behind WebGL.

## Analytics and privacy

The website currently loads no third-party analytics provider.

`articles/article.js` dispatches a local `dothis:cta` event and optionally pushes a privacy-limited event to `window.dataLayer` if a data layer already exists. Its payload contains only:

- fixed event name;
- article slug;
- CTA location.

Homepage App Store clicks are not currently instrumented. If homepage CTA tracking is added, it should reuse a small first-party event contract and existing infrastructure. Do not add a new analytics provider as part of the visual rebuild.

The privacy policy includes current TikTok App Events disclosures for the native app. Website work must not broaden tracking claims without a corresponding privacy review.

## Assets

### Reusable production assets

| Asset group | Quantity | Dimensions | Approximate encoded size |
| --- | ---: | --- | ---: |
| DoThis logo PNG | 1 | 1080 × 1080 | 400 KB |
| Real app screenshots | 6 | 640 × 1391 each | 34–68 KB each |
| Human/product images | 3 | 1200 × 800 each | 68–187 KB each |
| Article cover SVGs | 10 | 1200 × 630 | ~1 KB each |

The six app screenshots are valuable because they show the real product and already cover Today, Workout, Food, Coach, Goals, and Progress. They should remain readable and can become spatial content in the selected experience.

The three human images add useful reality and should be evaluated for selective reuse. Their origin and usage rights are not documented in the repository. No general asset license or attribution manifest exists. Licensing/provenance must be confirmed before treating those images—or the advertising masters—as permanent brand assets.

### Asset problems

- The 1080 × 1080 logo is delivered at a 40 × 40 CSS size in navigation and footer.
- Lighthouse attributes roughly 389 KiB of mobile responsive-image waste to this logo.
- The logo is the only non-modern raster on the initial route and accounts for most avoidable initial transfer.
- Source and production assets are not formally separated.
- The Pages workflow publishes the repository root rather than a curated production artifact.

## Accessibility

### Strengths

- Primary content is semantic HTML.
- Heading structure and landmarks are generally sound.
- Navigation and screenshot controls use labels and pressed states.
- The screenshot gallery supports left/right keyboard navigation.
- Product screenshots have useful alt text.
- Decorative duplicate imagery uses empty alt text where appropriate.
- Workout tables are keyboard-focusable and horizontally scrollable on narrow screens.
- `prefers-reduced-motion` currently collapses CSS animation and transition durations.
- The site works without WebGL because no essential content depends on it.
- Lighthouse accessibility score is 96 on both audited profiles.

### Current failures and risks

- One homepage paragraph uses `#687084` over `#edf3f7`, producing a measured 4.42:1 contrast ratio instead of the required 4.5:1.
- No explicit global `:focus-visible` system appears in the main stylesheet.
- Horizontally scrollable mobile navigation does not expose a clear visual affordance that more links exist.
- Future immersive scenes must provide equivalent DOM copy, keyboard operation, reduced-motion behavior, and a WebGL-failure fallback.
- Pointer influence cannot become a required control.

## Responsive behavior

The current desktop hero is clear, balanced, and immediately shows real product UI. At 1024 × 768 the same composition still works, though the screenshot dominates the right side and lower feature cards begin below the viewport.

The mobile layout is functional but not intentionally art-directed:

- The download button becomes a full-width row above a horizontally scrolling nav.
- Only the first navigation items are visible at load.
- The Preview proof chips clip horizontally without an obvious scroll cue.
- A 390 px viewport measured a 407 px document width, creating 17 px of horizontal overflow even though `body` hides overflow.
- The secondary hero screenshot and several horizontal controls extend outside the viewport.
- The hero becomes a long vertical stack before the product screenshot is meaningfully visible.
- The mobile composition is a shrunk/reordered desktop treatment rather than a separate camera/content strategy.

The article and support mobile layouts are substantially stronger. They remain readable, use direct hierarchy, and avoid unnecessary effects. Those routes should receive only global brand refinements, not the homepage WebGL burden.

## Current visual language

### What works

- The dark app UI contrasts well against the light marketing surface.
- Green is strongly associated with DoThis.
- Real screenshots establish credibility quickly.
- Hero copy and primary CTA are immediately legible.
- Pricing copy becomes calmer and more trustworthy.
- Articles feel editorial and readable rather than promotional.

### What looks generic

- Soft mint/cyan radial gradients
- Ambient blurred blobs
- Repeated rounded cards
- Pill navigation and pill controls throughout
- Three-column feature grids
- Uniform fade/reveal logic
- Static, rotated phone screenshots
- Hover tilt on otherwise conventional feature cards
- Repeated centered section headings
- White-card-on-pale-background rhythm

The current site could plausibly represent many AI wellness products. It does not yet have a spatial or material language that could only belong to DoThis.

### Missing product expression

The site lists six features but does not visually show shared context moving between them. A visitor can read that volleyball, recovery, nutrition, and a workout are connected, but the page never makes those inputs reorganize into a single recommendation. This is the central opportunity for the rebuild.

## Existing technical debt relevant to the rebuild

The stylesheet and JavaScript retain an unused older phone-mockup system:

- `.phone-stage`
- `.phone`
- `.goal-card`
- `.task-card`
- `.metric-grid`
- `.decision-card`
- `[data-count]` animation logic

No current HTML route uses those classes or data attributes. The live homepage used roughly 24.9 KB of the 32.4 KB stylesheet in a simple coverage pass, leaving about 23% unused in that state. Some unused rules are valid route- or interaction-specific styles, but the old phone system is clearly stale and should not be carried into the new architecture.

## Performance baseline

### Live Lighthouse, August 15, 2026

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance score | 91 | 100 |
| Accessibility score | 96 | 96 |
| Best Practices score | 100 | 100 |
| SEO score | 100 | 100 |
| First Contentful Paint | 0.8 s | 0.2 s |
| Largest Contentful Paint | 3.5 s | 0.6 s |
| Total Blocking Time | 0 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 2.3 s | 0.2 s |
| Initial transfer | 511 KiB | 511 KiB |

The initial route currently makes six essential requests: HTML, CSS, logo, two hero screenshots, and JavaScript. Console inspection showed no errors or warnings.

### Performance implications for the rebuild

The current site has almost no JavaScript execution cost and no GPU workload. The immersive homepage must preserve quick semantic content and CTA delivery even if the 3D layer loads later.

Initial production targets for the future experience should include:

- DOM hero copy and primary CTA visible before secondary 3D assets finish loading.
- No artificial loader delay.
- Desktop target near 60 FPS on reasonable modern hardware.
- Mobile floor of 30 FPS with a higher target on current devices.
- No regression from CLS 0.
- Main-thread blocking kept low enough to protect interaction responsiveness.
- Explicit caps for DPR, draw calls, triangles, texture memory, render targets, and postprocessing.
- Adaptive quality and a static fallback.

Exact WebGL budgets belong in `docs/performance-budget.md` after the selected prototype establishes its defining effect.

## Technical constraints and recommended evolution

### Preserve

- GitHub Pages hosting
- `dothiscoach.com` and `CNAME`
- All route URLs
- Static, semantic article and legal content
- Article-generation source and validation script
- Sitemap, RSS, robots, metadata, and JSON-LD
- App Store URL and conversion copy
- Legal, privacy, support, pricing, and safety language
- Current real product screenshots unless newer verified exports replace them

### Introduce only where justified

The homepage requirements justify a bundled interactive island. Recommended direction for the foundation phase:

1. Keep semantic homepage content in HTML or server-independent generated markup.
2. Add Vite only as an asset/build layer, not as a reason to convert every route into a single-page app.
3. Mount one React experience root for the persistent WebGL canvas and tightly coupled interactive demonstrations.
4. Keep articles, privacy, terms, and support as static documents with lightweight shared CSS and no homepage 3D bundle.
5. Preserve direct deep links and trailing-slash article URLs.
6. Change GitHub Pages deployment to upload a verified build directory only after parity tests pass.
7. Use one persistent canvas on the homepage unless prototypes prove isolation is measurably better.
8. Keep high-frequency values outside React render state.
9. Document animation ownership before production choreography.

This is an architectural recommendation, not a Phase 1 production change.

## Risks

1. **Performance regression:** R3F, textures, shaders, and GSAP can turn a 511 KiB static page into a multi-megabyte mobile experience.
2. **SEO regression:** replacing semantic static HTML with client-only React would weaken a currently strong crawlable site.
3. **Conversion regression:** spectacle could obscure the App Store CTA or seven-day Preview terms.
4. **Accessibility regression:** canvas-only content could remove keyboard, screen-reader, and reduced-motion access.
5. **Mobile regression:** desktop camera coordinates cannot be scaled down and expected to work.
6. **Asset licensing:** current human and advertising images have no repository license manifest.
7. **Deployment pollution:** root artifact publishing exposes source and marketing files unnecessarily.
8. **Motion conflict:** adding Lenis, GSAP, `useFrame`, CSS transitions, and pointer response without ownership rules would create competing control.
9. **Brand drift:** black/neon sci-fi, generic particles, glass cards, and floating icons would conflict with athlete-performance positioning.
10. **Product inaccuracy:** an interactive adaptation demo must remain a visual explanation, not imply medical reasoning or silent app mutation.

## Highest-impact problems to solve first

1. **No embodied product model.** Six features are separate cards instead of one connected adaptive system.
2. **Generic visual identity.** Current materials, section patterns, and interactions resemble broad SaaS conventions.
3. **Mobile composition and overflow.** Navigation, proof chips, and hero media do not form an intentional small-screen first experience.

These three problems should drive the creative directions and prototype evaluation. Secondary cleanup should not distract from them.

## Reusable foundation for creative exploration

- “Unleash your inner athlete.” hero message
- “What should I do next?” product question
- Volleyball-at-7-PM adaptation scenario
- Six-system model: Today, Workout, Food, Coach, Goals, Progress
- Six real product screenshots
- Three human/product images, pending provenance confirmation
- Seven-day Preview truth and App Store CTA
- Dark app-interface palette against a lighter physical material world
- Article library as proof of serious training knowledge
- Existing direct, non-hype copy style

## Phase 1 verification record

- `npm run check:site`: passed
- Live/local homepage SHA-256: matched
- Primary routes: HTTP 200
- Browser console: zero errors and zero warnings on audited pages
- Desktop screenshots: 1440 × 900 and 1024 × 768 captured
- Mobile screenshots: 390 × 844 and 360 × 800 captured
- Representative homepage mid-scroll and pricing states captured
- Representative article captured on desktop and mobile
- Support page captured on mobile
- Lighthouse mobile and desktop baselines captured

Audit artifacts are stored under `output/playwright/site-audit/` and remain outside production architecture.

## Phase 2 entry criteria

Creative exploration can begin without modifying production. Each of the three directions must:

- express shared context rather than isolated features;
- use a distinct metaphor, spatial architecture, camera, material, typography, interaction grammar, and signature effect;
- preserve semantic copy and obvious App Store conversion;
- define mobile, reduced-motion, and WebGL-failure behavior;
- use real product UI legibly;
- identify asset and licensing needs;
- state performance risk before prototyping;
- avoid the generic visual patterns listed in this audit.
