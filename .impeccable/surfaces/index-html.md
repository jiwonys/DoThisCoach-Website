---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["home.css","home.js"]
---

# Homepage surface brief

## Scope, mode, and authority

Production homepage in Persuade mode. Athlete Signal Split is the approved and shipped direction for `index.html`, `home.css`, and `home.js`; it does not redesign the native app or automatically restyle articles, comparison, support, legal, or acquisition redirect pages.

The direction contract is the first body comment in `index.html`: grounded candidate 3, seed `fc520847`, approved 2026-08-29. `PRODUCT.md` governs capabilities and claims. Asset and App Store destination manifests govern evidence and routing.

## Audience, job, and action

Adult recreational soccer, basketball, pickleball, tennis, and volleyball athletes should recognize their game, understand that DoThis builds strength work around the sport and week they set, and choose the correct App Store destination. An App Store click is not an install.

## Finished narrative and proof

1. **Hero and selector:** “You can be lethal” command, one product-truth sentence, synchronized athlete plane, all six sport choices, one primary action, and verified Premium Preview terms in the first viewport.
2. **Week-led method:** “Your sport” and “Your week” resolve into “Next workout.”
3. **Progress proof:** One readable, real `assets/screenshots/progress-trends.webp` screen. It stays general across sport states and its interface pixels remain unmodified.
4. **Closing challenge:** “Make them notice” and one synchronized App Store action.

The safety aside and footer are support bands, not new narrative chapters. Campaign athletes are illustrative subjects, not customers or endorsers.

## Finished visual system

Athlete Signal Split uses Article Night `#07090c`, Sunken Night `#0b0e12`, Chalk `#f2f4f3`, Muted Copy `#a7b0b8`, Inactive Control `#78828a`, Signal Green `#2ee68b`, Cool Arena Blue `#5b7cff`, and sport-specific accents. Archivo Black commands; Work Sans explains and labels. Fine grain, quiet rules, green/blue counterlight, low-chroma athlete imagery, compact pill actions, and one lifted Progress screen supply the material language.

Do not restore Second Awakening’s serif voice, repeated awakening chapters, or three-screen pile. Do not add card-grid fitness scaffolding, fake product UI, testimonials, metrics, urgency, medical outcomes, or guaranteed performance claims.

## Sport-state contract

| State | Emotional line | Accent | App Store route |
| --- | --- | --- | --- |
| General | Your game still matters. | `#2ee68b` | `/app/` |
| Soccer | Another sprint. | `#43d990` | `/app/soccer/` |
| Basketball | Another possession. | `#f3a33b` | `/app/basketball/` |
| Pickleball | Your feet remember. | `#c9ec52` | `/app/pickleball/` |
| Tennis | Another set. | `#c8ef53` | `/app/tennis/` |
| Volleyball | Jump again. | `#49d8c4` | `/app/volleyball/` |

Every state synchronizes desktop and mobile media, alt text, emotional line, accent, `?sport=` URL, `aria-pressed`, roving tab stop, CTA accessible labels, and all three allowlisted App Store routes. Invalid values fall back to General; browser back and forward restore state. The Progress proof intentionally does not change by sport. Redirect pages retain their verified custom-product-page `ppid` values and do not forward arbitrary query strings.

## Responsive, motion, and access

At `900px`, main navigation hides and the hero/dock proportions tighten. At `760px`, the hero stacks into a `39svh` athlete plane, copy, and a `3 × 2` selector; method and proof stack; gutters become `16px`; and the hero action fills the dock. Minimum width is `320px`.

The `760px` picture source uses the six deterministic `780 × 658` derivatives documented in `assets/awakening/ASSET_MANIFEST.md` and `docs/design/asset-manifest.json`. Each preserves the athlete’s face, full stance, and equipment over a darkened blur of its approved source.

A single `620ms` signal sweep marks sport changes. Supported browsers add a restrained View Transition. Under `prefers-reduced-motion: reduce`, the sweep and View Transition animation are removed and state changes are effectively instant. Preserve the skip link, `3px` focus outline with `4px` offset, `44px` minimum touch targets, live emotional line, arrow-key wrap, Home/End selection, and meaningful non-JavaScript content.

## Validation

- Finish-review disposition: `ship`.
- UI/UX disposition: `ship`.
- Independent beauty score: `91/100`.
- Production suite: `503` assertions passed.
- Lighthouse mobile: `98 / 100 / 100 / 100`; LCP `2.3s`; CLS `0`.

## Unresolved decisions and documentation

- No owner-approved founder statement was supplied, so none was fabricated.
- Premium prices and renewal terms remain unpublished until reverified and approved.
- Physical-iPhone verification of each custom App Store gallery remains separate from browser route verification.
