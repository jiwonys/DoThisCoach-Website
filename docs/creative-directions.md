# DoThis Creative Directions

## Shared creative brief

DoThis should make one idea physically understandable:

> Training, sport, nutrition, recovery, goals, and schedule are not separate problems. When one changes, the useful next action changes with it.

All three directions preserve semantic HTML, real DoThis product screens, a visible App Store CTA, exact seven-day Preview terms, reduced-motion access, and a working non-WebGL fallback. None use a floating phone as the central metaphor.

Scores are provisional until rendered prototypes are tested. Technical risk uses **10 = highest risk**.

---

## Direction A: The Performance Weave

### One-sentence idea

The athlete’s day is a tensioned technical fabric: six connected systems pull on one shared surface until DoThis resolves their competing forces into a clear line called Today.

### Metaphor

A high-performance textile under load. Every input changes the tension of the whole material, just as a sport commitment, soreness report, missed meal, or goal changes an athlete’s useful plan.

### Why this represents DoThis

The metaphor is physical, athletic, and systemic without becoming a dashboard or sci-fi interface. It makes “everything affects everything” visible through one continuous material rather than six decorative objects.

### Hero experience

The first viewport opens on a large dark woven surface suspended diagonally through a pale physical space. Six subtle anchor points—TRAIN, FUEL, RECOVER, PLAN, GOALS, PROGRESS—pull it in different directions. The surface is slightly disordered, not chaotic. Pointer or touch pressure creates a local deformation that propagates across the same material.

As the headline resolves, tension redistributes and one precise seam illuminates through the weave: TODAY. Real app UI is visible beneath the material through a controlled aperture, as though the system has revealed the next useful layer.

### Scroll narrative

1. Fragmented tension: six inputs act independently.
2. Shared surface: DoThis connects them.
3. Adaptive Day: volleyball at 7 PM changes the whole weave.
4. Product systems: the same surface opens six spatial windows into real UI.
5. Coach: a training block and volleyball commitment pull against each other; the weave redistributes load.
6. Progress: repeated fibers accumulate into a stronger, cleaner structure.
7. Human reality: technical material gives way to athlete imagery.
8. Conversion: the opening seam returns as one calm path to the App Store.

### Signature interaction

The visitor activates “I have volleyball tonight.” The volleyball anchor tightens. Lower-body load visibly drops, a short preparation strand appears, fuel timing shifts closer to the event, and recovery expands after it. Coach’s concise recommendation appears only after the physical system settles.

### Signature shader/material

`AdaptiveWeaveMaterial`: a subdivided surface with directional procedural weave, vertex tension, local pointer pressure, bounded scroll-energy deformation, and a reveal seam. Its purpose is to show shared context transmitting force across one system.

Candidate uniforms:

- `uProgress`: narrative assembly from fragmented to coordinated
- `uPointer`: normalized local pressure position
- `uPointerStrength`: local input intensity
- `uTension`: global system load
- `uAdaptation`: volleyball scenario transition
- `uReveal`: UI aperture and Today seam
- `uEnergy`: restrained surface responsiveness
- `uTime`: low-amplitude material life only

### Camera language

Macro physical detail to medium spatial composition. Camera begins close enough to feel fibers and tension, then pulls back only when relationships need to be understood. No constant drift. Transitions have weight and decisive deceleration.

### Typography system

A strong neo-grotesk with condensed display cuts for oversized chapter words. Type remains semantic DOM. Selected words appear to pass behind the weave through masking, but complete readable copies remain above or beside the canvas.

### Color and material palette

- Carbon black and warm graphite
- Chalk and bone white
- DoThis performance green
- Court-line cyan used sparingly for Today/coordination
- Recovery amber as a small state accent
- Matte technical knit
- Powder-coated metal anchors
- Translucent TPU windows
- Soft rubber seams

### How real DoThis UI appears

Screens sit on flat, undistorted planes beneath openings in the material. Interaction enlarges one screen enough to read. The weave acts as a reveal mask and connector, never as distortion over text.

### Mobile adaptation

Use one vertical ribbon rather than a wide suspended sheet. Touching the central ribbon sends a visible pressure wave. The six systems become sequential tension points along the ribbon, and the Adaptive Day interaction uses a tap-controlled before/after state. Geometry subdivision, DPR, and shader noise are reduced.

