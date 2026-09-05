---
name: "DoThis — Train Around Your Game"
description: "User-supplied teal-and-amber homepage, adopted 2026-09-05."
colors:
  court: "#0D3B3E"
  court-deep: "#07272A"
  line: "#F2EEE3"
  line-dim: "rgba(242,238,227,.72)"
  line-faint: "rgba(242,238,227,.16)"
  amber: "#FFB43A"
  zone: "#E8622C"
  mint: "#8FD8C6"
typography:
  display:
    fontFamily: "Anton, sans-serif"
    fontWeight: 400
    fontSize: "clamp(56px, 9.5vw, 128px)"
    lineHeight: 0.95
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "17px"
    lineHeight: 1.6
  label:
    fontFamily: "Chivo Mono, monospace"
    fontSize: "12px"
rounded:
  panel: "14px"
  day: "10px"
  action: "999px"
spacing:
  gutter: "24px"
  section: "96px"
---

# Design System: DoThis Teal Court

## Overview

The authoritative design, content, and palette come from the user's supplied `/Users/jiwonkim/Downloads/dothis-website.html`. The user explicitly requested adopting that page and pushing the website. It replaces the earlier miniature 3D-court homepage; the previous `home.css` and `home.js` are no longer loaded.

## Colors

Deep indoor-court teal surrounds cream content. Amber carries primary actions and headline emphasis. Orange identifies game day; mint identifies primer and recovery. Secondary text opacity is raised from the supplied .55 to .72 for contrast. Main palette colors remain exactly supplied.

## Typography

Anton supplies condensed uppercase headlines. Archivo supplies body text, and Chivo Mono supplies tracked labels and controls. Retain the supplied Google Fonts families and typography. Do not substitute the previous Archivo Black court type system.

## Layout

A sticky navigation bar and current founder offer precede the hero and interactive weekly planner. Subsequent sections follow the supplied order: problem comparison, features, Coach conversation, honest progression, reviews, pricing, and founder/footer copy. Content is capped at 1120px with 24px gutters.

The seven-day planner scrolls horizontally on narrower screens; its overflow stays within the panel. Feature, comparison, review, and price grids stack at the supplied breakpoints. A compact native Menu exposes the existing website destinations on mobile.

## Elevation & Depth

The weekly planner has a soft downward shadow. Thin painted-court lines sit behind the hero. Preserve the supplied restrained section surfaces and scroll reveals. No Three.js script, floating phone, or previous court scene runs on this homepage.

## Shapes

Pill actions contrast with 14px panels, 10px planner days, and rounded chat bubbles. Preserve the supplied border weights and geometry.

## Components

The planner starts with Thursday selected. Selecting another day updates the seven-day example, pressed state, and explanation. Focus remains on the replacement selected button. The planner is explicitly labeled illustrative.

The active Founding 200 offer remains $6.99 per month or $69.99 per year for the first 200 users, with standard prices stated in the pricing cards. All accounts receive the existing free seven-day Preview. No remaining-spots counter is invented.

Existing Training Library, Compare, Partners, Support, Privacy, and Terms paths remain available. App Store actions use the six existing fixed sport routes according to an allowlisted campaign query. The supplied invalid privacy URL points to the existing privacy page instead.

## Do's and Don'ts

- Preserve the supplied design, section order, content, and core palette.
- Keep readability and keyboard fixes narrow and visually consistent.
- Label the interactive planner as an illustration, not a live app-generated plan.
- Do not merge other experimental homepage designs into this release.
- Do not publish unrelated work from another task's checkout.
