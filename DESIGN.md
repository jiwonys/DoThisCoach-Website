---
name: "DoThis: Train For Your Game"
description: "A warm athlete field manual that connects the whole training week to real product evidence."
colors:
  paper: "#f2efe7"
  paper-bright: "#fbfaf5"
  ink: "#111915"
  ink-soft: "#536059"
  green: "#23745f"
  night: "#080d11"
  night-raised: "#12191d"
  night-text: "#f5f6f1"
  night-soft: "#aab8b1"
  line: "rgba(17, 25, 21, 0.2)"
  line-dark: "rgba(245, 246, 241, 0.18)"
  sport-accent-general: "#39c79d"
  sport-accent-soccer: "#54d39c"
  sport-accent-basketball: "#f4a23a"
  sport-accent-pickleball: "#c8ed4f"
  sport-accent-tennis: "#c7ef53"
  sport-accent-volleyball: "#48d7c3"
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(4rem, 6.6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(2.7rem, 5.4vw, 5.4rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 4.2rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-large:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  micro-label:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.05em"
  action:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 750
    lineHeight: 1.4
    letterSpacing: "normal"
  navigation:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 650
    lineHeight: 1.4
    letterSpacing: "normal"
  chip:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 650
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  square: "0px"
  icon: "12px"
  media-sm: "14px"
  media: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "28px"
  2xl: "40px"
  3xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper-bright}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "0.78rem 1.25rem"
    height: "50px"
  button-header:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-bright}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0.78rem 1.25rem"
    height: "50px"
  sport-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 0.9rem"
    height: "42px"
  sport-chip-selected:
    backgroundColor: "{colors.sport-accent-general}"
    textColor: "{colors.ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 0.9rem"
    height: "42px"
  evidence-board:
    backgroundColor: "{colors.night}"
    rounded: "{rounded.square}"
  native-screen:
    backgroundColor: "{colors.night}"
    rounded: "{rounded.media}"
---

# Design System: DoThis

## Overview

**Creative North Star: "Field Manual"**

DoThis is an athlete field manual: warm paper, blunt black editorial type, ruled evidence, and DoThis green give training guidance the authority of a working document rather than a generic fitness campaign. It treats the athlete's whole week as the subject and uses large approved sport boards and real simulator captures as evidence, never decoration.

The system alternates paper, green, and near-black chapters to control pacing without losing continuity. Monumental propositions create conviction; Work Sans carries explanatory detail at a calm reading density. Sport accent changes are synchronized with sport imagery, benefit copy, product proof, URL state, and App Store destination.

**Key Characteristics:**

- Warm field-manual paper and hairline rules.
- Monumental, tightly set editorial headlines.
- DoThis green as the durable brand signal; sport accents as state, not decoration.
- Full-height approved marketing boards and readable real product screens.
- Flat editorial structure with selective, heavy media depth.
- One coherent sport state across content, evidence, and action.

## Colors

Warm paper and deep ink form the editorial base; green marks brand authority, near-black creates immersive product chapters, and sport accents identify the selected acquisition state.

### Primary

- **DoThis Green:** Brand emphasis, primary hero action, the athlete-control chapter, and hover confirmation.
- **Sport Accent — General:** Default selected chip, evidence field, selection color, dark-surface focus, and closing action.
- **Sport Accent — Soccer:** Soccer state for the same synchronized accent roles.
- **Sport Accent — Basketball:** Basketball state for the same synchronized accent roles.
- **Sport Accent — Pickleball:** Pickleball state for the same synchronized accent roles.
- **Sport Accent — Tennis:** Tennis state for the same synchronized accent roles.
- **Sport Accent — Volleyball:** Volleyball state for the same synchronized accent roles.

### Neutral

- **Field Paper:** Default page ground and the warm header surface.
- **Bright Paper:** Raised paper sections, light text on dark actions, and small proof captions.
- **Editorial Ink:** Primary copy, rules, focus outlines, and dark actions.
- **Soft Ink:** Supporting copy and quiet metadata on paper.
- **Night:** Immersive product chapters, evidence-board backing, and closing panel.
- **Raised Night:** Subtle dark media backing inside product chapters.
- **Night Text:** Primary copy on Night.
- **Night Soft:** Supporting copy on Night.
- **Paper Rule / Night Rule:** Low-alpha dividers that structure content without creating card chrome.

