# Phase 1 verification

Run 2026-08-29 against local static preview at `http://127.0.0.1:4173`.

## Rendered evidence

- Field Manual: Tennis and Basketball at 390 × 844 and 1440 × 1000.
- Night Match: Tennis and Basketball at 390 × 844 and 1440 × 1000.
- Current DoThis, Subscrr, and Apple App Store reference captures are in `docs/design/reference/`.
- Approved sport contact sheet is `docs/design/contact-sheet.png`.

## Automated checks

Command:

```bash
BASE_URL=http://127.0.0.1:4173 node scripts/redesign-phase1-check.mjs
```

Result: `PASS redesign Phase 1: 118 assertions`.

Coverage:

- Both concepts at 390px and 1440px.
- General, Soccer, Basketball, Pickleball, Tennis, and Volleyball.
- Selected state, matching hero/workout boards, and both CTA destinations.
- Invalid sport fallback to General.
- Arrow-key sport switching.
- No horizontal page overflow.
- Meaningful no-JavaScript Tennis fallback.
- Axe serious/critical violations.
- Console and page errors.

Existing website check:

```bash
npm run check:site
```

Result: 67 HTML pages, 47 articles, and 56 sitemap URLs passed.

## Review layers

- Live Vercel Web Interface Guidelines fetched before code review.
- Impeccable detector ran with full HTML/CSS parser dependencies.
- Mechanical findings fixed: tiny evidence labels, dark colored glow, tap behavior, and horizontal overflow.
- Intentional exception: Field Manual retains approved DoThis warm editorial ground despite Impeccable’s generic cream-palette warning; brand/source evidence and the user-requested light editorial comparison justify it.
- Flat-type-hierarchy warnings refer mainly to clustered evidence-label sizes, not the headline/body hierarchy. Full implementation should consolidate remaining microcopy onto a documented type ramp.

## Limitations

- Phase 1 is hero-plus-selector scope, not a completed homepage or production Lighthouse approval.
- Browser checks verify destination URLs and `ppid`; physical-iPhone App Store gallery verification remains separate.
- No paid image generation was performed.
