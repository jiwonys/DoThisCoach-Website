---
name: "DoThis: Train For Your Game"
description: "The production Athlete Signal Split system for the DoThis marketing homepage."
colors:
  article-night: "#07090c"
  article-sunken: "#0b0e12"
  article-raised: "#101419"
  chalk: "#f2f4f3"
  copy-muted: "#a7b0b8"
  control-inactive: "#78828a"
  signal: "#2ee68b"
  cool-blue: "#5b7cff"
  quiet-rule: "rgba(255, 255, 255, 0.11)"
  strong-rule: "rgba(255, 255, 255, 0.18)"
  action-ink: "#04140d"
  screen-black: "#0b1013"
  sport-soccer: "#43d990"
  sport-basketball: "#f3a33b"
  sport-pickleball: "#c9ec52"
  sport-tennis: "#c8ef53"
  sport-volleyball: "#49d8c4"
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(4rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(3.2rem, 6vw, 4.7rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "clamp(0.96rem, 1.3vw, 1.12rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  action:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 780
    lineHeight: 1.55
    letterSpacing: "normal"
  navigation:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 620
    lineHeight: 1.55
    letterSpacing: "normal"
  selector:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 720
    lineHeight: 1.55
    letterSpacing: "normal"
rounded:
  square: "0px"
  skip-link: "8px"
  icon: "12px"
  screen: "16px"
  pill: "999px"
spacing:
  compact: "8px"
  mobile-gutter: "16px"
  content-gap: "24px"
  section-gutter: "clamp(24px, 8vw, 120px)"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.action-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.action-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-header:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.action-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  sport-option:
    backgroundColor: "transparent"
    textColor: "{colors.control-inactive}"
    typography: "{typography.selector}"
    rounded: "{rounded.square}"
    padding: "0 9px"
    height: "48px"
  sport-option-selected:
    backgroundColor: "color-mix(in srgb, #2ee68b 9%, transparent)"
    textColor: "{colors.signal}"
    typography: "{typography.selector}"
    rounded: "{rounded.square}"
    padding: "0 9px"
    height: "48px"
  progress-screen:
    backgroundColor: "{colors.screen-black}"
    rounded: "{rounded.screen}"
    width: "min(28vw, 360px)"
---

# Design System: DoThis Athlete Signal Split

## Overview

**Creative North Star: "Athlete Signal Split"**

Athlete Signal Split presents the DoThis homepage as a live training signal rather than a generic fitness landing page. An article-night ground, chalk-white command type, one synchronized athlete plane, and quiet ruled controls make the visitor feel competitive possibility before the page explains the method. Signal green carries the current choice and action; cool blue remains a restrained counterlight.

The system is direct, dark, and evidence-led. Archivo Black commands; Work Sans explains. Fine grain, low-chroma athlete imagery, and black-on-black tonal shifts add physical texture without turning the interface into card chrome. The story stays to four chapters: hero and selector, the week-led method, one real Progress screen, and the closing challenge.

This document governs the production marketing homepage in `index.html`, `home.css`, and `home.js`. It does not redesign the native iPhone app or automatically replace the established systems on articles, comparison, support, legal, or acquisition redirect pages. `PRODUCT.md` remains authoritative for product truth, and the asset and App Store destination manifests remain authoritative for evidence and routing.

**Key Characteristics:**

- Article-night ground with a green signal glow, cool-blue counterlight, and fine fixed grain.
- Archivo Black for commands and Work Sans for every explanatory or interactive role.
- One split hero that keeps the promise, synchronized athlete, all six sport states, and primary App Store action in the first viewport.
- Four restrained chapters: hero and selector, week-led method, one real Progress screen, and closing challenge.
- One coherent sport state across desktop and mobile media, emotional line, accent, URL, selected control, and App Store route.
- One `620ms` signal sweep for sport changes; reduced-motion state changes are immediate.
- Real product evidence stays readable, singular, and unmodified.

## Colors

Near-black article surfaces hold the page together, chalk carries information, and the active sport accent behaves as a live signal. Cool blue provides atmospheric separation but never competes with the current action.

### Primary

- **Signal Green** (`#2ee68b`): General sport accent, primary action fill, focus and selection color, text selection, signal sweep, and the terminal point of the method line.
- **Cool Arena Blue** (`#5b7cff`): Low-opacity counterlight behind the page, method, and product proof. It is atmospheric, not interactive.
- **Sport Accents** (`#43d990`, `#f3a33b`, `#c9ec52`, `#c8ef53`, `#49d8c4`): Soccer, Basketball, Pickleball, Tennis, and Volleyball respectively. The General state uses Signal Green.

### Neutral

- **Article Night** (`#07090c`): Page and hero ground, header veil source, safety band, and footer.
- **Article Sunken** (`#0b0e12`): Method and closing chapter plane.
- **Article Raised** (`#101419`): Reserved raised night surface from the implemented root palette.
- **Screen Black** (`#0b1013`): Backing behind the real Progress screenshot.
- **Chalk** (`#f2f4f3`): Primary copy and the hover reversal for signal actions.
- **Muted Copy** (`#a7b0b8`): Supporting statements, navigation, captions, and Premium Preview terms.
- **Inactive Control** (`#78828a`): Unselected sport controls, safety copy, and footer metadata.
- **Quiet Rule** (`rgba(255, 255, 255, 0.11)`): Hairlines, dock boundary, selector baselines, nav shell, and scrolled-header divider.
- **Strong Rule** (`rgba(255, 255, 255, 0.18)`): Method connectors before they resolve into the active signal.
- **Action Ink** (`#04140d`): High-contrast text on sport-accent and Chalk action fills.

### Named Rules

**The One Active Signal Rule.** The current sport accent owns actions, focus, selection, the emotional emphasis, and the sweep at the same time; never show competing sport accents in one state.

**The Blue Stays Counterlight Rule.** Cool blue may shape atmosphere behind content, but it never becomes a primary button, selector state, focus outline, or headline emphasis.

## Typography

**Display Font:** Archivo Black (with `sans-serif` fallback)

**Body Font:** Work Sans (with `sans-serif` fallback)

**Character:** Archivo Black is the competitive command voice: dense, blunt, and visually immovable at its single `400` weight. Work Sans carries explanation and control labels with enough weight range to stay clear against the dark field. There is no ornamental or emotional serif voice in this system.

### Hierarchy

- **Display:** Archivo Black, weight `400`, `clamp(4rem, 8vw, 6rem)`, line-height `0.92`, letter-spacing `-0.035em`. Use for the uppercase hero and closing challenge; the hero may start at `4.6rem` on desktop.
- **Headline:** Archivo Black, weight `400`, `clamp(3.2rem, 6vw, 4.7rem)`, line-height `0.94–0.95`, letter-spacing `-0.035em`. Use sentence case for the method and Progress chapters.
- **Body:** Work Sans, weight `400`, `clamp(0.96rem, 1.3vw, 1.12rem)`, line-height `1.55`, with measures between `34ch` and `43ch`. Keep explanation brief.
- **Action:** Work Sans, weight `780`, `0.82rem`, line-height `1.55`. Header action reduces to `0.76rem`; labels remain short and literal.
- **Navigation:** Work Sans, weight `620`, `0.78rem`, line-height `1.55`. Use sentence case inside the compact pill shell.
- **Selector:** Work Sans, weight `720`, `0.75rem`, line-height `1.55`. Sport names stay on one line; the dock title uses weight `650`, tracking `0.08em`, and uppercase.
- **Micro Copy:** Work Sans, `0.75rem`, line-height `1.35–1.55`, in Muted Copy or Inactive Control. Use for Premium Preview terms, safety guidance, and footer metadata.

### Named Rules

**The One Command Face Rule.** Archivo Black owns every major homepage command; do not reintroduce Cormorant Garamond or another expressive display family into this surface.

**The Short Command Rule.** Keep display lines between roughly `8ch` and `12ch`; scale and line breaks should produce force without turning a heading into a banner.

## Layout

The homepage has four narrative chapters plus supporting safety and footer bands. The hero and selector form one `100svh` first viewport with a `760px` desktop minimum: copy occupies the left `0.88fr`, athlete media the right `1.12fr`, and a `136px` sport dock spans the bottom. The method chapter uses `max(72svh, 620px)` and a `1.45fr / 0.55fr` copy split. The Progress proof uses `max(92svh, 820px)` and a `0.84fr / 1.16fr` split. The closing challenge uses `max(68svh, 560px)`. Section gutters use `clamp(24px, 8vw, 120px)` where the composition needs broad breathing room.

At `900px`, main navigation hides, the hero shifts to `0.78fr / 1.22fr`, the dock becomes `152px` tall, and the Progress screen fixes at `300px`. At `760px`, the hero stacks into a `39svh` athlete plane, command copy, and a two-row `3 × 2` selector dock; the primary action fills the available width. Method and proof become single-column chapters, the Progress screen becomes `clamp(224px, 62vw, 242px)`, and page gutters become `16px`. Minimum supported width is `320px`; short landscape viewports below `700px` use a `700px` hero minimum instead of forcing `100svh`.

Desktop athlete sources are `1200 × 2150` approved campaign portraits. At `760px` and below, the `<picture>` element switches to deterministic `780 × 658` derivatives documented in `assets/awakening/ASSET_MANIFEST.md` and `docs/design/asset-manifest.json`; every derivative preserves the face, full stance, and sport equipment over a darkened blur of its own source.

### Named Rules

**The Four-Chapter Rule.** Keep the homepage sequence to promise and choice, week-led method, one Progress proof, and closing challenge; supporting safety and footer bands do not become new feature chapters.

**The One Real Screen Rule.** The homepage shows one readable, current Progress screen. Do not restore the discarded three-screen stack or turn this surface into a feature gallery.

## Elevation & Depth

Depth comes first from tonal night planes, green and blue radial counterlight, the athlete vignette, the faint `48px` hero grid, and a fixed `2.6%` grain layer. Controls remain compact and low-profile. Only the action pills and real screenshot receive persistent lift.

### Shadow Vocabulary

- **Action Lift:** `0 12px 30px rgba(0, 0, 0, 0.34)` under primary and header actions.
- **Evidence Lift:** `0 38px 100px rgba(0, 0, 0, 0.55)` under the real Progress screenshot.
- **Signal Glow:** `0 0 18px` in the current sport accent, attached only to the moving `1px` signal sweep.
- **Scrolled Header Veil:** `rgba(7, 9, 12, 0.9)` with a `1px` Quiet Rule after `20px` scroll; it is tonal separation, not a floating shadow.

### Named Rules

**The Proof Owns Heavy Lift Rule.** The real Progress screen is the only object allowed the large Evidence Lift; do not use that shadow on copy, selectors, or decorative containers.

**The Texture Stays Subliminal Rule.** Grain remains fixed at `0.026` opacity and the background grid remains faint; neither may compete with copy or athlete detail.

## Shapes

The system combines open, square-edged chapters with compact pill controls. Primary actions and the desktop navigation shell use a `999px` radius; the approved app icon uses `12px`; the real Progress frame uses `16px`; and the keyboard skip link uses `8px`. Sport options remain rectangular and borderless with a single ruled baseline. One-pixel lines and clipped media planes establish structure without content cards.

### Named Rules

**The Open Field Rule.** Do not wrap chapter copy in rounded cards, glass panels, or floating feature tiles; space, tonal planes, and rules already carry the hierarchy.

## Components

### Buttons

- **Primary:** Signal-filled full pill, Action Ink text, `48px` minimum height, and `0 22px` padding. Hover lifts `2px` over `180ms` and reverses the fill to Chalk.
- **Header:** Same signal/action relationship at a compact `44px` minimum height, `0 18px` padding, and `112px` minimum width.
- **Focus:** Every interactive element uses a `3px` current-sport outline with `4px` offset.
- **Mobile:** The hero action spans the dock width. The closing action is capped at `358px` while remaining able to fill the viewport.

### Sport Selector

- **Structure:** Six allowlisted buttons in one desktop row and a `3 × 2` mobile grid. Each target is at least `48px` high on desktop and `44px` on mobile.
- **Default / Hover:** Inactive Control text on transparent ground; hover shifts to Chalk.
- **Selected:** Current sport accent text over a `9%` accent tint, with `aria-pressed="true"` and the only `tabindex="0"`.
- **Keyboard:** Arrow keys wrap through choices; Home and End jump to the first and last state.

### Navigation

The fixed `64px` header uses a three-column grid: brand, centered pill navigation, and compact action. The navigation shell has `4px` padding, a `1px` Quiet Rule, and `999px` corners; links have a `40px` minimum height and turn to the current sport accent on hover. Navigation links hide at `900px`, while brand and action remain. The header gains its veil and bottom rule after `20px` scroll.

### Athlete Signal Plane

Approved campaign portraits fill the media plane with `object-fit: cover`, saturation `0.83`, and contrast `1.06`, then merge into Article Night through directional gradients. Each sport defines its own desktop focal position; mobile uses the prepared derivative without hiding the face, stance, or equipment.

Changing sport synchronizes the desktop portrait, mobile portrait source, alt text, emotional line, current accent, `?sport=` URL, `aria-pressed` state, roving tab stop, and all three App Store route actions. Unknown query values fall back to General, and browser back/forward reapplies the matching state. The one visible signal sweep runs for `620ms` with `cubic-bezier(0.16, 1, 0.3, 1)`; supported browsers also use a `140ms` outgoing and `430ms` incoming View Transition. Under `prefers-reduced-motion: reduce`, the sweep is removed, View Transition animation is disabled, smooth scrolling stops, and state changes are effectively instant at `0.001ms`.

### Method Line

The ruled method component maps “Your sport” and “Your week” to “Next workout” across two thin gradient connectors. Supporting labels use Muted Copy; the result uses the current sport accent. On mobile it keeps all five elements in one compressed row rather than becoming a diagram card.

### Progress Evidence

The proof chapter contains one unpadded, `16px`-clipped frame for `assets/screenshots/progress-trends.webp`, backed by Screen Black and lifted by the Evidence Lift. Preserve its `640 × 1391` aspect ratio and original interface pixels. The Progress screen stays the same across sport states because it is general product evidence, not sport-specific acquisition art.

## Do's and Don'ts

### Do:

- **Do** keep Athlete Signal Split scoped to the production homepage unless another surface is explicitly approved to adopt it.
- **Do** preserve the four-chapter order and keep the hero’s promise, athlete, six sport choices, Premium Preview terms, and primary action visible in the first viewport.
- **Do** synchronize media, emotional line, accent, URL, selected state, accessible label, and allowlisted App Store route for General plus all five sports.
- **Do** use the documented mobile athlete derivatives at `760px` and below and preserve every athlete’s face, full stance, and equipment.
- **Do** use only the real Progress screenshot as homepage product evidence and keep its native pixels intact.
- **Do** preserve keyboard navigation, `44px` minimum touch targets, `3px` focus outlines, meaningful non-JavaScript content, and immediate reduced-motion state changes.
- **Do** describe App Store actions as clicks or discovery, not installs, and preserve the verified one-time 7-day Premium Preview language.

### Don't:

- **Don't** restore Second Awakening’s Cormorant Garamond voice, repeated identity chapters, three-screen pile, or full-viewport sequence.
- **Don't** let cool blue become an active sport color or display multiple sport accents in one state.
- **Don't** add generic fitness scaffolding, feature-card grids, glass panels, fake dashboards, testimonials, metrics, urgency, medical outcomes, or guaranteed performance claims.
- **Don't** fabricate or repaint app UI, modify the approved logo, or present campaign athletes as customers or endorsers.
- **Don't** change `/app` routes, forward arbitrary query strings, or replace verified custom-product-page destinations with one generic App Store listing.
