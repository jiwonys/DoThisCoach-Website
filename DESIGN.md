---
name: "DoThis — Community Sports Club"
description: "A daylight season program for recreational athletes, grounded in real DoThis product evidence."
colors:
  pine: "#245b4a"
  pine-hover: "#193f34"
  clay: "#b44f2e"
  sage: "#e0e9df"
  paper: "#f6f8f5"
  white: "#fff"
  ink: "#192f2b"
  muted: "#56685f"
  line: "#ccd7ce"
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(58px, 6.9vw, 96px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(34px, 3.4vw, 50px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "24px"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  body-compact:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
  action:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  option: "5px"
  control: "6px"
  day: "8px"
  panel: "14px"
spacing:
  gutter: "clamp(22px, 4.45vw, 72px)"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "16px 23px"
  button-primary-hover:
    backgroundColor: "{colors.pine-hover}"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.pine}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "16px 23px"
  button-light-hover:
    backgroundColor: "{colors.sage}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.pine}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "16px 23px"
  button-outline-hover:
    backgroundColor: "{colors.sage}"
  sport-option:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.option}"
    padding: "8px 15px"
  sport-option-selected:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.white}"
  training-choice:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  training-choice-selected:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.white}"
  feature-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.option}"
    padding: "9px 11px"
  feature-tab-selected:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.white}"
  week-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "28px"
  week-day:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
    rounded: "{rounded.day}"
    padding: "14px 12px 18px"
  week-day-match:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.white}"
  plan-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "34px"
  plan-card-premium:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.white}"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  faq-row:
    textColor: "{colors.ink}"
    padding: "20px 0"
---

# Design System: DoThis — Community Sports Club

## Overview

**Creative North Star: "The Community Sports Club Season Program"**

DoThis borrows the clarity of a community sports club's printed season program: daylight paper, evergreen ink, bold athletic lettering, and clay marking the match. The mood is capable, welcoming, and practical. It belongs to adults who fit strength training around the games they enjoy.

Real product evidence carries the visual argument. Spacious text-and-image compositions alternate with tonal sections and useful schedule, selector, and disclosure patterns. The approved DoThis icon and wordmark treatment remain intact; the founder's beach volleyball example sits within a broad recreational-sport identity.

This is a refresh of the incumbent system following the authorized September 17, 2026 redesign. The finished `index.html`, `home.css`, and `home.js` replace the earlier teal-and-amber homepage as the visual source of truth. Product commitments remain in `PRODUCT.md`; homepage composition and release scope remain in `.impeccable/surfaces/index-html.md` and `docs/design/sport-coach-direction.md`.

**Key Characteristics:**

- Pale paper and sage surfaces with pine actions and ink text.
- Archivo Black display type paired with readable Work Sans.
- Real native screenshots and complete approved App Store boards.
- Flat information surfaces, thin dividers, and modest rounded corners.
- Explicit selected states, visible focus, and native disclosures.

## Colors

The palette combines daylight neutrals with evergreen structure and a restrained clay signal; the frontmatter preserves the exact source values.

### Primary

- **Pine** is the primary action, selected-state, headline-emphasis, and dark-section color.
- **Pine Hover** deepens primary buttons on pointer hover.

### Secondary

- **Clay** identifies the illustrative match day, keyboard focus, and hovered navigation links.
- **Sage** provides the announcement, screenshot mounts, schedule days, pricing backdrop, and light-action hover surfaces.

### Neutral

- **Paper** is the default page canvas and the light panel color inside darker sections.
- **White** carries reversed action text and light buttons, and provides discrete control and menu surfaces.
- **Ink** is the principal body and heading color.
- **Muted** carries supporting descriptions, captions, and secondary labels on light surfaces.
- **Line** supplies thin dividers and unselected-control borders.

### Named Rules

**The Pine Action Rule.** Use pine for the main action and the selected state; reserve clay for match emphasis, focus, and navigation feedback.

## Typography

**Display Font:** Archivo Black with a sans-serif fallback.
**Body Font:** Work Sans with a sans-serif fallback.

