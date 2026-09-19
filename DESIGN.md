---
name: DoThis — Reference-led black and green
description: The built homepage system, grounded in the user's MyFitnessPal reference.
colors:
  bg: "#090e0c"
  panel: "#14221b"
  text: "#f5f8f6"
  muted: "#b0beb6"
  green: "#18cf91"
  ink: "#071b12"
  line: "#30443a"
typography:
  display:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "clamp(52px, 5.2vw, 74px)"
    fontWeight: 700
    lineHeight: 1.09
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "36px"
    fontWeight: 650
    lineHeight: 1.18
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  pill: "999px"
  panel: "16px"
spacing:
  small: "16px"
  standard: "24px"
  large: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "14px 30px"
  button-green:
    backgroundColor: "{colors.green}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 30px"
  feature-panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
    padding: "32px 32px 24px"
---

# Design System: DoThis

## Overview

**Creative North Star: "Reference-led black and green"**

DoThis pairs a centered green opening with near-black content and genuine app evidence. Heavy Work Sans, short explanations, and pill actions give the page a direct, approachable character.

This records index.html, src/home.css, home.js, and the reviewed reference captures. The user-selected MyFitnessPal reference and docs/design/reference/DIRECTION.md supersede the rejected sparse layout. MyFitnessPal's wide desktop uses a left-aligned pitch beside photography; DoThis intentionally centers its desktop opening because the user prohibited decorative pictures. There is no random seed or approved visual comp. The finish review records a ship disposition. Other site destinations are outside this homepage record.

**Key Characteristics:**

- A solid green opening and dark phrase highlight.
- Black content with two genuine screenshot feature panels.
- Pill actions, concise pricing, three native FAQ disclosures, and a quiet footer.

## Colors

### Primary

Logo-family green fills the opening and pricing action, and marks interaction states on dark surfaces. Dark ink supplies opening text, the headline highlight, and the first action.

### Neutral

Near-black is the content ground; panel green separates product evidence. Off-white carries headings and emphasized text; muted green-neutral carries supporting copy. Quiet rules divide FAQ rows and the footer.

**The Green Opening Rule.** Use the solid green field for the opening, then dark surfaces for product evidence and supporting content.

## Typography

Work Sans is self-hosted with `font-display: swap` and a sans-serif fallback. The frontmatter records the main hierarchy. Feature titles use (25px), weight (600), and line height (1.25). At the mobile breakpoint, display type becomes (47px), section headings (30px), and feature titles (23px). Introductory copy changes from (18px) to (16px).

**The Plain Type Rule.** Use Work Sans throughout; express hierarchy through size, weight, and spacing.

## Layout

The centered wrapper caps at (1120px), with (32px) side gutters. Gutters become (24px) at (850px) and below, then (20px) at (600px) and below. The opening centers the proposition, explanation, action, and adjacent Preview disclosure.

Two equal feature columns use a (24px) gap; they stack with a (20px) gap on mobile. Screens remain proportional, capped at (264px) wide on desktop and (260px) on mobile. Pricing and questions use separate two-column layouts that also stack on mobile. Sections use (56px–64px) vertical padding on desktop and (40px) on mobile. Footer links wrap; footer groups stack as space narrows.

## Elevation & Depth

The website has no shadows or gradients. Solid fields, tonal panels, and fine rules provide structure. Screenshots retain their original internal appearance. There is no animated sequence; the button's immediate pressed offset is disabled for reduced motion.

**The Flat Surface Rule.** Separate content with solid color, space, and fine rules.

## Shapes

Actions are pills. Feature panels and screenshots share rounded corners. The highlighted headline phrase uses a smaller rounded rectangle. Action arrows are inline SVG; FAQ plus/minus marks are CSS strokes.

## Components

### Actions and navigation

The opening action uses dark ink; pricing reverses to green. Both use (56px) minimum height, becoming (54px) on mobile. Hover changes the fill immediately; active presses move (1px). Links and summaries receive a (3px) focus outline with a (5px) offset, dark in the opening and green elsewhere. Preview disclosure stays beneath the opening action. Header and footer navigation use real links with (44px) minimum targets. Both acquisition actions retain general and sport-specific routing.

### Genuine product panels

Two rounded panels pair short explanations with Athlete Week and Coach screens. Screens remain uncropped and link to full-size originals with accessible new-tab labels. Athlete Week is explicitly identified as an example volleyball account. Screenshot-internal colors and controls are not website primitives.

### Native disclosures

Pricing terms and three FAQ entries use native `details` and `summary`, with useful content available without JavaScript. FAQ rows use a bottom rule and green plus/minus indicator; hover uses green and keyboard focus remains visible. Pricing retains its native disclosure marker.

## Do's and Don'ts

### Do:

- Do preserve the logo, genuine app screens, meaningful captions, and full-size links.
- Do keep the Preview disclosure adjacent to the opening action.
- Do retain visible focus, native disclosures, and responsive reading order.
- Do keep product and purchase claims consistent with PRODUCT.md.

### Don't:

- Don't add decorative pictures, generated imagery, 3D assets, or ornamental motion.
- Don't copy the reference's branding, photography, claims, or testimonials.
- Don't restore the rejected sparse layout or treat this adaptation as a pixel-identical desktop copy.

Not canonized: screenshot internals and isolated composition values are evidence and local layout, not reusable website tokens. The finish review identifies no material craft defect in the supplied build.
