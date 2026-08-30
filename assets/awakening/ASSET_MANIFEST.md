# Athlete Signal Split responsive image derivatives

The six source portraits in this directory are approved campaign images documented in `docs/design/asset-manifest.json`. They remain unchanged.

`mobile/*.webp` contains deterministic responsive derivatives for the homepage athlete plane at widths up to `760px`.

## Processing

- Output dimensions: `780 × 658`.
- Format: WebP, quality `84`, smart chroma subsampling.
- Treatment: remove only unused upper background; preserve the complete athlete, face, stance, and sport equipment; center that crop over a darkened, blurred fill made from the same approved source image.
- No pixels were generated, repainted, or sourced from a third party.
- Build command: `node scripts/build-mobile-athlete-assets.mjs`.

## Source mapping

| Output | Source |
| --- | --- |
| `mobile/general.webp` | `general.webp` |
| `mobile/soccer.webp` | `soccer.webp` |
| `mobile/basketball.webp` | `basketball.webp` |
| `mobile/pickleball.webp` | `pickleball.webp` |
| `mobile/tennis.webp` | `tennis.webp` |
| `mobile/volleyball.webp` | `volleyball.webp` |

These derivatives are production assets, not customer evidence or endorsements.