Both families are licensed local WOFF2 assets under `assets/fonts/`. Archivo Black uses its actual regular weight; Work Sans supplies the text and control weights. No external font request is required.

**Character:** Wide, dense display letters give the page its sporting voice. Work Sans keeps explanations, prices, navigation, and controls direct and readable.

### Hierarchy

- **Display:** The frontmatter records the desktop hero role. The hero and closing call to action use uppercase, compact leading, and deliberate line breaks; closing display size is adjusted to its own composition.
- **Headline:** Reused section headings use the responsive Archivo Black role, balanced wrapping, and sentence case.
- **Title:** Work Sans titles use medium-heavy emphasis. The reusable base is the frontmatter title role; local component sizes range from compact schedule headings to larger session results.
- **Body:** The normal page base is the frontmatter body role. Longer product explanations commonly use the compact body role; hero and introductory paragraphs are enlarged where the composition calls for them.
- **Action:** Work Sans semibold carries the main button role. Navigation, sport options, and feature tabs use more compact component-specific sizes.
- **Supporting text:** Captions and legal or offer notes are subordinate to the content they qualify. Their small source sizes are local treatments, not a general-purpose label scale.

### Named Rules

**The Two Voice Rule.** Use Archivo Black for display, section headings, and large prices; use Work Sans for explanations, controls, navigation, and supporting detail.

## Layout

The shared content wrapper is capped at 1392px including its fluid gutters. The gutter token grows from 22px to 72px. Desktop compositions generally pair text with product evidence; text widths stay contained inside their columns rather than spanning the full wrapper.

The layout uses a flexible spacing vocabulary, not a single enforced grid unit. Repeated small spaces are recorded in the frontmatter. Desktop section padding generally falls around 85–105px; the main mobile sections tighten to roughly 57–62px. Dividers and changes in surface color establish structure without boxing every topic into a card.

At 1150px and below, gaps, screenshot dimensions, and some typography tighten. At 900px and below, desktop navigation hides while the native menu remains available. At 640px and below, paired sections, pricing, and guide links stack; main headings become 33px, and the hero uses `clamp(49px, 12.7vw, 73px)`. At 370px and below, the smallest controls and screenshot composition tighten again. The 1600px minimum-width rule expands the hero's evidence composition.

The seven-day example keeps all seven days visible on mobile. It reduces internal spacing and hides supporting day notes instead of requiring horizontal scrolling. The match stays fixed while the controls below change the illustrative training dose.

The sticky header has matching scroll offsets for section anchors: 102px normally and 86px on mobile. Preserve legacy fragments alongside current section IDs. All six fixed App Store routes and their existing identifiers remain behavioral constraints, independent of any future layout refinement.

## Elevation & Depth

The system is flat by default. Paper, sage, pine, thin divider lines, and whitespace separate information. Soft shadows belong to actual app-screen images; buttons, pricing panels, schedule panels, and the navigation disclosure do not gain decorative card shadows.

### Shadow Vocabulary

- **Stacked app screens** (`0 15px 28px #192f2b26`): the overlapping hero evidence.
- **Sport preview** (`0 18px 34px #192f2b24`): the selected full screenshot or approved App Store board.
- **Feature screen** (`0 15px 32px #192f2b26`): the current native feature capture.

### Named Rules

**The Evidence Depth Rule.** Give soft depth to real product screens; separate ordinary information with tone, spacing, and thin rules.

## Shapes

Controls are modest rounded rectangles. The source uses the control radius for buttons and training choices, the option radius for sport links and feature tabs, and the panel radius for major containers. Desktop schedule days use the day radius and reduce to the option radius on mobile.

Dividers and outlined controls use 1px strokes. Screenshot corners follow the source presentation rather than imposing one universal device shell. Keep approved App Store boards whole; do not wrap an existing board in another phone frame. The small numbered process markers remain circles because they encode order.

The approved logo asset is unchanged. Its existing rounded image treatment is an identity treatment, not a substitute icon shape for new components.

## Components

### Buttons

