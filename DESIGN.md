---
name: DoThis — Photographic sports editorial
description: The implemented September 18 photographic homepage, recorded from source and reviewed captures.
colors:
  accent: "#b63226"
  ink: "#191c1a"
  paper: "#f8f8f5"
  surface: "#e9ece7"
  muted: "#575e58"
  line: "#c9cec8"
  ink-hover: "#343c35"
typography:
  display:
    fontFamily: "Barlow, sans-serif"
    fontSize: "clamp(74px, 8.25vw, 96px)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Barlow, sans-serif"
    fontSize: "clamp(50px, 6vw, 86px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Work, Arial, sans-serif"
    fontSize: "clamp(24px, 2.5vw, 34px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Work, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  action:
    fontFamily: "Work, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
  control:
    fontFamily: "Work, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 550
  supporting:
    fontFamily: "Work, Arial, sans-serif"
    fontSize: "12px"
    lineHeight: 1.7
rounded:
  control: "3px"
  sport: "2px"
  screen: "12px"
  sequence: "50%"
spacing:
  gutter: "clamp(22px, 4.5vw, 76px)"
  section: "120px"
  section-compact: "85px"
  section-mobile: "70px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "16px 22px"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
  button-inverse:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "16px 22px"
  sport-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.control}"
    rounded: "{rounded.sport}"
    padding: "9px 13px"
  feature-selected:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "10px 0"
  billing-selected:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "10px 0"
---

# Design System: DoThis

## Overview

**Creative North Star: "The photographic sports editorial"**

DoThis addresses adult recreational athletes with direct encouragement, condensed sporting headlines, real photography, and genuine app evidence. Chalk reading space and charcoal ink carry most of the page; restrained court red emphasizes key words and selected controls. Open columns and ruled rows keep product explanation and purchase decisions clear.

This records the final September 18 homepage after the user rejected the acid/blue palette and all 3D equipment. It replaces the obsolete Film first / Match Night system and the superseded equipment proposal. The build was code-led under delegated creative authority, without an approved raster composition. PRODUCT.md owns product truth and publication authority; docs/design/you-can-too/DIRECTION.md owns the surface brief. Existing library, comparison, partner, support, and legal pages were not redesigned.

**Key Characteristics:**

- Chalk and charcoal, restrained red emphasis, and a pale gray-green product chapter.
- Heavy Barlow Condensed statements with conversational Work Sans reading text.
- Real sporting photographs and unchanged app screenshots without a device shell.
- An attached action/disclosure group and sport controls beside their changing result.

## Colors

The frontmatter is the normative reusable palette. Root CSS uses the same names, except that ink-hover is a literal button state.

### Primary

- **Court red:** deliberate heading emphasis, selected feature and billing underlines, link hover, and focus on light surfaces.

### Neutral

- **Charcoal ink:** primary text, filled buttons, selected sports, and the closing background.
- **Chalk paper:** reading ground, button text, and inverse closing actions.
- **Pale gray-green surface:** the product demonstration chapter.
- **Muted slate:** supporting copy, inactive features, captions, and terms.
- **Quiet rule:** separators and unselected sport borders.
- **Ink hover:** background feedback on the standard primary button.

