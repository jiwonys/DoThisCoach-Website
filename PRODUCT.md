# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are adult recreational soccer, basketball, pickleball, tennis, and volleyball athletes who also strength train. They want to understand whether DoThis can coordinate gym work with the sport and schedule they already have, then reach the correct App Store product page.

## Product Purpose

DoThis helps athletes organize strength training around their sport, weekly schedule, recovery context, goals, and completed training. The marketing website succeeds when a qualified athlete understands that purpose and chooses the appropriate App Store action. A website click is not an install.

## Positioning

DoThis connects a user-confirmed Athlete Week with sport-aware workout generation while keeping nutrition, progress, and Coach context in the same iPhone app. The athlete remains responsible for confirming their schedule and training choices.

## Operating Context

Visitors evaluate DoThis on mobile and desktop, often from sport-specific acquisition campaigns. General, Soccer, Basketball, Pickleball, Tennis, and Volleyball routes lead to distinct App Store custom product pages. The published website is a static GitHub Pages site.

## Capabilities and Constraints

- Shipping product evidence includes Athlete Week scheduling, generated workouts, editable workout import, nutrition and macro logging, Coach context, and progress views.
- Website copy must remain consistent with current App Store and shipping-product evidence.
- `/app` and five sport routes are no-index JavaScript redirects with meta-refresh and anchor fallbacks. Their existing `ppid` values must remain intact.
- Existing URLs, metadata, canonical URLs, sitemap behavior, legal/support pages, and current analytics semantics must be preserved.
- The website must not imply medical outcomes, guaranteed performance, installs, or capabilities unsupported by the shipping app.
- The one-time 7-day Premium Preview begins after the first personalized workout is ready, requires no payment, and does not charge automatically. After it ends, local workouts, logs, and progress remain available; new personalized AI features and cloud sync require Premium.
- The user-approved founder promotion is $6.99 per month or $69.99 per year, with the first 200 subscriptions in each offer. The website must not invent remaining availability or price-lock duration. Availability and local prices are confirmed in the app before purchase.

## Brand Commitments

- Product name: DoThis: Train For Your Game.
- Approved DoThis logo and icon must remain unchanged.
- Starting proposition: “Train for your game. Not just the gym.”
- Voice is confident, concrete, athlete-focused, and free of shame, fake urgency, or generic fitness hype.
- Product evidence uses real DoThis screenshots. Generated athletes are illustrative campaign subjects, not customers or endorsers.
- On 2026-09-05, the user requested a complete homepage aesthetic reset and delegated creative judgment. The replacement direction is recorded in DESIGN.md; the prior homepage visual direction no longer constrains the redesign. The approved app logo remains unchanged.
- On 2026-09-17, the user selected the Film first proposal (A): “Hit harder. Move faster.” and the off-court workouts, nutrition, and recovery story. This authorizes the complete local homepage build in that direction; publication still requires approval.
- On 2026-09-18, the user superseded that direction with a complete, creative, motivational redesign, requested award-winning website research, and delegated executive decisions. The continuing redesign-and-deploy request authorizes publication after validation. The new direction is “You've still got game,” with original Three.js equipment and genuine product evidence. The user explicitly prohibited Blender. The supplied Coach conversation replaces the former Coach images on the homepage.

## Evidence on Hand

- Approved App Store marketing boards and real simulator captures are in the sibling application repository under `../DoThis/appstore/cpp-system/`.
- Optimized general product screens and an approved campaign image already exist under `assets/` in this repository.
- Local source defines all six App Store destinations and identifiers.
- The App Store page was browser-inspected on 2026-08-29 and showed the current title, category, icon, and screenshot gallery.
- No publication-approved customer testimonials or measured conversion claims were supplied.

## Product Principles

1. Make the athlete recognize their sport before asking for a click.
2. Show real product evidence at a readable scale.
3. Keep sport imagery, benefit copy, screenshot evidence, and App Store destination coherent.
4. Preserve athlete control and avoid overstating AI behavior.
5. Measure clicks honestly without calling them installs.

## Accessibility & Inclusion

The website must support keyboard and touch input, visible focus, zoom, reduced motion, semantic HTML, readable contrast, and meaningful non-JavaScript defaults. Athlete imagery should represent adult recreational athletes without presenting generated people as real customers.

The founder’s origin is beach volleyball; his supplied background includes eight years of gym training and six years of software engineering. This product context is retained from the September 17 upstream release.

- Later on 2026-09-18, the user rejected the acid/blue colors and 3D equipment, explicitly requested removing the models, grouping the iPhone/Preview disclosure with its action, and placing sport controls beside a visibly changing result. That correction supersedes the first September 18 direction. The revised homepage uses charcoal, chalk, restrained court red, real licensed photography, and sport controls directly above the actual app example.

- Latest September 18 correction supersedes all earlier directions: the user rejected the photographic editorial layout, requested a simpler homepage, explicitly selected black and logo green, and prohibited decorative pictures. The homepage now uses one pitch, one download CTA, the unchanged Coach screen, compact pricing, and footer links. Sport selectors are removed; sport-specific acquisition query routing remains. See docs/design/simple/DIRECTION.md.

- The user subsequently rejected the sparse homepage and selected MyFitnessPal as the visual reference. The current adaptation uses a centered green opening, black product sections, two genuine app screens, compact founder pricing, and three FAQ disclosures. Black/green identity and the prohibition on decorative pictures remain. See docs/design/reference/DIRECTION.md.
