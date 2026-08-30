---
name: "DoThis: Train For Your Game"
description: "A nocturnal second awakening that restores athletic identity before revealing the product."
colors:
  arena-black: "#030608"
  arena-raised: "#071014"
  arena-sport: "#050a0d"
  arena-inside: "#06100f"
  screen-black: "#0b1013"
  chalk-white: "#f5f3ed"
  chalk-soft: "#b9c2be"
  emerald: "#24d3a2"
  signal: "#78f3ce"
  night-line: "rgba(245, 243, 237, 0.2)"
  selector-muted: "#7d8d88"
  safety-muted: "#7d8a86"
  footer-muted: "#899591"
  sport-general: "#24d3a2"
  sport-soccer: "#43d990"
  sport-basketball: "#f3a33b"
  sport-pickleball: "#c9ec52"
  sport-tennis: "#c8ef53"
  sport-volleyball: "#49d8c4"
typography:
  display:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "clamp(4rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "clamp(3.5rem, 7vw, 6rem)"
    fontWeight: 760
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  serif-voice:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.7rem, 2.7vw, 2.55rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "normal"
  body:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  action:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.86rem"
    fontWeight: 800
    lineHeight: 1.55
    letterSpacing: "normal"
  header-action:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "normal"
  navigation:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 650
    lineHeight: 1.55
    letterSpacing: "0.08em"
  selector:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "0.06em"
rounded:
  square: "0px"
  icon: "12px"
  screen: "16px"
  pill: "999px"
spacing:
  xs: "12px"
  sm: "16px"
  md: "20px"
  lg: "24px"
  xl: "28px"
  2xl: "34px"
  3xl: "42px"
components:
  button-primary:
    backgroundColor: "rgba(245, 243, 237, 0.045)"
    textColor: "{colors.chalk-white}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "7px 8px 7px 24px"
    height: "58px"
  button-primary-hover:
    backgroundColor: "rgba(120, 243, 206, 0.08)"
    textColor: "{colors.chalk-white}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "7px 8px 7px 24px"
    height: "58px"
  button-header:
    backgroundColor: "transparent"
    textColor: "{colors.chalk-white}"
    typography: "{typography.header-action}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  sport-option:
    backgroundColor: "transparent"
    textColor: "{colors.selector-muted}"
    typography: "{typography.selector}"
    rounded: "{rounded.square}"
    padding: "0"
    height: "48px"
  sport-option-selected:
    backgroundColor: "transparent"
    textColor: "{colors.sport-general}"
    typography: "{typography.selector}"
    rounded: "{rounded.square}"
    padding: "0"
    height: "48px"
  native-screen:
    backgroundColor: "{colors.screen-black}"
    rounded: "{rounded.screen}"
---

# Design System: DoThis

## Overview

**Creative North Star: "Second Awakening"**

DoThis is a nocturnal arena in the instant before an athlete returns to motion. Near-black full-viewport chapters, disciplined white type, and life-size campaign portrait planes create recognition and tension before the page explains anything. Emerald arrives as a rare signal of readiness, not a decorative brand wash.

The visual system is sparse and identity-first. Work Sans delivers compressed, uppercase commands; italic Cormorant Garamond carries the private inner voice. Real Today, Workout, and Progress screens appear only as a restrained three-screen glimpse, preserving mystery while making the App Store action credible.

**Key Characteristics:**

- Nocturnal arena-black chapters with subtle green-black tonal shifts.
- Athlete campaign portraits treated as full-height spatial planes.
- Monumental Work Sans commands cut by intimate italic Cormorant Garamond lines.
- Emerald signal color used for awakening language, focus, selection, and action.
- Full-viewport pacing with one emotional job per chapter.
- One coherent sport state across portrait, whisper, accent, URL, and App Store route.
- Three real product screens staged as physical evidence, never a feature gallery.

## Colors

Near-blacks build the arena, chalk whites hold the voice, and the emerald signal punctures the darkness; sport accents appear only inside the synchronized sport state.

### Primary

- **Emerald Signal** (`#24d3a2`): Primary actions, selection, text selection, focus, and the default sport state.
- **Awakening Light** (`#78f3ce`): Serif emphasis, closing commands, scroll cue, and primary-action hover.
- **Sport Accents** (`#24d3a2`, `#43d990`, `#f3a33b`, `#c9ec52`, `#c8ef53`, `#49d8c4`): General, Soccer, Basketball, Pickleball, Tennis, and Volleyball states respectively.

### Neutral

