---
name: DoThis — Simple black and green
description: The finished simplified homepage, recorded from source and reviewed captures.
colors:
  bg: "#0b100e"
  text: "#f4f7f5"
  muted: "#a5b4ab"
  green: "#25d78a"
  line: "#28372f"
  green-hover: "#55e5a4"
  green-active: "#17bd76"
typography:
  display:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "clamp(48px, 5.1vw, 72px)"
    fontWeight: 650
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  supporting:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  action: "8px"
  screen: "16px"
spacing:
  small: "8px"
  supporting: "12px"
  standard: "24px"
  large: "32px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.bg}"
    rounded: "{rounded.action}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.green-hover}"
  button-primary-active:
    backgroundColor: "{colors.green-active}"
  disclosure:
    textColor: "{colors.muted}"
    typography: "{typography.supporting}"
---

# Design System: DoThis

## Overview

**Creative North Star: "Simple black and green"**

DoThis uses a near-black field, logo-family green emphasis, and plain Work Sans typography. Short copy, open space, and genuine product evidence make the homepage easy to understand.

This records index.html, src/home.css, home.js, and the reviewed 390px and 1440px captures. The user's latest correction in docs/design/simple/DIRECTION.md supersedes the rejected photographic editorial direction. There is no approved comp. Other site destinations are outside this homepage record.

**Key Characteristics:**

- One green accent on a near-black ground.
- One font family and a clear reading hierarchy.
- The unchanged logo and Coach screen as the only imagery.
- Compact pricing, native disclosure, and no animation.

## Colors

The frontmatter records the five root palette properties and the two literal button-state colors.

### Primary

- **Logo-family green:** headline emphasis, the primary action, benefit markers, link hover, selection, and focus.
- **Green hover and active:** immediate action feedback.

### Neutral

- **Near-black ground:** the page and action text.
- **Off-white text:** headings and emphasized prices.
- **Muted green-neutral:** reading text, navigation, disclosure, captions, and footer.
- **Quiet rule:** pricing and footer separators.

**The Green Emphasis Rule.** Use green for emphasis and interaction; keep the page ground neutral.

## Typography

**Display and Body Font:** Work Sans variable, self-hosted with `font-display: swap` and `sans-serif` fallback.

The frontmatter records the main roles. The hero becomes (52px) at (650px) and below. The pricing title becomes (20px). Introductory copy uses (18px), line height (1.65), and a (440px) maximum width; it becomes (16px) at (900px) and below, then (17px) with a (380px) maximum at (650px) and below. Action text is (16px), weight (650). Benefits and header links are (14px); captions and footer are (12px).

**The Plain Type Rule.** Use Work Sans for every website text role; express hierarchy through size, weight, and spacing.

## Layout

The centered wrapper caps at (1080px), with (40px) side gutters. Gutters become (24px) at (900px) and below and (20px) at (650px) and below.

Desktop pairs the pitch with a (310px) screenshot column and a (96px) gap. At (900px) and below these become (270px) and (40px). At (650px) and below, content stacks in reading order: pitch, action and disclosure, benefits, then screenshot. The mobile screenshot is centered and capped at (290px); the action fills the copy width.

The header remains in document flow, with a (100px) minimum height, becoming (84px) on mobile. Hero padding is (40px) above and (64px) below; at (1600px) and above it becomes (64px) and (80px). Mobile uses (28px) above and (32px) below. Compact pricing and footer follow fine rules. Footer content stacks at (900px) and below, with naturally wrapping links.

## Elevation & Depth

There are no website shadows, gradients, overlays, or animated layers. Space and (1px) rules separate content. The genuine screenshot retains its own internal depth.

**The Flat Surface Rule.** Keep website surfaces flat. Use space and fine rules to separate content.

## Shapes

The primary action uses the action radius; the screenshot and its link share the screen radius. Benefit markers are small CSS circles. The unchanged logo retains its artwork. The action arrow is inline SVG; subscription terms use the native disclosure marker.

## Components

### Download action and disclosure

One green action uses near-black text, a (56px) minimum height, and a (24px) internal gap. Hover and active fill changes are immediate. The preview disclosure sits (10px) below it. Links and summaries use a (2px) green focus outline with a (6px) offset. The skip link appears on focus. Sport-specific URL queries still choose the appropriate acquisition route without adding visible selectors.

### Genuine Coach evidence

The unchanged (1290 × 2796) Coach conversation scales proportionally, without a crop or device frame. Its full-size link opens in a new tab and announces that behavior accessibly. Preserve its meaningful alt text and Coach caption.

### Navigation

The header contains the approved logo, DoThis name, Pricing, and Support. Links have (44px) minimum targets and a (28px) gap, becoming (20px) on mobile. Hover uses green. Footer links preserve existing library, comparison, partner, privacy, and terms destinations.

### Pricing and native disclosure

The price summary stays compact. Native `details` and `summary` work without JavaScript. The summary has a (44px) minimum height and (10px) vertical padding; hover uses off-white. Expanded text caps at (760px). Price amounts stay together, with the mobile founder-price line below its label. Product and purchase claims remain governed by PRODUCT.md.

The homepage has no input fields, cards, tabs, or component framework to standardize.

## Do's and Don'ts

### Do:

- Do preserve the approved logo, unchanged screenshot, and full-size inspection link.
- Do keep the preview and no-charge disclosure directly below the download action.
- Do retain visible focus, real links, native disclosure, and useful non-JavaScript content.
- Do keep claims consistent with PRODUCT.md and the in-app purchase flow.

### Don't:

- Don't add decorative pictures, generated imagery, 3D models, or ornamental motion.
- Don't restore the rejected editorial palette, display font, sport selectors, or repeated closing pitch.
- Don't repaint the app screenshot or promote its internal colors into website tokens.
- Don't treat other site destinations as redesigned by this record.

Not canonized: app-screen internals, isolated layout values as a larger token scale, and superseded editorial components. These are product evidence, local composition, or rejected work. The finish review reports no craft-floor defects in the supplied source and captures.