Confident, compact actions with clear contrast.

- **Primary:** Pine with white text, the frontmatter padding and control radius, and a 56px minimum height.
- **Light:** White with pine text, used on pine surfaces.
- **Outline:** Transparent with pine text and a pine 1px border, used for the quieter pricing action.
- **Compact:** Header buttons reduce padding and type size while retaining the same visual family.
- **Hover:** Primary darkens; light and outline variants use sage.
- **Focus:** Interactive elements share a clay 3px outline with a 5px offset.
- **Motion:** Button and sport-link background/color transitions last 180ms. Reduced-motion preference removes transitions and smooth scrolling.

### Sport options and training choices

Sport options are real links, with an `aria-current` selected state. Training choices are buttons with `aria-pressed`. Both use pine and white when selected, but retain their distinct padding, shape, and hover treatment.

Sport selection coordinates copy, truthful visual evidence, and the existing download destination. The general-athlete state shows the neutral Progress capture. The five named sports use their approved App Store boards. Loading and error captions remain visible so a delayed or unavailable image is not presented as new evidence.

### Feature tabs

A compact row of Work Sans controls sits over a thin divider. The selected tab uses pine with white text; inactive tabs use muted text and a light hover surface. Inline SVG icons supplement the labels and hide at narrower tablet widths.

The tablist supports Left/Right, Home, and End keys and uses one keyboard tab stop. Selection updates the associated panel, real screenshot, and caption. Preserve the tab/panel relationships and image-loading feedback.

### Cards and containers

Use panels when information needs a shared surface: the illustrative week, screenshot mounts, and pricing comparison. Paper and sage carry light containers; pine carries the Premium variant. Major panels use the panel radius with context-specific responsive padding. Keep explanatory and editorial sections open rather than turning every paragraph into a card.

### Navigation

The sticky header uses the paper canvas and a single divider. The desktop navigation is compact Work Sans; hovered links use clay and an underline. A native `details` menu exposes the same primary anchors and the existing library, comparison, partner, support, privacy, and terms destinations.

The disclosure panel is white with a line border and modest rounding. It can scroll within the available viewport. Escape closes it and returns focus to the summary; outside click, outside focus, and following a link also close it.

### Illustrative training week

The seven-column schedule is the signature teaching pattern. Sage days surround a clay match day. The three dose choices use the existing training-choice component; the selected result is announced politely.

Thursday remains Match Day. The user changes Sports Prep, Lighter Workout, or Full Workout, not the calendar. Keep both the illustrative label and the explanation that the real session also considers goals, equipment, and recovery.

### FAQ disclosures and guide links

FAQ rows use native `details`, thin horizontal rules, a generous clickable summary, and an inline SVG plus that rotates when open. Their content remains usable without JavaScript.

Training guides use linked editorial rows, shared borders, Work Sans titles, and simple inline SVG arrows. On mobile they become vertically stacked rows. No decorative category labels are required.

## Do's and Don'ts

### Do:

- **Do** pair product claims with real, appropriately labeled DoThis screenshots or approved App Store boards.
- **Do** keep the approved logo and icon unchanged and the six existing App Store destinations intact.
- **Do** use pine to make actions and selected states consistent across components.
- **Do** preserve keyboard states, semantic links and disclosures, reduced motion, and meaningful non-JavaScript defaults.
- **Do** keep screenshot subjects, captions, sport copy, and selected download destinations coherent.
- **Do** label examples and retain clear preview, subscription, and offer explanations.

### Don't:

- **Don't** restore the superseded teal-and-amber homepage palette or its Anton, Archivo, and Chivo Mono type pairing.
- **Don't** fabricate app screens, customer endorsements, performance claims, or remaining-offer counts.
- **Don't** treat beach volleyball as the limit of the product's sport coverage.
- **Don't** add a second phone frame around approved App Store boards or crop away their product evidence.
- **Don't** add decorative eyebrows, glyph icons, or hard offset shadows to new surfaces.
- **Don't** present the illustrative week as a live generated plan or imply that selecting a dose moves the match.
