# Homepage surface brief — Hit harder. Move faster.

## Scope and authority

- Surface: `/`, Persuade mode, complete local homepage.
- Implementation: `index.html`, `src/home.css` compiled to `home.css`, `home.js`, `footage.html`, and copied public build under `_site/`.
- Audience: adult recreational tennis, basketball, volleyball, pickleball, and soccer athletes who also strength train.
- Intended understanding: workouts, nutrition, and recovery can be organized around the athlete’s sport, confirmed schedule, and goals.
- Primary action: follow the appropriate iPhone App Store route. A website click is not an install and does not itself start the Premium Preview.
- Authority: `PRODUCT.md` for facts and constraints, `DESIGN.md` for the built visual system, and the first body comment in `index.html` plus `docs/design/beyond-the-court/DIRECTION.md` for the selected direction.

The user selected proposal A, Film first, on September 17, 2026 and instructed “Keep going.” This authorized the full local homepage implementation. Publication is still unapproved. The prior homepage and its documentation are historical backups under `docs/design/beyond-the-court/pre-full-homepage/`; they do not describe the current build. This was a pinned, code-led continuation; no generated composition or separate QUALITY BAR card was supplied.

## Built composition

1. The unchanged logo and overlaid navigation lead into a full-width real athlete film. The protected two-line headline reads “Hit harder.” / “Move faster.”, followed by the off-court proposition, one emerald “Build my game” action, iPhone context, Preview disclosure, text-only film control, and a normal anchor into the page.
2. “The work off court. The difference on it.” connects workouts, nutrition, and recovery. Three functional links select the corresponding product view.
3. “Your sport. Your starting point.” introduces six sports and five feature views beside one readable, real app screenshot. The screenshot links to its full-size image in a new tab. The selected example account is labeled explicitly.
4. A second, independently controlled gym film supports “You bring the drive. We help with the plan.” The adjacent Coach link selects that feature.
5. Three ordered onboarding steps explain choosing the athlete’s context, confirming the week, and building the first workout.
6. The Preview and membership area presents exact terms, monthly/yearly controls, the Founding 200 offer, and included capabilities.
7. Six native FAQ disclosures cover experience, sports, Preview, schedule/equipment changes, logging/progress, and iPhone availability.
8. Ruled links retain the training library, comparisons, and partner paths.
9. The photographic closing, “Bring more to your game.”, repeats the selected sport’s App Store action. The footer retains support, privacy, terms, footage credits, and illustrative-stock/example-account disclosure.

The built system uses near-black #0D0D14, dark surface #13131C, warm text #F5F0E8, muted #A7A7BC, emerald #10B981, and fine #2A2A3A rules. Local Archivo Black (`Archivo`) supplies display type; Work Sans (`Work`) supplies the reading and control hierarchy. Copy has protective scrims, content follows native scrolling, and desktop columns stack at 650px. Navigation changes to a native mobile disclosure at 900px. Detailed tokens and geometry live in `DESIGN.md`.

## State, evidence, and acquisition contract

Sport state accepts `general`, `tennis`, `basketball`, `volleyball`, `pickleball`, and `soccer`. Feature state accepts `workout`, `fuel`, `athlete-week`, `coach`, and `progress`. Billing accepts `monthly` or `yearly`. These states use `?sport=`, `?view=`, and `?billing=` with default values omitted when writing history. Invalid values fall back to general/workout/monthly. Reload and history navigation restore state; unrelated page query parameters are preserved in page history but are not forwarded into download links.

All five acquisition actions (header, hero, product, pricing, closing) synchronize to `/app/` for General or `/app/SPORT/` for a named sport. Existing redirect files and verified `ppid` values remain intact; authoritative destinations are in `docs/design/app-store-destinations.json`.

