---
name: dothis-assets-and-routing
description: "Use when finding, classifying, mapping, or presenting DoThis athlete and feature screenshots, or editing sport selectors, App Store links, and acquisition redirects. Prevent mismatched screenshots and loss of custom product page routing."
---

# DoThis assets and acquisition routing

## Inventory before invention
We already have sport-specific and feature screenshots. Search the actual website repository, shared asset folders, App Store exports, and existing manifests. Open the files; record real paths and dimensions. Do not assume missing context means missing assets. Prefer originals over compressed public previews.

Classify each asset:
1. Native app screenshot: actual interface pixels.
2. App Store marketing board: composed artwork that may already contain a device, headline, and athlete.
3. Athlete/campaign image: illustrative brand imagery, not customer or product evidence.
4. Approved logo/icon.

Build a labeled contact sheet and docs/design/asset-manifest.json. Each entry records ID, path, source/provenance, kind, sport, feature, dimensions, crop/focal point, release relevance, and approval status. Leave uncertain fields unresolved rather than fabricating them.

## Screenshot integrity
Preserve actual UI pixels and the approved logo. Resize, crop, frame, and composite deterministically. Never repaint app UI with a generative model. Do not wrap a complete marketing board in a second phone. Prefer native screenshots for readable product demonstrations and use marketing boards as campaign compositions. Do not stretch screens, obscure key text, or label sport-specific UI as another sport.

Screens shared across sports must genuinely be general feature screens. Keep this classification explicit. Source masters and unused exports should not all ship to the browser.

## Existing routes
Inspect these routes in local source and, where reachable, the live site:
- https://dothiscoach.com/app
- https://dothiscoach.com/app/soccer
- https://dothiscoach.com/app/basketball
- https://dothiscoach.com/app/pickleball
- https://dothiscoach.com/app/tennis
- https://dothiscoach.com/app/volleyball

Research on 2026-08-29 observed redirect-page text on these routes. Reverify current implementations. They are not automatically in-scope landing pages to replace.

Create docs/design/app-store-destinations.json with source route, route behavior, final App Store URL, app ID, any custom-page ppid, attribution handling, verification method/date, and status. The expected app ID is 6771322181. Obtain each actual URL and identifier from source or inspection; never invent them.

## Selector contract
General and the five named sports form an explicit allowlist. A selection coordinates relevant image(s), screenshot(s), truthful copy, accessible selected state, and the correct CTA. General/invalid values have a general fallback. Preserve current approved query/attribution behavior; do not forward arbitrary query strings. Any shareable sport state must not overwrite campaign or custom-page identifiers.

Do not repurpose /app routes or add /sports pages without approval. Do not change all buttons to a generic listing. Verify mobile/desktop state transitions, reload behavior, and browser history where used.

## Verification
Test the actual redirect implementation: HTTP, meta refresh, JavaScript, or equivalent. Test the constructed target and identifier, not just a 200 status. Static link tests can verify mapping; a final iPhone/App Store visual check may still be needed to confirm the displayed gallery. Report that distinction.

If an App Store gallery is inaccessible, search local originals. Do not invent screenshots or claim every gallery was inspected. Request only the specific missing original when all available local/source retrieval paths are exhausted.