- **Arena Black** (`#030608`): Page ground, hero darkness, manifesto, final awakening, and scrolled-header veil.
- **Raised Arena** (`#071014`): Available raised nocturnal surface token.
- **Sport Arena** (`#050a0d`): Sport chapter ground and vignette destination.
- **Inside Arena** (`#06100f`): Product-glimpse chapter ground.
- **Screen Black** (`#0b1013`): Native-screen frame backing.
- **Chalk White** (`#f5f3ed`): Primary copy and interactive reversal.
- **Soft Chalk** (`#b9c2be`): Supporting copy and quiet navigation.
- **Night Rule** (`rgba(245, 243, 237, 0.2)`): Hairline separators.
- **Muted Text** (`#7d8d88`, `#7d8a86`, `#899591`): Inactive sport choices, safety copy, and footer metadata.

### Named Rules

**The Signal Stays Rare Rule.** Emerald marks awakening, choice, focus, or action; it does not become ambient decoration or a broad background field.

**The Sport State Is Whole Rule.** A sport choice changes portrait, whisper, accent, URL state, and every App Store action together; never change one part alone.

## Typography

**Display Font:** Work Sans (with `sans-serif` fallback)
**Body Font:** Work Sans (with `sans-serif` fallback)
**Expressive Font:** Cormorant Garamond (with `Georgia, serif` fallback)

**Character:** Work Sans is athletic discipline: heavy, condensed by tight tracking, and declarative in uppercase. Cormorant Garamond is the returning inner voice: italic, high-contrast, and deliberately softer.

### Hierarchy

- **Display:** Work Sans, weight 800, `clamp(4rem, 8vw, 6rem)`, line-height `0.82`, letter-spacing `-0.04em`, uppercase. Hero and closing commands only.
- **Headline:** Work Sans, weights 760–780, `clamp(3.3rem, 6vw, 6rem)` to `clamp(3.5rem, 7vw, 6rem)`, line-height `0.86–0.9`, letter-spacing `-0.04em`, uppercase where used. Major chapter statements.
- **Serif Voice:** Cormorant Garamond italic, `clamp(1.7rem, 2.7vw, 2.55rem)` in the hero and up to `clamp(2rem, 4.5vw, 4.5rem)` in the manifesto. Use for recognition, longing, and the second half of split headlines.
- **Body:** Work Sans, weight 400, `1rem`, line-height `1.55`. The homepage intentionally uses little paragraph copy.
- **Action:** Work Sans, weights 700–800, `0.82rem–0.86rem`. Keep action labels short and direct.
- **Navigation:** Work Sans, weight 650, `0.75rem`, letter-spacing `0.08em`, uppercase.
- **Selector:** Work Sans, weight 700, `0.75rem`, letter-spacing `0.06em`, uppercase.
- **Micro Copy:** Work Sans, `0.75rem–0.76rem`, muted color. Premium Preview terms, safety guidance, and footer metadata.

### Named Rules

**The Outer-and-Inner Voice Rule.** Work Sans commands in public; italic Cormorant Garamond reveals what the athlete already knows.

**The Narrow Command Rule.** Monumental statements remain between roughly 7ch and 13ch so scale creates impact without becoming a banner.

## Layout

The page advances through full-viewport chapters rather than conventional content sections. Hero and manifesto use `100svh`; sport and product chapters use `110svh`; the closing chapter uses `94svh`. Desktop compositions are asymmetric: the hero portrait owns the right `57%`, the sport chapter splits `56% / 44%`, and the product glimpse splits `.72fr / 1.28fr`. Horizontal insets use fluid clamps such as `clamp(24px, 7vw, 110px)` and `clamp(24px, 8vw, 130px)`.

The three product screens occupy a minimum `880px` stage. Each frame is `min(31vw, 360px)` and rotated `-5deg`, `1deg`, and `6deg`, with staggered bottom offsets; overlap and cropping imply a larger product world without turning the chapter into a carousel.

At `900px`, desktop navigation disappears, portrait and copy proportions tighten, the product chapter stacks, and screens widen to `39vw`. At `620px`, header height becomes `70px`, page gutters become `16px`, the hero becomes a bottom-anchored image plane, the sport portrait becomes `72svh`, the selector becomes a horizontal scroller, primary and final actions become full width, and screens widen to `62vw` inside a fixed `820px` stage. Minimum supported body width is `320px`.

### Named Rules

**The One Beat Per Viewport Rule.** Each chapter carries one emotional beat: promise, recognition, sport choice, product proof, or wake-up command.

**The Glimpse, Not Gallery Rule.** Show exactly the restrained Today, Workout, and Progress trio at readable scale; do not expand the homepage into a feature grid.

## Elevation & Depth

The system is flat until imagery needs spatial separation. Depth comes from portrait planes, directional gradients, vignette transitions, crop, overlap, rotation, and one heavy shadow under native screens. Ordinary copy and controls receive no persistent shadow.