### Reduced-motion adaptation

Replace continuous deformation with three stable material states: fragmented, connected, adapted. Scroll crossfades between still compositions. Pointer pressure is disabled. All explanatory copy and controls remain functional.

### Performance risk

Moderate. One subdivided hero mesh and procedural material are controllable, but large transparent layers, masked screenshots, and scroll-linked deformation require careful overdraw and DPR limits.

### Conversion strength

High. The central seam can continuously point toward Today and the App Store CTA while keeping product screenshots legible.

### Scores

- Originality: **9/10**
- Brand fit: **10/10**
- Product clarity: **9/10**
- Technical risk: **6/10**

---

## Direction B: The Kinetic Training Table

### One-sentence idea

DoThis is a physical planning instrument where magnetic schedule pieces, load plates, and translucent training layers reorganize into one executable day.

### Metaphor

A coach’s tabletop crossed with a precision athletic timing instrument—not a screen dashboard. The visitor looks down on real, tactile pieces representing work, sport, food, recovery, and training.

### Why this represents DoThis

Athletes and coaches plan with tangible constraints. This direction turns abstract context into physical pieces that can collide, stack, move, and make room for each other. DoThis is the mechanism that resolves the arrangement.

### Hero experience

An orthographic top-down view shows a long day track cut into powder-coated metal. Independent pieces marked WORK, TRAIN, FUEL, VOLLEYBALL, RECOVER, and SLEEP sit in mild conflict. A central green carriage labeled TODAY travels along the track and refuses to pass until the pieces align.

The headline occupies the left edge like large printed type on the table. The primary CTA is a physical-looking but semantic DOM control aligned with the Today carriage.

### Scroll narrative

1. Pieces enter the table with conflicting duration and load.
2. Today carriage reveals the constraint.
3. Visitor inserts volleyball at 7 PM.
4. Magnetic pieces snap into a safer, more useful order.
5. The table rotates from top-down to a shallow oblique view.
6. Six system pieces open into real product-screen planes.
7. Completed days stack as a visible training history.
8. The table clears to one final App Store action.

### Signature interaction

The visitor drags or taps a volleyball tile into the evening slot. The heavy-leg tile physically conflicts with it. The system separates them, compresses gym duration, adds a preparation strip, shifts fuel timing, and extends the post-event recovery segment.

### Signature shader/material

`LoadPrintMaterial`: translucent training film that accumulates pressure marks where pieces overlap. Overloaded areas turn dense amber; coordinated areas resolve into a clean green line. The material visualizes competing demands without relying on a data chart.

### Camera language

Mostly orthographic top-down composition with rare, purposeful 18–24 degree oblique reveals. Camera movement feels like a coach repositioning over a planning table: quick alignment, controlled stop, no floating.

### Typography system

Condensed industrial grotesk for large chapter labels, paired with a neutral readable sans for explanation. Small labels evoke printed training tape rather than a futuristic HUD.

### Color and material palette

- Warm off-white tabletop
- Charcoal and dark olive metal
- DoThis green carriage
- Clay/amber fatigue markers
- Frosted translucent schedule film
- Rubber-edged physical tokens
- Printed black typography

### How real DoThis UI appears

Physical tiles hinge open into upright, undistorted app-screen planes. Screens are framed by the same metal and rubber vocabulary. One screen is readable at a time; others remain contextual silhouettes.

### Mobile adaptation

The horizontal table becomes a vertical day rail. Dragging is optional; tapping “Add volleyball at 7 PM” triggers the same reorganization. The camera remains nearly orthographic, reducing depth ambiguity and GPU cost.

### Reduced-motion adaptation

Show before and after layouts side by side on desktop and stacked on mobile. Use short opacity and position transitions only. The collision is explained by text and highlighted overlap.

### Performance risk

Low to moderate. Geometry can remain procedural and low-poly. The primary risks are DOM/canvas alignment, drag accessibility, and maintaining legible labels through camera changes.

### Conversion strength

Very high. The interaction explains the product immediately and gives the CTA a clear relationship to a resolved plan.

### Scores

- Originality: **8/10**
- Brand fit: **9/10**
- Product clarity: **10/10**
- Technical risk: **5/10**

---

## Direction C: The Training Topography

### One-sentence idea

