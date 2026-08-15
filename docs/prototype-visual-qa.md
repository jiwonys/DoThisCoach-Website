# Prototype Visual QA

## Test matrix

The three hero prototypes were rendered with Playwright at four required viewport sizes:

- 1440 × 900
- 1024 × 768
- 390 × 844
- 360 × 800

For every concept and viewport, six states were captured: page load, settled hero, 25% scroll, activated interaction, hero-to-proof transition, and the beginning of section two. The review therefore covers 72 screenshots per pass. The second pass repeated the same matrix after the first visual corrections.

## First-pass corrections

The three highest-impact shared defects were:

1. At mobile widths, the adaptive-day response and the WebGL layer occupied the same vertical region. The hypothesis was that moving the scene below a content-height floor would preserve both the explanation and the spatial system. The mobile scene now begins at a bounded `clamp(540px, 68svh, 600px)` position.
2. Two full-width action buttons consumed too much of the first mobile viewport. The hypothesis was that preserving the App Store action as the dominant button while treating “See the system adapt” as a compact semantic link would restore hierarchy and scene area. The secondary action now uses a lighter mobile treatment.
3. During initial shader and texture compilation, the visual region could appear empty. The hypothesis was that a low-cost structural backdrop would communicate the system immediately without an artificial loader. A CSS-only connective scaffold now renders beneath the Canvas and remains the no-delay first frame.

The second capture pass confirmed that the adaptive-day copy no longer collides with the scene at 390 × 844 or 360 × 800, the primary CTA remains dominant, and the first frame has intentional structure before WebGL settles.

## Concept A — The Performance Weave

### Review

- Strongest characteristic: the shared tension surface makes six product systems feel like one responsive athletic material. It is the only concept whose visual identity directly expresses “everything affects everything.”
- Weakest characteristic: the scene is visually subtle during the earliest load frame; it depends on the CSS scaffold until the material and real product texture appear.
- AI-generated appearance risk: low. The irregular woven surface, physical seam, editorial typography, and real DoThis UI avoid the usual orb, particle, glow, and card-grid patterns.
- Generic elements: the dark base palette could become generic if separated from the fabric material and asymmetric composition.
- Confusing elements: the system labels require a short moment of discovery, but the headline, lede, CTA, and adaptive-day control remain immediately legible.
- Performance concern: the custom displaced mesh and real-time pointer response need adaptive DPR and a lower mobile subdivision tier.
- Conversion concern: low. The App Store CTA is visible at load, settled state, and section two; the product promise is demonstrated rather than merely described.

### Scores

| Dimension | Score |
| --- | ---: |
| Visual impact | 9/10 |
| Originality | 9/10 |
| Composition | 9/10 |
| Typography | 9/10 |
| Product clarity | 9/10 |
| Motion continuity | 8/10 |
| CTA clarity | 10/10 |
| Brand fit | 10/10 |
| Mobile quality | 9/10 |
| Performance | 7/10 |

## Concept B — The Kinetic Training Table

### Review

- Strongest characteristic: independent demands visibly become a viable day, making the adaptive-day demonstration exceptionally easy to understand.
- Weakest characteristic: the industrial tabletop and condensed headline compete for dominance instead of creating one coherent focal point.
- AI-generated appearance risk: moderate-low. The physical scheduling metaphor is purposeful, but block-based reorganization is a familiar interaction trope.
- Generic elements: unlabelled colored blocks can resemble project-management tokens rather than athlete-performance inputs.
- Confusing elements: the system labels sit around the table rather than feeling materially attached to each piece.
- Performance concern: relatively low; the scene uses simple geometry and a bounded custom load-print material.
- Conversion concern: low. The CTA is clear, but the visual identity feels less unmistakably DoThis than Concept A.

### Scores

| Dimension | Score |
| --- | ---: |
| Visual impact | 8/10 |
| Originality | 8/10 |
| Composition | 8/10 |
| Typography | 7/10 |
| Product clarity | 9/10 |
| Motion continuity | 8/10 |
| CTA clarity | 10/10 |
| Brand fit | 8/10 |
| Mobile quality | 8/10 |
| Performance | 8/10 |

## Concept C — The Training Topography

### Review

- Strongest characteristic: the contour field gives progress weight, distance, and an appealing sense of accumulated effort.
- Weakest characteristic: topography communicates changing conditions well but does not naturally represent all six DoThis systems as one operating system.
- AI-generated appearance risk: moderate. Procedural terrain, route lines, and waypoint markers are common generative-WebGL motifs.
- Generic elements: without the DoThis UI texture and labels, the scene could belong to an outdoor, mapping, finance, or logistics product.
- Confusing elements: the route marker has no direct product meaning, and the user may read the metaphor as running-specific.
- Performance concern: the displaced terrain and contour shader have less product-clarity return per GPU cost than the weave.
- Conversion concern: moderate. The headline is strong, but the first visual explains progress better than the central Today/adaptation promise.

### Scores

| Dimension | Score |
| --- | ---: |
| Visual impact | 8/10 |
| Originality | 7/10 |
| Composition | 8/10 |
| Typography | 9/10 |
| Product clarity | 7/10 |
| Motion continuity | 8/10 |
| CTA clarity | 10/10 |
| Brand fit | 7/10 |
| Mobile quality | 8/10 |
| Performance | 7/10 |

## Viewport conclusions

- 1440 × 900: all concepts establish depth, but Concept A best balances semantic copy with a scene that can occupy the remaining field without becoming decoration.
- 1024 × 768: Concept A preserves hierarchy despite deliberate overlap; Concept B becomes visually dense; Concept C remains legible but less product-specific.
- 390 × 844: after the second pass, Concept A keeps the product promise, App Store CTA, scenario control, response, and spatial system readable in sequence.
- 360 × 800: Concept A still avoids horizontal overflow and maintains a touch target for the memorable interaction. The other concepts remain functional but lose more identity as their scenes simplify.

## Decision signal

Concept A has the highest combined originality, brand fit, product clarity, mobile quality, and conversion score. Concept B contributes useful physical behavior for the adaptive-day chapter, but Concept A provides the stronger production identity.