### Shadow Vocabulary

- **Screen Lift:** `0 38px 100px rgba(0,0,0,.55)` for each real product-screen frame.
- **Scrolled Header Veil:** `rgba(3, 6, 8, 0.92)` plus a `1px` Night Rule border after `24px` scroll; this is tonal depth, not a shadow.

### Named Rules

**The Evidence Owns Depth Rule.** Persistent shadow belongs to real product evidence; atmosphere elsewhere comes from black-on-black layering and portrait gradients.

## Shapes

The form language is hard-edged and cinematic, with fully rounded conversion actions as the deliberate soft counterpoint. Rules are one-pixel lines. Sport choices are borderless text set on a ruled strip. Pill geometry is reserved for actions, while the approved app icon keeps a `12px` radius and real native screens use `16px` clipping. Portrait planes and chapters clip overflow so the page feels framed, not carded.

### Named Rules

**The No Card Chrome Rule.** Do not introduce rounded content cards, glass panels, or floating feature tiles into the open arena composition.

## Components

### Buttons

- **Primary / Final:** Compact glass-dark full pill with Chalk White text, `58px` minimum height, `7px 8px 7px 24px` padding, and a `42px` Awakening Light `>` disc. Mobile actions stay content-width instead of stretching edge to edge.
- **Hover:** Lift `2px` over `220ms` using `cubic-bezier(.16, 1, .3, 1)` while the outline gains signal color and the arrow disc moves right by `2px`.
- **Header:** Transparent full pill with a `1px rgba(245, 243, 237, 0.52)` border, `48px` minimum height, and `0 20px` padding. Hover reverses to Chalk White on Arena Black.
- **Text / Ghost:** No fill or custom chrome; minimum height `48px`, weight 700, and a visible underline.
- **Focus:** Global `3px` Sport Accent outline with `5px` offset.

### Chips

- **Style:** Borderless uppercase text on a strip bounded by Night Rule, with `48px` minimum height and `20px` horizontal gaps.
- **State:** Unselected is `#7d8d88`; hover is Chalk White; selected is the active sport accent. One roving tab stop supports Arrow Left, Arrow Right, Home, and End.
- **Mobile:** One-line horizontal overflow with hidden scrollbar; selection is centered programmatically.

### Cards / Containers

- **Native Screens:** Screen Black backing, `16px` radius, clipped overflow, Screen Lift shadow, and no internal padding. Real screenshots remain unmodified.
- **Content Chapters:** No cards. Use full-bleed tonal planes, image crops, gradients, rules, and open space.

### Navigation

The fixed `82px` desktop header uses a three-column grid: brand, centered links, and header action. Links are uppercase Soft Chalk at `0.75rem`, weight 650, and `0.08em` tracking; hover becomes Chalk White. Once scrolled beyond `24px`, the header receives the translucent Arena Black veil and Night Rule. At `900px`, navigation links disappear; the brand and action remain. At `620px`, header height becomes `70px`, icon becomes `38px`, and action height becomes `44px`.

### Athlete Portrait Plane

Campaign portraits fill their plane with `object-fit: cover`, muted saturation (`.8`), and slight contrast (`1.06–1.08`). Desktop uses directional black gradients to merge portrait and copy; mobile uses a bottom-up gradient so copy can anchor below the face and body. Portrait changes use the browser View Transition API when available.

### Three-Screen Glimpse

The Today, Workout, and Progress captures form one restrained physical stack. The center Workout screen sits above the other two; each screen keeps its native aspect ratio and is partially cropped by the chapter. Never repaint, synthesize, or decorate the UI itself.

## Do's and Don'ts

### Do:

- **Do** keep Second Awakening nocturnal, sparse, identity-first, and paced in full-viewport chapters.
- **Do** use approved athlete campaign portraits as large spatial planes and real simulator captures as product evidence.
- **Do** preserve the Work Sans and italic Cormorant Garamond outer/inner voice split.
- **Do** keep portrait, whisper, active accent, URL state, and App Store destination synchronized for all six sport states.
- **Do** preserve `44px` minimum touch targets, `3px` focus outlines, keyboard sport selection, meaningful non-JavaScript content, and reduced-motion behavior.

### Don't:

- **Don't** revive the previous warm-paper identity or dense explanatory chapters.
- **Don't** broaden emerald into a decorative wash or mix multiple sport accents in one state.
- **Don't** turn the three-screen glimpse into a product gallery, dashboard, or carousel.
- **Don't** fabricate, repaint, crop away, or visually modify product UI; screenshots are evidence.
- **Don't** add generic fitness imagery, glassmorphism, rounded-card grids, gradients unrelated to portrait integration, testimonials, metrics, medical outcomes, or unsupported product claims.
