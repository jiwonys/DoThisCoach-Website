# DoThis sports website directions

## Request and authority

The user requested a beautiful, motivational 3D sports website and explicitly chose a new sports-focused look over evolving the existing particle reticle. These are working direction previews, not a published replacement. The production homepage remains unchanged until the user chooses the concrete composition.

## Product tension

The athlete cares about playing well, but strength work is often planned separately from their actual sport week. The experience should connect the gym, the game, and the real DoThis application.

## Directions considered

1. **Own the Court — recommended.** A miniature, physically lit 3D court supports an extruded version of the approved DoThis flame logo, requested by the user in place of the phone. Selecting a sport changes the court markings, equipment, supporting sentence, and App Store route. Near-black pine, chalk, and electric lime form a focused athletic identity. Native scrolling leads to the week and the Founding 200 offer. Mobile places readable copy and the primary action before the contained court. Reduced motion uses a static scene. Risk: a miniature court is intentionally stylized; full production should retain a separate upright, readable product demonstration.
2. **Still in the Game.** A light warm ground and deep green typography frame the existing approved athlete photography. A physical phone plane tilts toward the viewer and shows real Progress UI. Sport selection changes campaign imagery and acquisition routes. Mobile separates copy and imagery. Reduced motion removes phone tilt. Risk: the large headline creates a longer first mobile screen and this concept has less WebGL depth.
3. **The Training Block — deferred.** A sequence of raised training-day planes would turn the confirmed athlete week into a scrollable spatial calendar. This communicates scheduling directly, but a calendar-first hero provides less immediate athletic emotion than the two rendered directions. DoThis-specific guidance limits the prototype round to two working compositions.

## Current preview implementation

- `own-the-court.html`: hero, real interactive Three.js court, six-state selector, illustrative week, founder price and conversion section, existing site navigation.
- `still-in-the-game.html`: distinct athlete-led hero, CSS 3D phone, six-state selector and the same necessary product and acquisition content.
- `preview.css`: local licensed Archivo Black and Work Sans, native scrolling, responsive composition, reduced motion, focus states.
- `preview.js`: explicit sport allowlist, URL/history state, existing fixed `/app/` routes, shared copy, scene lifecycle and geometry disposal on sport changes.
- The Three.js version is the same pinned r128 already used on the production homepage; it is loaded only by the court direction.

## Motion and rendering ownership

One requestAnimationFrame controller owns court rotation. Pointer events update targets, resize updates the camera, and sport clicks replace the court markings and equipment. No autonomous loop runs while the view is settled. Canvas DPR is capped at 1.5; shadows use one 1024px map. ResizeObserver owns canvas sizing. IntersectionObserver and document visibility gate rendering. WebGL failure keeps the real static screenshot visible; context loss restores that fallback.

## Asset and claim integrity

The approved icon, existing athlete campaign images, and real `assets/screenshots/progress-trends.webp` are reused without repainting. Athlete images are illustrative campaign subjects. The sample week is explicitly labeled illustrative. Founder pricing is $6.99 per month or $69.99 per year for the first 200 users. No remaining-spots counter, guaranteed performance outcome, or fabricated testimonial is shown.

## Verified prototype coverage

Both directions were rendered at 1440 × 1000 and 390 × 844. Both were checked at widths 360, 390, 768, and 1440 with every sport selection: general, soccer, basketball, pickleball, tennis, and volleyball. All acquisition links matched the corresponding existing route; zero horizontal overflow and zero script errors were observed. Axe found zero serious or critical issues across the eight direction/viewport combinations. Reduced-motion states were exercised. These are prototype checks, not a production release claim.

## Next implementation stage

After the user's composition choice, develop the complete homepage in that visual direction, add a legible product-proof chapter, finish all mobile interactions, carry the founder offer and original navigation through production, run production build and performance checks, and present the exact replacement for review.

## User-requested court and logo refinements

Latest placement: two shallow logo inlays are embedded into every playing surface, one per half, facing the center from opposite directions. Each logo is 1.15 scene units tall with 0.012 depth buried into the slab. Court lines remain above the artwork. The matte logo material receives the same lighting and net shadows as the court; the previously floating logo is removed. Camera framing now centers on the court surface.

The volleyball model now has a raised hanging net with an open space underneath, side tapes, antennas, and attack lines. Tennis has a longer clay-colored court, doubles alleys, singles sidelines, service boxes, and a net with center sag. Pickleball has a smaller blue court, a contrasting kitchen zone, centerlines that stop at the kitchen, and a lower net. Playing-area ratios and markings reference [USA Pickleball](https://usapickleball.org/construction/), [ITF court rules](https://www.itftennis.com/media/7221/2024-rules-of-tennis-english.pdf), and [FIVB rules](https://www.fivb.com/wp-content/uploads/2025/01/FIVB-Volleyball_Rules2025_2028-EN.pdf). Net heights are exaggerated for legibility at miniature display scale, rather than represented as a construction drawing.

`build-logo.mjs` generates `logo-shape.json` and `logo-face.png` from the approved `assets/dothis-logo.png`. A deterministic color mask removes the neutral icon background and traces the original flame outline and inner opening. The final shape contains 70 outer vertices and 25 inner vertices. The original face colors are retained in the 386 × 450 texture. Three.js extrudes the shape to a depth of 0.28 scene units with shallow bevels and teal sidewalls. The logo casts an actual scene shadow; it is not a rectangular image plane. The static fallback uses the same extracted artwork.

All six sport states were exercised with the logo on desktop and mobile after the changes. No script errors or horizontal overflow were observed, and the selected volleyball state still directed every conversion link to `/app/volleyball/`.