DoThis turns the athlete’s week into a living terrain where load, recovery, nutrition, and sport reshape the route toward a goal.

### Metaphor

A physical topographic model of the athlete’s week. Training load creates elevation, recovery creates traversable valleys, sport events become immovable landmarks, and DoThis finds the next viable route rather than forcing a straight line.

### Why this represents DoThis

Progress is not a flat checklist. Athletes navigate changing terrain: hard practices, missed sessions, travel, food, soreness, and goals. The route changes while the destination remains visible.

### Hero experience

The visitor begins near ground level beside a fragmented terrain made from six contour layers. Oversized typography sits on the horizon. As DoThis connects the layers, the camera rises enough to reveal a coherent path marked TODAY.

The terrain is not a literal mountain or fitness graph. It resembles molded athletic foam with embossed contour seams and embedded translucent product windows.

### Scroll narrative

1. Ground-level confusion: isolated ridges obscure the route.
2. Camera elevation reveals shared terrain.
3. Today path appears through six connected contour systems.
4. Volleyball event rises as a fixed evening landmark.
5. Heavy lower-body route becomes visibly inefficient.
6. Coach redraws a lower-fatigue path with preparation and fuel stops.
7. Product screens appear as cross-sections of the route.
8. Repeated completed paths create a durable progress contour.
9. Final view returns to ground level on a clear route to conversion.

### Signature interaction

The visitor places the volleyball landmark. The terrain deforms, the original heavy-leg path steepens, and a new path contours around it. The website visibly chooses lower fatigue, preparation, fuel timing, and recovery without presenting a medical conclusion.

### Signature shader/material

`ReadinessContourMaterial`: procedural contour bands react to load and recovery fields. Scroll progress changes route visibility; local input raises a bounded event landmark; a signed-distance reveal draws the selected path.

### Camera language

Ground-level macro views for emotional tension, measured crane moves for understanding, and a final return to human height. This is the most cinematic direction and requires careful reading-time holds.

### Typography system

Wide athletic display type at horizon scale, paired with compact annotations aligned to contour seams. DOM typography uses clipping and depth masks but never becomes a canvas texture.

### Color and material palette

- Molded warm-gray performance foam
- Deep charcoal valleys
- DoThis green route line
- Muted court blue landmark
- Soft recovery sand
- Minimal translucent polymer windows

### How real DoThis UI appears

Screens occupy vertical cross-sections cut through the terrain. The camera approaches a cross-section until the UI becomes flat and readable, then exits through another layer into the next chapter.

### Mobile adaptation

Use a narrow vertical contour slice with only three active elevation bands at once. The route remains centered and scroll becomes a literal forward movement. The event interaction is a tap state rather than free placement.

### Reduced-motion adaptation

Use still topographic illustrations for fragmented, event-added, and adapted states. Replace camera travel with fades between viewpoint compositions.

### Performance risk

High. Terrain deformation, contour antialiasing, depth masks, route fields, and cinematic camera choreography can become expensive and harder to keep legible on mobile.

### Conversion strength

Moderate to high. The story is emotionally strong, but the metaphor needs disciplined copy and camera framing to avoid reading as a generic journey or outdoor product.

### Scores

- Originality: **9/10**
- Brand fit: **8/10**
- Product clarity: **7/10**
- Technical risk: **8/10**

---

## Prototype hypotheses

### Direction A hypothesis

If shared context behaves as force across one material, visitors will understand DoThis as one connected system while experiencing a visual identity that feels athletic and proprietary.

### Direction B hypothesis

If real-life constraints become tangible pieces that visibly collide and reorganize, visitors will understand the adaptive product promise fastest and retain the “volleyball tonight” interaction.

### Direction C hypothesis

If training load becomes terrain and DoThis becomes route selection, visitors will feel the emotional value of guidance through a changing week, but product clarity may require more copy than the other directions.

## Prototype selection criteria

The winning direction must score highest in rendered evidence across:

1. Immediate visual impact
2. Originality
3. DoThis brand recognition
4. Product comprehension within the first experience
5. Legibility of real app UI
6. CTA visibility
7. Mobile composition
8. Reduced-motion equivalence
9. Measured performance
10. Feasibility without replacing the static article/legal architecture

No direction wins solely because it is the most cinematic.
