---
name: dothis-visual-qa
description: "Use to verify a DoThis marketing-site implementation or redesign before handoff: rendered composition, all sport states, correct App Store targets, mobile behavior, accessibility, performance, and absence of secrets."
---

# DoThis visual and functional QA

## Evidence first
Read approved DESIGN.md, PRODUCT.md, the requirements, asset manifest, and destination map. Make a coverage inventory from requirements and implemented behavior. Test a production build/preview as well as interactive development states. State tool limitations accurately.

Use one approved Playwright browser workflow. Prefer DOM/accessibility locators and batched assertions for interaction. Keep a session alive where supported. Capture screenshots at important states or after meaningful layout changes, not after every routine click. Never disable sandbox/approval controls to force a particular skill to run.

## Required coverage
- Viewports: 360, 390, 768, and 1440px widths, with realistic heights.
- General, Soccer, Basketball, Pickleball, Tennis, and Volleyball selection states.
- Matching imagery, truthful screenshot content, selected state, copy, and CTA destination for every sport on mobile and desktop.
- Default and invalid sport state, reload/share behavior, browser history when implemented, and preservation of approved attribution rules.
- Navigation, menus, feature selectors, FAQ, pricing controls, all primary/closing CTAs, support/legal/guide links.
- No horizontal overflow, clipped headlines, obscured focus, broken images, layout shifts from missing dimensions, unreadable screen text, or awkward image crops.
- Keyboard-only navigation, visible focus, appropriate semantics/names, touch operation, zoom, contrast, and reduced motion.
- Content/CTA visible without waiting for animation; meaningful default content when JavaScript is unavailable where practical.
- Console errors, network failures, missing assets, and production-build compatibility.
## Tool checks
Run axe with manual checks; automated accessibility results are not a complete conformance claim. Run the existing test suite and targeted redirect/state tests. Use Vercel web-design-guidelines on changed UI files and Impeccable critique/polish on the implemented page while respecting the approved design direction.

Run Lighthouse on the production preview and record version, device/throttling settings, route/state, and actual results. Target 90+ mobile performance as a project goal, not a guaranteed result. Do not label lab checks as verified real-user Core Web Vitals.

Test HTTP/meta-refresh/JavaScript redirect construction and exact custom-page identifier preservation. A successful browser redirect check does not prove the iPhone App Store displayed the intended gallery; document remaining device verification honestly.

Check that no OPENAI_API_KEY value, secret-bearing env file, generation-only dependency/code, or sensitive provenance has entered the public build. Do not print secret values during checks. Verify that page visits/builds do not trigger image generation.

## Visual revision loop
Capture and inspect actual page screenshots. Rank the three most consequential remaining defects: comprehension, composition/legibility, then polish. Fix them and rerun affected checks. Limit broad refinement to three passes without claiming completion if a core requirement remains broken. Do not assign an unsupported “10/10” score.

## Handoff
Save actual screenshots and reports with meaningful filenames. Provide changed files, commands/results, route/state coverage, remaining defects, preview instructions, and asset provenance references. Distinguish passed, failed, and not-run checks. Do not deploy, publish, or change account settings without separate approval.
