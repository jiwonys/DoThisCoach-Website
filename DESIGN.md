---
name: DoThis — Film first / Match Night
description: The built dark and emerald homepage system, extracted from src/home.css, index.html, and home.js on 2026-09-17.
colors:
  bg: "#0d0d14"
  surface: "#13131c"
  ink: "#f5f0e8"
  muted: "#a7a7bc"
  accent: "#10b981"
  line: "#2a2a3a"
  on-accent: "#06120c"
  accent-hover: "#49d5a6"
  media-note: "#d1d1db"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(60px, 6.55vw, 96px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Work, sans-serif"
    fontSize: "clamp(34px, 3.7vw, 54px)"
    fontWeight: 550
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Work, sans-serif"
    fontSize: "40px"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Work, sans-serif"
    fontSize: "17px"
    lineHeight: 1.7
  action:
    fontFamily: "Work, sans-serif"
    fontSize: "15px"
    fontWeight: 650
  control:
    fontFamily: "Work, sans-serif"
    fontSize: "13px"
rounded:
  selector: "3px"
  control: "4px"
  screen: "18px"
spacing:
  mobile-gutter: "22px"
  hero-gutter: "4.5vw"
  section-gutter: "6vw"
  section: "100px"
  section-mobile: "65px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  sport-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.selector}"
    padding: "10px 15px"
  billing-selected:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.control}"
    rounded: "{rounded.selector}"
    padding: "10px 20px"
  film-control:
    backgroundColor: "#0d0d14b3"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
---
# Design System: DoThis

## Overview

**Creative North Star: "Film first / Match Night"**

The selected Film first direction uses real athletic movement, a continuous near-black field, warm readable text, and emerald actions. Broad photographic areas supply energy; quiet two-column passages and authentic app screens explain what DoThis does. Controls are compact, flat, and visibly interactive.

This records the completed local homepage implementation authorized by the user’s September 17 selection of proposal A. It supersedes the former ivory homepage system, preserved under `docs/design/beyond-the-court/pre-full-homepage/`. The unchanged approved logo, authentic product evidence, and athlete-controlled training decisions remain binding product constraints. Publication requires separate approval. The first body comment in `index.html` and `docs/design/beyond-the-court/DIRECTION.md` record direction authority; the page sequence belongs in the homepage surface brief.

**Key Characteristics:**

- Real stock film and photographic posters on continuous dark ground.
- Emerald actions and selected states, with warm primary text and muted explanatory copy.
- Archivo Black display lettering paired with Work Sans reading and controls.
- Unchanged native app screenshots, flat ruled sections, and text-only film controls.

## Colors

The palette follows the native Dark world: near-black ground, subtly raised dark sections, warm off-white text, cool muted copy, and one emerald accent. The frontmatter is the normative value record; CSS aliases are `--bg`, `--surface`, `--ink`, `--muted`, `--accent`, and `--line`.

### Primary

- **Emerald action:** primary actions, selected sports and billing, feature underlines, links, keyboard focus, and the emphasized hero line.
- **Bright emerald hover:** primary-button feedback.
- **On-accent ink:** readable dark lettering on emerald actions and selection.

### Neutral

- **Night ground:** continuous page and film fallback background.
- **Dark surface:** product proof, membership, billing contrast, and mobile navigation.
- **Warm primary text:** headings, selected feature labels, film controls, and main reading text.
- **Cool muted copy:** supporting paragraphs, unselected selectors, captions, and footer copy.
- **Quiet rule:** section separation and disclosure boundaries.
- **Media note:** short supporting notes over photographic fields.

**The Accent Has a Job Rule.** Use emerald for actions, selected states, focus, and deliberate display emphasis; keep reading surfaces dark and preserve natural photographic color.

## Typography

**Display Font:** Archivo Black, declared locally as `Archivo`, with `sans-serif` fallback.
**Body Font:** Work Sans variable, declared locally as `Work`, with `sans-serif` fallback.

Both families load local WOFF2 assets with `font-display: swap`. Archivo is declared at weight (400); Work supports (100–900). These are aliases for the licensed branded families, not replacement fonts. License files live under `assets/fonts/`.

The hierarchy moves from heavy uppercase display to medium-weight, sentence-case explanation. The display and headline roles are in the frontmatter. The product title uses the title role with a (13ch) maximum width. Body paragraphs generally use (16–18px), line heights (1.65–1.75), and widths around (41–45ch). Supporting product terms use (12px), while FAQ answers use (15px). Small captions and media notes are (11–12px). Price figures use tabular numerals.

At (650px) and below, the hero display becomes `clamp(40px, 10.8vw, 66px)` with line height (1.07); product titles become (34px) with a (15ch) limit. Closing display uses its own smaller scale: `clamp(40px, 5.5vw, 80px)` on desktop and `clamp(38px, 10.8vw, 60px)` on mobile. Section-specific size adjustments preserve hierarchy rather than forcing every heading to the hero scale.

**The Athletic Display Rule.** Reserve Archivo for the largest athletic statements; use Work for explanations, product evidence, navigation, and controls.

## Layout

