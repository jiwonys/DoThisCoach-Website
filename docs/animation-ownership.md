# Animation Ownership

## Motion language

The production experience uses five motion qualities: controlled, athletic, responsive, precise, and elastic. Large transitions decelerate with weight; product reveals resolve crisply; pointer response is local and bounded; nothing drifts without purpose.

GSAP owns the marketing-page story timeline. Lenis owns scroll interpolation. React owns low-frequency product state. React Three Fiber owns the render loop, while the custom shader and `useFrame` read the vanilla Zustand store without driving React renders every frame.

## Ownership table

| Property | Object | Owner | Trigger | Reduced-motion behavior |
| --- | --- | --- | --- | --- |
| Scroll interpolation | Document | Lenis | Wheel/touch input | Native browser scrolling |
| `progress` | Experience store | Lenis callback | Document scroll | Remains at its static default |
| `scrollVelocity` | Experience store | Lenis callback | Document scroll | `0` |
| `chapter` | Experience store | GSAP ScrollTrigger | Chapter crosses viewport midpoint | Static CSS composition |
| `clip-path` | `[data-reveal="mask"]` | GSAP ScrollTrigger | Element enters 86%–54% of viewport | Removed by CSS |
| `clip-path` | `[data-reveal="clip"]` | GSAP ScrollTrigger | Element enters 88%–56% of viewport | Removed by CSS |
| `opacity`, `x`, `y`, `rotation` | `[data-reveal="plane"]` | GSAP ScrollTrigger | Product plane enters viewport | Final state rendered immediately |
| `yPercent`, `opacity` | Hero copy | GSAP ScrollTrigger | Hero exit | Static readable hero |
| `yPercent`, `opacity` | Hero system labels | GSAP ScrollTrigger | Hero exit | Static readable labels |
| Active system tab | DOM + experience store | Interaction controller / GSAP system chapter trigger | Click, keyboard arrow, or system-chapter progress | Click and keyboard only |
| Adaptive Day state | DOM + experience store | Interaction controller | Scenario button | Immediate state change without animated travel |
| Coach conflict state | DOM | Interaction controller | Resolve button | Immediate state change without animated travel |
| Pointer coordinates | Experience store | Pointer listener | Pointer movement | Not consumed because WebGL is disabled |
| Camera transform | R3F camera | `PerformanceWeave` scene | Viewport tier | Static fallback replaces Canvas |
| Weave group transform | R3F group | `useFrame` damping | Chapter and global progress | Static fallback replaces Canvas |
| Product plane opacity | R3F material | `useFrame` damping | Chapter and Adaptive Day state | Static DOM screenshot remains available |
| `uTime` | Tension shader | R3F clock | Render frame | Shader is not mounted |
| `uProgress` | Tension shader | R3F scene | Experience-store progress | Shader is not mounted |
| `uChapter` | Tension shader | R3F scene | Experience-store chapter | Shader is not mounted |
| `uAdaptation` | Tension shader | R3F scene | Scenario state | Shader is not mounted |
| `uPointer` | Tension shader | R3F scene | Bounded pointer pressure | Shader is not mounted |
| `uPointerStrength` | Tension shader | Performance tier | Pointer + adaptive quality | Shader is not mounted |
| `uScrollVelocity` | Tension shader | R3F scene | Lenis velocity | Shader is not mounted |
| `uReveal` | Tension shader | R3F scene | Global progress | Shader is not mounted |
| Canvas DPR | R3F `PerformanceMonitor` | Adaptive quality controller | Sustained frame-rate incline/decline | Canvas is not mounted |
| Canvas render loop | R3F Canvas | Document visibility state | `visibilitychange` | Canvas is not mounted |

## Conflict rules

- GSAP does not write Three.js object transforms.
- React state does not update for pointer, scroll, camera, or shader frames.
- CSS transitions own only direct interaction-state changes such as the Adaptive Day rail and Coach conflict.
- GSAP does not animate those interaction-state properties.
- The production build does not include Theatre.js, Rapier, or a second scroll engine.
- The production build does not expose the prototype Leva controls.
