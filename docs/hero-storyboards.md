# DoThis Hero Prototype Storyboards

These storyboards define the minimum prototype evidence for `/concept-a`, `/concept-b`, and `/concept-c`. Each route must use real DoThis copy and screenshots, include semantic HTML, and provide mobile, reduced-motion, and WebGL-failure equivalents.

## Shared prototype checkpoints

| Checkpoint | Required evidence |
| --- | --- |
| Load | Brand, headline, primary CTA, and useful fallback content render without waiting for WebGL |
| Settled hero | Central metaphor is understandable without interaction |
| 15% | First relationship among systems becomes visible |
| 25% | User receives a clear invitation to activate the scenario |
| Interaction | “I have volleyball tonight” changes the system visibly |
| 30% | Coach recommendation appears after the adaptation settles |
| Transition | Hero metaphor transforms rather than cuts into a generic section |
| Section two | Real DoThis UI becomes readable and connected to the metaphor |

---

## Concept A storyboard: The Performance Weave

| Beat | Narrative intent | Semantic DOM | WebGL composition | Camera | Interaction and motion | CTA | Mobile variant | Reduced-motion / fallback | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Load | Establish product and conversion immediately | Brand, eyebrow, “Unleash your inner athlete.”, one-sentence product definition, App Store CTA | Static poster or low-detail weave silhouette behind copy | Fixed three-quarter macro frame | No artificial delay; material fades in after DOM | Primary CTA visible | Copy first; narrow vertical ribbon poster | Still image/gradient with complete copy | CTA usable before canvas ready |
| Settled hero | Show one system under several forces | Six semantic labels around Today statement | Technical weave pulled by six anchor fields; Today seam dim but visible | Slow 4–6% pullback, then stop | Pointer pressure causes local bounded wave | Sticky nav CTA available | Three labels visible; remaining labels reveal down ribbon | No pointer response; stable composed frame | Metaphor readable without explanation paragraph |
| 15% | Make shared context explicit | “Everything affects everything.” | Anchor forces transmit across same mesh; seam becomes continuous | Camera locks | Scroll controls `uProgress`; no React state per frame | CTA remains in nav | Ribbon tension changes in two clear stages | Crossfade from fragmented to connected still | All six systems remain named in DOM |
| 25% | Invite memorable product demo | Button: “Add volleyball at 7 PM” and concise setup | Volleyball anchor appears near evening edge; lower-body load region visible | Slight lateral reframe toward conflict | Focus/tap/press activates same state | CTA secondary but visible | Full-width tap control | Button switches still state | Keyboard activation works |
| Interaction | Demonstrate adaptation | Live region states: “Protect tonight’s match. Keep fatigue low.” | Volleyball tension tightens; lower-body strand thins; primer, fuel, recovery strands reorder | No dramatic camera move; system transformation owns attention | GSAP drives bounded uniform and anchor transforms | No CTA animation competing with result | Vertical ribbon redistributes segment heights | Crossfade to adapted labeled still | Recommendation appears only after visual cause is clear |
| 30% | Resolve into product proof | Concise three-item recommendation | Aperture opens beneath Today seam to real Today screenshot | Push in until screenshot text is legible | Material settles with strong deceleration | “See how DoThis works” leads to section two | Screenshot becomes dominant below ribbon | Static screenshot with labeled connectors | Real screenshot remains undistorted |
| Transition | Carry metaphor into next section | “One system. Shared context.” | Weave separates into six connected windows | Camera rotates less than 15 degrees | GSAP owns camera and window transforms | Nav CTA persists | Windows become vertical sequence | Simple reveal sequence | No hard visual cut to card grid |
| Section two | Preview six-system architecture | First system title and benefit | Today screen centered; five connected apertures preview next states | Fixed readable product frame | One hover/focus/tap changes active window | Inline App Store link available | Swipe/tap system selector | Tabs with static images | First screenshot and benefit visible at route checkpoint |

### Concept A property ownership during prototype

- Weave `uProgress`: GSAP/ScrollTrigger
- Weave `uPointer`: pointer system plus `useFrame` damping
- Weave `uAdaptation`: GSAP interaction timeline
- Camera position and target: GSAP
- Active semantic result: React state only at interaction milestones
- CTA opacity and position: CSS/GSAP, never `useFrame`

---

## Concept B storyboard: The Kinetic Training Table

