---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["home.css","home.js"]
---

# Homepage surface brief

## Scope, mode, and authority

The production homepage uses Persuade mode and the user-approved Own the Court direction (seed `55982518`). Current `index.html`, `home.css`, and `home.js` define this compact surface. This approved direction supersedes Athlete Signal Split for the homepage; other pages keep their established design and destinations.

`PRODUCT.md` remains the product-capability reference. The approved current homepage carries the Founding 200 offer. The existing asset manifest catalogs earlier campaign assets; the court uses `assets/courts/logo-shape.json` and `assets/courts/logo-face.png`.

## Audience, job, and action

Adult recreational athletes should recognize their sport, understand strength training around their confirmed schedule, and choose the relevant App Store page. A website click is not an install.

## Approved composition

1. Founding 200 strip: $6.99/month or $69.99/year for the first 200 users.
2. Original navigation destinations and header App Store action.
3. “Make them notice.” hero beside a miniature court, with “Start your 7 days free,” method link, and no-payment/no-automatic-charge copy.
4. Six sport choices followed by “The work you do. The game you love.” and a labeled illustrative seven-day week.
5. Closing offer and “Find your game” action, then the original supporting footer destinations.

The court contains two original flame logos embedded flat into each playing surface. There is no floating phone, athlete portrait, or app screenshot in the approved homepage. The static flame image is the fallback while the court is unavailable.

## Visual system

Use the tokens and eight-section system in `DESIGN.md`. Forest-black surfaces, warm chalk type, and stable lime controls frame a lit, matte court. Archivo Black commands; Work Sans explains. The stage remains the primary source of depth. Existing unused athlete-direction styles in `home.css` do not define this production surface.

## Sport-state contract

| State | Scene label | Detail | Route |
| --- | --- | --- | --- |
| General | One week. All your training. | Every game starts with the work. | `/app/` |
| Soccer | Strength around match day. | Bring your strength to the field. | `/app/soccer/` |
| Basketball | Your lift knows game night. | Be ready for the next possession. | `/app/basketball/` |
| Pickleball | Training around court time. | Stay ready for one more game. | `/app/pickleball/` |
| Tennis | Your week. Your next match. | Make the next point yours. | `/app/tennis/` |
| Volleyball | Strength around your sport. | Bring more to the next rally. | `/app/volleyball/` |

All six states synchronize court geometry, both copy lines, pressed state, URL, and all three `data-download` links. Unknown query values use General; back/forward restores selection. Interface lime remains constant.

General and Basketball use hoops and basketball markings. Soccer uses goals, penalty areas, and a center circle. Tennis uses a clay-toned doubles footprint, singles sidelines, service boxes, and a center-dipped net. Pickleball uses a smaller blue court, contrasting kitchen, service centerlines that stop at the kitchen, and a lower center-dipped net. Volleyball uses an (18:9) playing-area ratio, attack lines, and high hanging mesh with antennas. Both logos remain inlaid for every state.

Preserve the six verified custom-product-page identifiers in `docs/design/app-store-destinations.json`. Redirects retain their fallbacks and do not forward arbitrary query strings.

## Navigation, responsive behavior, and access

Desktop navigation includes Method, Inside, Sports, Training library, Compare, Pricing, Partners, and Support. At (1150px), a native details menu carries these links plus Privacy and Terms. Footer destinations remain available. Existing `#features` and `#free-preview` fragments resolve alongside `#method`, `#inside`, `#sports`, and `#pricing`.

At (760px), copy and the (400px) court stage stack, the selector becomes three columns, and method, offer, and footer stack. Native button keyboard activation, visible (3px) focus with (5px) offset, skip link, live sport detail, and (44px) sport/reset/menu targets remain. Escape closes the mobile menu and returns focus; selection and outside clicks close it.

Reduced motion removes pointer tilt and CSS transitions. Pointer exploration is optional; all information and acquisition actions are in HTML. WebGL or asset failure leaves the approved flame fallback. Rendering settles after movement and pauses when the stage is offscreen. Static geometry batching preserves materials and composition.

## Validation scope

This documentation refresh describes the current source after the approved ship decision. Current production validation belongs to the release QA report; earlier Athlete Signal Split assertion counts, Lighthouse scores, and beauty scores do not validate this court homepage. Native iPhone custom-product-page gallery verification remains distinct from route verification.
