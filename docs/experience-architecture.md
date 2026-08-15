# Immersive Homepage Architecture

## Rendering model

```mermaid
flowchart LR
  HTML[Semantic homepage HTML] --> CONTENT[Copy, navigation, CTAs, screenshots, pricing, safety]
  HTML --> MAIN[Small initial controller]
  MAIN --> MOTION[GSAP + Lenis]
  MAIN --> DECISION{Rendering tier}
  DECISION -->|Reduced motion or WebGL unavailable| FALLBACK[CSS material + real product screenshot]
  DECISION -->|Desktop idle| CANVAS[Deferred persistent R3F Canvas]
  DECISION -->|Mobile near Adaptive Day| CANVAS
  CANVAS --> SCENE[Performance Weave scene]
  SCENE --> SHADER[Custom tension material]
  SCENE --> PRODUCT[Readable product plane]
  SCENE --> QUALITY[Adaptive DPR and geometry tiers]
```

Essential information never depends on React or WebGL. The Canvas is fixed behind the semantic story and remains mounted across the homepage instead of recreating one renderer per section.

## State and timeline flow

```mermaid
flowchart TB
  INPUT[Wheel, touch, pointer, keyboard, click] --> LENIS[Lenis scroll owner]
  LENIS --> GSAP[GSAP ScrollTrigger chapters]
  GSAP --> STORE[Vanilla Zustand experience store]
  CLICK[Adaptive Day and product controls] --> STORE
  POINTER[Bounded pointer coordinates] --> STORE
  STORE --> FRAME[R3F useFrame reads]
  FRAME --> CAMERA[Camera and group damping]
  FRAME --> UNIFORMS[Shader uniforms]
  STORE --> DOM[Low-frequency semantic interaction state]
```

High-frequency values never move through React component state. React re-renders only for low-frequency changes such as the selected product texture, viewport tier, visibility, or DPR tier.

## Homepage chapters

```mermaid
flowchart LR
  HERO[Discovery<br/>Fragmented demands] --> ADAPT[Understanding<br/>Adaptive Day]
  ADAPT --> SYSTEMS[Control<br/>Six connected systems]
  SYSTEMS --> TRAIN[Proof<br/>Goal- and sport-aware training]
  TRAIN --> COACH[Trust<br/>Coach advises, user decides]
  COACH --> PROGRESS[Signal<br/>Plan, train, fuel, adjust]
  PROGRESS --> PREVIEW[Conversion<br/>7-day Premium Preview]
  PREVIEW --> FINALE[Resolution<br/>One clear next move]
```

## Source layout

```text
experience-src/
  main.jsx                         deferred-tier bootstrap
  experience.css                  production visual and responsive system
  motion/
    initMotion.js                 Lenis, GSAP, DOM interactions, CTA event
  shaders/
    tensionMaterial.js            custom vertex and fragment shaders
  store/
    experienceStore.js            vanilla, revision-free visual state only
  webgl/
    ExperienceCanvas.jsx          persistent Canvas, quality, fallback hooks
    PerformanceWeave.jsx          scene, camera, geometry, product planes
```

## Failure behavior

```mermaid
flowchart TD
  LOAD[Homepage loads] --> HTML[Semantic experience visible]
  LOAD --> CHECK{Reduced motion and WebGL check}
  CHECK -->|Unavailable or reduced| STATIC[Keep static material]
  CHECK -->|Available| IMPORT[Dynamic-import Canvas]
  IMPORT -->|Import or React error| STATIC
  IMPORT -->|Success| LIVE[Live tension material]
  LIVE -->|Context lost| STATIC
  LIVE -->|Tab hidden| PAUSE[Pause render loop]
  PAUSE -->|Visible| LIVE
```

The fallback includes the real Today product screen, the system seam, semantic copy, the adaptive-day control, and all conversion paths. There is no blank-screen failure mode.