| Beat | Narrative intent | Semantic DOM | WebGL composition | Camera | Interaction and motion | CTA | Mobile variant | Reduced-motion / fallback | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Load | Present a real day, not abstract technology | Brand, headline, product sentence, CTA | Static table and six physical schedule pieces | Orthographic top-down | DOM appears first; pieces enter only after ready | Primary CTA visible | Vertical rail poster | Static top-down illustration | No loader dependency |
| Settled hero | Reveal conflict | Labels for Work, Workout, Food, Recovery, Volleyball, Sleep | Pieces occupy day track with heavy-leg and evening sport overlap | Fixed top-down | Tiny magnetic settling, then stillness | CTA aligned with Today carriage | Vertical rail with larger tap targets | Still conflict layout | Conflict understandable in under five seconds |
| 15% | Introduce DoThis as coordinating mechanism | “One day. Six systems.” | Green Today carriage tries to travel track and pauses at overlap | 6 degree oblique tilt | Scroll advances carriage once; no loop | Nav CTA visible | Carriage moves downward | Before/after highlight | Motion has visible cause |
| 25% | Invite scenario input | “Add volleyball at 7 PM” control | Empty event slot highlights | Return to orthographic | Button/tap or accessible drag | CTA quiet | Tap only by default | Button swaps image | No hover dependency |
| Interaction | Show physical reorganization | Live result and three changed items | Volleyball tile locks; heavy legs moves; workout shortens; fuel and recovery strips reposition | Camera stays fixed | GSAP magnetic snap with weighted easing | CTA remains stable | Vertical pieces resize/reorder | Instant labeled before/after | Every moved piece maps to explanatory copy |
| 30% | Reveal Coach judgment | Coach recommendation in semantic block | LoadPrint film clears from amber overlap to green route | Shallow push toward result | Shader progress follows timeline, not continuous time | “Open the product” secondary action | Result card below rail | Static overlap map | No medical implication |
| Transition | Turn pieces into product screens | “Plan. Train. Fuel. Adjust.” | Four pieces hinge into app-screen planes | Controlled 18 degree oblique view | One coordinated hinge timeline | Nav CTA persists | Pieces expand into stacked screens | Fade between screenshots | Screens are flat and legible at settle |
| Section two | Introduce real UI | Today benefit and screenshot | Today plane central, connected pieces surround it | Orthographic-readable | Focus/tap selects next system | Inline CTA available | Horizontal snap selector | Standard tabs | Screenshot content readable |

### Concept B property ownership during prototype

- Piece transforms: GSAP
- Drag/tap intent: pointer/keyboard handlers
- Magnetic damping: GSAP easing, not physics dependency in prototype
- LoadPrint shader progress: GSAP
- Camera rotation: GSAP
- Selected scenario and announced result: React state at discrete milestones

---

## Concept C storyboard: The Training Topography

| Beat | Narrative intent | Semantic DOM | WebGL composition | Camera | Interaction and motion | CTA | Mobile variant | Reduced-motion / fallback | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Load | Establish destination and product quickly | Brand, headline, direct product sentence, CTA | Still contour silhouette and Today route poster | Ground-level fixed frame | DOM first; terrain may hydrate later | Primary CTA visible | Vertical contour slice | Static contour image | Complete experience without WebGL |
| Settled hero | Feel fragmented week | Six system labels in nearby DOM | Six separated foam contour bands block route | Low ground-level frame | Minimal breathing of route light only | Nav CTA visible | Three visible bands; rest follow on scroll | Static fragmented terrain | Avoid mountain/outdoor interpretation through copy |
| 15% | Reveal shared terrain | “Training doesn’t happen in a vacuum.” | Bands join into one field | Measured crane upward | Scroll controls camera and contour assembly | CTA stable | Route centers as bands merge | Crossfade to connected map | Camera stops for reading |
| 25% | Invite event input | “Place volleyball at 7 PM” button | Evening landmark location highlights | Near top-down but still dimensional | Tap activates landmark | CTA quiet | Tap inserts landmark | Static event marker | Button keyboard accessible |
| Interaction | Show route recalculation | Live status plus changed workout/fuel/recovery notes | Landmark rises; old route steepens; new route draws around load | Camera remains high enough for comprehension | GSAP drives field uniforms and route reveal | CTA does not move | Contour slice deforms in three steps | Before/after map | Adaptation visible without reading all copy |
| 30% | Explain Coach role | “Protect tonight’s match. Keep fatigue low.” | Coach route settles in green; old route becomes faint amber | Small dolly toward route | Strong deceleration and hold | Secondary “See the plan” | Recommendation below map | Static labeled paths | No implication of automated mutation |
| Transition | Enter product cross-section | “The route is made from real context.” | Terrain opens along route into a vertical section containing Today UI | Camera descends into section | GSAP camera and clip plane | Nav CTA persists | Screenshot rises from contour slice | Fade to screenshot | UI remains undistorted |
| Section two | Connect route to real app | Today benefit and screenshot | Product plane with contour lines feeding its edges | Fixed readable frame | Tap advances to Workout | Inline CTA available | Stacked screen | Standard image | Clear product proof |

### Concept C property ownership during prototype

- Terrain `uLoad`, `uRecovery`, `uRoute`: GSAP
- Camera elevation and target: GSAP
- Pointer landmark position: pointer handler, clamped before uniform update
- Ambient material time: `useFrame` at low amplitude
- Announced result: React state only after timeline completion

## Prototype visual QA matrix

Each route will be captured at:

- 1440 × 900
- 1024 × 768
- 390 × 844
- 360 × 800

Each viewport will include:

- page load;
- settled hero;
- 25% scroll;
- activated scenario;
- transition state;
- start of section two.

Each concept will receive scores for visual impact, originality, composition, typography, product clarity, motion continuity, CTA clarity, brand fit, mobile quality, and performance. Selection will be recorded in `docs/design-decision.md` only after this evidence exists.
