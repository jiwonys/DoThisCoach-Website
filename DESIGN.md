---
name: "DoThis: Train For Your Game"
description: "The approved Own the Court production homepage."
colors:
  forest-night: "#0c1210"
  chalk: "#f4f5eb"
  quiet: "#afbbb2"
  lime: "#b6f477"
  rule: "#ffffff24"
  action-ink: "#162311"
  action-hover: "#d7ffa9"
  closing-field: "#142219"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(64px, 7.4vw, 112px)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(36px, 4.5vw, 68px)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Work, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  action:
    fontFamily: "Work, sans-serif"
    fontSize: "14px"
    fontWeight: 750
    lineHeight: 1.5
rounded:
  action: "6px"
  icon: "10px"
  pill: "30px"
spacing:
  choice-gap: "8px"
  navigation-gap: "24px"
  gutter: "clamp(22px, 5vw, 84px)"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.action-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "17px 25px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.action-ink}"
  sport-option:
    backgroundColor: "transparent"
    textColor: "{colors.quiet}"
    rounded: "{rounded.pill}"
    padding: "11px 17px"
  sport-option-selected:
    backgroundColor: "#b6f47712"
    textColor: "{colors.lime}"
    rounded: "{rounded.pill}"
    padding: "11px 17px"
---

# Design System: DoThis Own the Court

## Overview

**Creative North Star: "Own the Court"**

Own the Court pairs a compact, dark editorial page with a tactile miniature sports court. Dense Archivo Black commands, quiet Work Sans copy, and a constant lime accent connect the athlete’s competitive ambition to training around their confirmed week.

This system describes the approved production homepage in `index.html`, `home.css`, and `home.js`. Other website destinations retain their existing designs. The court is illustrative brand scenery; it is not a product screenshot.

**Key Characteristics:**

- Forest-black surfaces, warm chalk text, and a stable lime action color.
- A sport-specific miniature court with two original flame logos embedded flat in the playing surface.
- Compact copy, open sections, quiet rules, and a seven-day illustrative training week.

## Colors

Lime owns headline emphasis, primary actions, selected controls, focus, and the illustrative game day. Forest Night, Chalk, Quiet, and Rule provide the neutral hierarchy; Closing Field separates the final offer. Court materials change with the sport while the interface accent stays constant.

**The Stable Accent Rule.** Change the playing surface and equipment for each sport; keep the interface lime.

## Typography

Local Archivo Black is registered as `Archivo`; local Work Sans is registered as `Work`. The hero uses uppercase, deliberate three-line command type; the method uses sentence case. Body copy stays within roughly (35–42ch). Controls use (11–14px) Work, with captions at (9–12px). At (760px) and below, hero type becomes `clamp(60px, 17vw, 82px)` and body copy becomes (14px).

## Layout

The offer strip precedes an in-flow header. The hero uses a (1fr / 1.08fr) grid, a (1800px) maximum width, and a (650px) minimum height; above (1600px), its minimum becomes (760px). The court stage has a (620px) minimum height. A ruled sport selector leads into a two-column method, closing offer, and footer.

At (1150px) and below, the native details menu replaces desktop links. At (1050px), the hero columns equalize and the secondary sport detail hides. At (760px), copy precedes a (400px) court stage, sport choices form a three-column grid, and method, offer, and footer stack. Gutters retain the documented clamp. At (420px), the menu keeps its icon and accessible label while hiding the visible word.

## Elevation & Depth

Depth belongs to the lit miniature court: physical boundary slab, matte sport surfaces, equipment, soft cast shadows, and a restrained green radial backdrop. Two shallow original flame inlays lie flat below the markings and receive scene shadows. The ordinary page remains flat; the expanded mobile menu uses `0 24px 32px #0006`.

Pointer movement produces a small eased court tilt, and Reset view recenters it. Rendering settles when movement finishes and pauses offscreen. Reduced motion disables pointer tilt, CSS transitions, and smooth scrolling. A static approved flame remains available when WebGL or court assets fail.

## Shapes

Primary actions have gently squared corners; sport choices, the outline header action, and Reset view use pill corners. The approved header icon retains its own compact rounding. Thin rules divide open sections; the illustrative week uses seven short top rules rather than boxed cards.

## Components

Primary actions have a (52px) minimum height and lift (-2px) over (200ms) on hover. The secondary method link is underlined. All interactive elements receive a (3px) lime focus outline with (5px) offset. Sport buttons have a (44px) minimum height, native keyboard activation, and `aria-pressed` state; all remain reachable by Tab.

The native details menu retains Method, Inside, Sports, Training library, Compare, Pricing, Partners, Support, Privacy, and Terms. Escape closes it and returns focus to its summary; selection and outside clicks close it. Footer links preserve supporting destinations. The seven-day schedule is explicitly illustrative.

Sport selection synchronizes the court, two descriptive lines, `?sport=`, pressed state, and three App Store actions. Invalid values fall back to General, and browser history restores selection. General and Basketball share the basketball scene; the other sports use distinct markings and equipment. See the surface brief for exact routes and court distinctions.

## Do's and Don'ts

- Do keep the approved court composition and both original flame logos intact.
- Do synchronize all six sport choices with court geometry, copy, URL, pressed state, and all three acquisition links.
- Do preserve original navigation destinations, legacy fragments, visible focus, and the logo fallback.
- Don't introduce a floating phone, fabricated app screen, or replacement logo into this homepage.
- Don't describe the illustrative training week as an actual user plan or measured outcome.
- Don't collapse the six acquisition routes into one generic App Store destination.