The founder section has a local pale neutral field (#eceee8). The logo, genuine app screens, and hero photography retain their own colors; they do not expand the UI palette. The training photograph uses `grayscale(1)` and a neutral `linear-gradient(transparent 30%, #191c1acc)` scrim.

**The Restrained Accent Rule.** Use court red for emphasis and interaction; keep large interface fields neutral.

## Typography

**Display Font:** Barlow Condensed ExtraBold, self-hosted as `Barlow`, weight (800), with `sans-serif` fallback.

**Body Font:** Work Sans variable, self-hosted as `Work`, weights (100–900), with `Arial, sans-serif` fallback. Both fonts use `font-display: swap`.

The hierarchy is purpose-built rather than a single ratio. The frontmatter records recurring roles; section adjustments remain contextual.

- **Display:** the hero follows the display token, becomes (88px) below (1100px), (74px) below (800px), and `clamp(68px, 19.2vw, 96px)` below (650px). At (600px) and below its line height becomes (0.91). The red final word is inline, allowing a two-line invitation.
- **Headlines:** ordinary sections use the headline role. Recognition uses `clamp(60px, 7vw, 96px)`, product uses `clamp(58px, 7vw, 96px)`, and closing uses `clamp(72px, 10vw, 96px)`. Below (650px), these become (56px), (67px), (70px), and (90px), respectively. Product and closing use line height (0.93) on mobile.
- **Titles:** Work subheads follow the title role. Product explanation uses `clamp(30px, 3vw, 42px)` at line height (1.15), becoming (32px) on mobile. The demo introduction is (28px), with an intermediate (24px) adjustment. Its changing result is (22px), with an intermediate (20px) adjustment.
- **Reading:** main copy generally uses (15–16px), line height (1.65–1.75), and widths around (410–475px). Narrow layouts use (14px). Large editorial lead paragraphs use (24–37px), line height (1.3).
- **Controls:** buttons use the action role; navigation and selectors use (12–13px). Selected controls gain weight or an underline as well as color. Prices use Barlow at (80px), with an intermediate (72px) adjustment and tabular numerals.
- **Supporting text:** product captions, notes, and offer terms use (12px). Hero disclosure uses (12px), becoming (11px) below (800px). Existing credits and footer fine print use smaller contextual sizes; these are not a minimum reading-size recommendation.

**The Athletic Display Rule.** Reserve condensed uppercase for major statements and prices; use Work Sans for decisions and sustained reading.

## Layout

The wrapper caps at (1560px), including its fluid gutter. Most desktop sections pair open columns with gaps around (7–9vw). Training and membership use the section spacing token, tightening below (1000px) and stacking below (650px). Other section paddings remain local to their content. The header stays in document flow, with desktop navigation replaced by a native disclosure below (800px).

The final hero has a (690px) minimum height and (45px) column gap. Photography occupies a (570px) region, stepping to (500px), (475px), and (390px) below (1100px), (800px), and (650px). The hero stacks below (650px), keeping copy, the attached action/disclosure, and the separate secondary link before photography. The first-view action does not depend on animation or media playback.

The product demonstration is at most (550px) wide; its screen is at most (340px), becoming (310px) below (650px). Sport buttons sit directly above the changing sport heading, feature controls, and screenshot. On mobile the demo precedes the changing supporting copy through a reversed column layout, so selection does not shift the controls. Training copy precedes its photograph on mobile. Membership's vertical divider becomes a top rule, and three library links become a vertical list.

## Elevation & Depth

Real photography supplies depth. The hero uses overlapping rectangular crops separated by a paper border; ordinary interface surfaces are flat. The mobile menu alone uses the reusable ambient shadow (`0 12px 28px #191c1a15`). The training photo's neutral scrim protects its caption. There is no 3D scene, renderer, canvas, film playback, fake phone shell, or card-elevation system.

**The Real Evidence Rule.** Use licensed human-shot photography and genuine app pixels; keep ordinary interface surfaces flat.

## Shapes

Actions have softly squared control corners; sport selectors have the tighter sport radius. Screens use the screen radius without a device frame. Ordered step markers are circular. The approved icon keeps its unchanged artwork and existing (9px) display radius. Fine rules organize sections and controls. Functional symbols use SVG strokes or the existing CSS check mark, not glyph substitutes.

## Components

### 1. Actions with disclosure

Primary actions use charcoal with chalk text, at least (56px) high, with (24px) internal gap. Below (600px), they use (54px) minimum height, (15px 18px) padding, (13px) type, and (20px) gap. The hero disclosure belongs inside the action group, (10px) below the button; its secondary link remains separate. Standard hover changes background over (0.18s). The closing action is inverse. Keyboard focus is a (3px) court-red outline with (6px) offset, switching to chalk in the dark closing.

### 2. Sport and feature controls

Sport buttons are bordered, wrapped, at least (42px) high, and use the sport radius. Selected sports use charcoal fill and chalk text. Selection chooses the workout feature and updates the adjacent sport heading, context, genuine screen, and acquisition route without scrolling. Five feature controls use a (2px) red selected underline; their targets are at least (44px) high. All selections expose `aria-pressed`; query state and browser history restore sport, feature, and billing. Nonfunctional selector groups stay hidden without JavaScript.

### 3. Genuine screenshot demonstration

Coach is the default feature and uses the supplied active-recovery conversation at its original (1290 × 2796) aspect ratio. It keeps the same truthful caption for every sport. Other features use actual sport-account examples; All sports identifies its volleyball example. The full-size link, alt text, caption, loading state, and retry message remain coherent. Keep the exact six acquisition routes and their existing redirect identifiers: `/app/`, `/app/tennis/`, `/app/basketball/`, `/app/volleyball/`, `/app/soccer/`, and `/app/pickleball/`.

### 4. Photographic composition

The hero pairs a large tennis photograph and a smaller overlapping basketball crop, with a credit link and no invented subject endorsement. The training still is grayscale with a neutral caption scrim. Preserve source provenance and credit destinations. No generated people, 3D equipment, or Blender assets belong to this revision.

### 5. Navigation

The approved logo, three page anchors, and acquisition link share a ruled header. Desktop links use Work at (13px), weight (550), with underline hover. The mobile menu is a paper panel (240px) wide with (22px) padding and a thin ink border. Native `details` and `summary` remain usable without JavaScript; Escape closes the menu and restores summary focus, while link activation and outside click close it.

### 6. Membership and billing

An open explanation column faces a ruled offer column, with (40px) left padding, then (25px) below (1000px), then none after stacking. Monthly/yearly controls update price and explanation together and use a red selected underline. Preserve the one-time 7-day Preview, no payment or automatic charge, retained local records, and the paid AI/cloud distinction. Founder prices, standard prices, and availability language remain grounded in PRODUCT.md and the in-app purchase flow.

### 7. Disclosures and supporting rows

FAQ uses native disclosure, fine rules, and an SVG plus rotating (45deg) when open. Summary padding is (24px) vertically, becoming (21px) on mobile; answers use readable Work text. Training and library links are open ruled rows with SVG arrows. Keep native scrolling, real destinations, visible focus, and reduced-motion behavior. The homepage has no input-field or generic card library to standardize.

## Do's and Don'ts

### Do:

- Do preserve the approved logo, genuine screenshots, accurate captions, and photo credits.
- Do keep each sport control beside its visibly changing result and preserve all six acquisition destinations.
- Do keep the Preview disclosure attached to its primary action.
- Do retain native scrolling, keyboard focus, reduced-motion support, and useful non-JavaScript content.
- Do keep commercial claims grounded in PRODUCT.md and the actual purchase flow.

### Don't:

- Don't restore the rejected acid/blue palette, 3D equipment, dark-film system, or Archivo display type.
- Don't generate people, repaint app UI, invent customers or outcomes, or use Blender for this redesign.
- Don't move the page when a visitor selects a sport.
- Don't treat the existing library, legal, support, comparison, or partner destinations as redesigned by this record.

Not canonized: overridden legacy CSS values and class names, unused photo-caption selectors, isolated fine-print sizes, and one-off crop offsets. They are implementation remnants or contextual details, not new reusable tokens. The former 83 detector findings compared an earlier build with an obsolete system; this replacement records the final photographic implementation and does not claim a fresh detector run.