The real screenshot path is `assets/next-game/SPORT-FEATURE.webp`. Selection updates screenshot alt text, example-account caption, explanatory title/body, and full-size link. General uses the example volleyball account. Film mapping is tennis for General/Tennis, basketball for Basketball, soccer for Soccer, and gym for Volleyball/Pickleball. Gym imagery is explicitly described as off-court training, never as footage of those sports. The closing poster follows the same film mapping; the separate training film remains gym footage.

Current anchors include `#main`, `#beyond`, `#your-game`, `#inside`, and `#pricing`. Legacy `#method`, `#sports`, `#features`, and `#free-preview` anchors remain available. Supporting destinations include `/articles/`, `/compare/`, `/partner/`, `/support.html`, `/privacy.html`, `/terms.html`, and `/footage.html`.

## Exact offer and claim limits

The one-time 7-day Premium Preview begins after the first personalized workout is ready. No payment is required, and it does not charge automatically. After it ends, local workouts, logs, and progress remain available; new personalized AI features and cloud sync require Premium.

The Founding 200 promotion is $6.99 per month or $69.99 per year for the first 200 subscriptions in each offer. Yearly billing displays “$69.99 billed yearly. Save $13.89 vs. 12 monthly payments.” No remaining availability or price-lock duration is asserted. The hero is aspirational, not a guarantee of performance or a medical claim. Athletes confirm schedules and training choices; the site does not claim autonomous or guaranteed outcomes.

## Media and fallback behavior

Public films and posters live under `assets/beyond-court/`. The four human-shot Mixkit sources, license evidence, hashes, treatments, and public-build mapping are recorded in `docs/design/beyond-the-court/asset-manifest.json`. Each selected item page explicitly permits commercial/personal use; the restricted volleyball item was rejected. Footage credits are available publicly through `footage.html`. Stock subjects are illustrative and are not customers or endorsers; incidental apparel marks do not imply partnerships. Native screenshot provenance lives in `docs/design/next-game/asset-manifest.json`. Archivo Black and Work Sans licenses live in `assets/fonts/`.

The shared Film class uses normal muted, inline, looping playback. Both hero and gym film retain posters and text-only Play/Pause/Retry labels. Reduced motion removes sources, hides video, and disables playback; save-data starts without fetching video and permits explicit manual opt-in. Offscreen and hidden-document films pause. Failures preserve posters and expose retry. A user-selected pause is not overridden by returning to the section. Without JavaScript, the default headline, posters, General acquisition links, screenshot, monthly offer, disclosures, and navigation remain useful; inactive sport, feature, film, and billing controls are hidden.

## Verification and publication boundary

Recorded browser QA passed 163 checks in Chrome across 360, 390, 768, and 1440 CSS px, including all 30 sport/feature combinations per width, acquisition links, images, state/history, pricing, FAQ, mobile menu, reduced motion, no-JavaScript behavior, and absence of page/resource errors. Axe reported zero violations at those four sizes. WebKit with an iPhone-sized viewport passed 38 checks. Separate fallback checks verified save-data fetch prevention, manual play, poster preservation after failure, and successful retry. These are browser and emulation results, not physical-device testing or an accessibility conformance certification.

The final mobile Lighthouse lab report records 98 performance, 100 accessibility, 100 best practices, and 100 SEO. The parent build checks reported 64 HTML files, 47 articles, and 56 sitemap entries; JPEG provenance scanning reported 4 images and 0 missing records. Lab scores do not establish real-user Core Web Vitals.

Fourteen valid rendered captures are in `output/playwright/beyond-the-court-full/`: full, hero, and pricing at 1440, 390, 360, and 768; practice at 1440 and 390. The finish reviewer verified the captures and resolved the only UI finding by confirming text-only film controls. Its final recorded remaining item was replacement of the obsolete design documentation, completed by this documentation refresh. Evidence lives in `docs/design/beyond-the-court/full/FINISH_REVIEW.md`, `browser-qa.txt`, `webkit-qa.txt`, `media-fallback-qa.txt`, and `lighthouse-mobile-final.json`.

No deployment or live-publication approval is implied by this local build or its checks.