The page uses native document scrolling. Hero and header share a fluid outer gutter; reading sections use the section gutter and a maximum width of (1600px). The product heading row caps at (1360px), while its proof area caps at (1100px). Explanatory, product, training, onboarding, membership, FAQ, and library areas use two-column desktop arrangements with section-specific ratios. Thin horizontal or vertical rules separate related content instead of enclosing each item in a card.

Major section padding is generally the section token, with the opening explanation and product using (112px) vertical padding and the product top using (80px). At (1000px) and below, spacing and column gaps tighten. At (650px) and below, content stacks, section padding follows the mobile tokens, and selectors wrap. The desktop navigation is replaced by a native disclosure menu at (900px) and below.

The hero is (96svh) tall with a (780px) minimum and (1080px) maximum. At (1000px) and below, it uses (92svh) and a (720px) minimum; at (650px) and below, it uses `calc(100svh - 12px)` with the same minimum and a (920px) maximum. These heights protect the headline, disclosure, action, and film controls. The header is positioned over the hero and does not remain sticky. The small-screen action and film control positions leave the headline unobstructed.

## Elevation & Depth

There is no box-shadow vocabulary in the current homepage. Real photography and video, near-black gradients, dark tonal fields, and restrained borders establish depth. Scrims protect copy over variable frames and merge photographic edges into the page ground. The real app screen has a simple rounded edge without a synthetic phone shell. The mobile menu is a bordered dark surface.

**The Photographic Depth Rule.** Let real footage, tonal sections, and protective scrims create depth. Keep ordinary interface surfaces flat.

## Shapes

Actions, media controls, and the mobile menu use softly squared control corners. Sport and billing selectors use the slightly tighter selector radius. Real app screenshots and their links use the screen radius. The unchanged logo retains its supplied pixels and its existing rounded display treatment. Inline SVG arrows, menu lines, and FAQ plus marks provide functional symbols; film controls use text only. Fine rules define the repeated section and disclosure structure.

## Components

### Buttons and links

Primary actions use emerald fill and dark text, with a minimum height of (54px). Their background changes over (0.2s) on hover; they do not lift or cast shadows. At the mobile breakpoint their padding becomes (15px 19px) and type becomes (14px). Text links use an emerald underline or ruled row; navigation acquisition links use a light bottom rule. Buttons and links receive an emerald (3px) focus outline with (6px) offset. Native disclosure summaries use a (5px) offset. Reduced motion removes transitions and smooth scrolling.

### Sport, feature, and billing selectors

Sport controls are wrapped, (44px) minimum-height buttons. Selected sports use emerald fill and dark text; unselected labels are muted, with an emerald border on hover. Feature controls remain flat and use a (2px) emerald bottom line with primary text for selection. Billing uses a dark inset group with emerald selected state. Each selector exposes `aria-pressed`; do not communicate selection through color alone. URL state and history restore selected sport, feature, and billing.

### Navigation and disclosures

Desktop navigation gives the primary page anchors, with the acquisition action beside it. The mobile menu uses native `details` and `summary`; Escape closes it and restores focus, while link activation and outside clicks close it. FAQ rows use the same native disclosure model, separated by rules; their inline SVG plus rotates (45deg) when expanded. All essential navigation and FAQ content remain useful without JavaScript.

### Film and still states

The hero and training film use muted, inline, looping time-based playback over a persistent poster, with no scroll seeking. The hero crossfade lasts (0.7s); the training film crossfade lasts (0.5s), both ease-out. Text-only controls name the next action: Play film, Pause film, or Retry film. Reduced motion removes video sources, hides video, and disables the control with a Reduced motion label. Save-data begins paused without fetching video and allows explicit manual play. Offscreen or hidden-document films pause; failures preserve the poster and offer retry. A pause chosen by the visitor persists through normal visibility changes.

### Real product evidence

Sport and feature selection update the real screenshot, explanatory copy, caption, full-size image link, film, and acquisition links together. Screens are shown at up to (320px) wide on desktop or (300px) on mobile, preserving aspect ratio and original UI. The full-size image opens in a new tab with an explicit accessible label. General identifies its example volleyball account honestly. No generic card or input-field library is present on this homepage.

### Membership and supporting rows

The offer separates its explanation and action from a ruled pricing column, which stacks on mobile. Prices use tabular numerals; billing state updates price and explanatory copy together. Numbered onboarding items are a real ordered sequence. Training-library links are full ruled rows with SVG arrows. Exact Preview and commercial terms remain in `PRODUCT.md` and the surface brief rather than becoming visual tokens.

## Do's and Don'ts

### Do:

- Do preserve the unchanged approved logo and real DoThis screenshots.
- Do keep selected sport, example-account caption, screenshot, film label, and all acquisition actions coherent.
- Do retain visible keyboard focus, native scrolling, text-only film state labels, and useful still and non-JavaScript states.
- Do distinguish a verified local build from publication approval and physical-device validation.

### Don't:

- Don't repaint app UI or present stock athletes as customers or endorsers.
- Don't label gym footage as volleyball or pickleball match footage.
- Don't restore the obsolete ivory system, Cormorant emphasis, or scroll-seeking film corridor to this selected homepage.
- Don't change the six acquisition routes or their verified custom product-page identifiers during visual work.
- Don't turn the aspirational headline into guaranteed performance, medical outcomes, fabricated metrics, or invented offer scarcity.