### Named Rules

**The State-Is-System Rule.** A sport accent never changes alone; selected chip, evidence field, imagery, benefit, URL state, and App Store destination change together.

**The Green Has a Job Rule.** Use DoThis Green for brand authority and deliberate interaction feedback, not ambient decoration.

## Typography

**Display Font:** Archivo Black (with `sans-serif` fallback)
**Body Font:** Work Sans (with `sans-serif` fallback)

**Character:** Archivo Black supplies compressed, uncompromising editorial scale. Work Sans keeps instructions, evidence notes, navigation, and product explanation direct and readable.

### Hierarchy

- **Display:** Archivo Black at weight 400, fluid hero scale, line-height 0.9, and letter-spacing -0.04em. Reserve for the first proposition.
- **Headline:** Archivo Black at weight 400, fluid section scale, line-height 0.96, and letter-spacing -0.04em. Use for major chapter openings.
- **Title:** Work Sans at weight 700, fluid chapter scale, line-height 0.98, and letter-spacing -0.04em. Use for product chapter statements.
- **Body:** Work Sans at weight 400, 1rem, and line-height 1.6. Supporting copy usually stays between 43ch and 66ch.
- **Body Large:** Work Sans at fluid 1.05rem–1.2rem and line-height 1.55. Use for hero and section introductions.
- **Label:** Work Sans at weight 700, 0.8rem, and line-height 1.4 for picker headings and guide labels.
- **Micro Label:** Work Sans at weight 700, 0.75rem, line-height 1.4, and letter-spacing 0.05em. Use uppercase for compact evidence labels.
- **Action:** Work Sans at weight 750, 0.84rem, and line-height 1.4 for conversion actions.
- **Navigation:** Work Sans at weight 650, 0.82rem, and line-height 1.4 for desktop navigation.
- **Chip:** Work Sans at weight 650, 0.76rem, and line-height 1.4 for sport choices.

### Named Rules

**The Two-Voice Rule.** Archivo Black makes propositions; Work Sans explains, labels, and enables action.

**The Short-Measure Rule.** Large statements stay deliberately narrow, generally 9ch–15ch, while explanatory copy stays readable at 43ch–66ch.

## Layout

The system uses a centered content ceiling of 1380px with 24px desktop gutters. Hero and chapter compositions are asymmetric two-column spreads: copy occupies the smaller editorial column while approved boards or product evidence receive the larger visual column. Major vertical chapters use fluid 90px–160px padding, and section gaps scale with viewport width rather than collapsing into dense card stacks.

At 1080px, navigation becomes a menu and evidence proportions tighten; the hero remains split. At 820px, primary layouts become one column, product chapters stack, and three-column evidence lines collapse. At 620px, page gutters become 16px, hero actions become full-width, the sport selector becomes a horizontal snap scroller, major vertical padding becomes 78px, and paired boards retain their editorial overlap at reduced scale. Minimum supported viewport width is 320px.

Hairline rules establish sequence and grouping. Repeated spacing centers on 8px, 12px, 16px, 24px, 28px, 40px, and 48px; larger chapter spacing is fluid and content-led.

### Named Rules

**The Evidence Gets Half Rule.** On wide screens, product evidence must remain large enough to read and may not be reduced to a decorative phone thumbnail.

**The Stack Without Shrinking Rule.** Responsive layouts stack narrative and evidence before either becomes illegible.

## Elevation & Depth

The editorial layer is flat and ruled. Depth is reserved for approved boards, native screenshots, and the temporary mobile navigation surface. Media shadows are structural: they lift verifiable product evidence from paper or Night, while colored fields, tonal chapter changes, overlap, and hairline frames provide the rest of the hierarchy.

### Shadow Vocabulary

- **Menu Lift:** `0 22px 50px rgba(17, 25, 21, 0.16)` for the opened compact navigation.
- **Evidence Lift:** `0 24px 52px rgba(17, 25, 21, 0.18)` for approved sport boards.
- **Paper Media Lift:** `0 30px 70px rgba(17, 25, 21, 0.3)` for native screens on the green week field.
- **Paired Night Lift:** `0 30px 70px rgba(0, 0, 0, 0.42)` for paired screens on Night.
- **Night Media Lift:** `0 36px 90px rgba(0, 0, 0, 0.45)` for a primary product screen on Night.

