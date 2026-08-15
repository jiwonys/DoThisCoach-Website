# Production Visual QA

## Evidence matrix

The production homepage was rendered with Playwright at:

- 1440 × 900
- 1024 × 768
- 390 × 844
- 360 × 800

Each viewport was captured at 0%, 15%, 30%, 50%, 70%, 90%, and 100% scroll. Three interactive states were also captured: Adaptive Day active, Food selected in the six-system explorer, and the Coach conflict resolved. The production matrix contains 40 screenshots per pass.

## Highest-impact production corrections

### 1. Product-plane overflow

**Observation:** the first production pass reported `document.scrollWidth` of 1496 px at a 1440 px viewport and 528 px at a 390 px viewport. Rotated screenshot planes retained their HTML height attribute while CSS changed only their width, increasing the transformed bounding box.

**Hypothesis:** preserving intrinsic aspect ratio in CSS and clipping only the spatial chapters would remove overflow without flattening the composition.

**Result:** screenshot planes now use `height: auto`; the progress chapter clips transformed edges; the fallback and system map stay inside viewport bounds. Final measured widths exactly match 1440, 1024, 390, and 360 pixels.

### 2. Mobile WebGL startup cost

**Observation:** the immersive hero looked correct, but the first mobile Lighthouse run scored 59 with 6,810 ms Total Blocking Time under throttled CPU.

**Hypothesis:** mobile does not need to compile WebGL before the visitor understands the product. A real-product static material can establish the visual language, while the Canvas mounts near the chapter where interactivity becomes meaningful.

**Result:** mobile WebGL now mounts when Adaptive Day approaches the viewport. Mobile Lighthouse rose to 91, Total Blocking Time fell to 0 ms, and the first viewport still shows the woven system, Today seam, real product UI, semantic copy, and CTA.

### 3. Small-label contrast

**Observation:** the first Lighthouse accessibility pass scored 97. The Today seam label inherited parent opacity, and small green labels on the warm Preview background were below 4.5:1.

**Hypothesis:** separating line treatment from text opacity and using a deeper material green on the light chapter would preserve the palette while meeting contrast requirements.

**Result:** desktop and mobile Accessibility now score 100. The Preview retains its calm material contrast without losing the DoThis signal color.

## Final scores

| Dimension | Score | Rationale |
| --- | ---: | --- |
| Visual impact | 10/10 | The first viewport establishes a large, responsive technical material rather than a decorative device mockup. |
| Originality | 9/10 | The shared-tension metaphor is product-specific and avoids common WebGL landing-page motifs. |
| Composition | 9/10 | Asymmetric copy, material, labels, and product UI remain balanced across all required viewports. |
| Typography | 9/10 | Oversized type carries the narrative while body copy, labels, and legal terms remain readable. |
| Product clarity | 9/10 | The hero explains the connected system; Adaptive Day demonstrates it; real screens prove it. |
| Motion continuity | 9/10 | One scroll owner and one timeline owner create a continuous story; interaction motion has separate ownership. |
| CTA clarity | 10/10 | Start Free remains persistent; App Store CTAs appear in hero, Preview, and finale. |
| Brand fit | 10/10 | Athletic fabric, tension, load, and release create a visual language specific to DoThis. |
| Mobile quality | 9/10 | Mobile has its own composition, static-first rendering tier, touch controls, and exact-width layout. |
| Performance | 9/10 | Lighthouse reaches 100 desktop and 91 mobile; WebGL remains deferred and adaptively tiered. |

## Anti-“AI website” review

The final experience was inspected specifically for generic generated-design patterns.

- No glowing orb, torus knot, star field, floating sphere, or random particle system is present.
- No purple-blue gradient or neon cyberpunk HUD is present.
- WebGL geometry expresses shared training context through tension and release; it is not decorative.
- The page does not repeat a generic rounded-card grid. Product controls use rails, seams, spatial planes, physical schedule segments, and editorial chapters.
- Real DoThis screenshots remain readable and are never replaced with invented dashboards.
- Real repository athletic imagery restores human scale without turning the page into a stock-photo fitness template.
- No testimonial, rating, review count, user count, metric, partnership, endorsement, or performance outcome was invented.
- Copy remains direct: the product knows that sport, training, food, recovery, and goals affect the same day.
- The Preview chapter intentionally becomes calmer instead of adding another visual explosion.
- The finale resolves the opening fragmentation into one coherent system before the semantic footer.

## Conversion review

- The hero states the product promise before requiring scroll.
- The App Store CTA is visible in the first viewport at all four required sizes.
- “7 days completely free,” “No payment required,” and “No automatic charge” remain factual and visible.
- The Adaptive Day interaction does not imply that the website performs live coaching or silently changes an app workout.
- Preview expiration behavior and paid-subscription renewal language remain explicit.
- Articles, support, privacy, terms, contact, and safety guidance remain reachable without WebGL or JavaScript.
