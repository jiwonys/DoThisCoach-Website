# DoThisCoach Website

Static GitHub Pages website for DoThis.

## Local Preview

Open `index.html` in a browser, or run a tiny static server:

```bash
python -m http.server 8080
```

## Generated Content

Most of this site is generated. Editing the HTML under `articles/` or
`compare/` directly will be overwritten on the next build.

```bash
npm run build:site     # articles + comparisons + social images + RSS + sitemap
npm run check:site     # broken links, sitemap coverage, article count
```

| Source | Produces |
| --- | --- |
| `scripts/article-content.mjs` | 47 article pages under `articles/` |
| `scripts/comparison-content.mjs` | comparison pages under `compare/` |
| `scripts/build-articles.mjs` | article pages, social images, `feed.xml`, `sitemap.xml` |
| `scripts/build-comparisons.mjs` | comparison pages and the `/compare/` index |

`sitemap.xml` is written **only** by `build-articles.mjs`, which imports the
comparison list so there is one file that owns it. Run `build:site`, not
`build:comparisons` alone, or the sitemap will not include new comparisons.

## Rules That Are Not Style Preferences

**Comparison pages must stay scrupulously factual.** Every claim about another
product must be something that product publishes about itself, recorded with the
source URL and the date read. Never assert that a competitor *lacks* a feature —
absence cannot be verified from a marketing page. Each page names what the
competitor does better, and carries a non-affiliation disclaimer. Re-verify
prices before editing: App Store in-app purchase lists are the only place these
companies publish pricing, and it moves.

**The article catalog check is advisory.** `build-articles.mjs` warns when an
article names an exercise outside the app's catalog. It does not fail, because
the app generates exercises outside the catalog routinely and handles them; a
catalog hit only buys better guide metadata.

**Stylesheet links carry a content hash.** GitHub Pages serves CSS with
`max-age=600` and no filename hash, so without it a published change looks
undeployed for ten minutes and indefinitely to an open tab.

**Do not let a container rule style the CTA card.** `.article-body > section`
and `.comparison-body > section` set prose padding and outrank a bare
`.article-cta`, which silently flattens the card's horizontal padding to zero.
Both exclude it with `:not(.article-cta)`. If you add a new container, keep that
exclusion.

**Verify CTA changes on a real page.** Crop the card out of a full render of an
actual article or comparison page. An isolated harness places it outside
`.article-body`, where the offending rule never applies and the padding always
looks correct — which is how this bug shipped twice.

## Deployment

This repository deploys to GitHub Pages through `.github/workflows/pages.yml`.

Required GitHub repository setting:

- Settings -> Pages -> Build and deployment -> Source: GitHub Actions

The custom domain is configured through `CNAME`:

```text
dothiscoach.com
```

DNS should point `dothiscoach.com` to GitHub Pages.