### Named Rules

**The Evidence-Only Lift Rule.** Persistent shadows belong to product or campaign evidence; ordinary content remains flat and separated by rules or tonal fields.

## Shapes

The dominant form is rectangular and editorial. Primary actions, evidence boards, chapter fields, lists, and section rules stay square. Fully rounded pills are reserved for the compact header action, sport choices, and circular mobile menu control. Approved icon artwork receives a 12px corner; native product screens use 16px corners, with 14px on tighter paired screens.

Clipping is purposeful: screenshot containers hide overflow to preserve the device-board silhouette, while the first product screen may offset vertically to create an evidence spread rather than a uniform grid.

### Named Rules

**The Pills Are Controls Rule.** Pill geometry identifies compact choices and actions; it does not turn content sections into floating cards.

## Components

### Buttons

- **Shape:** Main and closing actions are square; the compact header action is a full pill.
- **Primary:** DoThis Green with Bright Paper text, a 50px minimum height, and 0.78rem 1.25rem padding.
- **Hover / Focus:** Hover lifts 2px over 180ms with the expressive easing curve and shifts to DoThis Green where needed. Focus uses a 3px outline with 4px offset; dark surfaces switch the outline to the active sport accent.
- **Compact Header:** Editorial Ink with Bright Paper text, the same size and padding, and pill geometry.
- **Text Action:** No fill; 50px minimum height, weight 700, and native underline behavior where present.

### Chips

- **Style:** Transparent paper control with Editorial Ink text, a low-alpha Ink border, 42px minimum height, and full-pill geometry.
- **State:** Selected state fills with the active sport accent and strengthens the border to Editorial Ink. Unselected hover strengthens only the border. Arrow keys, Home, and End move the single roving tab stop.

### Cards / Containers

- **Evidence Boards:** Square Night-backed frames with no inner padding and Evidence Lift.
- **Native Screens:** Night or Raised Night media frames with 16px corners and structural media shadows; paired variants use 14px corners.
- **Content Sections:** Avoid card containers. Use chapter fields, open grids, and hairline rules.

### Navigation

Desktop navigation is centered in the ruled sticky header. Links use Soft Ink, 0.82rem text, weight 650, and a directional 1px underline that grows leftward on hover or focus. At 1080px and below, links move into a Bright Paper menu with 16px corners and Menu Lift. The menu button is a 44px circular outlined control; its two bars rotate into a close mark over 180ms.

### FAQ Disclosure

FAQ rows are border-separated, not carded. Each summary has an 88px minimum height, weight 700, and a right-aligned plus that rotates 45 degrees over 180ms when open. At 620px, row height reduces to 76px.

### Sport Evidence Spread

Two full-height approved boards share an asymmetric colored field with explicit Athlete and Product labels. The athlete board starts lower; the product board ends higher. Sport changes use the View Transition API: the old root fades for 140ms, then the new root reveals over 320ms with the expressive easing curve and a short bottom clip. Reduced-motion mode removes this animation.

## Do's and Don'ts

### Do:

- **Do** keep warm paper, Editorial Ink, DoThis Green, ruled evidence, and approved full-height boards as one coherent Field Manual world.
- **Do** use real simulator captures and approved marketing boards at readable scale.
- **Do** keep all sport-linked imagery, copy, product proof, accent, URL state, and App Store destination synchronized.
- **Do** preserve 44px touch targets, visible 3px focus outlines, horizontal selector access, and reduced-motion behavior.
- **Do** use open grids, chapter fields, tonal shifts, and rules before introducing a new container.

### Don't:

- **Don't** use a generic fitness hero, interchangeable gym imagery, or app screenshots as tiny decorative props.
- **Don't** fabricate, repaint, crop away, or visually modify approved app UI and marketing boards.
- **Don't** scatter sport accent colors as ambient decoration or mix multiple sport states in one view.
- **Don't** round every surface into a card; pills are reserved for controls, and content stays editorial.
- **Don't** add testimonials, performance metrics, medical outcomes, install claims, or product capabilities without verified evidence.
